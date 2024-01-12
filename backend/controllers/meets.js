// 2023.12.26 추가

const meetsDAO = require('../models/meetsDAO');

exports.meetInsert = async (req, res) => {
  const meetData = req.body;
  try {
    await meetsDAO.insert(meetData, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.meetUpdate = async (req, res) => {
  const meetData = req.body;
  try {
    await meetsDAO.update(meetData, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.meetDelete = async (req, res) => {
  const { meet_id } = req.params;
  try {
    await meetsDAO.delete(meet_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.meetList = async (req, res) => {
  const meet_list = req.query;
  try {
    await meetsDAO.meetList(meet_list, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.meet = async (req, res) => {
  const { meet_id } = req.params;
  try {
    await meetsDAO.meet(meet_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

// exports.findNearbyMeetup = async(req,res) =>{
//   //프론트에서 현재 사용자의 위치({위도,경도})를 보내준다
//   const myLocation = req.body;
//   try{
//     await meetsDAO.findNearbyMeetup(myLocation,(resp)=>{
//       res.send(resp);
//     });
//   }catch (err){
//     console.log(err);
//   }
// };