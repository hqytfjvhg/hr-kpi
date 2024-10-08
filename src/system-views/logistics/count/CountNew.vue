<template>
  <div>
    <el-form :inline="true" :rules="rule" :model="formData" ref="form" class="form-style">
      <el-form-item label="日期区间" prop="date">
        <el-date-picker
          v-model="formData.date"
          type="daterange"
          range-separator="To"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>
      <el-form-item> <el-button type="primary" @click="getNewDishes">查询</el-button> </el-form-item>
    </el-form>
    <div id="one-bar" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup>
import axios from "@/utils/http";
import * as echarts from "echarts";
import { ref, nextTick, onMounted } from "vue";

const transTime = (date) => {
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以需要加1；同时补零
  let day = ("0" + date.getDate()).slice(-2); // 日期补零
  return year + "-" + month + "-" + day;
};

const formData = ref({ date: [transTime(new Date(new Date().getFullYear() + "-01-01")), transTime(new Date())] });

const rule = ref({ date: { required: true, message: "请选择日期", trigger: "change" } });
const form = ref(null);

const getNewDishes = () => {
  form.value.validate((valid) => {
    if (valid) {
      axios
        .post("/ifi-personal/dish/menu/getDishesRecordsCountByNewDish", {
          all: false,
          startDate: formData.value.date[0],
          endDate: formData.value.date[1],
        })
        .then((res) => {
          if (res.data.code == 0) {
            nextTick(() => {
              paintBar("统计每月新菜数量", res.data.data, "one-bar");
            });
          }
        });
    }
  });
};

const paintBar = (title, data, id) => {
  const myChart = echarts.init(document.getElementById(id));
  myChart.clear();
  document.getElementById(id).removeAttribute("_echarts_instance_");
  let xAxis = [];
  let yAxis = [];
  data.forEach((it) => {
    xAxis.push(it.dateSteing);
    yAxis.push(it.count);
  });

  myChart.setOption({
    title: {
      text: title,
      left: "center",
    },
    tooltip: {},
    xAxis: {
      data: xAxis,
    },
    yAxis: { type: "value" },
    series: [
      {
        // name: "销量",
        type: "bar",
        data: yAxis,
      },
    ],
  });
};

onMounted(() => {
  getNewDishes();
});
</script>

<style lang="scss" scoped>
.form-style {
  text-align: left;
  padding: 10px 10px 0;
}
</style>
