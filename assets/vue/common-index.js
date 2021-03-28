import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VeeValidate,{Validator} from 'vee-validate';
import bg from 'vee-validate/dist/locale/bg'
import VuePaginate from 'vue-paginate';
import moment from 'moment';
function vueCommonSets(){
    Vue.use(BootstrapVue);
    Vue.use(IconsPlugin);
    Vue.use(VuePaginate);
    Vue.use(VeeValidate,{fieldsBagName: 'veeFields'});
    Validator.localize("bg",bg);
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