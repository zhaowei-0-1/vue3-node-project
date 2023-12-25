// 上传图片组件封装

import axios from 'axios'
function upload(path, userForm) {
    const params = new FormData()
    for (let i in userForm) {
        params.append(i, userForm[i])
    }
    // console.log(params, "params")
    return axios.post(path, params, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }).then(res => res.data)

}

export default upload