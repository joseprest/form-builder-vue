import axios from "axios";

const SERVER_URL = process.env.VUE_APP_API_SERVER;
console.log("env - ", SERVER_URL);
const actions = {
  // eslint-disable-next-line
  async saveStep({ state, commit, getters }, data) {
    try {
      await axios.post(SERVER_URL + "/steps", data);
      commit("savedSteps", data);
    } catch (error) {
      console.log(
        "Error in saveSteps",
        error.response ? error.response.status : error
      );
    }
  },
  async getStepFromServer({ state, commit, getters }, step) {
    try {
      const params = new URLSearchParams();
      params.append("form_id", step.form_id);
      params.append("step_no", step.step_no);
      const { data } = await axios.get(SERVER_URL + `/steps/get`, {
        params,
      });
      return data.introduction;
    } catch (e) {
      console.log("Error in getStep", e.response ? e.response.status : e);
    }
  },
  async loadForm({ state, commit, getters }, formId = 1) {
    try {
      const { data } = await axios.get(SERVER_URL + `/forms/${formId}`);
      commit("setForm", {
        id: data.id,
        name: data.name,
        page_id: data.page_id,
      });
      commit("setSteps", data.steps);
    } catch (e) {
      console.log("Error in getStep", e.response ? e.response.status : e);
    }
  },
};

const getters = {
  getStep: (state) => (no) => {
    return state.steps.find((step) => step.step_no === no);
  },
};

const mutations = {
  setForm(state, data) {
    state.form = data;
  },
  setSteps(state, data) {
    state.steps = data;
  },
  setEditingStep(state, data) {
    state.editingStep = data;
  },
  setEditingStepNo(state, data) {
    state.editingStepNo = data;
  },
  setEditingFormId(state, data) {
    state.editingFormId = data;
  },
};

export default {
  namespaced: true,
  state: {
    form: null,
    steps: [],
    editingStep: {},
    editingFormId: 0,
    editingStepNo: 0,
  },
  getters,
  actions,
  mutations,
};
