<template>
  <ul v-if="category">
    <li v-for="article in category.articles" >
      <router-link :to="{name:'article_preview',params:{id:article.id}}">{{article.title}}</router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RelatedByCategory",
  created() {
    this.$store.dispatch('CategoryModule/showCategory',this.$route.params.id)
  },
  destroyed() {
    this.$store.commit('CategoryModule/updatingCategory',null);
  },
  computed:{
    category(){
      return this.$store.getters['CategoryModule/getCategory']
    }
  },
  watch: {
    '$route.params': {
      handler(newValue) {
        const params = newValue;
        console.log(params)
        this.$store.dispatch('CategoryModule/showCategory',params.id)
      },
      immediate: true,
    }
  }
}
</script>

<style scoped>

</style>