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
        <div class="card">
          <div class="card-header bg-sub-caption sub-title">
            Последни статии
          </div>
          <div v-if="lastArticles">
            <div class="card-body border-bottom" v-for="lastArticle in lastArticles">
              <h5 class="card-title">
                <router-link :to="{name:'admin_article_show',params:{id:lastArticle.id}}">{{lastArticle.title}}</router-link>
              </h5>
              <p class="card-text">
                <span v-html="lastArticle.content.slice(0,70)+' .....'"></span>
                <router-link :to="{name:'admin_article_show',params:{id:lastArticle.id}}">към статията >></router-link>
              </p>
            </div>
          </div>
          <div class="card-body" v-else>
            <p class="card-text">Все още няма публикувани статии!</p>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <router-link :to="{ name:'admin_article_new' }" tag="div">
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
export default {
  name: "Admin-home",
  computed:{
    lastArticles(){
      const lastArticles = this.$store.getters["ArticleModule/articles"]["hydra:member"];
      if(Array.isArray(lastArticles) && lastArticles.length > 0 ){
        return lastArticles.slice(0,3);
      }
      return null;
    }
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