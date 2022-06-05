<template>
  <div id="app">
    <div class="fm-container">
      <router-view />
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "app",
  methods: {
    handleHome() {
      this.$router.push({ path: "/" });
    },

    handleLangCommand(command) {
      this.$router.replace({
        name: this.$route.name,
        params: { lang: command },
      });
    },
  },
};
</script>

<style lang="scss">
.fm-container {
  height: calc(100% - 50px);
}
*,
:after,
:before {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
}
#app {
  font-family: "Source Sans Pro", "Helvetica Neue", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100%;
  height: 100%;
}
</style>
