<template>
  <div class="page-style">
    <div class="final-edition">
      <div class="title">导入终版数据</div>
      <el-form>
        <el-form-item :label="$t('year')" prop="year">
          <el-select :placeholder="$t('choose')" v-model="year" @change="getKPIScore()">
            <!-- <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" /> -->
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('month')" prop="month">
          <el-select :placeholder="$t('choose')" v-model="month" @change="getKPIScore()">
            <el-option v-for="item in monthOptions" :key="item.monthId" :label="item.month" :value="item.monthId" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="downTemplate">下载模板</el-button>
          <el-upload
            class="upload-demo"
            action="#"
            accept=".xlsx,.xls"
            :on-change="loadFile"
            :before-upload="beforeUpload"
            :show-file-list="false"
            :auto-upload="false"
            style="margin-left: 10px"
            v-if="!isRootRead && !isRootDown"
          >
            <el-button type="primary" :disabled="year == '' || month == ''">{{ $t("import") }}</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
    <div class="value-edition">
      <div class="title">导入价值观数据</div>
      <el-form>
        <el-form-item :label="$t('year')" prop="year">
          <el-select :placeholder="$t('choose')" v-model="valueYear">
            <!-- <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" /> -->
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('month')" prop="month">
          <el-select :placeholder="$t('choose')" v-model="valueMonth">
            <el-option v-for="item in monthOptions" :key="item.monthId" :label="item.month" :value="item.monthId" />
          </el-select>
        </el-form-item>
        <!-- <el-form-item :label="$t('userName')">
          <el-select :placeholder="$t('choose')" v-model="userId" @change="handleUserSelect">
            <el-option v-for="item in allUser" :key="item" :label="item.name" :value="item.userId"></el-option
          ></el-select>
        </el-form-item> -->
        <el-form-item>
          <el-upload
            class="upload-demo"
            action="#"
            accept=".xlsx,.xls"
            :on-change="loadValueFile"
            :show-file-list="false"
            :auto-upload="false"
            v-if="!isRootRead && !isRootDown"
          >
            <el-button type="primary" :disabled="valueYear == '' || valueMonth == '' || name == ''">{{
              $t("import")
            }}</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import * as XLSX from "xlsx/xlsx.mjs";
import rootPermission from "@/utils/common.js";
import { downTemplate, importEventHistoryData, importValueData } from "@/api/addData/index";
import { ElMessage, ElMessageBox } from "element-plus";
import { getAllUser } from "@/api/userlist/index";
export default {
  data() {
    return {
      year: "2024",
      month: "",
      valueYear: "2024",
      valueMonth: "",
      // userId: "",
      // name: "",
      yearOptions: store.state.yearOptions ? store.state.yearOptions : [],
      monthOptions: store.state.monthOptions ? store.state.monthOptions : [],
      isRootRead: null,
      isRootDown: null,
      allUser: [],
    };
  },
  mounted() {
    this.isRootRead = rootPermission.isRootRead();
    this.isRootDown = rootPermission.isRootDown();
    getAllUser().then((res) => {
      if (res.data.code == 0) {
        this.allUser = res.data.data;
      }
    });
  },
  methods: {
    handleUserSelect(userId) {
      this.name = this.allUser.find((user) => user.userId === userId);
    },
    beforeUpload() {
      if (this.yearAndMonthData === null || this.yearAndMonthData === undefined) {
        this.$message.error("请先选择或输入年月数据！");
        return false; // 阻止文件上传
      }
      return true;
    },
    loadFile(file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file.raw);
      reader.onload = (ev) => {
        try {
          const f = ev.target.result;
          const workbook = XLSX.read(f, { type: "binary" });
          // const wsname = workbook.SheetNames[0];

          let excelData = [];
          for (let i = 0; i < workbook.SheetNames.length; i++) {
            const worksheet = workbook.Sheets[workbook.SheetNames[i]];
            // 将sheet转换为json数组
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            excelData.push(jsonData);
          }
          //先剔除所有的空数组
          excelData[0] = excelData[0].filter((item) => item.length > 0);
          excelData[0].splice(0, 1);
          //取值
          let info = excelData[0].reduce((accumulator, currentItem) => {
            //userid
            const idList = excelData[1].find((item1) => item1[1] == currentItem[0]);

            //指标id
            const targetid = excelData[2].find((item1) => item1[1] == currentItem[1]);
            const existingItem = accumulator.find((item) => item.name === currentItem[0]);
            console.log(existingItem);
            if (existingItem) {
              // 如果存在，则将当前item的target信息添加到targetInfoList
              if (!existingItem.targetInfoList) existingItem.targetInfoList = [];
              existingItem.targetInfoList.push({
                finalActualAchievementRate: currentItem[5],
                targetBasicScore: currentItem[2],
                targetId: targetid[0],
                targetName: currentItem[1],
                targetScore: currentItem[4],
                weight: currentItem[3],
              });
            } else {
              // 如果不存在，则创建新项并初始化targetInfoList
              accumulator.push({
                name: currentItem[0],
                userId: idList[0],
                deptId: idList[2],
                actionScoreNumber: currentItem[6],
                valueScore: currentItem[7],
                targetScore: currentItem[8],
                totalScore: currentItem[9],
                kpi: currentItem[10],
                year: this.year,
                month: this.month,
                targetInfoList: [
                  {
                    finalActualAchievementRate: currentItem[5],
                    targetBasicScore: currentItem[2],
                    targetId: targetid[0],
                    targetName: currentItem[1],
                    targetScore: currentItem[4],
                    weight: currentItem[3],
                  },
                ],
              });
            }

            return accumulator;
            // return Object.assign(
            //   { name: item[0] },
            //   { userId: idList ? idList[0] : null },
            //   { deptId: idList ? idList[2] : null },
            //   { targetName: item[1] },
            //   { targetId: targetid ? targetid[0] : null },
            //   { weight: item[3] },
            //   { targetBasicScore: item[2] },
            //   { targetScore: item[4] },
            //   { finalActualAchievementRate: item[5] },
            //   { actionScoreNumber: item[6] },
            //   { valueScore: item[7] },
            //   { targetScore: item[8] },
            //   { totalScore: item[9] },
            //   { kpi: item[10] },
            // );
          }, []);
          console.log(info, "数据");
          if (info) {
            ElMessageBox.confirm("是否确定导入数据", "警告", {
              cancelButtonText: "取消",
              confirmButtonText: "确定",
              type: "warning",
            }).then(() => {
              importEventHistoryData(info);
            });
          }
        } catch (e) {
          console.log(e);
        }
      };
    },
    downTemplate() {
      downTemplate();
    },
    loadValueFile(file) {
      const reader = new FileReader();
      reader.readAsBinaryString(file.raw);
      reader.onload = (ev) => {
        try {
          const f = ev.target.result;
          const workbook = XLSX.read(f, { type: "binary" });
          // console.log(workbook);
          let allExtractedData = [];
          for (let sheetIndex = 0; sheetIndex < workbook.SheetNames.length; sheetIndex++) {
            const sheetName = workbook.SheetNames[sheetIndex];
            const worksheet = workbook.Sheets[sheetName];

            // console.log(worksheet);
            let key = Object.keys(worksheet).filter((key) => key.startsWith("B") && worksheet[key]?.v === "价值观")[0];
            let startRow = Number(key.replace("B", "")) + 1;

            const userId = this.allUser.find((user) => user.name === sheetName)?.userId;
            if (!userId) {
              ElMessage.error(`${sheetName}不存在，请检查`);
              break;
            }
            // const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const columns = ["B", "C", "G", "H", "I", "J", "K", "L", "M"];
            const columnToNameMap = {
              B: "valueDescription",
              C: "actionDescription",
              G: "selfScore",
              H: "example",
              I: "hrScore",
              J: "leaderScore",
              K: "userId",
              L: "year",
              M: "month",
            };

            const extractedData = [];
            columns.forEach((column) => {
              const columnName = columnToNameMap[column]; // 根据列字母获取对应的名称
              if (!columnName) return;
              for (let rowNum = startRow; rowNum < startRow + 16; rowNum++) {
                let cellRef;
                if (column == "B" && rowNum < startRow + 4) {
                  cellRef = `${column}${startRow}`;
                } else if (column == "B" && startRow + 4 <= rowNum && rowNum < startRow + 8) {
                  cellRef = `${column}${startRow + 4}`;
                } else if (column == "B" && startRow + 8 <= rowNum && rowNum < startRow + 12) {
                  cellRef = `${column}${startRow + 8}`;
                } else if (column == "B" && startRow + 12 <= rowNum && rowNum < startRow + 16) {
                  cellRef = `${column}${startRow + 12}`;
                } else if (column == "J") {
                  cellRef = `I${rowNum}`;
                } else {
                  cellRef = `${column}${rowNum}`;
                }

                const cell = worksheet[cellRef];

                // 如果cell为undefined，说明已经到达表格末尾
                // if (!cell) break;

                // 提取单元格的值，注意根据需要处理不同的数据类型
                const value = cell === undefined || cell.v == "/" ? null : cell.v;
                if (rowNum - startRow >= extractedData.length) {
                  // 初始化新行
                  extractedData.push({});
                }
                // // 如果当前列是第一次处理，直接添加对象，否则更新已有对象
                // if (!extractedData[sheetName][rowNum - startRow]) {
                //   extractedData[sheetName][rowNum - startRow] = {}; // 初始化对象
                // }
                if (column == "B") {
                  extractedData[rowNum - startRow][columnName] = value?.replace(/\s+/g, "");
                } else if (column == "K") {
                  extractedData[rowNum - startRow][columnName] = userId;
                } else if (column == "L") {
                  extractedData[rowNum - startRow][columnName] = this.valueYear;
                } else if (column == "M") {
                  extractedData[rowNum - startRow][columnName] = this.valueMonth;
                } else {
                  extractedData[rowNum - startRow][columnName] = value;
                }
              }
            });
            // console.log(extractedData);
            allExtractedData = allExtractedData.concat(extractedData);
          }

          // console.log(allExtractedData);
          if (allExtractedData.length > 0) {
            ElMessageBox.confirm("是否确定上传价值观数据", "警告", {
              cancelButtonText: "取消",
              confirmButtonText: "确定",
              type: "warning",
            }).then(() => {
              importValueData(allExtractedData);
            });
          }
        } catch (e) {
          console.log(e);
        }
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.page-style {
  padding: 17px;
  background-color: #fff;
  height: 95%;
  border-radius: 10px;
  display: flex;
}
.final-edition,
.value-edition {
  width: 30%;
  text-align: left;
  padding: 10px;
  .title {
    margin-bottom: 20px;
    margin-left: 0 !important;
  }
}
</style>
