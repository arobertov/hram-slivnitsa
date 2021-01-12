import { getField, updateField } from 'vuex-map-fields';
import login from "../api/login_api";

const
    USER_LOGIN = "USER_LOGIN",
    FETCHING_LOGIN_SUCCESS = "FETCHING_LOGIN_SUCCESS",
    FETCHING_LOGIN_ERROR = "FETCHING_LOGIN_ERROR";

export default {
    namespaced: true,
    state: {
        user:{
            id:'',
            username:'',
            email:'',
            alias:'',
        },
        isLogin:false,
        isError:false,
        error:null,
        responseData:''
    },
    getters:{
        getResponseData(state){
            return state.responseData
        }
    },
    mutations: {
        updateLoginField(state, field) {
            updateField(state.user, field);
        },
        getLoginField(state){
            getField(state)
        },
        [USER_LOGIN](state,responseData){
            state.user = responseData,
            state.isLogin = true,
            state.isError = false,
            state.responseData = responseData
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
                console.log(errorData)
            }
        }
    }
}