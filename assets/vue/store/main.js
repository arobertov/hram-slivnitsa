const FETCHING_BREADS = 'FETCHING_BREADS',
      REMOVE_BREADS = 'REMOVE_BREADS',
      ATTACH_BREADS = 'ATTACH_BREADS',
      DETACH_BREADS = 'DETACH_BREADS';
export default {
    namespaced:true,
    state:{
        items:[]
    },
    getters:{
        getItems(state){
            return state.items;
        }
    },
    mutations:{
        [FETCHING_BREADS](state,items){
            state.items = items;
        },
        [ATTACH_BREADS](state,items){
            state.items = state.items.concat(items);
        },
        [DETACH_BREADS](state,items){
            state.items = state.items.filter(x => !items.includes(x));
        },
        [REMOVE_BREADS](state){
            state.items = [];
        }
    },
    actions:{
         fetchingBreads:function({commit},items){
            try{
                commit(FETCHING_BREADS,items);
            }catch (e){
               return e.data
            }
        }

    }
}