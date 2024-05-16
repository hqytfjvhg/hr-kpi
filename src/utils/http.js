import axios from "axios";
import { ElMessage, ElLoading } from "element-plus";
import _ from "lodash";
import router from "@/router";

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, //设置请求的base url
  // baseURL: "https://api.oa.ifi-cloud.com",
  // baseURL: "http://192.168.1.189:8081",
  // timeout: 40000, //超时时长
});

//loading对象
let loading;

//当前正在请求的数量
let needLoadingRequestCount = 0;

//显示loading
export function showLoading(target) {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = ElLoading.service({
      lock: true,
      text: "加载中...",
      background: "rgba(255, 255, 255, 0.5)",
      target: target || "body", //所覆盖的节点
    });
  }
  needLoadingRequestCount++;
}

//隐藏loading
export function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); //做个保护
  if (needLoadingRequestCount === 0) {
    //关闭loading
    toHideLoading();
  }
}

//防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
var toHideLoading = _.debounce(() => {
  if (loading != null) {
    loading.close();
    loading = null;
  }
}, 300);

let currentConfig = null;
//添加请求拦截器
http.interceptors.request.use(
  (config) => {
    //获取token
    const token = localStorage.getItem("token");
    if (token) {
      //如果token存在，则添加到请求的头部
      config.headers.token = token; //通常，我们将token添加到Authorization头部，而不是自定义的头部如"token"
      // config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    //判断当前请求是否设置了不显示Loading
    // if (config.showLoading) {
    //   showLoading(config.headers.loadingTarget);
    //   currentConfig = config;
    // }
    if (config.headers.showLoading !== false) {
      showLoading(config.headers.loadingTarget);
      currentConfig = config;
    }
    // console.log("请求拦截器", config);
    return config;
  },
  (err) => {
    //判断当前请求是否设置了不显示Loading
    if (currentConfig.headers.showLoading !== false) {
      hideLoading();
      currentConfig = null;
    }
    ElMessage.error("请求超时!");
    return Promise.resolve(err);
  },
);

//响应拦截器
http.interceptors.response.use(
  (response) => {
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (response.config.headers.showLoading !== false) {
      hideLoading();
    }
    // if (response.config.showLoading) {
    //   hideLoading();
    // }
    if (response.status && response.status == 200 && response.data) {
      if (response.data.code != 0) {
        // if (response.data.code == 5) {
        //   localStorage.removeItem("userId");
        //   localStorage.removeItem("token");
        //   ElMessage.error("未登录，请重新登录");
        //   router.replace({ name: "login" });
        // } else if (response.data.code == 6) {
        //   router.replace({ name: "aboutInfo" });
        //   ElMessage.error(response.data.message);
        // } else if (response.data.code == 4) {
        //   ElMessage.error("没有权限");
        //   router.replace({ name: "frontView" });
        // } else if (response.data.code == 3) {
        //   ElMessage.error(response.data.message);
        // } else if (response.data.code == 1) {
        //   ElMessage.error(response.data.message);
        //   console.log(response.data.code, 1111);
        // } else {
        //   ElMessage.error("失败");
        // }
        switch (response.data.code) {
          case 5:
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
            ElMessage.error("未登录，请重新登录");
            router.replace({ name: "login" });
            break;
          case 6:
            router.replace({ name: "aboutInfo" });
            ElMessage.error(response.data.message);
            break;
          case 4:
            ElMessage.error("没有权限");
            // router.replace({ name: "frontView" });
            break;
          case 3:
          case 1:
            ElMessage.error(response.data.message);
            break;
          default:
            // ElMessage.error("失败");
            break;
        }
        // 当code不为0时，终止后续操作
        // return Promise.reject(new Error(response.data.message || "接口返回错误"));
      }
      return response;
    } else {
      // HTTP状态码不为200时，也可以根据需要返回Promise.reject()
      return Promise.reject(new Error("HTTP响应状态异常"));
    }
  },
  (error) => {
    // console.log(error);
    //判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
    if (error.config.headers.showLoading !== false) {
      hideLoading();
    }
    //response是请求响应返回的数据，没有则是网络错误
    // if (error.response && error.response.data && error.response.data.message) {
    //   var jsonObj = JSON.parse(error.response.data.message);
    //   ElMessage.error(jsonObj.message);
    // } else {
    //   ElMessage.error(error.message);
    // }

    if (error.request.status == 0) {
      // console.log("网络错误");
      // ElMessage.error("网络错误/连接失败");

      // 返回的数据则是axios.catch(err)中接收的数据
      return Promise.reject(error);
    } else if (error.response.status == 404) {
      router.push({ name: "404" });
    } else if (error.response.status == 401) {
      router.push({ name: "login" });
    }
  },
);

export default http;
