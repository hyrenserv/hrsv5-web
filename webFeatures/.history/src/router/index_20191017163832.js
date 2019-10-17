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
            component: () => import("@/view/PageHeader/pageHeader.vue")
          },
          {
            name: '基础下拉菜单',
            path: '/dropdown',
            component: () => import("@/view/Dropdown/dropdown.vue")
          },
          {
            name: '按钮下拉菜单',
            path: '/buttondropdown',
            component: () => import("@/view/Dropdown/buttondropdown.vue")
          },
          {
            name: '基础步骤条',
            path: '/steps',
            component: () => import("@/view/Steps/steps.vue")
          },
          {
            name: '简单步骤条',
            path: '/simplesteps',
            component: () => import("@/view/Steps/simplesteps.vue")
          },
          {
            name: '文字提示信息',
            path: '/tooltip',
            component: () => import("@/view/Tooltip/tooltip.vue")
          },
          {
            name: '基本弹出框',
            path: '/popover',
            component: () => import("@/view/Popover/popover.vue")
          },
          {
            name: '手风琴',
            path: '/collapse',
            component: () => import("@/view/Collapse/collapse.vue")
          },
          {
            name: '基础分割线',
            path: '/divider',
            component: () => import("@/view/Divider/divider.vue")
          },
          {
            name: '垂直分割线',
            path: '/verticaldivider',
            component: () => import("@/view/Divider/verticaldivider.vue")
          },
      ]
    }

  ]
})
