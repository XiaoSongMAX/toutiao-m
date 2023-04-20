<template>
  <div class="channel-edit">
    <van-cell :border="false">
      <div slot="title"
           class="title-text">我的频道</div>
      <van-button class="edit-btn"
                  type="danger"
                  round
                  plain
                  size="mini"
                  @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <!-- 宫格 -->
    <van-grid class="my-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(chanel, index) in myChannels"
                     :key="index"
                     :text="chanel.name"
                     @click="onMyChannelClick(chanel, index)">
        <!--  自定义插槽 来控制 -->
        <van-icon v-show="isEdit && !fiexChannels.includes(chanel.id)"
                  slot="icon"
                  name="clear"></van-icon>
        <span class="text"
              :class="{ active: index === active }"
              slot="text">{{
          chanel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- /宫格 -->
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title"
           class="title-text">频道推荐</div>
    </van-cell>
    <!-- 宫格 -->
    <van-grid class="recommend-grid"
              :gutter="10">
      <van-grid-item class="grid-item"
                     v-for="(channel, index) in recommendChannels"
                     icon="plus"
                     :key="index"
                     :text="channel.name"
                     @click="onAddChannel(channel)" />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  components: {},
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }

  },
  data () {
    return {
      allChannels: [],
      isEdit: false, // 控制编辑状态显示
      fiexChannels: [0] // 固定频道,不允许删除
    }
  },
  computed: {
    ...mapState(['user']),

    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }

  },
  watch: {},
  created () {
    this.loadAllChannels()
  },
  mounted () { },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    onAddChannel (channel) {
      // eslint-disable-next-line vue/no-mutating-props
      this.myChannels.push(channel)
      // 数据持久化处理
      // 未登录,把 数据存储到本地
      // 已登录,把数据请求接口放到线上
      if (this.user) {
        console.log()
      } else {
        // 未登录 ,把数据存储到本地
        setItem('TOUTIAO', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      // 编辑状态,则执行删除频道
      // 非编辑状态,执行切换频道
      if (this.isEdit) {
        if (this.fiexChannels.includes(index)) { return }

        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }

        // 编辑转台 执行删除频道
        // 参数  要删除的元素 开始索引
        // eslint-disable-next-line vue/no-mutating-props
        this.myChannels.splice(index, 1)
      } else {
        this.$emit('update-active', index, false)
      }
    }
  }
}

</script>

<style scoped lang="less">
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      background-color: #f4f5f6;
      white-space: nowrap;

      .van-grid-item__text,
      .text {
        font-size: 28px;
        color: #222;
        margin-top: 0;
      }
      .active {
        color: red;
      }
      .van-grid-item__icon-wrapper {
        position: unset;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
  /deep/ .recommend-grid {
    .grid-item {
      .van-grid-item__content {
        white-space: nowrap;
        flex-direction: row;
        .van-icon-plus {
          font-size: 28px;
          margin-right: 6px;
        }
      }
    }
  }
}
</style>
