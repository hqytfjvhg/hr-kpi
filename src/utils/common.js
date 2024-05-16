import store from "@/store";

const rootPermission = {
  isRootRead() {
    if (store.state.role === "ROOT") {
      const purview = store.state.userInfo.permissions;
      //角色和权限相等就不是只读的
      if (purview.includes("ROOT:READ")) {
        return true;
      } else {
        return false;
      }
    }
  },
  isRootDown() {
    if (store.state.role === "ROOT") {
      const purview = store.state.userInfo.permissions;
      if (purview.includes("ROOT:DOWNLOAD")) {
        return true;
      } else {
        return false;
      }
    }
  },
};

export default rootPermission;
