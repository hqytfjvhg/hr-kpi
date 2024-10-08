import axios from "@/utils/http";
import { ElMessage } from "element-plus";
import store from "@/store";

//查询指标列表
export function getTargetList() {
  return axios({
    url: "/ifi-personal/performance/selectTargetList",
  });
}
//新增指标
export function addTarget(data, _this) {
  return axios({
    url: "/ifi-personal/performance/addTarget",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data && res.data.code == 0 && res.data.data) {
        // data.useState = false;
        (_this.formData = {
          deptId: "",
          name: "",
          weight: null,
          // value: null,
          targetValue: "",
          reportSource: "",
          targetIsNumber: null,
          dataProvider: "",
          calculationMethod: "",
        }),
          // _this.targetName = "";
          // _this.targetDescription = "";
          // _this.value = "";
          // _this.targetIsNumber = null;
          (_this.isAddTarget = false);
        // _this.targetList.push(data);
        _this.getTargetList();
        ElMessage.success("新增成功");
      }
    })
    .catch(() => {
      ElMessage.error("新增失败");
    });
}
//查询id的区间范围
export function selectTarget(data) {
  return axios({
    url: "/ifi-personal/performance/selectTargetByTargetId" + "?targetId=" + data,
    method: "post",
  });
}
//修改指标区间
export function changeTarget(data, _this) {
  return axios({
    url: "/ifi-personal/performance/upadateTargetByTargetId",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("修改成功");
      _this.isAddTarget = false;
    }
  });
}
//修改指标信息
export function changeTargetInfo(data, _this) {
  return axios({
    url: "/ifi-personal/performance/upadateTargetDetailsByTargetId",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("修改成功");
      _this.isAddTarget = false;
      _this.getTargetList();
    }
  });
}
//查询审批流程
export function getPerformanceFlow() {
  return axios({
    url: "/ifi-personal/performance/selectPerformanceFlow",
  });
}
//新增审批流程
export function addPerformance(data) {
  return axios({
    url: "/ifi-personal/performance/createPerformanceFlow",
    method: "post",
    data,
  })
    .then((res) => {
      if (res.data && res.data.code == 0) {
        ElMessage.success("新增成功");
      }
    })
    .catch(() => {
      ElMessage.error("新增失败");
    });
}
//查询有权限的审批人
export function getApprover() {
  return axios({
    url: "/ifi-personal/performance/selectPerformanceFlowApprover",
  });
}
//保存新增审批流程
export function savePerformanceFlow(data, _this) {
  return axios({
    url: "/ifi-personal/performance/createPerformanceFlow",
    method: "post",
    data,
  })
    .then((res) => {
      if (res && res.data && res.data.code == 0) {
        _this.getPerformance();
        ElMessage.success("保存成功");
      }
    })
    .catch(() => {
      ElMessage.error("请求失败");
    });
}
//删除审批流程
export function deletePerformanceFlow(data) {
  return axios({
    url: "/ifi-personal/performance/deletePerformanceFlow",
    method: "delete",
    data,
  });
}

//下载excel
export function downloadExcel() {
  return axios({
    url: "/ifi-personal/performance/downloadExcel",
    responseType: "blob",
  })
    .then((res) => {
      if (res.status === 200) {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "项目考核业绩汇总表.xlsx"); // 或者你需要的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log("下载失败");
      }
    })
    .catch((e) => {
      console.log(e);
      ElMessage.error("下载失败");
    });
}
//下载上个月的模板
export function downloadLastMonthExcel(data) {
  return axios({
    url: "/ifi-personal/performance/downloadLastMonthExcel",
    responseType: "blob",
  })
    .then((res) => {
      if (res.status === 200) {
        if (data == 1) {
          data = 13;
        }
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", data - 1 + "月项目考核业绩汇总表.xlsx"); // 或者你需要的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        console.log("下载失败");
      }
    })
    .catch(() => {
      ElMessage.error("下载失败");
    });
}

//查询业绩参与的人
export function getTargetJoinPeople(data) {
  return axios({
    url: "/ifi-personal/performance/selectJoinPublishEventInPerformanceUser",
    method: "post",
    data,
  });
}
//查询业绩审批状态
export function getPerformancePeople(data) {
  return axios({
    url: "/ifi-personal/performance/selectJoinPublishEventPerformanceFlow",
    method: "post",
    data,
  });
}
//获取审批的指标信息，未使用
export function getPerformanceData(data) {
  return axios({
    url: "/ifi-personal/performance/selectTargetByUserId/" + data,
  });
}

//提交审批数据,作废
export function sendPerformanceData(jsonData) {
  return axios({
    url: "/ifi-personal/performance/upadateUserTargetData2",
    method: "post",
    jsonData,
  })
    .then((res) => {
      if (res.data.code == 0) {
        ElMessage.success("提交成功");
      }
    })
    .catch(() => {
      ElMessage.error("提交失败");
    });
}

//预览或者下载，作废
export function preview(data, state) {
  if (state) {
    console.log(state);
    return axios({
      url: "/ifi-personal/performance/preview" + "?fileName=" + data,
      responseType: "blob",
    })
      .then((res) => {
        console.log(res);
        console.log(store.state.currentName);
        if (res.status === 200) {
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", store.state.currentName + "--项目考核业绩审批文件.xlsx"); // 或者你需要的文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          console.log("下载失败");
        }
      })
      .catch((e) => {
        ElMessage.error("下载失败");
        console.log(e);
      });
  } else {
    return axios({
      url: "/ifi-personal/performance/preview" + "?fileName=" + data,
      responseType: "arraybuffer",
    });
  }
}

//查询历史业绩数据
export function getperformanceDeptList(data) {
  return axios({
    url: "/ifi-personal/performance/searchPerformanceHistoryDataRecords",
    method: "post",
    data,
  });
}

//预览或下载最终的业绩文件，作废
export function previewHistory(data, state) {
  //预览
  if (state) {
    return axios({
      url:
        "/ifi-personal/performance/previewHistoryDataExcel" +
        "?fileName=" +
        data.fileName +
        "&month=" +
        data.month +
        "&year=" +
        data.year,
      responseType: "arraybuffer",
    });
    //下载
  } else {
    return axios({
      url:
        "/ifi-personal/performance/previewHistoryDataExcel" +
        "?fileName=" +
        data.fileName +
        "&month=" +
        data.month +
        "&year=" +
        data.year,

      responseType: "blob",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log(res.data);
          let url = window.URL.createObjectURL(new Blob([res.data]));
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", data.name + "--项目考核业绩审批文件.xlsx"); // 或者你需要的文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          // let url = window.URL.createObjectURL(new Blob([res.data]));
          // console.log(url);
          // var a = document.createElement("a");
          // document.body.appendChild(a);
          // a.href = url;
          // a.download = "2.xls";
          // a.click();
          // window.URL.revokeObjectURL(url);
        } else {
          console.log("下载失败111");
          console.log(1111);
        }
      })
      .catch(() => {
        ElMessage.error("下载失败2222");
      });
  }
}

//查询业绩得分，作废
export function getPermanceDeptScore(data) {
  return axios({
    url: "/ifi-personal/performance/searchTargetScoreResult",
    method: "post",
    data,
  });
}

//批量审批业绩，返回某一个部门的所有信息
export function getPerformanceByDeptId(data) {
  return axios({
    url: "/ifi-personal/batchApprovePerformance/selectTargetByUserIdList",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
//直接获取一个部门所有指标的得分区间
export function getTargetScoreById(data) {
  return axios({
    url: "/ifi-personal/performance/selectTargetInfoListByTargetIds",
    method: "post",
    data,
  });
}
//提交数据
export function sendPerformanceTargetData(data) {
  return axios({
    url: "/ifi-personal/batchApprovePerformance/batchUpadateUserTargetData",
    method: "post",
    data,
  });
}

//保存数据
export function savePerformanceTargetData(data) {
  return axios({
    url: "/ifi-personal/batchApprovePerformance/batchSaveUserTargetData",
    method: "post",
    data,
  });
}
//事件回退到未发布的状态
export function backEvent(data, _this) {
  return axios({
    url: "/ifi-personal/valueEventFlow/rollbackPublishingEvent?eventId=" + data,
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("回退成功");
      _this.getEventList();
    }
  });
}
//业绩审批预览查看部门考核汇总表
export function previewDeptKPIGatherData(data) {
  return axios({
    url: "/ifi-personal/batchApprovePerformance/previewDeptKPIGatherData",
    method: "post",
    data,
  });
}
