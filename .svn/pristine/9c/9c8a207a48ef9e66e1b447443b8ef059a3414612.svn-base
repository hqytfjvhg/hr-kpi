<template>
  <div>
    <el-dialog :model-value="true" title="目前进度" width="30%" @close="handleClose">
      <el-timeline style="text-align: left">
        <el-timeline-item
          v-for="(activity, index) in performanceActivities"
          :key="index"
          :icon="activity.icon"
          :color="activity.color"
          :size="activity.size"
          :content="activity.content"
          :timestamp="activity.timestamp"
        >
          {{ activity.content }}
        </el-timeline-item>
      </el-timeline>
      <div class="button-style">
        <el-button @click="handleClose">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getPerformancePeople } from "@/api/performance/index";
import { SuccessFilled, MoreFilled, Close } from "@element-plus/icons-vue";

export default {
  props: {
    performanceApproval: {
      type: Boolean,
      default: false,
    },
    publishHistoryTargetRow: {
      type: Object,
    },
    currentPerformanceName: {
      type: String,
    },
    year: {
      type: String,
    },
    month: {
      type: Number,
    },
  },
  data() {
    return {
      performanceActivities: [], //价值观审批时间线的数据
    };
  },
  mounted() {
    this.selectHistory();
  },
  methods: {
    //关闭弹窗
    handleClose() {
      this.$emit("update:performanceApproval", false);
    },
    selectHistory() {
      const data = {
        year: this.year,
        month: this.month,
        userId: this.publishHistoryTargetRow.userId,
        eventId: 0,
      };
      getPerformancePeople(data)
        .then((res) => {
          if (res.data.code == 0) {
            let data = res.data.data;
            // console.log(data);
            const length = data.performanceFlowContent.length + 1;
            this.performanceActivities = Array(length).fill({});

            // 重置this.activities数组中每个对象的属性
            this.performanceActivities = this.performanceActivities.map(() => {
              return {
                size: "default",
                color: "#e4e7ed",
                icon: MoreFilled,
              };
            });
            // console.log(this.performanceActivities);
            // this.performanceActivities[0] = { content: this.currentPerformanceName };
            // this.performanceActivities[data.performanceFlowContent.length] = { content: "已结束" };
            // console.log(this.performanceActivities);
            // if (data.current == 0) {
            //   this.performanceActivities[0].size = "large";
            //   this.performanceActivities[0].color = "#E6A23C";
            //   this.performanceActivities[0].icon = Close;
            //   this.performanceActivities[0].content = this.currentPerformanceName;
            // } else
            if (data.current <= data.performanceFlowContent.length) {
              const index = data.current - 1;
              for (let i = 0; i <= index; i++) {
                // console.log(i);
                this.performanceActivities[i].size = "large";
                this.performanceActivities[i].color = "#67C23A";
                this.performanceActivities[i].icon = SuccessFilled;
                this.performanceActivities[index].icon = Close;
                this.performanceActivities[index].color = "#E6A23C";
              }
            } else if (data.current > data.performanceFlowContent.length) {
              for (let i = 0; i < length; i++) {
                this.performanceActivities[i].size = "large";
                this.performanceActivities[i].color = "#67C23A";
                this.performanceActivities[i].icon = SuccessFilled;
              }
            }
            //审批人
            const content = data.performanceFlowContent.map((item) => {
              return "审批人：" + item.name;
            });
            for (let i = 0; i < data.performanceFlowContent.length + 1; i++) {
              this.performanceActivities[i].content = content[i];
              this.performanceActivities[data.performanceFlowContent.length].content = "已结束";
            }
            //时间线
            if (data.flowTime !== null) {
              // console.log(data.flowTime);
              const keys = Object.keys(data.flowTime).map((key) => key.split("@")[0]);
              // 遍历flowTime的key，找到匹配的name并获取对应的sequence
              const matchingSequences = keys.map((name) => {
                const matchingItem = data.performanceFlowContent.find((item) => item.name === name);

                return matchingItem.sequence;
              });
              // console.log(matchingSequences);

              for (let i = 0; i < matchingSequences.length; i++) {
                // console.log(matchingSequences[i]);

                this.performanceActivities[matchingSequences[i] - 1].timestamp = Object.values(data.flowTime)[i];
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.button-style {
  margin-top: 20px;
  text-align: right;
}
</style>
