import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    news : "",
  },
  getters: {
    news: state =>{
      return state.news;
    }
  },
  mutations: {
    SET_News(state,news){
      state.news = news
    }
  },
  actions: {
    chargerAllNews({commit}){
      http.get("/news")
      .then(response => response.data)
      .then(news =>  {
        console.log("----------")
        console.log(news.resultData[0])
        console.log("----------")
        commit('SET_News', news)
      })
       .catch((err) => {console.log(err)})
      
    }
  },
  modules: {
  }
})
