<template>
  <div>
    <el-row class="login">
      <el-col :xs="24" :sm="{span: 6,offset: 9}">
      <h1 class="title">
        koa-demo
      </h1>
        <el-row>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="" prop="user_name">
              <el-input type="text" placeholder="用户名" v-model="ruleForm.user_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="" prop="pass">
              <el-input type="password" placeholder="密码" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm()">登录</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        user_name: '',
        password: ''
      },
      rules: {
        user_name: [
          { validator: validateName, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      let _this = this
      var params = new URLSearchParams()
      params.append('user_name', _this.ruleForm.user_name)
      params.append('password', _this.ruleForm.password)
      _this.$http.post(_this.host + '/user', params)
        .then(response => {
          console.log(response.data)
          if (response.data.success) {
            this.$message({
              message: '登录成功',
              type: 'success',
              center: true
            })
            sessionStorage.setItem('koa-demo-token', response.data.token) // 用sessionStorage把token存下来
            setTimeout(function () {
              _this.$router.push({path: '/Item'})
            }, 1000)
          } else {
            sessionStorage.setItem('koa-demo-token', null)
            this.$message({
              message: response.data.info,
              type: 'error',
              center: true
            })
          }
        })
        .catch(failResponse => {
          sessionStorage.setItem('koa-demo-token', null)
          this.$message({
            message: '用户名或密码错误',
            type: 'error',
            center: true
          })
        })
    }
  }
}
</script>

<style scoped>
.login {
  top: 30vh;
}
.title{
  font-size: 3rem;
  margin-bottom: 20px;
}
</style>
