// 拦截器 使用axios库对HTTP请求进行拦截和处理 https://github.com/axios/axios#interceptors
import axios from 'axios'
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    // 每次发请求，从localStorage中获取token
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`

    return config;
}, function (error) {
    //     // Do something with request error

        const { status } = error.response
        // 如果响应的状态码为401未经授权
        if (status === 401) {
            localStorage.removeItem("token")
            window.location.href = "#/login"
        }
    return Promise.reject(error);
});

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    // console.log(response.headers,"======H")
    // 解构
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});