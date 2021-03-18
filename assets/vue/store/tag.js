import TagApi from '../api/tag_api';
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
        updateTags(state,tags){
            tags.forEach(t=>t.show=true);
            state.tags = tags;
            state.isError = false;
        },
        createTag(state,tag){
            state.tag = tag;
            state.isError = false;
            state.isSuccess = true;
            state.successMessage = 'Успешно създадохте етикет '+state.tag.name+' !';
        },
        updateTag(state,tag){
            state.tag = tag;
            state.isError = false;
            state.isSuccess = true;
            state.successMessage = 'Успешно редактирахте етикет '+state.tag.name+' !';
        },
        setError(state,error){
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
        async findAllTags({commit}){
            try{
                let response = await TagApi.findAll();
                commit('updateTags',response.data[HYDRA_MEMBER]);
                return response.data[HYDRA_MEMBER];
            }catch (e) {
                return e;
            }
        }
    }
}