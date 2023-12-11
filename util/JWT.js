
const jsonwebtoken = require("jsonwebtoken")
// 密钥
const secret = "vv"
const JWT = {
    // 生成token expires过期时间
    generate(value, expires) {
        return jsonwebtoken.sign(value, secret, { expiresIn:expires })
    },
    // 验证token
    verify(token) {
        try {
            return jsonwebtoken.verify(token, secret)
        } catch (e) {
            return false
        }
    }
}
// demo
// setTimeout((token) => {
//     console.log(JWT.verify(token), "JWT123")
// }, 3000)
// const token = JWT.generate({ name: "vv" }, "10s")
// console.log(JWT.verify(), "JWT")

module.exports = JWT