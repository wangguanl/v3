import axios from 'axios';
import {
    ElMessage,
} from 'element-plus';
import {
    baseURL
} from '@/basics/baseURL';
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

// 拦截器设置全局请求参数
instance.interceptors.request.use(config => {

    // 上传文件
    if (config.headers['Content-Type'] === "multipart/form-data") {
        return config;
    }

    let sss = {}
    let transData = {}

    if (config.method === 'get' || config.method === 'delete') {
        sss = config
        transData = config.params
    } else if (config.method === 'post') {
        sss = {
            trans: 'query',
            ...config.data,
        }
        transData = config.data.data
    }
    let {
        res, // 是否全部返回response
        trans, // 是否将数据转为query形式
    } = sss;
    // 处理数据
    config.transformRequest = [(data = {}) => {
        if (trans === 'query') {
            let newData = '';
            for (let k in transData) {
                if (transData[k] == undefined) {
                    transData[k] = '';
                }
                newData += encodeURIComponent(k) + '=' + encodeURIComponent(transData[k]) + '&';
            }
            config.url = config.url + ('?' + (newData.slice(0, -1)))
        } else if (trans === 'body') {
            return JSON.stringify(transData);
        }
    }]

    config.transformResponse = [data => {
        return {
            res,
            ...JSON.parse(data)
        };

    }]
    return config;

}, error => {
    ElMessage.error('网络错误！');
    return Promise.reject(error)
});

// 请求完成后 进行数据处理
instance.interceptors.response.use(({
    data
}) => {
    return data.data;
    /* if (data.code == '0') {
        if (data.tips == true) {
            ElMessage.success(data.message);
        }
        return data.res ? data : data.data;
    } else if (data.code == '-3') {
        ElMessage.warning(data.message);
        // store.commit('SET_USERINFO');

    } else {
        ElMessage.error(data.message);
        return Promise.reject();
    } */


}, error => {
    if (error.message.code !== 200) {
        ElMessage.error('网络错误！');
        return Promise.reject(error);
    } else {
        return Promise.reject('手动终止请求');
    }
});

export default instance;