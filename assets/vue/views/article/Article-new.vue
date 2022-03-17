<template>
  <div class="main-content">
    <b-alert show dismissible variant="danger" v-if="error">
      {{ error }}
    </b-alert>
    <b-container>
      <validation-observer ref="newArticle" v-slot="{ handleSubmit ,invalid}">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <b-form-row>
            <b-col md="8">
              <article-title-input v-model="title"/>
              <article-content-input v-model="content"/>
            </b-col>
            <b-col md="4">
              <category-select v-model="category"/>
              <tag-form/>
              <image-manager/>
            </b-col>
          </b-form-row>
          <b-form-row>
            <div>
              <b-button id="check-article-btn" variant="info">Прегледай</b-button>
              <b-button type="submit" variant="success" id="new-article-submit-btn">Публикувай</b-button>
            </div>
          </b-form-row>
        </b-form>
      </validation-observer>
    </b-container>
  </div>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';
/*---------- import components -----------------*/
import ArticleTitleInput from "../../components/admin-panel-components/ArticleTitleInput";
import ArticleContentInput from "../../components/admin-panel-components/ArticleContentInput";
import TagForm from "../../components/admin-panel-components/TagFormSelect";
import CategorySelect from "../../components/admin-panel-components/CategorySelect";
import ImageManager from "../../components/admin-panel-components/ImageManager";

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
    ArticleTitleInput, CategorySelect, TagForm, ArticleContentInput, ImageManager
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
      'isPublished',

    ]),
  },
  created() {
    let store = this.$store;
    if (store.getters["ArticleModule/articles"].length < 1) {
      store.dispatch("ArticleModule/findAll");
    }
    store.commit("MainModule/ATTACH_BREADS", items);
    store.commit("ArticleModule/CREATING_ARTICLE");
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS", items);
  },
  methods: {
    onSubmit() {
      this.$refs.newArticle.validate().then(success => {
        if (success) {
          this.createArticle();
        }
      })
    },
    async createArticle() {
      let article = this.$store.getters["ArticleModule/getArticle"];
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