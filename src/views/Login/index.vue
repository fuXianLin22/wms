<template>
  <div class="login_container">
    <div class="login_box">
      <div class="divLeft">
        <div class="divTitle">
          <img src="~@/assets/title.ef005a7a.png" alt="" />
        </div>
        <!-- form表单 -->
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <!-- 用户名 -->
          <el-form-item prop="username">
            <div class="divImg">
              <img src="~@/assets/img/mobile.png" alt="" class="input_tubiao" />
            </div>
            <el-input
              name="username"
              type="text"
              v-model="loginForm.username"
              class="divUser"
            >
            </el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password">
            <div class="divImg">
              <img src="~@/assets/img/suo.png" alt="" class="input_tubiao" />
            </div>
            <el-input
              name="password"
              type="password"
              v-model="loginForm.password"
              class="divPwd"
              show-password
            >
            </el-input>
          </el-form-item>
        </el-form>
        <!-- 复选框 -->
        <el-checkbox v-model="checked" class="divCheckBox">
          记住密码
        </el-checkbox>
        <!-- 登录按钮 -->
        <div class="divBtnLogin">
          <el-button @click="login">立即登录</el-button>
        </div>
      </div>
      <div class="divRight"></div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111'
      },
      checked: true,
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' },
          { min: 3, max: 10, message: '用户名格式不正确', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    async login() {
      // 校验表单
      await this.$refs.loginForm.validate()
      // console.log(this.$store)
      // this.$store.dispatch('home/getTodos')
      this.$router.push({ path: '/dashboard' })
    }
  }
}
</script>

<style scoped lang="less">
.login_container {
  .login_box {
    width: 958px;
    height: 516px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgb(93 93 93 / 33%);
    background-color: #fff;
    border-radius: 40px;
    .divLeft {
      float: left;
      width: 398px;
      height: 516px;
      background: #fff;
      border-radius: 34px 0 0 34px;
      margin: 0 auto;
      .divTitle {
        margin-left: 124px;
        margin-top: 72px;
        // background-color: pink;
        img {
          width: 150px;
          height: 64px;
        }
      }
      .el-form {
        /deep/.el-form-item__error {
          margin-left: 110px;
        }
        margin-top: 50px;
        /deep/.el-form-item__content {
          display: flex;
          justify-content: center;
          .divImg {
            float: left;
            width: 50px;
            height: 50px;
            background: #eae7e7;
            border-radius: 8px 0 0 8px;
          }
        }
        /deep/.el-input__inner {
          width: 230px;
          height: 50px;
          background-color: #f8f5f5;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        }
        .input_tubiao {
          width: 25px;
          height: 24px;
          margin: 12px 13px;
          // height: 40px;
        }
        .divUser,
        .divPwd {
          width: 230px;
          height: 50px;
        }
      }
      .divCheckBox {
        margin-top: 22px;
        margin-left: 60px;
      }
      .divBtnLogin {
        display: block;
        margin-top: 23px;
        margin-left: 59px;
        button {
          width: 280px;
          height: 50px;
          background: #ffb200;
          border-radius: 8px;
          box-shadow: 0 2px 9px 1px rgb(255 178 0 / 47%);
          font-size: 16px;
          font-weight: 600;
          text-align: center;
          color: #332929;
          line-height: 22px;
        }
      }
    }
    .divRight {
      float: right;
      background-image: url('~@/assets/contentBg.1321d126.png');
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 560px;
      height: 516px;
    }
  }
}
</style>
