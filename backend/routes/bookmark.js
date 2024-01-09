const express = require('express');
const router = express.Router();
const bookmarkController = require('../controllers/bookmark');

// 즐겨찾기 추가
router.post('/add', bookmarkController.addBookmark);
// 즐겨찾기 제거
router.post('/remove', bookmarkController.removeBookmark);
// 해당 유저 즐겨찾기한 강의 조회
router.get('/list/:user_id', bookmarkController.getBookmarksByUserId);

module.exports = router;