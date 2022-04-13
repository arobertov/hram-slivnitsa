<template>
  <div class="main-content">
    <div v-if="isLoading" class="row col">
      <p>Зареждане...</p>
    </div>
    <div v-else-if="isError" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div>
      <news-preview v-bind:news="news"/>
    </div>

  </div>
</template>

<script>
import NewsPreview from "@vue/components/admin-panel-components/NewsPreview";

export default {
  name: "News-show",
  components:{
    NewsPreview
  },
  computed:{
    news(){
      return this.$store.getters["NewsModule/getNews"];
    },
    isLoading(){
      return this.$store.getters["NewsModule/getIsLoading"];
    },
    isError(){
      return this.$store.getters["NewsModule/getIsError"]
    },
    error(){
      return this.$store.getters["NewsModule/getError"]
    }
  },
  created() {
    this.$store.dispatch('NewsModule/showNews', this.$route.params.id);
    this.$store.commit("MainModule/ATTACH_BREADS", items);
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS", items);
  },
}
</script>

<style scoped>

</style>