import Vue from 'vue';
import router from './router/routes';
import store from './store';
import LoginFormModal from "./views/security/LoginFormModal";
//import TestComponent from "./views/TestComponent";

new Vue({
    components:{
       LoginFormModal
    },
    template:"<LoginFormModal/>",
    router,
    store
}).$mount('#login-form-modal');