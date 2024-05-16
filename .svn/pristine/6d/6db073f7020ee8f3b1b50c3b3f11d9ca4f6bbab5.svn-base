<template>
  <div class="kpiTable">
    <!-- 此页面没有被使用 -->

    <el-form :rules="rules" class="titleForm">
      <el-form-item label="年份" prop="year">
        <el-select placeholder="请选择年份" v-model="year" style="width: 100px">
          <el-option v-for="item in $store.state.yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="月份" prop="month">
        <el-select placeholder="请选择月份" v-model="month" style="width: 100px">
          <el-option
            v-for="item in $store.state.monthOptions"
            :key="item.monthId"
            :label="item.month"
            :value="item.monthId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-select clearable placeholder="请选择" multiple v-model="deptId" style="width: 250px">
          <el-option
            v-for="item in $store.state.deptOptions"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名"
        ><el-input placeholder="请输入" v-model="name" style="width: 160px"></el-input
      ></el-form-item>
      <!-- <el-form-item label="状态">
        <el-select clearable placeholder="请选择" v-model="finishState" style="width: 100px">
          <el-option
            v-for="item in finishStateOptions"
            :key="item.name"
            :label="item.name"
            :value="item.state"
          ></el-option></el-select
      ></el-form-item> -->
      <el-button @click="selectKpiHistory">查询</el-button>
      <el-button v-if="completionProgress == 100.0" type="warning" @click="saveKPI">保存</el-button>
      <el-button type="primary" @click="downLoadKPIExcel">导出报表</el-button>
    </el-form>
    <!-- <el-table border :data="outerLayerTableData" height="69vh" :row-class-name="tableRowClassName">
      <el-table-column label="详情" type="expand" width="80">
        <template #default="scope">
          <div style="padding: 20px"> -->
    <el-table
      :data="outerLayerTableData"
      border
      @selection-change="handleSelectionChange"
      class="table-style"
      height="68vh"
      id="kpi-table"
    >
      <!-- <el-table-column
        type="selection"
        width="80"
        align="center"
        v-if="completionProgress.length > 0"
        :selectable="selectEnable"
      ></el-table-column> -->
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <!-- <el-table-column label="事件名称">
        <template #default="scope"> {{ scope.row.eventName.split("@")[0] }}</template>
      </el-table-column> -->
      <el-table-column label="部门" prop="deptName"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="奖金系数%" prop="kpi"></el-table-column>
      <el-table-column label="价值观分值" prop="valueScore"></el-table-column>
      <el-table-column label="业绩分值" prop="targetScore"></el-table-column>
      <el-table-column label="KPI总分" prop="totalScore"></el-table-column>
      <!-- 
              <el-table-column label="状态">
                <template #default="scope">
                  <span
                    v-if="scope.row.valueFlowComplete == true && scope.row.targetFlowComplete == true"
                    style="color: #67c23a"
                  >
                    已审批
                  </span>
                  <span
                    v-if="scope.row.valueFlowComplete == true && scope.row.targetFlowComplete == false"
                    style="color: #e6a23c"
                  >
                    业绩正在审批中
                  </span>

                  <span
                    v-if="scope.row.valueFlowComplete == false && scope.row.targetFlowComplete == true"
                    style="color: #e6a23c"
                  >
                    价值观正在审批中
                  </span>
                  <span
                    v-if="scope.row.valueFlowComplete == false && scope.row.targetFlowComplete == false"
                    style="color: #f56c6c"
                  >
                    价值观、业绩未完成审批
                  </span>
                </template>
              </el-table-column> -->
      <el-table-column label="操作" v-if="showRemoveCol">
        <template #default="scope">
          <!-- <el-button size="small" @click="previewKpiHistory(scope.row)">预览</el-button> -->
          <el-button type="danger" size="small" plain @click="getSencond(scope.row)" v-if="!scope.row.eventKpiDatSave"
            >移除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- </div>
        </template>
      </el-table-column> -->

    <!-- <el-table-column label="事件年份" prop="year" width="150"></el-table-column>
      <el-table-column label="事件月份" prop="month" width="150"></el-table-column>
      <el-table-column label="事件名称" prop="eventName"></el-table-column>
      <el-table-column label="事件完成进度(%)" prop="completionProgress" v-if="completionProgress.length > 0"
        ><template #default="scope">
          <div>
            <el-progress :percentage="scope.row.completionProgress" />
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="completionProgress.length > 0">
        <template #default="scope">
          <el-popover
            placement="top"
            :width="200"
            trigger="click"
            content="当前事件完成进度未达100%，保存功能暂不开放。"
            v-if="scope.row.completionProgress != 100.0"
          >
            <template #reference>
              <el-button type="info" size="small" plain>未保存</el-button>
            </template>
          </el-popover>
          <el-button type="success" size="small" plain v-else-if="scope.row.eventKpiDatSave">已保存</el-button>
          <el-button type="warning" size="small" plain @click="saveKPI(scope.row)" v-else>去保存</el-button>

          <el-popover
            placement="top"
            :width="200"
            trigger="click"
            content="当前事件已保存为终版数据，没有要移除的数据。"
            v-if="scope.row.eventKpiDatSave"
          >
            <template #reference>
              <el-button type="info" size="small" plain>移除行</el-button>
            </template>
          </el-popover>
          <el-button type="danger" size="small" plain @click="getSencond" v-else>移除行</el-button>
        </template>
      </el-table-column>
    </el-table> -->

    <el-dialog v-model="isRemove" title="警告" style="width: 500px" align-center>
      <div style="text-align: left">
        移除将改变事件的完成进度，且该员工KPI数据不会被保存、无法预览/打印【绩效月考评表】，移除该员工整个审批流程，是否确定移除
      </div>
      <div style="text-align: right; margin-top: 20px">
        <el-button @click="isRemove = false">取消</el-button
        ><el-button type="primary" @click="removeUser()" :disabled="confirmButtonTextRef == '确定' ? false : true">{{
          confirmButtonTextRef
        }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { deptList } from "@/api/register/index";
import { ElMessage, ElMessageBox } from "element-plus";
import { selectKpiHistory } from "../../api/kpi";
import { saveKPIData, removeUser, calculateNewestKpi } from "@/api/kpi/index";
import store from "../../store";
import print from "vue3-print-nb";
// import FileSaver from "file-saver";
// import * as XLSX from "xlsx";
// import XLSXStyle from "xlsx-style";
// import { downPdf } from "@/utils/exportPdf.js";

export default {
  name: "kpiHistory",
  directives: {
    print,
  },
  data() {
    return {
      year: "",
      month: "",
      criticalMonth: "",
      deptId: [],
      name: "",
      deptOptions: [],
      // yearOptions: [],
      // tableData: [],
      // tableData1: [],
      outerLayerTableData: [], //外层表格数据
      previewKpiHistoryData: {}, //预览表格的数据
      isPreviewHistory: false, //控制预览窗口
      rowData: {}, //当前行的数据
      removeUserKpi: [], //多选
      completionProgress: "", //最新月的进度数据
      completionProgressRowData: {}, //当前需要保存的事件的第一行数据，用来获取事件名和id
      showRemoveCol: false, //判断移除列是否显示，当所有行都被保存就不展示
      confirmButtonTextRef: "5秒后确定",
      isRemove: false,

      // headers: ["<tr><th>NO.</th><th>价值观</th><th>行为描述</th><th>自评</th><th></th></th><th>上级评</th></tr>"],
      finishStateOptions: [
        { name: "已审批完成", state: true },
        { name: "未审批完成", state: false },
      ],
      finishState: "",
      rules: {
        year: [{ required: true, message: "请选择年份", trigger: "blur" }],
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
      },
    };
  },
  created() {
    this.nowtime();

    this.selectKpiHistory();
    // console.log(this.KPILatestUpdateTime);
    // console.log(window.innerHeight);
    // console.log(window.innerWidth);
  },

  methods: {
    nowtime() {
      this.year = store.state.year;
      this.month = store.state.criticalMonth;
    },
    async selectKpiHistory() {
      // if (this.$route.query.name) {
      //   this.name = this.$route.query.name;
      // }
      let tableData;
      const data = { year: this.year, month: this.month, deptIdList: this.deptId, name: this.name };
      if (this.month == store.state.criticalMonth) {
        await calculateNewestKpi(data).then((res) => {
          if (res.data.code == 0 && Object.keys(res.data.data).length > 0) {
            for (const [eventName, eventInfo] of Object.entries(res.data.data)) {
              const valueAfterAt = eventName.split("@")[1]; // 获取(eventName)@后面的数值
              // console.log(eventInfo[0]);
              if (!eventInfo[0].eventKpiDatSave) {
                console.log(eventInfo[0]);
                // 判断eventKpiDatSave是否为true
                this.completionProgress = valueAfterAt;
                this.completionProgressRowData = eventInfo[0];
              }
            }
            // this.completionProgress = Object.keys(res.data.data)[0]
            //   .match(/@\d+(\.\d+)?/)[0]
            //   .slice(1);

            // console.log(this.completionProgress);
            tableData = Object.values(res.data.data);
            // console.log(tableData, 111);
          } else if (Object.keys(res.data.data).length == 0) {
            ElMessage.error("查询数据为空");
            tableData = [];
          }
        });
      } else {
        await selectKpiHistory(data).then((res) => {
          if (res.data.code == 0 && Object.keys(res.data.data).length > 0) {
            tableData = Object.values(res.data.data);
            // console.log(tableData, 222);
          } else if (Object.keys(res.data.data).length == 0) {
            ElMessage.error("查询数据为空");
            tableData = [];
          }
        });
      }
      tableData = [].concat(...tableData).map((item) => {
        if (!item.eventKpiDatSave) {
          this.showRemoveCol = true;
        } else {
          this.showRemoveCol = false;
        }
        const deptOption = store.state.deptOptions.find((item2) => item2.deptId === item.deptId);
        return { ...item, deptName: deptOption?.deptName || item.deptName };
      });
      // this.outerLayerTableData = [].concat(...tableData);
      this.outerLayerTableData = tableData;
      console.log("表格数据", this.outerLayerTableData);
      // this.KPILatestUpdateTime = res.data.data.KPILatestUpdateTime;
      // console.log(this.KPILatestUpdateTime);

      // tableData = tableData.map((item) => {
      //   const list = item.map((item1) => {
      //     return {
      //       ...item1,
      //       year: this.year,
      //       month: this.month,
      //     };
      //   });
      //   if (this.month == store.state.criticalMonth) {
      // this.completionProgress = item[0].eventName.match(/@\d+(\.\d+)?/)[0].slice(1);             b
      //     return {
      //       year: this.year,
      //       month: this.month,
      //       eventKpiDatSave: item[0].eventKpiDatSave,
      //       eventName: item[0].eventName.match(/[^@]*/)[0],
      //       completionProgress: item[0].eventName.match(/@\d+(\.\d+)?/)[0].slice(1),
      //       list: list,
      //     };
      //   } else {
      //     this.completionProgress = "";
      //     return {
      //       year: this.year,
      //       month: this.month,
      //       eventName: item[0].eventName.match(/[^@]*/)[0],
      //       list: list,
      //     };
      //   }
      // });

      // this.outerLayerTableData = this.outerLayerTableData.filter((item) =>
      // item.list.map((item1) => !item1.activityState),
      // );

      // this.outerLayerTableData = tableData.map((item) => ({
      //   ...item,
      //   list: item.list
      //     .filter((item1) => !item1.activityState)
      //     .map((item1) => {
      //       const deptOption = store.state.deptOptions.find((item2) => item2.deptId === item1.deptId);
      //       return { ...item1, deptName: deptOption?.deptName || item1.deptName };
      //     }),
      // }));

      // this.outerLayerTableData = tableData.map((item) => {
      //   item.list.filter((item1) => {
      //     return !item1.activityState;
      //   });
      //   item.list.map((item1) => {
      //     const deptOption = this.deptOptions.find((item2) => item2.deptId == item1.deptId);
      //     console.log(deptOption);
      //     if (deptOption) {
      //       return { ...item1, deptName: deptOption.deptName };
      //     } else {
      //       // 如果没有找到匹配的项，你可能想要返回原始的item，或者返回null，或者做其他处理
      //       return item1;
      //     }
      //   });
      // });

      // this.tableData1 = this.tableData;
      // console.log(this.tableData);
      // console.log(this.finishState);

      // if (this.finishState && this.finishState.toString().length > 0) {
      //   // console.log(11111);
      //   this.outerLayerTableData = this.outerLayerTableData.map((item) => ({
      //     ...item,
      //     list: item.list.filter((item1) => item1.valueFlowComplete && item1.targetFlowComplete),
      //   }));
      // } else if (!this.finishState && this.finishState.toString().length > 0) {
      //   // console.log(22222);
      //   this.outerLayerTableData = this.outerLayerTableData.map((item) => ({
      //     ...item,
      //     list: item.list.filter((item1) => !(item1.valueFlowComplete && item1.targetFlowComplete)),
      //   }));
      // }

      // if (this.finishState.length == 0) {
      //   // console.log(333);
      //   this.outerLayerTableData = [...this.outerLayerTableData];
      // }
      // console.log(this.outerLayerTableData);
      // if (this.tableData.length == 0) {
      //   this.saveKPI();
      // }
    },

    // async previewKpiHistory(row) {
    //   this.rowData = row;
    //   // console.log(this.rowData);
    //   if (row.eventKpiDatSave) {
    //     const data = {
    //       year: row.year,
    //       month: row.month,
    //       userId: row.userId,
    //     };
    //     await previewKpiHistory(data)
    //       .then((res) => {
    //         if (res.data.code == 0) {
    //           this.isPreviewHistory = true;
    //           this.previewKpiHistoryData = res.data.data;
    //           if (!this.previewKpiHistoryData.targetFlowIsComplete && !this.previewKpiHistoryData.valueFlowIsComplete) {
    //             ElMessageBox.confirm("当前员工价值观和业绩都未审批完成，请谨慎使用打印功能。", "警告", {
    //               type: "warning",
    //             });
    //           } else if (!this.previewKpiHistoryData.valueFlowIsComplete) {
    //             ElMessageBox.confirm("当前员工价值观未审批完成，请谨慎使用打印功能。", "警告", {
    //               type: "warning",
    //             });
    //           } else if (!this.previewKpiHistoryData.targetFlowIsComplete) {
    //             ElMessageBox.confirm("当前员工业绩未审批完成，请谨慎使用打印功能。", "警告", {
    //               type: "warning",
    //             });
    //           }
    //         } else {
    //           this.previewKpiHistoryData = [];
    //         }
    //       })
    //       .catch((e) => {
    //         console.log(e);
    //       });
    //     this.combineCell(this.previewKpiHistoryData.valueInfoList);
    //   } else {
    //     ElMessage.error("该事件未保存最终版数据，预览功能暂不开放");
    //   }
    // },
    // // 合并
    // combineCell(dataList) {
    //   // console.log(dataList);
    //   // let list = this.previewKpiHistoryData.valueInfoList;
    //   let index = 0;
    //   for (let i = 0; i < dataList.length; i++) {
    //     // 循环开始行
    //     let startRow;
    //     // 需合并的行数
    //     let rowspan = 1;

    //     // 循环到最后一行时
    //     if (i === dataList.length - 1) {
    //       // 如果最后一行和倒数第二行属性不同，则rowspan=1；否则直接结束循环
    //       if (dataList[i].valuDescription !== dataList[i - 1].valuDescription) {
    //         dataList[i].rowspan = rowspan;
    //       }
    //       break;
    //     }
    //     // 内层循环记录rowspan的数量
    //     for (let j = i; j < dataList.length - 1; j++) {
    //       // 记录循环结束的行数
    //       startRow = j;
    //       // 属性相同则rowspan+1；否则直接结束内循环
    //       if (dataList[j].valuDescription === dataList[j + 1].valuDescription) {
    //         rowspan++;
    //       } else {
    //         break;
    //       }
    //     }
    //     // 为数组添加rowspan属性
    //     dataList[i].rowspan = rowspan;
    //     // console.log(i, rowspan);
    //     index += 1;
    //     for (let j = i; j < i + rowspan; j++) {
    //       dataList[j].index = index;
    //     }

    //     // 控制外循环从内循环结束的行数开始
    //     i = startRow;
    //   }
    //   this.previewKpiHistoryData.valueInfoList = dataList;
    //   // console.log(this.previewKpiHistoryData.valueInfoList);
    // },

    handleSelectionChange(val) {
      this.removeUserKpi = val;
    },
    getSencond(row) {
      // if (this.removeUserKpi.length > 0) {
      this.isRemove = true;
      this.rowData = row;
      // 在确认按钮上显示倒计时
      let count = 5;
      const timer = setInterval(() => {
        if (count === 0) {
          clearInterval(timer);
          this.confirmButtonTextRef = "确定";
        } else {
          this.confirmButtonTextRef = `${count--}秒后确定`;
        }

        // console.log(this.confirmButtonTextRef);

        // console.log(count);
      }, 1000);
      // } else {
      //   ElMessage.error("请勾选需要移除的数据");
      // }
    },
    async removeUser() {
      // ElMessageBox.confirm(
      //   "移除将改变事件的完成进度，且该员工KPI数据不会被保存、无法预览/打印【绩效月考评表】，移除该员工整个审批流程，是否确定移除",
      //   `${this.confirmButtonTextRef}`,
      //   {
      //     confirmButtonText: this.confirmButtonTextRef,
      //     cancelButtonText: "取消",
      //     type: "warning",
      //   },
      // )
      //   .then(() => {
      // console.log(this.removeUserKpi);
      // const data = this.removeUserKpi.map((item) => {
      //   return item.userId;
      // });
      // console.log(data);
      removeUser([this.rowData.userId]).then((res) => {
        if (res.data.code == 0) {
          ElMessage.success("移除成功");
          this.selectKpiHistory();
        }
      });
      // })
      // .catch(() => {
      //   ElMessage.info("取消移除");
      // });
    },

    async saveKPI() {
      // console.log(this.completionProgressRowData);
      const message = `是否确认保存【${
        this.completionProgressRowData.eventName.split("@")[0]
      }】KPI数据，一旦保存将永久不可修改`;
      ElMessageBox.confirm(message, "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          saveKPIData(this.completionProgressRowData.eventId, this);
          this.completionProgress = true;
          // this.selectKpiHistory();
        })
        .catch((e) => {
          console.log(e);
          ElMessage.info("取消保存");
        });
    },
    // tableRowClassName(row) {
    // return row.rowIndex % 2 === 0 ? "primary-row" : "warning-row";
    // if (row.rowIndex % 2 === 0) {
    //   return row.rowIndex % 4 === 0 ? "success-row" : "warning-row";
    // } else {
    //   return "";
    // }
    // },
    //事件多选框禁用
    // selectEnable(row) {
    //   if (!row.eventKpiDatSave) {
    //     return true;
    //   }
    // },
    //下载pdf
    // downPdf() {
    //   downPdf(document.querySelector("#printMe"), this.rowData.name + this.rowData.month + "月份绩效考评表");
    // },
    //导出ecxel
    downLoadKPIExcel() {
      const XLSX = require("xlsx");
      const FileSaver = require("file-saver");

      // 1.生成Excel工作簿对象
      var wb = XLSX.utils.table_to_book(document.querySelector("#kpi-table"));

      // 获取二进制字符串作为输出
      var wbout = XLSX.write(wb, {
        bookType: "xlsx",
        book: true,
        type: "array",
      });
      try {
        FileSaver.saveAs(
          // Blob: 对象表示一个不可变 原始数据的类文件对象,不一定是JS原生格式的数据。
          // File: 基于Blob，继承了blob的功能并将其扩展使其支持用户系统上的文件。
          new Blob([wbout], { type: "appliction/octet-stream" }),
          // 设置导出的文件名称可随意
          `${this.year}年${this.month}月份奖金系数.xlsx`,
        );
      } catch (e) {
        if (typeof console != "undefined") console.log(e, wbout);
      }
      // 返回一个新创建的Blob对象，其内容由参数中给定的数组串联组成。
      return wbout;
    },
  },
};
</script>

<style lang="scss">
.kpiTable {
  padding: 17px;
  background-color: #fff;
  height: 95%;
  border-radius: 10px;
}
.kpiTableTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}
.titleForm {
  display: flex;
  justify-content: space-around;
}
.el-overlay-dialog {
  top: -50px;
}

@media print {
  @page {
    size: auto;
    margin: 10mm 22mm 10mm 22mm;
  }
  body,
  html {
    height: auto !important;
    -webkit-print-color-adjust: exact;
  }
  body {
    background-color: #fff !important;
    -webkit-print-color-adjust: exact;
  }
  .dynysjcontent {
    text-align: center;
    // height: 808px;
    background-color: #fff;
  }
}

.el-table .primary-row {
  --el-table-tr-bg-color: var(--el-color-primary-light-9);
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}

// 隐藏全选按钮
// :deep(.el-table th.el-table__cell:nth-child(1) .cell) {
//   visibility: hidden;
// }
.table-style {
  .el-table-column--selection.is-leaf .el-checkbox {
    display: none;
  }
}
</style>
