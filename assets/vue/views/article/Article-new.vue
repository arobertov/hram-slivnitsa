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
        <b-button id="check-article-btn" variant="info" @click="createArticle">Прегледай</b-button>
        <b-button variant="success" @click="createArticle">Публикувай</b-button>
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
    if(store.getters["ArticleModule/articles"].length <= 1){
      store.dispatch("ArticleModule/findAll");
    }
    //store.dispatch("TagModule/findAllTags");
    store.commit("MainModule/ATTACH_BREADS", items);
    store.commit("ArticleModule/CREATING_ARTICLE");
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS",items);
  },
  methods: {
    async createArticle(event) {
      let article = this.$store.state.ArticleModule.article;
      if (event) {
        event.preventDefault()
      }
      if(event.target.id==="check-article-btn"){
        article.isPublished = false;
      }
      const result = await this.$store.dispatch("ArticleModule/create",article);
      if (result !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": result.id}});
      }
    },
  }
};

</script>

<style scoped>

</style>