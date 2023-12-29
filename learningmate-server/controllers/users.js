const usersDao = require("../models/usersDAO");
const domain = require("../config/config.js");

exports.login = async (req, res) => {
    const userData = req.body;
    //세션에 저장할 user_id 세션 설정은 app.js같은 메인파일에서 합니다
    try {
        await usersDao.login(userData, (resp) => {
            if (resp.status === 200) {
                req.session.userId = resp.sessionData;
            }
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.signupUser = async (req, res) => {
    const userData = req.body;
    try {
        await usersDao.signUp(userData, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.userInfo = async (req, res) => {
    try {
        const userId = req.session.userId;
        await usersDao.userInfo(userId, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.logout = async (req, res) => {
    try {
        req.session.destroy();
        res.clearCookie("connect.sid");
        res.send({ status: 200, message: "로그아웃성공" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: 500, message: "서버 오류" });
    }
};

exports.userList = async (req, res) => {
    try {
        await usersDao.userList((resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        await usersDao.delete(id, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};
//회원가입 중복검사
exports.check = async (req, res) => {
    try {
        await usersDao.check((resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.image = async (req, res) => {
    const { id } = req.params;
    const imageUploadPath = `${domain.deployDomain}/images/users/`;
    //single("name") 업로드시 input태그의 네임
    //서버에서 이미지가 저장되는 경로(무조건 있어야함) app.js에 staticPath 설정해서 public이 경로에 안붙어있는거니 걱정안해도됨
    const imageName = req.file
        ? `${imageUploadPath}${req.file.filename}`
        : `${imageUploadPath}default.png`;
    //클라이언트의 이미지 절대경로(생략해도됨)
    const imagePath = req.file ? req.file.path : "";
    console.log(imageName);
    console.log(imagePath);
    try {
        await usersDao.image(id, imageName, imagePath, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};

exports.imagetest = async (req, res) => {
    const { id } = req.params;
    try {
        await usersDao.imagetest(id, (resp) => {
            res.send(resp);
        });
    } catch (err) {
        console.log(err);
    }
};
