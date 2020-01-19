<template>
<div id='nameTable'>
    <el-row :gutter='20'>
        <el-col :span='4'>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
            </el-input>
            <div class="mytree">
                <el-tree class="filter-tree" :data="data" :indent='0' :props="defaultProps" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree">
                </el-tree>
            </div>
        </el-col>
        <el-col :span='20' style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
            <el-row style="margin-bottom:10px">
                <el-col :span='9'>&nbsp;</el-col>
                <el-col :span='5' style="text-align:right">
                    <el-input placeholder="请输入内容"  class="input-with-select" size="mini">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span='10' style="text-align:right" class='allbutton'>
                    <el-button size="mini"  type="primary" plain>批量导入</el-button>
                    <el-button size="mini" type="success" class="el-icon-upload">发布标准</el-button>
                    <el-button size="mini" type="success" class='el-icon-circle-plus-outline'>新增标准</el-button>
                    <el-button size="mini" type="danger" class='el-icon-remove-outline'>删除标准</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border size='medium' style="min-height: 400px;">
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
                    <el-table-column prop="Categoryparent" label="上级分类" align="center">
                    </el-table-column>
                    <el-table-column prop="Standardnumber" label="标准编号" align="center">
                    </el-table-column>
                    <el-table-column prop="ch_name" label="中文名称" align="center">
                    </el-table-column>
                    <el-table-column prop="Standardalias" label="标准别名" align="center">
                    </el-table-column>
                    <el-table-column prop="datatype" label="数据类型" align="center">
                    </el-table-column>
                    <el-table-column prop="Releasestatus" label="发布状态" align="center" column-key='Releasestatus' :filters="Releasestatus" :filter-multiple="false">
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="dialogEditTableVisible=true">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" class='locationcenter'></el-pagination>
            </el-row>
        </el-col>
    </el-row>
    <!-- 编辑的弹框 -->
    <el-dialog title="报表日期" :visible.sync="dialogEditTableVisible" width="70%" class='data_edit'>
        <el-row>
            <el-collapse v-model="activeNames">
                <el-form ref="form"  label-width="80px">
                    <el-collapse-item title="基本信息" name="1">
                        <div slot="title">
                            <span class="el-icon-edit zdtitle">基本信息</span>
                        </div>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="标准编号 : ">
                                        <el-input placeholder="标准编号"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="中文名称 : ">
                                        <el-input placeholder="中文名称" size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="英文名称 : ">
                                        <el-input placeholder="英文名称"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="英文名称 : ">
                                        <el-input placeholder="标准别名" size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="归属分类 : ">
                                    <el-cascader :options="options" clearable size='mini'></el-cascader>
                                </el-form-item>
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
                    </el-collapse-item>
                    <el-collapse-item title="技术属性" name="2">
                        <div slot="title">
                            <span class="el-icon-edit zdtitle">技术属性</span>
                        </div>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="字段名称 : ">
                                        <el-input placeholder="字段名称"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="数据类型 : ">
                                        <el-select v-model="value" placeholder="请选择" size="mini">
                                            <el-option size="mini" v-for="item in dataType" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="字段长度 : ">
                                        <el-input placeholder="字段长度"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="小数长度 : ">
                                        <el-input placeholder="小数长度"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="所属代码 : ">
                                        <el-select v-model="value" placeholder="请选择" size="mini">
                                            <el-option v-for="item in dataType" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="业务属性" name="3">
                        <div slot="title">
                            <span class="el-icon-edit zdtitle">业务属性</span>
                        </div>
                        <el-row :gutter="20" style="margin-left:0">
                            <el-col>
                                <el-form-item label="业务定义 : ">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容"  style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0">
                            <el-col>
                                <el-form-item label="业务规则 : ">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容"  style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0">
                            <el-col>
                                <el-form-item label="标准定义 : ">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容"  style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                    <el-collapse-item title="管理属性" name="4">
                        <div slot="title">
                            <span class="el-icon-edit zdtitle">管理属性</span>
                        </div>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="管理部门 : ">
                                        <el-input placeholder="管理部门"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='14'>
                                <el-row>
                                    <el-form-item label="相关部门 : ">
                                        <el-input placeholder="相关部门"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="可信系统 : ">
                                        <el-input placeholder="可信系统"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="相关标准 : ">
                                        <el-select v-model="value" placeholder="请选择" size='mini'>
                                            <el-option v-for="item in dataType" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="制定人 : ">
                                        <el-input placeholder="制定人"  size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-form>
            </el-collapse>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini">保存</el-button>
            <el-button type="success" size="mini" class="el-icon-upload">发布</el-button>
        </div>
    </el-dialog>

</div>
</template>

<script>
export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
        // 表第一列的全选
        /*  Allis_selectionStateFun(items, e) {
             let that = this;
             items.forEach((item, j) => {
                 if (e) {
                     item.selectionState = true;
                     for (let i = 0; i < that.allData.length; i++) {
                         if (that.allData[i].table_name == item.table_name) {
                             that.allData[i].selectionState = true;
                         }
                     }
                     for (let i = 0; i < that.allDataList.length; i++) {
                         if (that.allDataList[i].table_name == item.table_name) {
                             that.allDataList[i].selectionState = true;
                         }
                     }
                 } else {
                     item.selectionState = false;
                     for (let i = 0; i < that.allData.length; i++) {
                         if (that.allData[i].table_name == item.table_name) {
                             that.allData[i].selectionState = false;
                         }
                     }
                     for (let i = 0; i < that.allDataList.length; i++) {
                         if (that.allDataList[i].table_name == item.table_name) {
                             that.allDataList[i].selectionState = false;
                         }
                     }
                 }
             });
         }, */
        sig_handleSizeChange(size) {
            this.pagesize = size;
        },
        sig_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleClick(row) {
            console.log(row);
        },
        handleNodeClick(data) {
            if(!data.children){
                this.tableData = [{
                Categoryparent: '3级分类',
                Standardnumber: 'IP500004',
                ch_name: '报表日期',
                Standardalias: '报表日期123',
                datatype: '代码类',
                Releasestatus: '未发布',
                selectionState: false,
            }, {
                Categoryparent: '3级分类',
                Standardnumber: 'IP500004',
                ch_name: '报表日期',
                Standardalias: '报表日期123',
                datatype: '代码类',
                Releasestatus: '未发布',
                selectionState: false,
            },{
                Categoryparent: '3级分类',
                Standardnumber: 'IP500004',
                ch_name: '报表日期',
                Standardalias: '报表日期123',
                datatype: '代码类',
                Releasestatus: '未发布',
                selectionState: false,
            },{
                Categoryparent: '3级分类',
                Standardnumber: 'IP500004',
                ch_name: '报表日期',
                Standardalias: '报表日期123',
                datatype: '代码类',
                Releasestatus: '未发布',
                selectionState: false,
            },{
                Categoryparent: '3级分类',
                Standardnumber: 'IP500004',
                ch_name: '报表日期',
                Standardalias: '报表日期123',
                datatype: '代码类',
                Releasestatus: '未发布',
                selectionState: false,
            }, ]
            }
          
        }
    },

    data() {
        return {
            currentPage: 1,
            pagesize: 10,
            Allis_selectionState: false,
            dialogEditTableVisible: false,
            activeNames: ['1','2','3','4'],
            filterText: '',
            textarea: '',
            value:'',
            Releasestatus: [{
                text: '未发布',
                value: '01'
            }, {
                text: '已发布',
                value: '02'
            }, ],
            dataType: [{
                value: '代码类',
                label: '代码类'
            }, ],
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            // tableData:[],
            tableData: [{
                Categoryparent: '3级分类',
                Standardnumber: 'IP500004',
                ch_name: '报表日期',
                Standardalias: '报表日期123',
                datatype: '代码类',
                Releasestatus: '未发布',
                selectionState: false,
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
        };
    }
};
</script>

<style lang="less">
.locationcenter {
    text-align: center;
    margin-top: 5px;
}

.zdtitle {
    font-size: 15px;
    // font-weight: bold;
    color: #6982ca;
}

.mytree /deep/ {
    .el-tree>.el-tree-node:after {
        border-top: none;
    }

    .el-tree-node {
        position: relative;
        padding-left: 16px;
    }

    //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
    .el-tree-node__expand-icon.is-leaf {
        display: none;
    }

    .el-tree-node__children {
        padding-left: 16px;
    }

    .el-tree-node :last-child:before {
        height: 38px;
    }

    .el-tree>.el-tree-node:before {
        border-left: none;
    }

    .el-tree>.el-tree-node:after {
        border-top: none;
    }

    .el-tree-node:before {
        content: "";
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
    }

    .el-tree-node:after {
        content: "";
        left: -4px;
        position: absolute;
        right: auto;
        border-width: 1px;
    }

    .el-tree-node:before {
        border-left: 1px dashed #4386c6;
        bottom: 0px;
        height: 100%;
        top: -26px;
        width: 1px;
    }

    .el-tree-node:after {
        border-top: 1px dashed #4386c6;
        height: 20px;
        top: 12px;
        width: 24px;
    }
}
.allbutton /deep/ {
    .el-button--mini, .el-button--mini.is-round{
      padding:4px 5px;
    }
}
.data_edit /deep/ {
    .el-row {
        margin-bottom: 10px;
        padding-left: 10px;
    }

    .el-dialog__body {
        padding: 15px 20px;
    }

    .el-collapse {
        border: 0;
    }

    .el-collapse-item__header {
        border: 0;

        .el-collapse-item__arrow {
            display: none;
        }
    }

    .el-collapse-item__content {
        padding: 0;

        .el-form-item {
            margin-bottom: 0;
        }
    }

    .el-collapse-item__wrap {
        border: 0;
        padding: 0 16px
    }
}
</style>
