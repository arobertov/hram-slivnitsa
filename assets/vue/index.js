import Vue from 'vue';
import router from './router/routes';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VeeValidate from 'vee-validate';
//import { ValidationProvider } from 'vee-validate';
import VuePaginate from 'vue-paginate';
import moment from 'moment';
import Homepage from "./views/homepage";
import LoginForm from "./views/security/LoginForm";
import Test from "./views/Test";
import BootstrapForm from "./views/Form";

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VuePaginate);
Vue.use(VeeValidate);
//Vue.component('ValidationProvider', ValidationProvider);

//--------------  datetime filer  --------------------- //
Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).locale('bg').format('LLLL')
    }
});

new Vue({
    components:{
        Homepage,
        LoginForm,
        Test,
    },
    template:"<Homepage/>",
    router,
    store
}).$mount('#vue-entry');