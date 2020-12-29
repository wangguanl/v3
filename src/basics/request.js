export const baseURL = 'http://103.131.171.71:8087/';
// export const baseImgURL = 'http://localhost:3000';
export const baseImgURL = 'http://103.131.171.71:8056/file/';
/* export const baseURL = location.protocol + '//' + location.hostname + ':3000/back/' */

import axios from 'axios';

import {
    ElMessage,
} from 'element-plus';
/*
    axios请求配置
 */
let instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // Token: 'bf120824-1071-4867-a683-0a4a8ebebd82'
    },

});
function encodeURIComponentData(data) {

    let urlStr = '';
    for (let k in data) {
        if (data[k] == undefined) {
            data[k] = '';
        }
        urlStr += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&';
    }
    return urlStr
}


// 拦截器设置全局请求参数
instance.interceptors.request.use(config => {
    // 上传文件
    if (config.headers['Content-Type'] === "multipart/form-data") {
        return config;
    }
    // 处理数据
    if (config.method === 'get') {
        config.url = config.url + ('?' + (encodeURIComponentData(config.params).slice(0, -1)))
    } else if (config.method === 'post') {
        config.data = JSON.stringify(config.data.data)
    }

    return config;
}, error => {

    ElMessage.error('网络错误！');
    return Promise.reject(error)
});

// 请求完成后 进行数据处理
instance.interceptors.response.use((response) => {
    console.log(response)
    console.log(response.data)
    const { data } = response
    if (data.code == '0') {
        if (data.tips == true) {
            ElMessage.success(data.message);
        }
        return data.data;
    } else if (data.code == '-3') {
        ElMessage.warning(data.message);
    } else {
        ElMessage.error(data.message);
        return Promise.reject();
    }
}, error => {
    if (error.message.code !== 200) {
        ElMessage.error('网络错误！');
        return Promise.reject(error);
    } else {
        return Promise.reject('手动终止请求');
    }
});

export default instance;