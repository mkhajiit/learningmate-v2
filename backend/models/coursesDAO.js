const db = require('../src/database');

const sql = {
  courseList: `SELECT c.course_id, u.nickname, title, attach_image_path, DATE_FORMAT(c.createdAt, '%Y-%m-%d %H:%i') as createdAt
               FROM users u INNER JOIN courses c ON u.user_id = c.user_id
               ORDER BY c.course_id DESC;`, // 강의번호로 내림차순 (GROUP BY c.course_id 해야하나?)
  course: `SELECT c.user_id, c.course_id, u.nickname, title, content, category, attach_file_path, attach_file_name, attach_image_path, DATE_FORMAT(c.createdAt, '%Y-%m-%d') as createdAt
            FROM users u INNER JOIN courses c ON u.user_id = c.user_id
            WHERE c.course_id = ?;`, // 특정 강의 상세조회
  insert: `INSERT INTO courses(title, content, category, user_id, attach_file_path, attach_file_name, attach_image_path) 
             VALUES(?, ?, ?, ?, ?, ?, ?)`,
  update:
    'UPDATE courses SET title = ?, content = ?, category = ?, attach_file_path = ?, attach_file_name = ?, attach_image_path = ? WHERE course_id = ?',
  delete: 'DELETE FROM courses WHERE course_id = ?',
};

const coursesDAO = {
  courseList: async (callback) => {
    // const no = Number(item.no) - 1 || 0;
    // const size = Number(item.size) || 10;

    try {
      const [resdata] = await db.query(sql.courseList);
      // const [resp] = await db.query(sql.courseList, [no * size, size]);
      // const [cntResp] = await db.query(sql.totalCount);
      // const totalPage = Math.ceil(cntResp[0].cnt / size);
      callback({
        status: 200,
        message: '강의 리스트 조회 성공',
        data: resdata,
      });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 리스트 조회 실패', error: error });
    }
  },

  course: async (id, callback) => {
    try {
      const resp = await db.query(sql.course, [id]);
      if (resp[0].length === 0) {
        // course_id에 해당하는 강의가 없다면
        callback({ status: 500, message: '강의 상세 조회 실패', error: error });
      } else {
        callback({
          status: 200,
          message: '강의 상세 조회 성공',
          data: resp[0],
        });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 상세 조회 실패', error: error });
    }
  },

  insert: async (item, videoPath, videoName, imagePath, callback) => {
    try {
      const [resp] = await db.query(sql.insert, [
        item.title,
        item.content,
        item.category,
        item.user_id,
        videoPath,
        videoName,
        imagePath,
      ]);
      //resp.insertId로 insert된 데이터의 course_id를 추출가능
      callback({ status: 200, message: '강의 생성 성공', data: resp.insertId });
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 생성 실패', error: error });
    }
  },

  update: async (item, videoPath, videoName, imagePath, callback) => {
    try {
      const resp = await db.query(sql.update, [
        item.title,
        item.content,
        item.category,
        videoPath,
        videoName,
        imagePath,
        item.course_id,
      ]);
      if (resp.affectedRows === 0) {
        callback({ status: 500, message: '강의 수정 실패', error: error });
      } else {
        callback({ status: 200, message: '강의 수정 성공', data: resp });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 수정 실패', error: error });
    }
  },

  delete: async (id, callback) => {
    try {
      const resp = await db.query(sql.delete, [id]);
      if (resp.affectedRows === 0) {
        //  해당 조건에 맞는 행이 존재하지 않는다면 affectedRows가 0
        callback({ status: 500, message: '강의 삭제 실패', error: error });
      } else {
        callback({ status: 200, message: '강의 삭제 성공' });
      }
    } catch (error) {
      console.error(error);
      callback({ status: 500, message: '강의 삭제 실패', error: error });
    }
  },
};

module.exports = coursesDAO;
