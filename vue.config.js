const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  productionSourceMap: false,
  outputDir: "docs",
  publicPath: "./",
  // eslint-loader
  lintOnSave: true,

  configureWebpack: (config) => {
    let plugins = [
      new TerserPlugin({
        terserOptions: {
          compress: {
            warnings: false,
            drop_debugger: false,
            drop_console: true,
          },
        },
        sourceMap: false,
        parallel: true,
      }),
    ];
    if (process.env.NODE_ENV !== "development") {
      config.plugins = [...config.plugins, ...plugins];
    }
  },
};
