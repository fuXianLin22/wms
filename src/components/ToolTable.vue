<template>
  <div class="IndexTab">
    <el-table
      border
      :data="arr"
      size="mini"
      style="width: 100%"
      :row-class-name="singleDoubleStyle"
      cell-class-name="cellStyle"
      header-cell-class-name="headerCellClass"
    >
      <el-table-column v-if="$slots.star">
        <slot name="star"></slot>
      </el-table-column>
      <el-table-column
        :type="item.value === 'index' ? 'index' : ''"
        :prop="item.value"
        :label="item.type"
        :formatter="formatterFunction[item?.formatter]"
        :width="item.width === 1 ? '200' : '150'"
        v-for="(item, index) in loopArr"
        :key="index"
      >
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <template v-if="scope.row">
            <slot name="right" :params="scope.row"></slot>
          </template>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'ToolTable',
  props: {
    arr: {
      type: Array,
      required: true
    },
    loopArr: {
      type: Array,
      required: true
    },
    formatterFunction: {
      type: Object
    }
  },
  methods: {
    singleDoubleStyle({ row, rowIndex }) {
      if (rowIndex % 2 !== 0) {
        return 'normalColor'
      }
      return 'highlight'
    }
  }
}
</script>

<style lang="less">
.IndexTab {
  .el-table tbody tr:hover > td {
    background-color: #fff6e2 !important;
  }
  // 解决了column 添加了fixed 背景颜色不一致的问题  nb是真nb
  .el-table__body .el-table__row.hover-row td {
    background-color: #fff6e2 !important;
  }
  // 动态添加的
  .el-table .normalColor {
    background-color: #fdfcf9 !important;
  }
  .cellStyle {
    text-align: center;
  }
  .headerCellClass {
    text-align: center;
    background-color: #f9f6ee !important;
  }
}
</style>
