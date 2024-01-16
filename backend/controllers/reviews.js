// 2023.12.27 추가
const reviewsDAO = require('../models/reviewsDAO');

exports.reviewInsert = async (req, res) => {
  //  const {meet_id} = req.params;
  const reviewData = req.body;
  console.log('전송된 리뷰 데이터:', reviewData);
  try {
    const resp = await reviewsDAO.insert(reviewData);
    res.send(resp);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
};

exports.reviewDelete = async (req, res) => {
  const {review_id, user_id} = req.params;
  console.log(req.params);
  try {
    await reviewsDAO.delete(review_id, user_id, (resp) => {
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
