<template>
<div class="row">
  <div class="col-sm-9 m-0">
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
      categoryName:''
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
    }
  },
  created() {
    let result = this.$store.dispatch("CategoryModule/findAllCategories");
    result.then(function (e) {
      if(e.length>0&&this.getCategory()!==undefined){
        this.$store.commit("ArticleModule/CREATING_ARTICLE", e[0].hasOwnProperty('@id') ? e[0]['@id'] : undefined);
      }
    })
  }
}
</script>

<style scoped>

</style>