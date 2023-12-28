// 使用Mongoose库在Node.js中定义一个名为"news"的MongoDB模型 
// 引入mongoose
const mongoose = require("mongoose")
// Schema定义了数据模型的结构
const Schema = mongoose.Schema
// 字段类型
const NewsType = {
    title: String,
    content: String,
    category: Number,//类别 1，2，3
    cover: String, //封面
    isPublish: Number,//未发布，已发布
    role: Number, //管理员 1 编辑2
    editTime: Date

}

// 
const NewsModel = mongoose.model("news", new Schema(NewsType))
module.exports = NewsModel