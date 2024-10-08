<template>
  <div class="writeValues">
    <van-nav-bar title="填写价值观" left-text="返回" left-arrow @click-left="$router.back()" />

    <!-- 左右显示 -->
    <div class="writeTableStyle">
      <div v-if="valuesData.length > 0" class="title">
        <span v-if="$store.state.role == 'ROOT'">{{ $store.state.currentName }}</span>
        {{ $store.state.year }}年{{ valuesData[0].month }}月价值观自评
      </div>

      <div
        v-for="(item, index) in valuesData"
        :key="item"
        :title="index + 1 + '、' + item.valueDescription"
        :name="index"
      >
        <el-table
          :data="item.actionList"
          :show-header="index === 0 ? true : false"
          border
          stripe
          :span-method="objectSpanMethod"
        >
          <el-table-column width="60" label="序号">{{ index + 1 }}</el-table-column>
          <el-table-column label="价值观" width="150">{{ item.valueDescription }}</el-table-column>
          <el-table-column label="行为" width="150"
            ><template #default="scope"
              ><div v-html="scope.row.actionDescription" style="text-align: left"></div></template
          ></el-table-column>
          <el-table-column label="操作" width="150">
            <template #default="scope">
              <div v-if="scope.row.needExample == false" class="input-style">
                <el-radio-group v-model="scope.row.selfScore" @change="changeButton">
                  <el-radio-button :label="1">是</el-radio-button>
                  <el-radio-button :label="0">否</el-radio-button>
                </el-radio-group>
                <!-- <el-radio-group v-model="item1.selfScore">
                  <el-radio border :label="1">是</el-radio>
                  <el-radio border :label="0">否</el-radio>
                </el-radio-group> -->
              </div>
              <div v-if="scope.row.needExample == true" class="input-style">
                <el-input
                  type="textarea"
                  placeholder="请输入案例"
                  @input="changeExampleScore(index, scope.$index)"
                  v-model="scope.row.example"
                  style="min-width: 100px"
                  :autosize="scope.row.autosize"
                ></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="selfScore" label="得分" width="60"></el-table-column>
        </el-table>
      </div>

      <div v-if="valuesData.length > 0" class="button-style">
        <!-- <el-button type="primary" >提交</el-button> -->
        <van-button type="primary" @click="sendValuesForm" ref="button">提交</van-button>
        <van-button
          color="#E6A23C"
          size="small"
          @click="saveValuesForm"
          v-if="$store.state.role !== 'ROOT'"
          style="margin-left: 1rem"
          >保存</van-button
        >
        <!-- <el-button type="warning" @click="saveValuesForm" v-if="$store.state.role !== 'ROOT'">保存</el-button> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getValues, sendValuesData, getOneUserValue, saveValueData } from "@/api/values/index";
import { ElMessage } from "element-plus";
// import router from "@/router";
// import store from "../../store";

export default {
  data() {
    return {
      valuesData: [],
      currentIndex: 1,
      updatedValues: {},
      leaderScore: "",
      month: "",
      activeNames: [0, 1, 2, 3, 4],
      selfTotalScore: 0, //价值观总得分
      newValueArray: [], //整合后的价值观数据

      selfScoreShow: true,
      isManagerApproval: false, //判断拖拽组件是否是部门审批
    };
  },
  created() {
    this.month = new Date().getMonth() + 1;
    if (this.$store.state.role == "ROOT") {
      this.getOneUserValuesData();
      // console.log(this.$store.state.currentUserId);
    } else {
      this.getValuesData();
    }
  },
  mounted() {
    this.$nextTick(() => {
      const textareaDom = this.$refs.textarea; // 假设你在el-input上绑定了ref="textarea"
      if (textareaDom) {
        textareaDom.resize();
      }
    });
  },
  methods: {
    getValuesData() {
      getValues()
        .then((res) => {
          if (res.data.code == 0) {
            this.valuesData = res.data.data;
            this.valuesData.map((item) => {
              item.actionList.map((item1) => {
                this.selfTotalScore += item1.selfScore;
                item1.autosize = this.computeAutosize(item1.example);
              });
            });

            // for (let i = 0; i < res.data.data.length; i++) {
            //   this.valuesData.push(res.data.data[i]);

            // }
            // console.log(this.valuesData);
          }
        })
        .catch(() => {
          ElMessage.error("请求失败");
        });
    },
    getOneUserValuesData() {
      getOneUserValue(this.$store.state.currentUserId)
        .then((res) => {
          if (res.data.code == 0) {
            this.valuesData = res.data.data;
            // for (let i = 0; i < res.data.data.length; i++) {
            //   this.valuesData.push(res.data.data[i]);

            // }
            // console.log(this.valuesData);
          }
        })
        .catch(() => {
          ElMessage.error("请求失败");
        });
    },
    changeExampleScore(index, index1) {
      //判断案例是否得分
      if (
        this.valuesData[index].actionList[index1].example != null &&
        this.valuesData[index].actionList[index1].example.split(" ").join("").length !== 0
      ) {
        this.valuesData[index].actionList[index1].selfScore = 1;
      } else {
        this.valuesData[index].actionList[index1].selfScore = 0;
      }
      // this.valuesData[index].actionList[index1].example = this.valuesData[index].actionList[index1].example.replace(
      //   /\s/g,
      //   "",
      // );
      this.changeButton();
    },
    computeAutosize(content) {
      // 根据内容是否为空来返回不同的autosize配置
      if (!content || content.trim() === "" || content == null) {
        // 当内容为空时，启用自适应，并设置最小和最大行数
        return { minRows: 2, maxRows: 10 };
      } else {
        // 当内容不为空时，禁用自适应，固定行数为两行
        // 注意：Element UI 的 el-input 组件的 autosize 属性为 false 时不会自适应
        // 因此，我们返回一个固定的行数对象来模拟“不自适应”的效果
        return { minRows: 2, maxRows: 2 };
      }
    },
    //改变按钮就计算总得分
    changeButton() {
      this.selfTotalScore = 0;
      this.valuesData.map((item) => {
        item.actionList.map((item1) => {
          this.selfTotalScore += item1.selfScore;
        });
      });
    },
    valueData() {
      try {
        const updatedValuesData = this.valuesData.map((item) => {
          const actionList = item.actionList.map((action) => {
            if (action.needExample == true && action.selfScore == null) {
              action.selfScore = 0;
            }
            if (action.selfScore != null) {
              return {
                actionDescription: action.actionDescription,
                example: action.example,
                selfScore: action.selfScore,
                leaderScore: action.leaderScore,
              };
            }
          });
          return {
            valueDescription: item.valueDescription,
            actionList,
          };
        });
        updatedValuesData.map((item) => {
          const valueDescription = item.valueDescription;
          delete item.valueDescription;
          const action = item.actionList.map((action) => {
            const example = action.example;
            delete action.example;
            action.example = example;
            action.valueDescription = valueDescription;
            return action;
          });
          action.forEach((action) => {
            let actionItem = {
              actionDescription: action.actionDescription,
              selfScore: action.selfScore,
              leaderScore: action.leaderScore,
              valueDescription: action.valueDescription,
              example: action.example,
              deptId: this.$store.state.deptId,
            };
            this.newValueArray.push(actionItem);

            return item;
          });
        });
        return true;
      } catch (err) {
        ElMessage.error("价值观未填写完成");
        this.newValueArray = [];
        return false;
      }
    },
    sendValuesForm() {
      if (this.valueData()) {
        this.selfTotalScore = 0;
        this.newValueArray.map((item) => {
          this.selfTotalScore += item.selfScore;
        });
        this.$confirm(`自评得分: 【${this.selfTotalScore}分】<br>提交后不可修改，请谨慎填写`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          dangerouslyUseHTMLString: true, // 关键属性，开启 HTML 片段解析
        })
          .then(() => {
            sendValuesData(this.newValueArray)
              .then((res) => {
                if (res.data.code == 0) {
                  ElMessage.success("提交成功");
                  this.newValueArray = [];
                }
              })
              .catch(() => {
                ElMessage.error("提交失败");
              });
          })
          .catch((e) => {
            ElMessage.info("取消提交");
            console.log(e);
            this.newValueArray = [];
          });
      }
    },
    saveValuesForm() {
      if (this.valueData()) {
        saveValueData(this.newValueArray).then((res) => {
          if (res.data.code == 0) {
            ElMessage.success("保存成功");
            this.newValueArray = [];
          }
        });
      }
    },
    handleChange(index) {
      this.currentIndex = index + 1;
    },
    //合并
    objectSpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
        const currentRow = this.valuesData[rowIndex];
        if (rowIndex === 0) {
          return [currentRow.actionList.length, 1];
        } else {
          return [0, 0];
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.writeValues {
  padding: 17px;
  background-size: cover;
  min-height: 95%;
  text-align: left;
  position: relative;
  z-index: 1;
}
.writeTableStyle {
  border-radius: 15px;
  text-align: center;
}
.title {
  font-size: 1.5rem;
  color: black;
  height: 5rem;
  line-height: 5rem;
}
.button-style {
  text-align: right;
  margin-top: 1rem;
}
// .input-style {
//   padding: 0.5rem 1rem;
// }
:deep(.el-collapse-item__header) {
  padding-left: 10px;
  font-weight: 700;
  border-left: 1px solid #ebeef5;
  border-right: 1px solid #ebeef5;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
:deep(.el-table td.el-table__cell div) {
  font-size: 15px;
}
</style>
