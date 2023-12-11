const { model } = require("mongoose")
const UserService = require("../../service/admin/UserService")
const JWT = require("../../util/JWT")


const UserController = {
    login: async (req, res) => {
        // 验证前端值是否传送到后端
        // console.log(req, body);
        // req.body 调用UserService.login方法来验证用户的用户名和密码
        var result = await UserService.login(req.body)
        // 如果返回结果的长度为0，表示用户名和密码不匹配
        if (result.length === 0) {
            res.send({
                code: "-1",
                error: "用户名密码不匹配"
            })
        } else {
            // 生成token
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "1d")

            // 授权
            res.header("Authorization", token)
            // res.setHeader("Authorization", token)
            // 如果返回结果的长度不为0，表示用户名和密码匹配
            res.send({
                ActionType: "ok",
                // 返回给前端值
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,//性别 0(保密)，1，2
                    introduction: result[0].introduction,//简介
                    avatar: result[0].avatar,
                    role: result[0].role, //管理员1，编辑2
                }
            })
        }
    }
}
module.exports = UserController