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
      submittedCategories: []
    }
  },
  methods: {
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
      this.$emit('get-category-name',this.category.name)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide('category-modal')
      })
    }
  }
}
</script>

<style scoped>

</style>