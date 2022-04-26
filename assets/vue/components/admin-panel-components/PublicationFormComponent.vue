<template>
  <div>
    <b-alert show dismissible variant="danger" v-if="error">
      {{ error }}
    </b-alert>
    <b-container>
      <validation-observer ref="publicationForm" v-slot="{ handleSubmit, invalid}">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <b-form-row>
            <b-col md="8">
              <title-input
                  v-model="title"
                  placeholder="Въведете заглавие с дължина от 3 до 50 символа"
              />

              <content-input
                  v-model="content"
                  placeholder="Въведете текст на публикацията..."
                  :publication-type="publicationType"
              />
            </b-col>
            <b-col md="4">
              <category-select v-model="category"/>
              <tag-form :store-module="storeModule"/>
              <image-manager :store-module="storeModule"/>
            </b-col>
          </b-form-row>
          <b-form-row>
            <div>
              <b-button id="check-btn" variant="info" >Прегледай</b-button>
              <b-button :disabled="invalid" type="submit" variant="success" id="submit-btn">Публикувай</b-button>
            </div>
          </b-form-row>
        </b-form>
      </validation-observer>
    </b-container>
  </div>
</template>

<script>
/*---------- import components -----------------*/
import TitleInput from "@vue/components/admin-panel-components/form-components/TitleInputComponent";
import ContentInput from "@vue/components/admin-panel-components/form-components/ContentInputComponent";
import TagForm from "@vue/components/admin-panel-components/form-components/TagFormSelect";
import CategorySelect from "@vue/components/admin-panel-components/form-components/CategorySelect";
import ImageManager from "@vue/components/admin-panel-components/form-components/ImageManager";



export default {
  name: "PublicationForm",
  components: {
    TitleInput, CategorySelect, TagForm, ContentInput, ImageManager
  },
  props:{
    storeModule:{
      type:String,
      default:'NewsModule'
    },
    publicationType:{
      type:String
    }
  },
  computed: {
    error() {
      return this.$store.getters[`${this.storeModule}/getError`];
    },
    module(){
      console.log('Call module');
      return this.storeModule
    },
    title:{
      get(){
        return this.$store.getters[`${this.storeModule}/getItem`].title
      },
      set(title){
        return this.$store.commit(`${this.storeModule}/setItem`,{field:'title',value:title});
      }
    },
    content:{
      get(){
        return this.$store.getters[`${this.storeModule}/getItem`].content
      },
      set(content){
        return this.$store.commit(`${this.storeModule}/setItem`,{field:'content',value:content});
      }
    },
    category:{
      get(){
        return this.$store.getters[`${this.storeModule}/getItem`].category
      },
      set(category){
        return this.$store.commit(`${this.storeModule}/setItem`,{field:'category',value:category});
      }
    },
  },
  methods: {
    onSubmit(){
      this.$refs.publicationForm.validate().then(success=>{
        if(success) this.$emit('trigger-method');
      })

    },
    async create() {
      let item = this.$store.getters[`${this.storeModule}/getItem`];
      const result = await this.$store.dispatch(`${this.storeModule}/create`, item);
      if (result !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": result.id}});
      }
    },
  },
}
</script>

<style scoped>

</style>