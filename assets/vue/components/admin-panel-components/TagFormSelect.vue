<template>
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
        <b-alert class="small"
            :show="isError"
            variant="danger"
        >
          {{error}}
        </b-alert>
        <b-alert class="small"
            :show="dismissCountDown"
            variant="success"
            dismissible
                 @dismiss-count-down="countDownChanged"
                 fade
        >
          {{successMessage}}
        </b-alert>
        <b-dropdown-divider></b-dropdown-divider>
        <table class="table table-borderless table-hover table-sm">
          <tbody>
          <tr
              v-for="option in available_options" v-if="option.show"
              :key="option.name"
          >
            <td class="w-80">
              <b-button
                  class="w-100"
                  v-b-popover.hover="'Добави етикет !'"
                  :id="option['@id']"
                  variant="success"
                  size="sm"
                  @click="on_option_click({option, addTag})">
                {{option.name}}
              </b-button>
            </td>
            <td class="float-right">
              <b-button size="sm"  v-b-popover.hover="'Редактирай етикет !'">
                <b-icon icon="pen-fill"></b-icon>
              </b-button>
            </td>
            <td>
              <b-button size="sm" variant="danger" v-b-popover.hover="'Изтрий етикет !'">
                <b-icon icon="trash-fill"></b-icon>
              </b-button>
            </td>
          </tr>
          </tbody>
        </table>

        <b-dropdown-text v-if="available_options.length === 0">
          Няма създадени етикети ! Добавете от полето по-горе !
        </b-dropdown-text>
      </b-dropdown>
    </template>
  </b-form-tags>
</template>
<script>

export default {
  name: "Tag-form",
  data(){
    return{
      tag_value_3: [],
      search: '',
      dismissCountDown: 0,
      dismissSecs:5
    }
  },
  computed:{
    isSuccess(){
      return this.$store.getters["TagModule/getIsSuccess"];
    },
    successMessage(){
      return this.$store.getters["TagModule/getSuccessMessage"];
    },
    isError() {
      return this.$store.getters["TagModule/getIsError"];
    },
    error(){
      return this.$store.getters["TagModule/getError"];
    },
    article_tags_iri:{
      get:function(){
        return this.$store.getters["ArticleModule/article"].article_tags_iri;
      },
      set:function (v){

      }
    },
    tags(){
      return this.$store.getters["TagModule/getTags"];
    },
    tag(){
      return this.$store.getters["TagModule/getTag"];
    },
    criteria () {
      return this.search.trim().toLowerCase();
    },
    available_options () {
      //return [];
      return this.tags;
    },
    searchDesc () {
      if (this.criteria && this.available_options.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
  },
  methods:{
    attach_article_tags({option, addTag}){
      let name = option.name;
      addTag(name);
      this.tags.forEach(t=>{
        if(t.name===name&&!this.article_tags_iri.includes(t["@id"]))
        {
          this.article_tags_iri.push(t["@id"])
        }
        if(t.id===option.id){
          t.show = false;
        }
      });
      this.$store.commit('ArticleModule/attachTagsForArticle',this.article_tags_iri)
    },
    detach_article_tags({tag,removeTag}){
      // tag -> tag.name;
      const removedTag = this.tags.filter(t=>t.name===tag);
      this.article_tags_iri = this.article_tags_iri.filter(ta=>ta!==removedTag[0]["@id"]);
      this.tags.forEach(t=>{
        if(t.name===tag){
          t.show = true;
        }
      })
      removeTag(tag);
      this.$store.commit('ArticleModule/attachTagsForArticle',this.article_tags_iri)
    },
    on_option_click({option, addTag}) {
      this.attach_article_tags({option,addTag});
    },

    async on_create_tag({inputAttrs,addTag}){
      const result = await this.$store.dispatch("TagModule/createTag",inputAttrs.value);
      if(result !== null){
        this.tags.unshift(this.tag);
        let option = this.tag;
        this.attach_article_tags({option,addTag});
        this.$store.commit("TagModule/updateTags",this.tags);
        if(this.isSuccess) this.showAlert();
      }
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs
    }
  }

}
</script>



<style scoped>

</style>