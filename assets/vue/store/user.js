import { getField, updateField } from 'vuex-map-fields';
import user_api from "../api/user_api";

const
    USER_LOGIN = "USER_LOGIN",
    FETCHING_FORM_ERROR = "FETCHING_FORM_ERROR",
    UPDATE_MESSAGE = "UPDATE_MESSAGE",
    REGISTER_SUCCESS = "REGISTER_SUCCESS";

export default {
    namespaced: true,
    state: {
        user:{
            id:'',
            username:'',
            password:'',
            email:'',
            alias:'',
            remember_me: undefined,
            confirmation:''
        },
        isLogin:false,
        isError:false,
        error:null,
    },
    getters:{
        getUser(state){
            return state.user;
        },
        getIsLogin(state){
            return state.isLogin;
        },
        getIsError(state){
            return state.isError;
        },
        getError(state){
            return state.error;
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
        },
        [FETCHING_FORM_ERROR](state,errorData){
            state.isError = true;
            state.isLogin = false;
            state.error = errorData;
        },
        [REGISTER_SUCCESS](state){
            state.user = {};
            state.isError = false;
            state.error = null;
        }
    },
    actions:{
        async sendLoginForm({ commit }, loginFormData) {
            try {
                const loginResponse = await user_api.signIn(loginFormData);
                return loginResponse.headers.location;
            } catch (error) {
                let errorData = error.response.data;
                commit(FETCHING_FORM_ERROR,errorData);
            }
        },
        async sendRegisterForm({commit}, registerFormData){
            try{
                const registerResponse = await user_api.registerUser(registerFormData);
                commit(REGISTER_SUCCESS);
                return registerResponse.headers.location;
            } catch (error) {
                commit(FETCHING_FORM_ERROR,error);
            }
        },
        async getUser({commit},response){
            try{
                const user = await user_api.findUser(response);
                commit(USER_LOGIN,user.data)
            } catch (error){
               console.log(error);
            }
        }
    }
}