<template>
  <publication-form @trigger-method="create" store-module="NewsModule" publication-type="новина"/>
</template>

<script>
import PublicationForm from "@vue/components/admin-panel-components/PublicationFormComponent";
const items = [
  {text: 'Новини', to: {name: 'admin_news_index'}},
  {text: 'Публикувай новина', to: {name: 'admin_news_create'}}
];

export default {
  name: "News-create",
  components: {
    PublicationForm
  },
  created() {
    this.$store.commit("MainModule/ATTACH_BREADS", items);
    this.$store.commit("NewsModule/creatingNews");
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS",items);
  },
  methods:{

    async create(){
      const news = this.$store.getters["NewsModule/getItem"];
      const result = await this.$store.dispatch("NewsModule/create",news);
      if (result !== null) {
        await this.$router.push({name: "admin_news_show", params: {"id": result.id}});
      }
    }
  }
}
</script>

<style scoped>

</style>