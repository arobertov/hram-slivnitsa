import VueRouter from "vue-router";
import AdminHome from "@vue/views/admin-panel/Admin-home";
import AdminArticleIndex from "@vue/views/admin-panel/article/Article-index";
import AdminArticleShow from "@vue/views/admin-panel/article/Article-show";
import AdminArticleNew from "@vue/views/admin-panel/article/Article-new";
import AdminArticleEdit from "@vue/views/admin-panel/article/Article-edit";

export default new VueRouter({
    mode: "history",
    routes: [
        {
            path: "/admin",
            name: "admin_panel",
            component: AdminHome,
            meta: {
                breadcrumb: 'Админ панел',
            },
        },
        {
            path: "/admin/articles",
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
            name: "admin_article_new",
            component: AdminArticleNew,
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
    ]

});
