const chatRoomDAO = require('../models/chatRoomDAO');

// 채팅방 정보를 조회하는 컨트롤러
const getChatRoomInfo = async (req, res) => {
  try {
    const meetId = req.params.meetId;

    // chatRoomDAO를 통해 채팅방 정보를 조회
    chatRoomDAO.getChatRoomInfo(meetId, (result) => {
      if (result.status === 200) {
        const {initialRoom, channelList, participantList} = result.data;

        res.status(200).json({
          success: true,
          message: '채팅방 정보 조회 성공',
          data: {
            initialRoom,
            channelList,
            participantList,
          },
        });
      } else {
        console.error('채팅방 정보 조회 실패:', result.message);
        res.status(result.status).json({
          success: false,
          message: '채팅방 정보 조회 실패',
          error: result.message,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '채팅방 정보 조회 실패',
      error: error.message,
    });
  }
};

const getChannelChatRoomData = async (req, res) => {
  try {
    const channelId = req.params.channelId;

    // chatRoomDAO를 통해 채널 채팅방 정보를 조회
    chatRoomDAO.getChannelChatRoomData(channelId, (result) => {
      if (result.status === 200) {
        const {channelData} = result.data; // 이 부분 수정

        res.status(200).json({
          success: true,
          message: '채팅방 정보 조회 성공',
          data: {
            channelChatRoomData: channelData, // 이 부분 수정
          },
        });
      } else {
        console.error('채팅방 정보 조회 실패:', result.message);
        res.status(result.status).json({
          success: false,
          message: '채팅방 정보 조회 실패',
          error: result.message,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '채팅방 정보 조회 실패',
      error: error.message,
    });
  }
};

const getChannelList = async (req, res) => {
  try {
    const meetId = req.params.meetId;

    // chatRoomDAO를 통해 채널 목록을 조회
    chatRoomDAO.getChannelList(meetId, (result) => {
      if (result.status === 200) {
        const {channelList} = result.data;

        res.status(200).json({
          success: true,
          message: '채널 목록 조회 성공',
          data: {
            channelList,
          },
        });
      } else {
        console.error('채널 목록 조회 실패:', result.message);
        res.status(result.status).json({
          success: false,
          message: '채널 목록 조회 실패',
          error: result.message,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '채널 목록 조회 실패',
      error: error.message,
    });
  }
};

const sendMessage = async (req, res) => {
  try {
    const {content, senderUserId} = req.body;
    const {meetId, channelId} = req.params;

    // chatRoomDAO를 통해 채팅 메시지를 데이터베이스에 저장
    chatRoomDAO.sendMessage(meetId, channelId, content, senderUserId, (result) => {
      if (result.status === 200) {
        res.status(200).json({
          success: true,
          message: '채팅 메시지 전송 성공',
          data: {
            // 필요한 경우 전송할 데이터 추가
          },
        });
      } else {
        console.error('채팅 메시지 전송 실패:', result.message);
        res.status(result.status).json({
          success: false,
          message: '채팅 메시지 전송 실패',
          error: result.message,
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: '채팅 메시지 전송 실패',
      error: error.message,
    });
  }
};

const createChannel = (req, res) => {
  const {meetId} = req.params;
  const {description} = req.body;

  chatRoomDAO.createChannel(meetId, description, (result) => {
    res.status(result.status).json({
      message: result.message,
      data: result.channel,
      error: result.error,
    });
  });
};

module.exports = {
  getChatRoomInfo,
  getChannelChatRoomData,
  getChannelList,
  sendMessage,
  createChannel,
};
