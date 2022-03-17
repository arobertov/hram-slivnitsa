import Vue from 'vue';
import router from './router/routes';
import store from './store';
import VueImageManager from 'vue-image-manager';
import Common from './common-index';
// ***** import components  ******** //
import Aside from './views/Admin-panel';


Common.vueCommonSets();
Vue.use(VueImageManager);

Vue.prototype.$siteUser = window.user;

new Vue({
    components:{
        Aside
    },
    template:"<Aside/>",
    router,
    store
}).$mount('#admin-vue-entry');