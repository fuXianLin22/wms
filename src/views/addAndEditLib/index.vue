<template>
  <div>
    <el-card>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <!--        第一行-->
        <el-row type="flex" class="one">
          <el-col :span="8">
            <el-form-item label="仓库编码">
              <el-input
                disabled
                :value="ruleForm.code"
                placeholder="请输入"
                class="disabled"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="name" label="仓库名称">
              <el-input v-model="ruleForm.name" placeholder="请输入"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="type" label="仓库类型">
              <el-select v-model="ruleForm.type" placeholder="请选择">
                <el-option label="中转仓" value="ZZ"></el-option>
                <el-option label="加工仓" value="JG"></el-option>
                <el-option label="储备仓" value="CB"></el-option>
                <el-option label="冷藏仓" value="LC"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        第二行-->
        <el-row class="two">
          <el-col :span="16">
            <el-form-item label="省/市/区" prop="location">
              <el-cascader v-model="location" :options="options" :props="props">
              </el-cascader>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        第三行-->
        <el-row class="three">
          <el-col :span="16">
            <el-form-item label="详细地址" prop="address">
              <el-input
                v-model="ruleForm.address"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="仓库状态" class="checkBox" prop="status">
              <el-radio-group v-model="ruleForm.status" class="radioBox">
                <el-radio label="1">启用</el-radio>
                <el-radio label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        第四行-->
        <el-row type="flex" class="one">
          <el-col :span="8">
            <el-form-item label="仓库面积">
              <el-input
                v-model="ruleForm.surface"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="personName" label="负责人">
              <el-input
                v-model="ruleForm.personName"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="phone" label="联系电话">
              <el-input
                v-model="ruleForm.phone"
                placeholder="请输入"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--        第五行-->
        <el-row type="flex" justify="center">
          <el-button
            type="info"
            round
            size="small"
            style="width: 100px"
            @click="close"
          >返回
          </el-button>
          <el-button
            type="warning"
            round
            size="small"
            style="width: 100px"
            @click="SuccessBtn"
          >提交
          </el-button>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { addressArr } from '@/utils/storage'
import { changeLib, createNewLib, editLib, getLibCode } from '@/api'
import { mapState } from 'vuex'

export default {
  name: 'AddAndEditLib',
  data() {
    return {
      obj: [],
      options: addressArr,
      props: {
        value: 'code',
        label: 'name',
        children: 'areaList'
      },
      location: ['330000', '330100', '330106'],
      ruleForm: {
        code: '',
        province: '',
        city: '',
        area: '',
        name: '',
        type: '',
        location: '',
        address: '',
        status: '1',
        surface: '',
        personName: '',
        phone: ''
      },
      rules: {
        name: [{ required: true, message: '名称不能为空', trigger: 'blur' }],
        type: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
        location: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        status: [{ required: true, message: '类型不能为空', trigger: 'blur' }],
        personName: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        phone: [
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号码格式不正确',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  created() {
    // console.log(this.$route)
    this.getLibCode()
  },
  watch: {
    location: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.ruleForm.province = newVal[0]
        this.ruleForm.city = newVal[1]
        this.ruleForm.area = newVal[2]
        this.deepMate(addressArr, newVal[0], newVal[1], newVal[2])
        this.ruleForm.location = this.obj.join('/')
      }
    }
  },
  computed: {
    ...mapState('mainArea', ['curIndex', 'headerList'])
  },
  methods: {
    async getLibCode() {
      // 判断一下是编辑还是新增
      if (this.$route.params?.id) {
        //  编辑
        const { data: { data } } = await editLib(this.$route.params?.id)
        this.ruleForm = data
        // this.ruleForm.name = data.name
        // this.ruleForm.type = data.type
        // this.ruleForm.address = data.address
        this.ruleForm.status = data.status + ''
        // this.ruleForm.surface = data.surface
        // this.ruleForm.personName = data.personName
        // this.ruleForm.phone = data.phone
        this.location[0] = data.province
        this.location[1] = data.city
        this.location[2] = data.area
      } else {
        // 新增
        const res = await getLibCode()
        // console.log(res.data.data)
        this.ruleForm.code = res.data.data
      }
    },
    // 点击取消按钮
    close() {
      this.location = []
      //  重置表单
      this.$refs.ruleForm.resetFields()
      // 更改当前的高亮值
      const path = this.headerList[this.curIndex].path
      const target = this.headerList.findIndex(item => item.name === path)
      console.log(target)
      this.$store.commit('mainArea/CHANGE_CURINDEX', target)
      //  返回之前的页面
      this.$router.back()
    },
    // 点击确认按钮
    async SuccessBtn() {
      //  校验表单
      await this.$refs.ruleForm.validate()
      // 判断一下是编辑还是新增
      if (this.$route.params?.id) {
        // 编辑
        await changeLib(this.ruleForm)
      } else {
        // 新增
        await createNewLib(this.ruleForm)
      }

      this.close()
    },
    //  编辑数据，拿到code值
    deepMate(data, val1, val2, val3) {
      data.forEach(item => {
        for (const key in item) {
          if (item[key] === val1) {
            this.obj.push(item.name)
          }
          if (item[key] === val2) {
            this.obj.push(item.name)
          }
          if (item[key] === val3) {
            this.obj.push(item.name)
          }
          if (Array.isArray(item[key])) {
            this.deepMate(item[key], val1, val2, val3)
          }
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.one {
  position: relative;
  padding-left: 15px;
  padding-right: 15px;

  .el-col-8 {
    margin: 0 15px;
  }

  /deep/ .el-input {
    position: relative;
    //margin-top: 10px;
    font-size: 14px;
    display: inline-block;
    width: 100%;

    .el-input__inner {
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

  /deep/ .disabled {
    .el-input__inner {
      background-color: #f3ebeb !important;
    }
  }

  /deep/ .el-form-item {
    .el-form-item__label {
      float: unset;
    }

    .el-form-item__content {
      .el-select {
        width: 100%;
      }
    }
  }
}

/deep/ .two {
  margin: 0 30px;

  .el-form-item {
    .el-form-item__label {
      float: unset;
    }

    .el-form-item__content {
      .el-cascader {
        width: 100%;

        .el-input__inner {
          background-color: #f8f5f5;
        }
      }
    }
  }
}

/deep/ .three {
  margin: 0 30px;

  .el-input__inner {
    background-color: #f8f5f5;
  }

  .checkBox {
    margin-left: 25px;

    .el-form-item__label {
      float: unset;
    }

    .radioBox {
      .el-radio__inner {
        &:hover {
          border-color: #ffb200;
        }
      }

      .el-radio__label:hover {
        color: #ffb200;
      }

      .el-radio__input.is-checked .el-radio__inner {
        border-color: #ffb200;
        background: #ffb200;
      }

      .el-radio__input.is-checked + .el-radio__label {
        color: #ffb200;
      }
    }
  }
}
</style>
