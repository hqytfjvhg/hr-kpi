<template>
  <div class="tableVisual">
    <el-form class="form-style">
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
      <el-form-item :label="$t('dept')" prop="deptId" min-width="224">
        <el-select
          min-width="184"
          style="min-width: 184px"
          clearable
          collapse-tags
          multiple
          :placeholder="$t('choose')"
          v-model="deptId"
        >
          <el-option v-for="item in relatedDept" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
        </el-select>
      </el-form-item>

      <el-button @click="getDeptKPIAllInfo" type="primary">{{ $t("inquire") }}</el-button>
    </el-form>
    <!-- 部门考核汇总表 -->

    <div style="display: flex" v-if="basicInfoMaxLength.length > 0" class="table-container" :style="{ width: width }">
      <table class="table-style" id="printMe" border="1" color="black" align="center" cellpadding="0" cellspacing="0">
        <thead>
          <tr style="height: 6vh; font-size: 20px; width: auto">
            <th :colspan="9 + basicInfoMaxLength.length * 4">
              <span v-for="(item, index) in deptNameList" :key="item"
                >{{ item.deptName }}<span v-if="index != deptNameList.length - 1">&</span></span
              >绩效考核汇总表
            </th>
          </tr>
          <tr style="font-size: 16px; height: 5vh; background-color: #a6a6a6; font-weight: 700">
            <th rowspan="2" colspan="3" style="background-color: #a6a6a6; width: 220px">
              {{ year }}年（{{ month }}）月<br />
              <!-- <span v-for="(item, index) in deptNameList" :key="item"
                >{{ item.deptName }}<span v-if="index != deptNameList.length - 1">&</span></span
              ><br />绩效考核汇总表 -->
            </th>

            <th colspan="4" v-for="(item, index) in basicInfoMaxLength" :key="item" class="targetStyle">
              指标{{ index + 1 }}
            </th>

            <th rowspan="2" colspan="3" style="background-color: #ffc000; width: 150px">价值观 <br />（16分）</th>
            <th rowspan="2" colspan="2" style="background-color: #a6a6a6; width: 150px">绩效核算</th>
            <th rowspan="3" style="background-color: #00b0f0" class="KPIStyke">奖金系数</th>
            <!-- <th rowspan="3" style="background-color: #00b0f0" class="KPIStyke">{{ month }}月系数调整</th> -->
          </tr>
          <tr style="height: 5vh">
            <td colspan="4" v-for="(item, index) in basicInfoMaxLength" :key="index" style="text-align: center">
              {{ item.targetName }}
            </td>
          </tr>

          <tr style="height: 5vh">
            <td>序号</td>
            <td>姓名</td>
            <td>职务</td>
            <td
              colspan="4"
              v-for="item in basicInfoMaxLength"
              :key="item"
              style="text-align: center"
              class="targetStyle"
            >
              <el-row>
                <el-col :span="6" style="border-right: 1px solid black; background-color: #ffff00; line-height: 5vh"
                  >权重</el-col
                >
                <el-col :span="6" style="border-right: 1px solid black; line-height: 5vh">实现值</el-col>
                <el-col :span="6" style="border-right: 1px solid black; line-height: 5vh">指标得分</el-col>
                <el-col :span="6" style="background-color: #92d050; line-height: 5vh">实际得分</el-col>
              </el-row>
            </td>
            <td style="background-color: #ffff00">权重</td>
            <td>
              指标<br />
              得分
            </td>
            <td style="background-color: #92d050">
              实际<br />
              得分
            </td>
            <td>总权重</td>
            <td style="background-color: #92d050">
              实际<br />
              总得分
            </td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in oneDeptAllKPIInfo" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td style="height: 5vh">
              {{ item.position }}
            </td>
            <td colspan="4" v-for="(item1, index) in item.basicInfoContentList" :key="index" class="targetStyle">
              <el-row>
                <el-col
                  :span="6"
                  style="border-right: 1px solid black; line-height: 5vh"
                  :style="{ backgroundColor: item1['weight_' + item1.targetId] == '' ? '' : '#ffff00' }"
                  >{{ item1["weight_" + item1.targetId]
                  }}<span v-if="item1['weight_' + item1.targetId] != ''">%</span></el-col
                >
                <el-col :span="6" style="border-right: 1px solid black; line-height: 5vh">{{
                  item1["finalActualAchievementRate_" + item1.targetId]
                }}</el-col>
                <el-col :span="6" style="border-right: 1px solid black; line-height: 5vh">{{
                  item1["targetBasicScore_" + item1.targetId]
                }}</el-col>
                <el-col :span="6" style="line-height: 5vh">{{ item1["targetScore_" + item1.targetId] }}</el-col>
              </el-row>
            </td>

            <td>{{ item.valueWeight }}%</td>
            <td>{{ item.valueSumScore }}</td>
            <td>{{ item.valueResultScore }}</td>
            <td>100%</td>
            <td>{{ item.resultTotalScore }}</td>
            <td style="font-weight: 700">{{ item.bnousCoefficient }}%</td>
            <!-- <td></td> -->
          </tr>
        </tbody>
      </table>
      <!-- <table
        border="1"
        color="black"
        align="center"
        cellpadding="0"
        cellspacing="0"
        style="border-left: none"
        class="signTableStyle"
      >
        <thead>
          <tr style="height: 5vh; font-size: 16px">
            <th rowspan="3">是否已签名</th>
            <th rowspan="3">签名</th>
          </tr>
          <tr style="height: 5vh"></tr>
          <tr style="height: 5vh"></tr>
        </thead>
        <tbody>
          <tr v-for="item in oneDeptAllKPIInfo" :key="item" style="height: 5vh">
            <td v-if="item.employeeSign"><span style="font-size: 15px">是</span></td>
            <td v-else><span style="color: #e6a23c; font-size: 15px">否</span></td>

            <td v-if="item.employeeSign" @click="showImg(item.signfileName)">
              <img
                style="height: 4.5vh; width: 110px"
                :src="
                  item.signfileName +
                  '&userId=' +
                  $store.state.userId +
                  '&token=' +
                  $store.state.token +
                  '&year=' +
                  year +
                  '&month=' +
                  month
                "
                alt="未找到"
              />
            </td>
            <td v-else></td>
          </tr>
        </tbody>
      </table> -->
    </div>
    <div style="text-align: right; margin-top: 20px" v-if="oneDeptAllKPIInfo.length > 0 && !isRootRead">
      <el-button type="primary" v-print="'#printMe'">{{ $t("print") }}</el-button>
      <el-button type="primary" @click="downPdf()">{{ $t("downPDF") }}</el-button>
    </div>
    <div v-if="oneDeptAllKPIInfo.length == 0" style="font-size: 20px; margin-top: 10%">暂无数据</div>
    <!-- <el-dialog v-model="isShowImg" width="600px" height="400px">
      <img :src="src" alt="" style="width: 500px; height: 300px"
    /></el-dialog> -->
  </div>
</template>

<script>
import { getDeptKPIAllInfo } from "@/api/visualization/index";
import store from "@/store";
import { ElMessage } from "element-plus";
// import { nextTick } from "vue";
import print from "vue3-print-nb";
import { downPdf } from "@/utils/exportPdf.js";
import "jspdf-autotable";
import rootPermission from "@/utils/common.js";

export default {
  directives: {
    print,
  },
  data() {
    return {
      deptId: [],
      oneDeptAllKPIInfo: [],
      basicInfoMaxLength: [], //指标名称最长的一条数据
      isShowImg: false, //查看图片放大
      src: "", //弹窗放大的图片地址
      year: store.state.year,
      day: new Date().getDate(),
      month: store.state.criticalMonth,
      relatedDept: [], //筛选部门
      deptNameList: [], //部门名称
      isRootRead: null, //判断管理员是否只读
    };
  },
  // computed: {
  //   relatedDept() {
  //     if (store.state.role == "ROOT") {
  //       return store.state.deptOptions;
  //     } else {
  //       store.state.userInfo.clerkAssociatedDepartmentList.push(store.state.deptId);
  //       return store.state.deptOptions.filter((item) =>
  //         store.state.userInfo.clerkAssociatedDepartmentList.includes(item.deptId),
  //       );
  //     }
  //   },
  // },
  mounted() {
    setTimeout(() => {}, 300);
    this.isRootRead = rootPermission.isRootRead();

    if (store.state.role !== "ROOT") {
      this.deptId.push(store.state.deptId);
    } else {
      this.deptId.push(2);
    }
    if (store.state.role == "ROOT") {
      this.relatedDept = store.state.deptOptions;
    } else if (store.state.role == "DEPTMANAGER" || store.state.role == "HRMANAGER") {
      this.relatedDept = [];
      store.state.userInfo.clerkAssociatedDepartmentList.push(store.state.deptId);
      this.relatedDept = store.state.deptOptions.filter((item) =>
        store.state.userInfo.clerkAssociatedDepartmentList.includes(item.deptId),
      );
      // store.state.userInfo.clerkAssociatedDepartmentList.push(store.state.deptId);
      // store.state.deptOptions.map(
      //   (item) => {
      //     store.state.userInfo.clerkAssociatedDepartmentList.map((item1) => {
      //       if (item1 == item.deptId) {
      //         this.relatedDept.push(item);
      //       }
      //     });
      //   },
      //   // store.state.userInfo.clerkAssociatedDepartmentList.includes(item.deptId),
      // );
    }
    // console.log(this.relatedDept);

    this.getDeptKPIAllInfo();
  },

  methods: {
    getDeptKPIAllInfo() {
      this.oneDeptAllKPIInfo = [];
      this.basicInfoMaxLength = [];
      const data = { year: this.year, month: this.month, deptIdList: this.deptId };
      this.deptNameList = this.relatedDept.filter((item) => this.deptId.includes(item.deptId));
      getDeptKPIAllInfo(data).then((res) => {
        if (res.data.code == 0 && res.data.data.length > 0) {
          // this.oneDeptAllKPIInfo = res.data.data;

          this.oneDeptAllKPIInfo = res.data.data.map((item) => {
            // item.basicInfoContentList.sort(function (a, b) {
            //   return a.targetId - b.targetId;
            // });

            item.basicInfoContentList = item.basicInfoContentList.map((item1) => {
              //获取所有不同的指标，用于表头显示，找index，等于-1就是新的数据
              let index = this.basicInfoMaxLength.findIndex((item) => item.targetId == item1.targetId);
              if (index == -1) {
                this.basicInfoMaxLength.push(item1);
              }
              //每个数据加标识
              return {
                ["weight_" + item1.targetId]: item1.weight,
                ["targetName_" + item1.targetId]: item1.targetName,
                ["finalActualAchievementRate_" + item1.targetId]: item1.finalActualAchievementRate,
                ["targetScore_" + item1.targetId]: item1.targetScore,
                ["targetBasicScore_" + item1.targetId]: item1.targetBasicScore,
                targetId: item1.targetId,
              };
            });

            return item;
          });

          this.basicInfoMaxLength.sort(function (a, b) {
            return a.targetId - b.targetId;
          });
          //统一长度，添加空数据
          this.basicInfoMaxLength.forEach((item) => {
            this.oneDeptAllKPIInfo.forEach((item1) => {
              let found = false;
              item1.basicInfoContentList.forEach((item2) => {
                if (item2.targetId === item.targetId) {
                  found = true;
                }
              });
              //当不参与这个指标时添加空数据
              if (!found) {
                item1.basicInfoContentList.push({
                  ["weight_" + item.targetId]: "",
                  ["targetName_" + item.targetId]: "",
                  ["finalActualAchievementRate_" + item.targetId]: "",
                  ["targetScore_" + item.targetId]: (0.0).toFixed(2),
                  ["targetBasicScore_" + item.targetId]: "",
                  targetId: item.targetId,
                });
              }
            });
          });
          this.oneDeptAllKPIInfo.forEach((item) => {
            item.basicInfoContentList.sort((a, b) => a.targetId - b.targetId);
          });

          // console.log("所有指标", this.basicInfoMaxLength);
          // console.log(this.oneDeptAllKPIInfo);
        } else if (res.data.data && res.data.data.length == 0) {
          ElMessage.error("查询数据为空");
        }
      });
    },
    // showImg(url) {
    //   this.isShowImg = true;
    //   this.src =
    //     url +
    //     "&userId=" +
    //     store.state.userId +
    //     "&token=" +
    //     store.state.token +
    //     "&year=" +
    //     this.year +
    //     "&month=" +
    //     this.month;
    //   // console.log(this.src);
    // },
    downPdf() {
      // const deptName = store.state.deptOptions.find((item) => item.deptId == this.deptId).deptName;
      // console.log(deptName);
      downPdf(document.querySelector("#printMe"), this.year + "年" + this.month + "月" + "部门考核汇总表");
    },
  },
};
</script>

<style lang="scss" scoped>
.tableVisual {
  padding: 1rem;
  background-color: #fff;
  border-radius: 10px;
  min-height: 94%;
}
.table-container {
  text-align: center;
  overflow: auto;
  // width: 95%;
  position: relative;
}

table {
  text-align: center;
  table-layout: fixed;
  min-width: 100%;
  font-family: Microsoft Yahei;
  color: black;
  border-collapse: collapse;
  border: 1px solid black;
  font-size: 12px;
}

// th {
//   width: 180px;
// }
.targetStyle {
  width: 200px;
}
.KPIStyke {
  width: 50px;
}

.form-style {
  display: flex;
  justify-content: space-between;
  width: 50vw;
  margin-left: auto;
}
.signTableStyle td,
.signTableStyle th {
  border-left: none;
  border-color: black;
}
</style>
