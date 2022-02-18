<template>
  <div>
    <b-form-tags id="tags-with-dropdown" v-model="tagsArticle" no-outer-focus add-on-change class="mb-2">
      <template v-slot="{tags, inputAttrs, inputHandlers, disabled,addTag, removeTag}">
        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
          <!------- render tag------------->
          <li v-for="tag in tags" :key="tag" class="list-inline-item">
            <b-form-tag
                @remove="detach_article_tags({tag,removeTag})"
                :title="JSON.parse(tag).name"
                :disabled="disabled"
                variant="info"
            >
            </b-form-tag>
          </li>
          <!------- render tag ------------->
        </ul>
        <b-dropdown size="sm" variant="outline-secondary" block menu-class="w-100">
          <template v-slot:button-content>
            <b-icon icon="tag-fill"></b-icon>
            Изберете Етикети
          </template>
          <!--------- create tags form field ---------------->
          <b-input-group prepend="Създай етикет:" class="mt-3">
            <b-form-input
                id="add-tag-input"
                v-bind="inputAttrs"
                v-on="inputHandlers"
                placeholder="Създайте и добавете нов етикет !"
                class="form-control"
            >
            </b-form-input>
            <b-input-group-append>
              <b-button @click="on_create_tag({inputAttrs,addTag})" variant="outline-success">
                Създай Етикет !
              </b-button>
            </b-input-group-append>
          </b-input-group>
          <!------- end create tag form field --------------->
          <div v-if="isLoading">
            <b-dropdown-divider></b-dropdown-divider>
            <b-button class="w-100" variant="info">
              <b-spinner small></b-spinner>
              <--- Извличане на етикети ! --->
            </b-button>
            <b-alert class="small"
                     :show="isError"
                     variant="danger"
            >
              {{ error }}
            </b-alert>
          </div>

          <b-dropdown-divider></b-dropdown-divider>
          <table class="table table-borderless table-hover table-sm">
            <tbody>
            <tr
                v-for="option in available_options" v-if="option.show"
                :key="option.name"
            >
              <td class="w-80">
                <b-button
                    class="w-100"
                    v-b-popover.hover="'Добави етикет !'"
                    :id="option['@id']"
                    variant="success"
                    size="sm"
                    @click="attach_article_tags({option,addTag})"
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
      search: '',
      hasDeleteTag: false,
    }
  },
  computed: {
    tagsArticle: {
      get: function () {
        return this.$store.getters["ArticleModule/getTagsArticle"];
      },
      set: function (tags) {
        this.$store.commit('ArticleModule/attachTagsForArticle', tags);
      }
    },
    allTags: {
      get: function () {
        return this.$store.getters["TagModule/getTags"];
      },
      set: function (tags) {
        console.log(tags)
        this.$store.commit('TagModule/UPDATING_ITEMS', tags);
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
    criteria() {
      return this.search.trim().toLowerCase();
    },
    available_options() {
      return this.allTags;
    },
    searchDesc() {
      if (this.criteria && this.available_options.length === 0) {
        return 'There are no tags matching your search criteria'
      }
      return ''
    },
  },
  mounted() {
    this.$store.dispatch("TagModule/findAllTags");
  },
  methods: {
    setTagsVisible(option,condition){
      let tagsArticle = [],setValue;
      try{
        setValue = JSON.parse(option)
      }catch (e) {
        setValue = option
      }
      this.allTags.forEach(tag => {
        if (tag.id === setValue.id) {
            tag.show = condition
        }
        tagsArticle.push(tag)
      });
      return tagsArticle;
    },
    attach_article_tags({option, addTag}) {
      addTag(option.name);
      this.tagsArticle.push(option);
      this.allTags = this.setTagsVisible(option,false);
    },
    detach_article_tags({tag, removeTag}) {
      removeTag(tag);
      this.allTags = this.setTagsVisible(tag,true);
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
        title: this.isError ? this.error['hydra:title'] : this.isSuccess ? 'Успех !' : '',

      })
    },
    async on_create_tag({inputAttrs, addTag}) {
      const result = await this.$store.dispatch("TagModule/createTag", inputAttrs.value);
      if (result !== null) {
        let option = this.tag;
        this.allTags.unshift(option);
        this.attach_article_tags({option, addTag});
        // this.$store.commit("TagModule/updateTags",this.tags);
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
        this.$store.commit("TagModule/updateTags", this.allTags.filter(t => tag.name !== t.name));
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