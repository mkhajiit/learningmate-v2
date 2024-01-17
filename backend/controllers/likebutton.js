const likebuttonDAO = require('../models/likebuttonDAO');

exports.addLikeButton = async (req, res) => {
  try {
    const {user_id, meet_id} = req.body;
    console.log(user_id);
    // 즐겨찾기 추가
    await likebuttonDAO.addLikeButton(user_id, meet_id);

    res.status(200).json({message: '즐겨찾기 추가 성공'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: '즐겨찾기 추가 실패'});
  }
};

exports.removeLikeButton = async (req, res) => {
  try {
    const {user_id, meet_id} = req.params;
    console.log(typeof user_id, meet_id);
    // 즐겨찾기 제거
    await likebuttonDAO.removeLikeButton(user_id, meet_id);

    res.status(200).json({message: '즐겨찾기 해제 성공'});
  } catch (error) {
    console.error(error);
    res.status(500).json({message: '즐겨찾기 해제 실패'});
  }
};

exports.getLikeButtonsByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    // 사용자의 모든 즐겨찾기 조회
    const likesbutton = await likebuttonDAO.getLikeButtonsByUserId(user_id);

    res.status(200).json(likesbutton);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: '즐겨찾기 조회 실패'});
  }
};
