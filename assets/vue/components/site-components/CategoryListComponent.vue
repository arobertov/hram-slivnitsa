<template>
  <b-card header="КАТЕГОРИИ" class="mb-2">
    <b-card-text>

      <b-nav vertical v-if="hasCategories">
        <b-nav-item
          v-for="category in categories"
          v-if="category.articles.length>0"
          :key="category.id"
          :to="{name:'list_by_category',params:{id:category.id}}"
          >
          {{category.name}}
        </b-nav-item>
      </b-nav>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "CategoryListComponent",
  created() {
    this.$store.dispatch("CategoryModule/findAllCategories");
  },
  computed:{
    categories() {
      return this.$store.getters["CategoryModule/getCategories"];
    },
    hasCategories(){
      return this.$store.getters["CategoryModule/hasCategories"];
    }
  }
}
</script>

<style scoped>

</style>