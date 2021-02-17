<template>

</template>

<script>
    export default {
        name: "ArticleForm",
        props: {
            title:{
                type:String
            },
            contents:String ,
            tags:{
                type:Array
            },
            category:Number,
            isPublished:Boolean
        },
        methods: {
            async createArticle(event) {
                if (event) {
                    event.preventDefault()
                }
                console.log(this.$store.state.ArticleModule.article);
                const result = await this.$store.dispatch("articleMod/create", this.$store.state.ArticleModule.article);
                if (result !== null) {
                    this.$data.form_data = "";
                }
            }
        }
    }
</script>

<style scoped>

</style>