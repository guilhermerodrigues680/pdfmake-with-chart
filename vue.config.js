const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,

  // lintOnSave: true,
  publicPath: "/pdfmake-with-chart/",

  chainWebpack: (config) => {
    // vue inspect --plugin html
    // Altera titulo do html
    config.plugin("html").tap((args) => {
      args[0].title = "Pdfmake with chart";
      return args;
    });
  },

  devServer: {
    port: 10001,
  },
});
