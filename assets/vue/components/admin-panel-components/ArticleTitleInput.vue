<template>
  <validation-provider
      name="Заглавие"
      :rules="{ required: true, min: 3 , max: 50 }"
      v-slot="validationContext"
  >
    <b-form-group
        label="Заглавие"
        label-for="article_title"
    >
      <b-form-input
          id="article_title"
          name="article_title"
          type="text"
          placeholder="Въведете заглавие на статия с дължина от 3 до 50 символа"
          v-bind:value="value"
          v-on:input="$emit('input', $event)"
          :state="getValidationState(validationContext)"
          aria-describedby="title-live-feedback"
      ></b-form-input>
      <b-form-invalid-feedback id="title-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script>


export default {
  name: "ArticleTitleInput",
  props: ["value"],
  methods:{
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  }
}
</script>

<style scoped>

</style>