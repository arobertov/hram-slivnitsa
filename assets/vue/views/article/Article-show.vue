<template>
    <div class="main-content">
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2 caption-text">Статий >> </h1>
        </div>
        <div v-if="isLoading" class="row col">
            <p>Зареждане...</p>
        </div>

        <div v-else-if="hasError" class="alert alert-danger" role="alert">
            {{ error }}
        </div>
        <div v-else-if="responseData" id="response-data-field" class="alert alert-success">
            {{responseData}}
        </div>
        <div>
            <ArticlePreview v-bind:article="article"/>
        </div>

    </div>


</template>

<script>
    import ArticlePreview from "../../components/admin-panel-components/ArticlePreview";
    export default {
        name: "Article-show",
        components:{
            ArticlePreview
        },
        computed:{
            article(){
                return this.$store.getters['ArticleModule/article'];
            },
            isLoading(){
                return this.$store.getters['ArticleModule/isLoading'];
            },
            hasError(){
                return this.$store.getters['ArticleModule/hasError'];
            },
            error(){
                return this.$store.getters['ArticleModule/error'];
            },
            responseData(){
                return this.$store.getters['ArticleModule/responseData'];
            }
        },
        created() {
            this.$store.dispatch('ArticleModule/findArticle',this.$route.params.id);
        }

    }
</script>

<style scoped>

</style>