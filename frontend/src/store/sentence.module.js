export const sentence = {
  namespaced: true,
  state: {
    emptyStringElement: ' .'
  },
  actions: {},    
  mutations: {},
  getters: {
    getRegex(){
      return new RegExp(/[^.?!]+[.!?]+[\])'"`’”]*|.+/, 'g')
    },
    getEmptyStringElement(state){
      return state.emptyStringElement
    }
  }
};