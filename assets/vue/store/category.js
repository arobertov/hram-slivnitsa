import CategoryApi from "../api/category_api";

export default {
    namespaced: true,
    state: {
        category: {},
        categories:[]
    },
    getters: {
        getCategoryId(state) {
            return state.id;
        },
        getCategoryName(state) {
            return state.name;
        },
        getCategories(state){
            return state.categories;
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
                commit('updateCategories', response.data);
                return response.data;
            } catch (e) {
                return e;
            }
        }

    }
}
