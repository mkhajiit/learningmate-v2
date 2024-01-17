// 2023.12.27 추가

// const participantsDAO = require('../models/participantsDAO');

// exports.participantInsert = async (req, res) => {
//   const {meet_id} = req.params;
//   const participantData = req.body;
//   try {
//     await participantsDAO.insert(meet_id, participantData, (resp) => {
//       res.send(resp);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.participantUpdate = async (req, res) => {
//   const participantData = req.body;
//   try {
//     await participantsDAO.update(participantData, (resp) => {
//       res.send(resp);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.participantDelete = async (req, res) => {
//   const {meet_id, participant_id} = req.params;
//   try {
//     await participantsDAO.participantDelete(meet_id, participant_id, (resp) => {
//       res.send(resp);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.participantList = async (req, res) => {
//   const {meet_id} = req.params;
//   try {
//     await participantsDAO.participantList(meet_id, (resp) => {
//       res.send(resp);
//     });
//   } catch (err) {
//     console.log(err);
//   }
// };

// exports.getParticipantCount = async (req, res) => {
//   const {meet_id} = req.params;

//   try {
//     await participantsDAO.getParticipantCount(meet_id, (resp) => {
//       res.send({resp});
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).send({error: 'Internal Server Error'});
//   }
// };

// exports.checkJoinStatus = async (req, res) => {
//   try {
//     const meet_id = req.query.meet_id;
//     const user_id = req.query.user_id;

//     const joinStatus = await participantsDAO.checkJoinStatus(meet_id, user_id);

//     if (joinStatus) {
//       res.status(200).json({status: 200, message: '참가 여부 확인 성공'});
//     } else {
//       res.status(404).json({status: 404, message: '참가 여부 확인 실패'});
//     }
//   } catch (error) {
//     console.error('참가 여부 확인 중 에러:', error);
//     res.status(500).json({status: 500, message: '서버 오류'});
//   }
// };
