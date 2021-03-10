<template>
  <b-form-group
      label="Заглавие на статия:"
      label-for="article_title"
      description="Заглавието трябва да бъде с дължина от 3 до 50 символа !"
      class="col-sm-6"
  >
    <b-form-input
        id="article_title"
        type="text"
        placeholder="Въведете заглавие на статия"
        v-bind:value="value"
        v-on:input="$emit('input', $event)"
        required
    ></b-form-input>
  </b-form-group>
</template>

<script>
export default {
  name: "ArticleTitleInput",
  props:["value"],
}
</script>

<style scoped>

</style>