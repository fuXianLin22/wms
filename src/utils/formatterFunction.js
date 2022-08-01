import Enumerate from '@/api/constant/Lib.js'

export default {
  1(row, column, cellValue) {
    let currentData = '未知'
    // 判断是仓库的状态还是类型
    if (isNaN(cellValue)) {
      currentData = Enumerate.LibType.find(
        (item) => item.type === cellValue
      )?.value
    } else {
      currentData = Enumerate.LibStatus.find(
        (item) => item.status === cellValue
      )?.value
    }
    return currentData
  },
  2(row, column, cellValue) {
    return (
      Enumerate.temperatureType.find((item) => item.type === cellValue)
        ?.value || '未知'
    )
  },
  3(row, column, cellValue) {
    return (
      Enumerate.bearingType.find((item) => item.type === cellValue)?.value ||
      '未知'
    )
  },
  4(row, column, cellValue) {
    return (
      Enumerate.useType.find((item) => item.type === cellValue)?.value || '未知'
    )
  }
}
