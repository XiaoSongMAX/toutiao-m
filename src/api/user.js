/*
      用户相关请求模块
*/
import request from '@/utils/request'

export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
//
export const sendSms = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/*
发送验证码
注意:每次手机号每分钟的次数
 */
//
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user'
    // headers: {
    //   // 连接请求值才能访问 请求拦截器
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
/*
发送验证码
注意:每次手机号每分钟的次数
 */
//
export const getUserChannels = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user/channels'
  })
}
