import router from '@/router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

const writeList = ['/login', '/404']
// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (to.path === '/login') {
      next('/')
      nprogress.done()
    } else {
      // 判断获取资料
      if (!store.getters.userId) {
        await store.dispatch('user/getUserInfo')
      }
      next()
    }
  } else {
    if (writeList.includes(to.path)) {
      next()
    } else {
      next('/login')
      nprogress.done()
    }
  }
})
// 路由后置守卫
router.afterEach((to, from, next) => {
  nprogress.done()
})
