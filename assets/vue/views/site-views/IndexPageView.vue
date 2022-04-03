<template>
  <b-container fluid="lg" id="content-wrapper">
    <b-row class="index-page-content">
      <b-col lg="3" class="pb-2">
        <category-list/>
        <tags-list/>
      </b-col>
      <b-col lg="4">
        <last-articles route-name="article_preview"/>
      </b-col>
      <b-col lg="4"><h2>Последни новини</h2></b-col>
    </b-row>
  </b-container>

</template>

<script>
import CategoryList from "@vue/components/site-components/CategoryListComponent";
import LastArticles from "@vue/components/LastArticlesComponent";
import TagsList from "@vue/components/site-components/TagsListComponent";

export default {
  name: "IndexPage",
  components:{
    CategoryList,
    TagsList,
    LastArticles
  },
  mounted() {
    this.$store.dispatch("CategoryModule/findAllCategories");
    if(this.$store.getters["ArticleModule/articles"].length <= 1){
      this.$store.dispatch("ArticleModule/findAll");
    }
  }
}
</script>

<style scoped>
#content-wrapper{
  padding-top: 10px;
  padding-bottom: 15px;
  background-color: #ffffff;
}
.index-page-content{

}
</style>