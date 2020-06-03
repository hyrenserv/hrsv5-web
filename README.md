# hrsweb-5.0

本分支为发布后的分支，修改bug等需要通过pr的方式进行提交

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
- 8.1 el-main内容区顶部标题直接复制下面代码修改里面显示文字和跳转链接即可
     ```css
     <el-row class='topTitle'>
        <span class='el-icon-location'>表结构对标</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
     ```
- 8.2 树形控件样式直接复制下面代码（样式在类名mytree和span-ellipsis）
     ```css
     <div class="mytree" hight='200'>
                    <el-tree class="filter-tree" :empty-text='tip' :data="data" :indent='0' :props="data" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
   ```
- 8.3 弹框标题样式，直接复制下面代码（样式在类名dialogtitle,dialogtoptst,dialogtopname中）
      ```css
       <div slot="title" >
                        <span class="dialogtitle el-icon-caret-right">定义分页抽取SQL</span>
                        <span class="dialogtoptxt">
                            表名:
                            <p class="dialogtopname">{{EXtable_name}}</p>
                        </span>
        </div>
      ```
### 9、公共树组件
引入树组件：```import Tree from '../../components/tree/tree.vue';```

注册树组件：```components: {Tree},```

页面使用：```<Tree ref='treefun' v-on:eventName="myFunction" :blongs='blongs'></Tree>```

data中数据： 
```
 data() {
        return {
            blongs:'websql',//哪个页面使用的组件传对应后台需要的参数
            dataByTableName: [],
        }
    },
    
methods中写方法拿到点击树节点对应json数据： 
```
      methods: {
        myFunction: function (data) {
            this.dataByTableName = data //点击树节点，得到对应数据，自行处理数据
        }
    }
      
      
### 10、系统样式定义
### 1、button
- 按钮设置样式的class名称,需要给button设置class="elButton"实现更改样式
- 按钮大小设置需在el-button标签设置size属性实现
- 删除 确定 取消 可以通过设置button的type属性实现
 ```css
.elButton{
 
}
```
### 2、table
- 表格表头样式,不需要添加属性即可更改，如有特别样式请自行设置class名谢谢
 ```css
/* .el-table th{
  background-color: black !important;
} */
```
- 斑马纹样式，需要在table里面写stripe属性然后在这里实现样式的更改
 ```css
.el-table--striped .el-table__body tr.el-table__row--striped td{
  
}
```
- 表格td样式，不需要添加属性即可更改
 ```css
 .el-table--enable-row-transition .el-table__body td{
    background-color: cyan;
}
```
- 其他表格鼠标划入时的颜色，不需要添加属性即可更改
 ```css
.el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color:cyan !important;
}
```
- 默认表格鼠标划入时的颜色，不需要添加属性即可更改
 ```css
.el-table__body tr.hover-row.current-row>td,.el-table__body tr.hover-row.el-table__row--striped.current-row>td,.el-table__body tr.hover-row.el-table__row--striped>td,.el-table__body tr.hover-row>td{
    
}
```
### 3、radio
- 单选框默认样式设置，不需要添加属性，可以直接更改
 ```css
.el-radio__inner{

}
```
- 单选框默认字体样式设置，不需要添加属性，可以直接更改
 ```css
.el-radio__label{

}
```
- 单选框选中样式设置，不需要添加属性，可以直接更改
 ```css
.el-radio__input.is-checked .el-radio__inner{
   
}
```
- 单选框选中字体样式设置，不需要添加属性，可以直接更改
 ```css
.el-radio__input.is-checked+.el-radio__label {
    
}
```

- 如果需要只设置单独的某一个radio，需要在el-radio添加id="manuallyChange"实现
- 单选框样式设置 
 ```css
#manuallyChange .el-radio__inner{
 
}
```

- 单选框字体样式设置
 ```css
#manuallyChange .el-radio__label{
    
}
```

- 单选框选中样式设置
 ```css
#manuallyChange .el-radio__input.is-checked .el-radio__inner{
    /* border-color:rgb(83, 168, 33);
    background: rgb(83, 168, 33); */
}
```
- 单选框选中字体样式设置
 ```css
#manuallyChange .el-radio__input.is-checked+ .el-radio__label {
    /* color: rgb(83, 168, 33); */
}
```
### 4、message
- 在更改样式之前，需要在methods的方法this.$confirm里添加cancelButtonClass或者confirmButtonClass
- message取消按钮的默认样式
 ```css
.btn-cancel{
    background-color: #F56C6C;
    color: #FFFFFF;
    border: 1px solid #F56C6C;
}
.btn-cancel:hover{
    background-color: #F56C6C;
    color: #FFFFFF; 
    border: 1px solid #F56C6C;
}
```
- message确认按钮的默认样式
 ```css
.btn-confirm{

}
```
### 5、input

- input表单验证提示信息样式，不需要添加属性，可以直接更改
 ```css
.el-form-item__error{

}
```
- input表单验证提示信息样式边框，不需要添加属性，可以直接更改
 ```css
.el-form-item.is-error .el-input__inner,.el-form-item.is-error .el-textarea__inner{
/* border-color: blue; */
}
```
### 6、checkbox
- 复选框默认样式设置，不需要添加属性，可以直接更改
 ```css
.el-checkbox__inner{

}
```
- 复选框默认字体样式设置，不需要添加属性，可以直接更改
 ```css
.el-checkbox__label {

}
```
- 复选框默认选中样式设置，不需要添加属性，可以直接更改
 ```css
.el-checkbox__input.is-checked .el-checkbox__inner{

} 
```
- 复选框字体默认选中样式设置，不需要添加属性，可以直接更改
 ```css
.el-checkbox__input.is-checked+.el-checkbox__label {
    
}
```
- 如果需要只设置单独的某一个复选框，需要在el-checkbox添加id="manuallyChangeck"实现
- 复选框样式设置
 ```css
#manuallyChangeck .el-checkbox__inner{

}
```
- 复选框字体样式设置
 ```css
#manuallyChangeck .el-checkbox__label {

}
```
- 复选框选中样式设置
 ```css
#manuallyChangeck .el-checkbox__input.is-checked .el-checkbox__inner{
  
}
```
- 复选框选中字体设置
 ```css
#manuallyChangeck .el-checkbox__input.is-checked+.el-checkbox__label {
  
}
```
### 7、tab选项卡
- 选项卡的默认样式
 ```css
.el-tabs__nav-scroll{

}
```
- 选项卡的选中默认样式
 ```css
.el-tabs--border-card>.el-tabs__header .el-tabs__item.is-active{
    /* background-color: chartreuse;
    color: coral; */
}
```
