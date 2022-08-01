<template>
  <div class="manage">
    <!-- 头部部分 -->
    <ToolInput
      @searchInfo="searchInfo"
      :inputName="inputName"
      @resetPage="getPageList"
    >
    </ToolInput>
    <div class="content">
      <el-button round @click="addLib">新增仓库</el-button>
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
    </div>
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
import { changeLibStatus, getPageList } from '@/api'
import Enumerate from '@/api/constant/Lib.js'
import formatterFunction from '@/utils/formatterFunction.js'
import { mapState } from 'vuex'

export default {
  name: 'ManageLib',
  data() {
    return {
      inputName: ['仓库编号', '仓库名称', '仓库状态'],
      isShowDia: false,
      total: null,
      page: {
        current: 1,
        size: 10,
        descs: 'createTime'
      },
      pageInput: {
        current: 1,
        size: 10,
        descs: 'createTime'
      },
      arr: [],
      currentRowInfo: '',
      loopArr: Enumerate.TableName,
      formatterFunction
    }
  },
  computed: {
    ...mapState('mainArea', ['headerList'])
  },
  created() {
    this.getPageList()
  },
  methods: {
    // 获取input信息
    async searchInfo(val) {
      // console.log(val)
      this.pageInput = { ...this.pageInput, ...val }
      const res = await getPageList(this.pageInput)
      // console.log(res.data.data.records)
      this.arr = res.data.data.records
    },
    // 获取相应的表单数据
    async getPageList() {
      const {
        data: { data }
      } = await getPageList(this.page)
      // console.log(data)
      this.arr = data.records
      // console.log(data.records)
      this.total = data.total
    },
    // 编辑按钮
    edit({ params }) {
      // console.log(params)
      const obj = {
        title: '编辑仓库',
        name: 'AddAndEditLib',
        path: this.$route.matched[1].name
      }
      // 判断headerList中是否已经存在
      let flag = true
      let hightLig = null
      this.headerList.forEach((item, index) => {
        if (item.title === obj.title) {
          flag = false
          hightLig = index
        }
      })
      if (flag) {
        // 如果headerList中没有则添加
        this.$store.commit('mainArea/ADD_HEADERLIST', obj)
      } else {
        // 如果有则改变高亮索引
        this.$store.commit('mainArea/CHANGE_CURINDEX', hightLig)
      }
      this.$router.push({
        name: 'AddAndEditLib',
        params: {
          id: params.id
        }
      })
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
          await changeLibStatus({ id: row.id, status: 1 })
        } else {
          // 去停用
          await changeLibStatus({ id: row.id, status: 0 })
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
    // 改变当前页码触发
    changeCurrentPage(page) {
      // 修改当前页码
      this.page.current = page
      // 重新获取数据渲染
      this.getPageList()
    },
    // 改变每一页条数时触发
    changeSize(number) {
      // console.log(number)
      this.page.size = number
      // 重新获取数据渲染
      this.getPageList()
    },
    //  添加仓库
    addLib() {
      const obj = {
        title: '新增仓库',
        name: 'AddAndEditLib',
        path: this.$route.matched[1].name
      }
      // 判断headerList中是否已经存在
      let flag = true
      let hightLig = null
      this.headerList.forEach((item, index) => {
        if (item.name === obj.name) {
          flag = false
          hightLig = index
        }
      })
      if (flag) {
        // 如果headerList中没有则添加
        this.$store.commit('mainArea/ADD_HEADERLIST', obj)
      } else {
        // 如果有则改变高亮索引
        this.$store.commit('mainArea/CHANGE_CURINDEX', hightLig)
      }
      this.$router.push({ name: 'AddAndEditLib' })
    }
  }
}
</script>

<style scoped lang="less">
.manage {
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
