import Vue from 'vue'

import dayjs from 'dayjs'
// 加载中文语言保
import 'dayjs/locale/zh-cn' // ES 2015

import relativeTime from 'dayjs/plugin/relativeTime'

// dayjs 默认语言为 英文
dayjs.locale('zh-cn')
// 配置使用相对时间的插件

// dayjs().format('YYYY-MM-DD')
dayjs.extend(relativeTime)
/*
定义一个全局过滤器,然后就可以在任何模板中使用
其实过滤器就相当于一个全局可用的方法
参数一 过滤器名称
参数二 过滤器函数
使用方式 {{ 表达式 | 过滤器名称}}
吧过滤器的返回值渲染到使用过滤器模板位置
 */
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
