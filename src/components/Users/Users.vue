<template>
  <div>
    <!-- 导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用戶管理</el-breadcrumb-item>
      <el-breadcrumb-item>用戶列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button icon="el-icon-search"></el-button>
      </el-col>

      <el-button @click='addUserModel'>添加用户</el-button>

    </el-row>
    <!-- 用户表格 -->
    <el-table
      :data="usersData"
      style="width: 100%"
    >
      <el-table-column
        prop="username"
        label="姓名"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="用户状态"
      >
        <router-view name="s"></router-view>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
      >
        <router-view name="o"></router-view>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :page-size="2"
      @current-change="currentChange"
      layout="prev, pager, next"
      :total="total"
    >
    </el-pagination>
    <el-dialog
      title="添加用户"
      :visible="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >

      <!-- 用户名 -->
      <el-form
        :model="userFrom"
        :rules="rules"
        ref="userFrom"
        label-width="100px"
      >
        <el-form-item
          label="用戶名"
          prop="username"
        >
          <el-input v-model="userFrom.username"></el-input>
        </el-form-item>
      </el-form>

      <!-- 密码 -->
      <el-form
        :model="userFrom"
        :rules="rules"
        ref="userFrom"
        label-width="100px"
      >
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input v-model="userFrom.password"></el-input>
        </el-form-item>
      </el-form>

      <!-- 邮箱 -->
      <el-form
        :model="userFrom"
        :rules="rules"
        ref="userFrom"
        label-width="100px"
      >
        <el-form-item
          label="邮箱"
          prop="email"
        >
          <el-input v-model="userFrom.email"></el-input>
        </el-form-item>

        <!-- 手机 -->
        <el-form
          :model="userFrom"
          :rules="rules"
          ref="userFrom"
          label-width="100px"
        >
          <el-form-item
            label="手机"
            prop="mobile"
          >
            <el-input v-model="userFrom.mobile"></el-input>
          </el-form-item>
        </el-form>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="submitForm(userForm)"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      usersData: [{
        username: '王小虎',
        email: '12.@qq.com',
        mobile: '11565456546'
      }],
      userFrom: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      total: 0,
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        mobile: [
          { min: 11, max: 11, message: '请输入正确格式的手机', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.getUsersData()
  },
  methods: {
    // 获取用户数据
    getUsersData (pagenum = 1) {
      let token = localStorage.getItem('token')
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum,
          pagesize: 2
        },
        headers: { Authorization: token }
      }).then(res => {
        this.total = res.data.data.total
        this.usersData = res.data.data.users
      })
    },
    // 分页选择
    currentChange (currentpage) {
      this.getUsersData(currentpage)
    },
    // 添加框显示
    addUserModel () {
      this.dialogVisible = true
    },
    // 关闭添加框
    handleClose (done) {
      this.dialogVisible = false
    },
    // 添加用户信息
    submitForm (formName) {
      console.log(formName)
      this.$refs[formName].validate((valid) => {
        if (!valid) {
          return
        }
        let token = localStorage.getItem('token')
        axios.post('http://localhost:8888/api/private/v1/users', this.userFrom, {
          params: {},
          headers: { Authorization: token }
        }).then(res => {
          // 添加成功提示
          this.$message({
            message: '添加成功',
            type: 'success',
            duration: 800
          })
          // 关闭添加框
          this.dialogVisible = false
        })
      })
    }

  }
}
</script>

<style scoped lang='less'>
.el-breadcrumb {
  height: 40px;
  background-color: #d4dae0;
  line-height: 40px;
  padding-left: 30px;
}
.el-row {
  .el-col {
    .el-input__inner {
      border-radius: 0;
    }
    .el-button--default {
      border-radius: 0 4px 4px 0;
      border: none;
      background-color: #f5f7fa;
    }
  }
}
</style>
