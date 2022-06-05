<template>
  <div class="form-config-container">
    <el-form label-position="top">
      <el-form-item label="Label Position">
        <el-radio-group v-model="data.labelPosition">
          <el-radio-button label="left">left</el-radio-button>
          <el-radio-button label="right">right</el-radio-button>
          <el-radio-button label="top">top</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="Label Width">
        <el-input-number
          v-model="data.labelWidth"
          :min="0"
          :max="200"
          :step="10"
        ></el-input-number>
      </el-form-item>

      <el-form-item label="Size">
        <el-radio-group v-model="data.size">
          <el-radio-button label="medium">medium</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
          <el-radio-button label="mini">mini</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: ["data"],
};
</script>
