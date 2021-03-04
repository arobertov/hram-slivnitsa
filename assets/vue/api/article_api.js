import axios from "axios";

export default {

    mapFields(articleFormData){
        return{
            title:articleFormData.title,
            content:articleFormData.content,
            isPublished:articleFormData.isPublished,
            tags:articleFormData.tags,
            category:articleFormData.category
        }
    },
    create(articleFormData) {
        return axios.post("/api/articles", {
            title:articleFormData.title,
            content:articleFormData.content,
            isPublished:articleFormData.isPublished,
            tags:articleFormData.tags,
            category:articleFormData.category
        });
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