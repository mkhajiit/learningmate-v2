const db = require('../src/database');

class bookmarkDAO {
  static addBookmark(user_id, course_id) {
    const sql = 'INSERT INTO course_id (user_id, course_id) VALUES (?, ?)';
    return db.query(sql, [user_id, course_id]);
  }

  static removeBookmark(user_id, course_id) {
    const sql = 'DELETE FROM bookmark WHERE user_id = ? AND course_id = ?';
    return db.query(sql, [user_id, course_id]);
  }

  static getBookmarksByUserId(user_id) {
    const sql = 'SELECT course_id FROM bookmark WHERE user_id = ?';
    return db.query(sql, [user_id]);
  }
}

module.exports = bookmarkDAO;
