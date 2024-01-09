const commentsDAO = require('../models/commentsDAO');

exports.commentInsert = async (req, res) => {
    const commentData = req.body;
    try {
        await commentsDAO.insert(commentData, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.commentUpdate = async (req, res) => {
    const commentData = req.body;
    try {
        await commentsDAO.update(commentData, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.commentDelete = async (req, res) => {
    const { comment_id } = req.params;
    try {
        await commentsDAO.delete(comment_id, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.commentList = async (req, res) => {
    const comment_list = req.query;
    try {
        await commentsDAO.commentList(comment_list, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.comment = async (req, res) => {
    const { comment_id } = req.params;
    try {
        await commentsDAO.comment(comment_id, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};