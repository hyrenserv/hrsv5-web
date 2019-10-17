import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld.vue')
    },
    // {
    //   name: '斑马纹表格',
    //   path: '/zebrapattern',
    //   // component: () => import("@/view/Table/zebrapattern.vue")
    // }
  ]
})
