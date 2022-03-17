<template>
  <form @submit.prevent="submit">
    <file-input
        v-model="image"
        @input="attachImageForArticles"
        :server="server"
    />
  </form>
</template>

<script>
import FileInput from '../../components/vue-image-manager/FileInput';

export default {
  name: "ImageManager",
  components:{
    FileInput
  },
  data() {
    return {
      image: null,
      server: {
        home: 'https://localhost:8080',
        add_folder: '/api/public/files',
        file_uploads: '/api/images'
      }
    }
  },
  computed:{
    images:{
      get:function (){
        return this.$store.getters["ArticleModule/getImagesArticle"];
      },
      set:function (image){
        this.$store.commit("ArticleModule/attachImagesForArticles",image["@id"])
      }
    }
  },
  methods:{
    attachImageForArticles() {
      if(this.image){
        this.images=this.image;
      }
    }
  }
}
</script>

<style scoped>

</style>