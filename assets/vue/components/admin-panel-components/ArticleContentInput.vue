<template>
  <validation-provider
      name="Текст на статия"
      :rules="{ required: true, min: 3 }"
      v-slot="validationContext"
  >
    <b-form-group
        label="Текст на статия:"
        label-for="article_content"
    >
      <vue-editor
          id="article_content"
          name="article-content"
          :editorOptions="editorSettings"
          v-bind:value="value"
          v-on:input="$emit('input', $event)"
          :state="getValidationState(validationContext)"
          class="bg-white"
          placeholder="Въведете текст на статия..."
          aria-describedby="content-live-feedback"
      >
      </vue-editor>
      <b-form-invalid-feedback id="content-live-feedback">{{ validationContext.errors[0] }}</b-form-invalid-feedback>
    </b-form-group>
  </validation-provider>
</template>

<script>
import {VueEditor, Quill} from "vue2-editor";
import {ImageDrop} from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";

Quill.register('modules/imageDrop', ImageDrop);
Quill.register('modules/imageResize', ImageResize);
export default {
  name: "ArticleContentInput",
  data() {
    return {
      editorSettings: {
        modules: {
          imageDrop: true,
          imageResize: {}
        }
      }
    }
  },
  props: ["value"],
  components: {
    VueEditor
  },
  methods:{
    getValidationState({ dirty, validated, valid = null }) {
      return dirty || validated ? valid : null;
    },
  }
}
</script>

<style scoped>

</style>