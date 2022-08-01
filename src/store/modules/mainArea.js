import { getHeaderList, getcurIndex } from '@/utils/storage.js'
export default {
  namespaced: true,
  state: {
    asideList: [
      {
        title: '基础信息管理',
        icon: 'icon-duohangwenben',
        children: [
          { title: '仓库管理', name: 'manageLib' },
          { title: '库区管理', name: 'LibArea' },
          { title: '库位管理', name: 'LibWei' },
          { title: '库位视图', name: 'LibView' },
          { title: '货品管理', name: 'LibGoods' },
          { title: '货品类型管理', name: 'LibGoodType' }
        ]
      },
      {
        title: '商务管理',
        icon: 'icon-gongwenbao',
        children: [
          { title: '货主管理', name: 'huozhu' },
          { title: '承运商管理', name: 'chengYunShang' }
        ]
      },
      {
        title: '库内管理',
        icon: 'icon-icon_wendang-xian',
        children: [
          { title: '盘点单', name: 'PanDian' },
          { title: '盘点任务', name: 'PanDianRenWu' },
          { title: '库存损益', name: 'KuCunSunYi' },
          { title: '实时库存', name: 'ShiShiCuCun' }
        ]
      },
      {
        title: '入库管理',
        icon: 'icon-cangpeitubiao_huanhuorukutuihuoruku',
        children: [
          { title: '入库单', name: 'RuKuDan' },
          { title: '收货任务', name: 'ShouHuoRenWu' },
          { title: '上架任务', name: 'ShangJia' }
        ]
      },
      {
        title: '出库管理',
        icon: 'icon-cangpeitubiao_chukuhuanhuochuku-copy',
        children: [
          { title: '出库单', name: 'CuKu' },
          { title: '拣货任务', name: 'JiaHuoRenWu' },
          { title: '交接任务', name: 'JiaoJie' }
        ]
      }
    ],
    headerList: getHeaderList() || [{ title: '工作台', name: 'home' }],
    curIndex: +getcurIndex() || 0
  },
  getters: {},
  mutations: {
    // 添加header面包屑item
    ADD_HEADERLIST(state, val) {
      state.headerList.push(val)
      state.curIndex = state.headerList.length - 1
    },
    // 修改curIndex
    CHANGE_CURINDEX(state, val) {
      state.curIndex = val
    },
    // 删除headerItem
    DEL_HEADERITEM(state, val) {
      state.headerList.splice(val, 1)
    },
    // 删除除第一个和当前一个的其他所有或者出第一个外所有
    DEL_OTHER(state, val) {
      // 判断是删除其他还是全部
      if (!val) {
        // 删除其他
        state.headerList = state.headerList.filter(
          (item, index) => index === 0 || index === state.curIndex
        )
      } else {
        // 删除除第一个外所有
        state.headerList = state.headerList.splice(0, 1)
      }
      // 重新设置高亮
      if (state.headerList.length === 1) {
        state.curIndex = 0
      } else {
        state.curIndex = 1
      }
    }
  },
  actions: {
    // 判断之前是否存在、如果存在就修改curIndex
    changeList_curIndex({ commit, state }, val) {
      // 判断是否已经存在
      const flag = state.headerList.some((item) => item.title === val.title)
      if (flag) {
        // 存在就commit将curIndex修改
        state.headerList.forEach((item, index) => {
          if (item.title === val.title) {
            commit('CHANGE_CURINDEX', index)
          }
        })
      } else {
        // 不存在就commit添加
        commit('ADD_HEADERLIST', val)
      }
    },
    // 判断删除的index，调整curIndex
    delHeader_changeCurIndex({ commit, state }, index) {
      // 如果删除的是当前高亮的前面的curIndex就减1
      if (state.curIndex >= index) {
        commit('CHANGE_CURINDEX', state.curIndex - 1)
      }
      // 不管删除的是否在高亮前面都要进行删除操作
      commit('DEL_HEADERITEM', index)
    },
    // 判断头部右侧删除的是哪一种，index是多少
    delType({ commit, state }, val) {
      // 判断val是什么在进行删除操作
      if (val === '左侧') {
        // val是左侧，说明删除的是index为1的(第0项不能删)
        commit('DEL_HEADERITEM', 1)
        // 判断删除的是否是高亮
        if (state.curIndex !== 1) {
          // 删除完之后改变curIndex的值
          commit('CHANGE_CURINDEX', state.curIndex - 1)
        }
      }
      if (val === '右侧') {
        // val是右侧，说明删除的是index为最后一个length-1(第0项不能删)
        // console.log(state.headerList.length - 1)
        commit('DEL_HEADERITEM', state.headerList.length - 1)
        // console.log(state.headerList.length - 1)

        if (state.curIndex === state.headerList.length) {
          // 删除完之后改变curIndex的值
          commit('CHANGE_CURINDEX', state.headerList.length - 1)
        }
      }
      if (val === '其他') {
        // val是其他，说明删除的是除第0项和当前高亮项(第0项不能删)
        commit('DEL_OTHER')
      }
      if (val === '全部') {
        // val是全部，说明删除的是除第0项外所有(第0项不能删)
        commit('DEL_OTHER', '0')
      }
    }
  }
}
