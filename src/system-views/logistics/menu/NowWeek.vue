<template>
  <div class="page-style">
    <div class="btn-group">
      <el-checkbox label="包含图片" value="" v-model="isShowImg" style="margin-right: 12px" />

      <el-button type="primary" @click="handleExport">导出</el-button>
      <!-- <el-button @click="isShowImg = true" type="primary">带图片</el-button>
      <el-button @click="isShowImg = false" type="primary">不带图片</el-button> -->
    </div>
    <div style="margin: 15px 0; font-size: 19px; text-align: left">
      {{ thisWeekName.split("@")[0] }}年{{ thisWeekName.split("@")[1] }}周食谱
    </div>
    <el-table
      :data="Object.values(oneWeekMenu)"
      :cell-class-name="addClass"
      border
      id="table"
      :span-method="arraySpanMethod"
    >
      <el-table-column
        :label="titleDate[0][1] + '-' + titleDate[0][2] + ' 至 ' + titleDate[1][1] + '-' + titleDate[1][2] + ' 食谱'"
      >
        <el-table-column label="" prop="time" width="120"></el-table-column>
        <el-table-column
          v-for="(item, index) in Object.keys(labelText)"
          :key="item"
          :label="labelText[item]"
          align="center"
        >
          <template #default="scope">
            <div class="menu-content">
              <template
                v-if="scope.row[index + 1].length > 0 && scope.row[index + 1].some((it) => it.name === '不开餐')"
              >
                <span style="color: #409eff">不开餐</span>
              </template>
              <template v-else>
                <div v-for="item1 in scope.row[index + 1]" :key="item1" class="menu">
                  <img
                    :src="item1.base64 == null ? `@/assets/noimg.png` : 'data:image/png;base64,' + item1.base64"
                    alt=""
                    style="width: 50px; height: 50px"
                    v-if="(item1.type === 1 || item1.type === 2) && isShowImg && item1.base64 !== null"
                  />
                  <img
                    src="@/assets/noimg.png"
                    alt=""
                    style="width: 50px; height: 50px"
                    v-if="(item1.type === 1 || item1.type === 2) && isShowImg && item1.base64 == null"
                  />

                  <div
                    style="width: auto; white-space: break-spaces; line-height: 40px"
                    :style="{
                      color: item1.name === '不开餐' ? '#409EFF' : '',
                    }"
                  >
                    {{ item1.name }}
                  </div>
                </div></template
              >
            </div>
          </template>
        </el-table-column></el-table-column
      >
    </el-table>

    <!-- 下周 -->
    <!-- <div class="btn-group">
      <el-button type="primary" @click="handleExportNext">导出</el-button>
    </div> -->
    <!-- <div style="margin: 15px 0; font-size: 19px; text-align: left">
      {{ nextWeekName.split("@")[0] }}年{{ nextWeekName.split("@")[1] }}周食谱
    </div>
    <el-table
      :data="Object.values(nextWeekMenu)"
      :cell-class-name="addClass"
      border
      id="nextTable"
      :span-method="arraySpanMethod"
    >
      <el-table-column
        :label="
          nextTitleDate[0][1] +
          '-' +
          nextTitleDate[0][2] +
          ' 至 ' +
          nextTitleDate[1][1] +
          '-' +
          nextTitleDate[1][2] +
          ' 食谱'
        "
      >
        <el-table-column label="" prop="time" width="120"></el-table-column>
        <el-table-column
          v-for="(item, index) in Object.keys(labelText)"
          :key="item"
          :label="labelText[item]"
          align="center"
        >
          <template #default="scope">
            <div class="menu-content">
              <template
                v-if="scope.row[index + 1].length > 0 && scope.row[index + 1].some((it) => it.name === '不开餐')"
              >
                <span style="color: #409eff">不开餐</span>
              </template>
              <template v-else>
                <div v-for="item1 in scope.row[index + 1]" :key="item1" class="menu">
                  <img
                    :src="item1.base64 == null ? `@/assets/noimg.png` : 'data:image/png;base64,' + item1.base64"
                    alt=""
                    style="width: 50px; height: 50px"
                    v-if="(item1.type === 1 || item1.type === 2) && isShowImg && item1.base64 !== null"
                  />
                  <img
                    src="@/assets/noimg.png"
                    alt=""
                    style="width: 50px; height: 50px"
                    v-if="(item1.type === 1 || item1.type === 2) && isShowImg && item1.base64 == null"
                  />

                  <div
                    style="width: auto; white-space: break-spaces; line-height: 40px"
                    :style="{
                      color: item1.name === '不开餐' ? '#409EFF' : '',
                    }"
                  >
                    {{ item1.name }}
                  </div>
                </div></template
              >
            </div>
          </template>
        </el-table-column></el-table-column
      >
    </el-table> -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "@/utils/http";
import html2canvas from "html2canvas";

const labelText = ref({
  Monday: "星期一",
  Tuesday: "星期二",
  Wednesday: "星期三",
  Thursday: "星期四",
  Friday: "星期五",
  Saturday: "星期六",
});

const thisWeekName = ref(""); //本周具体周数
// const nextWeekName = ref(""); //下周具体周数
const titleDate = ref([]); //菜谱上面显示的日期
const isShowImg = ref(false); //是否显示图片
const oneWeekMenu = ref([]);
//获取本周起始结束时间
const getThisWeekStartAndEnd = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 今天是一周中的第几天，0 表示周日，1 表示周一...
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - dayOfWeek + 1);
  //   weekStart.setHours(0, 0, 0, 0); // 设置时间为当天的开始

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);
  //   weekEnd.setHours(23, 59, 59, 999); // 设置时间为当天的结束

  return {
    startDate: weekStart.toISOString().split("T")[0],
    endDate: weekEnd.toISOString().split("T")[0],
  };
};

//获取下周日期
// const getNextWeekStartAndEnd = () => {
//   const currentDate = new Date();
//   const currentDayOfWeek = currentDate.getDay();

//   let daysUntilNextMonday = (8 - currentDayOfWeek) % 7;
//   if (daysUntilNextMonday === 0) {
//     daysUntilNextMonday = 7;
//   }
//   const nextMondayDate = new Date(currentDate.getTime() + daysUntilNextMonday * 24 * 60 * 60 * 1000);
//   const nextSundayDate = new Date(nextMondayDate.getTime() + 6 * 24 * 60 * 60 * 1000);

//   const startDateFormatted =
//     nextMondayDate.getFullYear() +
//     "-" +
//     padZero(nextMondayDate.getMonth() + 1) +
//     "-" +
//     padZero(nextMondayDate.getDate());

//   const endDateFormatted =
//     nextSundayDate.getFullYear() +
//     "-" +
//     padZero(nextSundayDate.getMonth() + 1) +
//     "-" +
//     padZero(nextSundayDate.getDate());

//   return { startDate: startDateFormatted, endDate: endDateFormatted };
// };
// const padZero = (num) => {
//   return num < 10 ? "0" + num : num;
// };

//获取本周菜谱
const oneweekTableData = ref([]);
const getOneWeekMenu = () => {
  const { startDate, endDate } = getThisWeekStartAndEnd();
  titleDate.value = [startDate.split("-"), endDate.split("-")];
  axios
    .post("/ifi-personal/dish/menu/getMenuListByDate", {
      endDate: endDate,
      startDate: startDate,
      all: false,
    })
    .then((res) => {
      if (res.data.code == 0) {
        oneWeekMenu.value = [];

        // let data = {
        //   早餐: { time: "早餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        //   午餐: { time: "午餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        //   晚餐: { time: "晚餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        //   汤: { time: "汤", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        //   小菜: { time: "小菜", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        //   水果: { time: "水果", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
        // };

        if (Object.keys(res.data.data).length > 0) {
          thisWeekName.value = Object.keys(res.data.data)[0];
          oneweekTableData.value = Object.values(res.data.data)[0];
          // Object.values(res.data.data)[0].forEach((it) => {
          //   if (it.belong === 1) {
          //     data["早餐"][it.dayOfWeek].push(it);
          //   } else if (it.belong === 2) {
          //     data["午餐"][it.dayOfWeek].unshift(it);
          //   } else if (it.belong === 3) {
          //     data["晚餐"][it.dayOfWeek].unshift(it);
          //   } else if (it.belong === 0 && it.type === 3) {
          //     data["汤"][it.dayOfWeek].push(it);
          //   } else if (it.belong === 0 && it.type === 5) {
          //     data["小菜"][it.dayOfWeek].push(it);
          //   } else if (it.belong === 0 && it.type === 6) {
          //     data["水果"][it.dayOfWeek].push(it);
          //   }
          // });
          oneWeekMenu.value = handleGetMenu(res.data.data);
          // console.log(this.oneWeekMenu, 999);
        }
      }
    });
};

// const nextWeekMenu = ref([]);
// const nextWeekTableData = ref([]);
// const nextTitleDate = ref([]);
// const getNextWeekMenu = () => {
//   const { startDate, endDate } = getNextWeekStartAndEnd();
//   nextTitleDate.value = [startDate.split("-"), endDate.split("-")];
//   axios
//     .post("/ifi-personal/dish/menu/getMenuListByDate", {
//       endDate: endDate,
//       startDate: startDate,
//       all: false,
//     })
//     .then((res) => {
//       if (res.data.code == 0) {
//         nextWeekMenu.value = [];
//         if (Object.keys(res.data.data).length > 0) {
//           nextWeekName.value = Object.keys(res.data.data)[0];
//           nextWeekTableData.value = Object.values(res.data.data)[0];
//           nextWeekMenu.value = handleGetMenu(res.data.data);
//         }
//       }
//     });
// };

const handleGetMenu = (resData) => {
  let data = {
    早餐: { time: "早餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    午餐: { time: "午餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    晚餐: { time: "晚餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    汤: { time: "汤", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    小菜: { time: "小菜", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
    水果: { time: "水果", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
  };

  if (Object.keys(resData).length > 0) {
    Object.values(resData)[0].forEach((it) => {
      if (it.belong === 1) {
        data["早餐"][it.dayOfWeek].push(it);
      } else if (it.belong === 2) {
        data["午餐"][it.dayOfWeek].unshift(it);
      } else if (it.belong === 3) {
        data["晚餐"][it.dayOfWeek].unshift(it);
      } else if (it.belong === 0 && it.type === 3) {
        data["汤"][it.dayOfWeek].push(it);
      } else if (it.belong === 0 && it.type === 5) {
        data["小菜"][it.dayOfWeek].push(it);
      } else if (it.belong === 0 && it.type === 6) {
        data["水果"][it.dayOfWeek].push(it);
      }
    });
  }
  return data;
};

const handleExport = () => {
  var node = document.getElementById("table");
  html2canvas(node, { logging: true, scale: 2 }).then(function (canvas) {
    var a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${titleDate.value[0] + " 至 " + titleDate.value[1] + " 食谱"}.png`;
    a.click();
  });
};

//导出下周菜谱
// const handleExportNext = () => {
//   var node = document.getElementById("nextTable");
//   html2canvas(node, { logging: true, scale: 2 }).then(function (canvas) {
//     var a = document.createElement("a");
//     a.href = canvas.toDataURL("image/png");
//     a.download = `${nextTitleDate.value[0] + " 至 " + nextTitleDate.value[1] + " 食谱"}.png`;
//     a.click();
//   });
// };

const addClass = ({ columnIndex }) => {
  if (columnIndex === 0) {
    return "firstColumn";
  }
};

const arraySpanMethod = ({ columnIndex, rowIndex }) => {
  if (columnIndex !== 0) {
    const data = oneweekTableData.value
      .filter((it) => it.dayOfWeek === columnIndex)
      .every((op) => op.name === "不开餐");
    if (data) {
      if (rowIndex === 0) {
        return [6, 1];
      } else {
        return [0, 0];
      }
    } else {
      return [1, 1];
    }
  } else {
    return [1, 1];
  }
};
onMounted(() => {
  getOneWeekMenu();
  // getNextWeekMenu();
});
</script>

<style lang="scss" scoped>
.page-style {
  padding: 10px;
  height: auto;
}
.btn-group {
  margin-bottom: 10px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.menu {
  font-size: 15px;
}
:deep(.firstColumn) {
  font-size: 19px;
  height: 80px;
}
:deep(.el-table thead tr th) {
  font-size: 19px;
  font-weight: normal;
  height: 50px;
}

:deep(.el-table .el-table__cell) {
  padding: 0;
}
:deep(.el-table .cell) {
  padding: 0;
}
</style>
