<template>
  <div class="writeValues">
    <div class="writeTableStyle" v-if="valuesData.length > 0">
      <van-cell
        is-link
        v-for="(item, index) in valuesData"
        :key="item"
        :title="index + 1 + '.' + item.valueDescription"
        :to="'/phone/details?index=' + index"
        size="large"
      >
        <template #icon>
          <van-icon
            name="passed"
            color="#07c160"
            size="1.5rem"
            v-if="phoneStore.valuesStatus[index]"
            style="margin: auto 8px auto 0"
          />
          <van-icon name="warning-o" color="#E6A23C   " size="1.5rem" v-else style="margin: auto 8px auto 0" />
        </template>
        <template #title>
          <span class="custom-title">{{ index + 1 + "." + item.valueDescription }}</span>
          <!-- <van-icon name="passed" color="#07c160" size="1.5rem" v-if="phoneStore.valuesStatus[index]" /> -->
        </template>
      </van-cell>
      <van-cell :title="'自评总分：' + selfTotalScore + '分'" style="text-align: center; font-size: 1rem"></van-cell>
      <div v-if="valuesData.length > 0" class="button-style">
        <van-button type="success" block @click="sendValuesForm" :disabled="phoneStore.valuesStatus.every((it) => !it)">
          提 交
        </van-button>
      </div>
    </div>
    <div v-else style="height: 100%; background-color: #fff; margin: auto; font-size: 20px; text-align: center">
      <div style="padding-top: 50%">暂无需填写的价值观</div>
    </div>
    <TabBar index="write" />
  </div>
</template>

<script>
import { getValues, sendValuesData } from "@/api/values/index";
import { showSuccessToast, showFailToast, showConfirmDialog } from "vant";
import TabBar from "@/phone-views/home/PhoneLayout";
import { phoneStore } from "@/store/phone/index";

// import router from "@/router";
// import store from "../../store";

export default {
  components: { TabBar },
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
      phoneStore: {},
    };
  },
  created() {
    this.month = new Date().getMonth() + 1;
    this.getValuesData();
  },
  mounted() {
    this.$nextTick(() => {
      const textareaDom = this.$refs.textarea; // 假设你在el-input上绑定了ref="textarea"
      if (textareaDom) {
        textareaDom.resize();
      }
    });
    this.phoneStore = phoneStore.state;
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
              });
            });
            phoneStore.commit("addValue", this.valuesData);
            //是否保存过
            let valuesStatus = [];
            this.valuesData.forEach((it) => {
              valuesStatus.push(it.actionList[0].save);
            });

            phoneStore.commit("addStatus", valuesStatus);
          } else {
            this.valuesData = [];
          }
        })
        .catch((e) => {
          console.log(e);
          // showFailToast("请求失败");
        });
      if (this.valuesData.length > 0) {
        document.title = this.valuesData[0]?.month + "月价值观自评";
      } else {
        document.title = "价值观自评";
        phoneStore.commit("addValue", []);
        phoneStore.commit("addStatus", []);
      }
    },
    //校验价值观是否完成
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
        showFailToast("价值观未填写完成");
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
        showConfirmDialog({
          closeOnClickOverlay: true,
          allowHtml: true,
          message: `自评得分: 【${this.selfTotalScore}分】<br>提交后不可修改，请谨慎填写`,
        })
          .then(() => {
            sendValuesData(this.newValueArray)
              .then((res) => {
                if (res.data.code == 0) {
                  showSuccessToast("提交成功");
                  this.getValuesData();
                  this.newValueArray = [];
                }
              })
              .catch(() => {
                showFailToast("提交失败");
              });
          })
          .catch((e) => {
            console.log(e);
            this.newValueArray = [];
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.writeValues {
  height: 95vh;
  background-color: #f7f8fa;
  text-align: left;
  position: relative;
  z-index: 1;
}

.button-style {
  margin-top: 1rem;
  width: 50%;
  margin: 1rem auto 0;
}

:deep(.van-radio__label) {
  color: rgb(96, 98, 102);
}
</style>
