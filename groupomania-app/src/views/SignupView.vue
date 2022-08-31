<template>
  <div>
    <form v-on:submit.prevent="submitForm()" method="post" class="form-signin">
      <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label for="first_name" class="sr-only">Nom</label>
      <input
        v-model="body.first_name"
        type="text"
        id="first_name"
        class="form-control"
        placeholder="Nom"
        required
        autofocus
      />

      <label for="last_name" class="sr-only">Prenom</label>
      <input
        v-model="body.last_name"
        type="text"
        id="last_name"
        class="form-control"
        placeholder="Prenom"
        required
        autofocus
      />
      <label for="email" class="sr-only">Email address</label>
      <input
        v-model="body.email"
        type="email"
        id="email"
        class="form-control"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="password" class="sr-only">Password</label>
      <input
        v-model="body.password"
        type="password"
        id="password"
        class="form-control"
        placeholder="Password"
        required
      />

      <router-link
        class="btn btn-lg btn-primary btn-block"
        to="/news"
        type="submit"
        @click="submitForm"
      >
        Sign in
      </router-link>
    </form>
  </div>
</template>

<script>
import http from "../http";

export default {
  name: "signup-form",
  data() {
    return {
      body: {
        first_name: null,
        last_name: null,
        email: null,
        password: null,
      },
    };
  },
  methods: {
    submitForm() {
      http.post("/auth/signup", this.body).then((response) => {
        this.body = response.data;
      });
    },
  },
};


</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.sr-only {
  width: 100%;
  display: inline-block;
}
.btn-primary {
  margin-top: 10px;
}

</style>
