import axios from "@/utils/http";
import router from "@/router";
// import { ElMessage } from "element-plus";
import store from "@/store";
export function systemLogin(data) {
  //表单默认的提交行为是刷新页面，需要阻止
  event.preventDefault();
  axios({
    url: "/ifi-personal/user/login",
    method: "post",
    data,
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

        if (res.data.data.roleName == "ROOT") {
          console.log(11);
          // ElMessage.success("登录成功");
          router.push({ name: "transfer" });
        } else {
          console.log(22);
          router.push({ name: "login" });
        }
      }
    })
    .catch((err) => {
      console.log("错误", err);
    });
}
