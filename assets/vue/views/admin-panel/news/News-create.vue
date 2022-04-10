<template>
  <div>
    <b-alert show dismissible variant="danger" v-if="isError">
      {{ error }}
    </b-alert>
    <b-container>
      <validation-observer ref="newNewses" v-slot="{ handleSubmit, invalid}">
        <b-form @submit.stop.prevent="handleSubmit(onSubmit)">
          <b-form-row>
            <b-col md="8">
              <title-input
                  v-model="title"
                  placeholder="Въведете заглавие с дължина от 3 до 50 символа"
              />
              <content-input
                  v-model="content"
                  placeholder="Въведете текст на новината..."
                  publication-type="новина"
              />
            </b-col>
            <b-col md="4">
              <category-select v-model="category"/>
              <tag-form/>
              <image-manager/>
            </b-col>
          </b-form-row>
          <b-form-row>
            <div>
              <b-button id="check-article-btn" variant="info">Прегледай</b-button>
              <b-button type="submit" variant="success" id="new-article-submit-btn">Публикувай</b-button>
            </div>
          </b-form-row>
        </b-form>
      </validation-observer>
    </b-container>
  </div>
</template>

<script>

import {createHelpers} from 'vuex-map-fields';
/*---------- import components -----------------*/
import TitleInput from "@vue/components/admin-panel-components/TitleInputComponent";
import ContentInput from "@vue/components/admin-panel-components/ContentInputComponent";
import TagForm from "@vue/components/admin-panel-components/TagFormSelect";
import CategorySelect from "@vue/components/admin-panel-components/CategorySelect";
import ImageManager from "@vue/components/admin-panel-components/ImageManager";

const {mapFields} = createHelpers({
  getterType: 'NewsModule/getNewsField',
  mutationType: 'NewsModule/updateNewsField',
});
const items = [
  {text: 'Новини', to: {name: 'admin_news_index'}},
  {text: 'Публикувай новина', to: {name: 'admin_news_create'}}
];

export default {
  name: "News-create",
  components: {
    TitleInput, CategorySelect, TagForm, ContentInput, ImageManager
  },
  created() {
    this.$store.commit("MainModule/ATTACH_BREADS", items);
  },
  destroyed() {
    this.$store.commit("MainModule/DETACH_BREADS",items);
  },
  computed:{
    error(){
      return this.$store.getters["NewsModule/getError"];
    },
    isError(){
      return this.$store.getters["NewsModule/getIsError"];
    },
    ...mapFields([
      'title',
      'content',
      'category',
    ]),
  }
}
</script>

<style scoped>

</style>