/* eslint-disable new-cap */
const express = require('express');
const router = express.Router();
const boardService = require('./../services/board.service');

router.get('/', async (req, res, next) => {
  try {
    const resp = await boardService.boardList(req.query);
    // console.log(resp);
    return res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const resp = await boardService.board(req.params);
    return res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.put('/', async (req, res, next) => {
  try {
    const resp = await boardService.update(req.body);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const resp = await boardService.insert(req.body);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const resp = await boardService.delete(req.params);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

// 리플 목록 조회
router.get('/reply/:id', async (req, res, next) => {
  try {
    const resp = await boardService.replyList(req.params);
    console.log(resp);
    res.json(resp);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
