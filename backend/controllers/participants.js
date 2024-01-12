// 2023.12.27 추가

const participantsDAO = require('../models/participantsDAO');

exports.participantInsert = async (req, res) => {
  const participantData = req.body;
  try {
    await participantsDAO.insert(participantData, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.participantUpdate = async (req, res) => {
  const participantData = req.body;
  try {
    await participantsDAO.update(participantData, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.participantDelete = async (req, res) => {
  const {meet_id, participant_id} = req.params;
  try {
    await participantsDAO.participantDelete(meet_id, participant_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.participantList = async (req, res) => {
  const {meet_id} = req.params;
  try {
    await participantsDAO.participantList(meet_id, (resp) => {
      res.send(resp);
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getParticipantCount = async (req, res) => {
  const {meet_id} = req.params;

  try {
    await participantsDAO.getParticipantCount(meet_id, (resp) => {
      res.send({resp});
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({error: 'Internal Server Error'});
  }
};
