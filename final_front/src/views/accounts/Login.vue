<template>
  <div class="container-fluid">
    <div class="login">
      <div class="login-box mt-5">
        <h1 id="login">LogIn</h1>
        <div class="username mt-3">
          <input
            type="text" 
            id="username"
            v-model="credentials.username"
            placeholder="아이디"
          >
        </div>
        <div class="password mt-3">
          <input 
            type="password" 
            id="password"
            v-model="credentials.password"
            placeholder="비밀번호"
            @keyup.enter="login"
          >
        </div>
        <button class="btn loginBtn" @click="login">로그인</button>
        <h4 class="signup mt-3" @click="$router.push({ name: 'Signup'})">회원가입</h4>
      </div>
    </div>     
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      },
      screenWidth: parseInt(screen.availWidth)+"px",

    }
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then(res => {
          localStorage.setItem('jwt', res.data.token)
          this.$store.dispatch('SetToken')
          this.$store.commit('LOGIN', this.credentials.username)
          this.$store.dispatch('GetRecommendations')

//           this.$emit('login')
// >>>>>>> 0ebae2f79ce477037b2d08443580e060525710a5
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
body {
  background-color: #1A1D29;
}


.login{
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  width: 300px;
  background-color: #1A1D29;
  padding: 40px;
  padding-bottom: 25px;
}

.loginBtn {
  margin-top: 30px;
  /* border: none; */
  cursor: pointer;
  width: 60%;
  transition: 0.5s;
  color: white;
  font-size: 18px;
  background-color: #068DFF;
}

.signup {
  margin-top: 10px;
  padding-top: 10px;
  font-size: 18px;
  cursor: pointer;
}

#login {
  color: wheat;
}

</style>