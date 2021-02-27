import Vue from 'vue';
import router from './router/routes';
import store from './store';

import Common from './common-index'
// ***** import components  ******** //
import Aside from './views/admin-panel';

Common.vueCommonSets();

Vue.prototype.$siteUser = window.user;

new Vue({
    components:{
        Aside
    },
    template:"<Aside/>",
    router,
    store
}).$mount('#admin-vue-entry');