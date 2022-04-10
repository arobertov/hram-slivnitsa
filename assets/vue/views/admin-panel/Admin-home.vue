<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <router-link :to="{ name:'admin_article_new' }" tag="div">
          <button type="button" class="btn btn-created btn-block mb-2 mt-3">
            <span class="mr-3">
              <b-icon-plus-square></b-icon-plus-square>
            </span>Публикувай статия
          </button>
        </router-link>
        <last-articles route-name="admin_article_show"/>
      </div>
      <div class="col-md-4">
        <router-link :to="{ name:'admin_news_create' }" tag="div">
          <button type="button" class="btn btn-created btn-block mb-2 mt-3">
            <span class="mr-3">
              <b-icon-plus-square></b-icon-plus-square>
            </span>Публикувай новина
          </button>
        </router-link>
        <div class="card">
          <div class="card-header bg-sub-caption sub-title">
            Последни новини
          </div>
          <div class="card-body border-bottom">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
        </div>
          <div class="card-body border-bottom">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
        </div>
          <div class="card-body border-bottom">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
        </div>
        </div>
      </div>
      <div class="col-md-4">
      <router-link :to="{ name:'admin_article_new' }" tag="div">
        <button type="button" class="btn btn-created btn-block mb-2 mt-3">
            <span class="mr-3">
                          <b-icon-plus-square></b-icon-plus-square>
                       </span>Публикувай бисер
        </button>
      </router-link>
      <div class="card">
        <div class="card-header bg-sub-caption sub-title">
          Последни духовни бисери
        </div>
        <div class="card-body border-bottom">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
        </div>
        <div class="card-body border-bottom">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
        </div>
        <div class="card-body border-bottom">
          <h5 class="card-title">Special title treatment</h5>
          <p class="card-text">With supporting text below as a natural lead-in to additional content....</p>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import LastArticles from "../../components/LastArticlesComponent";

export default {
  name: "Admin-home",
  components:{
    LastArticles
  }
}
</script>

<style scoped>
.btn-created {
  border-color: rgba(73, 18, 23, 0.99);
  background-color: rgba(140, 23, 28, 0.8);
  color: #ffffff;
}

.btn-created:hover {
  background-color: rgba(225, 142, 150, 0.8);
  color: rgba(73, 18, 23, 0.99);
}
</style>