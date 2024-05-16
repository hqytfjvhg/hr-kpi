import axios from "@/utils/http";
import { ElMessage } from "element-plus";
// import store from "@/store";
// import { ElMessage } from "element-plus";
// import router from "@/router";

//首页获取最新月份的数据
export function getNewestEventInfo() {
  return axios({ url: "/ifi-personal/visualization/searchEventCompletionProgressByTime", method: "post" });
}
//首页获取未完成审批的数据
export function getrUncompletedNumber() {
  return axios({ url: "/ifi-personal/visualization/searchLastTimeEventFlowUserUncompletedNumber", method: "post" });
}
//首页获取未签名确认的员工名单
export function selectNoSignUser() {
  return axios({ url: "/ifi-personal/visualization/searchLastTimeEventUnsignedUserList" });
}

//动态获取指标列表，数据展示
export function getOneMonthTarget(data) {
  return axios({ url: "/ifi-personal/performance/selectTargetListByYearAndMonth", method: "post", data });
}

export function getDeptKPIAllInfo(data) {
  return axios({ url: "/ifi-personal/visualization/selectDeptKPIGatherData", method: "post", data });
}

//保存电子签名
export function saveSignature(data, _this) {
  return axios({ url: "/ifi-personal/performance/saveUserSign", method: "post", data }).then((res) => {
    if (res.data.code == 0 && res.data.data) {
      ElMessage.success("上传成功");
      _this.isShowSign = false;
      _this.imgSrc = _this.context.canvas.toDataURL("image/png");
      _this.isShowSignButton = false;

      _this.getSelfPerformanceData();
    } else if (res.data.code == 0 && !res.data.data) {
      ElMessage.error("上传失败");
    } else if (res.data.code == 1) {
      _this.isShowSign = false;
    }
  });
}
//保存旧的电子签名
export function saveSignature2(data, _this) {
  return axios({ url: "/ifi-personal/performance/saveUserHistorySign", method: "post", data }).then((res) => {
    if (res.data.code == 0 && res.data.data) {
      ElMessage.success("上传成功");
      _this.clearCanvas();
      _this.isShowSign = false;
      // _this.imgSrc = _this.context.canvas.toDataURL("image/png");
      // _this.isShowSignButton = false;
      _this.getSelfPerformanceData();
    } else if (res.data.code == 0 && !res.data.data) {
      ElMessage.error("上传失败");
    } else if (res.data.code == 1) {
      _this.isShowSign = false;
    }
  });
}

//登录用户查看自己的绩效考评表
export function getSelfPerformanceInfo() {
  return axios({ url: "/ifi-personal/performance/searchSelfMonthlyPerformanceEvaluationForm" });
}

//查询奖金系数大于120的人
export function getBonusCoefficientData() {
  return axios({
    url: "/ifi-personal/visualization/searchLastTimeBonusCoefficientExceed120List",
  });
}
//查询一年中每个月的平均奖金系数
export function getBonusCoefficientAllYear(data) {
  return axios({
    url: "/ifi-personal/visualization/searchHistoryAverageBonusCoefficient",
    method: "post",
    data,
  });
}
//查询一年每个月的KPI得分
export function getKPIAllYear(data) {
  return axios({
    url: "/ifi-personal/visualization/searchKPIHistoryAverageScore",
    method: "post",
    data,
  });
}
export function getValueAllYear(data) {
  return axios({
    url: "/ifi-personal/visualization/searchValueHistoryAverageScore",
    method: "post",
    data,
  });
}

//导出年度绩效汇总表
export function getDepartmentPerformanceAnnualSummary(data) {
  return axios({
    url: "/ifi-personal/performance/getDepartmentPerformanceAnnualSummary",
    method: "post",
    data,
    responseType: "blob",
  })
    .then((res) => {
      if (res.status === 200) {
        const response = res.data;
        console.log(response.type.split("/")[1]);
        if (response.type.split("/")[1] == "json") {
          let reader = new FileReader();
          reader.onload = function (event) {
            let jsonData;
            jsonData = JSON.parse(event.target.result); // 将读取到的结果（字符串）解析为 JSON 对象
            // console.log(jsonData); // 输出 JSON 对象
            if (jsonData.code !== 0) {
              ElMessage.error(jsonData.message);
            }
          };
          reader.readAsText(response);
        } else {
          // const deptName = store.state.deptOptions.filter((item) => item.deptId == data.deptId)[0].deptName;
          // console.log(deptName);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", data.year + "年" + "部门绩效考核年度汇总表.xlsx"); // 或者你需要的文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        console.log("下载失败");
      }
    })
    .catch((e) => {
      ElMessage.error("下载失败");
      console.log(e);
    });
}

//用户查看自己最新两月的kpi和奖金系数
export function getOneselfKPIAndBonus() {
  return axios({
    url: "/ifi-personal/visualization/selectOneselfKPIAndBonusCoefficientAndValueScore",
  });
}
//查看全年的kpi和奖金系数
export function getOneselfAllYear(data) {
  return axios({
    url: "/ifi-personal/visualization/selectOneselfKPIAndBonusCoefficientAndValueScoreByYear",
    method: "post",
    data,
  });
}
//查看部门全年平均的kpi和奖金系数
export function getDeptAllYear(data) {
  return axios({
    url: "/ifi-personal/visualization/selectDeptKPIAndBonusCoefficientAverageByYear",
    method: "post",
    data,
  });
}

//文员查询价值观未填写的名单
export function getNoWriteValueList() {
  return axios({
    url: "/ifi-personal/visualization/searchLastTimeEventUnWrittenValueUserList",
  });
}
//文员查看绩效未签名的名单
export function getNoSignList() {
  return axios({
    url: "/ifi-personal/visualization/searchLastTimeEventUnSignatureUserList",
  });
}
//人事查看价值观未填写名单及未审批部门
export function getNoWriteValueListAndNoApprovalDept() {
  return axios({
    url: "/ifi-personal/visualization/selectValueAndPerformanceFillState",
  });
}
