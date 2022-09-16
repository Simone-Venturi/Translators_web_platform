import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";
import { auth } from "./auth.module"
import { sentence } from "./sentence.module"
import { language } from "./language.module"
import { stat } from "./stat.module"
import { dataset } from "./dataset.module"
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
    language,
    stat,
    dataset
  },
  plugins: [createPersistedState()]
})