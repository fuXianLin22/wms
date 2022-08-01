import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/dashboard',
    redirect: '/dashboard/home',
    component: () => import('@/views/Dashboard'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('@/views/Home')
      },
      // 信息
      {
        path: 'manageLib',
        name: 'manageLib',
        component: () => import('@/views/libInfo/ManageLib.vue')
      },
      {
        path: 'LibArea',
        name: 'LibArea',
        component: () => import('@/views/libInfo/LibArea.vue')
      },
      {
        path: 'LibWei',
        name: 'LibWei',
        component: () => import('@/views/libInfo/LibWei.vue')
      },
      {
        path: 'LibView',
        name: 'LibView',
        component: () => import('@/views/libInfo/LibView.vue')
      },
      {
        path: 'LibGoods',
        name: 'LibGoods',
        component: () => import('@/views/libInfo/LibGoods.vue')
      },
      {
        path: 'LibGoodType',
        name: 'LibGoodType',
        component: () => import('@/views/libInfo/LibGoodType.vue')
      },
      {
        path: 'AddAndEditLib',
        name: 'AddAndEditLib',
        component: () => import('@/views/addAndEditLib')
      },
      // 商务
      {
        path: 'huozhu',
        name: 'huozhu',
        component: () => import('@/views/shangWu/huozhu.vue')
      },
      {
        path: 'chengYunShang',
        name: 'chengYunShang',
        component: () => import('@/views/shangWu/chengYunShang.vue')
      },
      // 库内
      {
        path: 'PanDian',
        name: 'PanDian',
        component: () => import('@/views/kuNei/PanDian.vue')
      },
      {
        path: 'PanDianRenWu',
        name: 'PanDianRenWu',
        component: () => import('@/views/kuNei/PanDianRenWu.vue')
      },
      {
        path: 'KuCunSunYi',
        name: 'KuCunSunYi',
        component: () => import('@/views/kuNei/KuCunSunYi.vue')
      },
      {
        path: 'ShiShiCuCun',
        name: 'ShiShiCuCun',
        component: () => import('@/views/kuNei/ShiShiCuCun.vue')
      },
      // 入库
      {
        path: 'RuKuDan',
        name: 'RuKuDan',
        component: () => import('@/views/inLib/RuKuDan.vue')
      },
      {
        path: 'ShouHuoRenWu',
        name: 'ShouHuoRenWu',
        component: () => import('@/views/inLib/ShouHuoRenWu.vue')
      },
      {
        path: 'ShangJia',
        name: 'ShangJia',
        component: () => import('@/views/inLib/ShangJia.vue')
      },
      // 出库
      {
        path: 'CuKu',
        name: 'CuKu',
        component: () => import('@/views/outLib/CuKu.vue')
      },
      {
        path: 'JiaHuoRenWu',
        name: 'JiaHuoRenWu',
        component: () => import('@/views/outLib/JiaHuoRenWu.vue')
      },
      {
        path: 'JiaoJie',
        name: 'JiaoJie',
        component: () => import('@/views/outLib/JiaoJie.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
