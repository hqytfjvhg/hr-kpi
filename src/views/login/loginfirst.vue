<template>
  <div class="login-body">
    <div class="login-container">
      <div class="img">
        <img src="@/assets/illustration.svg" alt="" width="500" height="380" />
      </div>
      <div class="login-box">
        <div class="login-form">
          <div class="login-logo">
            <img src="../../assets/kyLogo.png" width="50" />
          </div>
          <div><h2>绩效管理平台</h2></div>
          <el-form class="formStyle">
            <el-form-item>
              <el-input
                v-model="username"
                placeholder="请输入账号"
                clearable
                :prefix-icon="User"
                style="height: 40px; width: 100%"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><User /></el-icon> </template
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-input
                v-model="password"
                type="password"
                placeholder="请输入密码"
                show-password
                clearable
                :prefix-icon="Lock"
                style="height: 40px; width: 100%"
              >
                <template #prefix>
                  <el-icon class="el-input__icon"><Lock /></el-icon
                ></template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit" style="width: 100%">登录</el-button>
            </el-form-item>
          </el-form>
          <div></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElButton, ElMessage } from "element-plus";
import { login, uuid } from "@/api/login/index";
import { User, Lock } from "@element-plus/icons-vue";

export default {
  components: { User, Lock },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    loginSubmit() {
      if (this.username == "" || this.password == "") {
        ElMessage.error("账号/密码不能为空");
      } else {
        const LoginForm = {
          username: this.username,
          password: this.password,
        };
        login(LoginForm);
      }
    },
    getUuid() {
      uuid();
    },
    components: { ElButton },
  },
};
</script>
<style lang="scss" scoped>
.login-body {
  width: 100%;
  height: 100%;
  background: url(../../assets/bg.png);
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute;
  overflow: hidden;
}
.login-container {
  gap: 18rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 100vh;
  width: 100vw;
}
.img {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.login-box {
  display: flex;
  align-items: center;
  text-align: center;
  padding-right: 2rem;
  .login-form {
    width: 360px;
  }
  .login-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0.7rem 0;
  }
  h2 {
    margin: 15px 0;
  }
}
.el-button {
  width: 15rem;
  margin: 0.7rem 0;
}
.el-input {
  width: 15rem;
  margin: 0.7rem 0;
}
.registerLink {
  color: inherit;
  text-decoration: none;
}
.registerLink:hover {
  color: blue;
}
</style>
