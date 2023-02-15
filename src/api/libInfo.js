import request from '@/utils/request'

/**
 * 获取仓库管理页的PageList
 */
export const getPageList = (params) => {
  return request({
    url: 'api/warehouse/page',
    params
  })
}
/**
 * 获取仓库管理页的PageList
 */
export const changeLibStatus = (data) => {
  return request({
    method: 'PUT',
    url: 'api/warehouse',
    data
  })
}
/**
 * 获取仓库管理的编码
 */
export const getLibCode = () => {
  return request({
    method: 'GET',
    url: 'api/codeFactory/next/CK'
  })
}
/**
 * 新增仓库
 */
export const createNewLib = (data) => {
  return request({
    method: 'POST',
    url: 'api/warehouse',
    data
  })
}
/**
 * 编辑仓库
 */
export const editLib = (id) => {
  return request({
    method: 'GET',
    url: `api/warehouse/${id}`
  })
}
/**
 * 修改仓库
 */
export const changeLib = (data) => {
  return request({
    method: 'PUT',
    url: 'api/warehouse',
    data
  })
}
/**
 * 查询库区
 */
export const getLibArea = (params) => {
  return request({
    method: 'GET',
    url: 'api/area/pageDetail',
    params
  })
}
/**
 * 库区启停
 */
export const changeLibAreaStatus = (data) => {
  return request({
    method: 'PUT',
    url: 'api/area',
    data
  })
}
