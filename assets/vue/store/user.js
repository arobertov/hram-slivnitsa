import { getField, updateField } from 'vuex-map-fields';
import login from "../api/login_api";

const
    USER_LOGIN = "USER_LOGIN",
    FETCHING_LOGIN_SUCCESS = "FETCHING_LOGIN_SUCCESS",
    FETCHING_LOGIN_ERROR = "FETCHING_LOGIN_ERROR",
    UPDATE_MESSAGE = "UPDATE_MESSAGE";

export default {
    namespaced: true,
    state: {
        user:{
            id:'',
            username:'',
            password:'',
            email:'',
            alias:'',
        },
        isLogin:false,
        isError:false,
        isSubmitted:false,
        error:null,
        responseData:'',
    },
    getters:{
        getUser(state){
            return state.user;
        },
        getIsSubmitted(state){
            return state.isSubmitted;
        },
        getIsError(state){
            return state.isError;
        },
        getError(state){
            return state.error;
        },
        getResponseData(state){
            return state.responseData;
        },
        getLoginField(state){
            return  getField(state);
        },
    },
    mutations: {
        updateLoginField(state, field) {
            updateField(state.user, field);
        },
        [UPDATE_MESSAGE](state, payload) {
            state.message = payload;
        },
        [USER_LOGIN](state,responseData){
            state.user = responseData;
            state.isLogin = true;
            state.isError = false;
            state.responseData = responseData;
        },
        [FETCHING_LOGIN_ERROR](state,errorData){
            state.isError = true;
            state.isLogin = false;
            state.responseData = '';
            state.error = errorData;
        }
    },
    actions:{
        async sendLoginForm({ commit }, loginFormData) {
            try {
                let response = await login.signIn(loginFormData);
                commit(USER_LOGIN, response.data);
                return response.data;
            } catch (error) {
                let errorData = error.response.data;
                commit(FETCHING_LOGIN_ERROR,errorData);
            }
        }
    }
}