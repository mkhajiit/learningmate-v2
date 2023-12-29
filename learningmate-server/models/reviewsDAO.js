// 다시 수정하기 - 민경

const database = require('./../src/database'); 

const sql = {
  reviewList: `SELECT r.review_id, m.meet_id, u.nickname, r.content
               FROM meet_reviews r INNER JOIN users u ON r.user_id = u.user_id INNER JOIN meets m ON r.meet_id = m.meet_id
               WHERE m.meet_id = ?;`, // 미팅번호로 내림차순
  review: `SELECT r.review_id, m.meet_id, u.nickname, r.content
           FROM meet_reviews r INNER JOIN users u ON r.user_id = u.user_id INNER JOIN meets m ON r.meet_id = m.meet_id
           WHERE m.meet_id = ? AND r.review_id = ?;`, // 특정 미팅 상세조회
  insert: `INSERT INTO meet_reviews (review_id, user_id, meet_id, content) 
           VALUES(?, ?, ?, ?)`,
  delete: 'DELETE FROM meet_reviews WHERE review_id = ?',
  totalCount: 'SELECT COUNT(*) as cnt FROM meet_reviews' // 총 리뷰 개수 필요..?
};

const meetDAO = {
  reviewList: async (item, callback) => { 
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;

    let conn = null;
    try {
      conn = await database.getConnection();
      const [resp] = await conn.query(sql.reviewList, [no * size, size]);
      const [cntResp] = await conn.query(sql.totalCount);
      const totalPage = Math.ceil(cntResp[0].cnt / size); 
      callback({
        status: 200, message: '리뷰 리스트 조회 성공',
        pageno: no + 1, pagesize: size, total: cntResp[0].cnt, totalPage, data: resp
      });
    } catch (error) {
      callback({ status: 500, message: '리뷰 리스트 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  review: async (item, callback) => { 
    let conn = null;
    try {
      conn = await database.getConnection();
      conn.beginTransaction();
      const [resp] = await conn.query(sql.review, [item.meet_id, item.review_id]);
      conn.commit();
      callback({ status: 200, message: '리뷰 상세 조회 성공', data: resp[0] });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '리뷰 상세 조회 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  insert: async (item, callback) => {
    let conn = null;
    try {
      conn = await database.getConnection();
      conn.beginTransaction();
      const [resp] = await conn.query(sql.insert, [item.review_id, item.user_id, item.meet_id, item.content]); 
      conn.commit();
      callback({ status: 200, message: '리뷰 작성 성공', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '리뷰 작성 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },

  delete: async (item, callback) => {
    console.log(item)
    let conn = null;
    try {
      conn = await database.getConnection();
      conn.beginTransaction();
      const [resp] = await conn.query(sql.delete, [Number(item.review_id)]);
      conn.commit();
      callback({ status: 200, message: '리뷰 삭제 성공', data: resp });
    } catch (error) {
      conn.rollback();
      callback({ status: 500, message: '리뷰 삭제 실패', error: error });
    } finally {
      if (conn !== null) conn.release();
    }
  },
};

module.exports = databaseOperations;
