import axios from "@/utils/http";
import { ElMessage } from "element-plus";

//作废
export function getKpiList(data) {
  return axios({
    url: "/ifi-personal/performance/searchPerformanceFinalData",
    method: "post",
    data,
  });
}
export function saveKPIData(data, _this) {
  return axios({
    url: "/ifi-personal/performance/synchronizationKPisnapshotData/" + data,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("保存成功");
        _this.getKPIScore();
        _this.completionProgress = false;
      }
    })
    .catch();
}
//查询kpi历史,作废
export function selectKpiHistory(data) {
  return axios({
    url: "/ifi-personal/performance/searchKpiHistorySnapshotData",
    method: "post",
    data,
  });
}
//预览
export function previewKpiHistory(data) {
  return axios({
    url: "/ifi-personal/performance/searchMonthlyPerformanceEvaluationForm",
    method: "post",
    data,
  });
}
//计算最新月的kpi数据，作废
export function calculateNewestKpi(data) {
  return axios({
    url: "/ifi-personal/performance/searchPerformanceFinalData",
    method: "post",
    data,
  });
}
//移除user
export function removeUser(data) {
  return axios({
    url: "/ifi-personal/performance/removeUserComouteCompletionProgress",
    method: "post",
    data,
  });
}
//获取用户的全年kpi数值
export function getUserAllYearKPI(data) {
  return axios({
    url: "/ifi-personal/visualization/selectUserKPIScoreByYear",
    method: "post",
    data,
  });
}
//获取所有用户
// export function getAllUser() {
//   return axios({
//     url: "/ifi-personal/user/getUserList",
//     method: "post",
//   });
// }
//查询登录的用户的整年KPI数据
export function getLoginUserAllYearKPI(data) {
  return axios({
    url: "/ifi-personal/visualization/selectLoginUserKPIScoreByYear",
    method: "post",
    data,
  });
}

//查询某些用户的某一月的数据
export function getUserOneMonth(data) {
  return axios({
    url: "/ifi-personal/visualization/selectUserKPIScoreByYearAndMonth",
    method: "post",
    data,
  });
}

//查询一个指标所绑定使用的用户
export function getTarget(data) {
  return axios({
    url: "/ifi-personal/visualization/selectUserKPIScoreByTarget",
    method: "post",
    data,
  });
}

//个人绩效考评表
export function getPersonalData(data) {
  return axios({
    url: "/ifi-personal/performance/searchMonthlyPerformanceEvaluationList",
    method: "post",
    data,
  });
}

//kpi得分
export function getKPIScore(data) {
  return axios({
    url: "/ifi-personal/performance/searchKPIScoreDetails",
    method: "post",
    data,
  });
}
//kpi得分查历史数据
export function getKPIScoreHistory(data) {
  return axios({
    url: "/ifi-personal/performance/searchKPIHistoryScoreDetails",
    method: "post",
    data,
  });
}
