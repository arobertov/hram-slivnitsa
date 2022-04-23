<template>
  <publication-form store-module="ArticleModule" publication-type="статия"/>
</template>

<script>
import PublicationForm from "@vue/components/admin-panel-components/PublicationFormComponent";

const items = [
  {text: 'Статии', to: {name: 'admin_article_index'}},
  {text: 'Създай статия', to: {name: 'admin_article_new'}}
];

export default {
  name: "Article-new",
  components: {
    PublicationForm
  },

  created() {
    let store = this.$store;
    store.commit("MainModule/ATTACH_BREADS", items);
    store.commit("ArticleModule/creatingItem");
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS", items);
  },
};
</script>

<style scoped>

</style>