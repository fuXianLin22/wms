<template>
  <div class="home">
    <!-- 顶部盒子 -->
    <div class="divStatic">
      <!-- 顶部左侧盒子 -->
      <div class="divLeft">
        <div class="banner">
          <img
            src="~@/assets/img/dashboard-banner-left.png"
            alt=""
            class="img-left"
          />
          <img
            src="~@/assets/img/dashboard-banner-right.png"
            alt=""
            class="img-right"
          />
          <img src="~@/assets/img/avatar.png" alt="" class="user-header" />
          <p class="user-title">仓储管理员</p>
          <p class="subject-title">我不是为了输赢，我就是认真！</p>
          <p class="subject-author">——罗永浩</p>
          <div class="site">
            <p class="title">北京总仓</p>
          </div>
        </div>
        <div class="backlog">
          <div class="subject">待办信息</div>
          <ul class="item-list">
            <li class="active" v-for="(item, index) in todoList" :key="index">
              <a href="javascript:;">
                <div class="title">
                  <i
                    :class="['iconfont', item.icon]"
                    :style="{ backgroundColor: item.color }"
                  ></i>
                  <p>{{ item.name }}</p>
                </div>
                <div class="text">
                  <span>
                    新增 <i>{{ item.value1 }}</i>
                  </span>
                  <span>
                    新增
                    <i :style="{ color: item.color }">
                      {{ item.value2 }}
                    </i>
                  </span>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- 顶部右侧盒子 -->
      <div class="divRight">
        <h4>通知/公告</h4>
        <ul>
          <li>
            <p>紧急盘点通知</p>
            <span>2020.12.30 18:23:14</span>
          </li>
          <li>
            <p>紧急盘点通知</p>
            <span>2020.12.30 18:23:14</span>
          </li>
          <li>
            <p>紧急盘点通知</p>
            <span>2020.12.30 18:23:14</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 任务导航 -->
    <div class="tasks">
      <div class="subject">任务导航</div>
      <ul>
        <li class="active" v-for="(item, index) in taskArr" :key="index">
          <i
            :class="['iconfont', item.icon]"
            :style="{ backgroundColor: item.color }"
          ></i>
          <p>收货任务</p>
        </li>
      </ul>
    </div>
    <!-- 柱状Chart -->
    <div class="inout-charts">
      <Chart :chartData="chartData" height="450px"></Chart>
      <div class="trigger">
        <button
          :class="[isCurShow === 'w' ? 'active' : null]"
          @click="getSumList('w')"
        >
          本周
        </button>
        <button
          :class="[isCurShow === 'e' ? 'active' : null]"
          @click="getSumList('e')"
        >
          本月
        </button>
        <button
          :class="[isCurShow === 'c' ? 'active' : null]"
          @click="getSumList('c')"
        >
          全年
        </button>
      </div>
    </div>
    <div class="libs">
      <!-- 圆环Chart -->
      <div class="use-charts">
        <div class="header">库存使用情况</div>
        <Chart :chartData="chartPaiData" height="230px"></Chart>
      </div>
      <!-- 扇形Chart -->
      <div class="libs-charts">
        <div class="header">库区使用情况</div>
        <Chart :chartData="allChart" height="280px"></Chart>
      </div>
    </div>
  </div>
</template>

<script>
import { getTodo } from '@/api'
import { mapState } from 'vuex'
import Chart from '@/components/TestChart.vue'
export default {
  name: 'Home',
  components: { Chart },
  data() {
    return {
      todoList: [],
      styleArr: [
        ['#0076ff', '#ffb200', '#ff7100'],
        ['icon-rukudan', 'icon-chukudan', 'icon-navicon-pdd']
      ],
      taskArr: [
        {
          color: '#0076ff',
          icon: 'icon-daishouhuo'
        },
        {
          color: '#52d4f3',
          icon: 'icon-shangjiadan'
        },
        {
          color: '#ff7100',
          icon: 'icon-jisuanjisuanshu'
        },
        {
          color: '#ff609e',
          icon: 'icon-jianhuo'
        },
        {
          color: '#ffb200',
          icon: 'icon-lizhijiaojie'
        }
      ],
      isCurShow: 'w',
      chartData: {},
      chartPaiData: {},
      allChart: {}
    }
  },
  watch: {
    ChartOption: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.chartData = newVal
      }
    },
    PaiChartOption: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.chartPaiData = newVal
      }
    },
    allPaiChartOption: {
      deep: true,
      immediate: true,
      handler(newVal) {
        this.allChart = newVal
      }
    }
  },
  created() {
    this.getTodos() // 页面挂载就请求todo中的数据
    this.getSumList('w') // 页面挂载就请求‘本周’中的数据做初始化
    this.$store.dispatch('home/getStockUseStatus') // 页面挂载请求数据渲染环形chart
    this.$store.dispatch('home/getAreaUseStatus') // 页面挂载请求数据渲染环形chart
  },
  computed: {
    ...mapState('home', ['ChartOption', 'PaiChartOption', 'allPaiChartOption'])
  },
  methods: {
    async getTodos() {
      try {
        const res = await getTodo()
        // console.log(res.data.data)
        res.data.data.forEach((item, index) => {
          item.color = this.styleArr[0][index]
          item.icon = this.styleArr[1][index]
        })
        this.todoList = res.data.data
      } catch (e) {
        console.log(e)
      }
    },
    // 获取chart柱状图的数据
    getSumList(type) {
      // 判断是否是正在展示的，是则不请求数据，不是就请求数据重新渲染
      if (this.ChartOption.xAxis[0].data.length === 7 && type === 'w') return
      if (this.ChartOption.xAxis[0].data.length === 11 && type === 'c') return
      if (
        this.ChartOption.xAxis[0].data.length >= 28 &&
        this.ChartOption.xAxis[0].data.length <= 31 &&
        type === 'e'
      ) {
        return
      }
      this.$store.dispatch('home/getSumList', type)
      // 改变点击后的高亮效果
      this.isCurShow = type
    }
  }
}
</script>

<style scoped lang="less">
.home {
  height: 100%;
  .divStatic {
    display: flex;
    width: 100%;
    height: 451px;
    background-color: #fdfafa;
    .divLeft {
      width: calc(100% - 261px);
      padding-right: 30px;
      .banner {
        position: relative;
        width: 100%;
        height: 148px;
        background: linear-gradient(270deg, #ffc771, #ffa634);
        box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
        border-radius: 12px;
        .img-left {
          position: absolute;
          top: 0;
          left: 0;
          height: 148px;
        }
        .img-right {
          position: absolute;
          top: 0;
          right: 0;
          height: 148px;
        }
        .user-header {
          position: absolute;
          top: 31px;
          left: 43px;
          height: 62px;
        }
        .user-title {
          position: absolute;
          left: 36px;
          bottom: 20px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #332929;
          line-height: 22px;
        }
        .subject-title {
          position: absolute;
          top: 36px;
          left: 200px;
          font-size: 18px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fff;
          line-height: 25px;
        }
        .subject-author {
          position: absolute;
          top: 76px;
          left: 400px;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #fff;
          line-height: 25px;
        }
        .site {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 147px;
          height: 40px;
          background: #f8f5f5;
          border-radius: 6px;
          opacity: 0.79;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-around;
          .title {
            font-size: 14px;
            font-weight: 500;
            color: #332929;
            font-family: PingFangSC-Medium, PingFang SC;
            line-height: 20px;
          }
        }
      }
      .backlog {
        margin-top: 20px;
        width: 100%;
        height: 282px;
        background: #fff;
        box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
        border-radius: 12px;
        padding: 25px;
        .subject {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: #332929;
          line-height: 22px;
        }
        .item-list {
          display: flex;
          justify-content: space-between;
          height: 186px;
          margin-top: 20px;
          li {
            height: 100%;
            width: 32%;
            padding: 10px;
            list-style: none;
            border-radius: 10px;
            background-color: #fbf7f7;
            a {
              text-decoration: none;
              color: #333;
            }
            .title {
              display: flex;
              height: 50px;
              line-height: 50px;
              // background-color: #eee;
              i {
                width: 50px;
                height: 50px;
                margin-right: 20px;
                border-radius: 12px;
                text-align: center;
                font-size: 30px;
                color: #fff;
                // background-color: #0076ff;
              }
              p {
                flex: 1;
                // background-color: purple;
              }
            }
            .text {
              display: flex;
              padding: 0 10px;
              margin-top: 80px;
              span {
                line-height: 15px;
                i {
                  vertical-align: bottom;
                  line-height: 20px;
                  margin-top: 0;
                  font-style: normal;
                  font-size: 30px;
                  font-weight: 700;
                }
              }
              span:nth-child(1) {
                margin-right: 20px;
              }
            }
          }
        }
      }
    }
    .divRight {
      flex: 1;
      box-shadow: 0 0 6px 0 rgb(188 151 69 / 12%);
      border-radius: 12px;
      background-color: #fff;
      padding: 20px;
      ul {
        li {
          list-style: none;
          margin-top: 10px;
          border-top: 1px solid #eee;
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          color: #333;
        }
        p {
          width: 195px;
          height: 18px;
          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #332929;
          line-height: 18px;
          margin-top: 15px;
        }
        span {
          width: 115px;
          height: 17px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #887e7e;
          line-height: 17px;
          margin-top: 10px;
        }
      }
    }
  }
  .tasks {
    margin-top: 20px;
    width: 100%;
    height: 188px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
    .subject {
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #332929;
      line-height: 22px;
    }
    ul {
      display: flex;
      justify-content: space-between;
      margin-top: 20px;
      li {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        height: 93px;
        width: 200px;
        background: #fbf7f7;
        border-radius: 8px;
        cursor: pointer;
        margin-right: 10px;
        list-style: none;
        i {
          width: 50px;
          height: 50px;
          background: #0076ff;
          border-radius: 25px;
          font-size: 25px;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }
        p {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #332929;
          line-height: 22px;
        }
      }
    }
  }
  .inout-charts {
    position: relative;
    margin-top: 20px;
    height: 500px;
    background: #fff;
    box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
    border-radius: 12px;
    padding: 25px;
    .trigger {
      display: flex;
      position: absolute;
      top: 20px;
      right: 55px;
      height: 36px;
      border-radius: 4px;
      // background-color: pink;
      button {
        padding: 10px 20px;
        border: 1px solid #eee;
        background-color: transparent;
        box-shadow: none !important;
        font-size: 14px;
        font-weight: 400;
        &.active {
          background-color: #ffb200 !important;
          color: #fff !important;
        }
        &:hover {
          color: #ffb200;
        }
        &:nth-child(1) {
          border-radius: 4px 0 0 4px;
        }
        &:nth-child(3) {
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }
  .libs {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .use-charts {
      width: 30%;
      height: 354px;
      background: #fff;
      box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
      border-radius: 12px;
      padding: 25px;
      margin-right: 30px;
      .header {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #332929;
        line-height: 22px;
        margin-bottom: 34px;
      }
    }
    .libs-charts {
      width: 70%;
      height: 354px;
      background: #fff;
      box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
      border-radius: 12px;
      padding: 25px;
      .header {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: #332929;
        line-height: 22px;
      }
    }
  }
  .active:hover {
    background-color: #fff !important;
    box-shadow: 0 0 6px 0 rgb(144 142 142);
  }
}
</style>
