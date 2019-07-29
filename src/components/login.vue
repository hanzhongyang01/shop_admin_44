<template>
  <el-row
    type="flex"
    justify="center"
    align="middle"
  >
    <el-col :span="8">
      <div class="grid-content bg-purple-dark">
        <el-form
          :model="loginForm"
          :rules="rules"
          ref="loginForm"
        >
          <el-form-item
            label="用户名"
            prop="username"
          >
            <el-input v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="密码"
            prop="password"
          >
            <el-input v-model="loginForm.password"></el-input>
          </el-form-item>

          <!-- 登录部分 -->
          <el-form-item>
            <el-button
              type="danger"
              @click="submitForm('loginForm')"
            >登录</el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>

</template>

<script>
// 引入axios
import axios from 'axios'
export default {
  data () {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'

      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
        ]

      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return
        }

        axios.post('http://localhost:8888/api/private/v1/login', this.loginForm).then(res => {
          if (res.data.meta.status !== 200) {
            return this.$message({
              message: '用户名或密码错误',
              type: 'error',
              duration: 800
            })
          }
          this.$message({
            message: '登录成功，正在跳转',
            type: 'success',
            duration: 800
          })
          let token = res.data.data.token
          localStorage.setItem('token', token)
          this.$router.push('/home')
        })
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.el-row {
  height: 100%;
  background: #2d434c;
}
.el-col {
  background-color: #fff;
  padding: 20px 30px;
  border-radius: 20px;
}
</style>
