<template>
  <div class="valuesTable">
    <!-- 此页面没有被使用 -->
    <div class="valuesTableTitle">查询部门价值观得分</div>
    <el-form :rules="rules">
      <el-form-item label="年份" prop="year">
        <el-select placeholder="请选择年份" v-model="year" style="width: 100px">
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item" />
        </el-select>
      </el-form-item>
      <el-form-item label="月份" prop="month">
        <el-select placeholder="请选择月份" v-model="month" style="width: 100px">
          <el-option v-for="item in monthOptions" :key="item.monthId" :label="item.month" :value="item.monthId" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" prop="deptId">
        <el-select clearable placeholder="请选择部门" v-model="deptId" multiple style="width: 300px">
          <el-option v-for="item in deptOptions" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
        </el-select>
      </el-form-item>
      <el-form-item label="姓名"
        ><el-input placeholder="请输入查询的姓名" v-model="name" style="width: 150px"></el-input
      ></el-form-item>
      <el-button
        v-if="
          deptId.length == 0 ||
          (tableData1.length > 0 && tableData1[0].year != year) ||
          (tableData1.length > 0 && tableData1[0].month != month)
        "
        @click="getValuesDeptList"
        >查询</el-button
      >
      <el-button v-else @click="selectValueDept">查询</el-button>
      <!-- <el-button  @click="getValueDept">计算</el-button> -->
    </el-form>

    <el-table :data="tableData1" border height="66.8vh" stripe>
      <el-table-column label="序号" type="index" width="80"></el-table-column>
      <el-table-column label="部门" prop="deptName"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="价值观分数" prop="valueScore"></el-table-column>
      <el-table-column label="价值观实际得分" prop="valueRealScore"></el-table-column>
      <el-table-column label="状态" prop="complete">
        <template #default="scope">
          <span style="color: #67c23a" v-if="scope.row.complete && scope.row.valueWrite">已完成审批</span>
          <span style="color: #e6a23c" v-else-if="scope.row.valueWrite && !scope.row.complete">未完成审批</span>
          <span style="color: #f56c6c" v-else>未填写</span>
        </template>
      </el-table-column>
      <el-table-column label="年份" prop="year"></el-table-column>
      <el-table-column label="月份" prop="month"></el-table-column>
      <el-table-column label="操作" v-if="isShowHelpWrite">
        <template #default="scope">
          <el-button type="primary" size="small" @click="helpWriteByUserId(scope.row)" v-if="!scope.row.valueWrite"
            >去帮填</el-button
          ></template
        >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getValueDeptScore } from "@/api/values/index.js";
import { ElMessage, ElMessageBox } from "element-plus";
import { deptList } from "@/api/register/index";
import store from "@/store";

export default {
  data() {
    return {
      tableData: [],
      tableData1: [],
      newestMonth: [], //存储最新月的数据
      year: "",
      month: "",
      deptId: [],
      name: "",
      helpWrite: false, //管理员去帮忙填写控制弹窗
      isShowHelpWrite: false, //操作列是否显示
      deptOptions: store.state.deptList ? store.state.deptList : [],
      yearOptions: [],
      monthOptions: [
        { monthId: 1, month: "一月" },
        { monthId: 2, month: "二月" },
        { monthId: 3, month: "三月" },
        { monthId: 4, month: "四月" },
        { monthId: 5, month: "五月" },
        { monthId: 6, month: "六月" },
        { monthId: 7, month: "七月" },
        { monthId: 8, month: "八月" },
        { monthId: 9, month: "九月" },
        { monthId: 10, month: "十月" },
        { monthId: 11, month: "十一月" },
        { monthId: 12, month: "十二月" },
      ],
      rules: {
        year: [{ required: true, message: "请选择年份", trigger: "blur" }],
        month: [{ required: true, message: "请选择月份", trigger: "blur" }],
        deptId: [{ message: "请选择部门", trigger: "blur" }],
      },
    };
  },
  // components: {
  //   [ElConfigProvider.name]: ElConfigProvider,
  // },
  created() {
    this.nowtime();
    if (store.state.deptList.length == 0) {
      deptList()
        .then((res) => {
          if (res.data.code == 0) {
            this.deptOptions = res.data.data;
          }
        })
        .catch(() => {
          ElMessage.error("请求失败");
        });
    }

    this.getValuesDeptList();
  },
  methods: {
    //获取当前时间
    nowtime() {
      let nowDate = new Date();
      this.year = nowDate.getFullYear();
      this.month = nowDate.getMonth() + 1;
      for (let i = 2021; i <= this.year; i++) {
        this.yearOptions.push(i);
      }
    },
    //获取部门价值观列表
    async getValuesDeptList() {
      const data = {
        year: this.year,
        month: this.month,
        name: this.name,
        deptIdList: this.deptId,
      };
      await getValueDeptScore(data)
        .then((res) => {
          if (res.data.code == 0) {
            if (res.data.data.length > 0) {
              this.tableData = res.data.data.map((item) => {
                return { ...item, year: this.year, month: this.month };
              });
              this.tableData = this.tableData.map((item) => {
                if (!item.valueWrite) {
                  this.isShowHelpWrite = true;
                }
                const deptOption = this.deptOptions.find((item1) => item1.deptId == item.deptId);
                if (deptOption) {
                  return { ...item, deptName: deptOption.deptName };
                } else {
                  // 如果没有找到匹配的项，你可能想要返回原始的item，或者返回null，或者做其他处理
                  return item;
                }
              });
              this.tableData1 = this.tableData;
              // this.newestMonth=this.tableData
              //存储最新月份的数据
              if (this.year == this.tableData[0].year) {
                this.newestMonth = this.tableData;
                this.tableData1 = this.newestMonth;
              }
              //第一次进来

              // console.log(this.tableData1);
            } else {
              this.tableData = [];
              this.tableData1 = [];
              ElMessage.error("查询数据为空");
            }
          }
        })
        .catch();
      this.selectValueDept();
    },
    selectValueDept() {
      // console.log(this.deptId);
      if (this.deptId.length > 0) {
        this.tableData1 = this.deptId.reduce((acc, deptId) => {
          return [...acc, ...this.newestMonth.filter((item1) => item1.deptId == deptId)];
        }, []);
        // console.log(this.tableData1);
      }
      if (this.name) {
        this.tableData1 = this.tableData.find((item) => {
          item.name == this.name;
        });
      }
    },
    //去帮填
    helpWriteByUserId(row) {
      ElMessageBox.confirm(`确定帮【${row.name}】填写${row.year}年${row.month}月份价值观？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.commit("currentUserId", row.userId);
        this.$store.commit("currentName", row.name);
        this.$router.push("/writeValue");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.valuesTable {
  padding: 17px;
  background-color: #fff;
  height: 95%;
  border-radius: 10px;
}
.valuesTableTitle {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 1rem;
}
.el-form {
  display: flex;
  justify-content: space-around;
}

.myNote {
  display: -webkit-box;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
// .el-table .el-table__cell {
//   text-align: center;
// }
</style>
