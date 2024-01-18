const bcrypt = require('bcrypt');
const db = require('../src/database');

const sql = {
  sql_login:
    'SELECT user_id,email,password_hash,nickname,phone_number,profile_name FROM users WHERE email = ?',
  sql_signUp:
    'INSERT INTO users(email,phone_number, password_hash,nickname,profile_name,profile_nickname) VALUES (?,?,?,?,?,?)', //회원가입
  sql_userList: 'SELECT user_id,email,phone_number,nickname,signup_date FROM users', //유저정보조회
  sql_deleteInfo: 'SELECT user_id, email, password_hash FROM users WHERE user_id = ?',
  sql_delete: 'DELETE FROM users WHERE user_id=?', //유저정보삭제
  sql_check: 'SELECT user_id,email,phone_number,nickname FROM users', //중복체크
  sql_userInfo: 'SELECT email, phone_number, nickname FROM users WHERE user_id = ?', //마이페이지 정보
  sql_getUserProfile: 'SELECT email, phone_number, nickname FROM users WHERE user_id = ?', //유저 프로필 불러오기
  sql_updateUserProfile:
    'UPDATE users SET nickname = ?, phone_number = ?, email = ? WHERE user_id = ?', //유저 프로필 수정하기
  sql_image: 'UPDATE users SET profile_name=?,profile_nickname = ? WHERE user_id = ?', //이미지
  sql_imagetest: 'SELECT profile_name FROM users WHERE user_id=?',
};

const usersDao = {
  //로그인 모델
  login: async function (userData, fn_callback) {
    try {
      const {email, password} = userData;
      const [resdata] = await db.query(sql.sql_login, [email]);
      //아이디 입력이 틀렸거나 아이디가 존재하지 않는경우
      if (resdata.length === 0) {
        fn_callback({
          status: 500,
          message: '존재하지 않는 아이디거나 잘못된 아이디입니다.',
          errCode: 'idErr',
        });
      } else {
        // console.log(resdata[0].user_id);
        const password_hash = resdata[0].password_hash;
        //bcrypt.compare 함수는 두 개의 인자를 받아오는데, 첫 번째 인자는 사용자가 입력한 패스워드이고, 두 번째 인자는 데이터베이스에서 가져온 해시된 패스워드입니다.
        //함수의 콜백에서 result 값이 true이면 비밀번호가 일치하고, false이면 비밀번호가 일치하지 않습니다.
        bcrypt.compare(password, password_hash, (err, result) => {
          if (err) {
            console.log(err);
          } else {
            if (result) {
              console.log('비밀번호 일치');
              fn_callback({
                status: 200,
                message: '로그인성공',
                sessionData: resdata[0].user_id,
                data: resdata[0],
              });
            } else {
              console.log('비밀번호 불일치');
              fn_callback({
                status: 500,
                message: '로그인실패',
                errCode: 'pwdErr',
              });
            }
          }
        });
      }
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: '로그인 통신실패'});
    }
  },
  //회원가입 모델
  signUp: async function (userData, imageName, imageNickname, fn_callback) {
    try {
      const {email, phone_number, password, nickname} = userData;
      const passwordHash = await bcrypt.hash(password, 12);
      const [resdata] = await db.query(sql.sql_signUp, [
        email,
        phone_number,
        passwordHash,
        nickname,
        imageName,
        imageNickname,
      ]);
      // console.log(resdata);
      fn_callback({status: 200, message: '등록됨'});
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: '등록실패'});
    }
  },
  //마이페이지 유저정보 호출
  userInfo: async function (userId, fn_callback) {
    try {
      const resdata = await db.query(sql.sql_userInfo, [userId]);
      fn_callback({status: 200, message: '읽기성공', data: resdata});
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: '읽기실패'});
    }
  },
  //마이페이지 유저 프로필 불러오기
  getUserProfile: async (user_id) => {
    try {
      const [resdata] = await db.query(sql.sql_getUserProfile, [user_id]);
      return {status: 200, message: '불러오기 성공', data: resdata};
    } catch (err) {
      console.log(err);
      return {status: 500, message: '불러오기 실패'};
    }
  },
  //마이페이지 유저 프로필 수정하기
  updateUserProfile: async (user_id, nickname, phone_number, email) => {
    try {
      const [resdata] = await db.query(sql.sql_updateUserProfile, [
        nickname,
        phone_number,
        email,
        user_id,
      ]);
      return {status: 200, message: '수정 성공', data: resdata};
    } catch (err) {
      console.log(err);
      return {status: 500, message: '수정 실패'};
    }
  },
  //유저 리스트 모델
  userList: async function (fn_callback) {
    try {
      const [resdata] = await db.query(sql.sql_userList);
      // console.log(resdata);
      fn_callback({
        status: 200,
        message: 'DB읽어오기 성공',
        data: resdata,
      });
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: 'DB읽어오기 실패'});
    }
  },
  //회원가입 중복 체크 모델
  check: async function (fn_callback) {
    try {
      const [resdata] = await db.query(sql.sql_check);
      fn_callback({
        status: 200,
        message: 'DB읽어오기 성공',
        data: resdata,
      });
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: 'DB읽어오기 실패'});
    }
  },
  //유저리스트 유저정보 삭제 모델
  // delete: async function (id, fn_callback) {
  //   try {
  //     const [resdata] = await db.query(sql.sql_userDelete, [Number(id)]);
  //     fn_callback({ status: 200, message: '삭제 성공' });
  //   } catch (err) {
  //     console.log(err);
  //     fn_callback({ status: 500, message: '삭제 실패' });
  //   }
  // },
  delete: async function (user_id, userData, fn_callback) {
    try {
      const {password} = userData;
      const [resdata] = await db.query(sql.sql_deleteInfo, [Number(user_id)]);
      if (resdata.length === 0) {
        fn_callback({
          status: 400,
          message: '존재하지 않는 사용자입니다.',
          errCode: 'idErr',
        });
      } else {
        const password_hash = resdata[0].password_hash;
        const passwordMatch = await bcrypt.compare(password, password_hash);
        console.log('passwordMatch=> ', passwordMatch)
        if (passwordMatch) {
          console.log('비밀번호 일치');
          await db.query(sql.sql_delete, [Number(user_id)]);
          console.log('resdata=> ', resdata);
          fn_callback({
            status: 200,
            message: '탈퇴 성공',
            sessionData: resdata[0].user_id,
            data: resdata[0],
          });
        } else {
          console.log('비밀번호 불일치');
          fn_callback({
            status: 400,
            message: '탈퇴 실패',
            errCode: 'pwdErr',
          });
        }
      }
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: '탈퇴 통신 실패'});
    }
  },
  image: async function (id, imageName, imagePath, fn_callback) {
    try {
      const [resdata] = await db.query(sql.sql_image, [imageName, imagePath, Number(id)]);
      fn_callback({status: 200, message: '등록됨'});
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: '등록실패'});
    }
  },
  imagetest: async function (id, fn_callback) {
    try {
      const [result] = await db.query(sql.sql_imagetest, [Number(id)]);
      fn_callback({status: 200, message: '성공', data: result});
    } catch (err) {
      console.log(err);
      fn_callback({status: 500, message: '실패'});
    }
  },
};

module.exports = usersDao;
