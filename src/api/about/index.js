// import axios from "axios";
import axios from "@/utils/http";
// import { ElMessage } from "element-plus";
// import emitter from "@/utils/eventbus.js";
// import store from "@/store";
// import { ElMessage } from "element-plus";
// import router from "@/router";

//查询待办事件数量//查询价值观待办事件详情
export function getEventNumber() {
  return axios({
    url: "/ifi-personal/value/selectUncompletedEventInfo",
  });
}

// export function selectEventInfo() {
//   return axios({
//     url: "/ifi-personal/value/selectUncompletedEventInfo",
//   });
// }
//查询业绩待办事件详情
export function selectPerformanceInfo() {
  return axios({
    // url: "/ifi-personal/performance/selectUncompletedPerformanceInfo",
    url: "/ifi-personal/batchApprovePerformance/selectUncompletedPerformanceInfo",
  });
}

//查询某位员工的价值观
export function getValueByUserId(data) {
  return axios({
    url: "/ifi-personal/value/selectValueDataByUserId/" + data,
  });
}

export function sendLeaderScore(data) {
  return axios({
    url: "/ifi-personal/value/upadateValueDataLeaderScoreByUserId",
    method: "post",
    data,
  });
}
