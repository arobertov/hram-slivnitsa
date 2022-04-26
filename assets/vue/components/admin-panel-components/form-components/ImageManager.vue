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
  props:{
    storeModule:{
      type:String
    }
  },
  computed:{
    images:{
      get:function (){
        return this.$store.getters[`${this.storeModule}/getImages`];
      },
      set:function (image){
        this.$store.commit(`${this.storeModule}/attachImages`,image);
      }
    }
  },
}
</script>

<style scoped>

</style>