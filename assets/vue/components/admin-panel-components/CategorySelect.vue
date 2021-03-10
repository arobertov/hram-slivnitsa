<template>
  <b-form-group
      label="Категория на статията"
      label-for="article_category"
      class="col-sm-6"
  >
    <b-form-select
        id="article_category"
        v-bind:value="value"
        v-on:input="$emit('input', $event)"
        :options="categories"
    >
    </b-form-select>
  </b-form-group>
</template>

<script>
export default {
  name: "CategorySelect",
  props:['value'],
  computed:{
    categories() {
      return this.$store.getters["CategoryModule/getCategories"];
    },
  }
}
</script>

<style scoped>

</style>