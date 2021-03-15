<template>
<div class="row">
  <div class="col-sm-9 m-0">
    <div class="alerts">
      <b-alert class="small"
               v-if="isSuccess"
               :show="dismissCountDown"
               variant="success"
               dismissible
               @dismiss-count-down="countDownChanged"
               fade
      >
        {{successMessage}}
      </b-alert>
    </div>
    <b-form-group
        label="Категория на статията"
        label-for="article_category"
    ><b-form-select
          id="article_category"
          v-bind:value="value"
          v-bind:selected="true"
          v-on:input="$emit('input', $event)"
          :options="categories"
      >
        <template #first>
          <b-form-select-option
              value=""
              v-if="categories.length===0"
              disabled
          >
            - Няма създадени категории - Създайте от бутона  --->
          </b-form-select-option>
          <b-form-select-option
              value=""
              v-else-if="categories.length>0"
              disabled
          >
            -- Изберете категория --
          </b-form-select-option>
        </template>
      </b-form-select>
    </b-form-group>
  </div>
  <div class="col-sm-3 m-0">
    <category-input-modal />
  </div>
</div>
</template>

<script>
import CategoryInputModal from "./CategoryInputModal";
export default {
  name: "CategorySelect",
  data(){
    return{
      categoryName:'',
      dismissCountDown: 0,
      dismissSecs:5
    }
  },
  components:{
    CategoryInputModal
  },
  props:['value'],
  computed:{
    categories() {
      return this.$store.getters["CategoryModule/getCategories"];
    },
    getCategory(){
      return undefined;
    },
    isSuccess(){
      const success = this.$store.getters["CategoryModule/getIsSuccess"];
      if (success) this.showSuccessAlert();
      return success ;
    },
    successMessage(){
      return this.$store.getters["CategoryModule/getSuccessMessage"];
    },
  },
  created() {
    let result = this.$store.dispatch("CategoryModule/findAllCategories");
    result.then(function (e) {
      if(e.length>0&&this.getCategory()!==undefined){
        this.$store.commit("ArticleModule/CREATING_ARTICLE", e[0].hasOwnProperty('@id') ? e[0]['@id'] : undefined);
      }
    })
  },
  methods:{
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      if(dismissCountDown===0){
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