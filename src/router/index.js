import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Birthday from "../views/Birthday.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index },
    { path: '/birthday', component: Birthday },
]

const router = new VueRouter({
    routes
});

export default router;
