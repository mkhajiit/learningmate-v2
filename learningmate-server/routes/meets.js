// 2023.12.26 수정 완료 - 민경

const express = require('express');
const router = express.Router();
const meetsController = require('../controllers/meets');

// 게시물 생성
router.post('/insert', meetsController.meetInsert);
// 게시물 수정
router.post('/update', meetsController.meetUpdate);
// 게시물 삭제
router.delete('/delete/:meet_id', meetsController.meetDelete);
// 전체 게시물 조회
router.get('/meetList', meetsController.meetList);
// 게시물 상세
router.get('/meet/:meet_id', meetsController.meet);

module.exports = router;