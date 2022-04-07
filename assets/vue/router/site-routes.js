import VueRouter from "vue-router";

/* ---- import components --------- */
import IndexPage from "@vue/views/site-views/IndexPageView";
import PrayerBookView from "@vue/views/site-views/PrayerBookView";
import ListByFrameView from "@vue/views/site-views/ListByFrameView";
import ListByCategory from "@vue/components/site-components/RelatedByCategoryComponent";
import ArticlePageView from "@vue/views/admin-panel/article-views/ArticlePageView";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: "/",
            name: "site_index",
            component: IndexPage,
        },
        {
           path:"/article/:id",
           name:"article_preview",
           component: ArticlePageView
        },
        {
            path: "/molitvenik",
            name: "prayer_book",
            component: PrayerBookView
        },
        {
            path: "/list/",
            name: "list_frame",
            component: ListByFrameView,
            children: [
                {
                    path: "category/:id",
                    name: "list_by_category",
                    component: ListByCategory,
                }
            ],
        }
    ]

})

