// 引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import Login from './components/login.vue'
import Home from './components/home.vue'
import Users from './components/Users/Users.vue'
import Roles from './components/Roles/Roles.vue'
import Rights from './components/Rights/Rights.vue'
import State from './components/Users/UserState.vue'
import Operation from './components/Users/Operation.vue'
// 使用路由
Vue.use(VueRouter)
// 实例路由
const router = new VueRouter({
  // 规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/users',
          component: Users,
          children: [
            {
              path: '/users',
              components: {
                s: State,
                o: Operation
              }
            }
          ]

        },
        { path: '/roles', component: Roles },
        { path: '/rights', component: Rights }
      ]
    }
  ]

})

// 导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    console.log()
    next()
  } else {
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
// 导出路由
export default router
