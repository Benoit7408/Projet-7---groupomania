<template>
  <nav>
    <div class="nav-svg">
<img src = "./assets/icon-left-font-monochrome-white.svg">

    </div>
    
    
    <router-link to="/auth/signup">signup</router-link> 
    <router-link to="/login">login</router-link>
    <router-link to="/news">news</router-link>

  </nav>
  <router-view/>
</template>

<style>

.nav-svg{
width:30%;
padding:40px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 40px;
  background-color: #091f43
}

nav a {
  padding: 40px;
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #d1515a;
}

</style>
