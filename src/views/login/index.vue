<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar"
                 title="登录">
      <van-icon slot="left"
                name="cross"
                @click="$router.back()" />
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form ref="loginForm"
              @submit="onSubmit">
      <van-field name="mobile"
                 v-model="user.mobile"
                 placeholder="请输入手机号"
                 :rules="userFormRules.mobile"
                 type="number"
                 maxlength="11">
        <i slot="left-icon"
           class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field v-model="user.code"
                 name="code"
                 placeholder="请输入验证码"
                 :rules="userFormRules.code"
                 type="number"
                 maxlength="6">
        <i slot="left-icon"
           class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <!-- 倒计时时间 -->
          <van-count-down v-if="isCountDownShow"
                          :time="1000 * 60"
                          format="ss s"
                          @finish="isCountDownShow = false" />
          <van-button v-else
                      class="send-sms-btn"
                      native-type="button"
                      round
                      size="small"
                      type="default"
                      @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn"
                    block
                    type="info"
                    native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写用户名'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit () {
      // 获取表单数据
      const user = this.user
      // 表单验证
      // 在组件中必须用 this.$toast 来调用 Toast组件
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true, // 禁用点击
        duration: 2000 // 持续时间
      })
      // 提交表单请求登录
      try {
        const { data } = await login(user)
        this.$store.commit('setUser', data.data)

        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试', err)
        }
      }
      // 根据请求响应结果 处理后续操
    },
    async onSendSms () {
      // 1.验证手机号格式
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过,显示倒计时
      this.isCountDownShow = true
      // 3.请求发送验证{}
      try {
        const res = await sendSms(this.user.mobile)
        console.log('发送成功', res)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了,请稍后重试')
        } else {
          this.$toast('发送失败,请稍后重试')
          console.log('发送失败', err)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    background-color: #ededed;
    width: 152px;
    height: 46px;
    line-height: 46px;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
