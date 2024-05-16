<template>
  <div class="personalAssessmentTable">
    <el-form class="titleForm">
      <el-form-item :label="$t('year')" prop="year">
        <el-select :placeholder="$t('choose')" v-model="year">
          <el-option v-for="item in $store.state.yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('month')" prop="month">
        <el-select :placeholder="$t('choose')" v-model="month">
          <el-option
            v-for="item in $store.state.monthOptions"
            :key="item.monthId"
            :label="item.month"
            :value="item.monthId"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('dept')" prop="deptId" v-if="$store.state.role == 'ROOT'">
        <el-select clearable :placeholder="$t('choose')" v-model="deptName">
          <el-option
            v-for="item in $store.state.deptOptions"
            :key="item.deptId"
            :label="item.deptName"
            :value="item.deptName"
          />
        </el-select>
      </el-form-item>
      <el-button @click="getPersonalTableData" type="primary">{{ $t("inquire") }}</el-button>
    </el-form>

    <el-table border class="table-style" :data="personalTableData2" :height="tableHeight">
      <el-table-column :label="$t('index')" type="index" width="80"></el-table-column>
      <el-table-column :label="$t('dept')" prop="deptName"></el-table-column>
      <el-table-column :label="$t('userName')" prop="name"></el-table-column>

      <el-table-column :label="$t('state')">
        <template #default="scope">
          <span v-if="scope.row.signState" style="color: #67c23a"> {{ $t("signed") }} </span>
          <span v-if="!scope.row.signState" style="color: #e6a23c"> {{ $t("noSign") }} </span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('operate')" width="120">
        <template #default="scope">
          <el-tooltip effect="light" :content="$t('previewPersonal')" placement="top">
            <el-button size="small" @click="previewKpiHistory(scope.row)" type="primary" circle
              ><el-icon><View /></el-icon></el-button
          ></el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="isPreviewHistory" :title="rowData.name + rowData.month + $t('month') + $t('valueScore')">
      <div id="printMe">
        <div class="dynysjcontent">
          <table
            border="1"
            color="black"
            cellspacing="0"
            cellpadding="0"
            style="
              table-layout: fixed;
              position: relative;
              font-family: Microsoft Yahei;
              color: black;
              border-collapse: collapse;
              font-size: 12px;
            "
          >
            <tr class="title" style="border: none; font-size: 20px">
              <th colspan="10">
                <img src="../../assets/kyLogo.png" alt="" style="position: absolute; top: 2px; left: 2px" />
                <span> 东莞凯韵科技有限公司 <br />个人绩效月考评表</span>
              </th>
            </tr>
            <tr
              class="plusBGC"
              style="
                font-size: 12px;
                border: 1px solid black;
                height: 3.8vh;
                background-color: #a6a6a6;
                font-weight: 700;
              "
            >
              <th colspan="2" style="width: 10vw">姓名</th>
              <th colspan="2">部门</th>
              <th colspan="2">职务</th>
              <th style="width: 8vw">考核月份</th>
              <th colspan="3" style="width: 10vw">依据标准</th>
            </tr>
            <tr style="height: 3.8vh; font-size: 12px; border: 1px solid black">
              <td colspan="2">{{ previewKpiHistoryData.name }}</td>
              <td colspan="2">{{ previewKpiHistoryData.deptName }}</td>
              <td colspan="2">{{ previewKpiHistoryData.position }}</td>
              <td>{{ previewKpiHistoryData.valueInfoList[0].month }}月</td>
              <td colspan="3" class="standard" style="width: 12vw">依每月《部门绩效考核汇总表》进行</td>
            </tr>
            <tr
              class="plusBGC"
              style="
                height: 3.5vh;
                font-size: 16px;
                font-weight: 700;
                background-color: #a6a6a6;
                border: 1px solid black;
              "
            >
              <th colspan="10">业绩指标考评（70%）</th>
            </tr>
            <tr style="font-weight: 700; height: 3.8vh; font-size: 12px; border: 1px solid black">
              <th class="noWidth" style="width: 4vw">NO.</th>
              <th style="width: 18vw">指标名称</th>
              <th style="width: 5vw">权重</th>
              <th style="width: 8vw">目标值</th>
              <th style="width: 6vw">实现值</th>
              <th style="width: 8vw">指标得分</th>
              <th>实际得分</th>
              <th colspan="3" style="width: 319px">备注（加分说明）</th>
            </tr>
            <tr
              v-for="(item, index) in previewKpiHistoryData.targetInfoList"
              :key="index"
              style="height: 32px; font-size: 12px; border: 1px solid black"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.targetName }}</td>
              <td>{{ item.weight }}</td>
              <td>{{ item.goalValue }}</td>
              <td>{{ item.realizedValue }}</td>
              <td>{{ item.targetScore }}</td>
              <td>{{ item.weightedTargetScore }}</td>
              <td colspan="3">
                <span v-for="(remark, index) in item.mark.split('@')" :key="index"
                  >{{ remark }}<br v-if="index !== item.mark.split('@').length - 1" />
                </span>
              </td>
            </tr>
            <tr class="bold" style="height: 4vh; font-size: 14px; font-weight: 700; border: 1px solid black">
              <th colspan="2">业绩实际得分</th>
              <th colspan="8">{{ previewKpiHistoryData.performanceActualScore }}</th>
            </tr>
            <tr
              class="plusBGC"
              style="
                height: 3.8vh;
                font-size: 16px;
                font-weight: 700;
                background-color: #a6a6a6;
                border: 1px solid black;
              "
            >
              <th colspan="10">价值观指标考评（30%,每条做到为1分，反之0分，共16分）</th>
            </tr>
            <tr style="font-weight: 700; height: 4vh; font-size: 12px; border: 1px solid black" class="valueHeader">
              <th class="noWidth">NO.</th>
              <th>价值观</th>
              <th colspan="4">行为描述</th>
              <th>自评</th>
              <th style="width: 35vw">案例（带*号的需要提供）</th>
              <th style="width: 8vw">上级评</th>
              <th style="width: 18vw">备注</th>
            </tr>
            <tr
              v-for="(item, index) in previewKpiHistoryData.valueInfoList"
              :key="index"
              style="height: 4vh; border: 1px solid black"
              :style="{ backgroundColor: item.index % 2 === 0 ? '#D8D8D8' : '' }"
              class="item"
            >
              <td v-if="item.rowspan" :rowspan="item.rowspan">{{ item.index }}</td>
              <td :rowspan="item.rowspan" v-if="item.rowspan" style="text-align: left; padding-left: 3px; color: black">
                {{ item.valuDescription }}
              </td>
              <td colspan="4" style="text-align: left; padding-left: 3px">
                <div v-html="item.actionDescription" style="text-align: left"></div>
              </td>
              <td>{{ item.selfScore }}</td>
              <td>{{ item.example }}</td>
              <td>{{ item.hrScore }}</td>
              <td>
                <span v-for="(remark, index) in item.remark.split('$')" :key="index"
                  ><span v-if="remark.split('：')[1] !== '未备注'">
                    <span v-if="remark.split(':')[1] !== '未备注'"
                      >{{ remark }}<br v-if="index !== item.remark.split('$').length - 1" /></span
                  ></span>
                </span>
              </td>
            </tr>

            <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
              <th colspan="2">价值观总得分</th>
              <th colspan="8">{{ previewKpiHistoryData.valueTotalScore }}</th>
            </tr>
            <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
              <th colspan="2">价值观实际得分</th>
              <th colspan="8" id="valueActuslStyle">{{ previewKpiHistoryData.valueActualScore }}</th>
            </tr>
            <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
              <th colspan="2">绩效总分</th>
              <th colspan="8">{{ previewKpiHistoryData.totalScore }}</th>
            </tr>
            <tr class="bold" style="height: 3.5vh; font-size: 14px; font-weight: 700; border: 1px solid black">
              <th colspan="2">奖金系数</th>
              <th colspan="8">{{ previewKpiHistoryData.bonusCoefficient }}</th>
            </tr>
            <tr
              class="plusBGC"
              style="
                height: 29px;
                font-size: 16px;
                font-weight: 700;
                background-color: #a6a6a6;
                border: 1px solid black;
              "
            >
              <th colspan="10">注意事项</th>
            </tr>
            <tr class="precautions" style="text-align: left; height: 5.2vh; border: 1px solid black">
              <td colspan="10">
                1、审批流程：HR编制--部门负责人与被考核人员确认---HR确认并归档； <br />
                2、每月13日前部门负责人确认完毕交人事行政部。
              </td>
            </tr>
            <tr
              class="plusBGC"
              style="
                height: 29px;
                font-size: 16px;
                font-weight: 700;
                background-color: #a6a6a6;
                border: 1px solid black;
              "
            >
              <th colspan="10">签名</th>
            </tr>
            <tr class="bold" style="height: 3.9vh; font-size: 13px; font-weight: 700; border: 1px solid black">
              <th colspan="2" rowspan="2">被考核人/日期</th>
              <td colspan="8" rowspan="2">
                <img
                  v-if="rowData.signState"
                  :src="getImageUrl(rowData)"
                  alt="未找到"
                  style="height: 8vh; width: 250px"
                />
                <span v-if="rowData.signTime !== null" style="font-size: 20px">{{ rowData.signTime }}</span>
              </td>
            </tr>
            <tr style="height: 3.9vh; border: 1px solid black"></tr>
          </table>
        </div>
      </div>
      <div style="text-align: right; margin-top: 20px" v-if="!isRootRead">
        <el-button type="primary" v-print="'#printMe'">{{ $t("print") }}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import { previewKpiHistory, getPersonalData } from "../../api/kpi";
import print from "vue3-print-nb";
import { downPdf } from "@/utils/exportPdf.js";
import { View } from "@element-plus/icons-vue";
import rootPermission from "@/utils/common.js";

export default {
  components: { View },
  directives: {
    print,
  },
  data() {
    return {
      year: "",
      month: "",
      deptName: "",
      previewKpiHistoryData: {}, //预览表格的数据

      isPreviewHistory: false, //控制预览窗口
      rowData: {}, //当前行的数据
      personalTableData: [], //表格的数据
      personalTableData2: [],
      tableHeight: null,
      rules: {
        year: [{ required: true, message: "请选择年份", trigger: "blur" }],
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
      },
      isRootRead: null, //判断管理员是否只读
    };
  },

  mounted() {
    this.year = store.state.year;
    this.month = store.state.criticalMonth;

    this.$nextTick(() => {
      // 根据浏览器高度设置初始高度
      this.tableHeight = window.innerHeight - 190;
      // 监听浏览器高度变化，改变表格高度
      window.onresize = () => {
        this.tableHeight = window.innerHeight - 190;
      };
    });
    this.getPersonalTableData();
    this.isRootRead = rootPermission.isRootRead();
  },
  methods: {
    getPersonalTableData() {
      getPersonalData({ year: this.year, month: this.month, deptId: null }).then((res) => {
        if (res.data.code == 0) {
          this.personalTableData = res.data.data;
          this.personalTableData2 = this.personalTableData;
          this.selectPerformance();
        }
      });
    },
    //查询
    selectPerformance() {
      if (this.deptName != "") {
        this.personalTableData2 = this.personalTableData.filter((item) => item.deptName == this.deptName);
      } else {
        this.personalTableData2 = this.personalTableData;
      }
    },
    async previewKpiHistory(row) {
      this.rowData = row;
      this.rowData.year = this.year;
      this.rowData.month = this.month;

      const data = {
        year: this.rowData.year,
        month: this.rowData.month,
        userId: row.userId,
      };
      await previewKpiHistory(data)
        .then((res) => {
          if (res.data.code == 0) {
            this.isPreviewHistory = true;
            res.data.data.valueInfoList = res.data.data.valueInfoList.map((item) => {
              if (item.deptRemark && item.hrRemark) {
                const remark = item.deptRemark + item.hrRemark;
                return { ...item, remark: remark };
              }
            });
            this.previewKpiHistoryData = res.data.data;
          } else {
            this.previewKpiHistoryData = [];
          }
        })
        .catch((e) => {
          console.log(e);
        });
      this.combineCell(this.previewKpiHistoryData.valueInfoList);
    },
    // 合并
    combineCell(dataList) {
      let index = 0;
      for (let i = 0; i < dataList.length; i++) {
        // 循环开始行
        let startRow;
        // 需合并的行数
        let rowspan = 1;

        // 循环到最后一行时
        if (i === dataList.length - 1) {
          // 如果最后一行和倒数第二行属性不同，则rowspan=1；否则直接结束循环
          if (dataList[i].valuDescription !== dataList[i - 1].valuDescription) {
            dataList[i].rowspan = rowspan;
          }
          break;
        }
        // 内层循环记录rowspan的数量
        for (let j = i; j < dataList.length - 1; j++) {
          // 记录循环结束的行数
          startRow = j;
          // 属性相同则rowspan+1；否则直接结束内循环
          if (dataList[j].valuDescription === dataList[j + 1].valuDescription) {
            rowspan++;
          } else {
            break;
          }
        }
        // 为数组添加rowspan属性
        dataList[i].rowspan = rowspan;
        // console.log(i, rowspan);
        index += 1;
        for (let j = i; j < i + rowspan; j++) {
          dataList[j].index = index;
        }

        // 控制外循环从内循环结束的行数开始
        i = startRow;
      }
      this.previewKpiHistoryData.valueInfoList = dataList;
    },
    //下载pdf
    downPdf() {
      downPdf(document.querySelector("#printMe"), this.rowData.name + this.rowData.month + "月份绩效考评表");
    },
    getImageUrl(rowData) {
      return `${process.env.VUE_APP_API_BASE_URL}${rowData.signfileName}&userId=${rowData.userId}&token=${this.$store.state.token}&year=${this.year}&month=${this.month}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.personalAssessmentTable {
  padding: 17px;
  background-color: #fff;
  height: 95%;
  border-radius: 10px;
}
.titleForm {
  display: flex;
  justify-content: space-between;
  width: 50vw;
  margin-left: auto;
}

@media print {
  @page {
    size: auto;
    margin: 10mm 22mm 10mm 22mm;
  }
  body,
  html {
    width: auto !important;
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
</style>
