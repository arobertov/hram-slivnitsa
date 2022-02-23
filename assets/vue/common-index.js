import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import {ValidationProvider , ValidationObserver, extend ,localize} from 'vee-validate';
import bg from 'vee-validate/dist/locale/bg.json';
import * as rules from 'vee-validate/dist/rules';
import VuePaginate from 'vue-paginate';
import moment from 'moment';

Object.keys(rules).forEach(rule => {
    extend(rule, rules[rule]);
});
localize('bg', bg);
function vueCommonSets(){
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.use(VuePaginate);
    Vue.component('ValidationObserver', ValidationObserver);
    Vue.component('ValidationProvider', ValidationProvider);
    //--------------  datetime filer  --------------------- //
    Vue.filter('formatDate', function (value) {
        if (value) {
            return moment(String(value)).locale('bg').format('LLLL')
        }
    });
}

export default {
    name: "Common-index",
    vueCommonSets: vueCommonSets
}