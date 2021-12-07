<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-start">
      <div class="dropdown mx-2">
        <button class="btn btn-primary dropbtn" @click="setRecommendType">영화 추천</button>
        <!-- 드랍다운 리스트 -->
        <div id="typeList" class="dropdown-content">
          <router-link :to="{ name: 'Latest' }" @click.native="getLatest">
            최신 영화 추천
          </router-link>
          <router-link :to="{ name: 'Rating' }" @click.native="getHighRating">
            평점 높은 영화
          </router-link>
          <router-link :to="{ name: 'Weather' }" @click.native="getWeatherBased">
            오늘 날씨에 어울리는 영화
          </router-link>
        </div>
      </div>

      <div class="ms-3">
        <h1 v-if="recommendType === 'latest'">
          최신 영화 추천
        </h1>
        <h1 v-else-if="recommendType === 'rating'">평점 높은 영화 추천</h1>
        <h1 v-else-if="recommendType === 'weather'">오늘 날씨에 어울리는 영화 추천</h1>
        <h1 v-else>영화를 추천 받아보세요</h1>
      </div>
    </div>
    <router-view/>
    
    <h1>영화 리스트</h1>
    <div class="card-group row">
      <movie-card
      v-for="movie in movies"
      :key="movie.id"
      :movie="movie"
      cursor: pointer 
      >
      </movie-card>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import { mapState } from 'vuex'
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'Home',
  data: function() {
    return {
      recommendType: null,
    }
  },
  components: { MovieCard, },
  created() {
    this.$store.dispatch('LoadMovies')
    this.recommendType = null
  },
  computed: {
    ...mapState(['movies']),
  },
  methods: {
    getLatest() {
      this.recommendType = 'latest'
      document.getElementById("typeList").classList.toggle("show")
    },
    getHighRating() {
      this.recommendType = 'rating'
      document.getElementById("typeList").classList.toggle("show")
    },
    getWeatherBased() {
      this.recommendType = 'weather'
      document.getElementById("typeList").classList.toggle("show")
    },
    setRecommendType() {
      if (!this.$store.state.isLogin) {
        this.$router.push({ name: 'Login' })
      } else {
        document.getElementById("typeList").classList.toggle("show")
      }
    }
  },

}
</script>

<style>
body {
  background-color: #1A1D29;
}
.dropbtn {
  color: white;
  font-size: 16px;
  border: none;
  cursor: pointer;
}
.dropbtn:hover, .dropbtn:focus {
  background-color: #2980B9;
}
.dropdown {
  position: relative;
  display: inline-block;
}
/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}
/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}
/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd}

.show {display: block;}
</style>
