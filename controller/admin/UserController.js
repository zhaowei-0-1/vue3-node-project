const { model } = require("mongoose")
const UserService = require("../../service/admin/UserService")

const UserController = {
    login: async (req, res) => {
        // req.body 调用UserService.login方法来验证用户的用户名和密码
        var result = await UserService.login(req.body)
        // 如果返回结果的长度为0，表示用户名和密码不匹配
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名密码不匹配"
            })
        } else {
            // 如果返回结果的长度不为0，表示用户名和密码匹配
            res.send({
                ActionType: "ok"
            })
        }
    }
}
module.exports = UserController