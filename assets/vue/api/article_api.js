import axios from "axios";

export default {

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
            form_data: articleFormData
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