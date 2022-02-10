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
        <b-button id="check-article-btn" variant="info" @click="editArticle">Прегледай</b-button>
        <b-button variant="success" @click="editArticle">Редактирай</b-button>
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
import CategorySelect from "../../components/admin-panel-components/CategorySelect";
import TagForm from "../../components/admin-panel-components/TagFormSelect";
import ArticleContentInput from "../../components/admin-panel-components/ArticleContentInput";

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);

const {mapFields} = createHelpers({
  getterType: 'ArticleModule/getArticleField',
  mutationType: 'ArticleModule/updateArticleField',
});
const items = [
  {text: 'Статии', to: {name: 'admin_article_index'}},
  {text: 'Редактирай статия', to: {name: 'admin_article_edit'}}
];
export default {
  name: "Article-edit",
  components: {
      ArticleTitleInput,CategorySelect,TagForm,ArticleContentInput
    },
  data() {
    return {
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      },

    }
  },
  computed: {
    error() {
      return this.$store.getters["ArticleModule/error"];
    },
    tagsMod() {
      return this.$store.getters["TagModule/tags"];
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
    const data = store.dispatch('ArticleModule/loadEditingArticle', this.$route.params.id),
          tags = [];
    data.then(function (d) {
      d.tags.forEach(e => tags.push(e.name));
      store.commit('ArticleModule/EDITING_ARTICLE', tags);
    })
    //this.$store.commit("ArticleModule/FETCHING_ARTICLES");
    if(this.$store.getters["ArticleModule/articles"].length <= 1){
      this.$store.dispatch("ArticleModule/findAll");
    }
  },
  mounted() {
    this.$store.commit("MainModule/ATTACH_BREADS", items)
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS", items);
  },
  methods: {
    async editArticle(event) {
      if (event) {
        event.preventDefault()
      }
      let article = this.$store.state.ArticleModule.article;
      const result = await this.$store.dispatch("ArticleModule/edit",article );
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