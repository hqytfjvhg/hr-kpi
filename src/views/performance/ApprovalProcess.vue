<template>
  <div class="targetApproval">
    <div class="button-group">
      <el-tooltip content="新增流程" placement="top" effect="light" v-if="!isRootRead && !isRootDown">
        <el-button type="success" @click="addCommon">
          <el-icon class="iconStyle"><Plus /></el-icon>{{ $t("add") }}
        </el-button>
      </el-tooltip>
      <el-tooltip content="刷新列表" placement="top" effect="light">
        <el-button type="primary" @click="getPerformance">
          <el-icon class="iconStyle"><Refresh /></el-icon>{{ $t("refresh") }}
        </el-button>
      </el-tooltip>
    </div>

    <el-table :data="transformed" border :height="tableHeight">
      <el-table-column type="index" label="序号" width="80" />
      <el-table-column label="审批名称">
        <template #default="scope">
          <span v-if="scope.row.performanceFlowId !== null">{{ scope.row.performancename }}</span>
          <el-input v-else v-model="scope.row.performancename" placeholder="请输入流程名称" clearable></el-input>
        </template>
      </el-table-column>

      <el-table-column label="流程">
        <template #default="scope">
          <!-- deptUserName后面接的是数字，例如deptUserName1，deptUserName2等,deptUserName开头的key对应的value长度需要大于0 -->
          <span v-if="scope.row.performanceFlowId != null && scope.row.performancename != ''">
            <el-timeline class="timeline">
              <!-- <el-timeline-item class="lineitem active" placement="center" type="primary"> 发起人 </el-timeline-item> -->
              <el-timeline-item
                class="lineitem active"
                type="primary"
                placement="center"
                v-for="(value, key, index) in filteredData[scope.$index]"
                :key="index"
              >
                {{ value }}
              </el-timeline-item>
            </el-timeline>
          </span>
          <span v-else>
            <el-timeline class="timeline">
              <!-- 固定发起人，无需选择框 -->
              <!-- <el-timeline-item class="lineitem active" placement="center" type="primary">
   
                发起人
              </el-timeline-item> -->

              <el-timeline-item
                class="lineitem active"
                type="primary"
                placement="center"
                v-for="(value, key, index) in filteredData[scope.$index]"
                :key="index"
              >
                <el-select clearable style="min-width: 60px" v-model="scope.row[key]" size="small">
                  <el-option
                    v-for="item in approvalFlow"
                    :key="item.name"
                    :label="item.name"
                    :value="item.name"
                    placeholder="请选择"
                  ></el-option>
                </el-select>
                <template>
                  {{ value }}
                </template>
              </el-timeline-item>
            </el-timeline>
          </span>
        </template>
      </el-table-column>

      <el-table-column label="是否使用">
        <template #default="scope">
          <span v-if="scope.row.useState == false" style="color: #67c23a">未使用</span>
          <span v-if="scope.row.useState == true" style="color: #f56c6c">使用中</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" v-if="!isRootRead && !isRootDown">
        <template #default="scope">
          <div class="operateStyle">
            <el-button
              type="danger"
              size="small"
              circle
              @click="deleteRow(scope.row)"
              v-if="scope.row.performanceFlowId != null && scope.row.performancename != ''"
            >
              <el-icon><Delete /></el-icon>
            </el-button>

            <el-button
              type="success"
              size="small"
              @click="addApprovalPeople(scope.row)"
              v-if="scope.row.performanceFlowId == null"
            >
              新增审批人
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="saveVal(scope.row)"
              v-if="scope.row.performanceFlowId == null || scope.row.performancename == ''"
            >
              保存
            </el-button>
            <span @click="deleteNull(scope.row)" v-if="scope.row.performanceFlowId == null" style="margin-left: 10px">
              <i class="fa fa-times-circle-o" style="font-size: 17px; color: #f56c6c"></i>
            </span>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPerformanceFlow, getApprover, savePerformanceFlow, deletePerformanceFlow } from "@/api/performance/index";
import { ElMessage, ElMessageBox } from "element-plus";
import { Refresh, Plus, Delete } from "@element-plus/icons-vue";
import rootPermission from "@/utils/common.js";

export default {
  name: "targetApproval",
  components: { Refresh, Plus, Delete },
  data() {
    return {
      targetList: [],
      transformed: [],
      approvalFlow: [],
      tableHeight: null,
      isRootRead: null, //判断管理员是否只读
      isRootDown: null,
    };
  },
  computed: {
    filteredData() {
      return this.transformed.map((item) => {
        const userNames = Object.fromEntries(Object.entries(item).filter(([key]) => key.startsWith("name")));
        return userNames;
      });
    },
  },
  mounted() {
    this.getPerformance();
    getApprover()
      .then((res) => {
        if (res.data.code == 0) {
          this.approvalFlow = res.data.data;
          this.approvalFlow.sort(function (a, b) {
            return b.performanceFlowId - a.performanceFlowId;
          });
        }
      })
      .catch(() => {
        ElMessage.error("请求失败");
      });
    this.$nextTick(() => {
      // 根据浏览器高度设置初始高度
      this.tableHeight = window.innerHeight - 190;
      // 监听浏览器高度变化，改变表格高度
      window.onresize = () => {
        this.tableHeight = window.innerHeight - 190;
      };
    });
    this.isRootRead = rootPermission.isRootRead();
    this.isRootDown = rootPermission.isRootDown();
  },
  methods: {
    getPerformance() {
      getPerformanceFlow()
        .then((res) => {
          if (res.data && res.data.code == 0) {
            this.targetList = [];
            Object.values(res.data.data).map((item) => {
              this.targetList.push(item);
            });
            const transformed = {};
            this.targetList.forEach((item) => {
              item.map((item1) => {
                const { performanceFlowId, performancename, useState, name, sequence } = item1;
                if (!transformed[performancename]) {
                  transformed[performancename] = {
                    performanceFlowId,
                    performancename,
                    useState,
                  };
                }
                transformed[performancename]["name" + sequence] = name;
              });
            });
            this.transformed = Object.values(transformed);
            this.transformed = [...this.transformed];
            this.transformed.sort(function (a, b) {
              return b.performanceFlowId - a.performanceFlowId;
            });
          }
        })
        .catch(() => {
          ElMessage.error("请求失败");
        });
    },
    addCommon() {
      this.transformed.unshift({ performanceFlowId: null, performancename: "" });
    },
    addApprovalPeople(row) {
      // 获取当前已有的输入框数量
      const inputCount = Object.keys(row).filter((key) => key.startsWith("name")).length;
      if (inputCount != 0 && Object.keys(row).filter((key) => key.startsWith("name") && row[key] == "").length > 0) {
        ElMessage.error("审批人数据为空，无法新增");
      } else {
        // 添加新的输入框，并将数据绑定到新的deptUserName字段上
        row[`name${inputCount + 1}`] = "";
      }
    },
    deleteRow(row) {
      ElMessageBox.confirm("确定删除此信息吗?", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const data = { performanceFlowList: [row.performanceFlowId] };
          deletePerformanceFlow(data)
            .then((res) => {
              if (res.data && res.data.code == 0) {
                this.getPerformance();
                ElMessage.success("删除成功");
              }
            })
            .catch(() => {
              ElMessage.error("请求失败");
            });
        })
        .catch(() => {
          ElMessage.info("取消删除");
        });
    },
    saveVal(row) {
      if (row.performanceFlowId == "" || row.performancename.split(" ").join("").length == 0) {
        ElMessage.error("流程名字不能为空");
      } else {
        const userSequenceInFlowList = [];
        let sequence = 1;
        let canSave = true;
        let hasError = 0;
        //审批人的顺序
        for (const key in row) {
          if (key.startsWith("name")) {
            const userData = this.approvalFlow.filter((item) => item.name == row[key]);
            if (userData.length == 0) {
              ElMessage.error("请选择审批人");
              canSave = false;
            } else {
              userSequenceInFlowList.push({
                sequence,
                userId: userData[0].userId,
              });
              sequence++;
            }
            hasError = 0;
          } else {
            hasError++;
          }
        }
        if (hasError == 2) {
          ElMessage.error("请添加审批人");
        }
        if (userSequenceInFlowList.length !== 0) {
          const userIds = new Set(); // 用于存储唯一的userId
          //检验是否存在同一个审批人
          userSequenceInFlowList.forEach((item) => {
            const userId = item.userId;
            if (userIds.has(userId)) {
              ElMessage.error("审批人重复");
              canSave = false;
            } else {
              userIds.add(userId);
            }
          });
          const data = {
            name: row.performancename,
            userSequenceInFlowList: userSequenceInFlowList,
          };

          //保存数据
          if (canSave) {
            savePerformanceFlow(data, this);
          }
        }
      }
    },
    deleteNull(val) {
      const index = this.transformed.findIndex((item) => item.performancename === val.performancename);
      this.transformed.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.targetApproval {
  padding: 1rem;
  background-color: #fff;
  height: 95%;
  border-radius: 10px;
}
.target-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: left;
  padding: 1rem;
  background-color: #fff;
}
.button-group {
  text-align: right;
  margin-bottom: 10px;
}
.operateStyle {
  display: flex;
  align-items: center;
  justify-content: center;
}
:deep(.timeline .el-timeline-item__tail) {
  border-top: 2px solid #c0c4cc;
}
</style>
