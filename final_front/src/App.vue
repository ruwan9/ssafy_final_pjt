<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <span v-if="!$store.state.isLogin">
        <router-link :to="{ name: 'Signup' }">Signup</router-link> |
        <router-link :to="{ name: 'Login' }">Login</router-link> |
      </span>
      <span>
        <router-link :to="{ name: 'Community' }">Community</router-link>
      </span>
    </div>
    <router-view/> -->
    <nav class="navbar navbar-expand-lg navbar-dark">  
      <div class="container-fluid">
        <span>
          <router-link :to="{name: 'Home'}" class="nav-item">Home</router-link>
          <router-link :to="{ name: 'Community' }" id="commumity-link">Community</router-link>
          <!-- <div class="form-inline my-2 my-lg-0">
            <input v-model="keyword" id="keyword" @keypress.enter="searchKeyword(keyword)" class="form-control mr-sm-2" type="search" placeholder="Search">
            <button @click="searchKeyword(keyword)" class="btn btn-outline-secondary my-2 my-sm-0" type="submit">Search</button>
          </div> -->
        </span>
        
        <!-- <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button> -->
        <!-- <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown"> -->
          <ul class="navbar-nav">
            <!-- isLogin -->
            <span v-if="$store.state.isLogin">
              <li class="nav-item">
                <router-link @click.native="logout" to="#" class="nav-item">logout</router-link>
              </li>
            </span>
            <span class="nav-item" v-else>
              <li class="nav-item">
                <router-link :to="{name: 'Login'}" class="nav-item">Login</router-link>
                <router-link :to="{name: 'Signup'}" class="nav-item">Signup</router-link>
              </li>
              <!-- <li class="nav-item"> 
                <router-link :to="{name: 'Signup'}" class="nav-item">Signup</router-link>
              </li> -->
            </span>
          </ul>
        <!-- </div> -->
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
// import vuex from "vuex";
// import router from "@/router";

export default {
  name: 'App',
  data: function() {
    return {
      keyword: null,
    }
  },
  methods: {
    logout: function () {
      localStorage.removeItem('jwt')
      this.$store.commit('LOGOUT')
      this.$router.push({ name: "Home" })
    },
    searchKeyword(keyword) {
      this.$router.push(`/search/${keyword}`)
    }
  },
  created: function() {
    // const token = localStorage.getItem('jwt')
    // if (token) {
    //   this.isLogin = true
    // }
  },
  computed: {
    // loginStatus: function() {
    //   return this.$store.state.isLogin
    // }
  },
  // watch: {
  //   loginCheck: function() {
  //     if (this.$store.state.isLogin) {
  //       this.isLogin = true
  //     }
  //   }
  // }

}
</script>


<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: wheat;
}

nav {
  padding: 10px;
  font-size: 18px;
  font-weight: 900;
  background-color: #1A1D29;
} 

.nav-item{
  text-align:center;
  padding: 5px;
}

/* #community-link{
  padding: 5px;
} */

/*
#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
