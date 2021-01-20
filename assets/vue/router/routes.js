import Vue from "vue";
import VueRouter from "vue-router";
<<<<<<< HEAD
import HomePage from "../views/homepage"
=======
>>>>>>> origin/master

Vue.use(VueRouter);

export default new VueRouter({
    mode:"history",
    routes: [
<<<<<<< HEAD
        {path:"/",name:"homepage",component:HomePage},
=======
        {path:"/home",name:"homepage"},
>>>>>>> origin/master
        ]
});
