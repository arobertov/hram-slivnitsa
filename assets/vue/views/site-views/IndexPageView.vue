<template>
  <b-container fluid="lg" id="content-wrapper">
    <b-row class="index-page-content">
      <b-col lg="3" class="pb-2">
        <category-list/>
      </b-col>
      <b-col lg="4" class="border"><h2>Последни статии</h2></b-col>
      <b-col lg="4"><h2>Последни новини</h2></b-col>
    </b-row>
  </b-container>
</template>

<script>
import CategoryList from "@vue/components/site-components/CategoryListComponent";
export default {
  name: "IndexPage",
  components:{
    CategoryList
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