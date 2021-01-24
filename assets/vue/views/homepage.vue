<template>
  <div>
    <h1 v-if="isLogin"> Влезли сте като {{user.username}}</h1>
    <div v-if="isLogin">
      <a href="/logout">
        <span  class="btn  btn-success">Logout</span>
      </a>
    </div>
    <div v-else>
      <a data-toggle="modal" data-target="#loginModal">
        <span  class="btn  btn-success">Login</span>
      </a>
    </div>
   <login-form></login-form>
    <test></test>
  </div>
</template>

<script>
import Test from "./Test";
import LoginForm from "./security/LoginForm";

export default {
name: "homepage",
  components: { LoginForm, Test},
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