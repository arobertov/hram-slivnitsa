<template>
  <div>
    <b-button variant="success" v-b-modal.login-form>Login</b-button>
   <login-form></login-form>
    <test></test>
  </div>
</template>

<script>
import Test from "./Test";
import LoginForm from "./security/LoginForm";

export default {
name: "homepage",
  components: { LoginForm, Test}
}
</script>

<style scoped>

</style>