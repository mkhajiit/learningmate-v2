const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/events');

// 일정 불러오기
router.get('/getEvents/:user_id', eventsController.getEvents);
// 일정 추가(생성)하기
router.post('/insert', eventsController.insertEvents);
// 일정 수정하기
router.put('/update/:id', eventsController.updateEvents)
// 일정 삭제하기
router.delete('/delete/:id', eventsController.deleteEvents)

module.exports = router;
