<template>
  <div class="my-modal" id="file-select">
    <transition name="modal" v-if="showModal">
      <div class="modal-mask">
        <div class="modal-wrapper" @click="close">
          <div class="modal-container">
            <a href="#" class="modal-close" @click.prevent="$emit('close')">
              <b-icon-x></b-icon-x>
            </a>
            <div class="modal-header">
              <h4>Избери изображение</h4>
            </div>
            <div class="modal-body">
              <div class="navigation">
                <ul>
                  <li>
                    <a href="#" @click.prevent="goBack" class="btn btn-primary btn-sm">
                      <b-icon-caret-left></b-icon-caret-left> Назад
                    </a>
                  </li>
                  <li>
                    <a href="#" @click.prevent><b-icon-house></b-icon-house> /</a>
                  </li>
                  <li v-for="(crumb, i) in breadcrumbs" :key="i">
                    <a href="#" @click.prevent>{{ crumb }} /</a>
                  </li>
                  <li class="float-right">
                    <a href="#" class="btn btn-primary btn-sm" @click.prevent="selectFiles">
                      <b-icon-upload></b-icon-upload> Добави
                    </a>
                    <input
                        type="file"
                        style="display: none"
                        ref="upload_files"
                        @input="uploadFiles"
                        id="file_uploads_selector"
                    />
                  </li>
                  <li class="float-right" style="margin-right: 1rem;">
                    <a
                        href="#"
                        class="btn btn-primary btn-sm"
                        @click.prevent="show_add_folder = !show_add_folder"
                    >
                      <b-icon-folder2></b-icon-folder2> Папка
                    </a>
                    <div class="add-folder" v-if="show_add_folder">
                      <input type="text" placeholder="Name" v-model="new_folder"/>
                      <button class="btn btn-primary btn-sm" @click.prevent="addFolder">save</button>
                    </div>
                  </li>
                </ul>
              </div>
              <div class="alert-manager">
                <b-alert v-if="isError" show variant="danger"><a href="#" class="alert-link">{{error}}</a></b-alert>
                <b-alert v-if="isSuccess" show variant="success"><a href="#" class="alert-link">{{successMessage}}</a></b-alert>
              </div>
              <div class="loading" v-if="isLoading">
                <b-spinner variant="primary" label="Spinning"></b-spinner>
              </div>
              <div class="images" v-else>
                <div class="image" v-for="(dir, i) in dirs" :key="`folder_${i}`">
                  <a href="#" @click.prevent="fetchDir(dir)">
                    <span class="preview">
                      <i class="fa fa-folder-o"></i>
                    </span>
                    <span class="name">{{ dir }}</span>
                  </a>
                </div>
                <div class="image" v-for="(file, i) in files" :key="`file_${i}`">
                  <input
                      :type="multiple ? 'checkbox' : 'radio'"
                      :id="`file_${file.id}`"
                      :value="file"
                      v-model="selected_files"
                      style="display: none;"
                  />
                  <label :for="`file_${file.id}`">
                    <span class="preview">
                      <b-img
                          thumbnail fluid
                          :src="require(`@images/${file.filePath}`).default"
                          :alt="file.filePath">
                      </b-img>
                    </span>
                    <span class="name" :title="file.id">{{ $_truncate.line(file.filePath, 8) }}</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <b-button
                  variant="info"
                  size="sm"
                  @click.prevent="$emit('close')">
                <b-icon-x-circle></b-icon-x-circle> Затвори
              </b-button>
              <b-button
                  variant="success"
                  size="sm"
                  :disabled="selected_files.length===0"
                  @click.prevent="$emit('selected', selected_files)"
              >
                <b-icon-check2></b-icon-check2> Избор
              </b-button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>

export default {
  name:"FileSelect",
  mounted() {
    if (this.$store.getters["ImageModule/getImages"].length < 1) {
      this.$store.dispatch("ImageModule/findAllImages");
    }
  },

  data() {
    return {
      dirs: [],
      dir: '',
      selected_files: [],
      show_add_folder: false,
      new_folder: '',
    };
  },
  props: {
    showModal: {
      type: Boolean,
      default() {
        return true;
      },
    },
    multiple: {
      type: Boolean,
      default() {
        return false;
      },
    },
    server: {
      type: Object,
      default() {
        return {home: '', add_folder: '', file_uploads: ''};
      },
    },
  },
  computed: {
    breadcrumbs() {
      return this.dir.split('/').filter(crumb => {
        return crumb !== '';
      });
    },
    files() {
      return this.$store.getters["ImageModule/getImages"];
    },
    isLoading() {
      return this.$store.getters["ImageModule/getIsLoading"];
    },
    isError(){
      return this.$store.getters["ImageModule/getIsError"];
    },
    error(){
      return this.$store.getters["ImageModule/getError"];
    },
    isSuccess(){
      return this.$store.getters["ImageModule/getIsSuccess"];
    },
    successMessage(){
      return this.$store.getters["ImageModule/getSuccessMessage"];
    }
  },

  methods: {
    close(e) {
      if (e.target.className === 'modal-wrapper') {
        this.$emit('close');
      }
    },

    async fetchImages() {
      this.selected_files = [];
      const result = await this.$store.dispatch("ImageModule/findAllImages");
    },

    selectFiles() {
      let input_field = document.getElementById('file_uploads_selector');
      input_field.click();
    },

    async uploadFiles() {
      let formData = new FormData();
      let data = this.$refs.upload_files.files[0];
      formData.append('fileImage', data);

      await this.$store.dispatch("ImageModule/uploadImage", formData);
    },
    /*
    fetchDir(dir) {
      this.dir += dir + '/';
      this.fetch();
    },

    goBack() {
      let deep = this.dir.split('/');
      this.dir = deep.splice(deep.length - 1, 1).join('/');
      this.fetch();
    },

    addFolder() {
      let data = {
        path: this.dir,
        name: this.new_folder,
      };

      axios.post(this.server.add_folder, data).then(response => {
        this.show_add_folder = false;
        this.dirs.push(this.new_folder);
        this.new_folder = '';
      });
    },
     */
  },
  watch: {
    show_modal(newval, oldval) {
      if (newval) {
        this.fetch();
      }
    },
  },
};
</script>