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
        <b-dropdown ref="dropdown" size="sm" variant="outline-secondary" block no-flip menu-class="w-100">
          <template v-slot:button-content>
            <b-icon icon="tag-fill"></b-icon>
            Изберете Етикети
          </template>
          <!--------- create tags form field ---------------->
          <b-dropdown-form @submit.stop.prevent="on_create_tag({inputTag,addTag})">
              <b-form-group
                  id="fieldset-horizontal"
              >
                <b-input-group class="mt-3">
                  <b-form-input
                        id="add-tag-input"
                        v-model="inputTag"
                        placeholder="Създайте нов етикет !"
                        class="form-control"
                        :state="state"
                    >
                  </b-form-input>
                  <b-input-group-append>
                    <b-button type="submit" variant="outline-success" >
                      Създай!
                    </b-button>
                  </b-input-group-append>
                </b-input-group>
              </b-form-group>
            </b-dropdown-form>
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
          <b-dropdown-text v-if="allTags.length === 0">
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
      inputTag: ''
    }
  },
  props:{
    storeModule:{
      type:String
    }
  },
  computed: {
    tags: {
      get: function() {
          return this.$store.getters[`${this.storeModule}/getTags`].map(t=>t.name);
      },
      set: function(tags){
        this.$store.commit(
            `${this.storeModule}/attachTags`,
            this.allTags.filter(tag=>tags.includes(tag.name))
        );
      }
    },
    state() {
      // Overall component validation state
      return this.dirty ? (this.inputTag.length > 2 && this.inputTag.length < 9) : null
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
  mounted() {
    if( ! this.$store.getters["TagModule/getTags"].length > 0){
      this.$store.dispatch("TagModule/findAllTags");
    }
  },
  methods: {
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

</style>