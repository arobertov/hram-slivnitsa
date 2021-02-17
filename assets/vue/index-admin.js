import Vue from 'vue';
import router from './router/routes';
import store from './store';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VeeValidate,{Validator} from 'vee-validate';
import bg from 'vee-validate/dist/locale/bg'
import VuePaginate from 'vue-paginate';
import moment from 'moment';
// ***** import components  ******** //
import Aside from './views/admin-panel';

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
        Aside
    },
    template:"<Aside/>",
    router,
    store
}).$mount('#admin-vue-entry');