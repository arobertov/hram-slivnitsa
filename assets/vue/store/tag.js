import TagApi from '../api/tag_api';
const HYDRA_MEMBER = "hydra:member";
export default {
    namespaced: true,
    state: {
        tags :[]
    },
    getters:{
        getTags(state){
            return state.tags;
        }
    },
    mutations:{
        updateTags(state,tags){
            state.tags = tags;
        }
    },
    actions:{
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