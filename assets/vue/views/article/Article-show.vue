<template>
  <div class="main-content">

    <div v-if="isLoading" class="row col">
      <p>Зареждане...</p>
    </div>

    <div v-else-if="hasError" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-else-if="responseData" id="response-data-field" class="alert alert-success">
      {{ responseData }}
    </div>
    <div>
      <article-preview v-bind:article="article"/>
    </div>

  </div>
</template>

<script>
import ArticlePreview from "../../components/admin-panel-components/ArticlePreview";

const items = [
  {text: 'Статии', to: {name: 'admin_article_index'}},
  {text: 'Прегледай статия', to: {name: 'admin_article_show'}}
];
export default {
  name: "Article-show",
  components: {
    ArticlePreview
  },
  computed: {
    article() {
      return this.$store.getters['ArticleModule/getArticle'];
    },
    isLoading() {
      return this.$store.getters['ArticleModule/isLoading'];
    },
    hasError() {
      return this.$store.getters['ArticleModule/hasError'];
    },
    error() {
      return this.$store.getters['ArticleModule/error'];
    },
    responseData() {
      return this.$store.getters['ArticleModule/responseData'];
    }
  },
  created() {
    this.$store.dispatch('ArticleModule/loadReadingArticle', this.$route.params.id);
    this.$store.commit("MainModule/ATTACH_BREADS", items);
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS", items);
  },
}
</script>

<style scoped>

</style>