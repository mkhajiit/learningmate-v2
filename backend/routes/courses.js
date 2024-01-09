const express = require('express');
const router = express.Router();
const multer = require('multer');
const coursesController = require('../controllers/courses');
const path = require('path');
// const staticPath = path.join(__dirname, '..', 'public');

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join('https://port-0-learningmate-server-5r422alqajqbni.sel4.cloudtype.app', 'videos', 'courses')),
    filename: (req, file, cb) =>
      //file.originalname: 업로드 파일 원본이름
      cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
});

// 강의 생성
router.post(
  '/insert',
  uploadFile.fields([
    // 이름으로 식별하는 req.files 생성
    { name: 'lectureVideo', maxCount: 1 },
    { name: 'lectureImage', maxCount: 1 },
  ]),
  coursesController.courseInsert,
);
// 강의 수정
router.patch(
  '/update',
  uploadFile.fields([
    // 이름으로 식별하는 req.files 생성
    { name: 'lectureVideo', maxCount: 1 },
    { name: 'lectureImage', maxCount: 1 },
  ]),
  coursesController.courseUpdate,
);
// 강의 삭제
router.delete('/delete/:course_id', coursesController.courseDelete);
// 전체 강의 조회
router.get('/courseList', coursesController.courseList);
// 강의 상세
router.get('/course/:course_id', coursesController.course);

module.exports = router;
