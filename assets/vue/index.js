import Vue from 'vue';
import router from '@vue/router/site-routes';
import store from '@vue/store';
import Common from '@vue/common-index';
// ***** import components  ******** //
import Homepage from "@vue/views/Homepage";

Common.vueCommonSets();

Vue.prototype.$siteUser = window.user;

new Vue({
    components:{
        Homepage
    },
    template:"<Homepage/>",
    router,
    store
}).$mount('#vue-entry');