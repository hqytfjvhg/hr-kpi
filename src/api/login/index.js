// import axios from "axios";
import axios from "@/utils/http";
import store from "@/store";
import { ElMessage } from "element-plus";
import router from "@/router";
import { isMobile } from "@/utils/isMobile";
import { showFailToast } from "vant";

export function login(data) {
  axios({
    url: "/ifi-personal/user/login",
    method: "post",
    data,
    headers: { showLoading: false },
  })
    .then((res) => {
      if (res.data.code == 0) {
        const userId = res.data.data.userId;
        const token = res.data.data.token;
        const role = res.data.data.roleName;
        const name = res.data.data.name;
        const deptId = res.data.data.deptId;
        const userInfo = res.data.data;
        const publishTime = new Date(userInfo.publishTime);
        userInfo.monthLastDay = new Date(publishTime.getFullYear(), publishTime.getMonth() + 1, 0);
        // const nextMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 1);
        // userInfo.monthLastDay = new Date(nextMonthStart.setDate(nextMonthStart.getDate() - 1));

        store.commit("changeRole", role);
        store.commit("changeUserId", userId);
        store.commit("changeToken", token);
        store.commit("changeName", name);
        store.commit("changeDeptId", deptId);
        store.commit("changeUserInfo", userInfo);
        // console.log(token, userId);

        // ElMessage.success("登录成功!");
        if (isMobile()) {
          router.push({ name: "PhoneHome" });
        } else {
          if (store.state.role == "ROOT") {
            router.push({ name: "transfer" });
            // router.push({ name: "mainHome" });
            // store.commit("pushtags", { path: "/mainHome", name: "mainHome", info: "主页" });
          } else if (
            (Number(store.state.deptId) === 1 && store.state.role == "DEPTMANAGER") ||
            store.state.name == "温上凯"
          ) {
            router.push({ name: "specialView" });
            // store.commit("pushtags", { path: "/specialView", name: "specialView", info: "主页" });
          } else if (store.state.role == "DEPTMANAGER" || store.state.role == "HRMANAGER") {
            router.push({ name: "frontView" });
          } else if (store.state.role == "CLERK") {
            router.push({ name: "clerkView" });
          } else if (store.state.role == "HR") {
            router.push({ name: "hrView" });
          } else {
            router.push({ name: "employeeView" });
            // store.commit("pushtags", { path: "/frontView", name: "frontView", info: "主页" });
          }
        }

        // _this.isLoading = false;
      }
    })
    .catch(function (error) {
      if (isMobile()) {
        showFailToast("登录失败");
      } else {
        ElMessage.error("登录失败");
      }

      console.log(error.message);
    });
}

//作废
export function uuid() {
  axios
    .get("/ifi-personal/user/getRegisterIdentificationCode")
    .then((res) => {
      if (res.data.code == 0) {
        const registerIdentifyUuid = res.data.data.registerIdentifyUuid;
        console.log(registerIdentifyUuid);
        store.commit("changeUuid", registerIdentifyUuid);
      }
    })
    .catch(function (err) {
      console.log(err);
    });
}
//用户自己修改密码
export function updateOneselfPassword(data) {
  return axios({ url: "/ifi-personal/user/updateOneselfPassword", method: "post", data });
}
