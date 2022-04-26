<template>
  <publication-form @trigger-method="edit" store-module="NewsModule" publication-type="новина"/>
</template>

<script>
import PublicationForm from "@vue/components/admin-panel-components/PublicationFormComponent";

const items = [
  {text: 'Новини', to: {name: 'admin_news_index'}},
  {text: 'Редактирай новина', to: {name: 'admin_news_edit'}}
];

export default {
  name: "News-edit",
  components: {
    PublicationForm
  },
  created() {
    this.$store.commit("MainModule/ATTACH_BREADS", items);
    this.$store.dispatch("NewsModule/showNews",this.$route.params.id)
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS",items);
  },
  methods:{
    async edit(){
      const news = this.$store.getters["NewsModule/getItem"];
      const result = await this.$store.dispatch("NewsModule/edit",news);
      if (result !== null) {
        await this.$router.push({name: "admin_news_show", params: {"id": result.id}});
      }
    }
  }
}
</script>

<style scoped>

</style>