import CategoryApi from "../api/category_api";

export default {
    namespaced: true,
    state: {
        category: {},
        categories:null
    },
    getters: {
        getCategoryId(state) {
            return state.id;
        },
        getCategoryName(state) {
            return state.name;
        },
        getCategories(state){
            let options = [];
            if(Array.isArray(state.categories)){
                state.categories.forEach(cat=>{
                    options.push({text:cat.name,value:cat['@id']});
                })
            }
            return options;
            //return state.categories;
        }
    },
    mutations: {
        updateCategory(state, category) {
            state.category.id = category;
        },
        updateCategories(state,categories){
            state.categories = categories;
        }
    },
    actions:{
        async createCategory({commit},categoryFormData){
            try{
             let response = await CategoryApi.createCategory(categoryFormData);
             commit('updateCategory',categoryFormData);
             return response.data;
            } catch (e) {
                return e;
            }
        },
        async findAllCategories({commit}){
            try{
                let response = await CategoryApi.findAllCategories();
                commit('updateCategories', response.data['hydra:member']);
                return response.data['hydra:member'];
            } catch (e) {
                return e;
            }
        }

    }
}
