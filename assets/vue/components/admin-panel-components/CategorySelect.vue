<template>
  <div>
    <div class="alerts">
      <b-alert class="small"
               v-if="isSuccess"
               :show="dismissCountDown"
               variant="success"
               dismissible
               @dismiss-count-down="countDownChanged"
               fade
      >
        {{ successMessage }}
      </b-alert>
    </div>
    <b-form-group
        label="Категория :"
        label-for="_category"
    >
      <b-form-select
          id="_category"
          v-bind:value="value"
          v-bind:selected="true"
          v-on:input="$emit('input', $event)"
          :options="options"
          required
      >
        <template #first>
          <b-form-select-option
              value=""
              v-if="options.length===0"
              disabled
          >
            - Няма създадени категории
          </b-form-select-option>
          <b-form-select-option
              value=""
              v-else-if="options.length>0"
              disabled
          >
            -- Изберете категория --
          </b-form-select-option>
        </template>
      </b-form-select>
    </b-form-group>
    <category-input-modal/>
  </div>
</template>

<script>
import CategoryInputModal from "./CategoryInputModal";

export default {
  name: "CategorySelect",
  data() {
    return {
      categoryName: '',
      dismissCountDown: 0,
      dismissSecs: 5
    }
  },
  components: {
    CategoryInputModal
  },
  props: ['value'],
  computed: {
    categories() {
      return this.$store.getters["CategoryModule/getCategories"];
    },
    options(){
      let options = [];
      if(Array.isArray(this.categories)){
        this.categories.forEach(cat=>{
          options.push({text:cat.name,value:cat['@id']});
        })
      }
      return options;
    },
    isSuccess() {
      const success = this.$store.getters["CategoryModule/getIsSuccess"];
      if (success) this.showSuccessAlert();
      return success;
    },
    successMessage() {
      return this.$store.getters["CategoryModule/getSuccessMessage"];
    },
  },
  methods: {
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      if (dismissCountDown === 0) {
        this.$store.commit("CategoryModule/CREATION_SUCCESSFUL");
      }
    },
    showSuccessAlert() {
      this.dismissCountDown = this.dismissSecs;
    }
  }
}
</script>

<style scoped>

</style>