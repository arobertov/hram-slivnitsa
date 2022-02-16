<template>
  <div>
    <div v-if="isLogin">
      <h1> Влезли сте като {{user.username}}</h1>
      <div>
        <a href="/admin">
          <b-button variant="outline-primary">Админ панел</b-button>
        </a>
      </div>
      <div>
        <a href="/logout">
          <span  class="btn  btn-success">Logout</span>
        </a>
      </div>
    </div>
    <div v-else>
      <a data-toggle="modal" data-target="#loginModal">
        <span  class="btn  btn-success">Login</span>
      </a>
    </div>
   <login-form></login-form>
    <register-form></register-form>
    <button
        type="button"
        class="btn btn-outline-secondary"
        data-toggle="modal"
        data-target="#registerModal"
    >
      Регистрация
    </button>
    <test></test>
  </div>
</template>

<script>
import Test from "./Test";
import LoginForm from "./security/LoginForm";
import RegisterForm from "./security/RegisterForm";

export default {
name: "homepage",
  components: {RegisterForm, LoginForm, Test},
  computed: {
    user() {
      return this.$siteUser == null ? this.$store.getters["UserModule/getUser"] : this.$siteUser  ;
    },
    isLogin() {
      return this.$siteUser !== null ? this.$siteUser : this.$store.getters["UserModule/getIsLogin"];
    },
  }
}
</script>

<style scoped>

</style>