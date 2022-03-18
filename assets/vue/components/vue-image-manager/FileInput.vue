<template>
  <div>
    <a href="#" class="btn btn-warning float-right btn-sm" @click.prevent="clearFiles" v-if="files_selected">изчисти</a>
    <div class="input-field" @click="show_modal = true">
      <div class="helper" v-if="! files_selected">КЛИКНЕТЕ ЗА ИЗБОР НА ИЗОБРАЖЕНИЕ</div>
      <div class="preview" v-if="files_selected">
        <template v-if="multiple">
          <div class="image" v-for="(file, i) in selected_files" :key="i">
            <img :src="require(`@images/${file.filePath}`).default" alt="Image" height="150px">
          </div>
        </template>
        <template v-if="! multiple">
          <div class="image">
            <img :src="require(`@images/${selected_files.filePath}`).default" alt="Image" height="150px">
          </div>
        </template>
      </div>
    </div>
    <file-select
        :showModal="show_modal"
        @close="show_modal = false"
        @selected="selectFiles"
        :multiple="multiple"
        :server="server"
    >
      <template #header><h4>Избери изображение</h4></template>
    </file-select>
  </div>
</template>

<script>
import FileSelect from '@vue/components/vue-image-manager/FileSelect'

export default {
  name:'FileInput',
  components: {
    FileSelect
  },

  props: {
    multiple: {
      type: Boolean,
      default() { return false }
    },
    value: {
      type: Object | Array ,
      default() { return null }
    },
    server: {
      type: Object,
      default() { return { home: '', add_folder: '', file_uploads: '' }}
    }
  },

  data() {
    return {
      show_modal: false,
      selected_files: this.value,
      files_selected: false
    }
  },

  methods: {
    selectFiles(files) {
      this.selected_files = files;
      this.$emit('input', this.selected_files);
      this.files_selected= true;
      this.show_modal = false;
    },

    clearFiles() {
      this.selected_files = [];
      this.files_selected = false;
      this.$emit('input', []);
    }
  }
}
</script>

<style lang="scss" scoped>
.input-field {
  width: 100%;
  background: #eee;
  min-height: 150px;
  cursor: pointer;
  padding: 1rem;
}

.input-field .helper {
  text-align: center;
  padding-top: 1rem;
}

.preview {
  .image {
    display: inline-block;
    padding: 10px;
  }
}

</style>
