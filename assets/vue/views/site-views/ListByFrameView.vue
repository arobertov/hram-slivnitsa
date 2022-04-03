<template>
  <b-container fluid="lg" class="frame-list">
    <b-row class="index-page-content">
      <b-col lg="3">
        <category-list/>
      </b-col>
      <b-col lg="9" class="border">
        <router-view/>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CategoryList from "@vue/components/site-components/CategoryListComponent";

export default {
  name: "CategoryListByArticles",
  components:{
    CategoryList
  },
}
</script>

<style scoped>
  .frame-list{

    background-color: #ffffff;
  }
</style>