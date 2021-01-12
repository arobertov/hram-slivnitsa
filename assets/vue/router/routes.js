import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "../views/homepage"

Vue.use(VueRouter);

export default new VueRouter({
    mode:"history",
    routes: [
        {path:"/",name:"homepage",component:HomePage},
        ]
});
