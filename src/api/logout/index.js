// import axios from "axios";
import axios from "@/utils/http";
import store from "@/store";
import { ElMessage } from "element-plus";
import router from "@/router";

export function logout() {
  axios({
    url: "/ifi-personal/user/logout",
    method: "post",
    headers: {
      token: store.state.token,
    },
  })
    .then((res) => {
      if (res.data.code == 0) {
        if (store.state.role == "ROOT") {
          router.replace({ name: "SysLogin" });
        } else {
          router.replace({ name: "login" });
        }
        ElMessage.success("成功退出登录");
        localStorage.removeItem("token");
        localStorage.clear();
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "退出失败",
      });
    });
}
