const eventsDAO = require('../models/eventsDAO');

exports.getEvents = async (req, res) => {
  const { user_id } = req.params;
  try {
    const resp = await eventsDAO.getEvents(user_id);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 조회 실패', error: error.message });
  }
};

exports.insertEvents = async (req, res) => {
  const { user_id, title, start, end, memo } = req.body;
  try {
    const resp = await eventsDAO.insertEvents(user_id, title, start, end, memo);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 추가 실패', error: error.message });
  }
};

exports.updateEvents = async (req, res) => {
  const { id } = req.params;
  const { title, start, end, memo } = req.body;
  try {
    const resp = await eventsDAO.updateEvents(id, title, start, end, memo);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 수정 실패', error: error.message });
  }
};

exports.deleteEvents = async (req, res) => {
  const { id } = req.params;
  try {
    const resp = await eventsDAO.deleteEvents(id);
    res.status(resp.status).send(resp);
  } catch (error) {
    console.error(error);
    res.status(500).send({ status: 500, message: '일정 삭제 실패', error: error.message });
  }
};