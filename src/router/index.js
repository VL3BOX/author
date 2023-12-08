import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { path: "/author/:id", name: "index", component: () => import("@/views/Index.vue") },
    { path: "/birthday/:id", name: "birthday", component: () => import("@/views/Birthday.vue") },
];

const router = new VueRouter({
    routes,
    // mode: "history",
    // base: "/"
});

export default router;
