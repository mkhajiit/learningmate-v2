// 배포환경에서 user이미지는 경로가 잘 들어가는데 영상은 video/courses폴더를 경로로 할려니까 저장이 안되는 이슈가 발생 user이미지 저장하는 images/users에 저장하니 또 됨
// 아마 클라우드 타입에서 무료는 디렉토리 하나만 제공하는듯?? 따라서 multer 저장경로 cb(null, path.join(__dirname, '..', 'public', 'images', 'users'))로 해야함
const express = require('express');
const router = express.Router();
const multer = require('multer');
const coursesController = require('../controllers/courses');
const path = require('path');
const staticPath = path.join(__dirname, '..', 'public');

const uploadFile = multer({
  storage: multer.diskStorage({
    // 파일이 저장될 경로를 설정합니다
    destination: (req, file, cb) => cb(null, path.join(staticPath, 'images', 'courses')),
    filename: (req, file, cb) =>
      //file.originalname: 업로드 파일 원본이름
      cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: {fileSize: 1024 * 1024 * 3},
});

// 강의 생성
router.post(
  '/insert',
  uploadFile.fields([
    // 이름으로 식별하는 req.files 생성
    {name: 'lectureVideo', maxCount: 1},
    {name: 'lectureImage', maxCount: 1},
  ]),
  coursesController.courseInsert
);
// 강의 수정
router.patch(
  '/update',
  uploadFile.fields([
    // 이름으로 식별하는 req.files 생성
    {name: 'lectureVideo', maxCount: 1},
    {name: 'lectureImage', maxCount: 1},
  ]),
  coursesController.courseUpdate
);
// 강의 삭제
router.delete('/delete/:course_id', coursesController.courseDelete);
// 전체 강의 조회
router.get('/courseList', coursesController.courseList);

router.get('/main-course-list', coursesController.mainCourseList);
// 강의 상세
router.get('/course/:course_id', coursesController.course);
// 강의 검색
router.get('/search', coursesController.search);
// 해당 유저가 올린 강의
router.get('/courseList/:user_id', coursesController.myCourseList);

module.exports = router;
