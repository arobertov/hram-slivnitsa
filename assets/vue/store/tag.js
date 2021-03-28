import TagApi from '../api/tag_api';
import * as mutation from "./mutation-type";
const HYDRA_MEMBER = "hydra:member";
export default {
    namespaced: true,
    state: {
        tags :[],
        tag:{
            id:'',
            name:'',
            description:'',
            iri:'',
            show: true
        },
        isLoading:false,
        isError: false,
        isSuccess:false,
        successMessage:'',
        error: ''
    },
    getters:{
        getTags(state){
            return state.tags;
        },
        getTag(state){
            return state.tag;
        },
        getIsLoading(state){
            return state.isLoading;
        },
        getIsSuccess(state){
            return state.isSuccess;
        },
        getSuccessMessage(state){
            return state.successMessage;
        },
        getIsError(state) {
            return state.isError;
        },
        getError(state) {
            return state.error;
        }
    },
    mutations:{
        [mutation.FETCHING_ITEMS](state){
            if(state.tags.length === 0){
                state.isLoading = true;
            }
            state.isError = false;
            state.isSuccess = false;
        },
        [mutation.FETCHING_ITEMS_SUCCESS](state,tags){
            tags.forEach(t=>t.show=true);
            state.tags = tags;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
        [mutation.UPDATING_ITEMS](state,tags){
            tags.forEach(t=>t.show=true);
            state.tags = tags;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
        },
        createTag(state,tag){
            state.tag = tag;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.successMessage = 'Успешно създадохте етикет '+state.tag.name+' !';
        },
        updateTag(state,tag){
            state.tag = tag;
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.successMessage = 'Успешно редактирахте етикет '+state.tag.name+' !';
        },
        deleteTag(state,tag){
            state.isSuccess = true;
            state.isLoading = false;
            state.successMessage = 'Успешно изтрихте етикет '+tag.name+' !';
        },
        setError(state,error){
            state.isLoading = false;
            state.isSuccess = false;
            state.successMessage = '';
            state.isError = true;
            state.error = error;
        }
    },
    actions:{
        async createTag({commit},tagName){
            try {
                let response = await TagApi.create(tagName);
                const tag = response.data;
                commit('createTag',tag);
                return tag;
            }catch (e) {
                let error = e.response.data;
                if(error.hasOwnProperty('violations')){
                    error = error.violations[0]['message'];
                }
                commit('setError',error);
                return null
            }
        },
        async deleteTag({commit},tag){
            try {
                let response = await  TagApi.delete(tag["@id"]);
                commit('deleteTag',tag);
                return response;
            }catch(e){
                console.log(e);
                let error = e.response.data;
                if(error.hasOwnProperty('violations')){
                    error = error.violations[0]['message'];
                }
                commit('setError',error);
                return null
            }
        },
        async findAllTags({commit}){
            commit(mutation.FETCHING_ITEMS);
            try{
                let response = await TagApi.findAll();
                commit(mutation.FETCHING_ITEMS_SUCCESS,response.data[HYDRA_MEMBER]);
                return response.data[HYDRA_MEMBER];
            }catch (e) {
                return e;
            }
        }
    }
}