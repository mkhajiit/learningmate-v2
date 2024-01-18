const express = require('express');
const router = express.Router();
const reviewsController = require('../controllers/reviews');

// 리뷰 생성
router.post('/insert', reviewsController.reviewInsert);
// 리뷰 삭제
router.delete('/delete/:review_id', reviewsController.reviewDelete);
// _번 게시물에 대한 리뷰 전체 조회
router.get('/detail/:meet_id/reviewList', reviewsController.reviewList);
// 마이페이지 해당 유저 리뷰 조회
router.get('/review/:user_id', reviewsController.myReviewList);

module.exports = router;
