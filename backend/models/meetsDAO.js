const geolib = require('geolib');
const db = require('./../src/database');
// 주변위치 검색때 반경(km);
const radius = 2;
const sql = {
  meetList: `SELECT m.meet_id, title, content, onoff, category, image, DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt, latitude, longitude
             FROM users u INNER JOIN meets m ON u.user_id = m.user_id
             ORDER BY m.meet_id DESC`, // 미팅번호로 내림차순 (GROUP BY m.meet_id 해야하나?),
  meetListNoLimit: `SELECT u.nickname, m.meet_id, title, content, onoff,  image, DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt,latitude, longitude
             FROM users u INNER JOIN meets m ON u.user_id = m.user_id
             ORDER BY m.meet_id DESC`,
  meet: `SELECT m.meet_id, u.nickname, email, title, content, start_date, end_date, max_num, onoff, image, category, DATE_FORMAT(m.createdAt, '%Y-%m-%d') as createdAt, latitude, longitude
          FROM users u INNER JOIN meets m ON u.user_id = m.user_id
          WHERE m.meet_id = ?`, // 특정 미팅 상세조회
  insert: `INSERT INTO meets(title, content, start_date, end_date, max_num, onoff, image, category, user_id, latitude, longitude) 
           VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  update:
    'UPDATE meets SET title = ?, content = ?, start_date = ?, end_date = ?, max_num = ?, onoff = ?, image = ?, category = ?, latitude = ?, longitude = ?, updatedAt = NOW() WHERE meet_id = ?',
  delete: 'DELETE FROM meets WHERE meet_id = ?',
  totalCount: 'SELECT COUNT(*) as cnt FROM meets', // 총 게시물 개수
  myMeetList: 'SELECT * FROM meets WHERE user_id = ?',
};

const meetsDAO = {
  meetList: async (item, callback) => {
    // data 들어온거 확인 완료!
    const no = Number(item.no) - 1 || 0;
    const size = Number(item.size) || 5;

    try {
      const [resp] = await db.query(sql.meetList, [no * size, size]);
      const [cntResp] = await db.query(sql.totalCount);
      const totalPage = Math.ceil(cntResp[0].cnt / size);
      callback({
        status: 200,
        message: '모임 리스트 조회 성공',
        pageno: no + 1,
        pagesize: size,
        total: cntResp[0].cnt,
        totalPage,
        data: resp,
      });
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '모임 리스트 조회 실패', error: error});
    }
  },

  meet: async (id, callback) => {
    try {
      const resp = await db.query(sql.meet, [id]);
      if (resp.length === 0) {
        // meet_id에 해당하는 미팅이 없다면
        callback({status: 500, message: '모임 상세 조회 실패', error: error});
      } else {
        if (callback) {
          callback({
            status: 200,
            message: '모임 상세 조회 성공',
            data: resp[0],
          });
        }
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '모임 상세 조회 실패', error: error});
    }
  },
  // 주변 모임을 찾는 함수
  findNearbyMeetup: async (myLocation, callback) => {
    const [resp] = await db.query(sql.meetListNoLimit);
    try {
      // resp => db에서 가져온 모임들, if문으로 위치정보가 있는것만 걸러냄
      const nearbyMeets = resp.filter((response) => {
        if (response.latitude && response.longitude) {
          const distance = geolib.getDistance(
            {latitude: response.latitude, longitude: response.longitude},
            myLocation
          );
          const distanceInKm = distance / 1000;
          return distanceInKm <= radius;
        }
      });
      callback({status: 200, message: '통신성공', data: nearbyMeets});
    } catch (error) {
      console.log(error);
    }
  },

  insert: async (item, image) => {
    try {
      const resp = await db.query(sql.insert, [
        item.title,
        item.content,
        item.start_date,
        item.end_date,
        item.max_num,
        item.onoff,
        image,
        item.category,
        item.user_id,
        item.position.lat,
        item.position.lng,
      ]);

      return {status: 200, message: '모임 생성 성공', data: resp};
    } catch (err) {
      console.error(err);
      throw {status: 500, message: '서버 오류', error: err};
    }
  },

  update: async (meet_id, item, image) => {
    // data 들어온거 확인 완료!
    console.log(meet_id);
    try {
      const resp = await db.query(sql.update, [
        item.title,
        item.content,
        item.start_date,
        item.end_date,
        item.max_num,
        item.onoff,
        image,
        item.category,
        item.position.lat,
        item.position.lng,
        Number(meet_id),
      ]);
      return {status: 200, message: '모임 수정 성공', data: resp};
    } catch (error) {
      console.error(error);
      throw {status: 500, message: '서버 오류', error: err};
    }
  },

  delete: async (id, callback) => {
    // data 들어온거 확인 완료!
    try {
      const resp = await db.query(sql.delete, [id]);
      if (resp.affectedRows === 0) {
        //  해당 조건에 맞는 행이 존재하지 않는다면 affectedRows가 0
        callback({status: 500, message: '모임 삭제 실패', error: error});
      } else {
        callback({status: 200, message: '모임 삭제 성공'});
      }
    } catch (error) {
      console.error(error);
      callback({status: 500, message: '모임 삭제 실패', error: error});
    }
  },

  myMeetList: async (user_id) => {
    try {
      const [rows, fields] = await db.query(sql.myMeetList, [user_id]);
      return {status: 200, data: rows};
    } catch (error) {
      console.error('내 모임 불러오기 중 에러 발생:', error);
      return {status: 500, message: '내 모임 불러오기 실패', error: error.message};
    }
  },
};

module.exports = meetsDAO;
