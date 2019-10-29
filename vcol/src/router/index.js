import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '*',
      name: 'functionMenu',
      component: () => import('@/components/functionMenu.vue'),
  },
    {
      path: '/',
      name: 'functionMenu',
      component: () => import('@/components/functionMenu.vue'),
      children: [
        // hffstart
        {
          name: '基础布局',
          path: '/Layout1',
          component: () => import("@/view/Layout/Layout1.vue")
        },
        {
          name: '分栏间隔',
          path: '/Layout2',
          component: () => import("@/view/Layout/Layout2.vue")
        },
        {
          name: '混合布局',
          path: '/Layout3',
          component: () => import("@/view/Layout/Layout3.vue")
        },
        {
          name: '分栏偏移',
          path: '/Layout4',
          component: () => import("@/view/Layout/Layout4.vue")
        },
        {
          name: '对齐方式',
          path: '/Layout5',
          component: () => import("@/view/Layout/Layout5.vue")
        },
        {
          name: '响应式布局',
          path: '/Layout6',
          component: () => import("@/view/Layout/Layout6.vue")
        },
        {
          name: 'Layout方法说明',
          path: '/Layout/Explain',
          component: () => import("@/view/Layout/Explain.vue")
        },
        {
          name: '常见页面布局',
          path: '/Container1',
          component: () => import("@/view/Container/Container1.vue")
        },
        {
          name: 'Container方法说明',
          path: '/Container/Explain',
          component: () => import("@/view/Container/Explain.vue")
        },
        {
          name: 'Button基础用法',
          path: '/Button1',
          component: () => import("@/view/Button/Button1.vue")
        },
        {
          name: 'Button方法说明',
          path: '/Button/Explain',
          component: () => import("@/view/Button/Explain.vue")
        },
        {
          name: 'Radio基础用法',
          path: '/Radio1',
          component: () => import("@/view/Radio/Radio1.vue")
        },
        {
          name: 'Radio按钮样式',
          path: '/Radio2',
          component: () => import("@/view/Radio/Radio2.vue")
        },
        {
          name: 'Radio方法说明',
          path: '/Radio/Explain',
          component: () => import("@/view/Radio/Explain.vue")
        },
        /* {
          name: 'Checkbox基础用法',
          path: '/Checkbox1',
          component: () => import("@/view/Checkbox/Checkbox1.vue")
        },
        {
          name: 'Checkbox多选框组',
          path: '/Checkbox2',
          component: () => import("@/view/Checkbox/Checkbox2.vue")
        }, */
        {
          name: 'Checkbox方法说明',
          path: '/Checkbox/Explain',
          component: () => import("@/view/Checkbox/Explain.vue")
        },
        {
          name: '默认用法',
          path: '/Checkbox3',
          component: () => import("@/view/Checkbox/Checkbox3.vue")
        },
        {
          name: '按钮样式的多选组合。',
          path: '/Checkbox4',
          component: () => import("@/view/Checkbox/Checkbox4.vue")
        },
        {
          name: 'Select基础用法',
          path: '/Select1',
          component: () => import("@/view/Select/Select1.vue")
        },
        /*   {
            name: 'Select有禁用选项',
            path: '/Select2',
            component: () => import("@/view/Select/Select2.vue")
          },
          {
            name: 'Select可清空单选',
            path: '/Select3',
            component: () => import("@/view/Select/Select3.vue")
          }, */
        {
          name: 'Select自定义模板',
          path: '/Select4',
          component: () => import("@/view/Select/Select4.vue")
        },
        /*    {
             name: 'Select可搜索',
             path: '/Select5',
             component: () => import("@/view/Select/Select5.vue")
           }, */
        {
          name: 'Select方法说明',
          path: '/Select/Explain',
          component: () => import("@/view/Select/Explain.vue")
        },
        {
          name: 'Switch基础用法',
          path: '/Switch1',
          component: () => import("@/view/Switch/Switch1.vue")
        },
        {
          name: 'Switch方法说明',
          path: '/Switch/Explain',
          component: () => import("@/view/Switch/Explain.vue")
        },
        {
          name: '日期',
          path: '/DatePicker1',
          component: () => import("@/view/DatePicker/DatePicker1.vue")
        },
        {
          name: '时间',
          path: '/DatePicker2',
          component: () => import("@/view/DatePicker/DatePicker2.vue")
        },
        /*  {
           name: '日期和时间点',
           path: '/DatePicker3',
           component: () => import("@/view/DatePicker/DatePicker3.vue")
         }, */
        {
          name: '默认的起始与结束时刻',
          path: '/DatePicker4',
          component: () => import("@/view/DatePicker/DatePicker4.vue")
        },
        {
          name: 'DatePicker方法说明',
          path: '/DatePicker/Explain',
          component: () => import("@/view/DatePicker/Explain.vue")
        },
        {
          name: '点击上传',
          path: '/Upload1',
          component: () => import("@/view/Upload/Upload1.vue")
        },
        {
          name: '用户头像上传',
          path: '/Upload2',
          component: () => import("@/view/Upload/Upload2.vue")
        },
        {
          name: '上传文件列表控制',
          path: '/Upload3',
          component: () => import("@/view/Upload/Upload3.vue")
        },
        {
          name: 'Upload方法说明',
          path: '/Upload/Explain',
          component: () => import("@/view/Upload/Explain.vue")
        },
        {
          name: '表单验证',
          path: '/Form1',
          component: () => import("@/view/Form/Form1.vue")
        },
        {
          name: '自定义校验规则',
          path: '/Form2',
          component: () => import("@/view/Form/Form2.vue")
        },
        {
          name: 'Form方法说明',
          path: '/Explain',
          component: () => import("@/view/Form/Explain.vue")
        },
        // hffend
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
        {
          name: '无限滚动加载',
          path: '/infiniteScroll',
          component: () => import("@/view/InfiniteScroll/infiniteScroll.vue")
        },
        {
          name: '图片占位',
          path: '/image',
          component: () => import("@/view/Image/image.vue")
        },
        /**Table路由地址信息 开始*/
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
        },
        {
          name: 'multipleSelection',
          path: '/multipleSelection',
          component: () => import("@/view/Table/multipleSelection.vue")
        },
        {
          name: 'sortTable',
          path: '/sortTable',
          component: () => import("@/view/Table/sortTable.vue")
        },
        {
          name: 'filterTable',
          path: '/filterTable',
          component: () => import("@/view/Table/filterTable.vue")
        },
        {
          name: 'customizeTable',
          path: '/customizeTable',
          component: () => import("@/view/Table/customizeTable.vue")
        },
        {
          name: 'customizeTableHead',
          path: '/customizeTableHead',
          component: () => import("@/view/Table/customizeTableHead.vue")
        },
        {
          name: 'customIndex',
          path: '/customIndex',
          component: () => import("@/view/Table/customIndex.vue")
        },
        {
          name: 'tableAttributes',
          path: '/tableAttributes',
          component: () => import("@/view/Table/tableAttributes.vue")
        },
        /**  Table路由地址信息 结束 */

        /**  Pagination路由地址信息 开始 */
        {
          name: 'general',
          path: '/generalPage',
          component: () => import("@/view/Page/generalPage.vue")
        },
        {
          name: 'adjustPage',
          path: '/adjustPage',
          component: () => import("@/view/Page/adjustPage.vue")
        },
        {
          name: 'inputPage',
          path: '/inputPage',
          component: () => import("@/view/Page/inputPage.vue")
        },
        {
          name: 'fullFunction',
          path: '/fullFunction',
          component: () => import("@/view/Page/fullFunction.vue")
        },
        {
          name: 'pageAttributes',
          path: '/pageAttributes',
          component: () => import("@/view/Page/pageAttributes.vue")
        },
        /**  Pagination路由地址信息 结束 */

        /**  标记路由地址信息 开始 */
        {
          name: 'generalMark',
          path: '/generalMark',
          component: () => import("@/view/Badge/generalMark.vue")
        },
        {
          name: 'maxMark',
          path: '/maxMark',
          component: () => import("@/view/Badge/maxMark.vue")
        },
        {
          name: 'maxAttribute',
          path: '/maxAttribute',
          component: () => import("@/view/Badge/markAttribute.vue")
        },
        /**  标记路由地址信息 结束 */

        /**  加载路由地址信息 开始 */
        {
          name: 'regionLoading',
          path: '/regionLoading',
          component: () => import("@/view/Loading/regionLoading.vue")
        },
        {
          name: 'fullPageLoading',
          path: '/fullPageLoading',
          component: () => import("@/view/Loading/fullPageLoading.vue")
        },
        {
          name: 'loadingAttribute',
          path: '/loadingAttribute',
          component: () => import("@/view/Loading/loadingAttribute.vue")
        },
        /**  标记路由地址信息 结束 */

        /**  MessageBox路由地址信息 结束 */
        {
          name: 'confirmationMessageBox',
          path: '/confirmationMessageBox',
          component: () => import("@/view/MessageBox/confirmationMessageBox.vue")
        },
        {
          name: 'messageBoxAttribute',
          path: '/messageBoxAttribute',
          component: () => import("@/view/MessageBox/messageBoxAttribute.vue")
        },
        /**  MessageBox路由地址信息 开始 */

        /**  Notification路由地址信息 开始 */
        {
          name: 'basicUsage',
          path: '/basicUsage',
          component: () => import("@/view/Notification/basicUsage.vue")
        },
        {
          name: 'statusNotification',
          path: '/statusNotification',
          component: () => import("@/view/Notification/statusNotification.vue")
        },
        {
          name: 'notificationAttributes',
          path: '/notificationAttributes',
          component: () => import("@/view/Notification/notificationAttributes.vue")
        },
        /**  Notification路由地址信息 结束 */

        /**  Tree路由地址信息 开始 */
        {
          name: 'basicTree',
          path: '/basicTree',
          component: () => import("@/view/Tree/basicUsageTree.vue")
        },
        {
          name: 'selectedTree',
          path: '/selectedTree',
          component: () => import("@/view/Tree/selectedTree.vue")
        },
        {
          name: 'nodeFiltering',
          path: '/nodeFiltering',
          component: () => import("@/view/Tree/nodeFilteringTree.vue")
        },
        {
          name: 'treeAttribute',
          path: '/treeAttribute',
          component: () => import("@/view/Tree/treeAttribute.vue")
        },
        /**  Tree路由地址信息 结束 */

        /**  菜单路由地址信息 开始 */
        {
          name: 'topBarMenu',
          path: '/topBarMenu',
          component: () => import("@/view/NavMenu/topBarMenu.vue")
        },
        {
          name: 'sidebarMenu',
          path: '/sidebarMenu',
          component: () => import("@/view/NavMenu/sidebarMenu.vue")
        },
        {
          name: 'navMenuAttribute',
          path: '/navMenuAttribute',
          component: () => import("@/view/NavMenu/navMenuAttribute.vue")
        },
        /**  菜单路由地址信息 结束 */
        {
          name: 'Tab',
          path: '/Tab',
          component: () => import("@/view/Tabs/tab.vue")
        },
        {
          name: 'tabPosition',
          path: '/tabPosition',
          component: () => import("@/view/Tabs/tabPosition.vue")
        },
        {
          name: 'tabsAttributes',
          path: '/tabsAttributes',
          component: () => import("@/view/Tabs/tabsAttributes.vue")
        },
        {
          name: 'pageHeader',
          path: '/pageHeader',
          component: () => import("@/view/PageHeader/pageHeader.vue")
        },
        {
          name: 'pageheaderAttributes',
          path: '/pageheaderAttributes',
          component: () => import("@/view/PageHeader/pageheaderAttributes.vue")
        },
        {
          name: 'dropdown',
          path: '/dropdown',
          component: () => import("@/view/Dropdown/dropdown.vue")
        },
        {
          name: 'buttondropdown',
          path: '/buttondropdown',
          component: () => import("@/view/Dropdown/buttondropdown.vue")
        },
        {
          name: 'dropdownAttributes',
          path: '/dropdownAttributes',
          component: () => import("@/view/Dropdown/dropdownAttributes.vue")
        },
        {
          name: 'steps',
          path: '/steps',
          component: () => import("@/view/Steps/steps.vue")
        },
        {
          name: 'simplesteps',
          path: '/simplesteps',
          component: () => import("@/view/Steps/simplesteps.vue")
        },
        {
          name: 'stepsAttributes',
          path: '/stepsAttributes',
          component: () => import("@/view/Steps/stepsAttributes.vue")
        },
        {
          name: 'formdialog',
          path: '/formdialog',
          component: () => import("@/view/Dialog/formdialog.vue")
        },
        {
          name: 'nestingdialog',
          path: '/nestingdialog',
          component: () => import("@/view/Dialog/nestingdialog.vue")
        },
        {
          name: 'dialogAttributes',
          path: '/dialogAttributes',
          component: () => import("@/view/Dialog/dialogAttributes.vue")
        },
        {
          name: 'tooltip',
          path: '/tooltip',
          component: () => import("@/view/Tooltip/tooltip.vue")
        },
        {
          name: 'tooltipAttributes',
          path: '/tooltipAttributes',
          component: () => import("@/view/Tooltip/tooltipAttributes.vue")
        },
        {
          name: 'popover',
          path: '/popover',
          component: () => import("@/view/Popover/popover.vue")
        },
        {
          name: 'popoverAttributes',
          path: '/popoverAttributes',
          component: () => import("@/view/Popover/popoverAttributes.vue")
        },
        {
          name: 'collapse',
          path: '/collapse',
          component: () => import("@/view/Collapse/collapse.vue")
        },
        {
          name: 'collapseAttributes',
          path: '/collapseAttributes',
          component: () => import("@/view/Collapse/collapseAttributes.vue")
        },
        {
          name: 'divider',
          path: '/divider',
          component: () => import("@/view/Divider/divider.vue")
        },
        {
          name: 'verticaldivider',
          path: '/verticaldivider',
          component: () => import("@/view/Divider/verticaldivider.vue")
        },
        {
          name: 'dividerAttributes',
          path: '/dividerAttributes',
          component: () => import("@/view/Divider/dividerAttributes.vue")
        },
        {
          name: 'infiniteScroll',
          path: '/infiniteScroll',
          component: () => import("@/view/InfiniteScroll/infiniteScroll.vue")
        },
        {
          name: 'infiniteScrollAttributes',
          path: '/infiniteScrollAttributes',
          component: () => import("@/view/InfiniteScroll/infiniteScrollAttributes.vue")
        },
        {
          name: 'image',
          path: '/image',
          component: () => import("@/view/Image/image.vue")
        },
        {
          name: 'imageAttributes',
          path: '/imageAttributes',
          component: () => import("@/view/Image/imageAttributes.vue")
        },
        {
          name: 'formDemo',
          path: '/formDemo',
          component: () => import("@/view/Form/formDemo.vue")
        }
      ]
    }
  ]
})
