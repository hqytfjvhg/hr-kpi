<template>
  <div>
    <div
      v-if="!isShowKpiTable"
      style="height: 55vh; background-color: #fff; border-radius: 10px; padding-top: 20%; font-size: 20px"
    >
      暂无需签名的绩效考评表
    </div>

    <div class="dynysjcontent" v-else>
      <table
        border="1"
        color="black"
        align="center"
        cellspacing="0"
        cellpadding="0"
        style="
          table-layout: fixed;
          position: relative;
          font-family: Microsoft Yahei;
          color: black;
          border-collapse: collapse;
          font-size: 12px;
        "
      >
        <tr class="title" style="border: none; font-size: 20px">
          <th colspan="10">
            <img src="../../assets/kyLogo.png" alt="" style="position: absolute; top: 2px; left: 2px" />
            <span> 东莞凯韵科技有限公司<br />个人绩效月考评表</span>
          </th>
        </tr>
        <tr
          class="plusBGC"
          style="font-size: 12px; border: 1px solid black; height: 3.8vh; background-color: #a6a6a6; font-weight: 700"
        >
          <th colspan="2" style="width: 10vw">姓名</th>
          <th colspan="2">部门</th>
          <th colspan="2">职务</th>
          <th style="width: 70px">考核月份</th>
          <th colspan="3" style="width: 12vw">依据标准</th>
        </tr>
        <tr style="height: 3.8vh; font-size: 12px; border: 1px solid black">
          <td colspan="2">{{ previewKpiHistoryData.name }}</td>
          <td colspan="2">{{ previewKpiHistoryData.deptName }}</td>
          <td colspan="2">{{ previewKpiHistoryData.position }}</td>
          <td>{{ previewKpiHistoryData.valueInfoList[0].month }}月</td>
          <td colspan="3" class="standard" style="width: 12vw">依每月《部门绩效考核汇总表》进行</td>
        </tr>
        <tr
          class="plusBGC"
          style="height: 3.5vh; font-size: 16px; font-weight: 700; background-color: #a6a6a6; border: 1px solid black"
        >
          <th colspan="10">业绩指标考评（70%）</th>
        </tr>
        <tr style="font-weight: 700; height: 3.8vh; font-size: 12px; border: 1px solid black">
          <th class="noWidth" style="width: 35px">NO.</th>
          <th style="width: 136px">指标名称</th>
          <th style="width: 60px">权重</th>
          <th style="width: 80px">目标值</th>
          <th style="width: 60px">实现值</th>
          <th style="width: 60px">指标得分</th>
          <th>实际得分</th>
          <th colspan="3" style="width: 319px">备注（加分说明）</th>
        </tr>
        <tr
          v-for="(item, index) in previewKpiHistoryData.targetInfoList"
          :key="index"
          style="height: 32px; font-size: 12px; border: 1px solid black"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ item.targetName }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.goalValue }}</td>
          <td>{{ item.realizedValue }}</td>
          <td>{{ item.targetScore }}</td>
          <td>{{ item.weightedTargetScore }}</td>
          <td colspan="3">
            <span v-for="(remark, index) in item.mark.split('@')" :key="index"
              >{{ remark }}<br v-if="index !== item.mark.split('@').length - 1" />
            </span>
          </td>
        </tr>
        <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
          <th colspan="2">业绩实际得分</th>
          <th colspan="8">{{ previewKpiHistoryData.performanceActualScore }}</th>
        </tr>
        <tr
          class="plusBGC"
          style="height: 3.8vh; font-size: 16px; font-weight: 700; background-color: #a6a6a6; border: 1px solid black"
        >
          <th colspan="10">价值观指标考评（30%,每条做到为1分，反之0分，共16分）</th>
        </tr>
        <!-- <thead>
              <tr style="font-weight: 700; height: 3.8vh; font-size: 12px; border: 1px solid black" class="valueHeader">
                <th class="noWidth">NO.</th>
                <th style="width: 180px">价值观</th>
                <th colspan="4">行为描述</th>
                <th>自评</th>
                <th style="width: 319px">案例（带*号的需要提供）</th>
                <th style="width: 80px">上级评</th>
              </tr>
            </thead> -->
        <tr style="font-weight: 700; height: 3.8vh; font-size: 12px; border: 1px solid black" class="valueHeader">
          <th class="noWidth">NO.</th>
          <th style="width: 160px">价值观</th>
          <th colspan="4">行为描述</th>
          <th>自评</th>
          <th style="width: 319px">案例（带*号的需要提供）</th>
          <th style="width: 80px">上级评</th>
          <th style="width: 160px">备注</th>
        </tr>
        <tr
          v-for="(item, index) in previewKpiHistoryData.valueInfoList"
          :key="index"
          style="height: 3.9vh; border: 1px solid black"
          :style="{ backgroundColor: item.index % 2 === 0 ? '#D8D8D8' : '' }"
          class="item"
        >
          <td v-if="item.rowspan" :rowspan="item.rowspan">{{ item.index }}</td>
          <td :rowspan="item.rowspan" v-if="item.rowspan" style="text-align: left; padding-left: 3px">
            {{ item.valuDescription }}
          </td>
          <td colspan="4" style="text-align: left; padding-left: 3px"><div v-html="item.actionDescription"></div></td>
          <td>{{ item.selfScore }}</td>
          <td>{{ item.example }}</td>
          <td>{{ item.hrScore }}</td>
          <td>
            <span v-for="(remark, index) in item.remark.split('$')" :key="index"
              ><span v-if="remark.split('：')[1] !== '未备注'"
                ><span v-if="remark.split(':')[1] !== '未备注'"
                  >{{ remark }} <br v-if="index !== item.remark.split('$').length - 1" /></span
              ></span>
            </span>
          </td>
        </tr>

        <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
          <th colspan="2">价值观总得分</th>
          <th colspan="8">{{ previewKpiHistoryData.valueTotalScore }}</th>
        </tr>
        <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
          <th colspan="2">价值观实际得分</th>
          <th colspan="8" id="valueActuslStyle">{{ previewKpiHistoryData.valueActualScore }}</th>
        </tr>
        <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
          <th colspan="2">绩效总分</th>
          <th colspan="8">{{ previewKpiHistoryData.totalScore }}</th>
        </tr>
        <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
          <th colspan="2">奖金系数</th>
          <th colspan="8">{{ previewKpiHistoryData.bonusCoefficient }}</th>
        </tr>
        <!-- <tr class="plusBGC" style="height: 3.8vh; font-size: 16px; font-weight: 700; background-color: #a6a6a6">
          <th colspan="9">
            部门负责人意见 <br />
            （记录被考核人员本月绩效的优势与薄弱点）
          </th>
        </tr>
        <tr class="opinionText" style="height: 10vh; border: 1px solid black">
          <td colspan="9"></td>
        </tr> -->
        <tr
          class="plusBGC"
          style="height: 29px; font-size: 16px; font-weight: 700; background-color: #a6a6a6; border: 1px solid black"
        >
          <th colspan="10">注意事项</th>
        </tr>
        <tr class="precautions" style="text-align: left; height: 5.2vh; border: 1px solid black">
          <td colspan="10">
            1、审批流程：HR编制--部门负责人与被考核人员确认---HR确认并归档； <br />
            2、每月13日前部门负责人确认完毕交人事行政部。
          </td>
        </tr>
        <tr
          class="plusBGC"
          style="height: 29px; font-size: 16px; font-weight: 700; background-color: #a6a6a6; border: 1px solid black"
        >
          <!-- <th colspan="9">审批意见</th> -->
          <th colspan="10">签名</th>
        </tr>
        <tr class="bold" style="height: 3.9vh; font-size: 13px; font-weight: 700; border: 1px solid black">
          <!-- <th colspan="2">编制/日期</th> -->
          <th colspan="2" rowspan="2">被考核人/日期</th>
          <td colspan="8" rowspan="2">
            <!-- 已经有签名了 -->
            <img
              :src="getImageUrl(previewKpiHistoryData)"
              style="width: 250px; height: 8vh"
              alt="未找到"
              v-if="previewKpiHistoryData.signName != null"
            />
            <span v-if="previewKpiHistoryData.signTime !== null" style="font-size: 20px">{{
              previewKpiHistoryData.signTime
            }}</span>

            <el-button
              @click="changeSign"
              type="warning"
              v-if="isShowSignButton && previewKpiHistoryData.signName == null"
              >电脑签名</el-button
            >
            <el-button
              type="warning"
              @click="makeQRCode"
              v-if="isShowSignButton && previewKpiHistoryData.signName == null"
              >手机签名</el-button
            >

            <!-- 上传后显示的图片，没有刷新数据，所以signName为空 -->
            <!-- <img
              :src="imgSrc"
              alt=""
              width="200"
              height="35"
              style="width: 250px; height: 8vh"
              v-if="imgSrc != '' && previewKpiHistoryData.signName == null"
            /> -->
          </td>
          <!-- <th colspan="2">部门负责人/日期</th> -->
          <!-- <th colspan="2">人事行政部/日期</th> -->
        </tr>
        <tr style="height: 3.9vh; border: 1px solid black">
          <!-- <td colspan="2"></td> -->
          <!-- <td colspan="9">
            <img
              :src="
                previewKpiHistoryData.signName +
                '&userId=' +
                $store.state.userId +
                '&token=' +
                $store.state.token +
                '&year=' +
                this.year +
                '&month=' +
                this.month
              "
              style="width: 200px; height: 35px"
              alt="未找到"
              v-if="previewKpiHistoryData.signName != null"
            />
            <el-button
              @click="changeSign"
              type="warning"
              v-if="isShowSignButton && previewKpiHistoryData.signName == null"
              >签名</el-button
            >

            <img
              :src="imgSrc"
              alt=""
              width="200"
              height="35"
              style="width: 200px; height: 35px"
              v-if="imgSrc != '' && previewKpiHistoryData.signName == null"
            />
          </td> -->
          <!-- <td colspan="2"></td>
          <td colspan="2"></td> -->
        </tr>
      </table>
    </div>

    <el-dialog v-model="isSign" ref="dialog" width="50%" height="50%" :before-close="handleClose" align-center>
      <div style="font-size: 18px; margin-bottom: 20px">
        正在确认{{ previewKpiHistoryData.valueInfoList[0].year }}年{{
          previewKpiHistoryData.valueInfoList[0].month
        }}月绩效
      </div>
      <div style="margin-bottom: 20px">请使用鼠标写下自己的名字</div>
      <div style="height: 300px">
        <canvas id="signatureCanvas" ref="signaturecanvas"></canvas>
      </div>
      <div>
        <el-button @click="clearCanvas" type="info">清除</el-button>
        <el-button @click="saveCanvas" type="warning">上传</el-button>
        <el-button type="primary" @click="handleClose">关闭</el-button>
      </div>
    </el-dialog>
    <el-dialog v-model="isPhoneSign" @close="onDialogClose" title="手机扫码确认签名" width="240">
      <div id="qrcode" style="width: 200px; height: 200px; text-align: center"></div>
    </el-dialog>
  </div>
</template>

<script>
import { saveSignature, getSelfPerformanceInfo, saveSignature2 } from "@/api/visualization/index";
import { ElMessageBox, ElMessage } from "element-plus";
import store from "@/store";
import QRCode from "qrcodejs2";

export default {
  data() {
    return {
      previewKpiHistoryData: [],
      isShowKpiTable: false, //是否有数据展示
      isSign: false, //控制签名的弹窗
      isShowSignButton: true, //签名按钮的显示
      imgSrc: "", //签名图片的地址
      context: null,
      lastX: 0,
      lastY: 0,
      painting: false,
      year: "",
      month: "",
      isPhoneSign: false, //手机签
      phoneSignData: "",
      qrcode: null, //解决重复生成二维码问题
    };
  },
  mounted() {
    this.year = store.state.year;
    this.month = store.state.criticalMonth;
    this.getSelfPerformanceData();
  },

  methods: {
    //绩效考评表的数据
    getSelfPerformanceData() {
      getSelfPerformanceInfo().then((res) => {
        if (res.data.code == 0 && res.data.data.name !== null) {
          res.data.data.valueInfoList = res.data.data.valueInfoList.map((item) => {
            if (item.deptRemark && item.hrRemark) {
              const remark = item.deptRemark + item.hrRemark;
              return { ...item, remark: remark };
            }
          });
          this.previewKpiHistoryData = res.data.data;
          this.combineCell(this.previewKpiHistoryData.valueInfoList);
          this.isShowKpiTable = true;
        } else if (res.data.data.name == null && res.data.data.signName == null) {
          this.previewKpiHistoryData = [];
        }
      });
    },
    // 合并
    combineCell(dataList) {
      // let list = this.previewKpiHistoryData.valueInfoList;
      let index = 0;
      for (let i = 0; i < dataList.length; i++) {
        // 循环开始行
        let startRow;
        // 需合并的行数
        let rowspan = 1;

        // 循环到最后一行时
        if (i === dataList.length - 1) {
          // 如果最后一行和倒数第二行属性不同，则rowspan=1；否则直接结束循环
          if (dataList[i].valuDescription !== dataList[i - 1].valuDescription) {
            dataList[i].rowspan = rowspan;
          }
          break;
        }
        // 内层循环记录rowspan的数量
        for (let j = i; j < dataList.length - 1; j++) {
          // 记录循环结束的行数
          startRow = j;
          // 属性相同则rowspan+1；否则直接结束内循环
          if (dataList[j].valuDescription === dataList[j + 1].valuDescription) {
            rowspan++;
          } else {
            break;
          }
        }
        // 为数组添加rowspan属性
        dataList[i].rowspan = rowspan;
        index += 1;
        for (let j = i; j < i + rowspan; j++) {
          dataList[j].index = index;
        }

        // 控制外循环从内循环结束的行数开始
        i = startRow;
      }
      this.previewKpiHistoryData.valueInfoList = dataList;
    },
    changeSign() {
      this.isSign = true;
      this.$nextTick(() => {
        this.initCanvas();
      });
    },
    handleClose() {
      this.isSign = false;
    },
    initCanvas() {
      const canvas = document.getElementById("signatureCanvas");
      this.context = canvas.getContext("2d");
      let pageWidth = document.documentElement.clientWidth;
      let pageHeight = document.documentElement.clientHeight;
      canvas.width = pageWidth * 0.4;
      canvas.height = pageHeight * 0.3;
      canvas.addEventListener("mousedown", this.startPainting);
      canvas.addEventListener("mousemove", this.paint);
      canvas.addEventListener("mouseup", this.stopPainting);
      canvas.addEventListener("mouseleave", this.stopPainting);
    },
    startPainting(event) {
      this.painting = true;
      [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
    },
    paint(event) {
      if (!this.painting) return;
      this.context.lineWidth = 12;
      this.context.lineCap = "round";
      this.context.strokeStyle = "#000";
      this.context.beginPath();
      this.context.moveTo(this.lastX, this.lastY);
      [this.lastX, this.lastY] = [event.offsetX, event.offsetY];
      this.context.lineTo(this.lastX, this.lastY);
      this.context.stroke();
    },
    stopPainting() {
      this.painting = false;
    },
    clearCanvas() {
      this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
    },
    saveCanvas() {
      // console.log(this.context.canvas.toDataURL());
      let message;
      if (this.previewKpiHistoryData.otherMonthUncompletedSign == null) {
        message = "是否确定上传签名，一旦上传不可更改";
      } else {
        message = "签名上传成功后跳转到下一月份的绩效确认";
      }
      ElMessageBox.confirm(message, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.uploadImage();
        })
        .catch((e) => {
          console.log(e);
          ElMessage.info("取消上传");
        });
    },
    //上传代码
    uploadImage() {
      const image = this.context.canvas.toDataURL("image/png");
      // console.log("图片地址", image);

      var bytes = window.atob(image.split(",")[1]);

      var array = [];
      for (var i = 0; i < bytes.length; i++) {
        array.push(bytes.charCodeAt(i));
      }
      var blob = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
      var formData = new FormData();
      formData.append("file", blob, ".jpeg");

      if (this.previewKpiHistoryData.otherMonthUncompletedSign == null) {
        formData.append("month", this.previewKpiHistoryData.valueInfoList[0].month);
        //上传图片
        saveSignature(formData, this);
      } else {
        formData.append(
          "time",
          this.previewKpiHistoryData.otherMonthUncompletedSign.year +
            "@" +
            this.previewKpiHistoryData.otherMonthUncompletedSign.month,
        );
        saveSignature2(formData, this);
      }

      // console.log(formData, "上传图片数据");

      // this.imgSrc = image;
      // this.isShowSignButton = false;

      this.handleClose();
      //上传完后
      // const link = document.createElement("a");
      // link.download = "signature.png";
      // link.href = image;
      // link.click();
    },
    getImageUrl(rowData) {
      return `${process.env.VUE_APP_API_BASE_URL}${rowData.signName}&userId=${this.$store.state.userId}&token=${this.$store.state.token}&year=${this.year}&month=${this.month}`;
    },
    //生成二维码
    makeQRCode() {
      if (this.previewKpiHistoryData.otherMonthUncompletedSign == null) {
        this.phoneSignData =
          "token=" +
          store.state.token +
          "&userId=" +
          store.state.userId +
          "&month=" +
          this.previewKpiHistoryData.valueInfoList[0].month;
      } else {
        this.phoneSignData =
          "token=" +
          store.state.token +
          "&userId=" +
          store.state.userId +
          "&time=" +
          this.previewKpiHistoryData.otherMonthUncompletedSign.year +
          "@" +
          this.previewKpiHistoryData.otherMonthUncompletedSign.month;
      }
      this.isPhoneSign = true;
      this.$nextTick(() => {
        if (this.qrcode) {
          // 如果二维码对象已存在，则更新链接
          this.qrcode.clear(); // 清除之前的二维码
          // this.qrcode.makeCode(window.location.origin + "/#/kpi/phoneSignCopy?" + this.phoneSignData); // 生成新的二维码
        } else {
          this.qrcode = new QRCode(document.getElementById("qrcode"), { width: 200, height: 200 });
        }
        // console.log(window.location.origin + "/#/kpi/phoneSignCopy?" + this.phoneSignData);
        // this.qrcode = new QRCode(document.getElementById("qrcode"), { width: 200, height: 200 });
        this.qrcode.makeCode(window.location.origin + "/#/kpi/phoneSignCopy?" + this.phoneSignData);
      });
    },
    // onDialogOpen() {
    //   this.isPhoneSign = true;
    //   this.makeQRCode(); // 在对话框打开时生成二维码
    // },
    onDialogClose() {
      this.isPhoneSign = false;
    },
  },
};
</script>

<style lang="scss" scoped>
canvas {
  border: 4px solid rgb(229 231 235);
  border-radius: 0.5rem;
}
.dynysjcontent {
  margin: auto;
  text-align: center;
  // height: 808px;
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
}
table {
  margin: auto;
  // background-color: #fff;
}
</style>
