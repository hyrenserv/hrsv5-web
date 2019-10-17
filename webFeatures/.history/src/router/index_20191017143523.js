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
            name: '基础选项卡标签页',
            path: '/Tab',
            component: () => import("@/view/Tabs/Tab.vue")
          },
          {
            name: '位置可变换选项卡标签页',
            path: '/tabPosition',
            component: () => import("@/view/Tabs/tabPosition.vue")
          },
      ]
    }

  ]
})
