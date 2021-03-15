<template>
  <div class="main-content">
    <b-alert show dismissible variant="danger" v-if="error">
      {{error}}
    </b-alert>

    <div class="container-sm ">
      <b-form>
        <article-title-input v-model="title" />
        <category-select v-model="category" />
        <tag-form/>
        <article-content-input v-model="content" />
      </b-form>
    </div>
  </div>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';
/*---------- import components -----------------*/
import ArticleTitleInput from "../../components/admin-panel-components/ArticleTitleInput";
import ArticleContentInput from "../../components/admin-panel-components/ArticleContentInput";
import TagForm from "../../components/admin-panel-components/TagFormSelect";
import CategorySelect from "../../components/admin-panel-components/CategorySelect";

const {mapFields} = createHelpers({
  getterType: 'ArticleModule/getArticleField',
  mutationType: 'ArticleModule/updateArticleField',
});

const items = [
  {text:'Статии',to:{name:'admin_article_index'}},
  {text:'Създай статия',to:{name:'admin_article_new'}}
];

export default {
  name: "Article-new",
  components: {
    ArticleTitleInput,CategorySelect,TagForm,ArticleContentInput
  },
  computed: {
    responseData() {
      return this.$store.getters["ArticleModule/getResponseData"];
    },
    error() {
      return this.$store.getters["ArticleModule/error"];
    },
    ...mapFields([
      'title',
      'content',
      'category',
      'isPublished'
    ]),
  },
  created() {
    let store = this.$store;
    let tags = store.dispatch("TagModule/findAllTags");
    store.commit("MainModule/ATTACH_BREADS", items);
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS",items);
  },
  methods: {
    async createArticle(event) {
      if (event) {
        event.preventDefault()
      }
      const result = await this.$store.dispatch("ArticleModule/create", this.$store.state.ArticleModule.article);
      if (result !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": result.id}});
      }
    },
    async createCategory(){
      const response = await this.$store.dispatch("CategoryModule/createCategory",this.category.name);
      if(response!==null){

      }
    },
  }
};

</script>

<style scoped>

</style>