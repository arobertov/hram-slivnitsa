<template>
    <list-items/>
</template>

<script>
import ListItems from "@vue/components/admin-panel-components/ListItemsComponent";
const items = [{text:'Статии',to:{name:'admin_article_index'}}];
    export default {
        name: "Article-index",
        components:{
          ListItems
        },
        created() {
            this.$store.commit("ArticleModule/FETCHING_ARTICLES");
            if(this.$store.getters["ArticleModule/articles"].length <= 1){
                 this.$store.dispatch("ArticleModule/findAll");
            }
            this.$store.commit("MainModule/ATTACH_BREADS",items)
        },
        destroyed() {
          this.$store.commit("MainModule/DETACH_BREADS",items);
        },
    };
</script>

<style scoped>

</style>