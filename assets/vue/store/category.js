import CategoryApi from "../api/category_api";
import * as mutation from "./mutation-type";

export default {
    namespaced: true,
    state: {
        category:null,
        categories:null,
        isError:false,
        isSuccess:false,
        successMessage:'',
        error:'',
    },
    getters: {
        getCategory(state){
            return state.category;
        },
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
        },
        getIsSuccess(state){
            return state.isSuccess;
        },
        getSuccessMessage(state){
            return state.successMessage;
        },
        getIsError(state){
            return state.isError;
        },
        getError(state){
            return state.error;
        }
    },
    mutations: {
        [mutation.CREATING](state,category){
            state.category = category;
            state.isError = false;
            state.isSuccess = true;
            state.successMessage = 'Категорията '+state.category.name+' е създадена !';
        },
        [mutation.CREATION_SUCCESSFUL](state){
            state.isError = false;
            state.isSuccess = false;
            state.successMessage = ''
        },
        [mutation.UPDATING](state, category) {
            state.category = category;
            state.isError = false;
            state.isSuccess = true;
            state.successMessage = 'Категорията '+state.category.name+' е редактирана успешно !';
        },
        [mutation.UPDATING_ITEMS](state,categories){
            state.categories = categories;
            state.isError = false;
            state.isSuccess = false;
            state.successMessage = ''
        },
       [mutation.SET_ERROR](state,error){
            state.isError = true;
            state.error = error;
        }
    },
    actions:{
        async createCategory({commit},categoryName){
            try{
             let response = await CategoryApi.createCategory(categoryName);
             commit(mutation.CREATING,response.data);
             return response.data;
            } catch (e) {
                let error = e.response.data;
                if(error.hasOwnProperty('violations')){
                    error = error.violations[0]['message'];
                }
                commit(mutation.SET_ERROR,error);
                return null;
            }
        },
        async findAllCategories({commit}){
            try{
                let response = await CategoryApi.findAllCategories();
                commit(mutation.UPDATING_ITEMS, response.data['hydra:member']);
                return response.data['hydra:member'];
            } catch (e) {
                return null;
            }
        }

    }
}
