<template>
  <publication-form @trigger-method="editArticle" store-module="ArticleModule" publication-type="статия"/>
</template>

<script>
import PublicationForm from "@vue/components/admin-panel-components/PublicationFormComponent";


const items = [
  {text: 'Статии', to: {name: 'admin_article_index'}},
  {text: 'Редактирай статия', to: {name: 'admin_article_edit'}}
];
export default {
  name: "Article-edit",
  components: {
      PublicationForm
    },
  mounted() {
    this.$store.dispatch("ArticleModule/loadArticle",this.$route.params.id)
    this.$store.commit("MainModule/ATTACH_BREADS", items)
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS", items);
  },
  methods: {
    async editArticle() {
      const article = this.$store.getters["ArticleModule/getItem"];
      const result = await this.$store.dispatch("ArticleModule/editArticle",article );
      if (result !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": result.id}});
        this.updateSuccessModal();
      }
    },
    updateSuccessModal() {
      this.$bvModal.msgBoxOk('Статията е редактирана успешно ', {
        id: 'update-success-modal',
        size: 'lg',
        buttonSize: 'lg',
        okVariant: 'success',
        centered: true
      });
      setTimeout(() => {
        this.$bvModal.hide('update-success-modal')
      }, 2500);
    }
  }
}
</script>

<style scoped>

</style>