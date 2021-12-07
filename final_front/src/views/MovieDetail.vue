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
            <strong>장르: </strong>
            {{ genreStr }}
          </span>
          <span>
            <strong>누적관객</strong>
            {{ movieData.popularity }}
          </span>
          <span>
            <div class="d-flex">
              <strong>평점</strong>
              <!-- {{ movieData.vote_average }} -->
              <star-rating :rating="parseFloat( movieData.vote_average ) / 2" :read-only="true" :increment="0.01" :star-size="15"  :border-width="5" border-color="#d8d8d8" :rounded-corners="true" :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"></star-rating>
            </div>
          </span>

        </div>
        <hr>
        <ul class="nav nav-tabs" id="Tab" role="tablist">
          <li class="nav-item" role="presentation">
            <button class="nav-link active" id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="true">줄거리</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="reviews-tab" data-bs-toggle="tab" data-bs-target="#reviews" type="button" role="tab" aria-controls="reviews" aria-selected="false">리뷰</button>
          </li>
          <li class="nav-item" role="presentation">
            <button class="nav-link" id="trailer-tab" data-bs-toggle="tab" data-bs-target="#trailer" type="button" role="tab" aria-controls="trailer" aria-selected="false">트래일러</button>
          </li>
        </ul>
        <div class="tab-content" id="myTabContent">
          <div class="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
            <p class="text-start">{{ movieData.overview }}</p>
          </div>
          <div class="tab-pane fade" id="reviews" role="tabpanel" aria-labelledby="reviews-tab">
            <div>
              <div class="row justify-content-between align-items-center my-2">
                <div class="col-3 fs-4"><strong>리뷰 목록</strong></div>
                <div class="col-2">
                  <button
                    class="btn btn-light btn-sm"
                    @click="getReviewForm"
                  >
                    리뷰 작성
                  </button>        
                </div>
              </div>
              <table class="table table-dark table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">작성자</th>
                    <th scope="col">제목</th>
                    <th scope="col">영화 평점</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="review in reviews" 
                    :key="review.id" 
                  >
                    <th scope="row">{{ review.id }}</th>
                    <td>{{ review.userName }}</td>
                    <td>
                      <router-link 
                        class="text-reset"
                        :to="{ 
                          name: 'ReviewDetail', 
                          params: { movieID: movieData.id, reviewId: review.id, review: review, genres: genres },        
                          }"
                        >
                        {{ review.title }}
                      </router-link>
                    </td>
                    <td>
                      <!-- {{ review.rank }} -->
                      <div>
                        <star-rating id="star-rate" :rating="parseFloat( review.rank ) / 2" :read-only="true" :increment="0.01" :star-size="20"  :border-width="3"  :rounded-corners="true" :show-rating="false"></star-rating>
                      </div>
                      </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="tab-pane fade" id="trailer" role="tabpanel" aria-labelledby="trailer-tab">
            <trailer :videoId="videoId"></trailer>
          </div>
        </div>
      </div> 
    </div>
    <hr>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import StarRating from 'vue-star-rating'
import axios from 'axios'
import Trailer from '../components/Trailer.vue'

export default {
  name: 'MovieDetail',
  data: function() {
    return {
      genreStr: '',
      genreRef: {
        28: "액션",
        12: "모험",
        16: "애니메이션",
        35: "코미디",
        80: "범죄",
        99: "다큐멘터리",
        18: "드라마",
        10751: "가족",
        14: "판타지",
        36: "역사",
        27: "공포",
        10402: "음악",
        9648: "미스터리",
        10749: "로맨스",
        878: "SF",
        10770: "TV 영화",
        53: "스릴러",
        10752: "전쟁",
        37: "서부"
      },
      videoId: '',
    }
  },
  methods: {
    getReviewForm() {
      this.$router.push({ name: 'MovieReview', params: { movieId: this.movieData.id, genres: this.genres }})
    },
    getTrailer() {
      const API_KEY = "ec2c99dd97977ab60c1bfe60e130e0e4"
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${this.$route.params.movieId}/videos`,
        params: {
          api_key: API_KEY,
        }
      })
        .then(res => {
          res.data.results.forEach(video => {
            if (video.type === "Trailer" && video.site === "YouTube") {
              this.videoId = video.key
            }
          })
        })
    }
  },
  mounted() {
    this.movieData.genre_ids.forEach(id => {
      if (!this.genreStr) {
        this.genreStr = this.genreRef[`${id}`]
      } else {
        this.genreStr = this.genreStr + ', ' + this.genreRef[`${id}`]
      }
    })
    this.getTrailer()
  },
  computed: {
    ...mapState(['movieData']),
    reviews() {
      return this.movieData.review_set
    },
    posterPath() {
      return `https://image.tmdb.org/t/p/w500/${this.movieData.poster_path}`
    },
    // genres() {
    //   let genreStr = ''
    //   this.movieData.genre_ids.forEach(id => {
    //     if (!genreStr) {
    //       genreStr = this.genreRef[`${id}`]
    //     } else {
    //       genreStr = genreStr + ', ' + this.genreRef[`${id}`]
    //     }
    //   })

    //   return genreStr
    // }
  },
  components: {
    StarRating, 
    Trailer
  }
}
</script>

<style>
 /* .table {
   color: antiquewhite;
 } */
  .nav-link {
    color: wheat;
  }
  
  #star-rate {
    align-items: center;
    justify-content: center;
  }


</style>