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
          <b-form-group  label-for="tags-component-select">
            <!-- Prop `add-on-change` is needed to enable adding tags vie the `change` event -->
            <b-form-tags
                id="tags-component-select"
                v-model="tags"
                class="mb-4"
                add-on-change
                no-outer-focus
            >
              <template v-slot="{ tags, inputAttrs, inputHandlers, disabled, removeTag }">
                <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                  <li v-for="tag in tags" :key="tag" class="list-inline-item">
                    <b-form-tag
                        @remove="removeTag(tag)"
                        :title="tag"
                        :disabled="disabled"
                        variant="success"
                    >{{ tag }}</b-form-tag>
                  </li>
                </ul>
                <b-form-select
                    v-bind="inputAttrs"
                    v-on="inputHandlers"
                    :disabled="disabled || availableOptions.length === 0"
                    :options="availableOptions"
                >
                  <template #first>
                    <!-- This is required to prevent bugs with Safari -->
                    <option disabled value="">Изберете етикети за статията ...</option>
                  </template>
                </b-form-select>
              </template>
            </b-form-tags>
          </b-form-group>
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
  },
  data() {
    return {
      value:[],
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
      return this.$store.getters["CategoryModule/getCategories"];
    },
    options() {
      return this.$store.getters["TagModule/tags"];
    },
    availableOptions() {
       return this.handleTagsOptions(this.$store.getters["TagModule/getTags"]);
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
    },
    handleTagsOptions(tags){
      let options = [];
      tags.forEach(t=>{
        options.push({text:t.name,value:t.name})
      });
      return options;
    }
  }
};

</script>

<style scoped>

</style>