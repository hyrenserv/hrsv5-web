import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: () => import('@/components/HelloWorld.vue'),
      children: [
        {
          name: '斑马纹表格',
          path: '/zebrapattern',
          component: () => import("@/view/Table/zebrapattern.vue")
        },
        {
            name: '基础选项卡',
            path: '/Tab',
            component: () => import("@/view/Tabs/tab.vue")
          },
          {
            name: '位置变换选项卡',
            path: '/tabPosition',
            component: () => import("@/view/Tabs/tabPosition.vue")
          },
          {
            name: '基础页头',
            path: '/pageHeader',
            component: () => import("@/view/Tabs/pageHeader.vue")
          },
      ]
    }

  ]
})
