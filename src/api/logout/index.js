// import axios from "axios";
import axios from "@/utils/http";
import store from "@/store";
import { ElMessage } from "element-plus";

export function logout() {
  axios({
    url: "/ifi-personal/user/logout",
    method: "post",
    headers: {
      token: store.state.token,
    },
  })
    .then((res) => {
      if (res.data.code == 0) return ElMessage.success("成功退出登录");
      localStorage.removeItem("token");
      localStorage.clear();
      this.$router.replace({ name: "login" });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "退出失败",
      });
    });
}
