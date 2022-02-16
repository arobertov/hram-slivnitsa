import axios from "axios";

export default {
    create(articleFormData) {
        return axios.post("/api/articles",{
            title:articleFormData.title,
            content:articleFormData.content,
            isPublished:articleFormData.isPublished,
            tags:articleFormData.tags,
            category:articleFormData.category
        });
    },
    edit(articleFormData){
        console.log(articleFormData.tags)
        return axios.put("/api/articles/"+articleFormData.id, {
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