<template>
  <body>
    <b-container fluid="md">
      <navbar-top-menu/>
      <div>
        <router-view/>
      </div>
    </b-container>
    <login-form/>
    <register-form/>
  </body>
</template>

<script>

import loginForm from "@vue/views/security/LoginForm";
import registerForm from "@vue/views/security/RegisterForm";
import navbarTopMenu from "@vue/components/site-components/NavbarTopMenuComponent";

export default {
name: "homepage",
  components: {
    navbarTopMenu,
    loginForm,
    registerForm
  },
}
</script>

<style>
  #site-article{
    border: 1px solid #111111;
    box-shadow: 0px 0px 7px 4px #efefee;
    border-radius: 5px;
    background-color: #718a76;
    margin:auto;
  }
</style>