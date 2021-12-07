<template>
  <div class="container">
    <div class="d-flex justify-content-between">
      <span>
        <span class="fs-2 ms-3">자유게시판</span>
        <small class="ms-3">영화에 대해 자유롭게 토론하는 공간입니다.</small>
      </span>
      <span class="align-middle">
        <button class="mx-2 btn btn-secondary" v-if="post.userName === this.$store.state.userName" @click="updatePost">글 수정</button>
        <button class="btn btn-danger" v-if="post.userName === this.$store.state.userName" @click="deletePost">글 삭제</button>
      </span>
    </div>
    <hr>
    <!-- 게시글 정보 출력 -->
    <div class="row d-flex justify-content-center">
      <div class="col-11">
        <span class="d-flex justify-content-between">
          <span class="fs-3 fw-bold">{{ post.title }}</span>
          <span>
            <span>
              작성자:
              {{ post.userName }}
            </span>|
            <span>
              게시일: 
              {{ postDate }}
            </span>|
            <span>
              #:
              {{ post.id }}
            </span>
          </span>
        </span>
        <div class="card mt-3">
          <div class="card-body text-start review-content">
            <!-- <pre-line> -->
              {{ post.content}}
            <!-- </pre-line> -->
          </div>
        </div>
        <hr>
        <div class="card">
          <div class="align-middle fs-3">
            Comments
          </div>
          <hr>
          <div v-for="comment in comments" :key="comment.id">
            <div class="d-flex flex-row p-3"> 
              <img src="https://i.imgur.com/zQZSWrt.jpg" width="40" height="40" class="rounded-circle mr-3">
              <div class="w-100">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="d-flex flex-row align-items-center"> 
                    <span class="mx-2 fs-5">{{ comment.userName }}</span> 
                    <button 
                      class="btn btn-danger btn-sm"
                      v-if="comment.userName === userName"
                      @click="deleteComment(comment.id)"
                    >삭제
                    </button>
                  </div> 
                  <small>{{ comment.timeStamp }}</small>
                </div>
                <p class="text-justify comment-text mb-0 ms-3 fs-6 mt-3">
                  {{ comment.content }}
                </p>
                <hr>
                <!-- <div class="d-flex flex-row user-feed"> <span class="wish"><i class="fa fa-heartbeat mr-2"></i>24</span> <span class="ml-3"><i class="fa fa-comments-o mr-2"></i>Reply</span> </div> -->
              </div>
            </div>
          </div>
          <div class="mt-3 d-flex flex-row align-items-center p-3 form-color"> 
            <img src="https://i.imgur.com/zQZSWrt.jpg" width="50" class="rounded-circle me-2"> 
            <input type="text" class="form-control" placeholder="Enter your comment..." v-model="commentForm.content" @keyup.enter="createComment">
            <button class="btn btn-primary ms-2" @click="createComment">
              <i class="bi bi-arrow-return-left" style="font-size: 1.5rem;"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- 댓글 목록 + 댓글 작성란
    <div class="container mt-5 mb-5">
      <div class="row height d-flex justify-content-center align-items-center">
        <div class="col-10">
          
        </div>
      </div>
    </div> -->
  </div>  
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'PostDetail',
  props: {
    post: Object,
    postDate: null,
  },
  data: function() {
    return {
      commentForm: {
        content: '',
      },
      comments: []
    }
  },
  methods: {
    updatePost() {
      this.$router.push({
        name: 'Post',
        params: {
          postId: this.post.id
        }
      })
    },
    deletePost() {
      axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.post.id}/update_delete/`,
        headers: this.$store.state.token,
      })
        .then(() => {
          // re-load movie 
          this.$store.dispatch('LoadPosts')
          // to review detail
          // this.$router.push({ name: 'PostDetail' })
          this.$router.push({ name: 'Community' })
        })
        .catch(err => console.error(err))
    },
    loadComments() {
      axios({
      method: 'get',
      url: `http://127.0.0.1:8000/community/${this.post.id}/comments/`,
      headers: this.$store.state.token,
      })
        .then(res => {
          this.comments = res.data
          this.comments.forEach(comment => {
            // Object.defineProperty(comment, 'timeStamp', { value: this.getTimestamp(comment.updated_at), writable: true })
            comment['timeStamp'] = moment(comment.updated_at).fromNow()
          })
        })
        .catch(err => console.error(err))
    },
    createComment() {
      axios({
      method: 'post',
      url: `http://127.0.0.1:8000/community/${this.post.id}/comments/`,
      headers: this.$store.state.token,
      data: this.commentForm
      })
        .then(() => {
          this.loadComments()
          this.commentForm.content = ''
        })
        .catch(err => console.error(err))
    },
    deleteComment(commentId) {
      if (confirm('댓글을 삭제하시겠습니다?')) {
        axios({
        method: 'delete',
        url: `http://127.0.0.1:8000/community/${this.post.id}/delete/${commentId}/`,
        headers: this.$store.state.token,
        })
          .then(() => {
            this.loadComments()          
          })
      }
    }
  },
  beforeCreated() {
    if (!this.$store.state.isLogin) {
      this.$router.push({ name: 'Login' })
    }
  },
  created() {
    this.loadComments()
  },
  computed: {
    userName() {
      return this.$store.state.userName
    },
    lineBreak() {
      return this.post.content.replace("\n", "<br />")
	}
  }
}
</script>

<style>

</style>