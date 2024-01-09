const express = require('express');
const router = express.Router();
const multer = require('multer');
const usersController = require('../controllers/users');
const path = require('path');
const staticPath = path.join(__dirname, '..', 'public');

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(staticPath, 'images', 'users')),
    filename: (req, file, cb) =>
      cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지만 업로드 해주세요!'), false);
    }
  },
});
router.post('/login', usersController.login);
router.post(
  '/signup',
  uploadFile.single('profile'),
  usersController.signupUser,
);
router.get('/logout', usersController.logout);
router.post('/image/:id', uploadFile.single('image'), usersController.image);
router.get('/imagetest/:id', usersController.imagetest);
router.get('/userinfo', usersController.userInfo);
router.get('/list', usersController.userList);
router.get('/check', usersController.check);
router.delete('/delete/:id', usersController.deleteUser);

module.exports = router;
