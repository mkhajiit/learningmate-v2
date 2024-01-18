const db = require('../src/database');

class bookmarkDAO {
  static addBookmark(user_id, course_id) {
    const sql = 'INSERT INTO bookmark (user_id, course_id) VALUES (?, ?)';
    return db.query(sql, [user_id, course_id]);
  }

  static removeBookmark(user_id, course_id) {
    const sql = 'DELETE FROM bookmark WHERE user_id = ? AND course_id = ?';
    return db.query(sql, [user_id, course_id]);
  }

  static getBookmarksByUserId(user_id) {
    const sql = `SELECT c.course_id, u.nickname, c.title, c.attach_image_path, c.view_cnt, DATE_FORMAT(c.createdAt, '%Y-%m-%d %H:%i') as createdAt
    FROM bookmark b
    INNER JOIN courses c ON b.course_id = c.course_id
    INNER JOIN users u ON c.user_id = u.user_id
    WHERE b.user_id = ?`;
    return db.query(sql, [user_id]);
  }
}

module.exports = bookmarkDAO;
