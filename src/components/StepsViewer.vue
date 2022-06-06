<template>
  <div class="fm2-steps-view">
    <div>
      <div class="steps-list">
        <el-steps :active="2" align-center>
          <el-step
            :title="step.name"
            v-for="(step, index) in steps"
            :key="index"
          >
            <template slot="description">
              <el-button
                type="primary"
                @click="loadStepJSON(step.form_id, step.step_no)"
                icon="el-icon-edit"
                circle
              ></el-button>
            </template>
          </el-step>
        </el-steps>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState("steps", {
      steps: (state) => state.steps,
    }),
  },
  mounted() {
    this.initView();
  },
  methods: {
    ...mapActions("steps", ["getStepFromServer"]),
    initView() {
      this.steps = [
        {
          id: 0,
          name: "Step-1",
        },
        {
          id: 1,
          name: "Step-2",
        },
        {
          id: 2,
          name: "Step-3",
        },
      ];
    },
    async loadStepJSON(form_id, step_no) {
      const data = this.steps.find((step) => step.step_no === step_no);

      this.$store.commit("steps/setEditingStep", data);
      this.$emit("refreshPanel", data.introduction);
    },
  },
};
</script>

<style lang="scss" scoped>
.steps-list {
  width: 100%;
  padding: 100px 0;
}
.step {
  padding: 0 15px;
  .step-card {
    text-align: center;
    width: 150px;
    height: 150px;
    border-radius: 999px;
  }
}
</style>
