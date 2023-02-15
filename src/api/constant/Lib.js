// 仓库枚举
export default {
  // 仓库状态
  LibStatus: [
    {
      status: 0,
      value: '停用'
    },
    {
      status: 1,
      value: '启用'
    }
  ],
  // 仓库类型
  LibType: [
    {
      type: 'ZZ',
      value: '中转仓'
    },
    {
      type: 'CB',
      value: '储备仓'
    },
    {
      type: 'JG',
      value: '加工仓'
    }
  ],
  // 表格行与列映射表
  TableName: [
    {
      type: '序号',
      value: 'index'
    },
    {
      type: '仓库编码',
      value: 'code'
    },
    {
      type: '仓库名称',
      value: 'name'
    },
    {
      type: '仓库类型',
      value: 'type',
      formatter: 1
    },
    {
      type: '省/市/区',
      value: 'location',
      width: 1
    },
    {
      type: '详细地址',
      value: 'address'
    },
    {
      type: '仓库状态',
      value: 'status',
      formatter: 1
    },
    {
      type: '仓库面积㎡',
      value: 'surface'
    },
    {
      type: '库区数量',
      value: 'includedNum'
    },
    {
      type: '负责人',
      value: 'personName'
    },
    {
      type: '联系电话',
      value: 'phone'
    },
    {
      type: '更新时间',
      value: 'updateTime',
      width: 1
    }
  ],
  //  库区表格映射表
  KuQuName: [
    {
      type: '序号',
      value: 'index'
    },
    {
      type: '所属仓库',
      value: 'warehouseName'
    },
    {
      type: '库区编码',
      value: 'code'
    },
    {
      type: '库区名称',
      value: 'name'
    },
    {
      type: '温度类型',
      value: 'temperatureType',
      formatter: 2
    },
    {
      type: '承重类型',
      value: 'bearingType',
      formatter: 3
    },
    {
      type: '用途属性',
      value: 'useType',
      formatter: 4
    },
    {
      type: '库区状态',
      value: 'status',
      formatter: 1
    },
    {
      type: '负责人',
      value: 'personName'
    },
    {
      type: '联系电话',
      value: 'phone'
    },
    {
      type: '库位数量',
      value: 'includedNum'
    },
    {
      type: '更新时间',
      value: 'updateTime'
    }
  ],
  // 温度类型
  temperatureType: [
    { type: 'CW', value: '常温' },
    { type: 'HW', value: '恒温' }
  ],
  // 承重类型
  bearingType: [
    {
      type: 'QX',
      value: '轻型'
    },
    {
      type: 'BX',
      value: '中型'
    },
    {
      type: 'ZX',
      value: '重型'
    }
  ],
  //  用途属性
  useType: [
    { type: 'RKHCQ', value: '入库缓存区' },
    { type: 'CCQ', value: '存储区' },
    { type: 'ZJQ', value: '质检区' },
    { type: 'CKHCQ', value: '出库缓存区' }
  ]
}
