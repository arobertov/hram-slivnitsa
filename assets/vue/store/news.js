
import {getField, updateField} from 'vuex-map-fields';
import tagMapping from "@vue/helpers/tag-mapping";
import newsApi from "@vue/api/news_api";
const handleError= function ({commit},error){
    commit('setNewsError', error);
    return error;
}
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
            owner:''
        },
    },
    getters: {
        getField(state) {
            return getField(state.news)
        },
        getItems(state) {
            return state.newses;
        },
        getItem(state) {
            return state.news;
        },
        hasItems(state) {
            return true; //state.articles.length > 0;
        },
        isLoading(state) {
            return state.isLoading;
        },
        error(state) {
            return state.error;
        },
        hasError(state) {
            return state.isError;
        },
        getTags(state){
            return state.news.tags;
        },
        getImages(state) {
            return state.news.images;
        },
    },
    mutations: {
        updateField(state, field) {
            updateField(state.news, field);
        },
        attachTags(state, tags) {
            state.news.tags = tags;
        },
        attachImages(state, images) {
            state.news.images = images;
        },
        setItem(state,input){
            state.news[input.field] = input.value;
        },
        creatingNews(state) {
            state.news = {
                id: undefined,
                title: '',
                content: '',
                tags: [],
                images: [],
                category: '',
                isPublished: true,
                owner: '',
            };
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
        async create({commit}, news) {
            try {
                const response = await newsApi.create(tagMapping(news));
                if (response.data !== null) {
                    commit('creatingNewsSuccess', response.data);
                    return response.data;
                }
            } catch (error) {
                //handleError({commit},error);
                commit('setNewsError', error);
                return error;
            }
        },
        async showNews ({commit}, newsId) {
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
        async findAll({commit}){
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
        async edit({commit},news){
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
        async deleteItem({commit},newsId){
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
