<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="8">
          <img
            src="../assets/logo.png"
            alt=""
          >
        </el-col>
        <el-col :span="8">
          <h1>电商后台管理系统</h1>
        </el-col>
        <el-col
          :span="8"
          class="right_col"
        >
          <span>恭喜上海前端44期月薪2W</span>
          <a
            href="#"
            class="logout"
            @click.prevent='logout'
          >退出</a>
        </el-col>
      </el-row>
    </el-header>
    <!-- //底部 -->
    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <el-row class="tac">
          <el-menu
            :default-active=" handleHighLight()"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item index="/users">用户列表</el-menu-item>
            </el-submenu>

          </el-menu>
          <el-menu
            :default-active="handleHighLight()"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item index="/roles">角色列表</el-menu-item>
              <el-menu-item index="/rights">权限列表</el-menu-item>
            </el-submenu>

          </el-menu>
        </el-row>
      </el-aside>

      <!-- 主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    // 退出功能
    logout () {
      this.$confirm('此操作将退出账户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '退出成功!',
          duration: 800
        })
        localStorage.removeItem('token')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出',
          duration: 800
        })
      })
    },
    // 高亮
    handleHighLight () {
      return this.$route.path
    }

  }
}

</script>

<style scoped lang='less'>
.el-container {
  height: 100%;
}
//头部样式
.el-header {
  overflow: hidden;
  background: #b3c1cd;
  padding: 0;
  h1 {
    color: #fff;
    font-size: 26px;
    text-align: center;
  }
  .right_col {
    text-align: right;
    padding-right: 20px;
  }
  .logout {
    color: #cfa820;
  }
  .el-row,
  .el-col {
    height: 100%;
    line-height: 60px;
  }
}
.el-aside {
  background: #545c64;
}
.el-main {
  background: #eaeef1;
}
</style>
