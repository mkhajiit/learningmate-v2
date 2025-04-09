const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const http = require('http'); // 소영 추가
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testRouter = require('./routes/test');

const meetRouter = require('./routes/meets');
const reviewRouter = require('./routes/reviews');
const likebuttonRouter = require('./routes/likebutton');
const app = express();
const courseRouter = require('./routes/courses'); // 나현 추가
const commentRouter = require('./routes/comments'); // 나현 추가
const bookmarkRouter = require('./routes/bookmark'); // 나현 추가
const eventRouter = require('./routes/events'); // 나현 추가
const chatRoutes = require('./routes/chatRoom'); // 소영 추가
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//정적경로를 public으로 설정
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//origin: 클라이언트의 주소 , 다른 포트로 쿠키를 보낼때는 cors 옵션에  credentials: true 추가해야함
//배포용 CORS 코드
// app.use(
//     cors({
//         origin: `https://web-learningmate-5r422alqajqbni.sel4.cloudtype.app`,
//         credentials: true,
//     })
// );

//로컬용 CORS 코드
app.use(
  cors({
    origin: ['http://localhost:3001', 'http://localhost:3000'],
    credentials: true,
  })
);
//라우터
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use(testRouter);

app.use('/meets', meetRouter); // 민경 추가
app.use('/reviews', reviewRouter); // 민경 추가
app.use('/likebutton', likebuttonRouter); // 민경 추가

app.use('/courses', courseRouter); // 나현 추가
app.use('/comments', commentRouter); // 나현 추가
app.use('/bookmark', bookmarkRouter); // 나현 추가
app.use('/events', eventRouter); // 나현 추가

app.use('/chat', chatRoutes); // 소영 추가

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
