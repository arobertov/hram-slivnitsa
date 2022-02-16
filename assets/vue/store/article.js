import ArticleAPI from "../api/article_api";
import { getField, updateField } from 'vuex-map-fields';
function mapTags(article){
    let mappedTags = [];
    article.tags.forEach(t=>{
        try{
            mappedTags.push(JSON.parse(t)['@id']);
        }catch (e){
            console.log(e)
            mappedTags.push(t['@id'])
        }
    })
    return {
        category: article.category,
        content: article.content,
        dateCreated: article.dateCreated,
        dateEdited: article.dateEdited,
        id: article.id,
        tags: mappedTags,
        isPublished: article.isPublished,
        title: article.title,
    }
}
const
    CREATING_ARTICLE = "CREATING_ARTICLE",
    CREATING_ARTICLE_SUCCESS = "CREATING_ARTICLE_SUCCESS",
    CREATING_ARTICLE_ERROR = "CREATING_ARTICLE_ERROR",
    EDITING_ARTICLE = "EDITING_ARTICLE",
    EDITING_ARTICLE_SUCCESS="EDITING_ARTICLE_SUCCESS",
    DELETING_ARTICLE = "DELETING_ARTICLE",
    FETCHING_ARTICLES = "FETCHING_ARTICLES",
    FETCHING_ARTICLE = "FETCHING_ARTICLE",
    FETCHING_ARTICLE_SUCCESS = "FETCHING_ARTICLE_SUCCESS",
    FETCHING_ARTICLES_SUCCESS = "FETCHING_ARTICLES_SUCCESS",
    FETCHING_ARTICLES_ERROR = "FETCHING_ARTICLES_ERROR",
    FETCHING_ARTICLE_ERROR = "FETCHING_ARTICLE_ERROR",
    FETCHING_FORM_ERRORS = "FETCHING_FORM_ERRORS";

export default {
    namespaced: true,
    state: {
        isLoading: false,
        error: null,
        formErrors:{
            title: '' ,
            contents: ''
        },
        articles: [],
        article:{
            id: undefined ,
            title: '',
            content: '',
            tags: [],
            category: '',
            isPublished:true,
        },
        responseData:'',
    },
    getters: {
        getArticleField(state){
            return getField(state.article)
        },
        isLoading(state) {
            return state.isLoading;
        },
        hasError(state) {
            return state.error !== null;
        },
        formErrors(state){
            return state.formErrors;
        },
        error(state) {
            return state.error;
        },
        hasArticles(state) {
            return true; //state.articles.length > 0;
        },
        articles(state) {
            return state.articles;
        },
        getArticle(state){
            return state.article;
        },
        getTagsArticle(state){
            return state.article.tags
        }
    },
    mutations: {
        updateArticleField(state, field) {
            updateField(state.article, field);
        },
        attachTagsForArticle(state,tags){
            state.article.tags = tags;
        },
        [CREATING_ARTICLE](state){
            state.article = {
                id: undefined ,
                title: '',
                content: '',
                tags: [],
                category: '',
                isPublished:true,
            };
            state.isLoading = false;
            state.error = null;
        },
        [CREATING_ARTICLE_SUCCESS](state, data) {
            state.isLoading = false;
            state.error = null;
            state.responseData = data;
            if(data !== null) state.article = data;
            state.articles['hydra:member'].unshift(state.article);
        },
        [CREATING_ARTICLE_ERROR](state, error) {
            state.isLoading = false;
            state.formErrors.title = '';
            state.formErrors.contents = '';
            state.error = error;
        },
        [EDITING_ARTICLE](state,tags){
           state.isLoading = false;
           state.formErrors = {};
           state.error = null;
           state.article.tags = tags;

        },
        [EDITING_ARTICLE_SUCCESS](state,article){
            let counter = 0;
            state.articles['hydra:member'].forEach(function (e) {
                if(e.id === article.id){
                    state.articles['hydra:member'].splice(counter,1,article);
                }
                counter++;
            })
        },
        [DELETING_ARTICLE](state,articleId){
            let counter = 0;
            state.articles['hydra:member'].forEach(function (e) {
                if(e.id===articleId){
                    state.articles['hydra:member'].splice(counter,1);
                }
                counter++;
            });
        },
        [FETCHING_ARTICLES](state) {
            if(state.articles.length===0){
                state.isLoading = true;
            }
            state.error = null;
        },
        [FETCHING_ARTICLES_SUCCESS](state, articles) {
            state.isLoading = false;
            state.error = null;
            state.articles = articles;
        },
        [FETCHING_ARTICLE](state) {
            state.isLoading = true;
            state.error = null;
            state.article = {};
            state.article.tags = [];
        },
        [FETCHING_ARTICLE_SUCCESS](state, article) {
            state.isLoading = false;
            state.error = null;
            state.article = article;

        },
        [FETCHING_ARTICLE_ERROR](state,error){
            state.isLoading = false;
            state.error = error;
            state.article = {};
        },
        [FETCHING_ARTICLES_ERROR](state, error) {
            state.isLoading = false;
            state.error = error;
        },
        [FETCHING_FORM_ERRORS](state,error){
            state.error = null;
            state.formErrors = error;
        }
    },

    actions: {
        async create({ commit }, article) {
            try {
                let response = await ArticleAPI.create(mapTags(article));
                commit(CREATING_ARTICLE_SUCCESS, response.data);
                return response.data;
            } catch (error) {
                commit(CREATING_ARTICLE_ERROR,error);
                /*
                let errorData = error.response.data;
                if(errorData.hasOwnProperty('title') || errorData.hasOwnProperty('contents')){
                    commit(FETCHING_FORM_ERRORS,errorData);
                } else {
                    commit(CREATING_ARTICLE_ERROR,error);
                }
                 */
                return null;
            }
        },
        async editArticle({commit}, article){
            try {
                let mp = mapTags(article)
                console.log(mp)

                let response = await ArticleAPI.edit(mp);
                commit(EDITING_ARTICLE_SUCCESS,response.data)
                return response.data;
            } catch (error) {
                commit(FETCHING_ARTICLES_ERROR,error);
                return null;
            }
        },
        /*
        *** load article for editing process
         */
        async loadEditingArticle({commit},articleId){
            commit(FETCHING_ARTICLE);
            try{
                let response = await ArticleAPI.show(articleId);
                commit(FETCHING_ARTICLE_SUCCESS,response.data);
                //--- fetching only category IRI ------ //
                response.data.category = response.data.category['@id'];
                return response.data;
            }catch (error) {
                commit(FETCHING_ARTICLE_ERROR,error);
                return null;
            }
        },
        async loadReadingArticle({commit}, articleId){
            commit(FETCHING_ARTICLE);
            try{
                let response = await ArticleAPI.show(articleId);
                commit(FETCHING_ARTICLE_SUCCESS,response.data)
                return response.data;
            }catch (error) {
                commit(FETCHING_ARTICLE_ERROR,error);
                return null;
            }
        },
        async findAll({ commit }) {
            commit(FETCHING_ARTICLES);
            try {
                let response = await ArticleAPI.findAll();
                commit(FETCHING_ARTICLES_SUCCESS, response.data);
                return response.data;
            } catch (error) {
                commit(FETCHING_ARTICLES_ERROR, error);
                return null;
            }
        },
        async deleteArticle({commit},articleId){
            try{
                console.log('ArticleId = '+articleId)
                commit(DELETING_ARTICLE,articleId);
                let response = await ArticleAPI.delete(articleId);
                return response.data;
            } catch (error) {
                commit(FETCHING_ARTICLES_ERROR, error);
                return null;
            }
        }
    }
};

