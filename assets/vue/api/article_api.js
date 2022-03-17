import axios from "axios";

export default {
    create(articleFormData) {
        console.log(articleFormData)
        return axios.post("/api/articles",{
            title:articleFormData.title,
            content:articleFormData.content,
            isPublished:articleFormData.isPublished,
            tags:articleFormData.tags,
            category:articleFormData.category,
            images:articleFormData.images
        });
    },
    edit(articleFormData){
        return axios.put("/api/articles/"+articleFormData.id, {
            title:articleFormData.title,
            content:articleFormData.content,
            isPublished:articleFormData.isPublished,
            tags:articleFormData.tags,
            category:articleFormData.category,
            images:[articleFormData.images]
        })
    },
    show(articleId){
        return axios.get("/api/articles/"+articleId)
    },
    delete(articleId){
        return axios.delete("/api/articles/"+articleId);
    },
    findAll() {
        return axios.get("/api/articles?order%5BdateEdited%5D=desc");
    }
};