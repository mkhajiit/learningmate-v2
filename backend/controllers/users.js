const usersDao = require('../models/usersDAO');
const domain = require('../config/config.js');
const imageUploadPath = `${domain.deployDomain}/images/users/`;
const path = require('path');

exports.login = async (req, res) => {
  const userData = req.body;
  try {
    await usersDao.login(userData, (resp) => {
      // if (resp.status === 200) {
      //   req.session.userId = resp.sessionData;
      // }
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.signupUser = async (req, res) => {
  try {
    const userData = JSON.parse(req.body.data);
    const imageName = req.file ? `${imageUploadPath}${req.file.filename}` : '';
    //path.parse().name으로 확장자를 제거한 데이터를 받는다
    const imageNickname = req.file ? path.parse(req.file.originalname).name : '';
    await usersDao.signUp(userData, imageName, imageNickname, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.userInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    await usersDao.userInfo(userId, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getUserProfile = async (req, res) => {
  const {user_id} = req.params;
  try {
    const resp = await usersDao.getUserProfile(user_id);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 500, message: '유저 프로필 조회 실패', error: error.message});
  }
};

exports.updateUserProfile = async (req, res) => {
  const {user_id} = req.params;
  const {nickname, phone_number, email} = req.body;
  try {
    const resp = await usersDao.updateUserProfile(user_id, nickname, phone_number, email);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({status: 500, message: '유저 프로필 수정 실패', error: error.message});
  }
};

exports.logout = async (req, res) => {
  try {
    // req.session.destroy();
    // res.clearCookie('connect.sid');
    res.send({status: 200, message: '로그아웃성공'});
  } catch (err) {
    console.log(err);
    res.status(500).send({status: 500, message: '서버 오류'});
  }
};

exports.userList = async (req, res) => {
  try {
    await usersDao.userList((resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.delete = async (req, res) => {
  const {user_id} = req.params;
  const userData = req.body;
  try {
    await usersDao.delete(user_id, userData, (resp) => {
      console.log('servcie=> ', resp)
      // if (resp.status === 200) {
      //   req.session.userId = resp.sessionData;
      // }
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({status: 500, message: '서버 오류'});
  }
};
//회원가입 중복검사
exports.check = async (req, res) => {
  try {
    await usersDao.check((resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.image = async (req, res) => {
  const {id} = req.params;
  //single("name") 업로드시 input태그의 네임
  //서버에서 이미지가 저장되는 경로(무조건 있어야함) app.js에 staticPath 설정해서 public이 경로에 안붙어있는거니 걱정안해도됨
  const imageName = req.file
    ? `${imageUploadPath}${req.file.filename}`
    : `${imageUploadPath}default.png`;
  //클라이언트의 이미지 절대경로(생략해도됨)
  const imageNickname = req.file ? req.file.originalname : '';
  console.log(imageName);
  console.log(imageNickname);
  try {
    await usersDao.image(id, imageName, imageNickname, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.imagetest = async (req, res) => {
  const {id} = req.params;
  try {
    await usersDao.imagetest(id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};
