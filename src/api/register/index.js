// import axios from "axios";
import axios from "@/utils/http";
import { ElMessage } from "element-plus";
import router from "@/router";

export function register(data) {
  axios({
    url: "/ifi-personal/user/register",
    method: "post",
    data,
  })
    .then(function (res) {
      if (res.status !== 200) {
        return ElMessage.error("注册失败！");
      } else {
        ElMessage.success("注册成功!");
        router.push("/login");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

export function deptList() {
  return axios({
    url: "/ifi-personal/dept/getDeptList",
  });
}
