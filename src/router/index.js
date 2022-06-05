import Vue from "vue";
import Router from "vue-router";

import Home from "../demo/Home.vue";
import RouteProvider from "./RouteProvider.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: RouteProvider,
      children: [
        {
          path: "",
          name: "index",
          component: Home,
        },
      ],
    },
  ],
});
