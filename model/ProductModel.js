// 使用Mongoose库在Node.js中定义一个名为"product"的MongoDB模型 
// 引入mongoose
const mongoose = require("mongoose")
// Schema定义了数据模型的结构
const Schema = mongoose.Schema
// 字段类型
const ProductType = {
    title: String,
    introduction: String,
    detail: String,
    cover: String, //封面
    editTime: Date

}

// 
const ProductModel = mongoose.model("product", new Schema(ProductType))
module.exports = ProductModel