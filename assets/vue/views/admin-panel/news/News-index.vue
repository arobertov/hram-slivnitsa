<template>
  <list-items store-module="NewsModule"  route-perfix="admin_news"/>
</template>

<script>
import ListItems from "@vue/components/admin-panel-components/ListItemsComponent";
const items = [{text:'Новини',to:{name:'admin_news_index'}}];

export default {
  name: "News-index",
  components:{
    ListItems
  },
  created() {
    this.$store.dispatch("NewsModule/findAll");
    this.$store.commit("MainModule/ATTACH_BREADS",items);
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS",items);
  },
}
</script>

<style scoped>

</style>