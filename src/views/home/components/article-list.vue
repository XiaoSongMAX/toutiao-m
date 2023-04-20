<template>
  <div class="article-list">
    <van-pull-refresh v-model="isreFreshLoading"
                      @refresh="onRefresh"
                      :success-text="refreshSuccessText"
                      success-duration="1500">
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                :error.sync="error"
                error-text="请求失败，点击重新加载"
                @load="onLoad">
        <!-- <van-cell v-for="(article, index) in list"
                  :key="index"
                  :title="article.title" /> -->

        <article-item v-for="(article, index) in list"
                      :article="article"
                      :key="index" />
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem

  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 存储列表数据的数组
      loading: false, // 控制加载中 loading 状态
      finished: false, // 控制数据加载结束的状态
      timestamp: null,
      error: false,
      isreFreshLoading: true,
      refreshSuccessText: '刷新成功'
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        const { results } = data.data
        this.list.push(...results)
        // 本次 数据加载结束后吧状态设置为结束
        this.loading = false
        // 判断数据是否全部加载完成
        if (results.length) {
          // 更新获取下一页的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        console.log('请求失败', err)
      }
    },
    // 当下来 刷新时 触发 该函数
    async onRefresh () {
      // 请求获取数据
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })
        // 将数据追加到列表的顶部
        const { results } = data.data
        this.list.unshift(...results)
        //  关闭下来 loading 状态
        this.isreFreshLoading = false
        // 刷新成功时 成功提示文本
        this.refreshSuccessText = `刷新成功,更新了${results.length}数据`
      } catch (err) {
        console.log('请求失败', err)
        this.refreshSuccessText = '刷新失败'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 为 每个 显示的 文章列表 相互不影响
// 让每个列表 有自己的列表
.article-list {
  height: 83vh;
  overflow-y: auto;
}
</style>
