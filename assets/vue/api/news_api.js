import axios from "axios";

export default {
    create(formData) {
        return axios.post("/api/news",{
            title:formData.title,
            content:formData.content,
            isPublished:formData.isPublished,
            tags:formData.tags,
            category:formData.category,
            images:formData.images.map(image=>image["@id"])
        });
    },
    edit(formData){
        return axios.put("/api/news/"+formData.id, {
            title:formData.title,
            content:formData.content,
            isPublished:formData.isPublished,
            tags:formData.tags,
            category:formData.category,
            images:formData.images.map(image=>image["@id"])
        })
    },
    show(itemId){
        return axios.get("/api/news/"+itemId)
    },
    delete(itemId){
        return axios.delete("/api/news/"+itemId);
    },
    findAll() {
        return axios.get("/api/news?order%5BdateEdited%5D=desc");
    }
};