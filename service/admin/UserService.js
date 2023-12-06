const UserModel = require("../../model/UserModel")

// 在数据库中查找匹配的用户记录
const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password
        })

    }

}

module.exports = UserService