<template>
  <div class="container-fluid">
    <div class="signup">
      <div class="signup-box mt-4">
        <h1 id="signup">SignUp</h1>

        <div class="username mt-3">
          <input 
            type="text" 
            id="username"
            v-model="credentials.username"
            placeholder="아이디"
          >
        </div>
        <div class="email mt-3">
          <input 
            type="email" 
            id="email"
            v-model="credentials.email"
            placeholder="이메일"
          >
        </div>
        <div class="password mt-3">
          <input 
            type="password" 
            id="password"
            v-model="credentials.password"
            placeholder="비밀번호"
          >
        </div>
        <div class="confirmation mt-3">
          <input 
            type="password" 
            id="passwordConfirmation"
            v-model="credentials.passwordConfirmation"
            placeholder="비밀번호 확인"
            @keyup.enter="signup"
          >
        </div>
        <button class="btn signupBtn" @click="signup">회원가입</button>
      
      </div>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Signup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirmation: null,
        email: null,
      }
    }
  },
  methods: {
    signup: function () {
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/accounts/signup/',
        data: this.credentials
      })
        .then(() => {
          // 회원가입 후 자동 로그인
          axios({
            method: 'POST',
            url: 'http://127.0.0.1:8000/accounts/api-token-auth/',
            data: this.credentials,
          })
            .then(res => {
              localStorage.setItem('jwt', res.data.token)
              this.$emit('login')
              this.$router.push({name: 'Home'})
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
}
</script>

<style>
body {
  background-color: #1A1D29;
}

.signup{
  display: flex;
  justify-content: center;
  align-items: center;
}

.signup-box {
  width: 300px;
  background-color: #1A1D29;
  padding: 40px;
  padding-bottom: 30px;
}

.signupBtn {
  margin-top: 30px;
  cursor: pointer;
  width: 60%;
  transition: 0.5s;
  color: white;
  background-color: #068DFF;
}

#username {
  width: 200px;
  height: 40px;
  font-size: 14px;
  background-color:#31343E;
  border: 0;
  outline: 0;
  border-radius: 4px;
  text-indent: 8px;
  color: wheat;
}

#email {
  width: 200px;
  height: 40px;
  font-size: 14px;
  background-color:#31343E;
  border-radius: 4px;
  border: 0;
  outline: 0;
  text-indent: 8px;
  color: wheat;
}

#password {
  width: 200px;
  height: 40px;
  font-size: 14px;
  background-color:#31343E;
  border-radius: 4px;
  border: 0;
  outline: 0;
  text-indent: 8px;
  color: wheat;
}

#passwordConfirmation {
  width: 200px;
  height: 40px;
  font-size: 14px;
  background-color:#31343E;
  border-radius: 4px;
  border: 0;
  outline: 0;
  text-indent: 8px;
  color: wheat;
}

#signup {
  color: wheat;
}
</style>