<template>
  <div class="main-content">
    <b-alert show dismissible variant="danger" v-if="error">
      {{error}}
    </b-alert>

    <div class="container-sm ">
      <b-form>
        <b-form-group
            label="Заглавие на статия:"
            label-for="article_title"
            description="Заглавието трябва да бъде с дължина от 3 до 50 символа !"
        >
          <b-form-input
              id="article_title"
              v-model="title"
              type="text"
              placeholder="Въведи заглавие на статия"
              required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Текст на статия:"
          label-for="article_content"
        >
          <vue-editor
              id="article_content"
              :editorOptions="editorSettings"
              v-model="content"
              class="bg-white"
          >
          </vue-editor>
        </b-form-group>
        <b-form-select
            v-model="category"
            :options="categories"
        >
        </b-form-select>

      </b-form>
    </div>
  </div>
  <!--
  <form name="article" method="post">
        <div id="article">
          <div class="badge badge-danger" v-if="formErrors.title"> {{ formErrors.title }}</div>
          <div class="form-group row">
            <label class="col-form-label col-sm-2" for="article_title">Title</label>
            <div class="col-sm-10"><input v-model="title" type="text" id="article_title" name="article[title]"
                                          class="form-control"></div>
          </div>
          <div class="badge badge-danger" v-if="formErrors.content"> {{ formErrors.content }}</div>
          <div class="form-group row"><label class="col-form-label col-sm-2"
                                             for="article_content">Contents</label>
            <div class="col-sm-10">
              <vue-editor id="article_content" :editorOptions="editorSettings" v-model="content"
                          class="bg-white"></vue-editor>
            </div>
          </div>
          <div class="form-group row"><label class="col-form-label col-sm-2" for="article_images">Images</label>
            <div class="col-sm-10"><select id="article_images" name="article[images][]" class="form-control"
                                           multiple="multiple"></select></div>
          </div>
          <div class="form-group row"><label class="col-form-label col-sm-2" for="article_tags">Tags</label>
            <div class="col-sm-10">
              <select v-model="tags" id="article_tags" name="article[tags][]" class="form-control" multiple>
                <option v-for="t in tagsMod" v-bind:value="t.id">{{ t.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-group row"><label class="col-form-label col-sm-2"
                                             for="article_category">Category</label>
            <div class="col-sm-10" v-if="categories">
              <select v-model="category" id="article_category" name="article[category]" class="form-control">
                <option v-for="cat in categories['hydra:member']" v-bind:value="cat['@id']">{{ cat.name }}</option>
              </select>
            </div>
            <div v-else>
              <span> Няма създадени категории !  </span>
              <button class="btn btn-success">Добавете категория</button>
            </div>
          </div>
          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <div class="form-check"><input v-model="isPublished" type="checkbox" id="article_isPublished"
                                             name="article[isPublished]" class="form-check-input" value="1">
                <label class="form-check-label" for="article_isPublished">Is published</label></div>
            </div>
          </div>
          <button class="btn btn-success" @click="createArticle($event)">Save</button>
        </div>
      </form>
  -->
</template>

<script>
import {createHelpers} from 'vuex-map-fields';
import {VueEditor, Quill} from "vue2-editor";
import {ImageDrop} from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import AdminPageCaption from "../../components/admin-panel-components/Admin-page-caption";


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
    VueEditor,
    AdminPageCaption
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
    formErrors() {
      return this.$store.getters["ArticleModule/formErrors"];
    },
    categories() {
      let categories = this.$store.getters["CategoryModule/getCategories"]["hydra:member"];
      let options = [];
      categories.forEach(cat=>{
          options.text = cat.name, options.value = cat['@id']
      })
      return options;
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
    let result = store.dispatch("CategoryModule/findAllCategories");
    result.then(function (e) {
      let category = e['hydra:member'];
      store.commit("ArticleModule/CREATING_ARTICLE", category.length > 0 ? category[0]['@id'] : null);
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