<template>
  <publication-form @trigger-method="create" store-module="ArticleModule" publication-type="статия"/>
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
  methods:{
    hoho(){
      return 'ArticleModule'
    },
    async create() {
      let item = this.$store.getters['ArticleModule/getItem'];
      const result = await this.$store.dispatch(`ArticleModule/create`, item);
      if (result !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": result.id}});
      }
    },
  }
};
</script>

<style scoped>

</style>