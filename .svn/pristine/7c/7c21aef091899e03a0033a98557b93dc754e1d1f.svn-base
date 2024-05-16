<template>
  <div class="syMain">
    <el-dialog
      ref="dailog"
      :model-value="true"
      @close="handleClose"
      width="40%"
      :title="title"
      :show-close="title == '初始密码修改' ? false : true"
      :close-on-click-modal="false"
    >
      <div>
        <el-steps :active="active" align-center>
          <el-step title="登录" />
          <el-step title="修改密码" />
          <el-step title="完成" />
        </el-steps>
        <div v-if="active == 1" class="topTip">您好，为了您的账号安全，请点击下一步修改密码</div>
        <div v-if="active != 3" class="form-content">
          <el-form ref="form" :model="formData" status-icon :rules="rules" label-position="top" label-width="auto">
            <el-form-item v-show="active == 1" label="账号">
              <el-input v-model="formData.username" :disabled="true" size="large" />
            </el-form-item>
            <template v-if="active == 2">
              <el-form-item label="新密码" prop="newPwd" class="password-item">
                <el-input type="text" v-model="formData.newPwd" size="large"></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="confirmPwd" class="password-item">
                <el-input type="text" v-model="formData.confirmPwd" size="large"></el-input>
              </el-form-item>
            </template>
          </el-form>
          <div v-if="active != 1" style="margin-right: 12px">
            <el-button @click="resetForm()" style="width: 47%" size="large">上一步</el-button>
            <el-button type="primary" @click="submitForm()" style="width: 47%" size="large">下一步</el-button>
          </div>
          <div v-else>
            <el-button type="primary" @click="nextTip" size="large" class="button-style">下一步</el-button>
          </div>
        </div>
        <div v-if="active === 3">
          <el-result icon="success" title="修改密码成功" v-if="isSuccess">
            <template #extra>
              <el-button type="primary" @click="handleClose()" size="large"
                ><span v-if="title == '初始密码修改'">重新登录</span><span v-else>关闭弹窗</span>
              </el-button>
            </template>
          </el-result>
          <el-result icon="error" title="修改密码失败" v-else>
            <template #extra>
              <el-button type="primary" @click="resetForm()" size="large">重新修改</el-button>
            </template>
          </el-result>
        </div>
        <div v-if="active == 2" class="tip">
          <p>温馨提示</p>
          <p>1、密码长度在4-16个字符</p>
          <p>2、密码必须由数字、英文字符组成</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { updateOneselfPassword } from "@/api/login";
import { ElMessage } from "element-plus";
export default {
  props: {
    dialogTableVisible: {
      type: Boolean,
      default: false,
    },
    form: {
      type: Object,
      default: () => ({}),
    },
    title: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      currentRole: "adminDashboard",
      isSuccess: false,
      active: 1,
      rules: {
        newPwd: [{ required: true, message: "" }],
        confirmPwd: [{ required: true, message: "" }],
      },
    };
  },
  methods: {
    nextTip() {
      this.active += 1;
    },
    resetForm() {
      this.active -= 1;
    },
    again() {
      this.active = 1;
    },
    handleClose() {
      if (this.title == "初始密码修改") {
        this.$router.replace({ name: "login" });
        localStorage.clear();
      }
      this.$emit("update:dialogTableVisible", false);
    },
    async submitForm() {
      console.log(this.formData);
      if (this.validatePassword(this.formData.newPwd, this.formData.confirmPwd) == true) {
        const data = { password: this.formData.newPwd };
        updateOneselfPassword(data).then((res) => {
          if (res.data.code == 0 && res.data.data) {
            this.isSuccess = true;
            this.active = 3;
          } else {
            ElMessage.error("修改失败，请重试");
            this.isSuccess = false;
          }
        });
      }
    },
    validatePassword(password, confirmPWD) {
      // 判断密码是否为空
      if (!password && !confirmPWD) {
        return ElMessage.error("密码不能为空");
      }
      if (password !== confirmPWD) {
        return ElMessage.error("密码不一致");
      }
      // 判断密码长度是否低于6个字符
      if (password.length < 4 && confirmPWD.length < 4) {
        return ElMessage.error("密码长度不能低于4个字符");
      }

      // 判断密码是否包含数字和英文字符
      let hasNumber = /\d/.test(password);
      let hasAlphabet = /[a-zA-Z]/.test(password);

      if (!(hasNumber && hasAlphabet)) {
        return ElMessage.error("密码必须同时包含数字和英文字符");
      }

      // 如果所有条件都满足，则返回 true 或者空字符串，表示密码验证通过
      return true;
    },
  },
  created() {
    this.formData = this.form;
  },
};
</script>
<style lang="scss" scoped>
.syMain {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .topTip {
    text-align: center;
    line-height: 30px;
    color: red;
    font-size: 15px;
    margin: 20px 0;
    font-family: "Microsoft Yahei";
  }
  .form-content {
    width: 60%;
    margin: 20px auto;
    text-align: center;
  }
  .button-style {
    width: 97%;
    margin-right: 12px;
  }
  .tip {
    color: red;
    margin: 20px auto 0 auto;
    text-align: left;
    p {
      margin: 5px;
    }
  }
  .el-step__title {
    font-size: 14px;
  }
}
</style>
