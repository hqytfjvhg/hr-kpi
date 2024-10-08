<template>
  <div class="login">
    <!-- <div class="logo">
      <img src="@/assets/logo.png" alt="" class="logo-img" />
      <div class="logo-title">OA后台管理系统</div>
    </div> -->

    <div class="container">
      <div class="flex">
        <div class="container-left">
          <img alt="" src="@/assets/login-box-bg.svg" class="login-box-bg" />
          <!-- <div class="mt-10 font-medium text-white -enter-x">集成六大模块的后台管理系统</div> -->
        </div>

        <div class="container-right">
          <div class="form">
            <h2>登录</h2>
            <el-form :model="form" :rules="rules" style="width: 70%; margin: 0 auto">
              <el-form-item label="账号" size="large" prop="username">
                <el-input v-model="form.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" size="large" prop="password">
                <el-input v-model="form.password" type="password" show-password></el-input>
              </el-form-item>
              <el-form-item label="">
                <button class="button" @click="sysLogin" @keyup.enter="sysLogin">登录</button></el-form-item
              >
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { systemLogin } from "@/api/system/transfer";
import { ElMessage } from "element-plus";
export default {
  data() {
    return {
      form: {},
      rules: {
        username: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
      },
    };
  },
  created() {
    document.title = "登录-OA";
  },
  methods: {
    async submitForm() {
      await this.form.validate((valid) => {
        if (valid) {
          return true;
        } else {
          return false;
        }
      });
    },
    sysLogin() {
      if (this.submitForm) {
        this.form.entryIdentification = "admin";
        systemLogin(this.form);
      } else {
        ElMessage.error("请输入账号或密码");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  overflow-y: hidden;
  // background: linear-gradient(180deg, #fff8ef, rgba(255, 255, 255, 0) 100%) !important;

  /* stylelint-disable-next-line media-query-no-invalid */
  // @media (max-width: 1280px) {
  //   background-color: #293146;

  //   .login-form {
  //     background-color: #fff;
  //   }
  // }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    margin-left: -48%;
    background-image: url("@/assets/login-bg.svg");
    // background-image: url("@/assets/slider-left-dec.png");
    background-repeat: no-repeat;
    background-position: 100%;
    background-size: auto 100%;

    /* stylelint-disable-next-line media-query-no-invalid */
  }
  // .app-logo {
  //   position: absolute;
  //   top: 12px;
  //   height: 30px;
  //   display: flex;
  //   align-items: center;
  //   padding-left: 7px;
  //   transition: all 0.2s ease;
  //   cursor: pointer;
  // }
  // @media (min-width: 1280px) {
  //   .xl\:hidden {
  //     display: none;
  //   }
  // }
  .logo {
    display: flex;
    width: 60%;
    height: 80px;
    position: absolute;
    top: 20px;
    left: 5%;

    .logo-img {
      width: 90px;
      height: auto !important;
    }
    .logo-title {
      color: #fff;
      font-size: 24px;
      margin-left: 20px;
      font-weight: 700;
    }
  }

  .container {
    position: relative;
    height: 100vh;
    padding-left: 2.5rem;
    padding-right: 2.5rem;
    .flex {
      height: 100%;
      display: flex;
      .container-left {
        margin-top: auto;
        margin-bottom: auto;
        width: 50%;
        text-align: left;
        padding-left: 40px;
        .login-box-bg {
          width: 50%;
        }
        .font-medium {
          font-weight: 500;
          color: #fff;
          margin-top: 1rem;
          font-size: 1.8rem;
        }
      }
      .container-right {
        height: 100%;
        width: 50%;
        display: flex;
        flex-direction: column;
        margin-top: auto;
        margin-bottom: auto;
        .form {
          margin: auto;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 2px 4px -1px rgb(0 0 0 / 0.1);
          width: 60%;
          background-color: #fff;
          height: 300px;
          h2 {
            margin-bottom: 30px;
            text-align: left;
          }
          .button {
            color: #fff;
            width: 100%;
            font-size: 16px;
            height: 40px;
            padding: 6px 15px;
            border-radius: 8px;
            background: linear-gradient(105deg, rgba(91, 104, 235, 1) 0%, rgba(40, 225, 253, 1) 100%);
            box-shadow: 0 2px 0 rgba(0, 155, 228, 0.11);
            border: 0 solid #0960bd;
          }
        }
      }
    }
  }

  // &-sign-in-way {
  //   .anticon {
  //     color: #888;
  //     font-size: 22px;
  //     cursor: pointer;

  //     // &:hover {
  //     //   color: @primary-color;
  //     // }
  //   }
  // }
}
</style>
