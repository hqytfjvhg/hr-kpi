<template>
  <div>
    <Form :formItems="formItems" @search="handleSearch"></Form>
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
        <el-button type="success" @click="handleDown">下载模板</el-button>
        <el-upload
          class="upload-demo"
          action="#"
          accept=".xlsx,.xls"
          :on-change="handleExport"
          :show-file-list="false"
          :auto-upload="false"
          style="margin: 0 12px"
        >
          <el-button type="primary">导入</el-button>
        </el-upload>
      </template>
    </Table>
    <Dialog :title="title" :isShow="isShow" @confirm="handleSubmit" @close="isShow = false">
      <el-form ref="formRef" :model="form" :rules="rules" :label-position="right">
        <el-form-item prop="name" label="名字"> <el-input v-model="form.name"></el-input></el-form-item>
        <el-form-item prop="type" label="类型">
          <el-radio-group v-model="form.type">
            <el-radio-button :label="1">素菜</el-radio-button>
            <el-radio-button :label="2">荤菜</el-radio-button></el-radio-group
          >
        </el-form-item>
      </el-form>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Table from "@/components/table/tableTemplate";
import Dialog from "@/components/dialog/DialogTemplate";
import Form from "@/components/form/formTemplate";
import { addOrEdit, downloadFile } from "@/api/system/logistics/key";
// import axios from "@utils/http";
import * as XLSX from "xlsx/xlsx.mjs";

//表格传参的数据
const columns = [
  { prop: "name", label: "名字" },
  { prop: "type", label: "类型", isMeat: true },
];
const tableBtn = [
  { txt: "修改", onClick: (val) => handleEdit(val) },
  {
    txt: "删除",
    url: "/ifi-personal/dish/basic/delMaterials",
    isDelecteType: false,
  },
];
const propsData = { url: "/ifi-personal/dish/basic/pageMaterialsList", type: "post", data: {} };

//弹窗传参的数据
const title = ref("新增原材料");
const isShow = ref(false);
const rules = ref({
  name: [{ required: true, message: "请输入名字", trigger: "blur" }],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
});
const form = ref({ name: "", type: 1 });

//查询条件
const formItems = ref([
  //   {
  //     type: "input",
  //     label: "类别",
  //     prop: "name",
  //     value: "",
  //   },
  {
    type: "select",
    label: "类型",
    prop: "type",
    value: "",
    options: [
      { label: "素菜", value: 1 },
      { label: "荤菜", value: 2 },
    ],
  },
]);

//提交
const formRef = ref(null);
const table = ref(null);
const handleSubmit = () => {
  // console.log(form, "提交");
  formRef.value.validate((valid) => {
    if (valid) {
      if (title.value === "新增原材料") {
        addOrEdit("/ifi-personal/dish/basic/addMaterials", form.value).then((res) => {
          if (res) {
            isShow.value = false;
            form.value = { name: "" };
            table.value.getTableData();
          }
        });
      } else {
        addOrEdit("/ifi-personal/dish/basic/updateMaterials", form.value).then((res) => {
          if (res) {
            isShow.value = false;
            form.value = { name: "" };
            table.value.getTableData();
          }
        });
      }
    }
  });
};

//修改
const handleEdit = (val) => {
  // console.log(val, "修改");
  isShow.value = true;
  title.value = "修改原材料";
  form.value = { ...val };
};
//新增
const handleAdd = () => {
  if (formRef.value) {
    formRef.value.resetFields();
  }

  isShow.value = true;
  title.value = "新增原材料";
  form.value = {};
};

//查询
const handleSearch = (val) => {
  //   console.log(val, "查询");
  propsData.data.type = val[0].value;
  table.value.getTableData();
  //   table.value.getTableData(val);
};

//下载
const handleDown = () => {
  downloadFile("/ifi-personal/dish/basic/downloadExcel", "原材料导入模板");
};

//导入数据
const handleExport = (file) => {
  const reader = new FileReader();
  reader.readAsBinaryString(file.raw);
  reader.onload = (ev) => {
    const f = ev.target.result;
    const workbook = XLSX.read(f, { type: "binary" });

    let excelData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
    // excelData.splice(0, 1);
    console.log(excelData, "excelData");
    let data = excelData
      .map((it) => {
        if (it["名称"].trim() !== "") {
          return {
            name: it["名称"],
            type: it["类型"] === "素菜" ? 1 : 2,
          };
        }
        return null;
      })
      .filter((it) => it !== null);
    // console.log(data);
    addOrEdit("/ifi-personal/dish/basic/importMaterials", data).then(() => {
      table.value.getTableData();
    });
  };
};
</script>

<style lang="scss" scoped></style>
