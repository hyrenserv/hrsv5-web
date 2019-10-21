import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'functionMenu',
      component: () => import('@/components/functionMenu.vue'),
      children: [
        {
          name: '斑马纹表格',
          path: '/zebrapattern',
          component: () => import("@/view/Table/zebrapattern.vue")
        },
        // 21--31路由设置开始
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
            name: '选项卡属性方法说明',
            path: '/tabsAttributes',
            component: () => import("@/view/Tabs/tabsAttributes.vue")
          },
        {
          name: '基础页头',
          path: '/pageHeader',
          component: () => import("@/view/PageHeader/pageHeader.vue")
        },
        {
            name: '页头属性方法说明',
            path: '/pageheaderAttributes',
            component: () => import("@/view/PageHeader/pageheaderAttributes.vue")
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
            name: '下拉菜单属性方法说明',
            path: '/dropdownAttributes',
            component: () => import("@/view/Dropdown/dropdownAttributes.vue")
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
            name: '步骤条属性方法说明',
            path: '/stepsAttributes',
            component: () => import("@/view/Steps/stepsAttributes.vue")
          },
        {
          name: '基础对话框',
          path: '/basedialog',
          component: () => import("@/view/Dialog/basedialog.vue")
        },
        {
          name: '嵌入表单对话框',
          path: '/formdialog',
          component: () => import("@/view/Dialog/formdialog.vue")
        },
        {
          name: '嵌套对话框',
          path: '/nestingdialog',
          component: () => import("@/view/Dialog/nestingdialog.vue")
        },
        {
            name: '对话框属性方法说明',
            path: '/dialogAttributes',
            component: () => import("@/view/Dialog/dialogAttributes.vue")
          },
        {
          name: '文字提示信息',
          path: '/tooltip',
          component: () => import("@/view/Tooltip/tooltip.vue")
        },
        {
            name: '提示属性方法说明',
            path: '/tooltipAttributes',
            component: () => import("@/view/Tooltip/tooltipAttributes.vue")
          },
        {
          name: '基本弹出框',
          path: '/popover',
          component: () => import("@/view/Popover/popover.vue")
        },
        {
            name: '弹出框属性方法说明',
            path: '/popoverAttributes',
            component: () => import("@/view/Popover/popoverAttributes.vue")
          },
        {
          name: '手风琴',
          path: '/collapse',
          component: () => import("@/view/Collapse/collapse.vue")
        },
        {
            name: 'collapse属性方法说明',
            path: '/collapseAttributes',
            component: () => import("@/view/Collapse/collapseAttributes.vue")
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
        {
            name: '分割线属性方法说明',
            path: '/dividerAttributes',
            component: () => import("@/view/Divider/dividerAttributes.vue")
          },
        {
          name: '无限滚动加载',
          path: '/infiniteScroll',
          component: () => import("@/view/InfiniteScroll/infiniteScroll.vue")
        },
        {
            name: '滚动属性方法说明',
            path: '/infiniteScrollAttributes',
            component: () => import("@/view/InfiniteScroll/infiniteScrollAttributes.vue")
          },
        {
          name: '图片占位',
          path: '/image',
          component: () => import("@/view/Image/image.vue")
        },
        {
            name: '图片属性方法说明',
            path: '/imageAttributes',
            component: () => import("@/view/Image/imageAttributes.vue")
          },
           // 21--31路由设置完


        /**Table路由地址信息*/
        {
          name: 'zebrapattern',
          path: '/zebrapattern',
          component: () => import("@/view/Table/zebrapattern.vue")
        },
        {
          name: 'frame',
          path: '/frame',
          component: () => import("@/view/Table/frame.vue")
        },
        {
          name: 'statuTable',
          path: '/statuTable',
          component: () => import("@/view/Table/statuTable.vue")
        },
        {
          name: 'fixedHead',
          path: '/fixedHead',
          component: () => import("@/view/Table/fixedHead.vue")
        },
        {
          name: 'fixedColumn',
          path: '/fixedColumn',
          component: () => import("@/view/Table/fixedColumn.vue")
        },
        {
          name: 'fixedHeadColumn',
          path: '/fixedHeadColumn',
          component: () => import("@/view/Table/fixedHeadColumn.vue")
        }
      ]
    }

  ]
})
