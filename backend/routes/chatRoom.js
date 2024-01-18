const express = require('express');
const router = express.Router();
const chatRoomController = require('../controllers/chat');

router.get('/chatRoom/:meetId/channels/:channelId', chatRoomController.getChannelChatRoomData);
router.get('/chatRoom/:meetId', chatRoomController.getChatRoomInfo);
router.get('/channels/:meetId', chatRoomController.getChannelList);
// router.get(
//   '/chatRoom/:meetId/channels/:channelId/date/:date',
//   chatRoomController.getChannelChatRoomDataByDate
// );
router.post('/sendMessage/:meetId/:channelId', chatRoomController.sendMessage);
router.post('/chatRoom/:meetId/channels', chatRoomController.createChannel);

module.exports = router;
