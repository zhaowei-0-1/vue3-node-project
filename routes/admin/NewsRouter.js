
var express = require('express');
const NewsController = require('../../controller/admin/NewsController');

// multer 中间件
const multer = require('multer')
const upload = multer({ dest: 'public/newsuploads/' })

// 创建NewsRouter对象
var NewsRouter = express.Router();

// 涉及文件上传，普通post 不行，加 multer 中间件
NewsRouter.post("/adminapi/news/add", upload.single("file"), NewsController.add)
NewsRouter.get("/adminapi/news/list", NewsController.getList)

NewsRouter.post("/adminapi/news/list", upload.single("file"), NewsController.updateList)
NewsRouter.get("/adminapi/news/list/:id", NewsController.getList)
NewsRouter.put("/adminapi/news/publish", NewsController.publish)
NewsRouter.delete("/adminapi/news/list/:id", NewsController.delList)

module.exports = NewsRouter
