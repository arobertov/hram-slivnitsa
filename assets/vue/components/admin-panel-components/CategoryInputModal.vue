<template>
  <div>
    <b-button v-b-modal.category-modal variant="info" class="mt-4">
      <b-icon icon="plus-square" aria-hidden="true"></b-icon>
      Добави категория
    </b-button>
    <validation-observer ref="observer" v-slot="{ handleSubmit }">
      <b-form ref="form" @submit.stop.prevent="handleSubmit(onSubmit)">
        <b-modal
            id="category-modal"
            ref="modal"
            title="Създай категория !"
            @show="resetModal"
            @hidden="resetModal"
        >
          <div class="alerts">
            <b-alert class="small"
                     :show="isError"
                     variant="danger"
            >
              {{ error }}
            </b-alert>
          </div>

          <validation-provider
              name="Име на категория"
              :rules="{ required: true, min: 3,max: 20 }"
              v-slot="validationContext"
          >
            <b-form-group
                label="Име на категория :"
                label-for="category-input"
                :invalid-feedback="validationContext.errors[0] "
                :state="categoryState"
            >
              <b-form-input
                  id="category-input"
                  name="category-input"
                  v-model="category.name"
                  :state="getValidationState(validationContext)"
                  aria-describedby="category-live-feedback"
              ></b-form-input>
            </b-form-group>
          </validation-provider>
          <template #modal-footer="{ ok, cancel, hide }">
            <b-button variant="info" @click="cancel()">
              <b-icon icon="x-circle"></b-icon>
              Затвори
            </b-button>
            <b-button type="submit" variant="success"  @click="onSubmit">
              <b-icon icon="plus-circle"></b-icon>
              Добави
            </b-button>
          </template>
        </b-modal>
      </b-form>
    </validation-observer>
  </div>

</template>

<script>
export default {
  name: "CategoryInputModal",
  data() {
    return {
      category: {
        name: ''
      },
      categoryState: null,
      submittedCategories: [],
    }
  },
  computed: {
    isError() {
      return this.$store.getters["CategoryModule/getIsError"];
    },
    error() {
      return this.$store.getters["CategoryModule/getError"];
    }
  },
  methods: {
    async createCategory() {
      const store = this.$store;
      let result = await store.dispatch("CategoryModule/createCategory", this.category.name);
      if (result !== null) {
        await store.dispatch("CategoryModule/findAllCategories");
        store.state.ArticleModule.article.category = result['@id'];
        this.$nextTick(() => {
          this.$bvModal.hide('category-modal')
        })
      }

    },

    resetModal() {
      this.category.name = ''
      this.categoryState = null
    },
    onSubmit() {
      // Exit when the form isn't valid
      // Push the name to submitted names
      this.$refs.observer.validate().then(success => {
        if (success) {
          this.submittedCategories.push(this.category.name);
          this.createCategory();
        }
      })
    },
    getValidationState({dirty, validated, valid = null}) {
      return dirty || validated ? valid : null;
    },
  }
}
</script>

<style scoped>

</style>