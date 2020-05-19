# hrsv5-web

### 1、api写法
- 前端包名定义，hrds/项目（a、b等）/功能模块（syspara）
- 功能模块文件夹下，是定义一个“与功能模块一致的js”（syspara.js）和 无数.vue

### 2、api写法
- 所有api访问后台，只需要知道项目/功能/方法，如/A/syspara/getSysPara
- method: 'post' 不要再写了,在request.js里面已经封装好了...默认就是post

### 3、页面代码规范
- 所有页面不允许有对按钮、表格、下拉框、复选框等等元素颜色、样式的定义
- 确认框、提示框等需要提出公共进行使用

### 4、所有的错误不需要再判断了,直接取值...只需要对你自己取得值判断是否为空
  - 如果你重写了错误消息,会导致后台返回的具体错误信息看不到

### 5、对于删除,更新,删除确认,保存成功的操作请使用 utils/js/message.js,里面封装的方法
  * 后续使用方式 : 
    * 删除成功 : `this.$Msg.deleteSuccess(res);`
    * 更新成功 : `this.$Msg.updateSuccess(res);`
    * 保存成功 : `this.$Msg.saveSuccess(res);`
    * 删除确认 : `this.$Msg.confirmMsg(titleMsg);`
    * 自定义   : `this.$Msg.customizTitle(titleMsg,type);`,type有(success,warning,error)三种,或不填写使用默认
### 6、获取代码项功能的公共方法..后续添加请在 utils/js/codeitems.js 中添加
  * 使用方式 :
    * `this.$Code.方法名称`
### 7、代码请注意格式化,保证代码格式的统一, 请统一使用vue-format格式化插件
### 8、页面样式统一（el-main已经加了间距，每一个显示在内容区的单页面不允许在给外层增加边距）
     8.1 el-main内容区顶部标题直接复制下面代码修改里面显示文字和跳转链接即可
     <el-row class='topTitle'>
        <span class='el-icon-location'>表结构对标</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
      8.2 树形控件样式直接复制下面代码（样式在类名mytree和span-ellipsis）
     <div class="mytree" hight='200'>
                    <el-tree class="filter-tree" :empty-text='tip' :data="data" :indent='0' :props="data" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
      8.3 弹框标题样式，直接复制下面代码（样式在类名dialogtitle,dialogtoptst,dialogtopname中）
       <div slot="title" >
                        <span class="dialogtitle el-icon-caret-right">定义分页抽取SQL</span>
                        <span class="dialogtoptxt">
                            表名:
                            <p class="dialogtopname">{{EXtable_name}}</p>
                        </span>
        </div>



###/* ------ button -------------- */

#####/* 按钮设置样式的class名称,需要给button设置class="elButton"实现更改样式*/
#####/*按钮大小设置需在el-button标签设置size属性实现*/
#####/*删除 确定 取消 可以通过设置button的type属性实现*/
.elButton{
 
}

