<template>
  <div class="header">
    <el-row>
      <el-col :span="6">
        <div class="divLable">{{ inputName[0] }}</div>
        <el-input v-model="info.like_code" placeholder="请输入"></el-input>
      </el-col>
      <el-col :span="6">
        <slot name="top_crnter">
          <div class="divLable">{{ inputName[1] }}</div>
          <el-input v-model="info.like_name" placeholder="请输入"></el-input>
        </slot>
      </el-col>
      <el-col :span="6">
        <slot name="top_end">
          <div class="divLable">{{ inputName[2] }}</div>
          <el-select
            v-model="info.status"
            placeholder="请选择"
            class="select_style"
          >
            <slot name="top_end_option">
              <el-option label="全部" value="3"></el-option>
              <el-option label="停用" value="0"></el-option>
              <el-option label="启用" value="1"></el-option>
            </slot>
          </el-select>
        </slot>
      </el-col>
      <el-col :span="6">
        <div class="button">
          <el-button round @click="seachResult">搜索</el-button>
          <el-button round @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <slot name="bottom"> </slot>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ToolInput',
  props: {
    inputName: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      info: {
        like_code: '',
        like_name: '',
        status: ''
      }
    }
  },
  methods: {
    seachResult() {
      this.$emit('searchInfo', this.info)
      // 重置input
      this.info = {
        like_code: '',
        like_name: '',
        status: ''
      }
    },
    reset() {
      // 先重置自己身上的数据
      this.info = {
        like_code: '',
        like_name: '',
        status: ''
      }
      // 再触发父组件身上的resetPage事件，让页面也重置
      this.$emit('resetPage')
    }
  }
}
</script>

<style scoped lang="less">
.header {
  // height: 127px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 0 6px 0 rgb(144 142 142 / 17%);
  padding: 30px;
  margin-bottom: 20px;
  .el-col {
    position: relative;
    padding-left: 15px;
    padding-right: 15px;
    .divLable {
      margin-bottom: 10px;
      height: 18px;
      color: #887e7e;
      font-size: 12px;
      font-family: PingFangSC, PingFangSC-Medium;
      font-weight: 500;
    }
    .el-input {
      position: relative;
      font-size: 14px;
      display: inline-block;
      width: 100%;
      /deep/.el-input__inner {
        display: inline-block;
        height: 40px;
        width: 100%;
        padding: 0 15px;
        line-height: 40px;
        border: 1px solid #f8f5f5;
        background-color: #f8f5f5;
        border-radius: 6px;
        color: #1f2d3d;
        outline: none;
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
      }
    }
    .select_style {
      width: 100%;
      /deep/.el-input__inner {
        border: unset;
        background-color: #f8f5f5;
      }
    }
    .button {
      position: absolute;
      top: 25px;
      right: 0;
      button:nth-child(1) {
        color: #333;
        background-color: #ffb200;
        &:hover {
          background-color: #ff8e00;
        }
      }
      button:nth-child(2) {
        color: #333;
        background-color: #f8f5f5;
        &:hover {
          background-color: #ffb200;
        }
      }
    }
  }
}
</style>
