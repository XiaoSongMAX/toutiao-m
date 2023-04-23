<template>
  <div class="search-container">

    <form action="/"
          class="search-form">
      <van-search v-model="searchText"
                  show-action
                  placeholder="请输入搜索关键词"
                  background="#3296fa"
                  @search="onSearch"
                  @cancel="onCancel"
                  @focus="isResultShow=false" />
    </form>

    <!-- 历史记录 -->
    <search-result v-if="isResultShow"
                   :search-text="searchText"></search-result>
    <!-- /历史记录 -->
    <!-- 联想建议 -->
    <search-suggest v-else-if="searchText"
                    :search-text="searchText"
                    @search="onSearch"></search-suggest>
    <!-- /联想建议 -->
    <!-- 搜索历史 -->
    <search-history v-else
                    :search-history="searchHistory"
                    @update-search-histories="searchHistory=[]"
                    @search="onSearch"></search-history>
    <!-- /搜索历史 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
// 分别注册下来

import SearchResult from './components/search-result.vue'

import SearchSuggest from './components/search-suggest.vue'

import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: { SearchHistory, SearchSuggest, SearchResult },
  props: {

  },
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('TOUTIAO_SEARCH_HISTORY') || []
    }
  },
  computed: {},
  watch: {
    searchHistory (value) {
      setItem('TOUTIAO_SEARCH_HISTORY', value)
    }
  },
  created () { },
  mounted () { },
  methods: {
    onSearch (val) {
      // 更新文本框内容
      this.searchText = val
      // 存储搜索历史记录
      const index = this.searchHistory.indexOf(val)
      if (index !== -1) {
        this.searchHistory.splice(index, 1)
      }
      this.searchHistory.unshift(val)

      // this.searchHistory.push(val)

      // 显示搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}

</script>

<style scoped lang="less">
.search-container {
  padding-top: 108px;

  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
