import axios from "@/utils/http";
import { ElMessage } from "element-plus";

//下载模板
export function downTemplate() {
  return axios({
    url: "/ifi-personal/dataImport/downloadEventHistoryDataImportExcel",
    responseType: "blob",
  })
    .then((res) => {
      if (res.status === 200) {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "导入历史数据模板.xlsx"); // 或者你需要的文件名
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

//导入终版数据
export function importEventHistoryData(data) {
  return axios({
    url: "/ifi-personal/dataImport/importEventHistoryData",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("上传成功");
    }
  });
}

//导入价值观数据
export function importValueData(data) {
  return axios({
    url: "/ifi-personal/dataImport/importValueData",
    method: "post",
    data,
  }).then((res) => {
    if (res.data.code == 0) {
      ElMessage.success("导入成功");
    }
  });
}
