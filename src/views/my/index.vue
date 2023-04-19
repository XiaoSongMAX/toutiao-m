<template>
  <div class="my-container">
    <!-- 用户界面 -->
    <div v-if="user"
         class="header user-info">
      <div class="base-info">
        <div class="left">
          <van-image class="avatar"
                     :src="userInfo.photo"
                     round
                     fit="cover" />
          <span class="name">{{userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button size="mini"
                      round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count}}</div>
          <div class="text">文本</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.follow_count}}</div>
          <div class="text">关注</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count}}</div>
          <div class="text">粉丝</div>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count}}</div>
          <div class="text">获赞</div>
        </div>
      </div>
    </div>
    <!-- 登录注册 -->
    <div v-else
         class="header not-login">
      <div class="login-btn"
           @click="$router.push('./login')">
        <img class="mobile"
             src="@/assets/mobile.png"
             alt="" />
        <span class="text">登录 / 注册</span>
      </div>
    </div>
    <!-- 宫格图 -->
    <van-grid :column-num="2"
              class="grid-nav"
              clickable>
      <van-grid-item class="grid-item">
        <i slot="icon"
           class="toutiao toutiao-shoucang"></i>
        <span slot="text"
              class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon"
           class="toutiao toutiao-lishi"></i>
        <span slot="text"
              class="text">历史</span>
      </van-grid-item>
      <!-- 宫格导航 消息通知 小智同学 推出登录 -->
      <van-cell title="消息通知"
                is-link />
      <van-cell title="小智同学"
                is-link />
      <van-cell v-if="user"
                title="推出登录"
                clickable
                class="layout-cell"
                @click="onLogout" />
    </van-grid>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'

export default {
  name: 'MyIndex',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    // 如果用户登录了, 则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  methods: {
    onLogout () {
      console.log('onLogout')
      // 退出提示
      this.$dialog.confirm({
        title: '确认退出吗'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        console.log(data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败,请稍后重试')
      }
    }
  }
}
</script>
<style lang="less" scoped>
.my-container {
  .header {
    height: 361px;
    background: url('@/assets/banner.png');
    background-size: cover;
  }
  // 登录
  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  // 用户界面
  .user-info {
    .base-info {
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        display: flex;
        align-items: center;
        .avatar {
          width: 132px;
          height: 132px;
          margin-right: 23px;
          border: 4px solid #fff;
        }
        .name {
          font-size: 30px;
          color: #fff;
          margin-right: 23px;
        }
      }
    }
    .data-stats {
      display: flex;
      .data-item {
        height: 130px;
        flex: 1;
        display: flex;
        flex-direction: column;
        // 水平
        justify-content: center;
        // 垂直
        align-items: center;
        .count {
          font-size: 36px;
          color: #fff;
        }
        .text {
          font-size: 23px;
          color: #fff;
        }
      }
    }
  }
  // 宫格图

  .grid-nav {
    .grid-item {
      height: 141px;
      i.toutiao {
        font-size: 45px;
      }
      .toutiao-shoucang {
        color: #eb5253;
      }
      .toutiao-lishi {
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
      }
    }
  }
  .layout-cell {
    text-align: center;
    color: #eb5253;
    font-size: 32px;
    margin-top: 9px;
  }
}
</style>
