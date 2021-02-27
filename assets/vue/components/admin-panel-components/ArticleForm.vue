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
    }
</script>

<style scoped>

</style>