const { defineConfig } = require("@vue/cli-service");
// const { getApiTarget } = require("./config");

// 假设 env 是从环境变量或其他地方获取到的环境标识
// const targetUrl = getApiTarget(process.env.NODE_ENV);

// const HtmlWebpackPlugin = require("html-webpack-plugin");
// const HtmlWebpackInlineSourcePlugin = require("html-webpack-inline-source-plugin");
// const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
// const os = require("os");
// var ifaces = os.networkInterfaces();
// let networkAddress = ifaces["en0"].filter((item) => item.family === "IPv4")[0].address;
// const PORT = 2233;
// const SERVE_PATH = `"http://${networkAddress}:${PORT}"`;
// console.log(SERVE_PATH);

// const CDN = {
//   css: [
//     // 'https://cdn.bootcdn.net/ajax/libs/normalize/8.0.1/normalize.min.css',
//     "https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.27/index.css",
//   ],
//   js: [
//     "https://cdn.bootcdn.net/ajax/libs/vue/3.2.13/vue.global.js",
//     "https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.3/vue-router.global.min.js",
//     // 'https://cdn.bootcdn.net/ajax/libs/vue-router/4.0.11/vue-router.global.js',
//     "https://cdn.bootcdn.net/ajax/libs/vuex/4.0.0/vuex.global.min.js",
//     // 'https://cdn.bootcdn.net/ajax/libs/vuex/4.0.2/vuex.global.js',
//     "https://cdn.bootcdn.net/ajax/libs/axios/1.5.0/axios.min.js",
//     // 'https://cdn.bootcdn.net/ajax/libs/axios/0.21.4/axios.js',
//     "https://cdn.bootcdn.net/ajax/libs/element-plus/2.2.27/index.full.js",
//     // 'https://unpkg.com/element-plus@1.2.0-beta.6/dist/index.full.js',
//     // 'https://unpkg.com/browse/element-plus@1.2.0-beta.6/lib/locale/lang/zh-cn.js'
//   ],
// };
// let objExternals = {
//   vue: "Vue",
//   axios: "axios",
//   vuex: "Vuex",
//   "vue-router": "VueRouter",
//   "element-plus": "ElementPlus",
// };

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: true,
  publicPath: "./",
  outputDir: "dist",
  assetsDir: "assets",
  // chainWebpack: (config) => {
  //   if (isDev) {
  //     config.devtool("source-map");
  //   }
  // },
  devServer: {
    //开发环境下设置为编译好以后直接打开浏览器浏览
    open: true,
    client: {
      overlay: false,
    },
  },
  // configureWebpack: (config) => {
  //   //调试JS
  //   config.devtool = "source-map";
  //   config.resolve = { fallback: { fs: false, crypto: false } };
  // },
  css: {
    sourceMap: true, // 启用CSS源映射
  },
  configureWebpack: {
    devtool: process.env.NODE_ENV === "development" ? "source-map" : undefined,
    resolve: { fallback: { fs: false, crypto: false } }, //解决excel下载的fs问题

    //   devServer: {
    //     client: {
    //       overlay: false,
    //     },

    // port: 15891,
    // host: "https://api.oa.ifi-cloud.com",
    // https: false,

    // open: true,

    // //允许访问的域名
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    // },
    // proxy: {
    //   "/api": {
    //     target: targetUrl,
    //     // target: "http://192.168.1.148:9009/",
    //     changeOrigin: true,
    //     // secure: false, // 当代理某些https服务报错时用
    //     pathRewrite: {
    //       "^/api": "",
    //     },
    //   },
    // },
    // },
  },
});
