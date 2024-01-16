const db = require('../src/database');

const sql = {
    commentList: `SELECT c.comment_id, u.nickname, DATE_FORMAT(c.createdAt, '%Y-%m-%d') as createdAt
               FROM users u INNER JOIN comments c ON u.user_id = c.user_id
               ORDER BY c.comment_id DESC
               LIMIT ?, ?;`, // 댓글번호로 내림차순 (GROUP BY c.comment_id 해야하나?)
    comment: `SELECT u.nickname, content, DATE_FORMAT(c.createdAt, '%Y-%m-%d') as createdAt
            FROM users u INNER JOIN comments c ON u.user_id = c.user_id
            WHERE c.comment_id = ?;`, // 특정 강의 댓글 상세조회
    lectureCommentList: `SELECT c.comment_id, c.content, u.user_id, u.nickname, u.profile_name, DATE_FORMAT(c.createdAt, '%Y-%m-%d %H:%i') as createdAt
            FROM users u INNER JOIN comments c ON u.user_id = c.user_id
            WHERE c.course_id = ?
            ORDER BY c.createdAt DESC;`,
    insert: `INSERT INTO comments(content, course_id, user_id)
             VALUES(?, ?, ?)`,
    delete: 'DELETE FROM comments WHERE comment_id = ?',
    myLectureCommentList: `SELECT * FROM comments WHERE user_id = ?`,
};

const commentsDAO = {
    commentList: async (item, callback) => {
        const no = Number(item.no) - 1 || 0;
        const size = Number(item.size) || 10;

        try {
            const [resp] = await db.query(sql.commentList, [no * size, size]);
            const [cntResp] = await db.query(sql.totalCount);
            const totalPage = Math.ceil(cntResp[0].cnt / size);
            callback({ status: 200, message: '댓글 리스트 조회 성공', pageno: no + 1, pagesize: size, total: cntResp[0].cnt, totalPage, data: resp });
        } catch (error) {
            console.error(error);
            callback({ status: 500, message: '댓글 리스트 조회 실패', error: error });
        }
    },

    comment: async (id, callback) => {
        try {
            const resp = await db.query(sql.meet, [id]);
            if (resp.length === 0) { // comment_id에 해당하는 댓글이 없다면
                callback({ status: 500, message: '댓글 상세 조회 실패', error: error });
            } else {
                callback({ status: 200, message: '댓글 상세 조회 성공', data: resp[0] });
            }
        } catch (error) {
            console.error(error);
            callback({ status: 500, message: '댓글 상세 조회 실패', error: error });
        }
    },

    lectureCommentList: async(id,callback)=>{
        try{
            const [resp] = await db.query(sql.lectureCommentList,[id]);
            callback({status: 200,message: '강의 댓글 조회 성공', data: resp});
        }catch(error){
            callback({status: 500,message: '강의 댓글 조회 실패', error: error});
        }
    },

    insert: async (item, callback) => {
        console.log(item);
        try {
            await db.query(sql.insert, [item.comment, item.course_id, item.user_id]);
            const [resp] = await db.query(sql.lectureCommentList,[item.course_id]);
            callback({ status: 200, message: '댓글 생성 성공', data: resp });
        } catch (error) {
            console.error(error);
            callback({ status: 500, message: '댓글 생성 실패', error: error });
        }
    },

    delete: async (id, callback) => {
        try {
            const resp = await db.query(sql.delete, [id]);
            if (resp.affectedRows === 0) { //  해당 조건에 맞는 행이 존재하지 않는다면 affectedRows가 0
                callback({ status: 500, message: '댓글 삭제 실패', error: error });
            } else {
                callback({ status: 200, message: '댓글 삭제 성공' });
            }
        } catch (error) {
            console.error(error);
            callback({ status: 500, message: '댓글 삭제 실패', error: error });
        }
    },

    myLectureCommentList: async (user_id) => {
        try {
          const [rows, fields] = await db.query(sql.myLectureCommentList, [user_id]);
          return { status: 200, data: rows };
        } catch (error) {
          console.error('내 댓글 불러오기 중 에러 발생:', error);
          return { status: 500, message: '내 댓글 불러오기 실패', error: error.message };
        }
      },
};

module.exports = commentsDAO;