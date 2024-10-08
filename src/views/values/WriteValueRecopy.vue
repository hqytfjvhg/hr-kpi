<template>
  <div class="writeValues">
    <!-- 左右显示 -->
    <SuperBox :selfScore="selfTotalScore" :managerScore="managerScore" :isShow="isManagerApproval"></SuperBox>
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
          <el-table-column width="80" label="序号">{{ index + 1 }}</el-table-column>
          <el-table-column label="价值观" width="200">{{ item.valueDescription }}</el-table-column>
          <el-table-column label="行为"
            ><template #default="scope"
              ><div v-html="scope.row.actionDescription" style="text-align: left"></div></template
          ></el-table-column>
          <el-table-column label="操作">
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
          <el-table-column prop="selfScore" label="得分" width="100"></el-table-column>
        </el-table>
      </div>

      <div v-if="valuesData.length > 0" class="button-style">
        <el-button type="primary" @click="sendValuesForm" ref="button">提交</el-button>
        <el-button type="warning" @click="saveValuesForm" v-if="$store.state.role !== 'ROOT'">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getValues, sendValuesData, getOneUserValue, sendOneUserValue, saveValueData } from "@/api/values/index";
import { ElMessage } from "element-plus";
// import axios from "axios";
import router from "@/router";
import store from "../../store";
// import emitter from "@/utils/eventbus.js";
import SuperBox from "@/components/drag/SuperBox.vue";
export default {
  components: {
    SuperBox,
  },
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
  //销毁自动保存,必填的没填给1分
  beforeUnmount() {
    const updatedValuesData = this.valuesData.map((item) => {
      return {
        valueDescription: item.valueDescription,
        actionList: item.actionList
          .map((action) => {
            if (action.needExample && action.selfScore == null) {
              action.selfScore = 0;
            } else if (!action.needExample && action.selfScore == null) {
              action.selfScore = 1;
            }
            return action.selfScore != null
              ? {
                  actionDescription: action.actionDescription,
                  example: action.example,
                  selfScore: action.selfScore,
                  leaderScore: action.leaderScore,
                }
              : null;
          })
          .filter(Boolean), // 过滤掉 null 值
      };
    });

    updatedValuesData.forEach((item) => {
      const valueDescription = item.valueDescription;
      item.actionList.forEach((action) => {
        this.newValueArray.push({
          actionDescription: action.actionDescription,
          selfScore: action.selfScore,
          leaderScore: action.leaderScore,
          valueDescription,
          example: action.example,
          deptId: this.$store.state.deptId,
        });
      });
    });
    saveValueData(this.newValueArray);
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
            //如果案例必填没有写案例 0分
            if (action.needExample == true && action.selfScore == null) {
              action.selfScore = 0;
            }
            //分数不为空
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

        // let newValueArray = [];
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
        // console.log(updatedValuesData);
        return true;
      } catch (err) {
        ElMessage.error("价值观未填写完成");
        this.newValueArray = [];
        return false;
      }
    },
    sendValuesForm() {
      // try {
      // const updatedValuesData = this.valuesData.map((item) => {
      //   const actionList = item.actionList.map((action) => {
      //     if (action.needExample == true && action.selfScore == null) {
      //       action.selfScore = 0;
      //     }
      //     if (action.selfScore != null) {
      //       return {
      //         actionDescription: action.actionDescription,
      //         example: action.example,
      //         selfScore: action.selfScore,
      //         leaderScore: action.leaderScore,
      //       };
      //     }
      //   });
      //   return {
      //     valueDescription: item.valueDescription,
      //     actionList,
      //   };
      // });

      // console.log(updatedValuesData);
      // let newArray = [];
      // updatedValuesData.map((item) => {
      //   const valueDescription = item.valueDescription;
      //   delete item.valueDescription;
      //   const action = item.actionList.map((action) => {
      //     const example = action.example;
      //     delete action.example;
      //     action.example = example;
      //     action.valueDescription = valueDescription;
      //     return action;
      //   });
      //   action.forEach((action) => {
      //     let actionItem = {
      //       actionDescription: action.actionDescription,
      //       selfScore: action.selfScore,
      //       leaderScore: action.leaderScore,
      //       valueDescription: action.valueDescription,
      //       example: action.example,
      //       deptId: this.$store.state.deptId,
      //     };
      //     newArray.push(actionItem);

      //     return item;
      //   });
      // });
      // console.log(newArray);
      // let selfTotalScore = 0;
      // newArray.map((item) => {
      //   selfTotalScore += item.selfScore;
      // });
      if (this.valueData()) {
        // let selfTotalScore = 0;
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
            // console.log("提交成功");
            if (store.state.role == "ROOT") {
              sendOneUserValue(this.newValueArray)
                .then((res) => {
                  if (res.data.code == 0) {
                    ElMessage.success("提交成功");
                    router.replace({ name: "kpiScore" });
                    this.newValueArray = [];
                    // emitter.on("callBPageMethod", (func) => {
                    //   func();
                    // });
                  }
                })
                .catch(() => {
                  ElMessage.error("提交失败");
                });
            } else {
              sendValuesData(this.newValueArray)
                .then((res) => {
                  if (res.data.code == 0) {
                    ElMessage.success("提交成功");
                    router.replace({ name: "aboutInfo" });
                    this.newValueArray = [];
                    // emitter.on("callBPageMethod", (func) => {
                    //   func();
                    // });
                  }
                })
                .catch(() => {
                  ElMessage.error("提交失败");
                });
            }
          })
          .catch((e) => {
            ElMessage.info("取消提交");
            console.log(e);
            this.newValueArray = [];
          });
      }

      // } catch (err) {
      //   ElMessage.error("价值观未填写完成");
      // }
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
    // deleteForm() {
    //   axios
    //     .delete("http://192.168.60.108:8989/ifi-personal/valueData/deleteValueDataByUserId")
    //     .then((res) => {
    //       // console.log(res);
    //       if (res.data.code == 0) {
    //         ElMessage.success("删除成功");
    //       }
    //     })
    //     .catch(() => {});
    // },
  },
};
</script>

<style lang="scss" scoped>
.writeValues {
  padding: 17px;
  // background: linear-gradient(#dfdbd7, #d7d3d3);
  // background-color: #fff;
  // background-image: url(@/assets/bgi2.jpg);
  background-color: #fff;
  background-size: cover;
  min-height: 95%;
  border-radius: 10px;
  text-align: left;
  position: relative;
  z-index: 1;
}
.writeTableStyle {
  // padding-top: 10vh;
  border-radius: 15px;
  // padding-bottom: 20px;
  width: 80%;
  margin: auto;
  text-align: center;
  // position: relative;
}
.title {
  font-size: 1.5rem;
  color: black;
  height: 120px;
  line-height: 120px;
}
.button-style {
  text-align: right;
  margin-top: 10px;
}
.input-style {
  padding: 0.5rem 1rem;
}
// .imgStyle {
//   background-image: url(../../assets/bgi.png);
//   height: 30vh;
//   background-size: cover;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   z-index: -1;
// }

// .values-title {
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   text-align: left;
//   padding: 1rem;
//   color: #f56c6c;
// }

// .scroll {
//   height: 100%;
//   // display: block;
//   overflow-y: auto;
// }
// .scroll-table {
//   background-color: rgb(255, 255, 255);
//   padding: 0 60px;
//   // box-shadow: 0 2px 3px rgba(0, 0, 0, 0.07);
//   backdrop-filter: blur(6px);
// }
// .valuesTitle {
//   height: 4rem;
//   line-height: 4rem;
//   font-weight: 700;
// }

// .valuesAction .el-col:nth-child(2) {
//   line-height: 3rem;
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
