// 2023.12.27 수정 중

const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');

// 리뷰 생성
router.post('/insert', reviewsController.reviewInsert);
// 리뷰 삭제
router.delete('/delete/:review_id/:user_id', reviewsController.reviewDelete);
// _번 게시물에 대한 리뷰 전체 조회
router.get('/detail/:meet_id/reviewList', reviewsController.reviewList);
// _번 게시물에 대한 _번 리뷰 조회
router.get('/review/:meet_id/:review_id', reviewsController.review);

module.exports = router;
