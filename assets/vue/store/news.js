
import {getField, updateField} from 'vuex-map-fields';
import tagMapping from "@vue/helpers/tag-mapping";
import newsApi from "@vue/api/news_api";

export default {
    namespaced: true,
    state: {
        isLoading: false,
        isError: false,
        error: null,
        newses: [],
        news: {
            id: undefined,
            title: '',
            content: '',
            tags: [],
            images: [],
            category: '',
            isPublished: true,
        },
    },
    getters: {
        getNewsField(state) {
            return getField(state.news)
        },
        getNewses(state) {
            return state.newses;
        },
        getNews(state) {
            return state.news;
        },
        getIsLoading(state) {
            return state.isLoading;
        },
        getError(state) {
            return state.error;
        },
        getIsError(state) {
            return state.isError;
        }
    },
    mutations: {
        updateNewsField(state, field) {
            updateField(state.news, field);
        },
        creatingNews(state) {
            state.news = {};
            state.error = null;
            state.isLoading = false;
            state.isError = false;
        },
        creatingNewsSuccess(state, data) {
            if (data !== null) {
                state.news = data;
            }
            state.error = null;
            state.isLoading = false;
            state.isError = false;
            if (state.newses.hasOwnProperty('hydra:member')) {
                state.newses['hydra:member'].unshift(state.news);
            }
        },
        fetchingNewses(state) {
            if (state.newses.length === 0) {
                state.isLoading = true;
            }
            state.error = null;
            state.isError = false;
        },
        fetchingNewsesSuccess(state, newses) {
            state.error = null;
            state.isLoading = false;
            state.isError = false;
            state.newses = newses;
        },
        fetchingNews(state) {
            if (state.newses.length === 0) {
                state.isLoading = true;
            }
            state.error = null;
            state.isError = false;
        },
        fetchingNewsSuccess(state, news) {
            state.error = null;
            state.isLoading = false;
            state.isError = false;
            state.news = news;
        },
        editingNews(state){
            state.error = null;
            state.isLoading = true;
            state.isError = false;
        },
        editingNewsSuccess(state,news){
            if(state.newses.hasOwnProperty('hydra:member')){
                state.newses[
                    state.newses['hydra:member'].findIndex(el => el.id === news.id)
                    ] = news;
            }
        },
        deletingNews(state, newsId) {
            state.isLoading = false;
            state.error = null;
            state.isError = false;
            if(state.newses.hasOwnProperty('hydra:member')) {
                state.newses['hydra:member'].splice(
                    state.newses['hydra:member'].findIndex(el => el.id === newsId)
                    , 1
                );
            }
        },
        setNewsError(state, error) {
            state.error = error;
            state.isError = true;
            state.isLoading = false;
        }
    },
    actions: {
        async createNews({commit}, news) {
            try {
                commit('creatingNews');
                const response = await newsApi.create(tagMapping(news));
                if (response.data !== null) {
                    commit('creatingNewsSuccess', response.data);
                    return response.data;
                }
            } catch (error) {
                commit('setNewsError', error);
                return error;
            }
        },
        showNews: async function ({commit}, newsId) {
            try {
                commit('fetchingNews');
                const response = await newsApi.show(newsId);
                if (response.data !== null) {
                    commit('fetchingNewsSuccess', response.data);
                    return response.data;
                }
            } catch (error) {
                commit('setNewsError', error);
                return error;
            }
        },
        async showAllNewses({commit}){
            try {
                commit('fetchingNewses');
                const response = await newsApi.findAll();
                if (response.data !== null){
                    commit('fetchingNewsesSuccess',response.data);
                    return response.data;
                }
            } catch (error) {
                commit('setNewsError', error);
                return error;
            }
        },
        async editNews({commit},news){
            try {
                commit('editingNews')
                const response = await newsApi.edit(tagMapping(news));
                if (response.data !== null){
                    commit('editingNewsSuccess',response.data);
                    return response.data;
                }
            }catch (error) {
                commit('setNewsError', error);
                return error;
            }
        },
        async deleteNews({commit},newsId){
            try {
                const response = await newsApi.delete(newsId);
                if (response.data !== null){
                    commit('deletingNews',newsId);
                    return response.data;
                }
            } catch (error) {
                commit('setNewsError', error);
                return error;
            }
        }
    }
}
