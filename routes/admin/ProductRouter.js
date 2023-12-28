
var express = require('express');
const ProductController = require('../../controller/admin/ProductController');
// multer 中间件
const multer = require('multer');
const upload = multer({ dest: 'public/productuploads/' })

// 创建NewsRouter对象
var ProductRouter = express.Router();

// 涉及文件上传，普通post 不行，加 multer 中间件
ProductRouter.post("/adminapi/product/add", upload.single("file"),ProductController.add)
ProductRouter.post("/adminapi/product/list", upload.single("file"),ProductController.updateList)
ProductRouter.get("/adminapi/product/list", ProductController.getList)
ProductRouter.get("/adminapi/product/list/:id", ProductController.getList)
ProductRouter.delete("/adminapi/product/list/:id", ProductController.delList)


module.exports = ProductRouter