const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/users');
const path = require('path');
//imageUploadPath
const staticPath = path.join(__dirname, '..', 'public');

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(staticPath, 'images', 'users')),
    filename: (req, file, cb) =>
      //file.originalname: 업로드 파일 원본이름
      cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: (req, file, cb) => {
    // 파일 필터 로직 추가 (예: 이미지만 허용)
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지만 업로드 해주세요!'), false);
    }
  },
});

//회원가입, 로그인, 마이페이지는 여기에 구현하면 됩니다.
//로그인
router.post('/login', usersController.login);
//회원가입
router.post(
  '/signup',
  uploadFile.single('profile'),
  usersController.signupUser,
);
//로그아웃
router.get('/logout', usersController.logout);
//사진업로드 테스트 single("name") name은 formdata의 이름
router.post('/image/:id', uploadFile.single('image'), usersController.image);

router.get('/imagetest/:id', usersController.imagetest);
//마이리스트
router.get('/userinfo', usersController.userInfo);
//회원리스트
router.get('/list', usersController.userList);
//중복검사용 회원정보 검색
router.get('/check', usersController.check);
//회원삭제
router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;
