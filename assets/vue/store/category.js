import CategoryApi from "../api/category_api";

export default {
    namespaced: true,
    state: {
        category: {},
        categories:null,
        isError:false,
        error:null
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
            state.category = category;
        },
        updateCategories(state,categories){
            state.categories = categories;
        },
        setError(state,error){
            state.isError = true;
            state.error = error;
        }
    },
    actions:{
        async createCategory({commit},categoryName){
            try{
             let response = await CategoryApi.createCategory(categoryName);
             commit('updateCategory',response.data);
             return response.data;
            } catch (e) {
                let error = e.response.data;
                if(error.hasOwnProperty('violations')){
                    error = error.violations[0]['message'];
                }
                commit('setError',error);
                return null;
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
