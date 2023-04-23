<template>
  <div class="search-suggest">
    <van-cell :title="text"
              icon="search"
              v-for="(text, index) in suggestions"
              :key="index"
              @click="$emit('search',text)">
      <div slot="title"
           v-html="highlight(text)"></div>
    </van-cell>
    <!-- 双花括号绑定会直接输出文本内容 -->
  </div>
</template>

<script>
import { getSearch } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      suggestions: []

    }
  },
  computed: {},
  watch: {
    searchText: {
      // // 当 searchText 发生改变的时候就会调用
      // // 注意 handler 函数名称 是固定的
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 1000),

      immediate: true // 该回调将会 侦听开始 之后
    }
  },
  created () { },
  mounted () { },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearch(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败,请稍后重试')
      }
    },
    highlight (text) {
      const highlightStr = `<span class="active">${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      // 关键是把匹配的字符替换
      return text.replace(reg, highlightStr)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggest {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
