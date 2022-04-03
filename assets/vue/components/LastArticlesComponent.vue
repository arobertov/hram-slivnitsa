<template>
  <div class="card">
    <div class="card-header bg-sub-caption sub-title">
      Последни статии
    </div>
    <div>
      <div class="card-body border-bottom" v-for="lastArticle in lastArticles">
        <div class="image-container">
          <img v-if="lastArticle.images.length >0"
               :src="require(`@images/${lastArticle.images[0].filePath}`).default"
               class="card-img-top"
               alt=""
          >
        </div>

        <h5 class="card-title">
          <router-link :to="{name:'admin_article_show',params:{id:lastArticle.id}}">{{lastArticle.title}}</router-link>
        </h5>
        <p class="card-text">
          <span v-html="lastArticle.content.slice(0,70)+' .....'"></span>
          <router-link :to="{name:'admin_article_show',params:{id:lastArticle.id}}">към статията >></router-link>
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LastArticles",
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
  .card-body{
    padding: 0;
  }
  .image-container{
    margin-bottom: 1.5rem;
    text-align: center;
    background-color: var(--bg-main);
  }
  img{
    max-height: 200px;
    height: 90%;
    width: auto;
    max-width: 90%;
    margin: 1rem;
  }
</style>