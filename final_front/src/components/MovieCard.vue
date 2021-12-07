<template>
  <div class="col-3">
    <div 
      class="card" 
      cursor: pointer 
      @click="getDetail"
    >
      <img :src="posterPath" alt="">
      <div class="card-body">
        <h5 class="card-title crop-text-2">{{ movie.title }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MovieCard',
  props: {
    movie: Object
  },
  // 끼워맞춘거같으니까 한 번 더 보기...
  // created: function() {
  //   const token = localStorage.getItem('jwt')
  //   if (token) {
  //     this.$store.state.isLogin = true
  //   } else {
  //     this.$store.state.isLogin = false
  //   }
  // },
  methods: {
    // setToken: function() {
    //   const token = localStorage.getItem('jwt')
    //   const config = {
    //     Authorization: `JWT ${token}`
    //   }
    //   return config
    // },

    getDetail() {
      if (!this.$store.state.isLogin) {
        this.$router.push({ name: 'Login' })
        // console.log(this.$store.state.isLogin)
      } else {
        // this.$store.dispatch('Test')
        this.$store.dispatch('LoadDetail', this.movie.id)
        this.$router.push({ name: 'MovieDetail', params: { movieId: this.movie.id} })
      }
    }
  },
  computed: {
    posterPath() {
      return `https://image.tmdb.org/t/p/w500/${this.movie.poster_path}`
    }
  },

}
</script>

<style>
  .card {
    background-color: #1A1D29
  }
  .crop-text-2 {
    -webkit-line-clamp: 2;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    color: wheat;
  }
</style>