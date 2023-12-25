const UserModel = require("../../model/UserModel")

// 在数据库中查找匹配的用户记录
const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password
        })
    },

    upload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {
            return UserModel.updateOne(
                {
                    _id
                },
                {
                    username, introduction, gender, avatar
                })
        } else {
            return UserModel.updateOne(
                {
                    _id
                },
                {
                    username, introduction, gender,
                })
        }
    },

    add: async ({ username, introduction, gender, avatar, role, password }) => {
        return UserModel.create({
            username, introduction, gender, avatar, role, password,
        })
    },

    getList: async ({ id }) => {
        return id
            ? UserModel.find({ _id: id }, ["username", "role", "introduction", "password"])
            : UserModel.find({}, ["username", "role", "avatar", "introduction", "gender"])
    },

    putList: async (body) => {
        return UserModel.updateOne({ _id: body._id }, body)

    },

    delList: async ({ _id }) => {
        return UserModel.deleteOne({ _id })
    },

}

module.exports = UserService