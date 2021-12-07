<template>
<div class="container-fluid">
  <div class="post">
    <div class="post-box">
      <h2>게시글 작성</h2>
      <div>
        <!-- <label for="title">제목: </label>  -->
        <input 
          type="text" 
          class="form-control"
          id="title"
          v-model="PostForm.title"
          placeholder="제목"
        >
      </div>
      <div>
        <!-- <label for="content">내용: </label> -->
        <textarea 
          type="text" 
          id="content"
          class="form-control mt-5"
          style="height: 200px"
          v-model="PostForm.content"
          placeholder="내용을 작성하세요"
        ></textarea>
      </div>
      <button class="mx-3 btn btn-primary btn-lg mt-3" @click="index !== undefined ? updatePost() : createPost()">
        {{index !== undefined ? '수정' : '작성'}}
      </button>
    </div>
    
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Post',
  data: function() {
    const index = this.$route.params.postId;
    return {
      index: index,
      PostForm: {
      title: index !== undefined ? this.$store.state.posts[index-1].title : "",
      content: index !== undefined ? this.$store.state.posts[index-1].content : "",      
      },
    }
  },
  methods: {
    createPost() {
      axios({
        method: 'post',
        url: "http://127.0.0.1:8000/community/create/",
        headers: this.token,
        data: this.PostForm,
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
    updatePost() {
      axios({
        method: 'put',
        url: `http://127.0.0.1:8000/community/${this.index}/update_delete/`,
        headers: this.token,
        data: this.PostForm,
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
  },
  computed: {
    ...mapState(['token']),
  }
}
</script>

<style>
.post {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-box {
  width: 700px;
  background-color: #1A1D29;
  padding: 40px;
  padding-bottom: 25px;
}

.container-fluid {
  justify-content: center;
  align-items: center;
}
</style>