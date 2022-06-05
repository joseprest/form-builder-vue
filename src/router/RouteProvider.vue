<template>
  <router-view></router-view>
</template>

<script>
import Vue from "vue";

export default {
  created() {
    this.bootstrap();
  },
  methods: {
    bootstrap() {
      Vue.config.lang = "en-US";
      this.$router.replace({ name: this.$route.name });
    },
  },
};
</script>
