<template>
  <b-card header="ЕТИКЕТИ" class="mb-2">
    <b-card-text>

      <b-nav vertical v-if="hasTags">
        <b-nav-item
            v-for="tag in tags"
            :key="tag.id"
        >
          {{tag.name}}
        </b-nav-item>
      </b-nav>
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: "TagsList",
  created() {
    this.$store.dispatch("TagModule/findAllTags");
  },
  computed:{
    tags(){
      return this.$store.getters["TagModule/getTags"];
    },
    hasTags(){
      return this.$store.getters["TagModule/hasTags"];
    }
  }
}
</script>

<style scoped>

</style>