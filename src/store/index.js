import Vue from "vue";
import Vuex from "vuex";
import StepModule from "./modules/steps.js";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    steps: StepModule,
  },
});

export default store;
