import { getSumList, getStockUseStatus, getAreaUseStatus } from '@/api'
export default {
  namespaced: true,
  state: {
    ChartOption: {
      color: ['#ff7100', '#ffb200'],
      title: {
        text: '入库/出库信息'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        bottom: '0',
        data: ['入库', '出库']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '5%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['周二', '周三', '周四', '周五', '周六', '周日']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '入库',
          type: 'bar',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: '出库',
          type: 'bar',
          data: [862, 1018, 964, 1026, 1679, 1600, 1570]
        }
      ]
    },
    PaiChartOption: {
      color: ['#e4dbda', '#ffaa00'],
      tooltip: {
        trigger: 'item'
      },
      series: [
        {
          type: 'pie',
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },
          startAngle: 50, // 起始角度（0-360）,
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold',
              color: ['#e4dbda', '#ffaa00']
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' }
          ]
        }
      ]
    },
    allPaiChartOption: {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 'center',
        bottom: 'center'
      },
      series: [
        {
          label: {
            normal: {
              show: false
            }
          },
          type: 'pie',
          radius: '80%',
          center: ['20%', '50%'],
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Union Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 20,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  },
  getters: {},
  mutations: {
    // 修改ChartOption中的数据
    CHANGE_CHART_BAR(state, val) {
      state.ChartOption.xAxis[0].data = val.x
      state.ChartOption.legend.data = [val.data[0].name, val.data[1].name]
      state.ChartOption.series[0].data = val.data[0].data
      state.ChartOption.series[1].data = val.data[1].data
    },
    // 修改ChartOption中的数据
    CHANGE_CHART_PAI01(state, val) {
      // console.log(state.PaiChartOption.series[0].data)
      state.PaiChartOption.series[0].data = val
    }
  },
  actions: {
    // 获取SumList数据
    async getSumList({ commit }, type) {
      // 判断请求的是周数据还是月数据或者年数据
      if (type === 'w') {
        const res = await getSumList({ dimension: type })
        commit('CHANGE_CHART_BAR', res.data.data)
      }
      if (type === 'e') {
        const res = await getSumList({ dimension: type })
        console.log(res.data.data)
        commit('CHANGE_CHART_BAR', res.data.data)
      }
      if (type === 'c') {
        const res = await getSumList({ dimension: type })
        console.log(res.data.data)
        commit('CHANGE_CHART_BAR', res.data.data)
      }
    },
    // 获取stockUseStatus数据
    async getStockUseStatus({ commit }) {
      const res = await getStockUseStatus()
      // console.log(res.data.data)
      commit('CHANGE_CHART_PAI01', res.data.data)
    },
    // 获取areaUseStatus数据
    async getAreaUseStatus({ commit }) {
      await getAreaUseStatus()
      // console.log(res)
    }
  }
}
