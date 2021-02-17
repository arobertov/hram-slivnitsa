import Vue from "vue";
import Vuex from "vuex";
import UserModule from "./user";
import ArticleModule from "./article";
import CategoryModule from "./category";
import TagModule from "./tag";

Vue.use(Vuex);

export default  new Vuex.Store({
    modules:{
        UserModule: UserModule,
        ArticleModule: ArticleModule,
        CategoryModule: CategoryModule,
        TagModule: TagModule
    }
})