// 2023.12.26 수정 완료

const express = require('express');
const router = express.Router();
const meetsController = require('../controllers/meets');

const multer = require('multer');
const path = require('path');
const staticPath = path.join(__dirname, '..', 'public');

const uploadFile = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) =>
      cb(null, path.join(staticPath, 'images', 'meets')),
    filename: (req, file, cb) => cb(null, `${Date.now()}_${file.originalname}`),
  }),
  limits: { fileSize: 1024 * 1024 * 3 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('이미지만 업로드 해주세요!'));
    }
  },
});

router.post(
  '/insert',
  uploadFile.single('meetImage'),
  meetsController.meetInsert,
);

// 모임 수정
router.patch(
  '/update/:meet_id',
  uploadFile.single('meetImage'),
  meetsController.meetUpdate,
);

// 특정 모임 삭제
router.delete('/delete/:meet_id', meetsController.meetDelete);
// 전체 모임 조회
router.get('/meetList', meetsController.meetList);
// 특정 모임 상세
router.get('/meet/:meet_id', meetsController.meet);
// 주변 모임 탐색
router.post('/find-nearby-meetup', meetsController.findNearbyMeetup);
// 특정 유저가 만든 모임
router.get('/meetList/:user_id', meetsController.myMeetList);

module.exports = router;
