import Vue from "vue";
import Vuex from "vuex";
import MainModule from "./main";
import UserModule from "./user";
import ArticleModule from "./article";
import CategoryModule from "./category";
import TagModule from "./tag";
import ImageModule from "./image";
import NewsModule from "@vue/store/news"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        MainModule: MainModule,
        UserModule: UserModule,
        ArticleModule: ArticleModule,
        CategoryModule: CategoryModule,
        TagModule: TagModule,
        ImageModule: ImageModule,
        NewsModule: NewsModule,
    }
})