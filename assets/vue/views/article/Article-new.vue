<template>
  <div class="main-content">
    <b-alert show dismissible variant="danger" v-if="error">
      {{error}}
    </b-alert>

    <div class="container-sm ">
      <b-form>
        <div class="row">
          <b-form-group
            label="Заглавие на статия:"
            label-for="article_title"
            description="Заглавието трябва да бъде с дължина от 3 до 50 символа !"
            class="col-sm-6"
        >
            <b-form-input
              id="article_title"
              v-model="title"
              type="text"
              placeholder="Въведете заглавие на статия"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group
            label="Категория на статията"
            label-for="article_category"
            class="col-sm-6"
        >
            <b-form-select
              id="article_category"
              v-model="category"
              :options="categories"
            >
            </b-form-select>
        </b-form-group>
        </div>
        <div>
          <tag-form></tag-form>
        </div>
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
import TagForm from "../../components/admin-panel-components/Tag-form"


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
    VueEditor,TagForm
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
    categories() {
      return this.$store.getters["CategoryModule/getCategories"];
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