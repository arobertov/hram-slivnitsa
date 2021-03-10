<template>
<div class="row">
  <div class="col-md-8">
    <b-form-group
        v-if="categories"
        label="Категория на статията"
        label-for="article_category"
    >
      <b-form-select
          id="article_category"
          v-bind:value="value"
          v-on:input="$emit('input', $event)"
          :options="categories"
      >
      </b-form-select>
    </b-form-group>
  </div>
  <div class="col-md-4">
    <b-button>Създай категория<b-icon icon="plus-square"></b-icon></b-button>
  </div>
</div>

</template>

<script>
export default {
  name: "CategorySelect",
  props:['value'],
  computed:{
    categories() {
      //return null;
      return this.$store.getters["CategoryModule/getCategories"];
    },
  }
}
</script>

<style scoped>

</style>