import Vue from 'vue';
import router from './router/admin-routes';
import store from './store';
import VueImageManager from 'vue-image-manager';
import VueFileAgent from 'vue-file-agent';
import Common from './common-index';
// ***** import components  ******** //
import Aside from './views/Admin-panel';

Common.vueCommonSets();
Vue.use(VueImageManager);
Vue.use(VueFileAgent);
Vue.prototype.$siteUser = window.user;

new Vue({
    components:{
        Aside
    },
    template:"<Aside/>",
    router,
    store
}).$mount('#admin-vue-entry');