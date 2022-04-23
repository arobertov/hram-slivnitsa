<template>
  <form @submit.prevent="submit">
    <file-input
        v-model="images"
        :server="server"
    />
  </form>
</template>

<script>
import FileInput from '@vue/components/vue-image-manager/FileInput';

export default {
  name: "ImageManager",
  components:{
    FileInput
  },
  data() {
    return {
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
        return this.$store.getters["ArticleModule/getImages"];
      },
      set:function (image){
        this.$store.commit("ArticleModule/attachImages",image);
      }
    }
  },
}
</script>

<style scoped>

</style>