<template>
    <b-navbar toggleable="md" type="dark" variant="green" sticky >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item :to="{name:'site_index'}">Начало</b-nav-item>
          <b-nav-item :to="{name:'something_else'}">Статии</b-nav-item>
          <b-nav-item>Новини</b-nav-item>
          <b-nav-item>Галерия</b-nav-item>
          <b-nav-item>Контакти</b-nav-item>
          <b-nav-item>За Храма</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="isLogin">
            <!-- Using 'button-content' slot -->
            <template #button-content >
              <em> {{user.alias}}</em>
            </template>
            <div v-if="isLogin">
              <b-dropdown-item :href="adminRoute">Контролен панел</b-dropdown-item>
              <b-dropdown-item href="/logout">Излизане</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
  name: "NavbarTopMenu",
  computed: {
    user() {
      return this.$siteUser == null ? this.$store.getters["UserModule/getUser"] : this.$siteUser  ;
    },
    isLogin() {
      return this.$siteUser !== null ? this.$siteUser : this.$store.getters["UserModule/getIsLogin"];
    },
    adminRoute() {
      return "admin/";
    }
  }
}
</script>

<style scoped>

  .navbar-dark .navbar-nav .nav-link,
  .navbar-dark .navbar-nav .nav-link{
    font-family: Izhitsa, Helvetica sans-serif;
    font-size: 1.3rem;
    padding: 0 1rem;
    color: #fff;
  }
  .navbar-dark .navbar-nav .nav-link:hover,
  .navbar-dark .navbar-nav .nav-link:focus
  .navbar-dark .navbar-nav .show > .nav-link,
  .navbar-dark .navbar-nav .active > .nav-link,
  .navbar-dark .navbar-nav .nav-link.show,
  .navbar-dark .navbar-nav .nav-link.active{
    color: #ccc;
  }
  .ml-auto {
    font-family: Helvetica,sans-serif;
  }

</style>