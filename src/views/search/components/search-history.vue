<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('update-search-histories',[])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else
                name="delete"
                @click="isDeleteShow=true"></van-icon>
    </van-cell>
    <van-cell :title="item"
              v-for="(item,index) in searchHistory"
              :key="index"
              @click="onSearchItemClick(item,index)">
      <van-icon v-if="isDeleteShow"
                name="close" />
    </van-cell>

  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    /*
        prop 数据
        如果是普通数据 (数字, 字符串,布尔值)绝对不能修改
        即便改了也不会传导给父组件

        如果是引用类型数据 (数组,对象)
          可以修改,例如 [].push
          不能重新赋值
       */
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDeleteShow: false // 控制删除的显示和隐藏

    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    onSearchItemClick (item, index) {
      if (this.isDeleteShow) {
        // 删除状态,删除历史记录数据
        // eslint-disable-next-line vue/no-mutating-props
        this.searchHistory.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }

  }
}
</script>

<style scoped lang="less"></style>
