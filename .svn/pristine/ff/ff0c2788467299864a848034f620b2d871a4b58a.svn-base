<template>
  <div>
    <Table
      :columns="columns"
      :isShowSelect="false"
      :tableBtn="tableBtn"
      :isPage="true"
      :propsData="propsData"
      ref="table"
    >
      <template #addButton>
        <el-button type="success" @click="handleAdd">新增</el-button>
      </template>
    </Table>
    <Dialog :title="title" :isShow="isShow" @confirm="handleSubmit" @close="isShow = false">
      <el-form ref="formRef" :model="form" :rules="rules" :label-position="right">
        <el-form-item prop="name" label="名字"> <el-input v-model="form.name"></el-input></el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Table from "@/components/table/tableTemplate";
import Dialog from "@/components/dialog/DialogTemplate";
import { addOrEdit } from "@/api/system/logistics/key";

//表格传参的数据
const columns = [{ prop: "name", label: "名字" }];
const tableBtn = [
  { txt: "修改", onClick: (val) => handleEdit(val) },
  {
    txt: "删除",
    url: "/ifi-personal/dish/basic/delDishesKeyWord",
    isDelecteType: true,
  },
];
const propsData = { url: "/ifi-personal/dish/basic/pageDishesKeyWordList", type: "post" };

//弹窗传参的数据
const title = ref("新增烹饪方法");
const isShow = ref(false);
const rules = ref({
  name: [{ required: true, message: "请输入名字", trigger: "blur" }],
});
const form = ref({ name: "" });

//提交
const table = ref(null);
const handleSubmit = () => {
  // console.log(form, "提交");
  if (title.value === "新增烹饪方法") {
    addOrEdit("/ifi-personal/dish/basic/addDishesKeyWord", form.value).then((res) => {
      if (res) {
        isShow.value = false;
        form.value = { name: "" };
        table.value.getTableData();
      }
    });
  } else {
    addOrEdit("/ifi-personal/dish/basic/updateDishesKeyWord", form.value).then((res) => {
      if (res) {
        isShow.value = false;
        form.value = { name: "" };
        table.value.getTableData();
      }
    });
  }
};

//修改
const handleEdit = (val) => {
  // console.log(val, "修改");
  isShow.value = true;
  title.value = "修改烹饪方法";
  form.value = { name: val.name, id: val.id };
};
//新增
const handleAdd = () => {
  isShow.value = true;
  title.value = "新增烹饪方法";
  form.value = { name: "" };
};
</script>

<style lang="scss" scoped></style>
