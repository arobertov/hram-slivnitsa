<template>
  <div class="card">
    <div class="card-header bg-sub-caption sub-title">
      ПОСЛЕДНИ СТАТИИ
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
        <div class="card-content">
          <h5 class="card-title">
            <router-link :to="{name:routeName,params:{id:lastArticle.id}}">{{lastArticle.title}}</router-link>
          </h5>
          <p class="card-text">
            <span v-html="lastArticle.content.slice(0,150)+ '....'"></span>
            <router-link :to="{name:routeName,params:{id:lastArticle.id}}" class="d-block mb-3">
              прочети >>>
            </router-link>
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "LastArticles",
  props:{
    routeName:{
      type: String
    }
  },
  computed:{
    lastArticles(){
      const lastArticles = this.$store.getters["ArticleModule/articles"]["hydra:member"];
      if(Array.isArray(lastArticles) && lastArticles.length > 0 ){
        return lastArticles.slice(0,3);
      }
      return null;
    },
  }
}
</script>

<style scoped>
  .card-body{
    padding: 0;
  }
  .card-content{
    padding: 0 22px;
  }
  .image-container{
    margin-bottom: 14px;
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