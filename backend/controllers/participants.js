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

// 다시 수정하기
exports.getMeetParticipantsCount = async (req, res) => {
  try {
    const {meet_id} = req.params;
    const result = await pool.query(
      'SELECT COUNT(*) AS participant_count FROM meet_participants WHERE meet_id = $1 AND status = 1',
      [meet_id]
    );
    const participantCount = result.rows[0].participant_count;
    res.json({participant_count: participantCount});
  } catch (err) {
    console.log(err);
    res.status(500).json({error: 'Internal Server Error'});
  }
};
