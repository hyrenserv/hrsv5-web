<template>
   <div>
       <el-row style="margin-bottom:10px">
                <el-col :span='15'>&nbsp;</el-col>
                <el-col :span='5' style="text-align:right">
                    <el-input placeholder="请输入内容"  class="input-with-select" size="mini">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span='4' style="text-align:right" class='allbutton'>
                    <el-button size="mini" type="success" class="el-icon-upload">发布分类</el-button>
                    <el-button size="mini"  type="primary" class='el-icon-circle-plus-outline' @click="dialogaddclassableVisible=true">新增分类</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border size='medium' style="min-height: 400px;" class='outtable' >
                    <el-table-column width="55" align="center" prop="selectionState">
                        <template slot="header" slot-scope="scope">
                            <el-checkbox @change="Allis_selectionStateFun(tableData,Allis_selectionState)" v-model="Allis_selectionState" :checked="Allis_selectionState"></el-checkbox>
                        </template>
                        <template slot-scope="scope">
                            <el-checkbox :checked="scope.row.selectionState" v-model="scope.row.selectionState" @change="evercheck(scope.row.selectionState,scope.row.table_name)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" align="center" width="60">
                        <template scope="scope">
                            <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="Categoryparent" label="上级分类名" align="center">
                    </el-table-column>
                    <el-table-column prop="Standardnumber" label="分类层级数" align="center">
                    </el-table-column>
                    <el-table-column prop="ch_name" label="分类名称" align="center">
                    </el-table-column>
                    <el-table-column prop="Standardalias" label="分类描述" align="center">
                    </el-table-column>
                    <el-table-column prop="datatype" label="创建人" align="center">
                    </el-table-column>
                     <el-table-column prop="datatime" label="创建时间" align="center">
                    </el-table-column>
                    <el-table-column prop="Releasestatus" label="发布状态" align="center" column-key='Releasestatus' :filters="Releasestatus" :filter-multiple="false">
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="dialogEditTableVisible=true">编辑</el-button>
                            <el-button type="text" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" class='locationcenter'></el-pagination>
            </el-row>
            <!-- 新增分类 -->
            <el-dialog title="报表日期" :visible.sync="dialogaddclassableVisible" width="50%" class='data_edit'>
        <el-row>
                <el-form ref="form"  label-width="80px">
                     <el-row :gutter="20">
                            <el-col :span="16">
                                <el-row>
                                <el-form-item label="归属分类 : ">
                                    <el-cascader :options="options" clearable   :props="{ checkStrictly: true }"></el-cascader>
                                </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span='16'>
                                <el-row>
                                    <el-form-item label="中文名称 : ">
                                        <el-input placeholder="中文名称" >
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left: 0;">
                            <el-col >
                                <el-form-item label="标准描述 : ">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容"  style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                </el-form>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini">保存</el-button>
        </div>
    </el-dialog>
   </div>
</template>
<script>
export default {
    data(){
       return{
          currentPage: 1,
            pagesize: 10,
            Allis_selectionState: false,
            dialogaddclassableVisible: false,
              tableData: [{
                Categoryparent: '3级分类',
                Standardnumber: 'IP500004',
                ch_name: '报表日期',
                Standardalias: '报表日期123',
                datatype: '代码类',
                datatime:'2019-09-01',
                Releasestatus: '未发布',
                selectionState: false,
            }, ],
               Releasestatus: [{
                text: '未发布',
                value: '01'
            }, {
                text: '已发布',
                value: '02'
            }, ],
             options: [{
                value: 'zhinan',
                label: '指南',
                children: [{
                    value: 'shejiyuanze',
                    label: '设计原则',
                    children: [{
                        value: 'yizhi',
                        label: '一致'
                    }, {
                        value: 'fankui',
                        label: '反馈'
                    }, {
                        value: 'xiaolv',
                        label: '效率'
                    }, {
                        value: 'kekong',
                        label: '可控'
                    }]
                }, {
                    value: 'daohang',
                    label: '导航',
                    children: [{
                        value: 'cexiangdaohang',
                        label: '侧向导航'
                    }, {
                        value: 'dingbudaohang',
                        label: '顶部导航'
                    }]
                }]
            }, {
                value: 'zujian',
                label: '组件',
                children: [{
                    value: 'basic',
                    label: 'Basic',
                    children: [{
                        value: 'layout',
                        label: 'Layout 布局'
                    }, {
                        value: 'color',
                        label: 'Color 色彩'
                    }, {
                        value: 'typography',
                        label: 'Typography 字体'
                    }, {
                        value: 'icon',
                        label: 'Icon 图标'
                    }, {
                        value: 'button',
                        label: 'Button 按钮'
                    }]
                }, {
                    value: 'form',
                    label: 'Form',
                    children: [{
                        value: 'radio',
                        label: 'Radio 单选框'
                    }, {
                        value: 'checkbox',
                        label: 'Checkbox 多选框'
                    }, {
                        value: 'input',
                        label: 'Input 输入框'
                    }, {
                        value: 'input-number',
                        label: 'InputNumber 计数器'
                    }, {
                        value: 'select',
                        label: 'Select 选择器'
                    }, {
                        value: 'cascader',
                        label: 'Cascader 级联选择器'
                    }, {
                        value: 'switch',
                        label: 'Switch 开关'
                    }, {
                        value: 'slider',
                        label: 'Slider 滑块'
                    }, {
                        value: 'time-picker',
                        label: 'TimePicker 时间选择器'
                    }, {
                        value: 'date-picker',
                        label: 'DatePicker 日期选择器'
                    }, {
                        value: 'datetime-picker',
                        label: 'DateTimePicker 日期时间选择器'
                    }, {
                        value: 'upload',
                        label: 'Upload 上传'
                    }, {
                        value: 'rate',
                        label: 'Rate 评分'
                    }, {
                        value: 'form',
                        label: 'Form 表单'
                    }]
                }, {
                    value: 'data',
                    label: 'Data',
                    children: [{
                        value: 'table',
                        label: 'Table 表格'
                    }, {
                        value: 'tag',
                        label: 'Tag 标签'
                    }, {
                        value: 'progress',
                        label: 'Progress 进度条'
                    }, {
                        value: 'tree',
                        label: 'Tree 树形控件'
                    }, {
                        value: 'pagination',
                        label: 'Pagination 分页'
                    }, {
                        value: 'badge',
                        label: 'Badge 标记'
                    }]
                }, {
                    value: 'notice',
                    label: 'Notice',
                    children: [{
                        value: 'alert',
                        label: 'Alert 警告'
                    }, {
                        value: 'loading',
                        label: 'Loading 加载'
                    }, {
                        value: 'message',
                        label: 'Message 消息提示'
                    }, {
                        value: 'message-box',
                        label: 'MessageBox 弹框'
                    }, {
                        value: 'notification',
                        label: 'Notification 通知'
                    }]
                }, {
                    value: 'navigation',
                    label: 'Navigation',
                    children: [{
                        value: 'menu',
                        label: 'NavMenu 导航菜单'
                    }, {
                        value: 'tabs',
                        label: 'Tabs 标签页'
                    }, {
                        value: 'breadcrumb',
                        label: 'Breadcrumb 面包屑'
                    }, {
                        value: 'dropdown',
                        label: 'Dropdown 下拉菜单'
                    }, {
                        value: 'steps',
                        label: 'Steps 步骤条'
                    }]
                }, {
                    value: 'others',
                    label: 'Others',
                    children: [{
                        value: 'dialog',
                        label: 'Dialog 对话框'
                    }, {
                        value: 'tooltip',
                        label: 'Tooltip 文字提示'
                    }, {
                        value: 'popover',
                        label: 'Popover 弹出框'
                    }, {
                        value: 'card',
                        label: 'Card 卡片'
                    }, {
                        value: 'carousel',
                        label: 'Carousel 走马灯'
                    }, {
                        value: 'collapse',
                        label: 'Collapse 折叠面板'
                    }]
                }]
            }, {
                value: 'ziyuan',
                label: '资源',
                children: [{
                    value: 'axure',
                    label: 'Axure Components'
                }, {
                    value: 'sketch',
                    label: 'Sketch Templates'
                }, {
                    value: 'jiaohu',
                    label: '组件交互文档'
                }]
            }]
       }
    },
    methods:{
         sig_handleSizeChange(size) {
            this.pagesize = size;
        },
        sig_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
    }
}
</script>
<style scoped>

</style>