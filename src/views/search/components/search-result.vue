<template>
  <div class="search-result">
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              :error.sync="error"
              error-text="加载失败,请点击重试"
              @load="onLoad">
      <van-cell v-for="(article,index) in list"
                :key="index"
                :title="article.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false

    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText

        })
        const { results } = data.data
        this.list.push(...results)
        // 3.将本次加载中 的 loading 关闭
        this.loading = false
        // 判断 是否 还有数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
        console.log(data)
      } catch (err) {
        this.error = true
        this.loading = false
        this.$toast('数据获取失败,请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
