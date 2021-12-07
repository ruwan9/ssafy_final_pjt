<template>
  <div>
    <h1>오늘 날씨에 어울리는 영화 추천</h1>
    <div>
      <section id="sections1" class="position-relative" v-show="sectionIndex === 0">
      <!-- <a href="#section3" class="arrow__btn">‹</a> -->
        <button class="position-absolute top-50 start-0 btn btn-outline-light" style="z-index: 1;" @click="slideLeft">
          <i class="bi bi-chevron-double-left"></i>
        </button>
        <button class="position-absolute top-50 end-0 btn btn-outline-light" style="z-index: 1;" @click="slideRight">
          <i class="bi bi-chevron-double-right"></i>
        </button>
        <div class="card-group row">
          <movie-card
            v-for="movie in movieSections[0]"
            :key="movie.id"
            :movie="movie"
          >
          </movie-card>
        </div>
      <hr>
      </section>
      <section id="sections2" class="position-relative" v-show="sectionIndex === 1">
      <!-- <a href="#section3" class="arrow__btn">‹</a> -->
        <button class="position-absolute top-50 start-0 btn btn-outline-light" style="z-index: 1;" @click="slideLeft">
          <i class="bi bi-chevron-double-left"></i>
        </button>
        <button class="position-absolute top-50 end-0 btn btn-outline-light" style="z-index: 1;" @click="slideRight">
          <i class="bi bi-chevron-double-right"></i>
        </button>
        <div class="card-group row">
          <movie-card
            v-for="movie in movieSections[1]"
            :key="movie.id"
            :movie="movie"
          >
          </movie-card>
        </div>
      </section>
      <section id="sections3" class="position-relative" v-show="sectionIndex === 2">
      <!-- <a href="#section3" class="arrow__btn">‹</a> -->
        <button class="position-absolute top-50 start-0 btn btn-outline-light" style="z-index: 1;" @click="slideLeft">
          <i class="bi bi-chevron-double-left"></i>
        </button>
        <button class="position-absolute top-50 end-0 btn btn-outline-light" style="z-index: 1;" @click="slideRight">
          <i class="bi bi-chevron-double-right"></i>
        </button>
        <div class="card-group row">
          <movie-card
            v-for="movie in movieSections[2]"
            :key="movie.id"
            :movie="movie"
          >
          </movie-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import MovieCard from '@/components/MovieCard.vue'

export default {
  name: 'WeatherBasedMovies',
  data: function() {
    return {
      sectionIndex: 0,
      movieSections: [
        this.$store.state.weather.slice(0, 4),
        this.$store.state.weather.slice(4, 8),
        this.$store.state.weather.slice(8)
      ]
    }
  },
  components: { MovieCard, },
  methods: {
    slideLeft() {
      this.sectionIndex = (this.sectionIndex + 2) % 3
    },
    slideRight() {
      this.sectionIndex = (this.sectionIndex + 1) % 3
    }
  },
}
</script>

<style>

</style>