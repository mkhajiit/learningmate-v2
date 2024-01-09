// 2023.12.26 수정 완료

const express = require('express');
const router = express.Router();
const meetsController = require('../controllers/meets');

// 모임 생성
router.post('/insert', meetsController.meetInsert);
// 모임 수정
router.post('/update', meetsController.meetUpdate);
// 특정 모임 삭제
router.delete('/delete/:meet_id', meetsController.meetDelete);
// 전체 모임 조회
router.get('/meetList', meetsController.meetList);
// 특정 모임 상세
router.get('/meet/:meet_id', meetsController.meet);
// 주변 모임 탐색
// router.post('/find-nearby-meetup', meetsController.findNearbyMeetup);

module.exports = router;