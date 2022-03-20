<template>
  <div id="userLayout" class="user-layout-wrapper">
    <div class="container">
      <div class="my-container">
        <div class="top">
          <div class="header">
            <a href="/">
              <!-- <img src="~@/assets/logo.png" class="logo" alt="logo" /> -->
              <span class="title">I Things 物联</span>
            </a>
          </div>
        </div>
        <div class="main">
          <el-form
              :model="loginFormData"
              :rules="rules"
              ref="loginForm"
              @keyup.enter.native="submitForm"
          >
            <el-form-item prop="username">
              <el-input
                  placeholder="请输入用户名"
                  v-model="loginFormData.username"
              >
                <i
                    class="el-input__icon el-icon-user"
                    slot="suffix"
                ></i></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  :type="lock === 'lock' ? 'password' : 'text'"
                  placeholder="请输入密码"
                  v-model="loginFormData.password"
              >
                <i
                    :class="'el-input__icon el-icon-' + lock"
                    @click="changeLock"
                    slot="suffix"
                ></i>
              </el-input>
            </el-form-item>
            <el-form-item style="position:relative">
              <el-input
                  v-model="loginFormData.captcha"
                  name="logVerify"
                  placeholder="请输入验证码"
                  style="width:60%"
              />
              <div class="vPic">
                <img
                    v-if="picPath"
                    :src="picPath"
                    alt="请输入验证码"
                    @click="loginVerify()"
                >
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm" style="width:100%"
              >登 录
              </el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
}
</script>

<script setup>
import { useStore } from 'vuex'
import { captcha } from '@/api/user'
import { checkDB } from '@/api/initdb'
// import bootomInfo from '@/view/layout/bottomInfo/bottomInfo.vue'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const store = useStore()

// 验证函数
const checkUsername = (rule, value, callback) => {
  if (value.length < 5) {
    return callback(new Error('请输入正确的用户名'))
  } else {
    callback()
  }
}
const checkPassword = (rule, value, callback) => {
  if (value.length < 6) {
    return callback(new Error('请输入正确的密码'))
  } else {
    callback()
  }
}

// 获取验证码
const loginVerify = () => {
  captcha({}).then((ele) => {
    rules.captcha[1].max = ele.data.captchaLength
    rules.captcha[1].min = ele.data.captchaLength
    picPath.value = ele.data.picPath
    loginFormData.captchaId = ele.data.captchaId
  })
}
loginVerify()

// 登录相关操作
const lock = ref('lock')
const changeLock = () => {
  lock.value = lock.value === 'lock' ? 'unlock' : 'lock'
}

const loginForm = ref(null)
const picPath = ref('')
const loginFormData = reactive({
  username: 'admin',
  password: '123456',
  captcha: '',
  captchaId: '',
})
const rules = reactive({
  username: [{ validator: checkUsername, trigger: 'blur' }],
  password: [{ validator: checkPassword, trigger: 'blur' }],
  captcha: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    {
      message: '验证码格式不正确',
      trigger: 'blur',
    },
  ],
})
const login = async() => {
  return await store.dispatch('user/LoginIn', loginFormData)
}
const submitForm = () => {
  loginForm.value.validate(async(v) => {
    if (v) {
      const flag = await login()
      if (!flag) {
        loginVerify()
      }
    } else {
      ElMessage({
        type: 'error',
        message: '请正确填写登录信息',
        showClose: true,
      })
      loginVerify()
      return false
    }
  })
}

// 跳转初始化
const checkInit = async() => {
  const res = await checkDB()
  if (res.code === 0) {
    if (res.data?.needInit) {
      store.commit('user/NeedInit')
      router.push({ name: 'Init' })
    } else {
      ElMessage({
        type: 'info',
        message: '已配置数据库信息，无法初始化',
      })
    }
  }
}

</script>

<style lang="scss" scoped>
.login-register-box {
  height: 100vh;

  .login-box {
    width: 40vw;
    position: absolute;
    left: 50%;
    margin-left: -22vw;
    top: 5vh;

    .logo {
      height: 35vh;
      width: 35vh;
    }
  }
}

.link-icon {
  width: 20px;
  min-width: 20px;
  height: 20px;
  border-radius: 10px;
}

.vPic {
  width: 33%;
  height: 38px;
  float: right !important;
  background: #ccc;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
  }
}

.logo_login {
  width: 100px;
}

#userLayout.user-layout-wrapper {
  height: 100%;
  position: relative;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    position: relative;
    overflow: auto;
    width: 100%;
    min-height: 100%;
    background: #f0f2f5 url("@/assets/loginBackground.png") no-repeat 50%;
    //background-size: 100%;
    background-size: cover;
    padding: 110px 0 144px;

    a {
      text-decoration: none;
    }
    .my-container {
      position: relative;
      top: 0; bottom: 0;
      left: 0; right: 0;
      width: 500px;
      height: 350px;
      line-height: 2;
      margin: auto;
      border-radius: 5px;
      background: rgba(134, 216, 238, 0.3);
      box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .3);
      .top {
        text-align: center;
        margin-top: -40px;

        .header {
          height: 44px;
          line-height: 44px;
          margin-bottom: 30px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(245, 236, 236, 0.85);
            font-family: Avenir, "Helvetica Neue", Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }
    }

    .footer {
      position: relative;
      width: 100%;
      padding: 0 20px;
      margin: 40px 0 10px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        width: 330px;
        display: inline-flex;
        flex-direction: row;
        justify-content: space-between;
        padding-right: 40px;

        a {
          color: rgba(0, 0, 0, 0.45);
          transition: all 0.3s;
        }
      }

      .copyright {
        color: rgba(0, 0, 0, 0.45);
        font-size: 14px;
        padding-right: 40px;
      }
    }
  }
}
</style>
