var express = require('express');
const UserController = require('../../controller/admin/UserController');
// 创建userRouter对象
var userRouter = express.Router();

/* GET home page. */
// 向 /adminapi/user/login 接口中发post 请求，进入UserController中处理
// 在app.js中注册接口
userRouter.post("/adminapi/user/login", UserController.login)

module.exports = userRouter;
