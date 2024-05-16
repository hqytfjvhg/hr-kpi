<template>
  <div>
    <!-- 数据可视化 ，此页面没有被使用-->
    <div>
      <el-card style="text-align: left; border-radius: 10px" shadow="never">
        <template #header>
          <div class="card-header">
            <span>{{ allYear }}年KPI得分情况</span>
            <!-- 选择查询整年的数据 -->
            <el-form class="formStyle">
              <el-form-item label="年份" class="formStyle-item"
                ><el-select placeholder="请选择年份" v-model="allYear">
                  <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" /> </el-select
              ></el-form-item>
              <el-form-item label="姓名" class="formStyle-item"
                ><el-select
                  placeholder="请选择姓名"
                  v-model="allYearSelectUser"
                  multiple
                  clearable
                  collapse-tags
                  :max-collapse-tags="1"
                >
                  <el-option v-for="item in allUserOptions" :key="item" :label="item.name" :value="item.userId" />
                </el-select>
              </el-form-item>
              <el-button @click="getAllYearKPI">生成</el-button>
            </el-form>
          </div>
        </template>
        <div id="EchartAllYearKPI" style="width: 100%; height: 300px"></div>
      </el-card>
    </div>
    <div style="margin-top: 20px">
      <el-card style="text-align: left; border-radius: 10px" shadow="never">
        <template #header>
          <div class="card-header">
            <span>{{ targetYear }}年{{ targetMonth }}月同指标得分情况</span>
            <el-form class="formStyle">
              <el-form-item label="年份" class="formStyle-item"
                ><el-select
                  placeholder="请选择年份"
                  v-model="targetYear"
                  @change="getOneMonthTarget(targetYear, targetMonth)"
                >
                  <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" /> </el-select
              ></el-form-item>
              <el-form-item label="月份" class="formStyle-item"
                ><el-select
                  placeholder="请选择月份"
                  v-model="targetMonth"
                  @change="getOneMonthTarget(targetYear, targetMonth)"
                >
                  <el-option
                    v-for="item in monthOptions"
                    :key="item"
                    :label="item.month"
                    :value="item.monthId"
                  /> </el-select
              ></el-form-item>
              <el-form-item label="指标名称" class="formStyle-item"
                ><el-select placeholder="请选择指标名称" v-model="target" clearable>
                  <el-option v-for="item in targetList" :key="item" :label="item.name" :value="item.targetId" />
                </el-select>
              </el-form-item>
              <el-button @click="getTarget">生成</el-button>
            </el-form>
          </div>
        </template>
        <div id="EchartTarget" style="width: 100%; height: 300px"></div>
      </el-card>
    </div>
    <div style="margin-top: 20px">
      <el-card style="text-align: left; border-radius: 10px" shadow="never">
        <template #header>
          <div class="card-header">
            <span>{{ oneYear }}年{{ oneMonth }}月{{ deptName }}同部门绩效得分情况</span>

            <el-form class="formStyle">
              <el-form-item label="年份" class="formStyle-item"
                ><el-select placeholder="请选择年份" v-model="oneYear">
                  <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" /> </el-select
              ></el-form-item>
              <el-form-item label="月份" class="formStyle-item"
                ><el-select placeholder="请选择月份" v-model="oneMonth">
                  <el-option
                    v-for="item in monthOptions"
                    :key="item"
                    :label="item.month"
                    :value="item.monthId"
                  /> </el-select
              ></el-form-item>
              <el-form-item label="部门" class="formStyle-item"
                ><el-select placeholder="请选择部门" v-model="deptId" @change="changeDeptUser">
                  <el-option
                    v-for="item in deptOptions"
                    :key="item"
                    :label="item.deptName"
                    :value="item.deptId"
                  /> </el-select
              ></el-form-item>
              <el-form-item label="姓名" class="formStyle-item"
                ><el-select
                  placeholder="请选择姓名"
                  v-model="oneYearSelectUser"
                  multiple
                  clearable
                  collapse-tags
                  :max-collapse-tags="1"
                >
                  <el-option v-for="item in oneDeptUser" :key="item" :label="item.name" :value="item.userId" />
                </el-select>
              </el-form-item>
              <el-button @click="getUserOneMonth">生成</el-button>
            </el-form>
          </div>
        </template>
        <div id="EchartOneYear" style="width: 100%; height: 300px"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ElMessage } from "element-plus";
import * as echarts from "echarts";
import { getUserAllYearKPI, getUserOneMonth, getTarget } from "@/api/kpi/index";
import store from "../../store";
import { deptList } from "@/api/register/index";
import { getOneMonthTarget } from "@/api/visualization/index";
// import { getTargetList } from "@/api/performance/index";

export default {
  data() {
    return {
      checkAll: false, //选择姓名的多选框的全部按钮

      xAxisMonth: [], //x轴数据
      yAxisKPI: [], //y轴数据

      xAxisUser: [],
      yAxisValueAndPerformanceAndKPI: {},

      xAxisTargetUser: [],
      yAxisPerformance: [],

      deptOptions: store.state.deptList ? store.state.deptList : [],
      allYearSelectUser: [], //整年选择的人员
      allUserOptions: [], //所有用户
      oneYearSelectUser: [], //对比用户选择的用户
      oneDeptUser: [], //筛选后某一个部门的人
      allYear: new Date().getFullYear(), //整年数据的form绑定的时间
      oneYear: new Date().getFullYear(), //对比用户绑定的时间
      targetYear: new Date().getFullYear(), //指标绑定时间
      oneMonth: new Date().getMonth() + 1, //对比用户绑定时月份
      targetMonth: new Date().getMonth() + 1, //指标绑定的月份
      yearOptions: [],
      deptId: 1, //对比选择的部门，同部门对比

      targetList: [], //指标列表
      target: "", //绑定的指标

      monthOptions: [
        { monthId: 1, month: "一月" },
        { monthId: 2, month: "二月" },
        { monthId: 3, month: "三月" },
        { monthId: 4, month: "四月" },
        { monthId: 5, month: "五月" },
        { monthId: 6, month: "六月" },
        { monthId: 7, month: "七月" },
        { monthId: 8, month: "八月" },
        { monthId: 9, month: "九月" },
        { monthId: 10, month: "十月" },
        { monthId: 11, month: "十一月" },
        { monthId: 12, month: "十二月" },
      ],
    };
  },
  mounted() {
    if (store.state.deptList.length == 0) {
      deptList()
        .then((res) => {
          if (res.data.code == 0) {
            this.deptOptions = res.data.data;
          }
        })
        .catch(() => {
          ElMessage.error("请求失败");
        });
    }
    // this.getAllUser();
    // this.getTargetList();
    this.nowtime();
    this.getOneMonthTarget(this.targetYear, this.targetMonth);
  },
  methods: {
    nowtime() {
      let nowDate = new Date();
      const year = nowDate.getFullYear();
      // this.month = nowDate.getMonth() + 1;
      for (let i = 2021; i <= year; i++) {
        this.yearOptions.push(i);
      }
    },
    // getAllUser() {
    //   getAllUser().then((res) => {
    //     if (res.data.code == 0) {
    //       this.allUserOptions = res.data.data;
    //       this.oneDeptUser = this.allUserOptions.filter((item) => item.deptId == this.deptId);
    //       // console.log(this.oneDeptUser);
    //     }
    //   });
    // },
    changeDeptUser(value) {
      // console.log(value);
      this.oneYearSelectUser = [];
      this.oneDeptUser = this.allUserOptions.filter((item) => item.deptId == value);
    },
    //获取指标列表
    getOneMonthTarget(year, month) {
      getOneMonthTarget({ year: year, month: month }).then((res) => {
        if (res.data.code == 0) {
          this.targetList = res.data.data;
        }
      });
    },
    // getTargetList() {
    //   getTargetList().then((res) => {
    //     if (res.data.code == 0) {
    //       this.targetList = res.data.data;
    //     }
    //   });
    // },
    // 获取数据
    getAllYearKPI() {
      if (this.allYearSelectUser.length > 0) {
        const data = { year: this.allYear, userIdList: this.allYearSelectUser };
        getUserAllYearKPI(data).then((res) => {
          if (res.data.code == 0 && res.data.data.length > 0) {
            this.xAxisMonth = this.allUserOptions
              .filter((item) => {
                return this.allYearSelectUser.some((item1) => item1 == item.userId);
              })
              .map((item) => item.name);
            // console.log(this.xAxisMonth);

            this.yAxisKPI = res.data.data.reduce((acc, item) => {
              let nameIndex = this.xAxisMonth.indexOf(item.name);
              let month = item.month;
              if (nameIndex !== -1) {
                if (!acc[month + "月"]) {
                  acc[month + "月"] = [];
                }
                acc[month + "月"][nameIndex] = item.kpiscore;
                7;
              }

              // acc[name].push(item.kpiscore);
              return acc;
            }, {});
            // console.log(this.yAxisKPI);
            // for (let key in this.yAxisKPI) {
            //   let values = this.yAxisKPI[key];
            //   for (let i = 0; i < values.length; i++) {
            //     if (values[i] === undefined) {
            //       values[i] = "0";
            //     }
            //   }
            //   this.yAxisKPI[key] = values;
            // }
            // this.yAxisKPI = res.data.data.map((item) => item.kpiscore);
            // console.log(this.yAxisKPI);
            if (this.allYearSelectUser.length == 1) {
              this.getEchartAllYearBar();
              //   console.log(1111);
            } else {
              this.getEchartAllYear();
              //   console.log(2222);
            }
          } else {
            ElMessage.error("查询数据为空");
          }
        });
      } else {
        ElMessage.error("请选择人员");
      }
    },
    //数据可视化部分
    getEchartAllYear() {
      let EchartAllYearKPI = echarts.init(document.getElementById("EchartAllYearKPI"));
      EchartAllYearKPI.clear();
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
        fontSize: 10,
        rich: {
          name: {},
        },
      };
      const seriesOption = {
        type: "bar",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
      };
      const series = Object.keys(this.yAxisKPI).map((key) => ({
        name: key,
        data: this.yAxisKPI[key],
        ...seriesOption,
      }));
      let option = {
        tooltip: {
          appendToBody: true, //全部显示出来，被挡住的也显示
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        legend: {
          data: Object.keys(this.yAxisKPI),
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
            dataView: { show: true, readOnly: false }, //是否只读，false可编辑数据并更新视图
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar", "stack"] },
            //还原
            restore: { show: true },
            //下载
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            // type: "category", //控制x轴间隔显示
            axisTick: { show: false }, //刻度线
            data: this.xAxisMonth,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: series,
      };

      option && EchartAllYearKPI.setOption(option);
      window.addEventListener("resize", function () {
        EchartAllYearKPI.resize();
      });
    },
    getEchartAllYearBar() {
      let EchartAllYearKPI = echarts.init(document.getElementById("EchartAllYearKPI"));
      EchartAllYearKPI.clear();
      var option;
      let categories = [Object.keys(this.yAxisKPI)[0]]; //y轴数据
      let seriesData = Object.values(this.yAxisKPI)[0]; //x轴数据
      const seriesLabel = {
        show: true,
      };
      option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          data: Object.keys(this.yAxisKPI),
        },
        grid: {
          left: 100,
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}",
          },
        },
        yAxis: {
          type: "category",
          inverse: true,
          // data: Object.keys(this.yAxisKPI),
          data: categories,
        },
        series: [
          {
            type: "bar",
            // data: Object.values(this.yAxisKPI).flat(),
            data: seriesData,
            label: seriesLabel,
            animation: true, // 添加动画效果
            sort: "ascending",
            itemStyle: {
              color: function (params) {
                const colors = [
                  " #5470c6",
                  " #91cc75",
                  " #fac858",
                  " #ee6666",
                  " #73c0de",
                  " #3ba272",
                  " #fc8452",
                  " #9a60b4",
                  " #ea7ccc",
                ];
                return colors[params.dataIndex % colors.length];
              },
            },
          },
        ],
      };
      let that = this;
      let count = 1;
      //定时器的开启与停止
      let intervalId = setInterval(function () {
        if (count >= Object.keys(that.yAxisKPI).length) {
          clearInterval(intervalId);
          return;
        }
        // console.log(Object.keys(that.yAxisKPI), Object.values(that.yAxisKPI));
        const month = Object.keys(that.yAxisKPI)[count];
        const value = parseFloat(Object.values(that.yAxisKPI)[count]);

        seriesData.push(value);

        categories.push(month);

        // console.log(categories, seriesData);
        EchartAllYearKPI.setOption({
          yAxis: [
            {
              data: categories,
            },
          ],
          series: [
            {
              data: seriesData,
            },
          ],
        });
        count++;
      }, 1500);

      option && EchartAllYearKPI.setOption(option);
      window.addEventListener("resize", function () {
        EchartAllYearKPI.resize();
      });
    },
    //对比某一个月的某些人的全部数据
    getUserOneMonth() {
      if (this.oneYearSelectUser.length > 0) {
        const data = { year: this.oneYear, month: this.oneMonth, userIdList: this.oneYearSelectUser };
        getUserOneMonth(data).then((res) => {
          if (res.data.code == 0 && res.data.data.length > 0) {
            this.xAxisUser = this.allUserOptions
              .filter((item) => {
                return this.oneYearSelectUser.some((item1) => item1 == item.userId);
              })
              .map((item) => item.name);
            this.yAxisValueAndPerformanceAndKPI = [];
            res.data.data.map((item) => {
              this.yAxisValueAndPerformanceAndKPI["价值观"] = this.yAxisValueAndPerformanceAndKPI["价值观"] || [];
              this.yAxisValueAndPerformanceAndKPI["业绩"] = this.yAxisValueAndPerformanceAndKPI["业绩"] || [];
              this.yAxisValueAndPerformanceAndKPI["KPI总分"] = this.yAxisValueAndPerformanceAndKPI["KPI总分"] || [];
              let index = this.xAxisUser.findIndex((item1) => item1 == item.name);
              this.yAxisValueAndPerformanceAndKPI["价值观"][index] = item.valueScore;
              this.yAxisValueAndPerformanceAndKPI["业绩"][index] = item.targetScore;
              this.yAxisValueAndPerformanceAndKPI["KPI总分"][index] = item.kpiscore;
            }),
              // this.yAxisValueAndPerformanceAndKPI.push(
              //   res.data.data.map((item) => {
              //     return item.targetScore;
              //   }),
              // );
              // this.yAxisValueAndPerformanceAndKPI.push(
              //   res.data.data.map((item) => {
              //     return item.kpiscore;
              //   }),
              // );
              //   console.log(this.yAxisValueAndPerformanceAndKPI);
              this.getEchartOneYear();
          } else {
            ElMessage.error("查询数据为空");
          }
        });
      } else {
        ElMessage.error("请选择人员");
      }
    },
    //数据可视化
    getEchartOneYear() {
      let EchartOneYear = echarts.init(document.getElementById("EchartOneYear"));
      EchartOneYear.clear();
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
        fontSize: 10,
        rich: {
          name: {},
        },
      };
      const seriesOption = {
        type: "bar",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
      };
      const series = Object.keys(this.yAxisValueAndPerformanceAndKPI).map((key) => ({
        name: key,
        data: this.yAxisValueAndPerformanceAndKPI[key],
        ...seriesOption,
      }));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        legend: {
          data: Object.keys(this.yAxisValueAndPerformanceAndKPI),
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
            dataView: { show: true, readOnly: false },
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar", "stack"] },
            //刷新
            restore: { show: true },
            //下载
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //刻度线
            data: this.xAxisUser,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: series,
      };
      option && EchartOneYear.setOption(option);
      window.addEventListener("resize", function () {
        EchartOneYear.resize();
      });
    },
    //指标
    getTarget() {
      if (this.target != "") {
        const data = { year: this.targetYear, month: this.targetMonth, targetId: this.target };
        getTarget(data).then((res) => {
          if (res.data.code == 0 && res.data.data.length > 0) {
            this.xAxisTargetUser = res.data.data.map((item) => item.name);
            // console.log(this.xAxisTargetUser);
            this.yAxisPerformance = res.data.data.map((item) => item.targetScore);
            // console.log(this.yAxisPerformance);
            this.getEchartTarget();
          } else {
            ElMessage.error("查询数据为空");
          }
        });
      } else {
        ElMessage.error("请选择指标");
      }
    },
    //数据可视化
    getEchartTarget() {
      let EchartTarget = echarts.init(document.getElementById("EchartTarget"));
      EchartTarget.clear();
      //控制文本的字段
      const labelOption = {
        show: true,
        position: "top",
        //每个数据显示出来，位置在底部里面，旋转了90度，c是y轴的数值，b是x轴的数值，a没有内容
        formatter: "{c}",
        //文字大小
        fontSize: 10,
        rich: {
          name: {},
        },
      };
      const seriesOption = {
        data: this.yAxisPerformance,
        type: "bar",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
      };
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        // legend: {
        //   data: Object.keys(this.yAxisPerformance),
        // },
        // 工具box，可以转换数据的样式
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            mark: { show: true },
            //数据视图
            dataView: { show: true, readOnly: false },
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar", "stack"] },
            //刷新
            restore: { show: true },
            //下载
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //刻度线
            data: this.xAxisTargetUser,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: seriesOption,
      };
      option && EchartTarget.setOption(option);

      window.addEventListener("resize", function () {
        EchartTarget.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.formStyle {
  display: flex;
  align-items: center;
  // justify-content: start;
  .formStyle-item {
    padding-right: 12px;
    margin-bottom: 0px;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  // height: 40px;
}
.el-card__header {
  padding: 0 12px;
}
</style>
