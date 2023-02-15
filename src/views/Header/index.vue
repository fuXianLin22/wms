<template>
  <div class="header">
    <div class="breadcrumb">
      <span
        class="breadcrumb_item"
        v-for="(item, index) in headerList"
        :key="index"
        @click="changeIndex(item, index)"
        :class="[curIndex === index && 'active']"
      >
        {{ item.title }}
        <i
          class="el-icon-close"
          v-if="index !== 0"
          @click="delHeaderItem(item, index)"
        ></i>
      </span>
    </div>
    <!-- 下拉菜单 -->
    <el-dropdown @command="dropdownType">
      <span class="el-dropdown-link">
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="左侧">关闭左侧</el-dropdown-item>
        <el-dropdown-item command="右侧">关闭右侧</el-dropdown-item>
        <el-dropdown-item command="其他">关闭其他</el-dropdown-item>
        <el-dropdown-item command="全部">关闭全部</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { setcurIndex, setHeaderList } from '@/utils/storage.js'

export default {
  name: 'Header',
  data() {
    return {}
  },
  computed: {
    ...mapState('mainArea', ['headerList', 'curIndex'])
  },
  watch: {
    headerList: {
      immediate: true,
      deep: true,
      handler(newVal) {
        setHeaderList(newVal)
      }
    },
    curIndex: {
      immediate: true,
      deep: true,
      handler(newVal) {
        setcurIndex(newVal)
      }
    }
  },
  methods: {
    changeIndex(item, index) {
      // 判断一下当前的路由页面是否与要跳转的路由页面一致，一致就不跳转
      if (this.curIndex === index) return
      // 改变curIndex
      this.$store.commit('mainArea/CHANGE_CURINDEX', index)
      // 跳转路由
      this.$router.push({ name: item.name })
    },
    // 点击❌号删除操作
    delHeaderItem(item, index) {
      // 完善删除功能
      this.$store.dispatch('mainArea/delHeader_changeCurIndex', index)
      // 路由跳转功能,跳转到当前页面
      this.$router.push({ name: this.headerList[this.curIndex].name })
    },
    // 头部右侧的删除功能
    dropdownType(val) {
      // 删除功能
      this.$store.dispatch('mainArea/delType', val)
      // 删除完了之后显示高亮的路由页面
      // 拿到当前高亮的路由name
      const name = this.headerList[this.curIndex].name
      // 跳转相应的路由页面
      this.$router.push({ name })
    }
  }
}
</script>

<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-around;
  padding: 0 20px;
  background-color: #f5f1f1;
  color: #333;
  height: 64px;
  text-align: center;
  line-height: 60px;

  .breadcrumb {
    display: flex;
    flex: 1;
    align-items: center;
    // .span {
    //   display: inline-block;
    //   // text-align: center;
    //   // position: relative;
    //   cursor: pointer;
    //   height: 36px;
    //   background: #fff;
    //   border-radius: 6px;
    //   line-height: 36px;
    //   // color: #b5abab;
    //   color: #ffb200;
    //   padding: 0 15px 0 15px;
    //   font-size: 13px;
    //   margin-left: 10px;
    //   margin-top: 14px;
    //   margin-bottom: 14px;
    //   font-weight: 400;
    //   font-family: PingFangSC, PingFangSC-Regular;
    // }
    .breadcrumb_item {
      position: relative;
      height: 36px;
      background: #fff;
      border-radius: 6px;
      line-height: 36px;
      cursor: pointer;
      color: #b5abab;
      // color: #ffb200;
      padding: 0 15px 0 15px;
      font-size: 13px;
      margin-left: 10px;
      margin-top: 14px;
      margin-bottom: 14px;
      font-weight: 400;
      font-family: PingFangSC, PingFangSC-Regular;

      &.active {
        color: #ffb200;
      }
    }
  }

  .el-dropdown {
    .el-dropdown-link {
      cursor: pointer;
      color: #409eff;
    }

    .el-icon-arrow-down {
      width: 36px;
      height: 36px;
      line-height: 36px;
      background-color: #fff;
      border: 1px solid #eee;
      border-radius: 6px;
      font-size: 20px;
    }
  }
}
</style>
