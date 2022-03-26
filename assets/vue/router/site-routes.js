
import VueRouter from "vue-router";

/* ---- import components --------- */
import SiteIndex from "@vue/views/site-views/Site-index";
import SomethingComponent from "@vue/components/site-components/SomethingComponent";

export default new VueRouter({
    mode:'history',
    routes:[
        {
            path: "/",
            name: "site_index",
            component: SiteIndex,
        },
        {
            path:"/something",
            name:"something_else",
            component:SomethingComponent
        }
    ]

})

