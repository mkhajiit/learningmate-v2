const db = require('../src/database');

class likebuttonDAO {
  static addLikeButton(user_id, meet_id) {
    const sql = 'INSERT INTO likebutton (user_id, meet_id) VALUES (?, ?)';
    return db.query(sql, [user_id, meet_id]);
  }

  static removeLikeButton(user_id, meet_id) {
    const sql = 'DELETE FROM likebutton WHERE user_id = ? AND meet_id = ?';
    return db.query(sql, [user_id, meet_id]);
  }

  static getLikeButtonsByUserId(user_id) {
    const sql = `SELECT m.meet_id, u.nickname, m.title, m.onoff, m.content
    FROM likebutton l
    INNER JOIN meets m ON l.meet_id = m.meet_id
    INNER JOIN users u ON m.user_id = u.user_id
    WHERE l.user_id = ?`;
    return db.query(sql, [user_id]);
  }
}

module.exports = likebuttonDAO;
