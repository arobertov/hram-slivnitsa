<template>
  <validation-provider
      name="Заглавие"
      :rules="{ required: true, min: 3 , max: 50 }"
      v-slot="validationContext"
  >
    <b-form-group
        label="Заглавие"
        label-for="_title"
    >
      <b-form-input
          id="_title"
          name="title"
          type="text"
          :placeholder=placeholder
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
  name: "TitleInput",
  props: ["value","placeholder"],
  methods:{
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  }
}
</script>

<style scoped>

</style>