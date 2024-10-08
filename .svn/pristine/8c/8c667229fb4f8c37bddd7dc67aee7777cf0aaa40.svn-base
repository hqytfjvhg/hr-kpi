<template>
  <div class="form-style">
    <el-form :inline="true" :model="formItems">
      <template v-for="(item, index) in formItems" :key="item">
        <el-form-item :label="item.label" v-if="item.type === 'input'">
          <el-input v-model="formItems[index].value"></el-input>
        </el-form-item>
        <el-form-item :label="item.label" v-if="item.type === 'select'">
          <el-select v-model="formItems[index].value" :value-key="item.selectDefault" filterable clearable>
            <el-option v-for="op in item.options" :key="op" :label="op.label" :value="op.value" />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button type="primary" @click="handleSearch">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  formItems: {
    type: Array,
    default: () => [],
  },
});
const formItems = ref(props.formItems);
// console.log(formItems.value, 555);

const emit = defineEmits(["search"]);
const handleSearch = () => {
  emit("search", formItems.value);
};
</script>

<style lang="scss" scoped>
.form-style {
  text-align: left;
  padding: 10px 10px 0;
}
:deep(.el-form-item) {
  margin-bottom: 0;
}
:deep(.el-form--inline .el-form-item) {
  margin-right: 12px;
}
</style>
