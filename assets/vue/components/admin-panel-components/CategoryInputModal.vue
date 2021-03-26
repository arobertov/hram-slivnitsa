<template>
  <div>
    <b-button v-b-modal.category-modal variant="info" class="mt-4" >
      <b-icon icon="plus-square" aria-hidden="true"></b-icon>  Добави категория
    </b-button>

    <b-modal
        id="category-modal"
        ref="modal"
        title="Създай категория !"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
    >
      <div class="alerts">
        <b-alert class="small"
                 :show="isError"
                 variant="danger"
        >
          {{error}}
        </b-alert>
      </div>
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
            label="Име на категория :"
            label-for="category-input"
            invalid-feedback="Името е задължително"
            :state="categoryState"
        >
          <b-form-input
              id="category-input"
              v-model="category.name"
              :state="categoryState"
              required
          ></b-form-input>
        </b-form-group>
      </form>
      <template #modal-footer="{ ok, cancel, hide }">
        <b-button variant="info" @click="cancel()">
          <b-icon icon="x-circle"></b-icon> Затвори
        </b-button>
        <b-button variant="success" @click="ok()">
          <b-icon icon="plus-circle"></b-icon> Добави
        </b-button>
      </template>
    </b-modal>
  </div>

</template>

<script>
export default {
  name: "CategoryInputModal",
  data() {
    return {
      category:{
        name:''
      } ,
      categoryState: null,
      submittedCategories: [],
    }
  },
  computed:{
    isError(){
      return this.$store.getters["CategoryModule/getIsError"];
    },
    error(){
      return this.$store.getters["CategoryModule/getError"];
    }
  },
  methods: {
    async createCategory(){
      const store = this.$store;
      let result = await store.dispatch("CategoryModule/createCategory",this.category.name);
      if(result!==null){
        await store.dispatch("CategoryModule/findAllCategories");
        store.state.ArticleModule.article.category = result['@id'];
        //await store.commit("ArticleModule/CREATING_ARTICLE",result['@id']);
        this.$nextTick(() => {
          this.$bvModal.hide('category-modal')
        })
      }

    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.categoryState = valid
      return valid
    },
    resetModal() {
      this.category.name = ''
      this.categoryState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedCategories.push(this.category.name);
      this.createCategory();
    },
  }
}
</script>

<style scoped>

</style>