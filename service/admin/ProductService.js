const ProductModel = require("../../model/ProductModel")

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        // console.log("数据库模型处理")
        return ProductModel.create({
            title, introduction, detail, cover, editTime
        })
    },

    updateList: ({ _id, title, introduction, detail, cover, editTime }) => {
        if (cover) {
            return ProductModel.updateOne(
                { _id }, { title, introduction, detail, cover, editTime }
            )
        } else {
            return ProductModel.updateOne(
                { _id }, { title, introduction, detail, cover, editTime }
            )
        }
    },

    getList: async ({ _id }) => {
        // id为真查当前数据，id为假所有数据
        return _id ? ProductModel.find({ _id }) : ProductModel.find()
    },

    delList: async ({ _id }) => {
        return ProductModel.deleteOne({
            _id
        })
    },


}

module.exports = ProductService