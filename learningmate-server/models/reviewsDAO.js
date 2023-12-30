// 2023.12.27 수정 중

const db = require('./../src/database');

const sql = {
  reviewList: `SELECT r.review_id, m.meet_id, u.nickname, r.content
               FROM meet_reviews r INNER JOIN users u ON r.user_id = u.user_id INNER JOIN meets m ON r.meet_id = m.meet_id
               WHERE m.meet_id = ?;`, // 미팅번호로 내림차순
  review: `SELECT r.review_id, m.meet_id, u.nickname, r.content
           FROM meet_reviews r INNER JOIN users u ON r.user_id = u.user_id INNER JOIN meets m ON r.meet_id = m.meet_id
           WHERE m.meet_id = ? AND r.review_id = ?;`, // 특정 미팅 상세조회
  insert: 'INSERT INTO meet_reviews (user_id, meet_id, content) VALUES(?, ?, ?)',
  delete: 'DELETE FROM meet_reviews WHERE review_id = ? AND user_id = ?',
  totalCount: 'SELECT COUNT(*) as cnt FROM meet_reviews' // 총 리뷰 개수 필요..?
};

const reviewsDAO = {
  reviewList: async (meet_id, callback) => { // 데이터 확인 
    try {
      const resp = await db.query(sql.reviewList, [meet_id]);
      if (resp.length === 0) { // meet_id에 해당하는 미팅이 없다면
        callback({ status: 500, message: '모임 상세 조회 실패', error: error });
      } else {
        callback({ status: 200, message: '모임 상세 조회 성공', data: resp[0] });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '모임 상세 조회 실패', error: error });
    }
  },

  review: async (meet_id, review_id, callback) => { // 데이터 확인 
    try {
      const resp = await db.query(sql.review, [meet_id, review_id]);
      if (resp.length === 0) { // meet_id, review_id에 해당하는 미팅이 없다면
        callback({ status: 500, message: '리뷰 조회 실패', error: error });
      } else {
        callback({ status: 200, message: '리뷰 조회 성공', data: resp[0] });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '리뷰 조회 실패', error: error });
    }
  },

  // meet_participants 테이블에서 user_id의 status를 확인하는 함수 (status가 1이면 리뷰 작성 가능, 리뷰 작성용)
  participantActive: async (user_id) => {
    try {
      const [result] = await db.query('SELECT status FROM meet_participants WHERE user_id = ?', [user_id]);
      console.log(result);

      if (result.length > 0) {
        // status가 1이면 모임 허가된 참가자
        return result[0].status === 1;
      }

      // 사용자가 meet_participants 테이블에 없으면 리뷰를 작성할 권한이 없음
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  // 리뷰 생성 함수
  insert: async (item, callback) => { // 데이터 확인 
    try {
      // 리뷰를 작성하려는 사용자의 status 확인
      const userActive = await reviewsDAO.participantActive(item.user_id);

      if (!userActive) {
        callback({ status: 403, message: '리뷰를 작성할 권한이 없는 사용자입니다.' });
        return;
      }

      // meet_participants 테이블에서 status가 1인 사용자만 리뷰를 작성할 수 있게 조건 추가
      const resp = await db.query(sql.insert, [item.user_id, item.meet_id, item.content]);
      callback({ status: 200, message: '리뷰 생성 성공', data: resp });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '리뷰 생성 실패', error: error });
    }
  },

  // 작성자 확인 함수 (리뷰 작성자가 본인인지)
  checkReviewAuthor: async (review_id, user_id) => {
    try {
      const [result] = await db.query('SELECT user_id FROM meet_reviews WHERE review_id = ?', [review_id]);
      // console.log('checkReviewAuthor=> ', result);

      if (result.length === 0) {
        return false; // 리뷰가 존재하지 않음
      }
      // console.log('checkReviewAuthor end');
      const author_id = result[0].user_id;
      console.log(author_id, user_id);
      return Number(author_id) === Number(user_id);
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  // 리뷰 삭제 함수
  delete: async (review_id, user_id, callback) => { // 데이터 확인
    try {
      // 리뷰를 삭제하기 전에 작성자인지 확인
      const isAuthor = await reviewsDAO.checkReviewAuthor(review_id, user_id);
      console.log(isAuthor);
      if (!isAuthor) {
        callback({ status: 403, message: '리뷰 삭제 권한이 없습니다.' });
        return;
      }

      // 리뷰를 삭제
      const resp = await db.query(sql.delete, [Number(review_id), Number(user_id)]);
      console.log(resp);

      if (resp.affectedRows === 0) {
        callback({ status: 500, message: '리뷰 삭제 실패' });
      } else {
        console.log(callback({ status: 200, message: '리뷰 삭제 성공' }));
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '리뷰 삭제 실패', error: error });
    }
  },
};

module.exports = reviewsDAO;