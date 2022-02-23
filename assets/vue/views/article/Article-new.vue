<template>
  <div class="main-content">
    <b-alert show dismissible variant="danger" v-if="error">
      {{ error }}
    </b-alert>

    <div class="container-sm ">
      <validation-observer ref="observer" v-slot="{ handleSubmit,invalid }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <article-title-input v-model="title"/>
          <category-select v-model="category"/>
          <tag-form/>
          <article-content-input v-model="content"/>
          <b-button id="check-article-btn" variant="info">Прегледай</b-button>
          <b-button type="submit" variant="success" :disabled="invalid" >Публикувай</b-button>
        </b-form>
      </validation-observer>
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
  {text: 'Статии', to: {name: 'admin_article_index'}},
  {text: 'Създай статия', to: {name: 'admin_article_new'}}
];

export default {
  name: "Article-new",
  components: {
    ArticleTitleInput, CategorySelect, TagForm, ArticleContentInput
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
    if (store.getters["ArticleModule/articles"].length <= 1) {
      store.dispatch("ArticleModule/findAll");
    }
    //store.dispatch("TagModule/findAllTags");
    store.commit("MainModule/ATTACH_BREADS", items);
    store.commit("ArticleModule/CREATING_ARTICLE");
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS", items);
  },
  methods: {
    onSubmit() {
      this.createArticle()
    },
    async createArticle() {
      let article = this.$store.state.ArticleModule.article;
      const result = await this.$store.dispatch("ArticleModule/create", article);
      if (result !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": result.id}});
      }
    },
  }
};

</script>

<style scoped>

</style>