<template>
  <div>
    <div>
      <el-card shadow="never" style="border-radius: 15px">
        <template #header>
          <div class="card-header">
            <span>
              <el-select
                v-model="bonusCoefficientYear"
                class="bonusSelectStyle"
                @change="getBonusCoefficientAllYear"
                style="width: 90px"
              >
                <el-option v-for="item in $store.state.yearOptions" :key="item" :label="item" :value="item" />
              </el-select>
              年
              <el-select v-model="bonusCoefficientMonth" @change="getBonusCoefficientOneMonth" style="width: 90px">
                <el-option
                  v-for="item in $store.state.monthOptions"
                  :key="item.month"
                  :label="item.month"
                  :value="item.monthId"
                /> </el-select
              >月奖金系数</span
            >
          </div>
        </template>
        <div id="EChartBonusCoefficientOneMonth" style="width: 100%; height: 310px"></div>
      </el-card>
      <el-card shadow="never" style="margin-top: 20px; border-radius: 15px">
        <template #header>
          <div class="card-header">
            <span>{{ bonusCoefficientYear }}年各部门全年奖金系数</span>
          </div>
        </template>
        <div id="EChartBonusCoefficientAllYear" style="width: 100%; height: 310px"></div>
      </el-card>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getBonusCoefficient } from "@/api/annualAverage";
import store from "@/store";

export default {
  data() {
    return {
      bonusCoefficientYear: "",
      bonusCoefficientMonth: "", //绑定的月份
      departmentsAllYear: [], //各部门全年的数据
      xAxisDataOneMonth: [], //各部门的x轴数据
      yAxisDataOneMonth: [], //某一个月的各部门奖金系数
    };
  },
  mounted() {
    this.bonusCoefficientYear = store.state.year;
    if (JSON.parse(store.state.eventSave)) {
      this.bonusCoefficientMonth = store.state.eventMonth;
    } else {
      this.bonusCoefficientMonth = Number(store.state.eventMonth) - 1;
      if (this.bonusCoefficientMonth == 0) {
        this.bonusCoefficientMonth = 12;
        this.bonusCoefficientYear = this.bonusCoefficientYear - 1;
      }
    }
    this.getBonusCoefficientAllYear();
  },
  methods: {
    getBonusCoefficientAllYear() {
      getBonusCoefficient({ year: this.bonusCoefficientYear }).then((res) => {
        if (res.data.code == 0) {
          this.departmentsAllYear = res.data.data;
          let result = res.data.data.reduce((acc, curr) => {
            // 如果部门名称在Map中不存在，则创建一个新的对象，并将当前项添加到values数组中
            if (!acc.has(curr.deptName)) {
              acc.set(curr.deptName, [curr.averageData]);
            } else {
              // 部门名称已存在，获取该部门对应的数组，并将当前项添加进去
              let deptData = acc.get(curr.deptName);
              deptData.push(curr.averageData);
              acc.set(curr.deptName, deptData);
            }

            return acc;
          }, new Map());

          // 将Map转换为更易于处理的对象数组格式
          result = Array.from(result.entries(), ([deptName, values]) => ({ deptName, data: values }));

          let sum = [];
          this.xAxisDataAllYear = result.map((item) => item.deptName);
          this.yAxisDataAllYear = result.map((item, index) => {
            sum[index] = 0;
            item.data.map((item1) => {
              sum[index] += Number(item1);
            });
            return (sum[index] / result[index].data.length).toFixed(0);
          });
          this.getEchartAllYear();
          this.getBonusCoefficientOneMonth();
        }
      });
    },
    getBonusCoefficientOneMonth() {
      this.yAxisDataOneMonth = this.departmentsAllYear
        .filter((item) => item.month == this.bonusCoefficientMonth)
        .map((item) => item.averageData);
      this.xAxisDataOneMonth = this.departmentsAllYear
        .filter((item) => item.month == this.bonusCoefficientMonth)
        .map((item) => item.deptName);
      this.getEchartOneMonth();
    },
    getEchartOneMonth() {
      let EChartOneMonth = echarts.init(document.getElementById("EChartBonusCoefficientOneMonth"));
      EChartOneMonth.clear();
      //控制文本的字段
      const labelOption = {
        show: true,
        position: "top",
        //每个数据显示出来，位置在底部里面，旋转了90度，c是y轴的数值，b是x轴的数值，a没有内容
        formatter: "{c}",
        //文字大小
        fontSize: 20,
        color: "black",
      }; //   y轴的数据
      const seriesOption = {
        data: this.yAxisDataOneMonth,
        type: "bar",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
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
      };

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        legend: {
          data: this.xAxisDataOneMonth,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          // top: "5%",
          containLabel: true,
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
            // restore: { show: true },
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar", "line"] },

            //下载
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //刻度线
            axisLabel: { interval: 0 },
            data: this.xAxisDataOneMonth,
            // axisLine: { show: false },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false }, //刻度线
            axisLabel: {
              show: false,
            },
            splitLine: { show: false },
          },
        ],
        series: seriesOption,
      };
      option && EChartOneMonth.setOption(option);
      window.addEventListener("resize", function () {
        EChartOneMonth.resize();
      });
    },
    getEchartAllYear() {
      let EChartAllYear = echarts.init(document.getElementById("EChartBonusCoefficientAllYear"));
      EChartAllYear.clear();
      //控制文本的字段
      const labelOption = {
        show: true,
        position: "top",
        //每个数据显示出来，位置在底部里面，旋转了90度，c是y轴的数值，b是x轴的数值，a没有内容
        formatter: "{c}",
        //文字大小
        fontSize: 20,
        color: "black",
      }; //   y轴的数据
      const seriesOption = {
        data: this.yAxisDataAllYear,
        type: "bar",
        barGap: 0, //条间隙
        label: labelOption,
        //鼠标触碰的数据的样式，突出当前的颜色，其他的暗下去
        emphasis: {
          focus: "series",
        },
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
      };

      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // 外面颜色的标记，默认是top-center，不设置data也有数据，前提是series有设置name属性
        legend: {
          data: this.xAxisDataAllYear,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          // top: "5%",
          containLabel: true,
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
            //转换数据的类型，折现、柱状、堆叠
            magicType: { show: true, type: ["bar", "line"] },
            //刷新
            // restore: { show: true },
            //下载
            saveAsImage: { show: true },
          },
        },
        xAxis: [
          {
            type: "category",
            axisTick: { show: false }, //刻度线
            data: this.xAxisDataAllYear,
            axisLabel: { interval: 0 },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              show: false,
            },
            splitLine: { show: false },
          },
        ],
        series: seriesOption,
      };
      option && EChartAllYear.setOption(option);
      window.addEventListener("resize", function () {
        EChartAllYear.resize();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card-header {
  font-size: 20px;
  font-weight: 700;
  color: "#777";
}
</style>
