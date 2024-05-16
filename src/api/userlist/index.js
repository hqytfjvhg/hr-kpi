// import axios from "axios";
import axios from "@/utils/http";
import store from "@/store";
import { ElMessage } from "element-plus";
// import router from "@/router";

export function userList(data) {
  return axios({
    url: "/ifi-personal/user/searchByPage",
    method: "post",
    headers: {
      token: store.state.token,
    },
    data,
  });
}
// 添加响应拦截器
// axios.interceptors.response.use(
//   function (response) {
//     if (response.data.code == 5) {
//       localStorage.removeItem("userId");
//       localStorage.removeItem("token");
//       ElMessage.error("token失效，请重新登录！");
//       router.push("/login");
//     }
//     return response;
//   },
//   function (error) {
//     console.log(error);
//   },
// );

//重置密码
export function resetpsw(data) {
  return axios({
    url: "/ifi-personal/user/resetPassword",
    method: "post",
    data,
  })
    .then(function (res) {
      if (res.data.code == 0) {
        ElMessage.success("重置成功!");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

//删除用户
export function deleteUser(data) {
  return axios({
    url: "/ifi-personal/user/deleteUserByIds",
    method: "post",
    data,
  });
}

//获取角色列表
export function roleList(data) {
  return axios({
    url: "/ifi-personal/dept/getRoleNameList",
    data,
  });
}

//修改用户角色或者部门
export function sendRoledata(data) {
  return axios({
    url: "/ifi-personal/user/updataUserRoleOrDeptInfo",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) return ElMessage.success("修改成功");
    })
    .catch((err) => {
      ElMessage.error(err);
    });
}

//查询部门常用审批流程
export function getCommonDept() {
  return axios({
    url: "/ifi-personal/valueEventFlow/selectDeptFlow",
  });
}

//查询人事常用审批流程
export function getCommonHr() {
  return axios({
    url: "/ifi-personal/valueEventFlow/selectHrFlow",
  });
}

//保存部门审批流程
export function saveCommonDept(data) {
  return axios({
    url: "/ifi-personal/valueEventFlow/createDeptFlow",
    method: "post",
    data,
  });
}

//保存人事审批流程
export function saveCommonHr(data) {
  return axios({
    url: "/ifi-personal/valueEventFlow/createHRFlow",
    method: "post",
    data,
  });
}

//删除审批
export function deleteDeptCommon(data) {
  return axios({
    url: "/ifi-personal/valueEventFlow/deleteDeptFlowAndRule",
    method: "delete",
    data,
  });
}

export function deleteHrCommon(data) {
  return axios({
    url: "/ifi-personal/valueEventFlow/deleteHRFlowAndRule",
    method: "delete",
    data,
  });
}

//查询新增审批流程有权限的用户
export function getDeptFlow() {
  return axios({
    url: "/ifi-personal/user/selectDeptFlowApprover",
    method: "post",
  });
}
export function getHrFlow() {
  return axios({
    url: "/ifi-personal/user/selectHrFlowApprover",
    method: "post",
  });
}
//获取用户个人信息
// export function getInfo() {
//   return axios({
//     url: "/ifi-personal/user/selectUserByUserId",
//     method: "post",
//   });
// }
//修改电话号码
// export function changeInfo(data) {
//   return axios({
//     url: "/ifi-personal/user/upadateUserInfoByUserId",
//     method: "post",
//     data,
//   })
//     .then((res) => {
//       if (res.data && res.data.code == 0) {
//         ElMessage.success("修改成功");
//       }
//     })
//     .catch(() => {
//       ElMessage.error("修改失败");
//     });
// }

//新增用户
export function addUser(data) {
  return axios({
    url: "/ifi-personal/user/addUser",
    method: "post",
    data,
  });
}

//下载添加用户的模板
export function downloadUserTemplate() {
  return axios({ url: "/ifi-personal/user/downloadUserBatchAddExcel", responseType: "blob" })
    .then((res) => {
      if (res.status === 200) {
        //将数据传给浏览器
        let url = window.URL.createObjectURL(new Blob([res.data]));
        // 页面创建一个a链接
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "用户批量导入模板.xlsx"); // 或者你需要的文件名
        //链接挂载到页面的body上
        document.body.appendChild(link);
        //自动点击
        link.click();
        //下载完销毁
        document.body.removeChild(link);
      } else {
        console.log("下载失败");
      }
    })
    .catch(() => {
      ElMessage.error("下载失败");
    });
}
//导出用户
export function exportUserInfo() {
  return axios({ url: "/ifi-personal/user/exportUserInfoExcel", responseType: "blob" })
    .then((res) => {
      if (res.status === 200) {
        //将数据传给浏览器
        let url = window.URL.createObjectURL(new Blob([res.data]));
        // 页面创建一个a链接
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "所有用户列表信息.xlsx"); // 或者你需要的文件名
        //链接挂载到页面的body上
        document.body.appendChild(link);
        //自动点击
        link.click();
        //下载完销毁
        document.body.removeChild(link);
      } else {
        console.log("下载失败");
      }
    })
    .catch(() => {
      ElMessage.error("下载失败");
    });
}
//文件上传的用户信息传给后端
export function batchAddUser(data) {
  return axios({ url: "/ifi-personal/user/batchAddUser", method: "post", data });
}

//修改用户的自定义审批状态,价值观
export function changeUserValueCustom(data) {
  return axios({
    url: "/ifi-personal/user/updataUserCustomFlowState",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("修改成功");
    }
  });
}
//修改业绩自定义审批
export function changeUserPerformCustom(data) {
  return axios({
    url: "/ifi-personal/user/updataUserTargetCustomFlowState",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("修改成功");
    }
  });
}

//获取所有用户，用于文员关联其他员工
export function getAllUser() {
  return axios({
    url: "/ifi-personal/user/getAllUserList",
  });
}

//获取上一月份的审批流
export function getLastEventFlow() {
  return axios({
    url: "/ifi-personal/valueEventFlow/selectSaveLastEventValueFlow",
  });
}
