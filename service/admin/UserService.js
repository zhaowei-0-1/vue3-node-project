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

}

module.exports = UserService