<template>
  <div class="validate-rule">
    <div v-if="Object.keys(data.options).indexOf('required') >= 0">
      <el-checkbox v-model="required.required">Required</el-checkbox>
      <el-input
        size="mini"
        :disabled="!required.required"
        v-model="required.errorMsg"
        style="width: 240px"
        placeholder="custom explain"
      ></el-input>
    </div>
    <div v-if="Object.keys(data.options).indexOf('dataType') >= 0">
      <span class="sub-text">normal</span>
      <el-checkbox v-model="dataType.required"></el-checkbox>
      <el-select
        :disabled="!dataType.required"
        v-model="data.options.dataType"
        size="mini"
        style="padding-left: 10px"
      >
        <el-option value="string" label="string"></el-option>
        <el-option value="number" label="number"></el-option>
        <el-option value="boolean" label="boolean"></el-option>
        <el-option value="integer" label="integer"></el-option>
        <el-option value="float" label="float"></el-option>
        <el-option value="url" label="URL"></el-option>
        <el-option value="email" label="Email"></el-option>
        <el-option value="hex" label="Hexadecimal"></el-option>
      </el-select>
      <el-input
        size="mini"
        :disabled="!dataType.required"
        v-model="dataType.errorMsg"
        style="width: 240px"
        placeholder="custom explain"
      ></el-input>
    </div>

    <div v-if="Object.keys(data.options).indexOf('pattern') >= 0">
      <span class="sub-text">pattern</span>
      <el-checkbox v-model="pattern.required"></el-checkbox>
      <el-input
        size="mini"
        :disabled="!pattern.required"
        v-model="data.options.pattern"
        style="width: 240px; padding-left: 10px"
        placeholder="pattern"
      ></el-input>
      <el-input
        size="mini"
        :disabled="!pattern.required"
        v-model="pattern.errorMsg"
        style="width: 240px"
        placeholder="custom explain"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      required: {
        required: false,
        errorMsg: "",
      },
      dataType: {
        required: false,
        errorMsg: "",
      },
      pattern: {
        required: false,
        errorMsg: "",
      },
    };
  },
  mounted() {
    const dataType = this.data.options.dataType;
    this.data.options.dataType = dataType === "string" ? "" : dataType;
    this.$emit("validateDataType", this.data.options.dataType);
  },
  methods: {},
  watch: {
    "required.required": function (val) {
      this.data.options.required = val;
      this.$emit("validateRequired", val);
    },
    "dataType.required": function (val) {
      this.data.options.dataType = val ? this.data.options.dataType : "";
      this.$emit("validateDataType", this.data.options.dataType);
    },
    "pattern.required": function (val) {
      this.data.options.pattern = val ? this.data.options.pattern : "";
      this.$emit("valiatePattern", this.data.options.pattern);
    },
    "required.errorMsg": function (errMsg) {
      this.$emit("validateRequired", this.data.options.required, errMsg);
    },
    "dataType.errorMsg": function (errMsg) {
      this.$emit("validateDataType", this.data.options.dataType, errMsg);
    },
    "pattern.errorMsg": function (errMsg) {
      this.$emit("valiatePattern", this.data.options.pattern, errMsg);
    },
    "data.options.dataType": function () {
      this.dataType.errorMsg = "";
      this.$emit("validateDataType", this.data.options.dataType);
    },
    "data.options.pattern": function () {
      this.pattern.errorMsg = "";
      this.$emit("valiatePattern", this.data.options.pattern);
    },
  },
};
</script>

<style lang="scss">
.sub-text {
  display: block;
  margin: 10px 0;
  border-bottom: 1px dotted #000;
}
</style>
