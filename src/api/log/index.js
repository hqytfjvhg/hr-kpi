import axios from "@/utils/http";
// import store from "@/store";
import { ElMessage } from "element-plus";

export function getLogList(data) {
  return axios({
    url: "/ifi-personal/log/searchLogRecordsByPage",
    method: "post",
    data,
  });
}

//获取日志文件
export function getLogDoc() {
  return axios({
    url: "/ifi-personal/log/searchLogFileRecordsByPage",
    method: "post",
  });
}

//删除日志
export function deleteLog(data, _this) {
  return axios({
    url: "/ifi-personal/log/delLogFile?name=" + data,
    method: "delete",
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("删除成功");
      _this.getLogDoc();
    }
  });
}
//下载日志
export function downLog(data) {
  return axios({
    url: "/ifi-personal/log/downLogFile?name=" + data,
    responseType: "blob",
  })
    .then((res) => {
      if (res.status === 200) {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", data);
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
