<template>
  <el-aside width="226px">
    <div class="log_img">
      <img src="~@/assets/title.ef005a7a.png" alt="" />
    </div>
    <!-- <div class="first">
      <a href="javascript:;">
        <div class="mask">
          <i class="iconfont icon-gongzuotai"></i>
          <p>工作台</p>
        </div>
      </a>
    </div> -->
    <el-menu
      background-color="#fff"
      text-color="#333"
      active-text-color="#333"
      ref="aside_menu"
      unique-opened
      router
      @open="subMenuIndex1"
    >
      <el-menu-item index="home" class="menu_first">
        <template slot="title">
          <i class="iconfont icon-gongzuotai"></i>
          <span>工作台</span>
        </template>
      </el-menu-item>
      <!-- 一级菜单 -->
      <el-submenu
        :index="index + ''"
        v-for="(item, index) in asideList"
        :key="index"
      >
        <template slot="title">
          <i :class="['iconfont', item.icon]"></i>
          <span>{{ item.title }}</span>
        </template>
        <!-- 二级菜单 -->
        <el-menu-item
          :index="subItem.name"
          v-for="(subItem, index) in item.children"
          :key="index"
          @click="addHeaderItem(subItem)"
        >
          <template slot="title">
            <!-- <i class="el-icon-location"></i> -->
            <span>{{ subItem.title }}</span>
          </template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Aside',
  data() {
    return {
      $route: this.$route,
      subMenuIndex: ''
    }
  },
  watch: {
    $route: {
      handler() {
        if (this.$route.path === '/dashboard/home') {
          // console.log(this.$refs.aside_menu)
          this.$refs.aside_menu.close(this.subMenuIndex)
        }
      }
    }
  },
  computed: {
    ...mapGetters(['asideList'])
  },
  methods: {
    subMenuIndex1(index) {
      this.subMenuIndex = index
    },
    addHeaderItem(val) {
      // console.log(val)
      this.$store.dispatch('mainArea/changeList_curIndex', val)
    }
  }
}
</script>

<style scoped lang="less">
.el-aside {
  color: #333;
  text-align: center;
  .log_img {
    height: 100px;
    img {
      width: 150px;
      height: 64px;
      margin-top: 18px;
    }
  }
  .menu_first {
    display: flex;
    i {
      font-size: 25px;
      margin-right: 20px;
    }
  }
  .first {
    height: 56px;
    background-color: #fff;
    a {
      display: block;
      height: 56px;
      text-decoration: none;
      color: #ffc12f;
      background-color: #fff;
      div {
        display: flex;
        padding-left: 20px;
        line-height: 56px;
        height: 56px;
        width: 80%;
        font-size: 14px;
        border-radius: 0 28px 28px 0;
        background-color: #fff6e2;
        i {
          margin-right: 20px;
          font-size: 24px;
        }
      }
    }
  }
  /deep/.el-submenu__title {
    display: flex;
    color: rgb(136, 126, 126);
    font-size: 14px;
    background-color: #fff !important;
    .iconfont {
      font-size: 24px;
      margin-right: 20px;
    }
  }
  /deep/.el-menu-item {
    color: rgb(136, 126, 126);
    font-size: 14px;
    background-color: #fff !important;
  }
  .bigFontSize {
    font-size: 30px;
  }
}
</style>
