import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import axios from "axios";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "font-awesome/css/font-awesome.min.css"; //图标
import VueContextMenu from "vue-contextmenu";
import print from "vue3-print-nb"; //打印
import * as echarts from "echarts"; //图表
import "@/global.scss";
import VCalendar from "v-calendar"; //日历组件
import "v-calendar/style.css";
import i18n from "./language";
import Vant from "vant";
import "vant/lib/index.css";

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.config.globalProperties.$echarts = echarts;

app.use(VueContextMenu);
app.use(print);
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(Vant);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

//以下是捕获全局异常
app.config.errorHandler = (err, vm, info) => {
  console.log("全局出现错误", err, vm, info);
  return true;
  // err，错误对象
  // vm，发生错误的组件实例
  // info，Vue特定的错误信息，例如错误发生的生命周期、错误发生的事件
};
app.config.warnHandler = function (msg, vm, trace) {
  console.log("全局出现警告", msg, vm, trace);
  return true;
};
window.onerror = function (message, source, line, column, error) {
  console.log("全局捕获的错误", message, source, line, column, error);
  return true;
};

//解决excel fn的问题
const debounce = (fn, delay) => {
  let timer = null;
  return function () {
    let context = this;
    let args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
};

const _ResizeObserver = window.ResizeObserver;
window.ResizeObserver = class ResizeObserver extends _ResizeObserver {
  constructor(callback) {
    callback = debounce(callback, 16);
    super(callback);
  }
};

// 添加请求拦截器，在请求头中加token
// axios.interceptors.request.use(
//   (config) => {
//     if (localStorage.getItem("token")) {
//       config.headers.token = localStorage.getItem("token");
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   },
// );

// console.log(process.env.VUE_APP_API_BASE_URL, "地址");
// createApp(App).use(store).use(router).use(ElementPlus).mount("#app");
app.use(store).use(router).use(ElementPlus).use(VCalendar).use(i18n).mount("#app");
