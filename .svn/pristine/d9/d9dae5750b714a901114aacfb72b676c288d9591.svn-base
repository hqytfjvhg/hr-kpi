import { createI18n } from "vue-i18n";
// import locale from "element-plus/dist/locale";
import EN from "./En/en";
import CN from "./Cn/cn";
// import zhCn from "element-plus/dist/locale/zh-cn.mjs";
// import en from "element-plus/dist/locale/en.mjs";
// import store from "../store";

const message = {
  cn: {
    ...CN,
    // ...zhCn,
  },
  en: {
    ...EN,
    // ...en,
  },
};

// console.log(message);
const i18n = createI18n({
  locale: localStorage.getItem("langType") || "cn", // 设置语言类型
  legacy: false, // 如果要支持compositionAPI，此项必须设置为false;
  globalInjection: true, // 全局注册$t方法
  messages: message,
});
// console.log(i18n.global);

// locale.i18n((key, value) => i18n.t(key, value));

export default i18n;
