/**
 * 定义菜单的数据结构
 * 这里的数据后期会从后台返回
 * 
 */
const Menu = [
    {
        icon: 'el-icon-setting22', title: 'Form 表单', path: '/10', children: [
            { icon: 'el-icon-setting2', title: '表单验证', path: '/Form1' },
            { icon: 'el-icon-setting2', title: '自定义校验规则', path: '/Form2' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Form/Explain' }
        ]
    },
    {
        title: 'Table 表格', path: '/11', children: [
            /*  { title: '带斑马纹表格', path: '/zebrapattern' },
             { title: '带边框表格', path: '/frame' }, */
            // { title: '带状态表格', path: '/statuTable' },
            /*  { title: '固定表头', path: '/fixedHead' },
             { title: '固定列', path: '/fixedColumn' },
             { title: '固定列和表头', path: '/fixedHeadColumn' }, */
            // { title: '流体高度', path: '/' },
            /*  { title: '多选表格', path: '/multipleSelection' },
             { title: '排序表格', path: '/sortTable' }, */
            { title: '默认表格', path: '/filterTable' },
            { title: '自定义列模板', path: '/customizeTable' },
            // { title: '展开行', path: '/' },
            { title: '自定义表头', path: '/customizeTableHead' },
            { title: '自定义索引', path: '/customIndex' },
            { title: '表格属性', path: '/tableAttributes' }
        ]
    },
    {
        title: 'NavMenu 导航菜单', path: '/20', children: [
            { title: '顶栏菜单', path: '/topBarMenu' },
            { title: '侧栏菜单', path: '/sidebarMenu' },
            { title: '菜单属性', path: '/navMenuAttribute' }
        ]
    },
    {
        title: 'Tree 树形控件', path: '/19', children: [
            // { title: '基础用法', path: '/basicTree' },
            { title: '节点过滤', path: '/nodeFiltering' },
            { title: '选择用法', path: '/selectedTree' },
        
            { title: 'Tree属性', path: '/treeAttribute' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'DatePicker 日期选择器', path: '/8', children: [
            { icon: 'el-icon-setting2', title: '日期', path: '/DatePicker1' },
            { icon: 'el-icon-setting2', title: '时间', path: '/DatePicker2' },
            { icon: 'el-icon-setting2', title: '时间区间', path: '/DatePicker4' },
            // { icon: 'el-icon-setting2', title: '日期和时间点', path: '/DatePicker3' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/DatePicker/Explain' }
        ]
    },
    {
        title: 'MessageBox 弹框', path: '/17', children: [
            { title: '确认弹框', path: '/confirmationMessageBox' },
            { title: '弹框参数属性', path: '/messageBoxAttribute' },
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Dialog 对话框', path: '/25', children: [
            { icon: 'el-icon-setting22', title: '嵌入表单对话框', path: '/formdialog' },
            { icon: 'el-icon-setting22', title: '嵌套对话框', path: '/nestingdialog' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/dialogAttributes' },
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Tabs 标签页', path: '/21', children: [
            { icon: 'el-icon-setting22', title: '基础选项卡', path: '/Tab' },
            // { icon: 'el-icon-setting22', title: '位置变换选项卡', path: '/tabPosition' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/tabsAttributes' },

        ]
    },
    {
        icon: 'el-icon-setting', title: 'Layout 布局', path: '/1', children: [
            { icon: 'el-icon-setting2', title: '基础布局', path: '/Layout1' },
            { icon: 'el-icon-setting2', title: '分栏间隔', path: '/Layout2' },
            { icon: 'el-icon-setting2', title: '混合布局', path: '/Layout3' },
            { icon: 'el-icon-setting2', title: '分栏偏移', path: '/Layout4' },
            { icon: 'el-icon-setting2', title: '对齐方式', path: '/Layout5' },
            { icon: 'el-icon-setting2', title: '响应式布局', path: '/Layout6' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Layout/Explain' }
        ]
    },
    {
        icon: 'el-icon-setting', title: 'Container 布局容器', path: '/2', children: [
            { icon: 'el-icon-setting2', title: '常见页面布局', path: '/Container1' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Container/Explain' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Button 按钮', path: '/3', children: [
            { icon: 'el-icon-setting2', title: 'Button基础用法', path: '/Button1' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Button/Explain' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Radio 单选框', path: '/4', children: [
            { icon: 'el-icon-setting2', title: 'Radio基础用法', path: '/Radio1' },
            { icon: 'el-icon-setting2', title: 'Radio按钮样式', path: '/Radio2' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Radio/Explain' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Checkbox 多选框', path: '/5', children: [
          /*   { icon: 'el-icon-setting2', title: 'Checkbox基础用法', path: '/Checkbox1' },
            { icon: 'el-icon-setting2', title: 'Checkbox多选框组', path: '/Checkbox2' }, */
            { icon: 'el-icon-setting2', title: '默认用法', path: '/Checkbox3' },
            { icon: 'el-icon-setting2', title: '按钮样式的多选组合。', path: '/Checkbox4' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Checkbox/Explain' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Select 选择器', path: '/6', children: [
            { icon: 'el-icon-setting2', title: 'Select基础用法', path: '/Select1' },
            /*  { icon: 'el-icon-setting2', title: 'Select有禁用选项', path: '/Select2' },
             { icon: 'el-icon-setting2', title: 'Select可清空单选', path: '/Select3' }, */
            { icon: 'el-icon-setting2', title: 'Select自定义模板', path: '/Select4' },
            /*  { icon: 'el-icon-setting2', title: 'Select可搜索', path: '/Select5' }, */
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Select/Explain' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Switch 开关', path: '/7', children: [
            { icon: 'el-icon-setting2', title: 'Switch基础用法', path: '/Switch1' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Switch/Explain' }
        ]
    },
    
    {
        icon: 'el-icon-setting22', title: 'Upload 上传', path: '/9', children: [
            { icon: 'el-icon-setting2', title: 'Upload点击上传', path: '/Upload1' },
            { icon: 'el-icon-setting2', title: 'Upload用户头像上传', path: '/Upload2' },
            { icon: 'el-icon-setting2', title: 'Upload上传文件列表控制', path: '/Upload3' },
            { icon: 'el-icon-setting2', title: '方法说明', path: '/Upload/Explain' }
        ]
    },
    
    
    // {
    //     title: 'Tag 标签', path: '/12',children : [
    //         {title: 'Pagination 分页--13', path: '/13'},
    //     ]
    // },
    /* {
        title: 'Pagination 分页', path: '/13', children: [
            { title: '普通分页', path: '/generalPage' },
            { title: '调整条数分页', path: '/adjustPage' },
            { title: '输入页码跳转分页', path: '/inputPage' },
            { title: '完整分页功能', path: '/fullFunction' },
            { title: '分页属性', path: '/pageAttributes' }
        ]
    }, */
    {
        title: 'Badge 标记', path: '/14', children: [
            { title: '普通标记显示', path: '/generalMark' },
            { title: '最大限制标记显示', path: '/maxMark' },
            { title: '标记属性', path: '/maxAttribute' },
        ]
    },
    {
        title: 'Loading 加载', path: '/15', children: [
            { title: '区域加载', path: '/regionLoading' },
            { title: '整页加载', path: '/fullPageLoading' },
            { title: '加载属性', path: '/loadingAttribute' },
        ]
    },
    // {
    //     title: 'Message 消息提示--16', path: '/16', children: [
    //         { title: '整页加载', path: '/fullPageLoading' },
    //         { title: '加载属性', path: '/loadingAttribute' },
    //     ]
    // },
    
    {
        title: 'Notification 通知', path: '/18', children: [
            { title: '基本用法', path: '/basicUsage' },
            { title: '带有状态的用法', path: '/statusNotification' },
            { title: '参数属性', path: '/notificationAttributes' },
        ]
    },
    
    {
        icon: 'el-icon-setting22', title: 'PageHeader 页头', path: '/22', children: [
            { icon: 'el-icon-setting22', title: '基础页头', path: '/pageHeader' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/pageheaderAttributes' }

        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Dropdown 下拉菜单', path: '/23', children: [
            { icon: 'el-icon-setting22', title: '基础下拉菜单', path: '/dropdown' },
            { icon: 'el-icon-setting22', title: '按钮下拉菜单', path: '/buttondropdown' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/dropdownAttributes' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Steps 步骤条', path: '/24', children: [
            { icon: 'el-icon-setting22', title: '基础步骤条', path: '/steps' },
            { icon: 'el-icon-setting22', title: '简单步骤条', path: '/simplesteps' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/stepsAttributes' }

        ]
    },
    
    {
        icon: 'el-icon-setting22', title: 'Tooltip 文字提示', path: '/26', children: [
            { icon: 'el-icon-setting22', title: '文字提示信息', path: '/tooltip' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/tooltipAttributes' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Popover 弹出框', path: '/27', children: [
            { icon: 'el-icon-setting22', title: '基本弹出框', path: '/popover' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/popoverAttributes' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Collapse 折叠面板', path: '/28', children: [
            { icon: 'el-icon-setting22', title: '手风琴', path: '/collapse' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/collapseAttributes' }

        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Divider 分割线', path: '/29', children: [
            { icon: 'el-icon-setting22', title: '基础分割线', path: '/divider' },
            { icon: 'el-icon-setting22', title: '垂直分割线', path: '/verticaldivider' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/dividerAttributes' },
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Image 图片', path: '/30', children: [
            { icon: 'el-icon-setting22', title: '图片占位', path: '/image' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/imageAttributes' },

        ]
    },
    {
        icon: 'el-icon-setting22', title: 'InfiniteScroll 无限滚动', path: '/31', children: [
            { icon: 'el-icon-setting22', title: '无限滚动加载', path: '/infiniteScroll' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/infiniteScrollAttributes' }

        ]
    },
    { title: '表单测试',icon: 'el-icon-setting', path: '/demo' }
]

export default Menu;