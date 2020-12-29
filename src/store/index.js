import { createStore } from 'vuex'

const modulesFiles = require.context('./modules', true, /\.js$/);
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

export default createStore({
  state: {
    dictionaries: {}
  },
  getters: {},
  mutations: {
    SET_Dictionaries(state, data) {
      state.dictionaries = data;
    }
  },
  actions: {
    SET_Dictionaries({ commit }, data) {
      return new Promise((resolve, reject) => {
        commit('SET_Dictionaries', data);
        resolve();
      })
    }
  },
  modules
})
