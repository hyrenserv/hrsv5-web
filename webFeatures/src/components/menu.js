/**
 * 定义菜单的数据结构
 * 这里的数据后期会从后台返回
 * 
 */
const Menu = [

    {
        icon: 'el-icon-setting22', title: 'Layout 布局', path: '/1', children: [
            { icon: 'el-icon-setting22', title: '基础布局', path: '/zebrapattern' },
            { icon: 'el-icon-setting22', title: '分栏间隔', path: '/zebrapattern2' },
            { icon: 'el-icon-setting22', title: '混合布局', path: '/Layout3' },
            { icon: 'el-icon-setting22', title: '混合布局', path: '/Layout4' },
            { icon: 'el-icon-setting22', title: '分栏偏移', path: '/Layout5' }
        ]
    },
    { icon: 'el-icon-setting22', title: 'Container 布局容器', path: '/2' },
    { icon: 'el-icon-setting22', title: 'Button 按钮', path: '/3' },
    { icon: 'el-icon-setting22', title: 'Radio 单选框', path: '/4' },
    { icon: 'el-icon-setting22', title: 'Checkbox 多选框', path: '/5' },
    { icon: 'el-icon-setting22', title: 'Select 选择器', path: '/6' },
    { icon: 'el-icon-setting22', title: 'Switch 开关', path: '/7' },
    { icon: 'el-icon-setting22', title: 'DatePicker 日期选择器', path: '/8' },
    { icon: 'el-icon-setting22', title: 'Upload 上传', path: '/9' },
    { icon: 'el-icon-setting22', title: 'Form 表单', path: '/10' },
    {
        icon: 'el-icon-setting22', title: 'Table 表格--11', path: '/11', children: [
            { icon2: 'el-icon-setting22', title: '带斑马纹表格', path: '/zebrapattern' },
            { icon2: 'el-icon-setting22', title: '带边框表格', path: '/frame' },
            // { icon2: 'el-icon-setting22', title: '带状态表格', path: '/statuTable' },
            { icon2: 'el-icon-setting22', title: '固定表头', path: '/fixedHead' },
            { icon2: 'el-icon-setting22', title: '固定列', path: '/fixedColumn' },
            { icon2: 'el-icon-setting22', title: '固定列和表头', path: '/fixedHeadColumn' },
            { icon2: 'el-icon-setting22', title: '流体高度', path: '/' },
            { icon2: 'el-icon-setting22', title: '多选表格', path: '/' },
            { icon2: 'el-icon-setting22', title: '排序表格', path: '/' },
            { icon2: 'el-icon-setting22', title: '筛选表格', path: '/' },
            { icon2: 'el-icon-setting22', title: '自定义列模板', path: '/' },
            { icon2: 'el-icon-setting22', title: '展开行', path: '/' },
            { icon2: 'el-icon-setting22', title: '自定义表头', path: '/' },
            { icon2: 'el-icon-setting22', title: '自定义索引', path: '/' },
            { icon2: 'el-icon-setting22', title: '表格属性', path: '/' }
        ]
    },
    {
        icon: 'el-icon-setting22', title: 'Tag 标签--12', path: '/12'
    },
    { icon: 'el-icon-setting22', title: 'Pagination 分页--13', path: '/13' },
    { icon: 'el-icon-setting22', title: 'Badge 标记--14', path: '/14' },
    { icon: 'el-icon-setting22', title: 'Loading 加载--15', path: '/15' },
    { icon: 'el-icon-setting22', title: 'Message 消息提示--16', path: '/16' },
    { icon: 'el-icon-setting22', title: 'MessageBox 弹框--17', path: '/17' },
    { icon: 'el-icon-setting22', title: 'Notification 通知--18', path: '/18' },
    { icon: 'el-icon-setting22', title: 'Tree 树形控件--19', path: '/19' },
    { icon: 'el-icon-setting22', title: 'NavMenu 导航菜单--20', path: '/20' },
       // 21--31路由设置开始
    {
        icon: 'el-icon-setting22', title: 'Tabs 标签页', path: '/21', children: [
            { icon: 'el-icon-setting22', title: '基础选项卡', path: '/Tab' },
            { icon: 'el-icon-setting22', title: '位置变换选项卡', path: '/tabPosition' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/tabsAttributes' },

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
        icon: 'el-icon-setting22', title: 'Dialog 对话框', path: '/25', children: [
            { icon: 'el-icon-setting22', title: '基础对话框', path: '/basedialog' },
            { icon: 'el-icon-setting22', title: '嵌入表单对话框', path: '/formdialog' },
            { icon: 'el-icon-setting22', title: '嵌套对话框', path: '/nestingdialog' },
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/dialogAttributes' },
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
            { icon: 'el-icon-setting22', title: '属性方法说明', path: '/popoverAttributes'}
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
    } // 21--31路由设置完
]

export default Menu;