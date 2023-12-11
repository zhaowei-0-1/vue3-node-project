// 链接mongoDB数据库
const mongoose = require("mongoose")
// vue-system数据库名字
mongoose.connect("mongodb://127.0.0.1:27017/vue-system")