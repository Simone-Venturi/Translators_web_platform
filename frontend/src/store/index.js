import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { auth } from "./auth.module"
import { sentence } from "./sentence.module"
import { language } from "./language.module"
export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    sentence,
    language
  },
  plugins: [createPersistedState()]
})