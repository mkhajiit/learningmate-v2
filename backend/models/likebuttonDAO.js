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
    const sql = 'SELECT meet_id FROM likebutton WHERE user_id = ?';
    return db.query(sql, [user_id]);
  }
}

module.exports = likebuttonDAO;
