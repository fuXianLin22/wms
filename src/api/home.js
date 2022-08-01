import request from '@/utils/request'
/**
 * 获取SumList数据
 */
export const getSumList = (params) => {
  return request({
    url: 'ips/home/sumList',
    params
  })
}
/**
 * 获取stockUseStatus数据
 */
export const getStockUseStatus = () => {
  return request({
    url: 'ips/home/stockUseStatus'
  })
}
/**
 * 获取areaUseStatus数据
 */
export const getAreaUseStatus = () => {
  return request({
    url: 'ips/home/areaUseStatus'
  })
}
