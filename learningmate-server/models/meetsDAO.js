// 2023.12.29 수정 완료

const db = require('./../src/database');

const sql = {
  meetList: `SELECT m.meet_id, u.nickname, title, DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt
             FROM users u INNER JOIN meets m ON u.user_id = m.user_id
             ORDER BY m.meet_id DESC
             LIMIT ?, ?`, // 미팅번호로 내림차순 (GROUP BY m.meet_id 해야하나?)
  meet: `SELECT m.meet_id, u.nickname, title, content, start_date, end_date, max_num, onoff, image, category, approve, DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt
          FROM users u INNER JOIN meets m ON u.user_id = m.user_id
          WHERE m.meet_id = ?`, // 특정 미팅 상세조회
  insert: `INSERT INTO meets(title, content, start_date, end_date, max_num, onoff, image, category, approve, user_id) 
           VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  update: 'UPDATE meets SET title = ?, content = ?, start_date = ?, end_date = ?, max_num = ?, onoff = ?, image = ?, category = ?, approve = ?, updatedAt = NOW() WHERE meet_id = ?',
  delete: 'DELETE FROM meets WHERE meet_id = ?',
  totalCount: 'SELECT COUNT(*) as cnt FROM meets' // 총 게시물 개수
};

const meetsDAO = {
  meetList: async (item, callback) => { // data 들어온거 확인 완료!
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 10;

    try {
      const [resp] = await db.query(sql.meetList, [no * size, size]);
      const [cntResp] = await db.query(sql.totalCount);
      const totalPage = Math.ceil(cntResp[0].cnt / size);
      callback({ status: 200, message: '모임 리스트 조회 성공', pageno: no + 1, pagesize: size, total: cntResp[0].cnt, totalPage, data: resp });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '모임 리스트 조회 실패', error: error });
    }
  },

  meet: async (id, callback) => { // data 들어온거 확인 완료!
    try {
      const resp = await db.query(sql.meet, [id]);
      if (resp.length === 0) { // meet_id에 해당하는 미팅이 없다면
        callback({ status: 500, message: '모임 상세 조회 실패', error: error });
      } else {
        callback({ status: 200, message: '모임 상세 조회 성공', data: resp[0] });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '모임 상세 조회 실패', error: error });
    }
  },

  insert: async (item, callback) => { // data 들어온거 확인 완료!
    try {
      const resp = await db.query(sql.insert, [item.title, item.content, item.start_date, item.end_date, item.max_num, item.onoff, item.image, item.category, item.approve, item.user_id]);
      callback({ status: 200, message: '모임 생성 성공', data: resp });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '모임 생성 실패', error: error });
    }
  },

  update: async (item, callback) => { // data 들어온거 확인 완료!
    try {
      const resp = await db.query(sql.update, [item.title, item.content, item.start_date, item.end_date, item.max_num, item.onoff, item.image, item.category, item.approve, item.meet_id]);
      if (resp.affectedRows === 0) {
        callback({ status: 500, message: '모임 수정 실패', error: error });
      } else {
        callback({ status: 200, message: '모임 수정 성공', data: resp });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '모임 수정 실패', error: error });
    }
  },

  delete: async (id, callback) => { // data 들어온거 확인 완료!
    try {
      const resp = await db.query(sql.delete, [id]);
      if (resp.affectedRows === 0) { //  해당 조건에 맞는 행이 존재하지 않는다면 affectedRows가 0
        callback({ status: 500, message: '모임 삭제 실패', error: error });
      } else {
        callback({ status: 200, message: '모임 삭제 성공' });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '모임 삭제 실패', error: error });
    }
  },
};

module.exports = meetsDAO;