// import axios from "axios";searchValueD
import store from "@/store";
import { ElMessage } from "element-plus";
// import router from "@/router";
import axios from "@/utils/http";

export function getValues() {
  return axios({
    url: "/ifi-personal/value/selectUserValueTemplate",
    headers: { showLoading: false },
  });
}

export function getUser() {
  return axios({
    url: "/ifi-personal/user/selectAllNotJoinCurrentMonthUser",
    method: "post",
  });
}

export function sendValuesData(data) {
  return axios({
    url: "/ifi-personal/valueData/insertValueDataByUserId",
    method: "post",
    data,
  });
}

export function getAction() {
  return axios({
    url: "/ifi-personal/value/selectActionList",
    method: "post",
  });
}

export function addAction(data) {
  return axios({
    url: "/ifi-personal/value/addAction",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("新增成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err);
    });
}

export function deleteAction(data) {
  return axios({
    url: "/ifi-personal/value/deleteActions",
    method: "delete",
    data,
  })
    .then((res) => {
      // console.log(res);
      if (res.data && res.data.code == 0) {
        ElMessage.success("删除成功");
      }
    })
    .catch((err) => {
      console.log(err);
      console.log(err.message);
    });
}

export function createValue(data) {
  return axios({
    url: "/ifi-personal/value/createValueAndRelevanceActions",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("创建成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

export function getValue() {
  return axios({
    url: "/ifi-personal/value/getValueList",
    // method: "post",
  });
}
export function deleteValue(data) {
  return axios({
    url: "/ifi-personal/value/deleteValue",
    method: "delete",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("删除成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

export function getModel() {
  return axios({
    url: "/ifi-personal/value/getTemplateList",
    // method: "post",
  });
}

export function createModel(data) {
  return axios({
    url: "/ifi-personal/value/createTemplateAndRelevanceValues",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("创建成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

export function deleteModel(data) {
  return axios({
    url: "/ifi-personal/value/deleteTemplate",
    method: "delete",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("删除成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

export function getEvent() {
  return axios({
    url: "/ifi-personal/value/getEventList",
    // headers: { showLoading: true, loadingTarget: "加载中" },
  });
}
export function createEvent(data) {
  return axios({
    url: "/ifi-personal/value/createEvent",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("创建成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}
//发布事件
export function releaseEvent(data, _this) {
  return axios({
    url: "/ifi-personal/value/publishEvent",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        // store.commit("changeApprovalData", []);
        // _this.activeName = "history";
        store.commit("clearApprovalData");
        _this.multipleSelection = {};
        _this.eventReleaseData = [];
        _this.uploadFile = "";
        _this.targetListData = [];
        _this.deptNameList = [];
        _this.getEventDetil();
        _this.getEventList();
        // _this.getEventHistory();
        store.commit("saveMonth", { month: new Date().getMonth() + 1 });
        ElMessage.success("发布成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

export function deleteEvent(data) {
  return axios({
    url: "/ifi-personal/value/deleteEvent",
    method: "delete",
    data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("删除成功");
      }
    })
    .catch((err) => {
      ElMessage.error(err.message);
    });
}

//查询当前用户参与的其他模板
export function selectOtherModel(data) {
  return axios({
    url: "/ifi-personal/value/selectJoinOtherTemplateUserInfo",
    method: "post",
    data,
  });
}

//查询价值观详情
export function getValueDetil() {
  return axios({
    url: "/ifi-personal/value/selectAllValueAndAllActions",
  });
}

export function getModelDetil() {
  return axios({
    url: "/ifi-personal/value/selectAllTemplateAndValues",
  });
}
export function getEventDetil() {
  return axios({
    url: "/ifi-personal/value/selectAllEventAndTemplates",
  });
}

export function getEventHistory(data) {
  return axios({
    url: "/ifi-personal/valueEventFlow/searchPublishEventHistoryByPage",
    method: "post",
    data,
  });
}

//查询某历史事件参与的人
export function getEventJoinUser(data) {
  return axios({
    url: "/ifi-personal/value/selectJoinPublishEventUser",
    method: "post",
    data,
  });
}
//查询事件下某人的审批流程
export function getUserApproval(data) {
  return axios({
    url: "/ifi-personal/value/selectJoinPublishEventUserFlow",
    method: "post",
    data,
  });
}

//查询部门价值观得分，旧数据，舍弃
export function getValueDeptScore(data) {
  return axios({
    url: "/ifi-personal/performance/searchValueScoreResult",
    method: "post",
    data,
  });
}

//管理员帮忙填写价值观
export function getOneUserValue(data) {
  return axios({
    url: "/ifi-personal/valueData/selectUserValueTemplateByUserId/" + data,
  });
}
//管理员提交价值观
export function sendOneUserValue(data) {
  return axios({
    url: "/ifi-personal/valueData/toUserInsertValueDataByRoot/" + store.state.currentUserId,
    method: "post",
    data,
  });
}
//员工保存价值观
export function saveValueData(data) {
  return axios({
    url: "/ifi-personal/valueData/saveValueDataByUserId",
    method: "post",
    data,
    headers: { showLoading: false },
  });
}
