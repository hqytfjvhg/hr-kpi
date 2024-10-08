<template>
  <div class="details-style">
    <van-collapse v-model="activeNames">
      <van-collapse-item
        size="large"
        v-for="(item, index) in list.data"
        :key="item"
        :title="isValue ? item.actionDescription : item.targetName"
        :name="index"
      >
        <template #title>
          <div v-html="isValue ? item.actionDescription : item.targetName"></div>
        </template>
        <van-cell title="权重" :value="item.weight" v-if="!isValue" size="large" />
        <van-cell title="目标值" :value="item.goalValue" v-if="!isValue" size="large" />
        <van-cell title="实现值" :value="item.realizedValue" v-if="!isValue" size="large" />
        <van-cell title="指标得分" :value="item.targetScore + '分'" v-if="!isValue" size="large" />
        <van-cell title="实际得分" :value="item.weightedTargetScore + '分'" v-if="!isValue" size="large" />
        <van-cell title="备注（加分说明）" :label="item.mark" v-if="!isValue" size="large">
          <template #label>
            <span v-for="(remark, index) in item.mark.split('@')" :key="index"
              >{{ remark }}<br v-if="index !== item.mark.split('@').length - 1" />
            </span>
          </template>
        </van-cell>

        <van-cell title="自评" :value="item.selfScore + '分'" v-if="isValue" size="large" />
        <van-cell title="上级评" :value="item.hrScore + '分'" v-if="isValue" size="large" />
        <van-cell title="案例" :label="item.example" v-if="isValue" size="large" />
        <van-cell title="备注" :label="item.deptRemark + item.hrRemark" v-if="isValue" size="large">
          <template #label>
            <span v-for="(remark, index) in item.remark" :key="index"
              >{{ remark }} <br v-if="index !== item.remark.length - 1"
            /></span>
          </template>
        </van-cell>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref } from "vue";
//   import { phoneStore } from "@/store/phone/index";
// import { saveValueData } from "@/api/values/index";
//   import { showSuccessToast, showFailToast } from "vant";
//   import axios from "@/utils/http";

const list = useRoute().query;
list.data = JSON.parse(list.data);
const isValue = list.name == "value" ? true : false;
if (isValue) {
  list.data = list.data[list.index].actionList;
  list.data.map((it) => {
    it.remark = [];
    const remark = it.deptRemark + it.hrRemark;
    remark.split("$").map((item) => {
      if (item.split("：")[1] !== "未备注") {
        it.remark.push(item);
      }
    });
    return it;
  });
}

document.title = list.name == "value" ? list.date + "价值观详情" : list.date + "业绩详情";

const activeNames = ref(["0"]);
</script>

<style lang="scss" scoped>
.details-style {
  height: 100vh;
  background-color: #f7f8fa;
}
.button-style {
  width: 50%;
  margin-top: 1rem;
  margin: 1rem auto 0;
}
:deep(.van-cell-group--inset) {
  border-radius: 0 !important;
  border-bottom: 1px solid #ebedf0;
}
:deep(.van-cell__title) {
  flex: auto !important;
  text-align: left;
}
:deep(.van-cell__value) {
  min-width: 40px;
}
:deep(.radio-style .van-cell__title span) {
  color: #969799 !important;
  font-size: 1rem;
}
:deep(.van-field__control) {
  color: #969799;
}
</style>
