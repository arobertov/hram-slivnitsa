import Vue from "vue";
import VueRouter from "vue-router";

import HomePage from "../views/Homepage"
import AdminHome from "../views/admin-panel/Admin-home";
import AdminArticleIndex from "../views/article/Article-index";
import AdminArticleShow from "../views/article/Article-show";
import AdminArticleNew from "../views/article/Article-new";
import AdminArticleEdit from "../views/article/Article-edit";


Vue.use(VueRouter);

export default new VueRouter({
    mode:"history",
    routes: [
        {
            path:"/",
            name:"homepage",
            component:HomePage,

        },
        {
            path: "/admin",
            name: "admin_panel",
            component: AdminHome
        },
        {
            path: "/admin/articles",
            name: "admin_article_index",
            component: AdminArticleIndex
        },
        {
            path: "/admin/articles/:id/show",
            name: "admin_article_show",
            component: AdminArticleShow
        },
        {
            path: "/admin/articles/create",
            name: "admin_article_new",
            component: AdminArticleNew
        },
        {
            path: "/admin/articles/:id/edit",
            name: "admin_article_edit",
            component:AdminArticleEdit,
        },
     ]

});
