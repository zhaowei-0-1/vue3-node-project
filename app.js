var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userRouter = require('./routes/admin/UserRouter');
const JWT = require('./util/JWT');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
   /adminapi/* -后台系统
   /webapi/*    -官网门户使用
 */
// 中间件：
app.use((req, res, next) => {
  // 如果，token过期，返回 401错误
  // 判断是否是login接口
  if (req.url === "/adminapi/user/login") {
    next()
    return;
  }
  const token = req.header["authorization"].split(" ")[1] //空格分隔字符串
  // 如果授权通过 （token有效），next()
  if (token) {
    // 校验token
    var paylode = JWT.verify(token)
    console.log(paylode, "paylode--")
    if (paylode) {
      // const newToken = JWT.generate(paylode, "10s")
      const newToken = JWT.generate({
        _id: paylode._id,
        username: paylode.username
      }, "1d")
      res.setHeader("Authorization", newToken)
      next()
    } else {
      res.status(401).send({ errCode: "-1", errorInfo: "token过期" })
    }
  }
})
app.use(userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
