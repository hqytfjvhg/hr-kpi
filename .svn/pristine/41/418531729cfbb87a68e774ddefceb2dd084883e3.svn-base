<template>
  <div class="register-body">
    <!-- 此页面没有被使用 -->
    <div class="register-box">
      <div class="register-logo">
        <!-- <img src="../../assets/logo.png" width="45" /> -->
      </div>
      <el-form :model="RegisterFrom" label-position="right" label-width="80px">
        <el-form-item label="部门" prop="department">
          <el-select v-model="RegisterFrom.department" clearable placeholder="请选择部门" width="15rem">
            <el-option v-for="item in options" :key="item.deptId" :label="item.deptName" :value="item.deptId" />
          </el-select>
          <!-- <el-input v-model="RegisterFrom.department" placeholder="请输入部门ID" clearable></el-input> -->
        </el-form-item>
        <el-form-item label="名字" prop="realname">
          <el-input v-model="RegisterFrom.realname" placeholder="请输入中文姓名" clearable></el-input>
        </el-form-item>
        <el-form-item label="账户" prop="username">
          <el-input v-model="RegisterFrom.username" placeholder="请输入由数字和字母构成的用户名" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="RegisterFrom.password"
            type="password"
            placeholder="请输入6-16位数字和字母构成的密码"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input v-model="RegisterFrom.phone" placeholder="请输入11位手机号码" clearable></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-radio-group v-model="RegisterFrom.sex">
            <el-radio-button label="男" name="man"></el-radio-button>
            <el-radio-button label="女" name="women"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="角色" prop="role">
          <el-radio-group v-model="RegisterFrom.role">
            <el-radio label="管理员" name="root"></el-radio>
            <el-radio label="管理层人员" name="root"></el-radio>
            <el-radio label="职工" name="root"></el-radio>
          </el-radio-group>
        </el-form-item> -->
      </el-form>
      <div style="text-align: right">
        <el-button type="primary" round @click="registerSubmit()">注册</el-button>
      </div>
      <div style="line-height: 1.3rem; font-size: 0.6rem; color: #606266; text-align: right">
        <router-link to="login" class="loginLink">登录</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { register, deptList } from "@/api/register/index";
// import { ElMessage } from "element-plus";

export default {
  data() {
    return {
      options: [],
      RegisterFrom: {
        department: null,
        realname: "",
        username: "",
        password: "",
        phone: "",
        sex: "",
      },
    };
  },
  created() {
    deptList()
      .then((res) => {
        if (res.data.code == 0) {
          this.options = res.data.data;
        }
      })
      .catch(() => {});
  },
  methods: {
    registerSubmit() {
      const RegisterFrom = {
        deptId: this.RegisterFrom.department,
        name: this.RegisterFrom.realname,
        username: this.RegisterFrom.username,
        password: this.RegisterFrom.password,
        phone: this.RegisterFrom.phone,
        sex: this.RegisterFrom.sex,
        uuid: this.$store.state.registerIdentifyUuid,
      };
      register(RegisterFrom);
    },
  },
};
</script>
<style lang="scss" scoped>
.register-body {
  width: 100%;
  height: 100%;
  background: url(../../assets/login.svg);
  background-size: 100% 100%;
  position: absolute;
  overflow: hidden;
}
.register-box {
  width: 20rem;
  // display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  top: 23%;
  left: 40%;
  .register-logo {
    width: 15rem;
    padding-left: 5rem;
    // float: right;
    display: flex;
    justify-content: center;
    // align-items: center;
    // text-align: right;
    margin: 0.7rem 0;
    // h1 {
    //   margin-left: 1rem;
    // }
  }
  // .el-form {
  //   width: 25rem;
  //   .button {
  //     display: flex;
  //     justify-content: space-around;
  //   }

  // }
}
.el-button {
  width: 15rem;
  margin-bottom: 0.7rem;
}
.el-input {
  width: 15rem;
  // padding-left: 1rem;
  // margin: 0.7rem 0;
}
.el-select {
  width: 20rem;
}
.loginLink {
  color: inherit;
  text-decoration: none;
}
.loginLink:hover {
  color: blue;
}
</style>
