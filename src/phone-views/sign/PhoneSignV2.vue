<template>
  <div class="phone-style">
    <!-- <van-nav-bar title="签名" left-text="返回" left-arrow @click-left="$router.push({ name: 'PhoneHome' })" /> -->
    <div v-if="!isShowKpiTable" style="height: 100%; background-color: #fff; font-size: 20px">
      <div style="padding-top: 50%">暂无需签名的绩效考评表</div>
    </div>

    <div class="dynysjcontent" v-else>
      <van-cell
        :title="previewKpiHistoryData.name"
        size="large"
        :value="previewKpiHistoryData.position"
        :label="previewKpiHistoryData.deptName"
      ></van-cell>
      <van-cell
        title="业绩"
        is-link
        size="large"
        :to="{
          path: '/phone/sign/details',
          query: {
            name: 'performance',
            data: JSON.stringify(previewKpiHistoryData.targetInfoList),
            date:
              previewKpiHistoryData.valueInfoList[0]?.year +
              '年' +
              previewKpiHistoryData.valueInfoList[0]?.month +
              '月',
          },
        }"
      />
      <van-cell
        title="价值观"
        is-link
        size="large"
        :to="{
          path: '/phone/sign/value',
          query: {
            name: 'value',
            data: JSON.stringify(previewKpiHistoryData.valueInfoList),
            date:
              previewKpiHistoryData.valueInfoList[0]?.year +
              '年' +
              previewKpiHistoryData.valueInfoList[0]?.month +
              '月',
          },
        }"
      />
      <van-cell size="large" title="自评总得分" :value="selfTotalScore + '分'"></van-cell>
      <van-cell size="large" title="价值观总得分" :value="previewKpiHistoryData.valueTotalScore + '分'"></van-cell>
      <van-cell size="large" title="价值观实际得分" :value="previewKpiHistoryData.valueActualScore + '分'"></van-cell>
      <van-cell
        size="large"
        title="业绩实际得分"
        :value="previewKpiHistoryData.performanceActualScore + '分'"
      ></van-cell>
      <van-cell size="large" title="绩效总分" :value="previewKpiHistoryData.totalScore + '分'"></van-cell>
      <van-cell size="large" title="奖金系数" :value="previewKpiHistoryData.bonusCoefficient"></van-cell>

      <div class="sign-style">
        <!-- 已签名 -->
        <img
          :src="getImageUrl(previewKpiHistoryData)"
          style="width: 250px; height: 8vh"
          alt="未找到"
          v-if="previewKpiHistoryData.signName != null"
        />
        <span v-if="previewKpiHistoryData.signTime !== null" style="font-size: 20px">{{
          previewKpiHistoryData.signTime
        }}</span>
        <van-signature @submit="onSubmit" @clear="onClear" v-else />
      </div>
    </div>
    <TabBar index="sign" />
  </div>
</template>

<script>
import { saveSignature, getSelfPerformanceInfo, saveSignature2 } from "@/api/visualization/index";
import TabBar from "@/phone-views/home/PhoneLayout";
import store from "@/store";

export default {
  components: { TabBar },
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
      activeNames: ["1"],
      selfTotalScore: 0, //自评总得分
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
        if (res.data.code == 0 && res.data.data.name !== null && res.data.data.valueInfoList.length > 0) {
          res.data.data.valueInfoList = res.data.data.valueInfoList.map((item) => {
            this.selfTotalScore += item.selfScore;
            if (item.deptRemark && item.hrRemark) {
              const remark = item.deptRemark + item.hrRemark;
              return { ...item, remark: remark };
            }
          });
          this.previewKpiHistoryData = res.data.data;
          this.isShowKpiTable = true;

          //手机端的标题
          const date = this.previewKpiHistoryData.valueInfoList[0];
          document.title = date.name + date.year + "年" + date.month + "月绩效确认";
        } else if (res.data.data.name == null && res.data.data.signName == null) {
          this.previewKpiHistoryData = [];
          this.isShowKpiTable = false;
        }
        // if (this.previewKpiHistoryData.otherMonthUncompletedSign == null) {
        //   this.phoneSignData =
        //     "?token=" +
        //     store.state.token +
        //     "&name=" +
        //     store.state.name +
        //     "&month=" +
        //     this.previewKpiHistoryData.valueInfoList[0].month;
        // } else {
        //   this.phoneSignData =
        //     "?token=" +
        //     store.state.token +
        //     "&name=" +
        //     store.state.name +
        //     "&time=" +
        //     this.previewKpiHistoryData.otherMonthUncompletedSign.year +
        //     "@" +
        //     this.previewKpiHistoryData.otherMonthUncompletedSign.month;
        // }
      });
    },
    getImageUrl(rowData) {
      return `${process.env.VUE_APP_API_BASE_URL}${rowData.signName}&userId=${this.$store.state.userId}&token=${this.$store.state.token}&year=${rowData.valueInfoList[0].year}&month=${rowData.valueInfoList[0].month}`;
    },
    onClear() {},
    onSubmit(data) {
      const image = data.canvas.toDataURL("image/png");
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
    },
  },
};
</script>

<style lang="scss" scoped>
.phone-style {
  height: 95vh;
  background-color: #f7f8fa;
}
.dynysjcontent {
  text-align: left;
}
.sign-style {
  padding: 10% 0;
  text-align: center;
  background-color: #fff;
}
</style>
