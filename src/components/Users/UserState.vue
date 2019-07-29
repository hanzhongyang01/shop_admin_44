<template>
  <el-switch v-model="value">
  </el-switch>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      value: false
    }
  },
  created () {
    this.getUsersState()
  },
  methods: {
    getUsersState () {
      let token = localStorage.getItem('token')
      axios.get('http://localhost:8888/api/private/v1/users', {
        params: {
          query: '',
          pagenum: 1,
          pagesize: 2
        },
        headers: { Authorization: token }
      }).then(res => {
        this.value = res.data.data.users.mg_state
      })
    }
  }
}
</script>

<style>
</style>
