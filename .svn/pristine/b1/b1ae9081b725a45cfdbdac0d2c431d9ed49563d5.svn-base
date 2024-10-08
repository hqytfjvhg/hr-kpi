<template>
  <div class="login-bgc">
    <!-- 正在使用 -->
    <div class="login-body"></div>
    <div class="login-container">
      <div class="img">
        <img src="@/assets/logo.png" alt="" style="height: 3rem" />
      </div>
      <div class="img">
        <img src="@/assets/loginKPI1.png" alt="" class="img-style" />
      </div>
      <div class="login-box">
        <!-- <div class="login-form">
          <div class="field-box">
            <input
              type="text"
              class="account field"
              required="required"
              v-model="username"
              @keyup.enter="loginSubmit"
            />
            <span class="holder">账号</span>
            <span class="el-input__icon">
              <van-icon name="manager-o" />
            </span>
          </div>
          <div class="field-box">
            <input
              class="account field"
              :type="isShowPass ? 'text' : 'password'"
              required="required"
              v-model="password"
              @keyup.enter="loginSubmit"
              data="passworedtype"
            />
            <span class="holder">密码</span>
            <span class="el-input__icon">
              <van-icon name="shield-o" />
            </span>
            <span class="icon-view" v-if="isShowPass" @click="isShowPass = false"> <van-icon name="eye-o" /></span>
            <span class="icon-view" v-else @click="isShowPass = true">
              <van-icon name="closed-eye" />
            </span>
          </div>
          <div>
            <van-button block color="#527bbd" @click="loginSubmit" class="submit">登录</van-button>
          </div>
        </div> -->
        <div class="login-form">
          <van-form @submit="onSubmit" class="form-style">
            <!-- <van-cell-group inset> -->
            <van-field
              class="input-style"
              v-model="username"
              name="用户名"
              placeholder="请输入账号"
              border
              input-align="center"
              :rules="[{ required: true, message: '请填写账号' }]"
            />
            <van-field
              v-model="password"
              class="input-style"
              type="password"
              name="密码"
              placeholder="请输入密码"
              border
              input-align="center"
              :rules="[{ required: true, message: '请填写密码' }]"
            />
            <!-- </van-cell-group> -->
            <div style="margin-top: 2rem">
              <van-button block type="primary" native-type="submit"> 登录 </van-button>
            </div>
          </van-form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ElButton, ElMessage } from "element-plus";
import { login, uuid } from "@/api/login/index";
// import { Lock, View, Hide } from "@element-plus/icons-vue";

export default {
  // components: { Lock, View, Hide },
  data() {
    return {
      username: "",
      password: "",
      isRemeber: true,
      isShowPass: false,
      winHeight: 0,
    };
  },
  created() {
    document.title = "绩效-OA";
  },
  mounted() {
    this.winHeight = window.innerHeight; // 获取当前页面可视区高度
    document.body.style.height = this.winHeight + "px"; // 设置 body 高度
    // console.log(document.body.style);

    // console.log(document.getElementsByClassName("login-bgc"));
  },
  methods: {
    loginSubmit() {
      if (this.username == "" || this.password == "") {
        ElMessage.error("账号/密码不能为空");
      } else {
        const LoginForm = {
          username: this.username,
          password: this.password,
          entryIdentification: "employee",
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
html,
body {
  width: fit-content;
}
#app {
  width: 100vw;
}
.login-bgc {
  // background-color: #f3f5f5;
  width: 100vw;
  height: 100vh;

  font-family: "Microsoft Yahei";
}
.login-body {
  width: 100vw;
  height: 100vh;
  // min-width: 700px;
  // background-image: linear-gradient(#8feee5, #bdf8d2);
  border-radius: 81% 39% 88% 43% / 46% 67% 33% 54%;
  position: relative;
  overflow: hidden;
}
.login-container {
  position: absolute;
  top: 8vh;
  left: 8vw;
  // background-color: rgb(248, 250, 251);
  // border-radius: 15px;
  // box-shadow: 4px 4px 8px rgba(189, 188, 188, 0.5);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  height: 84vh;
  z-index: 3;
  width: 84vw;
  // min-width: 600px;
  overflow: auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
.img {
  grid-column: 1 / span 2;
  display: flex;
  justify-content: center;
  align-items: center;
  .img-style {
    height: 70%;
    width: 70%;
    object-fit: contain;
  }
  .logo {
    text-align: left;
    position: absolute;
    top: 20px;
    left: 50px;
    color: #46b2ef;
    font-weight: 700;
    font-size: 23px;
  }
}
.login-box {
  display: flex;
  align-items: center;
  text-align: center;
  padding: 2rem;
  padding-top: 0 !important;
  .login-form {
    height: 100%;
    width: 100%;
  }
  .field-box {
    position: relative;
    font-size: 2rem;
    margin-top: 2rem;
    height: 5rem;
    background-color: rgb(236, 243, 245, 0.5);
    text-align: left;
    border-radius: 10px;
  }

  .field-box:focus-within {
    background-color: #fff;
  }
  .field {
    border: none;
    outline: none;
    width: 80%;
    height: 50px;
    background: none;
    transition: all 0.5s;
    color: black;
    font-size: 20px;
    padding-left: 70px;
    padding-top: 30px;
    overflow: hidden;
  }
}

.bottom-text {
  text-align: center;
}

.form-title {
  letter-spacing: 3px;
  text-decoration: none;

  font-size: clamp(15px, 2vw, 36px);
  font-family: "Arial";
  position: relative;
  text-transform: uppercase;
  color: #5daff1;
  font-weight: 700;

  margin-top: 3.5vh;
  width: 100%;
}

.hover-text {
  position: absolute;
  box-sizing: border-box;
  content: attr(data-text);
  color: #36a1f3;
  width: 0%;
  inset: 0;
  border-right: 6px solid #36a1f3;
  overflow: hidden;
  transition: 0.5s;
  -webkit-text-stroke: 1px #36a1f3;
  margin-right: 10px;
}

.form-title:hover .hover-text {
  width: 100%;
  filter: drop-shadow(0 0 23px #36a1f3);
}

.el-input__icon {
  font-size: 30px;
  z-index: 20;
  position: absolute;
  top: 22px;
  left: 20px;
  color: #999;
}
.icon-view {
  font-size: 20px;
  z-index: 20;
  position: absolute;
  top: 43px;
  right: 20px;
  color: #999;
}

.holder {
  color: #999;
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  z-index: 1;
  transition: all 0.5s;
  font-size: 23px;

  height: 80px;
  line-height: 80px;

  padding-left: 70px;
}

.field:focus ~ .holder,
.field:valid ~ .holder {
  top: -15px;
  font-size: 20px;
}

.radio-button {
  text-align: left;
  margin-left: 20px;
  margin-top: 20px;
  color: #999;
}
.submit {
  position: relative;
  display: block;
  top: 15px;
  width: 100%;
  margin: 20px auto 0;
  padding: 10px 22px;
  border-radius: 6px;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 22px;
  font-family: "Microsoft Yahei";
  cursor: pointer;
  // background-color: #527bbd;
  transition: all 0.2s ease;
  z-index: 1;
}

.input-style {
  height: 3.5rem;
  line-height: 2.2rem;
  margin-top: 1rem;
  border-radius: 0.5rem;
  background: #e7e7e775;
}
</style>
