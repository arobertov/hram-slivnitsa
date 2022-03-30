
import VueRouter from "vue-router";

/* ---- import components --------- */
import SiteIndex from "@vue/views/site-views/Site-index";
import SomethingComponent from "@vue/components/site-components/SomethingComponent";
import PrayerBookView from "@vue/views/site-views/PrayerBookView";

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path: "/",
            name: "site_index",
            component: SiteIndex,
        },
        {
            path:"/molitvenik",
            name: "prayer_book",
            component:PrayerBookView
        },
        {
            path:"/something",
            name:"something_else",
            component:SomethingComponent
        }
    ]

})

