<template>
    <b-container fluid="lg" id="wrapper">
      <header-component/>
      <navbar-top-menu/>
      <router-view/>
      <footer-component/>
      <login-form/>
      <register-form/>
    </b-container>
</template>

<script>

import loginForm from "@vue/views/security/LoginForm";
import registerForm from "@vue/views/security/RegisterForm";
import navbarTopMenu from "@vue/components/site-components/NavbarTopMenuComponent";
import headerComponent from "@vue/components/site-components/HeaderComponent";
import footerComponent from "@vue/components/site-components/FooterComponent";

export default {
name: "homepage",
  components: {
    headerComponent,
    navbarTopMenu,
    footerComponent,
    loginForm,
    registerForm,
  },
}
</script>

<style>
  body{
    background-color: rgba(83, 60, 52, 100%);
    display: block;
    position: relative;
  }

  body::after{
    content: "";
    background-image: url("~@images/site-images/heruvim.jpg");
    opacity: 0.3;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }
  #wrapper{
    padding: 0;
  }
</style>
