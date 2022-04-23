import ArticleAPI from "@vue/api/article_api";
import {getField, updateField} from 'vuex-map-fields';
import tagMapping from "@vue/helpers/tag-mapping";

export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        formErrors: {
            title: '',
            contents: ''
        },
        articles: [],
        article: {
            id: undefined,
            title: '',
            content: '',
            tags: [],
            images: [],
            category: '',
            isPublished: true,
        },
        responseData: '',
    },
    getters: {
        getField(state){
            return getField(state.article)
        }
        ,
        isLoading(state) {
            return state.isLoading;
        },
        hasError(state) {
            return state.error !== null;
        },
        getError(state) {
            return state.error;
        },
        hasItems(state) {
            if(typeof state.articles !== 'object'){
                throw 'This value is not object';
            }
            if (!state.articles.hasOwnProperty('hydra:member')){
               return false;
            }
            return state.articles['hydra:member'].length > 0
        },
        getItems(state) {
            return state.articles;
        },
        getItem(state){
           return  state.article;
        },
        getTags(state) {
            return state.article.tags;
        },
        getImages(state) {
            return state.article.images;
        },
    },
    mutations: {
        updateField(state, field) {
            updateField(state.article, field);
        },
        attachTags(state, tags) {
            state.article.tags = tags;
        },
        attachImages(state, images) {
            state.article.images = images;
        },
        detachImages(state, images) {

        },
        creatingItem(state) {
            state.article = {
                id: undefined,
                title: '',
                content: '',
                tags: [],
                images: [],
                category: '',
                isPublished: true,
                owner: ''
            };
            state.isLoading = false;
            state.error = null;
        },
        creatingItemSuccess(state, data) {
            state.isLoading = false;
            state.error = null;
            state.responseData = data;
            if (data !== null){
                state.article = data;
                state.articles['hydra:member'].unshift(state.article);
            }
        },
        fetchingItem(state) {
            state.isLoading = true;
            state.error = null;
            state.article = {};
            state.article.tags = [];
        },
        fetchingItemSuccess(state, article) {
            state.isLoading = false;
            state.error = null;
            state.article = article;

        },
        editingItem(state, tags) {console.log(state.article)
            state.isLoading = false;
            state.error = null;
            state.article.tags = tags;

        },
        editingItemSuccess(state, article) {
            state.isLoading = false;
            state.error = null;
            if (state.articles.hasOwnProperty('hydra:member')) {
                state.articles[
                    state.articles['hydra:member'].findIndex(el => el.id === article.id)
                    ] = article;
            }
        },
        deleteItem(state, articleId) {
            state.isLoading = false;
            state.error = null;
            if (state.articles.hasOwnProperty('hydra:member')) {
                state.articles['hydra:member'].splice(
                    state.articles['hydra:member'].findIndex(el => el.id === articleId)
                    , 1
                );
            }
        },
        fetchingItems(state) {
            if (!state.articles.hasOwnProperty('hydra:member')) {
                state.isLoading = true;
            }
            state.error = null;
        },
        fetchingItemsSuccess(state, articles) {
            state.isLoading = false;
            state.error = null;
            state.articles = articles;
        },
        setError(state, error) {
            state.isLoading = false;
            state.formErrors.title = '';
            state.formErrors.contents = '';
            state.error = error;
        },
    },

    actions: {
        async create({commit}, article) {
            try {
                let response = await ArticleAPI.create(tagMapping(article));
                commit('creatingItemSuccess', response.data);
                return response.data;
            } catch (error) {
                commit('setError', error);
                return error;
            }
        },
        async editArticle({commit}, article) {
            try {
                let response = await ArticleAPI.edit(tagMapping(article));
                commit('editingItemSuccess', response.data)
                return response.data;
            } catch (error) {
                commit('setError', error);
                return error;
            }
        },
        async loadArticle({commit}, articleId) {
            commit('fetchingItem');
            try {
                let response = await ArticleAPI.show(articleId);
                commit('fetchingItemSuccess', response.data)
                return response.data;
            } catch (error) {
                commit('setError', error);
                return error;
            }
        },
        async findAll({commit}) {
            try {
                commit('fetchingItems');
                let response = await ArticleAPI.findAll();
                commit('fetchingItemsSuccess', response.data);
                return response.data;
            } catch (error) {
                commit('setError', error);
                return error;
            }
        },
        async deleteItem({commit}, articleId) {
            try {
                commit('deletingItem', articleId);
                let response = await ArticleAPI.delete(articleId);
                return response.data;
            } catch (error) {
                commit('setError', error);
                return error;
            }
        }
    }
};

