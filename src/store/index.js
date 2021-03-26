const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

import { createStore } from 'vuex'
import router, { ResetRouter } from '@/router';

import createPersistedState from 'vuex-persistedstate';

export default createStore({
  state: {
    // 用户信息
    userinfo: {},

    // 全局字典
    dictionaries: {}
  },
  getters: {
    // 用户token
    token: (state) => state.userinfo.token,
  },
  mutations: {

    // 设置用户信息
    SET_USERINFO: (state, userinfo) => {
      if (userinfo) {
        state.userinfo = userinfo;
      } else {
        //  如果userinfo为空， 则认为是退出登录
        state.userinfo = {};
        ResetRouter();
        router.replace({ name: 'Login', params: { source: '登录' } })
      }
    },
    // 设置全局字典
    SET_DICTIONARIES(state, data) {
      state.dictionaries = data;
    }
  },
  actions: {
  },
  modules,
  plugins: [createPersistedState()]
})