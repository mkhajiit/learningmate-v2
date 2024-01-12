const pool = require('./pool');

const sql = {
  boardList: `SELECT b.id id, u.name name, title, DATE_FORMAT(b.createdAt, '%Y-%m-%d') as createdAt, cnt
    FROM user u INNER JOIN board b ON u.id = b.userId
    ORDER BY b.id DESC
    LIMIT ?, ?`,
  board: `SELECT b.id id, u.name name, title, email, DATE_FORMAT(b.createdAt, '%Y-%m-%d') as createdAt, content, cnt
    FROM user u INNER JOIN board b ON u.id = b.userId
    WHERE b.id = ?`,
  insert: 'INSERT INTO board(title, content, userId) VALUES(?, ?, ?)',
  update: 'UPDATE board set title = ?, content = ?, updatedAt = NOW() WHERE id = ?',
  delete: 'DELETE FROM board WHERE id = ?',
  incCount: 'UPDATE board SET cnt = cnt + 1 WHERE id = ?',
  totalCount: 'SELECT COUNT(*) as cnt FROM board',
  replyList: `SELECT bc.id id, userId, content, u.name name, u.profileImagePath photo, DATE_FORMAT(bc.createdAt, '%Y-%m-%d %H:%i:%s') createdAt
    FROM board_comment bc
    LEFT JOIN user u ON bc.userId = u.id 
    WHERE bc.boardId = ?`,
};

const boardDAO = {
  totalCount: async () => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      const [resp] = await conn.query(sql.totalCount);
      return resp[0];
    } catch (error) {
      throw new Error('전체 게시물 카운트 조회 실패', error);
    } finally {
      if (conn !== null) conn.release();
    }
  },
  boardList: async (item) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      const [resp] = await conn.query(sql.boardList, [item.no, item.size]);
      return resp;
    } catch (error) {
      throw new Error('전체 게시물 조회 실패', error);
    } finally {
      if (conn !== null) conn.release();
    }
  },
  board: async (item) => {
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [resp] = await conn.query(sql.board, [item.id]);
      await conn.query(sql.incCount, [item.id]);
      conn.commit();
      return resp[0];
    } catch (error) {
      conn.rollback();
      throw new Error('게시물 조회 실패', error);
    } finally {
      if (conn !== null) conn.release();
    }
  },
  update: async (item) => {
    // console.log(item);
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [resp] = await conn.query(sql.update, [item.title, item.content, item.id]);
      conn.commit();
      // callback({status: 200, message: 'OK', data: resp});
      return resp;
    } catch (error) {
      conn.rollback();
      // callback({status: 500, message: '로그인 실패', error: error});
      throw new Error('게시물 수정 실패', error);
    } finally {
      if (conn !== null) conn.release();
    }
  },
  insert: async (item) => {
    // console.log(item);
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [resp] = await conn.query(sql.insert, [item.title, item.content, item.creatorAt]);
      conn.commit();
      // callback({status: 200, message: 'OK', data: resp});
      return resp;
    } catch (error) {
      conn.rollback();
      // callback({status: 500, message: '게시물 입력 실패', error: error});
      throw new Error('게시물 추가 실패', error);
    } finally {
      if (conn !== null) conn.release();
    }
  },

  delete: async (item) => {
    console.log(item);
    let conn = null;
    try {
      conn = await pool.getConnection();
      conn.beginTransaction();

      const [resp] = await conn.query(sql.delete, [Number(item.id)]);
      conn.commit();

      // callback({status: 200, message: 'OK', data: resp});
      return resp;
    } catch (error) {
      conn.rollback();
      // callback({status: 500, message: '게시물 삭제 실패', error: error});
      throw new Error('게시물 추가 실패', error);
    } finally {
      if (conn !== null) conn.release();
    }
  },

  replyList: async (item) => {
    console.log(item);
    let conn = null;
    try {
      conn = await pool.getConnection();
      const [resp] = await conn.query(sql.replyList, [Number(item.id)]);
      return resp;
    } catch (error) {
      throw new Error('게시물 리플목록 조회 실패', error);
    } finally {
      if (conn !== null) conn.release();
    }
  },
};
module.exports = boardDAO;
