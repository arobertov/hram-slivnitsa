import VueRouter from "vue-router";

import AdminHome from "@vue/views/admin-panel/Admin-home";
import AdminArticleIndex from "@vue/views/admin-panel/article/Article-index";
import AdminArticleShow from "@vue/views/admin-panel/article/Article-show";
import AdminArticleCreate from "@vue/views/admin-panel/article/Article-create";
import AdminArticleEdit from "@vue/views/admin-panel/article/Article-edit";

import AdminNewsCreate from "@vue/views/admin-panel/news/News-create";
import AdminNewsIndex from "@vue/views/admin-panel/news/News-index";
import AdminNewsShow from "@vue/views/admin-panel/news/News-show";
import AdminNewsEdit from "@vue/views/admin-panel/news/News-edit";
export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: '/admin/',
            name: "admin_panel",
            component: AdminHome,
            meta: {
                breadcrumb: 'Админ панел',
            },
        },
        {
            path: '/admin/articles',
            name: "admin_article_index",
            component: AdminArticleIndex,
            meta: {
                breadcrumb: 'Статии',
            },
        },
        {
            path: "/admin/articles/:id/show",
            name: "admin_article_show",
            component: AdminArticleShow,
            meta: {
                breadcrumb: 'Прегледай статия',
            },
        },
        {
            path: "/admin/articles/create",
            name: "admin_article_create",
            component: AdminArticleCreate,
            meta: {
                breadcrumb: 'Създай статия',
            },
        },
        {
            path: "/admin/articles/:id/edit",
            name: "admin_article_edit",
            component: AdminArticleEdit,
            meta: {
                breadcrumb: 'Редактирай статия',
            },
        },
        /*---------- News Routes  -------------- */

        {
            path: "/admin/news",
            name: "admin_news_index",
            component: AdminNewsIndex,
            meta: {
                breadcrumb: 'Новини',
            },
        },
        {
            path: "/admin/news/:id/show",
            name: "admin_news_show",
            component: AdminNewsShow,
            meta: {
                breadcrumb: 'Прочети новина',
            },
        },
        {
            path: "/admin/news/create",
            name: "admin_news_create",
            component: AdminNewsCreate,
            meta: {
                breadcrumb: 'Създай новина',
            },
        },
        {
            path: "/admin/news/:id/edit",
            name: "admin_news_edit",
            component: AdminNewsEdit,
            meta: {
                breadcrumb: 'Редактирай новина',
            },
        },
    ]

});
