<template>
  <vue-run-sfc title="Live preview" :code="code"></vue-run-sfc>
</template>

<script>
import genFormCode from "../generator/generateFormCode";
export default {
  props: ["data", "remote", "value", "insite"],
  data() {
    return {
      code: `<template>
<div>
  <h1>{{ title }}</h1>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: "FormBuilder"
    }
  },
  methods: {
  }
};
<\/script>
<style lang="scss">
  body {
    #box {
      color: #409EFF;
    }
  }
</style>`,
    };
  },
  created() {
    const code = genFormCode(this.data, this.value);
    this.code = encodeURIComponent(code);
  },
};
</script>
