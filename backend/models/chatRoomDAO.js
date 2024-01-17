const database = require('../src/database');
const participantsDAO = require('./participantsDAO');

const sql = {
  initialRoom: `
  SELECT DISTINCT
  m.title AS meets_title,
  u.nickname AS users_nickname,
  u.profile_name,
  cr.channel_id,
  cr.description
FROM
  meets m
JOIN
  chat_room cr ON m.meet_id = cr.meet_id
JOIN
  chat_history ch ON cr.channel_id = ch.channel_id
JOIN
  users u ON ch.sender_user_id = u.user_id
WHERE
  m.meet_id = ?`,

  channelChatRoom: `
  SELECT *
  FROM chat_room cr
    JOIN chat_history ch on cr.channel_id = ch.channel_id
    JOIN users u on u.user_id = ch.sender_user_id
  WHERE ch.channel_id = ?;
  `,

  channelList: `
    SELECT
      channel_id,
      description as channel_description
    FROM chat_room
    WHERE meet_id = ?`,

  sendMessage: `
    INSERT INTO chat_history (channel_id, content, sender_user_id, sent_time)
    VALUES (?, ?, ?, NOW())`,

  createChannel: `
  INSERT INTO chat_room (meet_id, description) VALUES (?, ?)
  `,
};

const chatRoomDAO = {
  getChatRoomInfo: async function (meetId, fn_callback) {
    try {
      const [resdata] = await database.query(sql.initialRoom, meetId);
      const flattenedData = resdata.flat();
      const formattedChatRoomInfo = {
        initialRoom: flattenedData,
      };
      fn_callback({
        status: 200,
        message: '채팅방 정보 조회 성공',
        data: formattedChatRoomInfo,
      });
    } catch (err) {
      console.error(err);
      fn_callback({status: 500, message: '채팅방 정보 조회 실패'});
    }
  },

  getChannelChatRoomData: async function (channelId, fn_callback) {
    try {
      const [channelData] = await database.query(sql.channelChatRoom, [channelId]);

      const formattedChannelChatRoom = {
        channelData: channelData.map((channel) => ({
          channel_description: channel.description,
          senderNickname: channel.nickname,
          content: channel.content,
          sentTime: channel.sent_time,
          profile: channel.profile_name,
        })),
      };

      fn_callback({
        status: 200,
        message: '채널 정보 조회 성공',
        data: formattedChannelChatRoom,
      });
    } catch (error) {
      console.error(error);
      fn_callback({status: 500, message: '채널 정보 조회 실패', error: error.message});
    }
  },

  getChannelList: async function (meetId, fn_callback) {
    try {
      const [channelList] = await database.query(sql.channelList, meetId);

      const formattedChannelList = {
        channelList: channelList.map((channel) => ({
          channel_id: channel.channel_id,
          channel_description: channel.channel_description,
        })),
      };

      fn_callback({
        status: 200,
        message: '채널 목록 조회 성공',
        data: formattedChannelList,
      });
    } catch (error) {
      console.error(error);
      fn_callback({status: 500, message: '채널 목록 조회 실패', error: error.message});
    }
  },

  sendMessage: async function (meetId, channelId, content, senderUserId, fn_callback) {
    try {
      // channelId와 meetId를 사용하여 채팅 메시지를 데이터베이스에 저장
      await database.query(sql.sendMessage, [channelId, content, senderUserId, meetId]);

      fn_callback({
        status: 200,
        message: '채팅 메시지 전송 성공',
      });
    } catch (error) {
      console.error(error);
      fn_callback({
        status: 500,
        message: '채팅 메시지 전송 실패',
        error: error.message,
      });
    }
  },

  createChannel: async function (meetId, description, fn_callback) {
    try {
      const result = await database.query(sql.createChannel, [meetId, description]);
      const channelId = result[0].insertId; // 수정된 부분
      console.log(channelId);
      console.log(description);

      const response = {
        status: 200,
        message: '채널 추가 성공',
        channel: {channel_id: channelId, description: description},
      };

      fn_callback(response);
    } catch (error) {
      fn_callback({
        status: 500,
        message: '채널 추가 실패',
        error: error.message,
      });
    }
  },
};

module.exports = chatRoomDAO;
