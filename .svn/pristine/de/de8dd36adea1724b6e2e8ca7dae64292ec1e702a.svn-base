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
      <el-form-item> <el-button type="primary" @click="getDishes">查询</el-button> </el-form-item>
    </el-form>
    <div id="one-bar" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup>
import axios from "@/utils/http";
import * as echarts from "echarts";
import { ref, nextTick, onMounted } from "vue";

//获取时间
const transTime = (date) => {
  // console.log(date);

  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2); // 月份是从0开始的，所以需要加1；同时补零
  let day = ("0" + date.getDate()).slice(-2); // 日期补零
  return year + "-" + month + "-" + day;
};

const formData = ref({ date: [transTime(new Date(new Date().getFullYear() + "-01-01")), transTime(new Date())] });
const rule = ref({ date: { required: true, message: "请选择日期", trigger: "change" } });
const form = ref(null);

const getDishes = () => {
  form.value.validate((valid) => {
    if (valid) {
      // console.log(formData.value.date);

      axios
        .post("/ifi-personal/dish/menu/getPungencyDegreeCount", {
          all: false,
          startDate: formData.value.date[0],
          endDate: formData.value.date[1],
        })
        .then((res) => {
          if (res.data.code == 0) {
            // const data = Object.values(res.data.data).map((it) => {
            //   return it.map((op) => {
            //     return { value: op.count, name: op.name };
            //   });
            // });
            nextTick(() => {
              paintBar("辣度统计", res.data.data, "one-bar");
            });
          }
        });
    }
  });
};

const paintBar = (title, data, id) => {
  let myChart = echarts.init(document.getElementById(id));
  myChart.clear();
  document.getElementById(id).removeAttribute("_echarts_instance_");
  myChart.setOption({
    title: {
      text: title,
      left: "center",
    },
    tooltip: {},
    xAxis: {
      type: "category",
      axisLabel: {
        interval: 0,
        formatter: function (val) {
          if (val.length > 10) {
            return val.slice(0, 8) + "\n" + val.slice(10);
          }
          return val;
        },
      },
      data: data.map((item) => item.name),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data.map((item) => item.count),
        type: "bar",
        label: { show: true, position: "top" },
        // showBackground:true,
        // backgroundStyle:{
        //     color:'rgba(180, 180, 180, 0.2)'
        // }
      },
    ],
  });
};

onMounted(() => {
  getDishes();
});
</script>

<style lang="scss" scoped>
.form-style {
  text-align: left;
  padding: 10px 10px 0;
}
</style>
