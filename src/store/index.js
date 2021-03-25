import { createStore } from 'vuex'
import router, { ResetRouter } from '@/router';
const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

const store = createStore({
  state: {
    // 用户信息
    userinfo: {},

    // 用于存储每个ajax请求的取消函数和ajax标识
    pending: [],
    // 全局字典
    dictionaries: {}
  },
  getters: {
    // 用户信息
    token: (state) => state.userinfo.token,
    userinfo: state => state.userinfo,

    // 全局请求记录缓存
    pending: state => state.pending,
    // 全局字典
    dictionaries: state => state.dictionaries,
  },
  mutations: {

    // 设置用户信息
    SET_USERINFO: (state, userinfo) => {
      if (userinfo) {
        state.userinfo = userinfo;
        localStorage.userinfo = JSON.stringify(userinfo)
      } else {
        //  如果userinfo为空， 则认为是退出登录
        state.userinfo = {};
        localStorage.removeItem('userinfo')
        store.commit('permission/SET_ROUTERS', [])
        ResetRouter();
        router.replace('/Login')
      }
    },

    // 存储每个ajax请求的取消函数和ajax标识
    ADD_PENGDING: (state, pending) => {
      state.pending.push(pending)
    },
    // 删除重复对应的ajax请求的取消函数和ajax标识
    REMOVE_PENGDING: (state, pending) => {
      for (let p in state.pending) {
        if (state.pending[p].u === (pending.url + '&' + pending.method)) { //当当前请求在数组中存在时执行函数体
          state.pending[p].f({
            code: 200,
            url: state.pending[p].u
          }); //执行取消操作
          state.pending.splice(p, 1); //把这条记录从数组中移除
        }
      }
    },
    // 终止所有请求
    REMOVE_PENGDINGS: (state) => {
      for (let p in state.pending) {
        state.pending[p].f({
          code: 200
        }); //执行取消操作
        state.pending.splice(p, 1); //把这条记录从数组中移除
      }
    },
    // 设置全局字典
    SET_Dictionaries(state, data) {
      state.dictionaries = data;
    }
  },
  actions: {
    // 设置用信息
    SET_USERINFO: ({
      commit
    }, userinfo) => {
      return new Promise((resolve) => {
        commit('SET_USERINFO', userinfo)
        resolve();
      })
    },
    // 设置全局字典
    SET_Dictionaries({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_Dictionaries', data);
        resolve();
      })
    }
  },
  modules
})
export default store;