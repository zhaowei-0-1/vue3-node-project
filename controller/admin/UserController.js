const { model } = require("mongoose")
const UserService = require("../../service/admin/UserService")
const JWT = require("../../util/JWT")
// const JWT = require("../../util/JWT")
require("../../util/JWT")


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
    },

    upload: async (req, res) => {
        console.log(req.body, req.file, "req.body1")
        const { username, introduction, gender } = req.body
        const token = req.headers.authorization.split(" ")[1]; //空格分隔字符串
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""
        // 校验token
        var paylode = JWT.verify(token)
        console.log(paylode._id, "paylode")

        // 调用service 模块更新 数据
        await UserService.upload({
            _id: paylode._id, username,
            introduction, gender: Number(gender), avatar
        })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction,
                    gender: Number(gender),
                }
            })
        }
    },

    add: async (req, res) => {
        const { username, introduction, gender, role, password } = req.body;
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : "";
        await UserService.add({
            username,
            introduction, gender: Number(gender), avatar, role: Number(role), password
        });
        res.send({
            ActionType: "OK",
        })
    },

    getList: async (req, res) => {
        const result = await UserService.getList(req.params)
        res.send({
            ActionType: "OK",
            data: result
        })
    },

    putList: async (req, res) => {
        const result = await UserService.putList(req.body)
        res.send({
            ActionType: "OK",
        })

    },


    delList: async (req, res) => {
        // console.log(req.params.id)
        const result = await UserService.delList({ _id: req.params.id })
        res.send({
            ActionType: "OK",
            // data: result
        })

    },

}
module.exports = UserController