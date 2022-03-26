<template>
  <nav>
    <b-navbar toggleable="lg" type="dark" variant="info" class="bg-green">
      <router-link :to="{name:'site_index'}">
        <b-navbar-brand>NavBar </b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item><router-link :to="{name:'something_else'}">Link</router-link></b-nav-item>
          <b-nav-item href="#">Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown right v-if="isLogin">
            <!-- Using 'button-content' slot -->
            <template #button-content >
              <em> Влезли сте като {{user.username}}</em>
            </template>
            <div v-if="isLogin">
              <b-dropdown-item :href="adminRoute">Профил</b-dropdown-item>
              <b-dropdown-item href="/logout">Излизане</b-dropdown-item>
            </div>
          </b-nav-item-dropdown>
          <div v-else>
            <b-button
                data-toggle="modal"
                data-target="#loginModal"
            >
              Вход
            </b-button>
            <b-button
                data-toggle="modal"
                data-target="#registerModal"
            >
              Регистрация
            </b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </nav>
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

</style>