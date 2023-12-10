import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    { path: "/:id", name: "index", component: () => import("@/views/Index.vue") },
    { path: "/birthday", name: "birthday", component: () => import("@/views/Birthday.vue") },
];

const router = new VueRouter({
    routes,
    mode: "history",
    base: "/author"
});

export default router;
