<template>
  <el-dialog
    :model-value="true"
    :title="title"
    @close="handleClose"
    width="500px"
    :show-close="false"
    :close-on-click-modal="false"
  >
    <el-form :model="formData" :rules="rules" v-if="title == '新增行为'" label-width="120px" class="fromStyle">
      <el-form-item label="行为中文描述" prop="actionDescription">
        <el-input v-model="formData.actionDescription"></el-input>
      </el-form-item>

      <el-form-item label="是否需要案例" prop="needExample">
        <el-radio-group v-model="formData.needExample">
          <el-radio-button :label="true">是</el-radio-button>
          <el-radio-button :label="false">否</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <div class="button-style">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-form>
    <el-form
      v-else
      ref="ruleFormRef"
      :model="formData"
      :rules="rules"
      label-width="120px"
      style="width: 400px"
      :size="formSize"
    >
      <el-form-item label="姓名" prop="name" v-if="title == '新增用户'">
        <el-input clearable v-model="formData.name" placeholder="请输入姓名长度在2-15的中文"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name" v-if="title !== '新增用户'">
        <el-input clearable v-model="formData.name" placeholder="请输入姓名长度在2-15的中文" disabled></el-input>
      </el-form-item>
      <el-form-item label="部门" prop="deptName" v-if="title !== '重置密码'">
        <el-select placeholder="请选择部门" v-model="formData.deptName" style="width: 280px">
          <el-option v-for="item in deptOptions" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
        </el-select>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword" v-if="title == '重置密码'">
        <el-input clearable v-model="formData.newPassword" type="password" show-password></el-input>
      </el-form-item>
      <el-form-item label="账号" prop="username" v-if="title == '新增用户'">
        <el-input clearable v-model="formData.username" placeholder="请输入账号/密码长度在4-16的字母和数字"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" v-if="title == '新增用户'">
        <el-input
          clearable
          type="password"
          show-password
          v-model="formData.password"
          placeholder="请输入账号/密码长度在4-16的字母和数字"
        ></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="roleName" v-if="title !== '重置密码'">
        <el-select placeholder="请输入角色" v-model="formData.roleCnName" style="width: 280px">
          <el-option
            v-for="(item, index) in roleOptions"
            :key="item.roleId"
            :label="item.roleCnName"
            :value="item.roleId"
            :hidden="index === 0"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="职务" prop="position" v-if="title != '重置密码'">
        <el-input clearable placeholder="请输入职务" v-model="formData.position"></el-input
      ></el-form-item>
      <el-form-item
        label="关联部门"
        prop="position"
        v-if="
          title == '修改信息' &&
          (formData.roleName == 'CLERK' ||
            formData.roleName == 'DEPTMANAGER' ||
            formData.roleName == 'HRMANAGER' ||
            formData.roleName == 'HR')
        "
      >
        <el-select
          multiple
          v-model="formData.clerkAssociatedDepartmenString"
          placeholder="请选择关联部门"
          style="width: 280px"
        >
          <el-option v-for="item in deptOptions" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
        </el-select>
      </el-form-item>
      <el-form-item label="关联人员" prop="position" v-if="title == '修改信息' && formData.roleName == 'CLERK'">
        <el-select
          multiple
          v-model="formData.clerkAssociatedUsersString"
          placeholder="请选择关联人员"
          style="width: 280px"
        >
          <el-option v-for="item in userList" :key="item.userId" :label="item.name" :value="item.userId" />
        </el-select>
      </el-form-item>
      <div class="button-style">
        <el-button @click="handleClose">取消</el-button>
        <el-button @click="resetForm">复原</el-button>
        <el-button type="primary" @click="submitForm">确定</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
import { ElMessage } from "element-plus";
import { reactive, toRefs, onMounted } from "vue";
import { getAllUser } from "@/api/userlist/index";

export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    dialogShow: {
      type: Boolean,
      default: false,
    },
    rowInfo: {
      type: Object,
      default() {
        return {};
      },
    },
    arrayNum: {
      type: Number,
      default: 0,
    },
    deptOptions: {
      type: Object,
      default() {
        return {};
      },
    },
    roleOptions: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const data = reactive({
      // dialogFlag: false,
      formData: {},
      userList: [], //关联人员
      rules: {
        name: [{ required: true, message: "请输入中文姓名", trigger: "blur" }],
        deptName: [{ required: true, message: "请输入数字类型的部门ID", trigger: "blur" }],
        newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
        roleName: [{ required: true, message: "请输入角色", trigger: "blur" }],
        actionDescription: [{ required: true, message: "请输入行为描述", trigger: "blur" }],
        selfScore: [{ required: true, message: "初始分数请输入0", trigger: "blur" }],
        leaderScore: [{ required: true, message: "初始分数请输入0", trigger: "blur" }],
        needExample: [{ required: true, message: "请选择是否需要案例", trigger: "blur" }],
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        position: [{ required: true, message: "请输入职位", trigger: "blur" }],
      },
    });
    const method = reactive({
      // 关闭弹窗
      handleClose() {
        emit("update:dialogShow", false);
      },
      // 重置,不是清空，返回初始数据
      resetForm() {
        data.formData = Object.assign({}, props.rowInfo);
      },
      // 提交表单内容
      submitForm() {
        if (props.title == "新增行为") {
          if (
            !data.formData.actionDescription ||
            data.formData.actionDescription.replace(/\s/g, "") === "" ||
            data.formData.needExample == null
          ) {
            ElMessage.error("请设置参数");
          } else {
            method.handleClose();
            if (data.formData.needExample == true) {
              data.formData.actionDescription = data.formData.actionDescription.replace(/[*]/g, "");
              data.formData.actionDescription =
                "<span style='color:red;font-size:20px;font-weight:700'>* </span>" + data.formData.actionDescription;
            } else if (data.formData.needExample == false) {
              data.formData.actionDescription = data.formData.actionDescription.replace(/[*]/g, "");
            }
            const formdata = {
              actionDescription: data.formData.actionDescription,
              hrScore: 0,
              leaderScore: 0,
              needExample: data.formData.needExample,
              selfScore: 0,
            };

            emit("addAction", formdata);
          }
        }
        if (props.title == "重置密码") {
          // 修改
          emit("editRow", data.formData);
          method.handleClose();
        } else if (props.title == "新增用户") {
          // 新增用户
          const regex = /^[\u4e00-\u9fff]{2,15}$/;
          const regex2 = /^[a-zA-Z0-9]{4,16}$/;
          const regex3 = /^[0-9]{4,16}$/;

          if (
            data.formData.name == null ||
            data.formData.deptName == "" ||
            data.formData.username == null ||
            data.formData.password == null ||
            data.formData.roleName == ""
          ) {
            ElMessage.error("请设置参数");
          } else if (!data.formData.position || data.formData.position.replace(/\s/g, "") === "") {
            ElMessage.error("请设置参数");
          } else if (!regex.test(data.formData.name)) {
            ElMessage.error("请输入姓名长度在2-15的中文");
          } else if (
            !regex2.test(data.formData.username) ||
            !regex2.test(data.formData.password) ||
            regex3.test(data.formData.username) ||
            regex3.test(data.formData.password)
          ) {
            ElMessage.error("请输入账号/密码长度在4-16的字母和数字");
          } else {
            const formData = {
              name: data.formData.name,
              deptId: data.formData.deptName,
              username: data.formData.username,
              password: data.formData.password,
              roleId: data.formData.roleCnName,
              position: data.formData.position,
            };

            emit("addRow", formData);
            method.handleClose();
          }
        } else if (props.title == "修改信息") {
          // console.log(data.formData);
          if (!data.formData.position || data.formData.position.replace(/\s/g, "") === "") {
            ElMessage.error("请设置参数");
          } else {
            emit("reviseRow", data.formData);
            // console.log(data.formData);
            method.handleClose();
          }
        }
      },
    });
    onMounted(() => {
      data.formData = Object.assign({}, props.rowInfo);

      data.dialogFlag = props.rowInfo;
      if (props.rowInfo.roleName === "CLERK") {
        getAllUser()
          .then((res) => {
            data.userList = res.data.data;
          })
          .catch(() => {});
      }
    });
    return { ...toRefs(data), ...method };
  },
};
</script>

<style lang="scss" scoped>
.el-from .fromStyle {
  display: block;
}
.button-style {
  margin-top: 10px;
  text-align: right;
}
</style>
