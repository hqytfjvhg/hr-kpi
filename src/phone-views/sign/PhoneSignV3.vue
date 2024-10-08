<template>
  <!-- 正在使用此版本 -->
  <div>
    <van-overlay :show="isShowTable">
      <van-loading size="24px" vertical class="loading">加载中...</van-loading>
    </van-overlay>

    <div v-if="!isShowKpiTable && !isShowTable" class="noSign-style">暂无需签名的绩效考评表</div>

    <div class="dynysjcontent" v-if="isShowKpiTable">
      <table
        id="table"
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
          font-size: 0.9rem;
          display: none;
        "
      >
        <tr class="title" style="border: none; font-size: 20px">
          <th colspan="10">
            <img src="../../assets/kyLogo.png" alt="" style="position: absolute; top: 2px; left: 2px; width: 16vw" />
            <span> 东莞凯韵科技有限公司<br />个人绩效月考评表</span>
          </th>
        </tr>
        <tr class="plusBGC bold" style="font-size: 0.9rem">
          <th colspan="2" style="width: 6vw">姓名</th>
          <th colspan="2">部门</th>
          <th colspan="2">职务</th>
          <th colspan="1">考核月份</th>
          <th colspan="3" style="width: 12vw">依据标准</th>
        </tr>
        <tr style="height: 3vh; font-size: 0.8rem; border: 1px solid black">
          <td colspan="2">{{ previewKpiHistoryData.name }}</td>
          <td colspan="2">{{ previewKpiHistoryData.deptName }}</td>
          <td colspan="2">{{ previewKpiHistoryData.position }}</td>
          <td colspan="1">{{ previewKpiHistoryData.valueInfoList[0].month }}月</td>
          <td colspan="3">依每月《部门绩效考核汇总表》进行</td>
        </tr>
        <tr class="plusBGC bold" style="font-size: 1rem">
          <th colspan="10">业绩指标考评（70%）</th>
        </tr>
        <tr style="font-weight: 700; height: 1.5rem; font-size: 0.8rem; border: 1px solid black">
          <th style="width: 2rem">NO.</th>
          <th style="width: 7rem">指标名称</th>
          <th style="width: 2rem">权重</th>
          <th style="width: 3rem">目标值</th>
          <th style="width: 3rem">实现值</th>
          <th style="width: 4rem">指标得分</th>
          <th style="width: 4rem">实际得分</th>
          <th colspan="3" style="width: 18rem">备注（加分说明）</th>
        </tr>
        <tr
          v-for="(item, index) in previewKpiHistoryData.targetInfoList"
          :key="index"
          style="height: 1.5rem; font-size: 0.8rem; border: 1px solid black"
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
        <tr class="bold" style="height: 1.5rem; font-size: 0.9rem; font-weight: 700; border: 1px solid black">
          <th colspan="2">业绩实际得分</th>
          <th colspan="8">{{ previewKpiHistoryData.performanceActualScore }}</th>
        </tr>
        <tr
          class="plusBGC"
          style="height: 1.5rem; font-size: 1rem; font-weight: 700; background-color: #a6a6a6; border: 1px solid black"
        >
          <th colspan="10">价值观指标考评（30%,每条做到为1分，反之0分，共16分）</th>
        </tr>
        <tr style="font-weight: 700; height: 1.5rem; font-size: 0.8rem; border: 1px solid black" class="valueHeader">
          <th>NO.</th>
          <th>价值观</th>
          <th colspan="4">行为描述</th>
          <th>自评</th>
          <th style="width: 15rem !important">案例（带*号的需要提供）</th>
          <th style="width: 3rem">上级评</th>
          <th style="width: 12rem">备注</th>
        </tr>
        <tr
          v-for="(item, index) in previewKpiHistoryData.valueInfoList"
          :key="index"
          style="height: 1.5rem; border: 1px solid black"
          :style="{ backgroundColor: item.index % 2 === 0 ? '#D8D8D8' : '' }"
          class="item"
        >
          <td style="z-index: 99">{{ index + 1 }}</td>
          <td
            style="
              text-align: left;
              padding-left: 3px;
              z-index: 99;
              width: 7rem;
              word-wrap: break-word;
              word-break: break-all;
            "
          >
            {{ item.valuDescription }}
          </td>
          <td
            colspan="4"
            style="text-align: left; padding-left: 3px; width: 12rem; word-wrap: break-word; word-break: break-all"
          >
            <div v-html="item.actionDescription"></div>
          </td>
          <td>{{ item.selfScore }}</td>
          <td style="width: 15rem !important; word-wrap: break-word; word-break: break-all">{{ item.example }}</td>
          <td>{{ item.hrScore }}</td>
          <td style="width: 12rem !important; word-wrap: break-word; word-break: break-all">
            <span v-for="(remark, index) in item.remark.split('$')" :key="index"
              ><span v-if="remark.split('：')[1] !== '未备注'"
                ><span v-if="remark.split(':')[1] !== '未备注'"
                  >{{ remark }} <br v-if="index !== item.remark.split('$').length - 1" /></span
              ></span>
            </span>
          </td>
        </tr>

        <tr class="bold" style="height: 1.5rem; font-size: 0.9rem; font-weight: 700; border: 1px solid black">
          <th colspan="2">价值观总得分</th>
          <th colspan="8">{{ previewKpiHistoryData.valueTotalScore }}</th>
        </tr>
        <tr class="bold" style="height: 1.5rem; font-size: 0.9rem; font-weight: 700; border: 1px solid black">
          <th colspan="2">价值观实际得分</th>
          <th colspan="8" id="valueActuslStyle">{{ previewKpiHistoryData.valueActualScore }}</th>
        </tr>
        <tr class="bold" style="height: 1.5rem; font-size: 0.9rem; font-weight: 700; border: 1px solid black">
          <th colspan="2">绩效总分</th>
          <th colspan="8">{{ previewKpiHistoryData.totalScore }}</th>
        </tr>
        <tr class="bold" style="height: 1.5rem; font-size: 0.9rem; font-weight: 700; border: 1px solid black">
          <th colspan="2">奖金系数</th>
          <th colspan="8">{{ previewKpiHistoryData.bonusCoefficient }}</th>
        </tr>
      </table>

      <!-- <div style="font-size: 1rem; font-weight: 700; margin-bottom: 0.2rem">
        {{ previewKpiHistoryData.valueInfoList[0].name + previewKpiHistoryData.valueInfoList[0].month + "月绩效确认" }}
      </div> -->

      <table border="1" color="black" align="center" cellspacing="0" cellpadding="0" class="table2-style">
        <tr class="title" style="border: none; font-size: 1rem">
          <th colspan="10">
            <img src="../../assets/kyLogo.png" alt="" style="position: absolute; top: 1rem; left: 1rem; width: 16vw" />
            <span> 东莞凯韵科技有限公司<br />个人绩效月考评表</span>
          </th>
        </tr>
        <tr class="plusBGC bold">
          <th colspan="2">姓名</th>
          <th colspan="2">部门</th>
          <th colspan="2">职务</th>
          <th colspan="1">考核月份</th>
        </tr>
        <tr style="height: 3vh; font-size: 0.8rem; border: 1px solid black">
          <td colspan="2">{{ previewKpiHistoryData.name }}</td>
          <td colspan="2">{{ previewKpiHistoryData.deptName }}</td>
          <td colspan="2">{{ previewKpiHistoryData.position }}</td>
          <td colspan="1">{{ previewKpiHistoryData.valueInfoList[0].month }}月</td>
        </tr>
        <tr class="plusBGC bold" style="font-size: 0.9rem">
          <th colspan="10">业绩指标考评（70%）</th>
        </tr>
        <tr class="bold">
          <th style="width: 1vw">NO.</th>
          <th style="width: 15vw">指标名称</th>
          <th style="width: 5vw">权重</th>
          <th style="width: 8vw">目标值</th>
          <th style="width: 8vw">实现值</th>
          <th style="width: 12vw">指标得分</th>
          <th style="width: 12vw">实际得分</th>
        </tr>
        <tr
          v-for="(item, index) in previewKpiHistoryData.targetInfoList"
          :key="index"
          style="height: 3vh; font-size: 0.8rem; border: 1px solid black"
        >
          <td>{{ index + 1 }}</td>
          <td>{{ item.targetName }}</td>
          <td>{{ item.weight }}</td>
          <td>{{ item.goalValue }}</td>
          <td>{{ item.realizedValue }}</td>
          <td>{{ item.targetScore }}</td>
          <td>{{ item.weightedTargetScore }}</td>
        </tr>
        <tr class="bold">
          <th colspan="2">业绩实际得分</th>
          <th colspan="8">{{ previewKpiHistoryData.performanceActualScore }}</th>
        </tr>
        <tr class="bold">
          <th colspan="2">价值观总得分</th>
          <th colspan="8">{{ previewKpiHistoryData.valueTotalScore }}</th>
        </tr>
        <tr class="bold">
          <th colspan="2">价值观实际得分</th>
          <th colspan="8" id="valueActuslStyle">{{ previewKpiHistoryData.valueActualScore }}</th>
        </tr>
        <tr class="bold">
          <th colspan="2">绩效总分</th>
          <th colspan="8">{{ previewKpiHistoryData.totalScore }}</th>
        </tr>
        <tr class="bold">
          <th colspan="2">奖金系数</th>
          <th colspan="8">{{ previewKpiHistoryData.bonusCoefficient }}</th>
        </tr>
      </table>
    </div>
    <!-- <div id="table-img" style="width: 100vw; height: 50vh; overflow-y: scroll; overflow-x: scroll"></div> -->
    <!-- <van-button @click="makeImage">生成图片</van-button> -->
    <div style="text-align: right; padding: 0 0.8rem" v-if="isShowKpiTable">
      <van-button @click="reView" style="padding: 0 1rem" size="small" type="primary">预览</van-button>
    </div>

    <div style="margin-top: 0.8rem">
      <!-- 已签名 -->
      <img
        :src="getImageUrl(previewKpiHistoryData)"
        style="width: 80%; height: 20vh"
        alt="未找到"
        v-if="previewKpiHistoryData.signName != null"
      />
      <!-- <div v-if="isShowKpiTable && previewKpiHistoryData.signName == null">签名区</div> -->
      <div v-if="previewKpiHistoryData.signTime !== null" style="font-size: 20px; margin-bottom: 70px">
        {{ previewKpiHistoryData.signTime }}
      </div>
      <div class="sign-style" v-else>
        <van-signature ref="signature" background-color="#eee" @submit="onSubmit" />
      </div>
    </div>
    <van-image-preview v-model:show="reViewDialog" :images="images" :closeable="true" :vertical="true">
      <template #image="{ src, style, onLoad }">
        <img :src="src" :style="[{ maxWidth: '70%', height: auto, marginTop: '2vh' }, style]" @load="onLoad" />
      </template>
    </van-image-preview>
    <TabBar index="sign" />
  </div>
</template>

<script>
import { getSelfPerformanceInfo, saveSignature, saveSignature2 } from "@/api/visualization/index";
import store from "@/store";
import html2canvas from "html2canvas";
import { nextTick } from "vue";
import TabBar from "@/phone-views/home/PhoneLayout";
import { showConfirmDialog } from "vant";

export default {
  components: { TabBar },
  data() {
    return {
      previewKpiHistoryData: [],
      isShowKpiTable: false, //是否有数据展示
      // isSign: false, //控制签名的弹窗
      // isShowSignButton: true, //签名按钮的显示
      // imgSrc: "", //签名图片的地址
      // context: null,
      // lastX: 0,
      // lastY: 0,
      // painting: false,
      year: "",
      month: "",
      // isPhoneSign: false, //手机签
      // qrcode: null, //解决重复生成二维码问题
      tableImg: "", //表格图片
      images: [], //查看大图使用的数据
      reViewDialog: false, //是否查看大图
      isShowTable: false, //控制表格转换为图片的loading
      apiBaseUrl: process.env.VUE_APP_API_BASE_URL,
    };
  },
  mounted() {
    this.year = store.state.year;
    this.month = store.state.criticalMonth;
    this.getSelfPerformanceData();
  },

  methods: {
    //绩效考评表的数据
    async getSelfPerformanceData() {
      this.isShowTable = true;

      await getSelfPerformanceInfo().then((res) => {
        if (res.data.code == 0 && res.data.data.name !== null && res.data.data.valueInfoList.length > 0) {
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
      if (this.isShowKpiTable) {
        //手机端的标题
        // const date = this.previewKpiHistoryData.valueInfoList[0];
        // document.title = date.name + date.month + "月绩效确认";

        nextTick(() => {
          this.makeImage();
        });
      } else {
        this.isShowTable = false;
      }
      this.$refs.signature.clear();
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
    getImageUrl(rowData) {
      return `${process.env.VUE_APP_API_BASE_URL}${rowData.signName}&userId=${this.$store.state.userId}&token=${this.$store.state.token}&year=${rowData.valueInfoList[0].year}&month=${rowData.valueInfoList[0].month}`;
    },

    //生成图片
    makeImage() {
      // this.isShowTable = true;
      var node = document.getElementById("table");
      node.style.display = "block";
      // console.log(node, 999);

      let _this = this;

      html2canvas(node, {
        scrollY: -window.scrollY,
        scrollX: -window.scrollX,
        logging: true,
        scale: 2,
      }).then(function (canvas) {
        node.style.display = "none";
        // var container = document.getElementById("table-img");
        // canvas.style.width = container.clientWidth + "px";
        // canvas.style.height = container.clientHeight + "px";
        // console.log(canvas, 888);
        const img = new Image();
        img.src = canvas.toDataURL();
        _this.images = [img.src];
        // console.log(document.getElementById("table-img"), 999);

        // document.getElementById("table-img").appendChild(canvas);
        _this.isShowTable = false;
        // document.body.appendChild(canvas);
        // console.log(canvas, "canvas");
        // console.log(canvas.style.cssText);
      });
    },
    reView() {
      this.reViewDialog = true;
      // var container = document.getElementById("table-img");
      // var canvas = document.getElementsByName('canvas');
      //   canvas.style.width = container.clientWidth + "px";
      //   canvas.style.height = container.clientHeight + "px";
    },
    //提交签名
    onSubmit(data) {
      showConfirmDialog({
        message: "是否提交【" + this.previewKpiHistoryData.valueInfoList[0].month + "月】签名",
        confirmButtonText: "是",
        cancelButtonText: "否",
      }).then(() => {
        let image = data.canvas.toDataURL("image/png");
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
          // this.getSelfPerformanceData();
        } else {
          formData.append(
            "time",
            this.previewKpiHistoryData.otherMonthUncompletedSign.year +
              "@" +
              this.previewKpiHistoryData.otherMonthUncompletedSign.month,
          );
          saveSignature2(formData, this);
          // this.getSelfPerformanceData();
        }
        image = null;
        bytes = null;
        array = [];
        formData = null;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dynysjcontent {
  margin: auto;
  text-align: center;
  overflow: scroll;
  height: 100%;
  padding: 0.8rem;
}
.noSign-style {
  height: 100vh;
  background-color: #fff;
  font-size: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
table {
  width: max-content;
  margin: auto;
}
.table2-style {
  width: -webkit-fill-available;
}
// :root:root {
//   --van-signature-content-height: 300px !important;
// }
// .van-signature__content {
//   height: 300px !important;
// }
:deep(.van-overlay) {
  background: #fff;
}
.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
:deep(.van-image-preview__close-icon) {
  font-size: 2rem;
}
.bold {
  height: 3vh;
  font-size: 0.8rem;
  font-weight: 700;
  border: 1px solid black;
}
.plusBGC {
  background-color: #a6a6a6;
}
:deep(.van-signature) {
  padding: 0.8rem;
}
// 签名
.sign-style {
  position: relative;
  margin-bottom: 60px;
}
.sign-style::before {
  content: "签名区";
  position: absolute;
  top: 42%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.2); /* 设置半透明灰色 */
  z-index: 1;
  pointer-events: none; /* 确保文字不影响交互 */
  font-size: 4rem;
  width: max-content;
}
</style>
