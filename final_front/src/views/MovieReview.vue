<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-4">
        <img :src="posterPath" class="img-fluid" alt="">
      </div>
      <div class="col-8">
        <div>
          <span class="fs-2">{{ movieData.title }}</span>
          <small class="ms-3">({{ movieData.original_title }}, {{ movieData.release_date }})</small>
        </div>
        <hr>
        <div class="d-flex justify-content-around">
          <span>
            <strong>장르</strong>
            {{ genres }}
          </span>
          <span>
            <strong>평점</strong>
            {{ movieData.vote_average }}
          </span>
          <span>
            <strong>누적관객</strong>
            {{ movieData.popularity }}
          </span>
        </div>
        <hr>
        <h2 class="text-start">영화 리뷰 작성</h2>
        <div>
          <!-- <form class="form-floating"> -->
            <input 
              type="text" 
              class="form-control" 
              id="title" 

              v-model="reviewForm.title"
              placeholder="리뷰 제목"
            >
            <!-- <label for="title" style="color: black" v-show="!reviewForm.title">리뷰 제목</label> -->
          <!-- </form> -->
        </div>
        <div>
          <textarea 
            class="form-control mt-4" 
            placeholder="리뷰를 작성하세요." 
            id="content" 
            style="height: 200px" 
            v-model="reviewForm.content"
          ></textarea>
          <!-- <label for="content" style="color: black">리뷰 작성</label> -->
        </div>
        <div class="d-flex justify-content-between">
          <div class="rank">
            <label for="rank" style="color: wheat">평점</label>
          <input 
            type="number" 
            id="rank"

            placeholder="평점"
            style="height: 50px" 
            v-model.number="reviewForm.rank"
          >
        </div>
          <button class="mx-3 btn btn-primary mt-3" @click="index !== undefined ? updateReview() : createReview()">
            {{index !== undefined ? '리뷰 수정' : '리뷰 작성'}}
          </button>
        </div>
      </div> 
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
// import StarRating from 'vue-star-rating'

export default {
  name: 'MovieReview',
  props: {
    review: Object,
    genres: String,
  },
  data: function() {
    const index = this.$route.params.reviewId;
    return {
      index: index,
      reviewForm: {
        title: index !== undefined ? this.review.title : "",
        content: index !== undefined ? this.review.content : "",      
        rank: index !== undefined ? this.review.rank : 0
      }
    }
  },
  methods: {
    createReview() {
      console.log(this.reviewForm)
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/movies/${ this.movieData.id }/reviews/`,
        headers: this.token,
        data: this.reviewForm,
      })
        .then(() => {
          // re-load movie 
          this.$store.dispatch('LoadDetail', this.movieData.id)
          // to review detail
          this.$router.push({ name: 'MovieDetail', params: { movieId: this.movieData.id} })
        })
        .catch(err => console.error(err))
    },
    updateReview() {
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/movies/${this.movieData.id}/reviews/${this.index}/update_delete/`,
        headers: this.token,
        data: this.reviewForm,
      })
        .then(() => {
          // re-load movie 
          this.$store.dispatch('LoadDetail', this.movieData.id)
          // to review detail
          this.$router.push({ name: 'MovieDetail', params: { movieId: this.movieData.id} })
        })
        .catch(err => console.error(err))
    },
  },
  computed: {
    ...mapState(['movieData', 'token']),
    posterPath() {
      return `https://image.tmdb.org/t/p/w500/${this.movieData.poster_path}`
    },
  },
  //   components: {
  //   StarRating,
  // }
}
</script>

<style>
strong {
  font-size: 130%;
}

.rank {
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  /* height: 50px */
  font-size: 120%;
}
</style>