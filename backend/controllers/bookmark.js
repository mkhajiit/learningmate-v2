const bookmarkDAO = require('../models/bookmarkDAO');

exports.addBookmark = async (req, res) => {
    try {
        const { user_id, course_id } = req.body;

        // 즐겨찾기 추가
        await bookmarkDAO.addBookmark(user_id, course_id);

        res.status(200).json({ message: '즐겨찾기 추가 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '즐겨찾기 추가 실패' });
    }
};

exports.removeBookmark = async (req, res) => {
    try {
        const { user_id, course_id } = req.body;

        // 즐겨찾기 제거
        await bookmarkDAO.removeBookmark(user_id, course_id);

        res.status(200).json({ message: '즐겨찾기 해제 성공' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '즐겨찾기 해제 실패' });
    }
};

exports.getBookmarksByUserId = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        // 사용자의 모든 즐겨찾기 조회
        const bookmarks = await bookmarkDAO.getBookmarksByUserId(user_id);

        res.status(200).json(bookmarks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: '즐겨찾기 조회 실패' });
    }
};
