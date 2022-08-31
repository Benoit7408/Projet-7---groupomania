<template>
  <div id="app">
    <nav>
    <div class="nav-svg">
      <img src="./assets/icon-left-font-monochrome-white.svg" />
    </div>

    <router-link class= "signup"  v-on:click="modeSignup" to="/auth/signup"><div v-if="isDisplay == true">S'inscrire</div></router-link>
    <router-link class= "login"  v-on:click="modeLogin" to="/login"><div v-if="isDisplay == false">Se connecter</div></router-link>
    <router-link  v-on:click="modeNews" to="/news"><div v-if="isDisplay == null">news</div></router-link>
  </nav>
  <router-view />
  </div>
</template>


<script>
console.log(window.location.href);
console.log(window.location.pathname);

export default {
  name: "form-control",
  data() {
    return {
      isDisplay: null,
    };
  },

  methods: {
    modeSignup: function () {
      if (window.location.pathname == "/login" || window.location.pathname == "/news") {
        console.log(this.isDisplay);
        console.log("signup");
        return this.isDisplay = false;
        
      }
    },

    modeLogin: function () {
      if (window.location.pathname == "/auth/signup" || window.location.pathname == "/news") {
        console.log(this.isDisplay);
        console.log("login");
        return this.isDisplay = true;
      }
    },
      modeNews: function () {
      if (window.location.pathname == "/login"|| window.location.pathname == "/auth/signup") {
        console.log(this.isDisplay);
        console.log("news");
        return this.isDisplay = null;
      }
    },
  },
};
</script>

<style>
.nav-svg {
  width: 30%;
  padding: 40px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 10px;
  background-color: #091f43;
}
nav a {
  display:flex;
  padding: 10px;
  font-weight: bold;
  color: white
  }

 nav a.login,
 nav a.signup{
  
  width: 30%;
 }

nav a.router-link{
  border: 1px solid white;
  padding: 10px;
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #d1515a;
}
</style>
