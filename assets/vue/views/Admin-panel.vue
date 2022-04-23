<template>
  <div class="container-fluid bg-yellow-white">
    <div class="row">
      <!-----------------------  ASIDE MENU ----------------------------------------------------------------------->
      <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-green sidebar collapse">
        <div class="sidebar-sticky pt-3">
          <ul class="nav flex-column">
            <router-link :to="{ name: 'admin_panel' }" class="nav-item" tag="li" active-class="active">
              <a class="nav-link" href="#">
                <span class="nav-icon"><b-icon-person-plus-fill></b-icon-person-plus-fill></span>
                Админ панел
              </a>
            </router-link>
            <router-link :to="{ name: 'admin_article_index' }" class="nav-item" tag="li" >
              <a class="nav-link"  href="#">
                <span class="nav-icon"><b-icon-card-text></b-icon-card-text></span>
                Статии
              </a>
            </router-link>
            <router-link :to="{name: 'admin_news_index'}" class="nav-item" tag="li">
              <a class="nav-link" href="#">
                <span class="nav-icon"><b-icon-newspaper></b-icon-newspaper></span>
                Новини
              </a>
            </router-link>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span class="nav-icon"><b-icon-brightness-low-fill></b-icon-brightness-low-fill></span>
                Духовни бисери
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <span class="nav-icon"><b-icon-list-task></b-icon-list-task></span>
                Категории
              </a>
            </li>
            <router-link class="nav-item" tag="li" to="/tag/list-all" active-class="active">
              <a class="nav-link" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">
                <span class="nav-icon"><b-icon-tag></b-icon-tag></span>
                Етикети
              </a>
            </router-link>
            <li class="nav-item" >
              <a class="nav-link" href="#" @click="show_image_modal = true">
                <span class="nav-icon"><b-icon-image></b-icon-image></span>
                Изображения
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <file-select
          :showModal="show_image_modal"
          @close="show_image_modal=false"
          :multiple="false"
          :server="server">
        <template #header>
          <h2>Библиотека с изображения</h2>
        </template>
        <template #checkButton>
          <p></p>
        </template>
      </file-select>
      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <div class="main-content">
          <b-breadcrumb :items="items" ></b-breadcrumb>
          <router-view/>
        </div>
      </main>
    </div>
  </div>
</template>


<script>
import FileSelect from "@vue/components/vue-image-manager/FileSelect";

export default {
  name: "Aside-nav",
  components:{
    FileSelect
  },
  data(){
    return{
      show_image_modal:false,
      server: {
        home: 'https://localhost:8080',
        add_folder: '/api/public/files',
        file_uploads: '/api/images'
      }
    }
  },
  created() {
    this.$store.dispatch("CategoryModule/findAllCategories");
    this.$store.dispatch("ArticleModule/findAll");
    this.$store.dispatch("MainModule/fetchingBreads",[{text:'Администраторски панел',to:{name:'admin_panel'}}]);
  },
  computed:{
    items(){
      return this.$store.getters["MainModule/getItems"];
    }
  }
}
</script>

<style>
.sidebar .nav-link {
  font-weight: 500;
  color: #f4fafa !important;
}
</style>
