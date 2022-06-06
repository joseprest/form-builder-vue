<template>
  <div class="control-wrapper">
    <el-select
      v-model="current_form"
      placeholder="Select"
      style="padding: 0 15px"
    >
      <el-option
        v-for="item in forms"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      >
      </el-option>
    </el-select>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-check"
      @click="handleLoad"
      >Load</el-button
    >
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-check"
      @click="handleSave"
      >Save step</el-button
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      current_form: null,
      forms: [
        {
          id: 1,
          name: "Test Form",
        },
        {
          id: 2,
          name: "No form",
        },
      ],
    };
  },
  methods: {
    handleSave() {
      console.log(this.$store.state.steps);
      this.$emit("clickSave");
    },
    handleLoad() {
      this.$store.commit(
        "steps/setEditingFormId",
        this.current_form ? this.current_form : 1
      );
      this.$emit("clickLoad", 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.control-wrapper {
  padding: 20px;
}
</style>
