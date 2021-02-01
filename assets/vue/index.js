import Vue from 'vue';
import router from './router/routes';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VeeValidate,{Validator} from 'vee-validate';
import bg from 'vee-validate/dist/locale/bg'
import VuePaginate from 'vue-paginate';
import moment from 'moment';
import Homepage from "./views/homepage";
import LoginForm from "./views/security/LoginForm";
import RegisterForm from "./views/security/RegisterForm";
import Test from "./views/Test";


Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VuePaginate);
Vue.use(VeeValidate);
Validator.localize("bg",bg);



//--------------  datetime filer  --------------------- //
Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).locale('bg').format('LLLL')
    }
});

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