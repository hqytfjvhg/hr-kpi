<template>
  <div>
    <!-- 部门负责人的首页 -->
    <div style="display: flex; justify-content: space-between">
      <div style="width: 70%">
        <div
          style="border-radius: 10px; background-color: #fff; display: flex; border: 1px solid #ebeef5; height: 349px"
        >
          <div style="width: 50%">
            <div
              style="
                margin: 2vh 0 2vh 2vw;
                min-width: 112px;
                font-size: 17px;
                font-weight: 600;
                display: flex;
                align-items: center;
              "
            >
              <img src="@/assets/list.svg" style="width: 3vh; height: 3vh; margin-right: 0.5vw" alt="" />
              待办事项
            </div>
            <!-- <div> -->
            <div v-if="isShowWriteValue" class="ulStyle">
              <span
                ><el-icon style="color: #e6a23c"><WarningFilled /></el-icon
                ><span style="margin-left: 1vw">请填写价值观</span></span
              >
              <router-link to="/kpi/writeValue" style="color: #409eff; text-decoration: none">
                <!-- <el-link type="primary" :underline="false">去填写</el-link> -->
                <span>去填写</span>
              </router-link>
            </div>
            <div v-if="isShowApprovalValue" class="ulStyle">
              <span
                ><el-icon style="color: #e6a23c"><WarningFilled /></el-icon
                ><span style="margin-left: 1vw">请审批价值观</span></span
              >
              <router-link :to="'/kpi/aboutInfo?activeName=' + 'first'" style="color: #409eff; text-decoration: none">
                <!-- <el-link type="primary" :underline="false">去审批</el-link> -->
                <span>去审批</span>
              </router-link>
            </div>
            <div v-if="$store.state.number2 - $store.state.number > 0" class="ulStyle">
              <span>
                <el-icon style="color: #e6a23c"><WarningFilled /></el-icon
                ><span style="margin-left: 1vw">请审批业绩指标</span></span
              >
              <RouterLink :to="'/kpi/aboutInfo?activeName=' + 'second'" style="color: #409eff; text-decoration: none">
                <!-- <el-link type="primary" :underline="false">去审批</el-link> -->
                <span>去审批</span>
              </RouterLink>
            </div>
            <div v-if="signNumber > 0" class="ulStyle">
              <span
                ><el-icon style="color: #e6a23c"><WarningFilled /></el-icon
                ><span style="margin-left: 1vw">请确认绩效月考评表</span></span
              >
              <RouterLink to="/kpi/signatureVisual" style="color: #409eff; text-decoration: none">
                <!-- <el-link type="primary" :underline="false">去确认</el-link> -->
                <span>去确认</span>
              </RouterLink>
            </div>
            <div
              v-if="$store.state.number === 0 && $store.state.number2 === 0 && signNumber === 0"
              style="margin-top: 100px"
            >
              暂无待办事件
            </div>
          </div>
          <!-- <el-calendar
            v-model="value"
            style="width: 55%; margin-top: 5px; border-left: 1px solid rgba(245, 242, 242, 1); margin-left: 2vw"
            ><template #header="{ date }">
              <img src="@/assets/time.svg" style="width: 3vh; height: 3vh; margin-right: 0.5vw" alt="" />
              <span style="font-size: 17px; font-weight: 700">{{ date }}</span></template
            >
          </el-calendar> -->
          <!-- <VCalendar
            style="width: 55%; height: 100%; margin-left: 2vw; border-left: 1px solid rgba(245, 242, 242, 1)"
            :attributes="attributes"
            :columns="columns"
            id="vcalendar"
            borderless
          /> -->
          <CalendarView
            style="
              width: 55%;
              height: 100%;
              margin-left: 2vw;
              border-left: 1px solid rgba(245, 242, 242, 1);
              border-radius: 10px;
            "
          />
        </div>
        <!-- 数据可视化 -->
        <div style="margin-top: 15px">
          <el-card style="text-align: left; border-radius: 10px" shadow="never">
            <template #header>
              <div class="card-header">
                <span>{{ year }}年个人全年绩效情况</span>
              </div>
            </template>
            <div v-if="xAxisOneYear.length == 0" style="height: 250px">暂无数据</div>
            <div v-else id="EChartAllYearKPI" style="width: 100%; height: 250px"></div>
          </el-card>
        </div>

        <div style="margin-top: 15px" v-if="$store.state.role == 'HRMANAGER' || $store.state.role == 'DEPTMANAGER'">
          <el-card style="text-align: left; border-radius: 10px" shadow="never">
            <template #header>
              <div class="card-header">
                <div style="display: flex; align-items: center">
                  {{ year }}年<el-select
                    v-if="$store.state.userInfo.clerkAssociatedDepartmentList.length > 0"
                    v-model="deptId"
                    @change="getDeptAllUserKPI({ year: year, deptId, deptId })"
                  >
                    <el-option
                      v-for="item in relatedDept"
                      :key="item.deptName"
                      :label="item.deptName"
                      :value="item.deptId"
                    /> </el-select
                  >部门全年绩效情况
                </div>
                <!-- <span>{{ year }}年{{ criticalMonth }}月部门KPI得分情况</span> -->
                <!-- <el-button @click="getDeptAllUserKPI">生成</el-button> -->
              </div>
            </template>
            <!-- <div style="color: #e6a23c; margin-left: 20px; margin-bottom: 10px" v-if="newestEventNoInfo">
          暂无{{ criticalMonth }}月份数据，仅显示上一月的数据
        </div> -->
            <div v-if="xAxisAllYear.length == 0" style="height: 250px">暂无数据</div>
            <div v-else id="EchartDeptAllYearKPI" style="width: 100%; height: 250px"></div>
          </el-card>
        </div>
      </div>
      <div style="width: 28%">
        <el-card
          style="text-align: left; border-radius: 10px; margin-bottom: 15px; height: 350px"
          shadow="never"
          v-for="(item, index) in paddedData"
          :key="item"
        >
          <template #header>
            <div class="card-header" v-if="paddedData.length > 0">
              <div v-if="!item.month || item.month === '暂无数据'">暂无数据</div>
              <span v-else>{{ item.month }}<span v-if="index != oneselfKPIAndBonus.length - 1">月（个人）</span></span>
            </div>
          </template>
          <div>
            <div v-if="paddedData.length > 0" class="cardBodyStyle">
              <div class="cardImgStyle">
                <el-tooltip content="价值观得分" placement="top" effect="light">
                  <img src="@/assets/value.svg" class="imgStyle" />
                </el-tooltip>

                <div class="textStyle">
                  {{ item.valueScore }}
                </div>
              </div>
              <div class="cardImgStyle">
                <el-tooltip content="KPI得分" placement="top" effect="light">
                  <img src="@/assets/KPI.svg" class="imgStyle"
                /></el-tooltip>
                <div class="textStyle">
                  {{ item.kpi }}
                </div>
              </div>
              <div class="cardImgStyle">
                <el-tooltip content="奖金系数" placement="top" effect="light">
                  <img src="@/assets/bonus.svg" class="imgStyle"
                /></el-tooltip>
                <div class="textStyle">
                  {{ item.bonusCoefficient }}<span v-if="item.bonusCoefficient !== ''">%</span>
                </div>
              </div>
            </div>

            <div v-else>暂无数据</div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { WarningFilled } from "@element-plus/icons-vue";
import store from "../../store";
import { ElMessage } from "element-plus";
import "font-awesome/css/font-awesome.min.css";
import {
  getSelfPerformanceInfo,
  getOneselfKPIAndBonus,
  getOneselfAllYear,
  getDeptAllYear,
} from "@/api/visualization/index";
import { getEventNumber, selectPerformanceInfo } from "@/api/about/index";
import CalendarView from "../calendar/CalendarView.vue";

export default {
  components: { WarningFilled, CalendarView },
  data() {
    return {
      userName: "111",
      year: new Date().getFullYear(),
      deptYear: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      criticalMonth: "",
      day: new Date().getDate(),
      value: new Date(),
      performanceData: {}, //业绩
      xAxisOneYear: [], //整年的x轴
      yAxisKPI: [], //整年的y轴
      yAxisBonus: [], //整年的y轴
      yAxisValue: [], //个人全年价值观的数据
      KPIScroe: null, //最新月份的数据
      valueScroe: null,
      performanceScroe: null,
      deptAllUser: [], //本部门所有人员
      newestMonth: "", //当前用户查看已保存的最新月
      newestEventNoInfo: false, //判断最新月份是否有数据
      signNumber: null, //判断是否有签名的事件
      yearOptions: [],

      oneselfKPIAndBonus: [], //最新两月的数据
      kpiYearAverage: 0, //全年平均
      bonusYearAverage: 0,
      valueYearAverage: 0,
      xAxisAllYear: [], //部门全年绩效数据
      yAxisAllYearKPI: [],
      yAxisAllYearBonus: [],
      count: 0,
      deptCount: 0,
      isShowWriteValue: false, //判断是否显示去填写价值观
      isShowApprovalValue: false, //判断是否显示审批价值观
      deptId: store.state.deptId, //负责人关联部门
      columns: 1, //日历模块
      attributes: [
        {
          key: "today",
          highlight: true,
          dates: new Date(),
        },
        {
          dot: "red",
          dates: "",
          popover: { label: "填写价值观最后的截止日期" },
        },
        {
          highlight: { start: { fillMode: "outline" }, base: { fillMode: "light" }, end: { fillMode: "outline" } },
          dates: { start: new Date(store.state.userInfo.publishTime), end: "" },
          popover: { label: "填写价值观的时间范围" },
        },
        {
          highlight: { start: { fillMode: "outline" }, base: { fillMode: "light" }, end: { fillMode: "outline" } },
          dates: { start: "", end: "" },
          popover: { label: "审批价值观及录入指标的时间范围" },
        },
      ],
      option: {},
    };
  },
  computed: {
    paddedData() {
      return this.oneselfKPIAndBonus.length > 0
        ? this.oneselfKPIAndBonus
        : Array(3).fill({ month: "暂无数据", valueScore: "", kpi: "", bonusCoefficient: "" });
    },
    relatedDept() {
      store.state.userInfo.clerkAssociatedDepartmentList.push(store.state.deptId);
      return store.state.deptOptions.filter((item) =>
        store.state.userInfo.clerkAssociatedDepartmentList.includes(item.deptId),
      );
    },
  },
  async mounted() {
    setTimeout(() => {}, 100);
    await getEventNumber()
      .then((res) => {
        if (res.data.code == 0) {
          // console.log(res.data.data);
          //价值观待办事件数量
          if (res.data.data.result.find((item) => item.deptFlowState === 0 && item.hrFlowState === 0)) {
            this.isShowWriteValue = true;
          }
          if (res.data.data.result.find((item) => !(item.deptFlowState === 0 && item.hrFlowState === 0))) {
            this.isShowApprovalValue = true;
          }
          store.commit("changeNumber", res.data.data.uncompletedEventNumber);
          store.commit("changeValueResult", res.data.data.result);

          //业绩待办事件数量
          selectPerformanceInfo().then((res) => {
            if (res.data.code == 0) {
              store.commit("changeNumber2", res.data.data.uncompletedEventNumber);
              store.commit("saveMonth", { month: res.data.data.month });
            }
          });
        }
      })
      .catch((e) => {
        console.log(e);
        ElMessage.error("请求失败");
      });

    let nowDate = new Date();
    if (0 < nowDate.getDate() && nowDate.getDate() <= 15) {
      this.criticalMonth = nowDate.getMonth();
      if (this.criticalMonth == 0) {
        this.criticalMonth = 12;
        this.year = nowDate.getFullYear() - 1;
        this.deptYear = nowDate.getFullYear() - 1;
      }
    } else if (15 < nowDate.getDate() && nowDate.getDate() < 32) {
      this.criticalMonth = nowDate.getMonth() + 1;
    }
    for (let i = 2021; i <= this.year + 1; i++) {
      this.yearOptions.push(i);
    }
    store.commit("saveYear", this.year);
    store.commit("saveCriticalMonth", this.criticalMonth);
    store.commit("saveYearOptions", this.yearOptions);

    //处理日历时间
    const nextMonthStart = new Date(this.year, this.month, 1);
    this.attributes[3].dates.start = new Date(this.year, this.month, 1);
    if (store.state.role == "DEPTMANAGER") {
      this.attributes[3].dates.end = new Date(this.year, this.month, 12);
    } else if (store.state.role == "HRMANAGER") {
      this.attributes[3].dates.end = new Date(this.year, this.month, 15);
    }
    this.attributes[1].dates = new Date(nextMonthStart.setDate(nextMonthStart.getDate() - 1));
    this.attributes[2].dates.end = this.attributes[1].dates;
    this.updateColumns();
    window.addEventListener("resize", this.updateColumns);

    this.year = store.state.year;
    this.deptYear = store.state.year;
    this.month = store.state.criticalMonth;
    this.getSelfPerformanceData();

    this.getAllYearKPI({ year: this.year });

    if (store.state.role == "DEPTMANAGER" || store.state.role == "HRMANAGER") {
      this.getDeptAllUserKPI({ year: this.year, deptId: this.deptId });
    }
  },
  methods: {
    //获取整年KPI
    getAllYearKPI(data) {
      getOneselfAllYear(data).then((res) => {
        if (res.data.code == 0 && res.data.data.length > 0) {
          this.count = 2;
          res.data.data.sort((a, b) => a.month - b.month);
          this.xAxisOneYear = res.data.data.map((item) => item.month + "月");
          this.yAxisKPI = res.data.data.map((item) => item.kpi);
          this.yAxisBonus = res.data.data.map((item) => item.bonusCoefficient);
          this.yAxisValue = res.data.data.map((item) => item.valueScore);
          this.yAxisKPI.map((item) => {
            this.kpiYearAverage += Number(item);
          });

          this.yAxisBonus.map((item) => {
            this.bonusYearAverage += Number(item);
          });
          this.yAxisValue.map((item) => {
            this.valueYearAverage += Number(item);
          });

          this.$nextTick(() => {
            this.getRenderer();
          });
        } else if (res.data.code == 0 && res.data.data.length == 0) {
          //第一年没有数据，请求上一年的数据，在1月份会出现
          this.count += 1;

          if (this.count == 1) {
            this.year = this.year - 1;
            this.getAllYearKPI({ year: this.year });
          } else {
            //假设两年都没有数据，年份显示当前年，初始使用时会出现
            this.year = this.year + 1;
          }
        }
        this.getOneselfKPIAndBonus();
      });
    },
    getRenderer() {
      //整年绩效分析
      let EChartAllYearKPI = echarts.init(document.getElementById("EChartAllYearKPI"));

      //控制文本的字段
      const labelOption = {
        show: true,
        position: "top",
        // distance: 15,
        // align: "left",
        // verticalAlign: "middle",
        // rotate: 90,
        //每个数据显示出来，位置在底部里面，旋转了90度，c是y轴的数值，b是x轴的数值，a没有内容
        formatter: "{c}",
        //文字大小
        fontSize: 18,
        color: "black",
      };
      const seriesOption = {
        type: "line",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
      };
      const series = [
        {
          name: "价值观得分",
          data: this.yAxisValue,
          yAxisIndex: 0, // 指定使用左侧Y轴
          ...seriesOption,
        },
        {
          name: "KPI得分",
          data: this.yAxisKPI,
          yAxisIndex: 0, // 指定使用左侧Y轴
          ...seriesOption,
        },
        { name: "奖金系数", data: this.yAxisBonus, yAxisIndex: 1, ...seriesOption },
      ];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        legend: {
          data: ["价值观得分", "KPI得分", "奖金系数"],
        },
        // 工具box，可以转换数据的样式
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            //数据视图
            // dataView: { show: true, readOnly: false },
            //刷新
            restore: { show: true },
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar"] },

            //下载
            // saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //刻度线
            data: this.xAxisOneYear,
            nameLocation: "start",
            nameGap: 0,
            axisLabel: {
              interval: 0, // 显示所有标签（默认可能会间隔显示）
              align: "center", // 标签居中显示（对于 category 类型的 X 轴，默认就是居中）
            },
            boundaryGap: true, // 坐标轴两端留白
          },
        ],
        yAxis: [
          // { type: "value" },
          {
            type: "value",
            name: "得分", // 左侧Y轴名称
            position: "left", // 左侧位置
            min: 0, // 可根据实际情况设置最小值
            max: 25, // 或者自定义最大值
            axisLabel: {
              // show: false,
              formatter: "{value}", // 刻度标签格式化函数，这里直接显示数值
            },
            splitLine: { show: false },
            nameTextStyle: {
              padding: [0, 20, 5, 0], // 上右下左的内边距，尝试调整这里的值以接近居中效果
              lineHeight: 10, // 行高，可以根据实际情况调整
              align: "center", // 文本水平居中
              verticalAlign: "bottom", // 文本垂直居底部，尽可能靠近轴线
            },
          },
          {
            type: "value",
            name: "奖金系数", // 右侧Y轴名称
            position: "right", // 右侧位置
            // data: [0, 80, 100, 120, 140],
            min: 0, // 对于数据差距较大的情况，可能需要手动设定合适的刻度范围
            max: 145,
            // interval: 50,
            axisLabel: {
              // show: false,
              formatter: "{value}",
            },
            splitLine: { show: false }, // 可选，不显示右侧Y轴的网格线（如果不需要）
            nameTextStyle: {
              padding: [0, 0, 5, 25], // 上右下左的内边距，尝试调整这里的值以接近居中效果
              lineHeight: 10, // 行高，可以根据实际情况调整
              align: "center", // 文本水平居中
              verticalAlign: "bottom", // 文本垂直居底部，尽可能靠近轴线
            },
          },
        ],
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          // top: "5%",
          containLabel: true,
        },
        series: series,
      };
      // console.log(1111);
      option && EChartAllYearKPI.setOption(option);

      // window.onresize = EChartAllYearKPI.resize;
      window.addEventListener("resize", function () {
        EChartAllYearKPI.resize();
      });
    },

    async getDeptAllUserKPI(data) {
      await getDeptAllYear(data).then((res) => {
        if (res.data.code == 0 && res.data.data.length > 0) {
          this.deptCount = 2;
          res.data.data.sort((a, b) => a.month - b.month);
          this.xAxisAllYear = res.data.data.map((item) => item.month + "月");
          this.yAxisAllYearKPI = res.data.data.map((item) => item.kpi);
          this.yAxisAllYearBonus = res.data.data.map((item) => item.bonusCoefficient);
          this.yAxisAllYearValue = res.data.data.map((item) => item.valueScore);
          this.$nextTick(() => {
            this.getEchartDeptUser();
          });
        } else if (res.data.code == 0 && res.data.data.length == 0) {
          this.xAxisAllYear = [];
          this.yAxisAllYearKPI = [];
          this.yAxisAllYearBonus = [];
          this.yAxisAllYearValue = [];
          this.deptCount += 1;
          if (this.count == 1) {
            this.deptYear = this.deptYear - 1;
            this.getDeptAllUserKPI({ year: this.year, deptId: this.deptId });
          } else {
            this.deptYear = this.deptYear + 1;
          }
        }
      });
    },
    getEchartDeptUser() {
      // let EchartDeptAllYearKPI = echarts.init(document.getElementById("EchartDeptAllYearKPI"));
      // EchartDeptAllYearKPI.clear();
      let that = this;
      //控制文本的字段
      const labelOption = {
        show: true,
        position: "top",
        //每个数据显示出来，位置在底部里面，旋转了90度，c是y轴的数值，b是x轴的数值，a没有内容
        formatter: "{c}",
        //文字大小
        fontSize: 18,
        color: "black",
      };
      const seriesOption = {
        type: "line",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
      };
      const series = [
        {
          name: "价值观得分",
          data: this.yAxisAllYearValue,
          yAxisIndex: 0,
          ...seriesOption,
        },
        {
          name: "KPI得分",
          data: this.yAxisAllYearKPI,
          yAxisIndex: 0,
          ...seriesOption,
        },
        {
          name: "奖金系数",
          data: this.yAxisAllYearBonus,
          yAxisIndex: 1,
          ...seriesOption,
        },
      ];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        legend: {
          data: ["价值观得分", "KPI得分", "奖金系数"],
        },
        // 工具box，可以转换数据的样式
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            //数据视图
            // restore: { show: true },
            // dataView: { show: true, readOnly: false },
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar"] },
            //刷新
            myTool: {
              show: true,
              title: "切换为折线图",
              icon: "path://M25.6 537.1392a25.6 25.6 0 1 1 0-51.2h141.1072a25.6 25.6 0 0 0 24.5248-18.2272l118.1184-393.7792a51.2 51.2 0 0 1 98.0992 0L665.6 934.4l118.1184-393.728a76.8 76.8 0 0 1 73.5744-54.784H998.4a25.6 25.6 0 1 1 0 51.2h-141.1072a25.6 25.6 0 0 0-24.5248 18.2272l-118.1184 393.7792a51.2 51.2 0 0 1-98.0992 0L358.4 88.6272 240.2816 482.4064a76.8 76.8 0 0 1-73.5744 54.784H25.6z",
              onclick: function () {
                that.changeLine();
                that.randerEcharts();
              },
            },
            //下载
            saveAsImage: { show: true },
          },
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          // top: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //刻度线
            data: this.xAxisAllYear,
            axisLabel: {
              interval: 0, // 显示所有标签（默认可能会间隔显示）
              align: "center", // 标签居中显示（对于 category 类型的 X 轴，默认就是居中）
            },
            boundaryGap: true, // 坐标轴两端留白
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "得分", // 左侧Y轴名称
            position: "left", // 左侧位置
            min: 0, // 可根据实际情况设置最小值
            max: 25, // 或者自定义最大值
            axisLabel: {
              formatter: "{value}", // 刻度标签格式化函数，这里直接显示数值
            },
            axisTick: { show: false }, //刻度线
            splitLine: { show: false },
            nameTextStyle: {
              padding: [0, 20, 5, 0], // 上右下左的内边距，尝试调整这里的值以接近居中效果
              lineHeight: 10, // 行高，可以根据实际情况调整
              align: "center", // 文本水平居中
              verticalAlign: "bottom", // 文本垂直居底部，尽可能靠近轴线
            },
          },
          {
            type: "value",
            name: "奖金系数", // 右侧Y轴名称
            position: "right", // 右侧位置
            min: 0, // 对于数据差距较大的情况，可能需要手动设定合适的刻度范围
            max: 145,
            axisLabel: {
              formatter: "{value}",
            },
            splitLine: { show: false }, // 可选，不显示右侧Y轴的网格线（如果不需要）
            nameTextStyle: {
              padding: [0, 0, 5, 25], // 上右下左的内边距，尝试调整这里的值以接近居中效果
              lineHeight: 10, // 行高，可以根据实际情况调整
              align: "center", // 文本水平居中
              verticalAlign: "bottom", // 文本垂直居底部，尽可能靠近轴线
            },
          },
        ],
        series: series,
      };
      // option && EchartDeptAllYearKPI.setOption(option);

      // window.addEventListener("resize", function () {
      //   EchartDeptAllYearKPI.resize();
      // });
      this.option = option;
      this.randerEcharts();
    },
    randerEcharts() {
      let EchartDeptAllYearKPI = echarts.init(document.getElementById("EchartDeptAllYearKPI"));
      EchartDeptAllYearKPI.clear();
      this.option && EchartDeptAllYearKPI.setOption(this.option);

      window.addEventListener("resize", function () {
        EchartDeptAllYearKPI.resize();
      });
    },
    changeLine() {
      let that = this;
      //控制文本的字段
      const labelOption = {
        show: true,
        position: "top",
        //每个数据显示出来，位置在底部里面，旋转了90度，c是y轴的数值，b是x轴的数值，a没有内容
        formatter: "{c}",
        //文字大小
        fontSize: 18,
        color: "black",
      };
      const seriesOption = {
        type: "line",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
      };
      const series = [
        {
          name: "价值观得分",
          data: this.yAxisAllYearValue,
          yAxisIndex: 0,
          ...seriesOption,
        },
        {
          name: "KPI得分",
          data: this.yAxisAllYearKPI,
          yAxisIndex: 0,
          ...seriesOption,
        },
        {
          name: "奖金系数",
          data: this.yAxisAllYearBonus,
          yAxisIndex: 1,
          ...seriesOption,
        },
      ];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        legend: {
          data: ["价值观得分", "KPI得分", "奖金系数"],
        },
        // 工具box，可以转换数据的样式
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            //数据视图
            // restore: { show: true },
            // dataView: { show: true, readOnly: false },
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar"] },
            //刷新
            myTool: {
              show: true,
              title: "切换为折线图",
              icon: "path://M25.6 537.1392a25.6 25.6 0 1 1 0-51.2h141.1072a25.6 25.6 0 0 0 24.5248-18.2272l118.1184-393.7792a51.2 51.2 0 0 1 98.0992 0L665.6 934.4l118.1184-393.728a76.8 76.8 0 0 1 73.5744-54.784H998.4a25.6 25.6 0 1 1 0 51.2h-141.1072a25.6 25.6 0 0 0-24.5248 18.2272l-118.1184 393.7792a51.2 51.2 0 0 1-98.0992 0L358.4 88.6272 240.2816 482.4064a76.8 76.8 0 0 1-73.5744 54.784H25.6z",
              onclick: function () {
                that.changeLine();
                that.randerEcharts();
              },
            },
            //下载
            saveAsImage: { show: true },
          },
        },

        grid: {
          left: "3%",
          right: "3%",
          bottom: "3%",
          // top: "5%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //刻度线
            data: this.xAxisAllYear,
            axisLabel: {
              interval: 0, // 显示所有标签（默认可能会间隔显示）
              align: "center", // 标签居中显示（对于 category 类型的 X 轴，默认就是居中）
            },
            boundaryGap: true, // 坐标轴两端留白
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "得分", // 左侧Y轴名称
            position: "left", // 左侧位置
            min: 0, // 可根据实际情况设置最小值
            max: 25, // 或者自定义最大值
            axisLabel: {
              formatter: "{value}", // 刻度标签格式化函数，这里直接显示数值
            },
            axisTick: { show: false }, //刻度线
            splitLine: { show: false },
            nameTextStyle: {
              padding: [0, 20, 5, 0], // 上右下左的内边距，尝试调整这里的值以接近居中效果
              lineHeight: 10, // 行高，可以根据实际情况调整
              align: "center", // 文本水平居中
              verticalAlign: "bottom", // 文本垂直居底部，尽可能靠近轴线
            },
          },
          {
            type: "value",
            name: "奖金系数", // 右侧Y轴名称
            position: "right", // 右侧位置
            min: 0, // 对于数据差距较大的情况，可能需要手动设定合适的刻度范围
            max: 145,
            axisLabel: {
              formatter: "{value}",
            },
            splitLine: { show: false }, // 可选，不显示右侧Y轴的网格线（如果不需要）
            nameTextStyle: {
              padding: [0, 0, 5, 25], // 上右下左的内边距，尝试调整这里的值以接近居中效果
              lineHeight: 10, // 行高，可以根据实际情况调整
              align: "center", // 文本水平居中
              verticalAlign: "bottom", // 文本垂直居底部，尽可能靠近轴线
            },
          },
        ],
        series: series,
      };
      // option && EchartDeptAllYearKPI.setOption(option);

      // window.addEventListener("resize", function () {
      //   EchartDeptAllYearKPI.resize();
      // });
      this.option = option;
      this.randerEcharts();
    },
    //获取本人有无签名的待办事件
    getSelfPerformanceData() {
      getSelfPerformanceInfo().then((res) => {
        if (res.data.code == 0 && res.data.data.name !== null && res.data.data.signName == null) {
          this.signNumber = 1;
        } else {
          this.signNumber = 0;
        }
      });
    },

    //查看自己最新两月的kpi和奖金系数
    getOneselfKPIAndBonus() {
      getOneselfKPIAndBonus().then((res) => {
        if (res.data.code == 0 && res.data.data.length > 0) {
          this.oneselfKPIAndBonus = res.data.data;
          if (this.oneselfKPIAndBonus.length == 1) {
            this.oneselfKPIAndBonus.push({ month: "暂无数据", valueScore: 0, kpi: 0, bonusCoefficient: 0 });
          }
          const kpi = (this.kpiYearAverage.toFixed(2) / this.yAxisKPI.length).toFixed(2);
          this.oneselfKPIAndBonus.push({
            kpi: kpi,
            bonusCoefficient: (this.bonusYearAverage / this.yAxisBonus.length).toFixed(0),
            valueScore: (this.valueYearAverage / this.yAxisValue.length).toFixed(0),
            month: "全年平均（个人）",
          });
          // console.log(this.oneselfKPIAndBonus);
        }
      });
    },
    updateColumns() {
      const vcalendar = document.getElementById("vcalendar");
      if (vcalendar.offsetWidth < 500) {
        this.columns = 1;
      } else {
        this.columns = 2;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.el-calendar {
  --el-calendar-cell-width: 35px;
  --el-calendar-border: none;

  .el-calendar__body {
    padding: 12px 15px;
  }
}
:deep(.el-calendar .el-calendar__header) {
  display: flex;
  align-items: center !important;
  justify-content: start;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  font-weight: 700;
  color: "#777";
  height: 24px;
}

.cardBodyStyle {
  font-size: 1.3vw;
  width: 100%;
  text-align: center;
  margin-top: 18px;
  .cardImgStyle {
    display: flex;
    align-items: center;
    margin-bottom: 2.5vh;
    justify-content: space-between;
    padding: 0 3vw;
  }
  .cardImgStyle:last-child {
    margin-bottom: 0;
  }
  .textStyle {
    color: black;
    font-weight: 700;
    font-size: 2.3vw;
    margin-left: 3vw;
    width: 7vw;
    text-align: left;
  }
  .imgStyle {
    width: 6vw;
    height: 6vh;
  }
}

.ulStyle {
  margin-left: 2vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-width: 160px;
  font-size: clamp(11px, 1.2vw, 17px);
  margin-bottom: 10px;
  white-space: nowrap;
  word-wrap: normal;
  .el-button {
    margin-right: 2vw;
  }
  .el-link {
    margin-right: 2vw;
    font-size: clamp(11px, 1.2vw, 17px);
  }
  span {
    margin-right: 2vw;
    font-size: clamp(11px, 1.2vw, 17px);
  }
}
:deep(.el-input__wrapper) {
  // box-shadow: none;
  font-size: 16px;
  width: 130px;
  .el-input__inner {
    width: fit-content;
    font-weight: 700;
    color: #303133;
  }
}
</style>
