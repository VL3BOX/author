Vue.config.productionTip = false;

// 第三方UI组件
// import Vue from "vue";
// import ElementUI from "element-ui";
// import "element-ui/lib/theme-chalk/index.css";
// Vue.use(ElementUI);

// 通用UI模块
import JX3BOX_UI from '@jx3box/jx3box-common-ui'
Vue.use(JX3BOX_UI);

// 数据与路由
// import router from "../router";
// import store from "../store";

import App from "./App.vue";
new Vue({
    // router,
    // store,
    render: h => h(App),
}).$mount("#app");

