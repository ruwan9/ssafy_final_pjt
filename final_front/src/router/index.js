import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MovieDetail from '../views/MovieDetail.vue'
import MovieReview from '../views/MovieReview.vue'
import Community from '../views/community/Community.vue'
import Post from '../views/community/Post.vue'
import PostDetail from '../views/community/PostDetail.vue'
import ReviewDetail from '@/components/ReviewDetail.vue'
import Signup from '@/views/accounts/Signup'
import Login from '@/views/accounts/Login'
import SearchMovies from '@/views/SearchMovies.vue'
import LatestMovies from '../views/recommends/LatestMovies.vue'
import HighRatingMovies from '../views/recommends/HighRatingMovies.vue'
import WeatherBasedMovies from '../views/recommends/WeatherBasedMovies.vue'
import Recommend from "@/views/Recommend";

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "latest",
        name: "Latest",
        component: LatestMovies,
      },
      {
        path: "rating",
        name: "Rating",
        component: HighRatingMovies,
      },
      {
        path: "weather",
        name: "Weather",
        component: WeatherBasedMovies,
      },
    ]
  },
  {
    path: "/:movieId",
    name: "MovieDetail",
    component: MovieDetail,
  },
  {
    path: "/:movieId/review/:reviewId?",
    name: "MovieReview",
    component: MovieReview,
    props: true,
  },
  {
    path: "/:movieId/review/:reviewId",
    name: "ReviewDetail",
    component: ReviewDetail,
    props: true,
  },
  {
    path: "/community",
    name: "Community",
    component: Community,
  },
  {
    path: "/community/post/:postId?",
    name: "Post",
    component: Post,
  },
  {
    path: '/community/:postId',
    name: 'PostDetail',
    component: PostDetail,
    props: true
  },
  {
    path: "/accounts/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/accounts/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/search/:keyword",
    name: "searchMovies",
    component: SearchMovies,
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



export default router
