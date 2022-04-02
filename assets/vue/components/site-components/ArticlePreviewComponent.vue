<template>
  <div v-if="article.isPublished !== undefined" class="container bg-white">
    <div>
      {{ article.id }}
    </div>
    <div>
      {{ article.title }}
    </div>
    <div v-if="article.images">
      <div v-for="image in article.images" class="inline-flex w-25">
        <b-img
            thumbnail fluid
            :src="require(`@images/${image.filePath}`).default"
            :alt="image.filePath">
        </b-img>
      </div>

    </div>
    <div>
      <p>Съдържание :</p>
      <span v-html="article.content"></span>
    </div>
    <div>
      <span>Автор : <span v-if="article.owner">{{ article.owner.alias }}</span></span>

    </div>
    <div>
      {{ article.dateCreated | formatDate }}
    </div>
    <div>
      {{ article.dateEdited | formatDate }}
    </div>
    <div v-if="article.category">
      <div>Категория: {{ article.category.name }}</div>

    </div>
    <div v-for="tag in article.tags">
      <span>{{ tag.name }}</span>
    </div>
    <div>
      <span v-if="article.isPublished">Публикувана</span>
      <div v-else>
        <span>Непубикувана</span>
        <span><b-button variant="success" @click="setIsPublished">Публикувай !</b-button></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticlePreviewComponent",
  props:{
    article:{
      type:Object
    }
  }
}
</script>

<style scoped>

</style>