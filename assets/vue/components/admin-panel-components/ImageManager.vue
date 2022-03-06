<template>
  <form @submit.prevent="submit">
    <file-input v-model="files" :server="server" />
  </form>
</template>

<script>
export default {
  name: "ImageManager",
  data() {
    return {
      files: {},
      server: {
        home: '/api/v1/file-picker/dir',
        add_folder: '/api/v1/file-picker/add_folder',
        file_uploads: '/api/v1/file-picker/upload_files'
      }
    }
  }
}
</script>

<style scoped>

</style>