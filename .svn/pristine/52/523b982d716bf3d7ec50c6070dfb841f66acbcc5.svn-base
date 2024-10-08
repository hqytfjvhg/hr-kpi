import axios from "@/utils/http";
import { ElMessage } from "element-plus";

export function addOrEdit(url, data) {
  return axios({
    url: url,
    method: "post",
    data: data,
  }).then((res) => {
    if (res.data.code === 0) {
      ElMessage.success("操作成功");
    }
    return res.data.data;
  });
}

//下载文件
export function downloadFile(url, title) {
  return axios({
    url: url,
    responseType: "blob",
  })
    .then((res) => {
      if (res.status === 200) {
        let url = window.URL.createObjectURL(new Blob([res.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", title + ".xlsx"); // 或者你需要的文件名
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
