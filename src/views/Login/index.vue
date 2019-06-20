<template>
  <div class="main">
    <!-- <canvas id="loginAni"></canvas> -->
    <div class="img-wrapper animate-bounce-up"></div>
    <div class="login-wrapper">
      <h3 class="title">邢台公交管理综合分析决策系统</h3>
      <div class="login-block">
        <el-form ref="loginForm" :model="loginForm" :rules="loginRules" size="medium">
          <el-form-item prop="userAccount">
            <el-input
              class="login-input"
              type="text"
              v-model="loginForm.userAccount"
              prefix-icon="el-icon-s-custom"
              placeholder="用户名"
            ></el-input>
          </el-form-item>

          <el-form-item prop="userPassword">
            <el-input
              class="login-input"
              type="password"
              prefix-icon="el-icon-delete-solid"
              v-model="loginForm.userPassword"
              @keyup.enter.native="login('loginForm')"
              placeholder="密码"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <div style="margin-top:8px;">
              <el-button
                class="login-button"
                type="primary"
                :loading="isLoginning"
                @click="login('loginForm')"
              >登录</el-button>
              <el-button class="login-button" @click="resetForm('loginForm')">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      isLoginning: false,
      loginForm: {
        userAccount: 'admin',
        userPassword: 'zhx@yyjk2019'
      },
      loginRules: {
        userAccount: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        userPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      },
      verifyCodeOpts: {
        identifyCode: '2345',
        contentWidth: 85
      }
    }
  },
  mounted () {
    // startAnimation('loginAni')
  },
  methods: {
    login (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isLoginning = true
          this.$store
            .dispatch('userLogin', { ...this.loginForm })
            .then(() => {
              this.$router.push('/homepage/home')
            })
            .catch((err) => {
              this.$message.error(err.message)
            })
            .finally(() => {
              this.isLoginning = false
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  components: {
  }
}
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-image: url('../../assets/images/lg-bg.png');
  background-size: 100% 90%;
  background-repeat: no-repeat;
  .img-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 600px;
    margin-left: -650px;
    margin-top: -330px;
    background-image: url('../../assets/images/lg-tb.png');
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }
  @keyframes bounce-up {
    25% {
      transform: translateY(30px);
    }
    50%, 100% {
      transform: translateY(0);
    }
    75% {
      transform: translateY(-30px);
    }
  }

  .animate-bounce-up{
    -webkit-animation: bounce-up 4s linear infinite;
    animation: bounce-up 4s linear infinite;
  }
  .login-wrapper {
    .title {
      font-size: 32px;
      color: #2385d0;
      position: absolute;
      left: 61%;
      top: 35%;
    }
    .login-block {
      position: absolute;
      display: flex;
      justify-content: center;
      left: 70%;
      top: 60%;
      width: 400px;
      height: 270px;
      padding: 50px 0 40px 0;
      margin: -150px 0 0 -150px;
      border-radius: 25px;
      box-sizing: border-box;
      .login-input {
        width: 360px;
        border: 1px solid #409EFF;
        border-radius: 6px;
      }

      .login-button {
        width: 175px;
      }

      .verify {
        display: flex;
        align-content: space-around;

        .verify-input {
          width: 85px;
        }

        .verify-code {
          width: 85px;
        }
      }
    }
  }
  .login-ani {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
<style lang="scss">
.login-block {
  .el-input--medium .el-input__inner {
    height: 46px;
    line-height: 46px;
    font-size: 16px;
    margin-left:30px;
    width: 300px;
    border: hidden;
  }
  .el-input__prefix {
    width: 30px;
    font-size: 20px;
    margin: 0 10px;
  }
  .el-icon-s-custom {
    width: 40px;
    height: 26px;
    margin-top: 10px;
    border-right: 1px solid #2385d0;
    margin-left: -10px;
  }
  .el-icon-s-custom::before {
    color: #2385d0;
    display: block;
    margin-top: -5px;
  }
  .el-icon-delete-solid {
    width: 40px;
    height: 26px;
    margin-top: 10px;
    border-right: 1px solid #2385d0;
    margin-left: -10px;
  }
  .el-icon-delete-solid::before {
    color: #2385d0;
    display: block;
    margin-top: -5px;
  }
}
</style>
