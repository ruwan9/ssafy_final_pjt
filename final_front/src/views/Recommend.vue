<template>
  <div>
    <h1>Recommend</h1>

    <h3 class="content-font" v-if="newest_movies.length === 10">최신 영화</h3>
    <movie-card :movies="newest_movies"/>

  </div>
</template>

<script>

import axios from 'axios'
import _ from 'lodash'
import MovieCard from "@/components/MovieCard"

// import VueJwtDecode from "vue-jwt-decode"

const SERVER_URL = process.env.VUE_APP_SERVER_URL

export default {
  name: "Recommend",
  data: function () {
    return {
      movies: [],
      movie: '',
      newest_movies: [],
    }
  },
  components: {
    MovieCard,
  },
  methods: {
    getToken: function () {
      const token = localStorage.getItem('jwt')

      const config = {
        headers: {
          Authorization: `JWT ${token}`
        },
      }
      return config
    },
    getMovieDatas: function () {
      axios.get(`${SERVER_URL}/movies/`)
      .then( (res) => {
        if (this.$store.state.movies.length === 0) {
          this.$store.state.movies = res.data
        }
        const randomIdx = _.random(res.data.length-1)
        this.movie = res.data[randomIdx]
        const numbers = _.range(1, res.data.length);
        const sampleNums = _.sampleSize(numbers, 30);
        

        for (const key in sampleNums) {
          this.movies.push(res.data[sampleNums[key]])
        }
      })
      .catch( (err) => {
        console.log(err)
      })
    },
    getRecommend: function () {
      const config = this.getToken()

      const item = {
        movies: this.user.like_movies,
      }
      axios.post(`${SERVER_URL}/movies/recommend/`, item, config)
      .then( (res) => {
        // console.log(res)
        this.newest_movies = res.data[0]
      })
      .catch( (err) => {
        console.log(err)
      })

    }
  },
  created: function () {
    this.getMovieDatas()
    this.getMyName()
    // this.getRecommend()
  },
}
</script>

<style>
  .main {
    width: 90%;
    height: 50%;
    object-fit: cover;
  }
    .banner {
        -moz-align-items: center;
        -webkit-align-items: center;
        -ms-align-items: center;
    width: 80%;
    height: 50%;    
    object-fit: cover;
        align-items: center;
        display: -moz-flex;
        display: -webkit-flex;
        display: -ms-flex;
        display: flex;
        -moz-justify-content: center;
        -webkit-justify-content: center;
        -ms-justify-content: center;
        justify-content: center;
        /* padding: 8em 4em 6em 4em; */
        /* min-height: 70vh; */
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        border-top: 0;
        position: relative;
        text-align: center;
        overflow: hidden;
    }

  .inner {
    text-align: center;
    position: relative;
    z-index: 2;
  }


  .more {
    background-position: center 1.35em;
    background-repeat: no-repeat;
    background-size: auto;
    border: 1px solid #fff;
    border-radius: 100%;
    color: rgba(255, 255, 255, 0.75);
    display: block;
    height: 4em;
    text-indent: 4em;
    overflow: hidden;
    white-space: nowrap;
    width: 4em;
    z-index: 2;
    margin: 0 auto 2em auto;
  }
</style>