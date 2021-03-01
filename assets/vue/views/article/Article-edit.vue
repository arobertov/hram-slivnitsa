<template>
  <div class="main-content">
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2 caption-text">Редактирай статия</h1>
    </div>

    <div class="container-sm ">
      <form name="article" method="put">
        <div id="article">
          <div class="form-group row">
            <label class="col-form-label col-sm-2" for="article_title">Title</label>
            <div class="col-sm-10"><input v-model="title" type="text" id="article_title"
                                          name="article[title]" class="form-control"></div>
          </div>
          <div class="form-group row"><label class="col-form-label col-sm-2"
                                             for="article_contents">Contents</label>
            <div class="col-sm-10">
              <vue-editor :editorOptions="editorSettings" v-model="content"
                          class="bg-white"></vue-editor>
            </div>
          </div>
          <div class="form-group row"><label class="col-form-label col-sm-2"
                                             for="article_images">Images</label>
            <div class="col-sm-10"><select id="article_images" name="article[images][]" class="form-control"
                                           multiple="multiple"></select></div>
          </div>
          <div class="form-group row"><label class="col-form-label col-sm-2" for="article_tags">Tags</label>
            <div class="col-sm-10">
              <select v-model="tags" id="article_tags" name="article[tags][]" class="form-control"
                      multiple>
                <option v-for="t in tagsMod" v-bind:value="t.id">{{ t.name }}</option>
              </select>
            </div>
          </div>
          <b-form-select
              v-model="category"
              :options="categories['hydra:member']"
          >

          </b-form-select>

          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <div class="form-check"><input v-model="isPublished" type="checkbox"
                                             id="article_isPublished"
                                             name="article[isPublished]" class="form-check-input"
                                             value="1">
                <label class="form-check-label" for="article_isPublished">Is published</label></div>
            </div>
          </div>
          <button class="btn btn-success" @click="editArticle($event)">Редактирай</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';
import {VueEditor, Quill} from "vue2-editor";
import {ImageDrop} from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

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
  components: {VueEditor},
  data() {
    return {
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      },
      category: '/api/categories/4'
    }
  },
  computed: {
    categories() {
      return this.$store.getters["CategoryModule/getCategories"];
    },
    tagsMod() {
      return this.$store.getters["TagModule/tags"];
    },
    ...mapFields([
      'title',
      'content',
      'tags',
      'category',
      'isPublished'
    ]),
  },
  created() {
    let store = this.$store;
    const data = store.dispatch('ArticleModule/findArticle', this.$route.params.id),
          tags = [];
    store.dispatch("CategoryModule/findAllCategories");
    data.then(function (d) {
      d.tags.forEach(e => tags.push(e.id));
      store.commit('ArticleModule/EDITING_ARTICLE', tags);
    })
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
      const articleData = {
        articleId: this.$route.params.id,
        articleFormData: this.$store.state.ArticleModule.article
      };
      const articleId = await this.$store.dispatch("ArticleModule/edit", articleData);
      if (articleId !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": articleId}});
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