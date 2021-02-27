import Vue from 'vue';
import router from './router/routes';
import store from './store';
import Common from './common-index';
// ***** import components  ******** //
import Homepage from "./views/Homepage";
import LoginForm from "./views/security/LoginForm";
import RegisterForm from "./views/security/RegisterForm";
import Test from "./views/Test";

Common.vueCommonSets();


Vue.prototype.$siteUser = window.user;

new Vue({
    components:{
        Homepage,
        LoginForm,
        RegisterForm,
        Test,
    },
    template:"<Homepage/>",
    router,
    store
}).$mount('#vue-entry');