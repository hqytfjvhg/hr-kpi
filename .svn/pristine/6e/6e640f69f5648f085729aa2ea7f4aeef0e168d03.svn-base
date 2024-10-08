<template>
  <div class="details-style">
    <van-cell-group>
      <template v-for="(item, index) in valueList" :key="index">
        <van-cell
          :title="item.actionDescription"
          :value="item.selfScore === null ? '' : item.selfScore + '分'"
          size="large"
        >
          <template #title>
            <div v-html="item.actionDescription" />
          </template>
          <!-- <template #label>
            <van-radio-group v-model="item.selfScore" v-if="!item.needExample">
              <van-radio :name="1">是</van-radio>
              <van-radio :name="0" style="margin-top: 8px">否</van-radio>
            </van-radio-group>
            <van-field
              v-else
              v-model="item.example"
              rows="2"
              autosize
              type="textarea"
              maxlength="300"
              placeholder="请输入案例"
              @input="handleChange(item.example, item)"
              show-word-limit
            />
          </template> -->
        </van-cell>
        <van-radio-group v-model="item.selfScore" v-if="!item.needExample" class="radio-style">
          <van-cell-group inset>
            <van-cell title="是" clickable @click="item.selfScore = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell title="否" clickable @click="item.selfScore = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
        <van-field
          v-else
          v-model="item.example"
          maxlength="300"
          rows="2"
          autosize
          type="textarea"
          @input="handleChange(item.example, item)"
          placeholder="请输入案例"
          show-word-limit
        />
      </template>
    </van-cell-group>
    <div class="button-style">
      <van-button type="success" block @click="handleSaveValue">保存</van-button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { phoneStore } from "@/store/phone/index";
// import { saveValueData } from "@/api/values/index";
import { showSuccessToast, showFailToast } from "vant";
import axios from "@/utils/http";
import { getValues } from "@/api/values/index";
import { ref } from "vue";

const index = useRoute().query.index;
const valueList = ref(phoneStore.state.valueList[index]?.actionList);

document.title = phoneStore.state.valueList[index]?.month + "月数据详情";

//输入案例
const handleChange = (val, item) => {
  if (val !== null && val.split(" ").join("").length !== 0) {
    item.selfScore = 1;
  } else {
    item.selfScore = 0;
  }
};

//保存
const handleSaveValue = () => {
  let data = phoneStore.state.valueList;
  data[index].actionList = valueList.value;
  let isFinished = true;

  valueList.value.map((it) => {
    if (!it.needExample && it.selfScore === null) {
      isFinished = false;
    }
    if (it.needExample && it.example.trim().length > 0) {
      it.selfScore = 1;
    }
    it.valueDescription = data[index].valueDescription;
  });

  if (isFinished) {
    axios.post("/ifi-personal/valueData/phone/saveValueDataByUserId", valueList.value).then((res) => {
      if (res.data.code == 0) {
        showSuccessToast("保存成功");
      }
      getValues().then((res) => {
        if (res.data.code == 0) {
          phoneStore.commit("addValue", res.data.data);
          valueList.value = phoneStore.state.valueList[index]?.actionList;
          //是否保存过
          let valuesStatus = [];
          res.data.data.forEach((it) => {
            valuesStatus.push(it.actionList[0].save);
          });
          phoneStore.commit("addStatus", valuesStatus);
        }
      });
    });
  } else {
    showFailToast("价值观未填写完成");
  }
};
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
  // color: #969799 !important;
  // font-size: 1rem;
}
// :deep(.van-field__control) {
//   color: #969799;
// }
</style>
