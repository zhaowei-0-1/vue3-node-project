const NewsModel = require("../../model/NewsModel")

const NewsService = {
    add: async ({ title, content, category, isPublish, cover, editTime }) => {
        // console.log("数据库模型处理")
        return NewsModel.create({
            title, content, category, isPublish, cover, editTime
        })
    },

    updateList: ({ _id, title, content, category, isPublish, cover, editTime }) => {
        if (cover) {
            return NewsModel.updateOne(
                { _id }, { title, content, category, isPublish, cover, editTime }
            )
        } else {
            return NewsModel.updateOne(
                { _id }, { title, content, category, isPublish, editTime }
            )
        }
    },

    getList: async ({ _id }) => {
        // id为真查当前数据，id为假所有数据
        return _id ? NewsModel.find({ _id }) : NewsModel.find()
    },

    publish: async ({ _id, isPublish, editTime }) => {
        return NewsModel.updateOne(
            {
                _id
            },
            {
                isPublish,
                editTime
            },
        )
    },

    delList: async ({ _id }) => {
        return NewsModel.deleteOne({
            _id
        })
    },

}

module.exports = NewsService