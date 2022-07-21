<template>
  <div class="login_container">
    <div class="login_box">
      <div class="divLeft"></div>
      <div class="divRight"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
}
</script>

<style scoped lang="less">
.login_container {
  .login_box {
    width: 958px;
    height: 516px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 20px rgb(93 93 93 / 33%);
    background-color: pink;
    border-radius: 40px;
    .divLeft {
      float: left;
      width: 398px;
      height: 516px;
      background: #fff;
      border-radius: 34px 0 0 34px;
      margin: 0 auto;
    }
    .divRight {
      float: right;
      background-image: url('~@/assets/contentBg.1321d126.png');
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 560px;
      height: 516px;
    }
  }
}
</style>
