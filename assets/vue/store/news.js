import newsApi from "../api/news_api";
import { getField, updateField } from 'vuex-map-fields';
import News_api from "../api/news_api";

export default {
    namespaced:true,
    state:{
        isLoading: false,
        isError: false,
        error:null,
        newses:[],
        news:{},
        getters:{
            getNewsField(state){
              return getField(state.news)
            },
            getNewses(state){
                return state.newses;
            },
            getNews(state){
                return state.news;
            },
            getIsLoading(state){
                return state.isLoading;
            },
            getError(state){
                return state.error;
            },
            getIsError(state){
                return state.isError;
            }
        },
        mutations:{
            updateNewsField(state, field) {
                updateField(state.news, field);
            },
            creatingNews(state){
                state.news = {};
                state.error = null;
                state.isLoading = false;
                state.isError = false;
            },
            creatingNewsSuccess(state,data){
                if(data !== null){
                    state.news = data;
                }
                state.error = null;
                state.isLoading = false;
                state.isError = false;
               if(state.newses.hasOwnProperty('hydra:member')){
                   state.newses['hydra:member'].unshift(state.news);
               }
            },
            fetchingNewses(state){
                if(state.newses.length === 0){
                    state.isLoading = true;
                }
                state.error = null;
                state.isError = false;
            },
            fetchingNewsesSuccess(state,newses){
                state.error = null;
                state.isLoading = false;
                state.isError = false;
                state.newses = newses;
            },
            deletingNews(state,newsId){
                let counter = 0;
                state.newses['hydra:member'].forEach(function (e) {
                    if(e.id===newsId){
                        state.newses['hydra:member'].splice(counter,1);
                    }
                    counter++;
                });
            },
            setNewsError(state,error){
                state.error = error;
                state.isError = true;
                state.isLoading = false;
            }
        },
        actions:{
            async createNews({commit},news){
                try {
                    commit.creatingNews();
                    const response = await newsApi.create(news);
                    if(response.data !== null){
                        commit.creatingNewsSuccess(response.data);
                        return response.data;
                    }
                }catch (error) {
                    commit.setNewsError(error);
                    return error;
                }
            }
        }
    }
}
