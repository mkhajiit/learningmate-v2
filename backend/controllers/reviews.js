// 2023.12.27 추가
const reviewsDAO = require('../models/reviewsDAO');

exports.reviewInsert = async (req, res) => {
  const reviewData = req.body;
  try {
    await reviewsDAO.insert(reviewData, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.reviewDelete = async (req, res) => {
  const { review_id, user_id } = req.params;
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
  const { meet_id } = req.params;
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
