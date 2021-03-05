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
          <b-form-tags v-model="tag_value_3" no-outer-focus class="mb-2">
            <template v-slot="{tag, disabled,inputAttrs, inputHandlers, tagVariant, addTag, removeTag}">

              <ul v-if="tag_value_3.length > 0" class="list-inline d-inline-block mb-2">
                <li v-for="tag in tag_value_3" :key="tag" class="list-inline-item">
                  <b-form-tag
                      @remove="detach_article_tags({tag,removeTag})"
                      :title="tag"
                      :disabled="disabled"
                      variant="info"
                  >{{tag}}</b-form-tag>
                </li>
              </ul>
              <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
                <template v-slot:button-content>
                  <b-icon icon="tag-fill"></b-icon> Изберете Етикети
                </template>
                  <b-input-group prepend="Създай етикет:" class="mt-3">
                    <b-form-input
                        id="add-tag-input"
                        v-bind="inputAttrs"
                        v-on="inputHandlers"
                        placeholder="Създайте и добавете нов етикет !"
                        class="form-control"
                    ></b-form-input>
                    <b-input-group-append>
                      <b-button @click="on_create_tag({inputAttrs,addTag})" variant="outline-success">Създай Етикет !</b-button>
                    </b-input-group-append>
                  </b-input-group>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item-button
                    v-for="option in available_options"
                    :key="option.name"
                    :id="option['@id']"
                    @click="on_option_click({option, addTag})"
                >{{option.name}}</b-dropdown-item-button>
                <b-dropdown-text v-if="available_options.length === 0">
                  Няма създадени етикети ! Добавете от полето по-долу !
                </b-dropdown-text>
              </b-dropdown>
            </template>
          </b-form-tags>
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
      article_tags_iri: [],
      tag_value_3: [],
      tag_value_3_options: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6'],
      search: '',
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
    tags(){
      return this.$store.getters["TagModule/getTags"];
    },
    tag(){
      return this.$store.getters["TagModule/getTag"]
    },
    criteria () {
      return this.search.trim().toLowerCase();
    },
    available_options () {
      return this.tags;
    },
    searchDesc () {
      if (this.criteria && this.available_options.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
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
    attach_article_tags(name){
      this.tags.forEach(t=>{if(t.name===name&&!this.article_tags_iri.includes(t["@id"])){this.article_tags_iri.push(t["@id"])}});
    },
    detach_article_tags({tag,removeTag}){
      const removedTag = this.tags.filter(t=>t.name===tag);
      this.article_tags_iri = this.article_tags_iri.filter(ta=>ta!==removedTag[0]["@id"]);
      removeTag(tag);

    },
    on_option_click({option, addTag}) {
      let name = option.name;
      addTag(name);
      this.attach_article_tags(name);
    },
    async on_create_tag({inputAttrs,addTag}){
       const result = await this.$store.dispatch("TagModule/createTag",inputAttrs.value);
       if(result !== null){
         addTag(this.tag.name);
         this.attach_article_tags(this.tag.name);
       }else (alert("Неуспешно създаване на етикет !!! Опитайте пак !"));

    },
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