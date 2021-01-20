<template>
  <div>
    <a data-toggle="modal" data-target="#loginModal">
      <span class="btn  btn-success">Login</span>
    </a>
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