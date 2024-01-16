const chatpagingDAO = require('../models/chatpagingDAO');

const getChatMessages = async (req, res) => {
  try {
    const {meetId} = req.params;
    const {page, perPage} = req.query;

    const result = await chatpagingDAO.getChatMessages(meetId, page, perPage);

    res.status(result.status).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '채팅 메시지 조회 실패',
      error: error.message,
    });
  }
};

module.exports = {
  getChatMessages,
  // 다른 컨트롤러들 추가
};
