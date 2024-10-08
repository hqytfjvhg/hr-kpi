<template>
  <div class="value-style">
    <van-cell
      is-link
      v-for="(item, index) in valuesData"
      :key="item"
      :title="index + 1 + '.' + item.valuDescription"
      :to="{
        path: '/phone/sign/details',
        query: { name: 'value', index: index, data: JSON.stringify(valuesData), date: useRoute().query.date },
      }"
      size="large"
    >
      <template #title>
        <span class="custom-title">{{ index + 1 + "." + item.valuDescription }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
import { computed } from "vue";

const list = useRoute().query.data;
document.title = useRoute().query.date + "价值观列表";

const valuesData = computed(() => {
  if (list) {
    const parsedData = JSON.parse(list);
    const reducedData = parsedData.reduce((pre, cur) => {
      const existing = pre.find((item) => item.valuDescription === cur.valuDescription);
      if (existing) {
        existing.actionList.push(cur);
      } else {
        pre.push({ valuDescription: cur.valuDescription, actionList: [cur] });
      }
      return pre;
    }, []);
    return reducedData;
  }
  return [];
});

// const valuesData = JSON.parse(list).reduce((pre, cur) => {
//   const existing = pre.find((item) => item.valuDescription === cur.valuDescription);
//   if (existing) {
//     existing.actionList.push(cur);
//   } else {
//     pre.push({ valuDescription: cur.valuDescription, actionList: [cur] });
//   }

//   return pre;
// }, []);
// console.log(valuesData, 777);
</script>

<style lang="scss" scoped>
.value-style {
  text-align: left;
  height: 100vh;
  background-color: #f7f8fa;
}
</style>
