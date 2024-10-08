<template>
  <div class="page-style">
    <el-form :inline="true">
      <el-form-item label="周数">
        <el-date-picker v-model="weekValue" type="week" format="ww" value-format="YYYY-MM-DD" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in allDishList"
        :key="item"
        :timestamp="Object.values(item)[0].date"
        placement="top"
      >
        <el-card>
          <el-table
            :data="Object.values(item)"
            border
            id="table"
            :span-method="arraySpanMethod(index)"
            :cell-class-name="addClass"
          >
            <el-table-column label="" prop="time" width="60"></el-table-column>
            <el-table-column
              v-for="(item, index) in Object.keys(labelText)"
              :key="item"
              :label="labelText[item]"
              align="center"
            >
              <template #default="scope">
                <template
                  v-if="scope.row[index + 1].length > 0 && scope.row[index + 1].some((it) => it.name === '不开餐')"
                >
                  不开餐
                </template>
                <template v-else>
                  <div v-for="item1 in scope.row[index + 1]" :key="item1">
                    <div style="width: auto; white-space: break-spaces">{{ item1.name }}</div>
                  </div></template
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-timeline-item></el-timeline
    >
  </div>
</template>

<script setup>
import axios from "@/utils/http";
import { ref, onMounted } from "vue";

const labelText = {
  Monday: "星期一",
  Tuesday: "星期二",
  Wednesday: "星期三",
  Thursday: "星期四",
  Friday: "星期五",
  Saturday: "星期六",
};

const allDishList = ref([]);
const oneweekTableData = ref([]);
const getAllDishList = (date) => {
  axios
    .post("/ifi-personal/dish/menu/getMenuListByDate", {
      endDate: "2024-09-21",
      startDate: "2024-09-16",
      all: true,
    })
    .then((res) => {
      if (res.data.code == 0) {
        allDishList.value = [];
        //排序 倒叙
        let keys = Object.keys(res.data.data);
        keys.sort((a, b) => {
          let [yearA, weekA] = a.split("@");
          let [yearB, weekB] = b.split("@");

          if (yearA < yearB) return 1;
          if (yearA > yearB) return -1;

          if (Number(weekA) < Number(weekB)) return 1;
          if (Number(weekA) > Number(weekB)) return -1;

          return 0;
        });
        let sortedData = {};
        keys.forEach((key) => {
          sortedData[key] = res.data.data[key];
        });
        if (weekValue.value !== null && date !== "") {
          sortedData = { date: res.data.data[date] };
        }
        oneweekTableData.value = Object.values(sortedData);
        let time;
        Object.values(sortedData).forEach((op) => {
          // time = it.year + "" + it.week;
          // if (!allDishList.value[it.year + "" + it.week]) {
          //   allDishList.value[it.year + "" + it.week] = { time: it.year + "年" + "第" + it.week + "周", dish: [] };
          // }
          let data = {
            早餐: { time: "早餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
            午餐: { time: "午餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
            晚餐: { time: "晚餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
            汤: { time: "汤", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
            小菜: { time: "小菜", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
            水果: { time: "水果", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
            // time: "",
          };
          op.forEach((it) => {
            time = it.year + "年" + "第" + it.week + "周";
            if (it.belong === 1) {
              data["早餐"][it.dayOfWeek].push(it);
            } else if (it.belong === 2) {
              data["午餐"][it.dayOfWeek].push(it);
            } else if (it.belong === 3) {
              data["晚餐"][it.dayOfWeek].push(it);
            } else if (it.belong === 0 && it.type === 3) {
              data["汤"][it.dayOfWeek].push(it);
            } else if (it.belong === 0 && it.type === 5) {
              data["小菜"][it.dayOfWeek].push(it);
            } else if (it.belong === 0 && it.type === 6) {
              data["水果"][it.dayOfWeek].push(it);
            }
          });
          data["早餐"].date = time;
          allDishList.value.push(data);
        });

        // console.log(allDishList.value, 8888888888);
      }
    });
};

const weekValue = ref(null);
const handleSearch = () => {
  const date = new Date(weekValue.value);
  const year = date.getFullYear();
  const oneJan = new Date(year, 0, 1);
  const days = Math.floor((date - oneJan) / (24 * 60 * 60 * 1000));
  let weekNumber = Math.ceil((date.getDay() + 1 + days) / 7);
  weekNumber = weekNumber + 1;
  if (weekNumber > 52) {
    weekNumber = 1;
  }
  getAllDishList(`${year}@${weekNumber}`);
};

//表格合并
const arraySpanMethod = (index) => {
  return ({ rowIndex, columnIndex }) => {
    if (columnIndex !== 0) {
      const data = oneweekTableData.value[index]
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
};
const addClass = ({ columnIndex }) => {
  if (columnIndex === 0) {
    return "firstColumn";
  }
};

onMounted(() => {
  getAllDishList();
});
</script>
<style lang="scss" scoped>
:deep(.el-timeline-item__timestamp.is-top) {
  text-align: left;
  font-size: 16px;
}
.page-style {
  text-align: left;
  padding: 10px;
}
:deep(.firstColumn) {
  font-size: 15px;
  font-weight: 700;
}
</style>
