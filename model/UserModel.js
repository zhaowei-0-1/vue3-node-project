// 引入mongoose
const mongoose = require("mongoose")
// Schema定义了数据模型的结构
const Schema = mongoose.Schema
// 限制
const UserType = {
    username: String,
    password: String,
    gender: Number,//性别 0，1，2
    introduction: String,//简介
    avatar: String,
    role: Number //管理员1，编辑2
}

// 创建模型user===>users集合
const UserModel = mongoose.model("user", new Schema(UserType))
module.exports = UserModel