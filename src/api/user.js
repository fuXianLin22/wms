import request from '@/utils/request'
/**
 * 登录
 */
export const getTodo = () => {
  return request({
    url: 'ips/home/todo'
  })
}
