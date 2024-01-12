
// 배포환경에서는 videoUploadPath 경로를 유저이미지 저장경로와 같게해야 저장됨
const coursesDAO = require('../models/coursesDAO');
const domain = require('../config/config.js');
// db에 저장할 파일의 경로명을 변수로설정
const videoUploadPath = `${domain.localDomain}/images/courses/`;

const path = require('path');

exports.courseInsert = async (req, res) => {
  try {
    const courseData = JSON.parse(req.body.data);
    const videoPath = req.files['lectureVideo'][0]
      ? `${videoUploadPath}${req.files['lectureVideo'][0].filename}`
      : '';
    //path.parse().name으로 확장자를 제거한 데이터를 받는다
    const videoName = req.files['lectureVideo'][0]
      ? path.parse(req.files['lectureVideo'][0].originalname).name
      : '강의영상';

    const imagePath = req.files['lectureImage'][0]
      ? `${videoUploadPath}${req.files['lectureImage'][0].filename}`
      : '';
    await coursesDAO.insert(
      courseData,
      videoPath,
      videoName,
      imagePath,
      (resp) => {
        res.send(resp);
      },
    );
  } catch (err) {
    console.log(err);
  }
};

exports.courseUpdate = async (req, res) => {
  const courseData = JSON.parse(req.body.data);
  const videoPath = req.files['lectureVideo'][0]
    ? `${videoUploadPath}/${req.files['lectureVideo'][0].filename}`
    : '';
  //path.parse().name으로 확장자를 제거한 데이터를 받는다
  const videoName = req.files['lectureVideo'][0]
    ? path.parse(req.files['lectureVideo'][0].originalname).name
    : '강의영상';

  const imagePath = req.files['lectureImage'][0]
    ? `${videoUploadPath}/${req.files['lectureImage'][0].filename}`
    : '';
  try {
    await coursesDAO.update(
      courseData,
      videoPath,
      videoName,
      imagePath,
      (resp) => {
        res.send(resp);
      },
    );
  } catch (error) {
    console.log(error);
  }
};

exports.courseDelete = async (req, res) => {
  const { course_id } = req.params;
  try {
    await coursesDAO.delete(course_id, (resp) => {
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.courseList = async (req, res) => {
  // const course_list = req.query;
  try {
    await coursesDAO.courseList((resp) => {
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.mainCourseList = async (req, res) => {
  // const course_list = req.query;
  try {
    await coursesDAO.mainCourseList((resp) => {
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.course = async (req, res) => {
  const { course_id } = req.params;
  const user_id = req.query.userId;
  try {
    await coursesDAO.course(course_id, user_id, (resp) => {
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.search = async (req, res) => {
  const term = req.query.term;
  try {
    await coursesDAO.search(term, (resp) => {
      res.send(resp);
    });
  } catch (error) {
    console.log(error);
  }
};
