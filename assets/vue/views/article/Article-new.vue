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
        <b-form-group
          label="Текст на статия:"
          label-for="article_content"
        >
          <vue-editor
              id="article_content"
              :editorOptions="editorSettings"
              v-model="content"
              class="bg-white"
              placeholder="Въведете текст на статия..."
          >
          </vue-editor>
        </b-form-group>
      </b-form>
    </div>
  </div>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';
import {VueEditor, Quill} from "vue2-editor";
import {ImageDrop} from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import ArticleTitleInput from "../../components/admin-panel-components/ArticleTitleInput";
import TagForm from "../../components/admin-panel-components/TagFormSelect";
import CategorySelect from "../../components/admin-panel-components/CategorySelect";


Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

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
    VueEditor,ArticleTitleInput,CategorySelect,TagForm
  },
  data() {
    return {
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    }
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
    let result = store.dispatch("CategoryModule/findAllCategories");
    let tags = store.dispatch("TagModule/findAllTags");
    result.then(function (e) {
      store.commit("ArticleModule/CREATING_ARTICLE", e.length > 0 ? e[0]['@id'] : null);
      store.commit("MainModule/ATTACH_BREADS", items);
    })
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
    }
  }
};

</script>

<style scoped>

</style>