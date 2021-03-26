import axios from "axios";

let fields = function mapArticleFields(articleFormData){
    return{
        title:articleFormData.title,
        content:articleFormData.content,
        isPublished:articleFormData.isPublished,
        tags:articleFormData.article_tags_iri,
        category:articleFormData.category
    }
}

export default {

    create(articleFormData) {
        return axios.post("/api/articles", fields(articleFormData));
    },
    edit(articleId,articleFormData){
        return axios.put("/api/articles/"+articleId,{
            title:articleFormData.title,
            content:articleFormData.content,
            isPublished:articleFormData.isPublished,
            tags:articleFormData.tags,
            category:articleFormData.category
        })
    },
    show(articleId){
        return axios.get("/api/articles/"+articleId)
    },
    delete(articleId){
        return axios.delete("/api/articles/"+articleId);
    },
    findAll() {
        return axios.get("/api/articles");
    }
};