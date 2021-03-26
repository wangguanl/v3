/* export const baseURL = location.protocol + '//' + location.hostname + ':3000/back/' */
import Pending from './pending'
import axios from 'axios';

import {
    ElMessage,
} from 'element-plus';
/*
    axios请求配置
 */
let instance = axios.create({
    baseURL: '/',
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        // Token: 'bf120824-1071-4867-a683-0a4a8ebebd82'
    },

});
/* 终止重复请求 */
const CancelToken = axios.CancelToken;
export const PD = new Pending();

// 拦截器设置全局请求参数
instance.interceptors.request.use(config => {
    // 终止重复请求
    PD.REMOVE_PENGDING(config);
    config.cancelToken = new CancelToken((c) => {
        // 标识是用请求地址&请求方式拼接的字符串
        PD.ADD_PENGDING({ u: (config.url + '&' + config.method), f: c })
    });
    // 上传文件
    if (config.headers['Content-Type'] === "multipart/form-data") {
        return config;
    }
    // 处理数据
    if (config.method === 'get') {
        config.url = config.url + ('?' + (encodeURIComponentData(config.params).slice(0, -1)))
    } else if (config.method === 'post') {
        config.data = config.data ? JSON.stringify(config.data.data) : {}
    }

    return config;
}, error => {

    ElMessage.error('网络错误！');
    return Promise.reject(error)
});

// 请求完成后 进行数据处理
instance.interceptors.response.use(({ data }) => {
    const { result, code, message } = data;
    if (code == 200) {
        /* if (tips == true) {
            ElMessage.success(message);
        } */
        return result;
    } else {
        ElMessage.error(message);
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

export default instance;