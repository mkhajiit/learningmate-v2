const db = require('../src/database');

class bookmarkDAO {
    static addBookmark(user_id, course_id) {
        const sql = 'INSERT INTO bookmarks (user_id, course_id) VALUES (?, ?)';
        return db.query(sql, [user_id, course_id]);
    }

    static removeBookmark(user_id, course_id) {
        const sql = 'DELETE FROM bookmarks WHERE user_id = ? AND course_id = ?';
        return db.query(sql, [user_id, course_id]);
    }

    static getBookmarksByUserId(user_id) {
        const sql = 'SELECT * FROM bookmarks WHERE user_id = ?';
        return db.query(sql, [user_id]);
    }
}

module.exports = bookmarkDAO;
