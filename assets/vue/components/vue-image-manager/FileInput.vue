<template>
  <div>
    <a href="#" class="btn btn-warning float-right btn-sm" @click.prevent="clearFiles" v-if="value.length>0">изчисти</a>
    <div class="input-field" @click="show_modal = true">
      <div class="helper" v-if="value.length === 0">КЛИКНЕТЕ ЗА ИЗБОР НА ИЗОБРАЖЕНИЕ</div>
      <div class="preview" v-else>
        <div>
          <div class="image">
            <img :src="require(`@images/${value[0].filePath}`).default" alt="Image" height="150px">
          </div>
        </div>
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
      default() { return [] }
    },
    server: {
      type: Object,
      default() { return { home: '', add_folder: '', file_uploads: '' }}
    }
  },
  data() {
    return {
      show_modal: false,
    }
  },
  methods: {
    selectFiles(files) {
      this.$emit('input', files);
      this.show_modal = false;
    },

    clearFiles() {
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
