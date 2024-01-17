const express = require('express');
const router = express.Router();
const likebuttonController = require('../controllers/likebutton');

// 즐겨찾기 추가
router.post('/add', likebuttonController.addLikeButton);
// 즐겨찾기 제거
router.delete('/remove/:user_id/:meet_id', likebuttonController.removeLikeButton);
// 해당 유저 즐겨찾기한 모임 조회
router.get('/list/:user_id', likebuttonController.getLikeButtonsByUserId);

module.exports = router;
