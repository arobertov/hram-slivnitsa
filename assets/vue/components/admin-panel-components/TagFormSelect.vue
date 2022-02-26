<template>
  <div>
    <b-form-tags ref="tagForm" id="tags-with-dropdown" v-model="tags" no-outer-focus add-on-change class="mb-2">
      <template v-slot="{tags, inputAttrs, inputHandlers, disabled,addTag, removeTag}">
        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
          <!------- render tag------------->
          <li v-for="tag in tags" :key="tag" class="list-inline-item">
            <b-form-tag
                @remove="removeTag(tag)"
                :title="tag"
                :disabled="disabled"
                variant="info"
            >
            </b-form-tag>
          </li>
          <!------- render tag ------------->
        </ul>
        <b-dropdown ref="dropdown" size="sm" variant="outline-secondary" block menu-class="w-100">
          <template v-slot:button-content>
            <b-icon icon="tag-fill"></b-icon>
            Изберете Етикети
          </template>
          <!--------- create tags form field ---------------->
            <b-form @submit.stop.prevent="on_create_tag({inputTag,addTag})">
                <b-input-group prepend="Създай етикет:" class="mt-3">
                  <b-form-input
                        id="add-tag-input"
                        v-model="inputTag"
                        :state="state"
                        placeholder="Създайте и добавете нов етикет !"
                        class="form-control"
                    >
                    </b-form-input>
                <b-input-group-append>
                  <b-button type="submit" variant="outline-success" :disabled="!state">
                    Създай Етикет !
                  </b-button>
                </b-input-group-append>
              </b-input-group>
              <div class="invalid-feedback" v-show="!state" ref="tagFeedback">{{ inputErrorMessage }}</div>
            </b-form>
          <b-alert
              show dismissible
              class="small"
              :show="isError"
              variant="danger"
          >
            {{ error }}
          </b-alert>
          <!------- end create tag form field --------------->
          <div v-if="isLoading">
            <b-dropdown-divider></b-dropdown-divider>
            <b-button class="w-100" variant="info">
              <b-spinner small></b-spinner>
              <--- Извличане на етикети ! --->
            </b-button>
          </div>

          <b-dropdown-divider></b-dropdown-divider>
          <table class="table table-borderless table-hover table-sm">
            <tbody>
            <tr
                v-for="option in available_options"
                :key="option.name"
            >
              <td class="w-80">
                <b-button
                    class="w-100"
                    v-b-popover.hover="'Добави етикет !'"
                    :id="option['@id']"
                    variant="success"
                    size="sm"
                    @click="addTag(option.name)"
                >
                  {{ option.name }}
                </b-button>
              </td>
              <td class="float-right">
                <b-button size="sm" v-b-popover.hover="'Редактирай етикет !'">
                  <b-icon icon="pen-fill"></b-icon>
                </b-button>
              </td>
              <td>
                <b-button size="sm" variant="danger" v-b-popover.hover="'Изтрий етикет !'"
                          @click="on_confirm_delete_modal(option)">
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
    <b-modal
        ref="success-create-tag-modal"
        title="Потвърждение !"
        size="lg"
        buttonSize="sm"
        okVariant="success"
        headerClass="p-2 border-bottom-0"
        footerClass="p-2 border-top-0"
        centered
    >
      {{ successMessage }}
    </b-modal>
  </div>

</template>
<script>

export default {
  name: "Tag-form",
  data() {
    return {
      inputTag: '',
      dirty: false,
      inputErrorMessage:''
    }
  },
  computed: {
    tags: {
      get: function() {
        return this.$store.getters["ArticleModule/getTagsArticle"].map(t=>t.name);
      },
      set: function(tags){
        this.$store.commit(
            'ArticleModule/attachTagsForArticle',
            this.allTags.filter(tag=>tags.includes(tag.name))
        );
      }
    },
    isLoading() {
      return this.$store.getters["TagModule/getIsLoading"];
    },
    isSuccess() {
      return this.$store.getters["TagModule/getIsSuccess"];
    },
    successMessage() {
      return this.$store.getters["TagModule/getSuccessMessage"];
    },
    isError() {
      return this.$store.getters["TagModule/getIsError"];
    },
    error() {
      return this.$store.getters["TagModule/getError"];
    },
    state() {
      // Overall component validation state
      return this.dirty ? this.tagValidator(this.inputTag) : null
    },
    allTags(){
      return this.$store.getters["TagModule/getTags"]
    },
    available_options() {
      return this.allTags.filter(tag=>! this.tags.includes(tag.name));
    },
    searchDesc() {
      if (this.criteria && this.available_options.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
  },
  watch: {
    inputTag(newValue, oldValue) {
      // Set the dirty flag on first change to the tags array
      this.dirty = true
    }
  },
  mounted() {
    this.$store.dispatch("TagModule/findAllTags");
  },
  methods: {
    tagValidator(tag) {
      // Individual tag validator function
      if(tag === tag.toLowerCase() && tag.length > 2 && tag.length < 6){
        this.inputErrorMessage = '';
        return true;
      }
      this.inputErrorMessage = 'Етикета трябва да съдържа от 3 до 20 символа !';
      return false
    },
    on_confirm_delete_modal(tag) {
      this.$bvModal.msgBoxConfirm('МОЛЯ ПОТВЪРДЕТЕ ЧЕ ЖЕЛАЕТЕ ДА ИЗТРИЕТЕ ЕТИКЕТА : ' + tag.name, {
        title: 'МОЛЯ ПОТВЪРДЕТЕ !',
        size: 'ld',
        buttonSize: 'lg',
        okVariant: 'danger',
        okTitle: 'ДА',
        cancelTitle: 'НЕ',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
          .then(value => {
            if (value) {
              this.on_delete_tag(tag);
            }
          })
          .catch(err => {
            alert(err);
          })
    },
// ----- Success & error message modal ----- //
    showMsgBox() {
      this.$bvModal.msgBoxOk(this.isSuccess ? this.successMessage : this.isError ? this.error['hydra:description'] : '', {
        id: 'delete_info_modal',
        bodyBgVariant: this.isError ? 'danger' : 'success',
        bodyTextVariant: 'light',
        okVariant: this.isError ? 'danger' : 'success',
        okTitle: 'Добре',
        title: this.isError ? this.error['hydra:title'] : this.isSuccess ? 'Готово !!!' : '',

      })
    },
    async on_create_tag({inputTag, addTag}) {
      const option = await this.$store.dispatch("TagModule/createTag", inputTag);
      if (option !== null) {
        try {
          addTag(option.name);
          this.inputTag = '';
          this.$refs.dropdown.hide(true);
        } catch (e) {
          console.log(e)
        }
        if (this.isSuccess) {
          this.showMsgBox();
          setTimeout(() => {
            this.$bvModal.hide('delete_info_modal')
          }, 3000)
        }
      }
    },
    async on_delete_tag(tag) {
      const result = await this.$store.dispatch("TagModule/deleteTag", tag);
      this.showMsgBox();
      if (result !== null) {
        setTimeout(() => {
          this.$bvModal.hide('delete_info_modal')
        }, 3000)
      }
    }
  }
}
</script>

<style scoped>
  .invalid-feedback{
    margin-left: 2em !important;
    display: block !important;
  }
</style>