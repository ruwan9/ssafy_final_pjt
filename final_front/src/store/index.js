import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// npm install --save vuex-persistedstate
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    movies: [],
    latest: [],
    rating: [],
    weather: [],
    movieData: {},
    posts: [],
    token: "",
    userName: "",
  },
  mutations: {
    LOAD_MOVIES(state, results) {
      state.movies = results;
    },
    LOAD_POSTS(state, results) {
      state.posts = results;
    },
    LOAD_DETAIL(state, detail) {
      // console.log(detail)
      state.movieData = detail;
    },
    SET_TOKEN(state, jwtToken) {
      state.token = jwtToken;
    },
    SET_RECOMMENDATIONS(state, recommendations) {
      console.log(recommendations);
      state.latest = recommendations[0];
      state.rating = recommendations[1];
      state.weather = recommendations[2];
    },
    LOGIN(state, username) {
      state.userName = username;
      state.isLogin = true;
    },
    LOGOUT(state) {
      state.userName = "";
      state.isLogin = false;
    },
  },
  actions: {
    SetToken({ commit }) {
      const token = localStorage.getItem("jwt");
      const config = {
        Authorization: `JWT ${token}`,
      };
      commit("SET_TOKEN", config);
    },
    LoadMovies({ commit }) {
      const baseUrl = "http://127.0.0.1:8000/";
      axios({
        method: "get",
        url: `${baseUrl}movies/`,
      })
        .then((res) => commit("LOAD_MOVIES", res.data))
        .catch((err) => console.error(err));
    },
    LoadPosts({ commit }) {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/community/",
      })
        .then((res) => commit("LOAD_POSTS", res.data))
        .catch((err) => console.error(err));
    },
    LoadDetail({ commit, state }, movieId) {
      const baseUrl = "http://127.0.0.1:8000/";
      axios({
        method: "get",
        url: `${baseUrl}movies/${movieId}`,
        headers: state.token,
      })
        .then((res) => commit("LOAD_DETAIL", res.data))
        .catch((err) => console.error(err));
    },
    GetRecommendations({ commit, state }) {
      axios({
        method: "get",
        url: "http://127.0.0.1:8000/movies/recommend/",
        headers: state.token,
      })
        .then((res) => {
          commit("SET_RECOMMENDATIONS", res.data);
        })
        .catch((err) => console.error(err));
    },
    LOGIN_CHANGE: function (state, loginStatus) {
      if (loginStatus) {
        state.isLogin = true
        // console.log(state.login)
      }
      else {
        state.isLogin = false
      }
    }
  },
  modules: {},
  plugins: [createPersistedState()],
});
