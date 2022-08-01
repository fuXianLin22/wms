<template>
  <div class="area">
    <!-- 头部部分 -->
    <ToolInput
      @searchInfo="searchInfo"
      :inputName="inputName"
      @resetPage="getPageList"
    >
    </ToolInput>
    <div class="content">
      <el-button round @click="addLibArea">新增库区</el-button>
      <!-- 图表 -->
      <ToolTable
        :arr="arr"
        :loopArr="loopArr"
        :formatterFunction="formatterFunction"
      >
        <!-- <template slot="star"> 1234567 </template> -->
        <template slot="right" slot-scope="row">
          <div class="fixed_box">
            <el-button class="btn" size="mini" @click="edit(row)">
              编辑
            </el-button>
            <el-button class="btn" size="mini" @click="changeStatus(row)">
              {{ row.params.status === 0 ? "启用" : "停用" }}
            </el-button>
            <el-button class="btn" size="mini"> 删除</el-button>
          </div>
        </template>
      </ToolTable>
    </div>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="padding: 20px 0">
      <el-pagination
        layout="total, sizes, prev, pager, next, jumper"
        :total="+total"
        :page-sizes="[2, 4, 6, 8, 10]"
        @size-change="changeSize"
        @current-change="changeCurrentPage"
      >
      </el-pagination>
    </el-row>
    <!-- 弹出层 -->
    <el-dialog
      :title="`确认${currentRowInfo.status === 0 ? '启用' : '停用'}`"
      :visible.sync="isShowDia"
      width="30%"
    >
      <span>
        确定要{{ currentRowInfo.status === 0 ? "启用" : "停用" }}:
        {{ currentRowInfo.name }} 吗?
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button round type="info" @click="isShowDia = false">
          取 消
        </el-button>
        <el-button
          round
          type="warning"
          @click="seepChangeRequest(currentRowInfo)"
        >
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Enumerate from '@/api/constant/Lib'
import { changeLibAreaStatus, getLibArea } from '@/api'
import formatterFunction from '@/utils/formatterFunction'

export default {
  name: 'LibArea',
  data() {
    return {
      total: '',
      currentRowInfo: '',
      isShowDia: false,
      formatterFunction,
      arr: [],
      info: {
        status: '',
        id: '',
        name: '',
        warehouseName: '',
        size: 10,
        current: 1
      },
      inputName: ['仓库名称', '库区名称', '仓库状态'],
      loopArr: Enumerate.KuQuName
    }
  },
  created() {
    this.getPageList()
  },
  methods: {
    // 获取info
    async searchInfo(val) {
      // console.log(val)
      this.info.warehouseName = val.like_code
      this.info.name = val.like_name
      this.info.status = val.status
      const res = await getLibArea(this.info)
      console.log(res)
      this.arr = res.data.data.records
    },
    // 获取表格数据
    async getPageList() {
      const res = await getLibArea()
      // console.log(res.data.data.records)
      this.arr = res.data.data.records
      this.total = res.data.data.total
    },
    // 点击修改仓库状态按钮
    changeStatus({ params }) {
      // console.log(params)
      this.isShowDia = true
      this.currentRowInfo = params
    },
    // 点击弹层确认按钮发送更改请求
    async seepChangeRequest(row) {
      // console.log(row)
      try {
        // 判断status是什么状态
        if (row.status === 0) {
          // 去启用
          await changeLibAreaStatus({ id: row.id, status: 1 })
        } else {
          // 去停用
          await changeLibAreaStatus({ id: row.id, status: 0 })
        }
        // 重新请求所有分页数据并渲染
        await this.getPageList()
        this.$message.success('状态修改成功')
        // 关闭弹层
        this.isShowDia = false
      } catch (e) {
        console.log(e)
        this.isShowDia = false
      }
    },
    edit() {
    },
    //  新增库区
    addLibArea() {
    },
    changeSize(number) {
      this.info.size = number
      // 重新获取数据渲染
      this.getPageList()
    },
    changeCurrentPage(page) {
      // 修改当前页码
      this.info.current = page
      // 重新获取数据渲染
      this.getPageList()
    }
  }
}
</script>

<style scoped lang="less">
.area {
  .content {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);

    .el-button {
      margin-left: 30px;
      margin-top: 20px;
      margin-bottom: 20px;
      background-color: #00be76;
      color: #fff;

      &:hover {
        background-color: #007a4c;
      }
    }
  }

  /deep/ .fixed_box {
    display: flex;
    justify-content: space-around;

    .btn {
      margin: 0;
      padding: 0;
      border: unset;
      color: #ffb200;
      background-color: #fff;

      &:hover {
        color: #ff8e00;
        background-color: #fff6e2;
      }
    }
  }
}
</style>
