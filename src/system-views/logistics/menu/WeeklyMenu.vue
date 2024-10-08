<template>
  <div class="page-style">
    <div class="btn-group">
      <el-checkbox label="包含图片" value="" v-model="isShowImg" style="margin-right: 12px" />
      <el-popconfirm
        :title="`确定删除吗?`"
        confirm-button-text="确定"
        cancel-button-text="取消"
        @confirm="handleDelectDish"
      >
        <template #reference>
          <el-button type="danger" :disabled="Object.values(oneWeekMenu).length === 0">删除</el-button>
        </template>
      </el-popconfirm>
      <el-button type="primary" @click="handleExport" :disabled="isEdit">导出</el-button>
      <el-button type="primary" @click="handleEditDish" :disabled="Object.values(oneWeekMenu).length === 0"
        >编辑</el-button
      >
      <el-button type="success" @click="handleSaveDish" :disabled="!isEdit || Object.values(oneWeekMenu).length === 0"
        >保存</el-button
      >

      <!-- <el-button @click="isShowImg = true" type="primary">带图片</el-button>
      <el-button @click="isShowImg = false" type="primary">不带图片</el-button> -->
    </div>
    <div style="margin: 15px 0; font-size: 19px; text-align: left" v-if="nextWeekName">
      {{ nextWeekName.split("@")[0] }}年{{ nextWeekName.split("@")[1] }}周食谱
    </div>
    <el-table
      :data="Object.values(oneWeekMenu)"
      :cell-class-name="addClass"
      border
      id="table"
      ref="tableRef"
      :span-method="arraySpanMethod"
      class="lastRowHidden"
    >
      <el-table-column
        :label="titleDate[0][1] + '-' + titleDate[0][2] + ' 至 ' + titleDate[1][1] + '-' + titleDate[1][2] + ' 食谱'"
      >
        <el-table-column label="">
          <el-table-column label="" prop="time" width="120"></el-table-column>
        </el-table-column>
        <template v-for="(item, index) in Object.keys(labelText)" :key="item">
          <el-table-column :label="item" align="center">
            <template #header>
              <el-checkbox
                label="不开餐"
                v-model="checkList[index]"
                value="不开餐"
                @change="handleCheckChange($event, index + 1)"
                size="large"
                :disabled="!isEdit"
              />
            </template>
            <el-table-column :label="labelText[item]">
              <template #default="scope">
                <div class="menu-content">
                  <template
                    v-if="
                      !isEdit &&
                      scope.row[index + 1].length > 0 &&
                      scope.row[index + 1].some((it) => it.name === '不开餐')
                    "
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

                      <div v-if="!isEdit" style="width: auto; white-space: break-spaces; line-height: 40px">
                        {{ item1.name }}
                      </div>
                      <div v-else style="padding: 8px">
                        <!-- <el-select v-model="item1.name" @change="changeDish(item1, item1.name)" filterable clearable>
                    <el-option
                      v-for="op in dishList.filter((el) => el.type === item1.type)"
                      :key="op"
                      :label="op.name"
                      :value="op.name"
                    >
                    </el-option>
                  </el-select> -->
                        <el-cascader
                          filterable
                          clearable
                          v-model="item1.name"
                          :options="filterDish(item1)"
                          :show-all-levels="false"
                          @change="handleChangeDish(item1, item1.name)"
                        />
                      </div>
                    </div>
                  </template>
                </div>
              </template>
            </el-table-column> </el-table-column
        ></template>
      </el-table-column>
    </el-table>
    <!-- <div class="table-style">
      <el-table :span-method="arraySpanMethod" :data="meals" style="width: 200px">
        <el-table-column label="餐别" prop="name" width="60"></el-table-column>
      </el-table>
      <el-table v-for="(data, index) in oneWeekMenu" :key="data" :data="data" border width="150">
        <el-table-column :label="daysOfWeek[index]" prop="name">
          <template #default="{ row }">
            <img
              :src="'data:image/jpeg;base64,' + row.base64"
              alt=""
              style="width: 50px; height: 40px"
              v-if="row.belong === 2 || row.belong === 2"
            />
            <div>{{ row.name }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div> -->
    <div class="form-style">
      <div style="font-size: 19px">食谱规则</div>
      <div style="margin: 15px 0">
        1.其中包括<span>常规菜 </span> <el-input v-model="FormData.noNewDish" style="width: 60px"></el-input>个，
        <span style="color: #409eff"> 手动添加的新菜 </span>
        <el-input v-model="FormData.addNewDish" style="width: 60px"></el-input>个，
        <span style="color: #67c23a"> 系统随机生成的新菜 </span>
        <el-input v-model="FormData.systemNewDish" style="width: 60px"></el-input>个，总计
        {{ Number(FormData.noNewDish) + Number(FormData.addNewDish) + Number(FormData.systemNewDish) }} 个。
      </div>
      <div style="display: flex; line-height: 40px">
        <span style="margin-right: 15px">2.下周有</span>
        <el-radio-group v-model="FormData.fiveDayByWeek">
          <el-radio-button :label="true">5天</el-radio-button>
          <el-radio-button :label="false">6天</el-radio-button></el-radio-group
        >
      </div>
      <div style="margin: 15px 0">
        <el-button @click="handleGetMenu" type="primary">生成食谱</el-button>
      </div>
      <div v-if="Object.values(dishData).length > 0">已生成5个食谱，请选择后保存</div>
      <div style="display: flex; align-items: center" v-if="Object.values(dishData).length > 0">
        <el-radio-group v-model="dishIndex" @change="changeBtnIndex" style="margin: 15px 0">
          <el-radio-button :value="0" :label="0">食谱1</el-radio-button>
          <el-radio-button :value="1" :label="1">食谱2</el-radio-button>
          <el-radio-button :value="2" :label="2">食谱3</el-radio-button>
          <el-radio-button :value="3" :label="3">食谱4</el-radio-button>
          <el-radio-button :value="4" :label="4">食谱5</el-radio-button>
        </el-radio-group>
        <el-button @click="saveDish" type="success" style="margin-left: 10px">保存</el-button>
      </div>
      <!-- <el-form :model="FormData" :inline="true">
        <el-form-item label="1、非新菜">
          <el-input v-model="FormData.noNewDish"></el-input>
        </el-form-item>
        <el-form-item label="2、非系统新菜">
          <el-input v-model="FormData.addNewDish"></el-input>
        </el-form-item>
        <el-form-item label="3、系统新菜">
          <el-input v-model="FormData.systemNewDish"></el-input>
        </el-form-item>
        <el-form-item
          ><el-button @click="handleGetMenu" type="primary">生成菜谱</el-button
          ><el-button @click="saveDish" type="success">保存当前菜谱</el-button></el-form-item
        >
      </el-form> -->
    </div>
    <div v-if="Object.values(dishData).length > 0">
      <el-carousel
        ref="carousel"
        :height="isShowImg ? '800px' : '600px'"
        arrow="always"
        :autoplay="false"
        trigger="click"
        indicator-position="none"
        @change="changeDishIndex"
      >
        <el-carousel-item v-for="item in 5" :key="item">
          <el-scrollbar>
            <el-table :data="Object.values(dishData[item - 1])" :cell-class-name="addClass" border>
              <el-table-column label="" prop="time" width="120"></el-table-column>
              <el-table-column v-for="(item, index) in Object.keys(labelText)" :key="item" :label="labelText[item]">
                <template #default="scope">
                  <div class="menu-content">
                    <div v-for="item1 in scope.row[index + 1]" :key="item1" class="menu">
                      <!-- {{ scope.row[index] }} -->
                      <img
                        :src="'data:image/png;base64,' + item1.base64"
                        alt=""
                        style="width: 50px; height: 50px"
                        v-if="(item1.type === 1 || item1.type === 2) && isShowImg && item1.base64 !== null"
                      />
                      <img
                        src="@/assets/noimg.png"
                        alt=""
                        style="width: 50px; height: 50px"
                        v-if="(item1.type === 1 || item1.type === 2) && isShowImg && item1.base64 === null"
                      />

                      <!-- <div :style="{ color: item1.newDish ? 'red' : item1.systemNewDish ? 'green' : 'black' }">
                        {{ item1.name }}
                      </div> -->
                      <!-- 手动添加的新菜 -->
                      <div
                        v-if="item1.newDish && !item1.systemGenerate"
                        style="color: #409eff; width: auto; white-space: break-spaces; line-height: 40px"
                      >
                        {{ item1.name }}
                      </div>
                      <!-- 系统生成的新菜 -->
                      <div
                        v-if="item1.systemGenerate && item1.newDish"
                        style="color: #67c23a; width: auto; white-space: break-spaces; line-height: 40px"
                      >
                        {{ item1.name }}
                      </div>
                      <!-- 旧菜 -->
                      <div v-if="!item1.newDish" style="width: auto; white-space: break-spaces; line-height: 40px">
                        {{ item1.name }}
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <!-- <el-table :data="dishData[item]" border highlight-current-row>
              <el-table-column label="时间">
                <template #default="scope">
                  {{ Object.values(labelText)[scope.$index] }}
                </template>
              </el-table-column>
              <el-table-column label="早餐" prop="breakfastName">
              </el-table-column>
              <el-table-column label="午餐">
                <el-table-column prop="lunchMeatDishName">
                  <template #default="{ row }">
                    <img
                      :src="'data:image/jpeg;base64,' + row.lunchMeatDishBase64"
                      alt=""
                      style="width: 40px; height: 40px"
                    />
                    <div>{{ row.lunchMeatDishName }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="lunchVegetableDishName">
                  <template #default="{ row }">
                    <img
                      :src="'data:image/jpeg;base64,' + row.lunchVegetableDishBase64"
                      alt=""
                      style="width: 40px; height: 40px"
                    />
                    <div>{{ row.lunchVegetableDishName }}</div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="晚餐">
                <el-table-column prop="dinnerMeatDishName">
                  <template #default="{ row }">
                    <img
                      :src="'data:image/jpeg;base64,' + row.dinnerMeatDishBase64"
                      alt=""
                      style="width: 40px; height: 40px"
                    />
                    <div>{{ row.dinnerMeatDishName }}</div>
                  </template>
                </el-table-column>
                <el-table-column prop="dinnerVegetableDishName">
                  <template #default="{ row }">
                    <img
                      :src="'data:image/jpeg;base64,' + row.dinnerVegetableDishBase64"
                      alt=""
                      style="width: 40px; height: 40px"
                    />
                    <div>{{ row.dinnerVegetableDishName }}</div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column label="汤" prop="soup"></el-table-column>
              <el-table-column label="配菜" prop="garnish"></el-table-column>
              <el-table-column label="水果" prop="fruit"></el-table-column>
            </el-table> -->
          </el-scrollbar>
          <!-- <el-table :data="tableData">
            <el-table-column label="餐食类型" prop="mealType" />
            <el-table-column v-for="day in daysOfWeek" :key="day" :label="day.name">
              <template #default="scope">
                <span v-if="scope.row[day.day]">{{ scope.row[day.day] }}</span>
              </template>
            </el-table-column>
          </el-table> -->
        </el-carousel-item>
      </el-carousel>
      <!-- <el-radio-group v-model="dishIndex" @change="changeBtnIndex" style="margin-top: 10px">
        <el-radio-button :value="0" :label="0">菜谱1</el-radio-button>
        <el-radio-button :value="1" :label="1">菜谱2</el-radio-button>
        <el-radio-button :value="2" :label="2">菜谱3</el-radio-button>
        <el-radio-button :value="3" :label="3">菜谱4</el-radio-button>
        <el-radio-button :value="4" :label="4">菜谱5</el-radio-button>
      </el-radio-group> -->
    </div>
  </div>
</template>

<script>
import axios from "@/utils/http";
import { ElMessage, ElMessageBox } from "element-plus";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      labelText: {
        Monday: "星期一",
        Tuesday: "星期二",
        Wednesday: "星期三",
        Thursday: "星期四",
        Friday: "星期五",
        Saturday: "星期六",
      },

      FormData: { fiveDayByWeek: false }, //菜谱配置
      dishData: [], //所有菜谱的数据
      tableData: [],
      // daysOfWeek: [
      //   { day: 1, name: "周一" },
      //   { day: 2, name: "周二" },
      //   { day: 3, name: "周三" },
      //   { day: 4, name: "周四" },
      //   { day: 5, name: "周五" },
      //   { day: 6, name: "周六" },
      // ],
      daysOfWeek: { 1: "周一", 2: "周二", 3: "周三", 4: "周四", 5: "周五", 6: "周六" },
      dishIndex: 0,
      oneWeekMenu: {}, //单周菜谱数据
      meals: [
        { name: "早餐" },
        { name: "午餐" },
        { name: "午餐" },
        { name: "晚餐" },
        { name: "晚餐" },
        { name: "汤" },
        { name: "小菜" },
        { name: "水果" },
      ],
      isEdit: false, //是否编辑菜谱
      editArr: [], //修改过的菜谱
      dishList: [], //所有成品菜，修改菜谱需要过滤不同的餐别
      isShowImg: false, //是否显示菜谱的图片
      nextWeekName: null, //下周具体周数
      titleDate: [], //菜谱上面显示的日期
      oneweekTableData: [], //单周的菜谱数据
      oneweekTableDataCopy: [], //单周的菜谱数据
      checkList: [false, false, false, false, false, false], //判断是否不开餐
      firstColumnWidth: 120, //控制第一列的宽度，导出时减少1px
    };
  },

  mounted() {
    this.getDefaultData();
    this.getOneWeekMenu();
  },
  methods: {
    addClass({ rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        return "firstColumn";
      }
      if (rowIndex === 4 || rowIndex === 5) {
        return "lastRow";
      }
    },
    //获取配置信息
    getDefaultData() {
      axios.get("/ifi-personal/dish/menu/getDefaultData").then((res) => {
        if (res.data.code == 0) {
          this.FormData = res.data.data;
          this.FormData.fiveDayByWeek = false;
        }
      });
    },
    //生成菜谱
    handleGetMenu() {
      if (
        Number(this.FormData.noNewDish) + Number(this.FormData.addNewDish) + Number(this.FormData.systemNewDish) ===
          24 &&
        this.FormData.fiveDayByWeek !== undefined
      ) {
        axios.post("/ifi-personal/dish/menu/generateNextWeekMenu", this.FormData).then((res) => {
          if (res.data.code == 0) {
            this.dishData = [];
            Object.values(res.data.data).forEach((op) => {
              let data = {
                早餐: { time: "早餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
                午餐: { time: "午餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
                晚餐: { time: "晚餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
                汤: { time: "汤", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
                小菜: { time: "小菜", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
                水果: { time: "水果", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
              };

              op.forEach((it) => {
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
              this.dishData.push(data);
            });
          }
        });
      } else {
        ElMessage.error("菜品总数需为24，且必须选择下周有几天");
      }
    },
    //修改上面菜谱要同时修改按钮组
    changeDishIndex(newIndex) {
      this.dishIndex = newIndex;
    },
    //修改按钮组也要修改菜谱
    changeBtnIndex(val) {
      this.$refs.carousel.setActiveItem(val);
    },
    //保存菜谱
    saveDish() {
      let sourceData = [];
      Object.values(this.dishData[this.dishIndex]).forEach((it) => {
        Object.values(it).forEach((op) => {
          if (Array.isArray(op)) {
            Array.prototype.push.apply(sourceData, op);
          }
        });
      });
      axios.post("/ifi-personal/dish/menu/saveMenu", sourceData).then((res) => {
        if (res.data.code == 0) {
          ElMessage.success("保存成功");
          this.getOneWeekMenu();
        }
      });
    },
    //获取下周日期
    getNextWeekStartAndEnd() {
      const currentDate = new Date();
      const currentDayOfWeek = currentDate.getDay();

      let daysUntilNextMonday = (8 - currentDayOfWeek) % 7;
      if (daysUntilNextMonday === 0) {
        daysUntilNextMonday = 7;
      }
      const nextMondayDate = new Date(currentDate.getTime() + daysUntilNextMonday * 24 * 60 * 60 * 1000);
      const nextSundayDate = new Date(nextMondayDate.getTime() + 6 * 24 * 60 * 60 * 1000);

      const startDateFormatted =
        nextMondayDate.getFullYear() +
        "-" +
        this.padZero(nextMondayDate.getMonth() + 1) +
        "-" +
        this.padZero(nextMondayDate.getDate());

      const endDateFormatted =
        nextSundayDate.getFullYear() +
        "-" +
        this.padZero(nextSundayDate.getMonth() + 1) +
        "-" +
        this.padZero(nextSundayDate.getDate());

      return { startDate: startDateFormatted, endDate: endDateFormatted };
    },
    padZero(num) {
      return num < 10 ? "0" + num : num;
    },
    //获取单周菜谱
    getOneWeekMenu() {
      const { startDate, endDate } = this.getNextWeekStartAndEnd();
      this.titleDate = [startDate.split("-"), endDate.split("-")];
      axios
        .post("/ifi-personal/dish/menu/getMenuListByDate", {
          endDate: endDate,
          startDate: startDate,
          all: false,
        })
        .then((res) => {
          if (res.data.code == 0) {
            this.oneweekTableData = Object.values(res.data.data);
            this.oneweekTableDataCopy = JSON.parse(JSON.stringify(this.oneweekTableData));
            let data = {
              早餐: { time: "早餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
              午餐: { time: "午餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
              晚餐: { time: "晚餐", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
              汤: { time: "汤", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
              小菜: { time: "小菜", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
              水果: { time: "水果", 1: [], 2: [], 3: [], 4: [], 5: [], 6: [] },
            };
            this.oneWeekMenu = [];
            if (Object.keys(res.data.data).length > 0) {
              this.nextWeekName = Object.keys(res.data.data)[0];
              Object.values(res.data.data)[0].forEach((it) => {
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
              this.oneWeekMenu = data;
              // this.$nextTick(() => {
              //   // tableRef是表格的ref属性值
              //   if (this.$refs.tableRef && this.$refs.tableRef.doLayout) {
              //     this.$refs.tableRef.doLayout();
              //   }
              // });
              // console.log(this.oneWeekMenu, 999);
            }
          }
        });
    },

    //修改caipu
    handleEditDish() {
      var node = document.getElementById("table");

      node.classList.remove("lastRowHidden");

      this.isEdit = true;
      axios.get("/ifi-personal/dish/finished/getAllFinishedDishList").then((res) => {
        if (res.data.code == 0) {
          this.dishList = res.data.data;
        }
      });
    },
    //保存单周菜圃
    handleSaveDish() {
      // console.log(Object.values(this.oneWeekMenu), 888);
      let data = [];
      const nameCounts = {};
      Object.values(this.oneWeekMenu).forEach((it) => {
        Object.values(it).forEach((op) => {
          if (Array.isArray(op)) {
            Array.prototype.push.apply(data, op);
            op.forEach((item) => {
              if (nameCounts[item.name] && item.name !== "不开餐") {
                nameCounts[item.name]++;
              } else {
                nameCounts[item.name] = 1;
              }
            });
          }
        });
      });
      // console.log(nameCounts, 888);
      const duplicates = Object.keys(nameCounts).filter((name) => nameCounts[name] > 1);
      // console.log(duplicates, 888);

      if (duplicates.length > 0) {
        ElMessageBox.confirm(
          "下列菜品重复出现：" + "<br>" + `${duplicates.join("；")}` + "<br>" + "是否继续保存",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            dangerouslyUseHTMLString: true,
            type: "warning",
          },
        ).then(() => {
          this.handleSave(data);
        });
      } else {
        this.handleSave(data);
      }
    },
    //保存单周菜谱的请求
    handleSave(data) {
      axios.post("/ifi-personal/dish/menu/updateMenu", data).then((res) => {
        if (res.data.code == 0) {
          ElMessage.success("保存成功");
          var node = document.getElementById("table");

          node.classList.add("lastRowHidden");
          this.isEdit = false;
          this.getOneWeekMenu();
        }
      });
    },
    //删除菜谱
    handleDelectDish() {
      axios.post("/ifi-personal/dish/menu/delNextWeekMenu").then((res) => {
        if (res.data.code == 0) {
          ElMessage.success("删除成功");
          this.getOneWeekMenu();
        }
      });
    },
    //导出图片
    handleExport() {
      // this.firstColumnWidth = 118;
      var node = document.getElementById("table");
      // node.classList.add("lastRowHidden");
      let _this = this;
      html2canvas(node, { logging: true, scale: 2 }).then(function (canvas) {
        // node.classList.remove("lastRowHidden");
        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = `${_this.titleDate[0] + " 至 " + _this.titleDate[1] + " 食谱"}.png`;
        a.click();
      });
    },
    //表格合并
    arraySpanMethod({ columnIndex, rowIndex }) {
      if (columnIndex !== 0) {
        const data = this.oneweekTableData[0]
          .filter((it) => it.dayOfWeek === columnIndex)
          .every((op) => op.name === "不开餐");
        if (data) {
          if (rowIndex === 0) {
            this.checkList[columnIndex - 1] = true;
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
    },
    //改变图片
    changeDish(val, name) {
      const item = this.dishList.find((it) => it.name === name);
      val.base64 = item.base64;
      val.path = item.path;
      // row.base64 = val.base64;
    },
    //修改菜谱时的数据处理
    filterDish(row) {
      let data = [
        { label: "不开餐", value: "不开餐" },
        {
          label: "新菜（手动添加）",
          children: [],
        },
        { label: "新菜（系统生成）", children: [] },
        { label: "常规菜", children: [] },
      ];
      this.dishList[row.type].forEach((cur) => {
        //系统生成的
        if (cur.newDish && cur.systemGenerate) {
          data[2].children.push({ label: cur.name, value: cur.name });
        } else if (cur.newDish && !cur.systemGenerate) {
          data[1].children.push({ label: cur.name, value: cur.name });
        } else if (!cur.newDish) {
          data[3].children.push({ label: cur.name, value: cur.name });
        }
      });
      data = data.filter((it, index) => {
        if (index === 0) {
          return true; // 总是保留 "不开餐" 选项
        }
        return it.children.length > 0;
      });
      return data;
    },
    //菜名定位到最后一级,级联的value是数组
    handleChangeDish(row, name) {
      console.log(row, name);
      row.name = name[name.length - 1];
      const data = this.oneweekTableData[0]
        .filter((it) => it.dayOfWeek === row.dayOfWeek)
        .every((op) => op.name === "不开餐");
      if (data) {
        this.checkList[row.dayOfWeek - 1] = true;
      } else {
        this.checkList[row.dayOfWeek - 1] = false;
      }
    },
    //全天不开餐
    handleCheckChange(val, index) {
      if (val) {
        this.oneweekTableData[0]
          .filter((it) => it.dayOfWeek === index)
          .forEach((op) => {
            op.name = "不开餐";
          });
      } else {
        this.oneweekTableData[0]
          .filter((it) => it.dayOfWeek === index)
          .forEach((op) => {
            const data = this.oneweekTableDataCopy[0].find((el) => el.id === op.id);
            op.name = data.name;
          });
      }
    },
  },
};
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
.form-style {
  text-align: left;
  margin-top: 15px;
}
.table-style {
  display: flex;
}

// :deep(.el-table) {
//   border: 1px solid #000;
// }
// :deep(.el-table__border) {
//   border-color: #000 !important;
// }
// :root {
//   --el-table-border-color: #000;
// }
:deep(.el-table thead tr th) {
  // border-color: #000 !important;
  font-size: 21px;
  font-weight: normal;
  height: 50px;
}
// :deep(.el-table__header) {
//   // border: 1px solid #000;
//   font-size: 19px;
// }
// :deep(.el-table--enable-row-transition .el-table__body td.el-table__cell) {
//   border-color: #000;
// }
// :deep(.el-table--border::after) {
//   background-color: #fff;
// }

// :deep(
//     .lastRowHidden .el-table__body tbody tr.el-table__row:last-child,
//     .lastRowHidden .el-table__body tbody tr.el-table__row:nth-last-child(2)
//   ) {
//   display: none !important;
// }
:deep(.lastRowHidden .el-table__body tbody tr.el-table__row:nth-last-child(2)) {
  display: none !important;
}

//第二行隐藏
:deep(.lastRowHidden .el-table__header thead tr:nth-last-child(2)) {
  display: none !important;
}

//菜谱表格
:deep(.el-table--border::after) {
  width: 0px;
}
:deep(.el-table) {
  box-sizing: content-box;
}

:deep(.el-table .el-table__cell) {
  padding: 0;
}
:deep(.el-table .cell) {
  padding: 0;
}
</style>
