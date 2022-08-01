<template>
  <div class="dashboard_container">
    <el-container>
      <!-- 侧边栏 -->
      <Aside></Aside>
      <!-- 右侧内容 -->
      <el-container>
        <!-- 头部 -->
        <el-header>
          <Header></Header>
        </el-header>

        <!-- 主体 -->
        <el-main>
          <keep-alive :exclude="['AddAndEditLib']">
            <router-view></router-view>
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Aside from '@/views/Aside'
import Header from '@/views/Header'

export default {
  name: 'Dashboard',
  components: { Aside, Header },
  methods: {}
}
</script>

<style scoped lang="less">
.dashboard_container {
  height: 100%;
}

/deep/ .el-container {
  margin-bottom: 40px;
  height: 100%;
}

.el-header {
  padding: 0;
}

.el-main {
  background-color: #fdfafa;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}
</style>
