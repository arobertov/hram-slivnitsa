<template>
  <div v-if="news.isPublished !== undefined" class="container bg-white">
    <div>
      {{ news.id }}
    </div>
    <div>
      {{ news.title }}
    </div>
    <div v-if="news.images">
      <div v-for="image in news.images" class="inline-flex w-25">
        <b-img
            thumbnail fluid
            :src="require(`@images/${image.filePath}`).default"
            :alt="image.filePath">
        </b-img>
      </div>

    </div>
    <div>
      <p>Съдържание :</p>
      <span v-html="news.content"></span>
    </div>
    <div>
      <span>Автор : <span v-if="news.owner">{{ news.owner.alias }}</span></span>

    </div>
    <div>
      {{ news.dateCreated | formatDate }}
    </div>
    <div>
      {{ news.dateEdited | formatDate }}
    </div>
    <div v-if="news.category">
      <div>Категория: {{ news.category.name }}</div>

    </div>
    <div v-for="tag in news.tags">
      <span>{{ tag.name }}</span>
    </div>
    <div>
      <span v-if="news.isPublished">Публикувана</span>
      <div v-else>
        <span>Непубикувана</span>
        <span><b-button variant="success" @click="setIsPublished">Публикувай !</b-button></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsPreview",
  props:{
    news:{
      type: Object
    }
  },
  methods: {
    async setIsPublished() {
      this.news.isPublished = true
      const result = null//await this.$store.dispatch("ArticleModule/editArticle", this.article);
      if (result !== null) {
        await this.$router.push({name: "admin_article_show", params: {"id": result.id}});
      }
    }
  }
}
</script>

<style scoped>

</style>