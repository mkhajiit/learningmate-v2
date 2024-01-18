const reviewsDAO = require('../models/reviewsDAO');

exports.reviewInsert = async (req, res) => {
  const reviewData = req.body;
  try {
    const resp = await reviewsDAO.insert(reviewData);
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.reviewDelete = async (req, res) => {
  const {review_id} = req.params;
  try {
    await reviewsDAO.delete(review_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.reviewList = async (req, res) => {
  const {meet_id} = req.params;
  try {
    await reviewsDAO.reviewList(meet_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.review = async (req, res) => {
  const meet_id = req.params.meet_id;
  const review_id = req.params.review_id;
  try {
    await reviewsDAO.review(meet_id, review_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.myReviewList = async (req, res) => {
  const { user_id } = req.params;
  try {
    const resp = await reviewsDAO.myReviewList(user_id);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '내 리뷰 조회 실패', error: error.message });
  }
};
