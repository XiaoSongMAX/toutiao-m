import request from '@/utils/request'
/*
请求获取文章列表数据
 */
//
export const getSearch = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
/*
用户搜索请求结果
 */
//
export const getSearchResult = (params) => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
