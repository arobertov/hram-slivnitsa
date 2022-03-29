<template>
<footer>
  <b-row>
    <b-col col md="2">Some Here</b-col>
    <b-col col md="8">
      <div v-if="!isLogin">
        <b-button
            variant="success"
            data-toggle="modal"
            data-target="#loginModal"
        >
          Вход
        </b-button>
        <b-button
            variant="success"
            data-toggle="modal"
            data-target="#registerModal"
        >
          Регистрация
        </b-button>
      </div>
    </b-col>
    <b-col md="2">
      Some Thing
    </b-col>
  </b-row>
</footer>
</template>

<script>
export default {
  name: "FooterComponent",
  computed:{
    isLogin() {
      return this.$siteUser !== null ? this.$siteUser : this.$store.getters["UserModule/getIsLogin"];
    },
  }
}
</script>

<style scoped>
  footer{
    text-align: center;
    padding: 2rem 5rem;
    background-color: var(--bg-main);
  }
</style>