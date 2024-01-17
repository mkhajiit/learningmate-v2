const db = require('./../src/database');

const sql = {
  reviewList: `SELECT r.review_id, m.meet_id, u.nickname, r.content
               FROM meet_reviews r INNER JOIN users u ON r.user_id = u.user_id INNER JOIN meets m ON r.meet_id = m.meet_id
               WHERE m.meet_id = ? ORDER BY r.review_id DESC`, // 미팅번호로 내림차순
  review: `SELECT r.review_id, m.meet_id, u.nickname, r.content
           FROM meet_reviews r INNER JOIN users u ON r.user_id = u.user_id INNER JOIN meets m ON r.meet_id = m.meet_id
           WHERE m.meet_id = ? AND r.review_id = ?`, // 특정 미팅 상세조회
  insert: 'INSERT INTO meet_reviews(meet_id, content, user_id) VALUES(?, ?, ?)',
  delete: 'DELETE FROM meet_reviews WHERE review_id = ?',
  totalCount: 'SELECT COUNT(*) as cnt FROM meet_reviews',
};

const reviewsDAO = {
  reviewList: async (meet_id, callback) => {
    try {
      const resp = await db.query(sql.reviewList, [meet_id]);
      if (resp.length === 0) {
        // meet_id에 해당하는 미팅이 없다면
        callback({status: 500, message: '리뷰 상세 조회 실패', error: '리뷰 없습니다'});
      } else {
        callback({status: 200, message: '리뷰 상세 조회 성공', data: resp[0]});
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '리뷰 상세 조회 실패', error: error.message});
    }
  },

  review: async (meet_id, review_id, callback) => {
    try {
      const resp = await db.query(sql.review, [meet_id, review_id]);
      if (resp.length === 0) {
        // meet_id, review_id에 해당하는 미팅이 없다면
        callback({status: 500, message: '리뷰 조회 실패', error: error});
      } else {
        callback({status: 200, message: '리뷰 조회 성공', data: resp[0]});
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '리뷰 조회 실패', error: error});
    }
  },

  insert: async (item) => {
    try {
      const resp = await db.query(sql.insert, [item.meet_id, item.content, item.user_id]);
      return {status: 200, message: '리뷰 생성 성공', data: resp};
    } catch (err) {
      console.error(err);
      throw {status: 500, message: '서버 오류', error: err};
    }
  },

  delete: async (id, callback) => {
    try {
      const resp = await db.query(sql.delete, [id]);
      if (resp.affectedRows === 0) {
        //  해당 조건에 맞는 행이 존재하지 않는다면 affectedRows가 0
        callback({status: 500, message: '리뷰 삭제 실패', error: error});
      } else {
        callback({status: 200, message: '리뷰 삭제 성공'});
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '리뷰 삭제 실패', error: error});
    }
  },
};

module.exports = reviewsDAO;
