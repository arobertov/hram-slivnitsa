import axios from 'axios';

export default {
    createCategory(categoryFormData) {
        return axios.post("/api/categories", {
            form_data: categoryFormData
        });
    },
    findAllCategories() {
        return axios.get("/api/categories");
    },
    editCategory(categoryId,categoryFormData){
        return axios.put("/api/categories/"+categoryId,{
            form_data: categoryFormData
        })
    },
    showCategory(categoryId){
        return axios.get("/api/categories/"+categoryId)
    },
    deleteCategory(categoryId){
        return axios.delete("/api/categories/"+categoryId);
    },
}
