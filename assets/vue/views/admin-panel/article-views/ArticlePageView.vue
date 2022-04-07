<template>
  <b-container fluid="lg" class="frame-list">
    <b-row class="index-page-content">
      <b-col lg="2">
        <category-list/>
      </b-col>
      <b-col lg="10" class="border">
        <article-preview :article="article"/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import ArticlePreview from "@vue/components/site-components/ArticlePreviewComponent";
import CategoryList from "@vue/components/site-components/CategoryListComponent";

export default {
  name: "ArticlePageView",
  components:{
    ArticlePreview,CategoryList
  },
  computed:{
    article() {
      return this.$store.getters["ArticleModule/getArticle"];
    }
  },
  watch: {
    '$route.params': {
      handler(newValue) {
        this.$store.dispatch('ArticleModule/loadReadingArticle', newValue.id)
      },
      immediate: true,
    },
  }
}
</script>

<style scoped>

</style>