import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ElementUI from "element-ui";
import VueEditor from "vue2-editor";
import VueRunSfc from "vue-run-sfc";

import "element-ui/lib/theme-chalk/index.css";

Vue.use(VueEditor);

Vue.use(VueRunSfc, {
  cssLabs: [
    "https://cdn.jsdelivr.net/npm/normalize.css@8.0.1/normalize.min.css",
    "https://cdn.jsdelivr.net/npm/element-ui@2.9.1/lib/theme-chalk/index.css",
  ],
  jsLabs: ["https://cdn.jsdelivr.net/npm/element-ui@2.9.1/lib/index.js"],
  row: true,
  reverse: true,
  height: "600px",
  open: true,
  isHideHeader: false,
});

import "./components";

Vue.use(ElementUI, { size: "small" });

import FormBuilder from "./index";
Vue.use(FormBuilder);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
