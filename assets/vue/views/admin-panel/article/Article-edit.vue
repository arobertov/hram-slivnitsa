<template>
  <div>
    <b-alert show dismissible variant="danger" v-if="error">
      {{error}}
    </b-alert>
    <b-container>
      <validation-observer ref="editArticle" v-slot="{ handleSubmit, invalid }">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <b-form-row>
            <b-col md="8">
              <title-input v-model="title" />
              <content-input v-model="content" />
            </b-col>
            <b-col md="4">
              <category-select v-model="category" />
              <tag-form/>
              <image-manager/>
            </b-col>
          </b-form-row>
          <b-form-row>
            <div>
              <b-button id="check-article-btn" variant="info">Прегледай</b-button>
              <b-button variant="success" type="submit" id="edit-article-submit-btn">Редактирай</b-button>
            </div>
          </b-form-row>
        </b-form>
      </validation-observer>

    </b-container>
  </div>
</template>

<script>
import {createHelpers} from 'vuex-map-fields';
import {VueEditor, Quill} from "vue2-editor";
import {ImageDrop} from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import TitleInput from "../../../components/admin-panel-components/TitleInputComponent";
import CategorySelect from "../../../components/admin-panel-components/CategorySelect";
import TagForm from "../../../components/admin-panel-components/TagFormSelect";
import ContentInput from "../../../components/admin-panel-components/ContentInputComponent";
import imageManager from "@vue/components/admin-panel-components/ImageManager";
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
      TitleInput,CategorySelect,TagForm,ContentInput,imageManager
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
    onSubmit() {
      this.$refs.editArticle.validate().then(success => {
        if (success) {
          this.editArticle();
        }
      })
    },
    async editArticle() {

      let article = this.$store.state.ArticleModule.article;
      const result = await this.$store.dispatch("ArticleModule/editArticle",article );
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