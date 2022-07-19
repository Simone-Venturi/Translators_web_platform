export const sentence = {
  namespaced: true,
  state: {
    regex: new RegExp(/[^.?!]+[.!?]+[\])'"`’”]*|.+/, 'g'),
    emptyStringElement: ' .'
  },
  actions: {},    
  mutations: {},
  getters: {
    getRegex(state){
      return state.regex
    },
    getEmptyStringElement(state){
      return state.emptyStringElement
    }
  }
};