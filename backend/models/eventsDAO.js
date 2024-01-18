const db = require('../src/database');

const sql = {
  getEvents: 'SELECT * FROM events WHERE user_id = ?',
  insertEvents: 'INSERT INTO events (user_id, title, start, end, memo) VALUES (?, ?, ?, ?, ?)',
  updateEvents: 'UPDATE events SET title = ?, memo = ? WHERE id = ?',
  deleteEvents: 'DELETE FROM events WHERE id = ?',
};

const eventsDAO = {
  getEvents: async (user_id) => {
    try {
      const [rows, fields] = await db.query(sql.getEvents, [user_id]);
      return { status: 200, data: rows };
    } catch (error) {
      console.error('일정 불러오기 중 에러 발생:', error);
      return { status: 500, message: '일정 불러오기 실패', error: error.message };
    }
  },

  insertEvents: async (user_id, title, start, end, memo) => {
    try {
      await db.query(sql.insertEvents, [user_id, title, start, end, memo]);
      return { status: 201, message: '일정이 성공적으로 추가되었습니다.' };
    } catch (error) {
      console.error('일정 추가 중 에러 발생:', error);
      return { status: 500, message: '일정 추가 실패', error: error.message };
    }
  },

  updateEvents: async (id, title, memo) => {
    try {
      await db.query(sql.updateEvents, [title, memo, id]);
      return { status: 200, message: '일정이 성공적으로 수정되었습니다.' };
    } catch (error) {
      console.error('일정 수정 중 에러 발생:', error);
      return { status: 500, message: '일정 수정 실패', error: error.message };
    }
  },

  deleteEvents: async (id) => {
    try {
      await db.query(sql.deleteEvents, [id]);
      return { status: 200, message: '일정이 성공적으로 삭제되었습니다.' };
    } catch (error) {
      console.error('일정 삭제 중 에러 발생:', error);
      return { status: 500, message: '일정 삭제 실패', error: error.message };
    }
  },
};

module.exports = eventsDAO;