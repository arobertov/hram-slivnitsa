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
            iri:''
        }
    },
    getters:{
        getTags(state){
            return state.tags;
        },
        getTag(state){
            return state.tag;
        }
    },
    mutations:{
        updateTags(state,tags){
            state.tags = tags;
        },
        updateTag(state,tag){
            state.tag = tag;
        }
    },
    actions:{
        async createTag({commit},tagName){
            try {
                let response = await TagApi.create(tagName);
                const tag = response.data;
                commit('updateTag',tag);
                return tag;
            }catch (e) {
                return e;
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