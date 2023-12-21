var express = require('express');
const UserController = require('../../controller/admin/UserController');
// 创建userRouter对象
var UserRouter = express.Router();

//multer,图片上传模块
const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })

/* GET home page. */
// 向 /adminapi/user/login 接口中发post 请求，进入UserController中处理
// 在app.js中注册接口
UserRouter.post("/adminapi/user/login", UserController.login)
UserRouter.post("/adminapi/user/upload", upload.single('file'), UserController.upload)
// demo
// userRouter.get("/adminapi/user/home", (req, res) => {
//     res.send({ ok: 1 })
// })

module.exports = UserRouter;
