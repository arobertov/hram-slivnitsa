<template>
  <b-form-group
      label="Текст на статия:"
      label-for="article_content"
  >
    <vue-editor
        id="article_content"
        :editorOptions="editorSettings"
        v-bind:value="value"
        v-on:input="$emit('input', $event)"
        class="bg-white"
        placeholder="Въведете текст на статия..."
    >
    </vue-editor>
  </b-form-group>
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
  props:["value"],
  components:{
    VueEditor
  }
}
</script>

<style scoped>

</style>