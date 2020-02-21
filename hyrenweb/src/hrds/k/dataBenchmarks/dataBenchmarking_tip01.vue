<template>
    <div id='nameTable'>
        <el-row :gutter='20'>
            <el-col :span='4'>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
                </el-input>
                <div class="mytree">
                    <el-tree class="filter-tree" :data="data" :indent='0' :props="defaultProps"
                             @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree">
                    </el-tree>
                </div>
            </el-col>
            <el-col :span='20' style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
                <el-row style="margin-bottom:10px">
                    <el-col :span='9'>&nbsp;</el-col>
                    <el-col :span='5' style="text-align:right">
                        <el-input placeholder="请输入内容" class="input-with-select" size="mini">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span='10' style="text-align:right" class='allbutton'>
                        <el-button size="mini" type="primary" plain>批量导入</el-button>
                        <el-button size="mini" type="success" class="el-icon-upload">发布标准</el-button>
                        <el-button size="mini" type="primary" class='el-icon-circle-plus-outline'
                                   @click="dialogEditTableVisible=true">新增标准
                        </el-button>
                        <el-button size="mini" type="danger" class='el-icon-remove-outline'>删除标准</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border
                              size='medium' style="min-height: 400px;" class='outtable'>
                        <el-table-column width="55" align="center" prop="selectionState">
                            <template slot="header" slot-scope="scope">
                                <el-checkbox @change="Allis_selectionStateFun(tableData,Allis_selectionState)"
                                             v-model="Allis_selectionState"
                                             :checked="Allis_selectionState"></el-checkbox>
                            </template>
                            <template slot-scope="scope">
                                <el-checkbox :checked="scope.row.selectionState" v-model="scope.row.selectionState"
                                             @change="evercheck(scope.row.selectionState,scope.row.table_name)"></el-checkbox>
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
                        <el-table-column prop="Releasestatus" label="发布状态" align="center" column-key='Releasestatus'
                                         :filters="Releasestatus" :filter-multiple="false">
                        </el-table-column>
                        <el-table-column label="操作" width="100" align="center">
                            <template slot-scope="scope">
                                <el-button type="text" size="small" @click="dialogEditTableVisible=true">编辑</el-button>
                                <el-button type="text" size="small">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="dbMark_handleSizeChange" @current-change="dbMark_handleCurrentChange"
                                   :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"
                                   class='locationcenter'></el-pagination>
                </el-row>
            </el-col>
        </el-row>
        <!-- 编辑的弹框 -->
        <el-dialog title="报表日期" :visible.sync="dialogEditTableVisible" width="70%" class='data_edit'>
            <el-row>
                <el-collapse v-model="activeNames">
                    <el-form ref="ruleForm_Info" :model="ruleForm_Info" label-width="80px">
                        <el-collapse-item title="基本信息" name="1">
                            <div slot="title">
                                <span class="el-icon-edit zdtitle">基本信息</span>
                            </div>
                            <el-row :gutter="20">
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="标准编号 : " prop='standardNum'>
                                            <el-input placeholder="标准编号" v-model="ruleForm_Info.standardNum"
                                                      size='mini'>
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="中文名称 : " prop="cnName">
                                            <el-input placeholder="中文名称" size='mini' v-model="ruleForm_Info.cnName">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="英文名称 : " prop="enName">
                                            <el-input placeholder="英文名称" size='mini' v-model="ruleForm_Info.enName">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="标准别名 : " prop="standardAlias">
                                            <el-input placeholder="标准别名" size='mini'
                                                      v-model="ruleForm_Info.standardAlias">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span="7">
                                    <el-form-item label="归属分类 : " prop="belongsClass">
                                        <el-cascader :options="options" clearable size='mini'
                                                     v-model="ruleForm_Info.belongsClass"></el-cascader>
                                    </el-form-item>
                                </el-col>

                            </el-row>
                            <el-row :gutter="20" style="margin-left: 0;">
                                <el-col>
                                    <el-form-item label="标准描述 : " prop="standardDescription">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" style='width:86%'
                                                  v-model="ruleForm_Info.standardDescription">
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
                                        <el-form-item label="字段名称 : " prop="fieldName">
                                            <el-input placeholder="字段名称" size='mini' v-model="ruleForm_Info.fieldName">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="数据类型 : " prop="data_types">
                                            <el-select placeholder="请选择" size="mini" v-model="ruleForm_Info.data_types">
                                                <el-option size="mini" v-for="item in dataType" :key="item.value"
                                                           :label="item.label" :value="item.value"
                                                           :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-row>
                                </el-col>

                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="字段长度 : " prop="fieldLength">
                                            <el-input placeholder="字段长度" size='mini'
                                                      v-model="ruleForm_Info.fieldLength">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="小数长度 : " prop="decimalLen">
                                            <el-input placeholder="小数长度" size='mini' v-model="ruleForm_Info.decimalLen">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="所属代码 : " prop="belongsCode">
                                            <el-select placeholder="请选择" size="mini"
                                                       v-model="ruleForm_Info.belongsCode">
                                                <el-option v-for="item in dataType" :key="item.value"
                                                           :label="item.label" :value="item.value"
                                                           :disabled="item.disabled">
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
                                    <el-form-item label="业务定义 : " prop="worksDefin">
                                        <el-input type="textarea" :rows="2" v-model="ruleForm_Info.worksDefin"
                                                  placeholder="请输入内容" style='width:86%'>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" style="margin-left:0">
                                <el-col>
                                    <el-form-item label="业务规则 : " prop="workRule">
                                        <el-input type="textarea" :rows="2" v-model="ruleForm_Info.workRule"
                                                  placeholder="请输入内容" style='width:86%'>
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-row :gutter="20" style="margin-left:0">
                                <el-col>
                                    <el-form-item label="标准定义 : " prop="sdefinition">
                                        <el-input type="textarea" :rows="2" v-model="ruleForm_Info.sdefinition"
                                                  placeholder="请输入内容" style='width:86%'>
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
                                        <el-form-item label="管理部门 : " prop="department">
                                            <el-input placeholder="管理部门" size='mini' v-model="ruleForm_Info.department">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='14'>
                                    <el-row>
                                        <el-form-item label="相关部门 : " prop="relevantDepartments">
                                            <el-input placeholder="相关部门" size='mini'
                                                      v-model="ruleForm_Info.relevantDepartments">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>

                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="可信系统 : " prop="trustedSystem">
                                            <el-input placeholder="可信系统" size='mini'
                                                      v-model="ruleForm_Info.trustedSystem">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="相关标准 : " prop="relatedStandards">
                                            <el-select placeholder="请选择" size='mini'
                                                       v-model="ruleForm_Info.relatedStandards">
                                                <el-option v-for="item in dataType" :key="item.value"
                                                           :label="item.label" :value="item.value"
                                                           :disabled="item.disabled">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-row>
                                </el-col>
                                <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="制定人 : " prop="enactingPerson">
                                            <el-input placeholder="制定人" size='mini'
                                                      v-model="ruleForm_Info.enactingPerson">
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
                <el-button type="primary" size="mini" @click="saveAddDbmNormbasicInfo('ruleForm_Info')">保存</el-button>
                <el-button type="success" size="mini" class="el-icon-upload">发布</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import * as dataBenchmarkingAllFun from './dataBenchmarking'

    export default {
        data() {
            return {
                currentPage: 1,
                pagesize: 10,
                Allis_selectionState: false,
                dialogEditTableVisible: false,
                activeNames: ['1', '2', '3', '4'],
                filterText: '',
                textarea: '',
                value: '',
                ruleForm_Info: {
                    standardNum: '',
                    cnName: '',
                    enName: '',
                    standardAlias: '',
                    belongsClass: '',
                    standardDescription: '',
                    fieldName: '',
                    data_types: '',
                    fieldLength: '',
                    decimalLen: '',
                    belongsCode: '',
                    worksDefin: '',
                    workRule: '',
                    sdefinition: '',
                    department: '',
                    relevantDepartments: '',
                    trustedSystem: '',
                    relatedStandards: '',
                    enactingPerson: ''
                },
                Releasestatus: [{
                    text: '未发布',
                    value: '01'
                }, {
                    text: '已发布',
                    value: '02'
                },],
                dataType: [{
                    value: '代码类',
                    label: '代码类'
                },],
                data: [],
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
                },],
                options: [{
                    value: 'zhinan',
                    label: '指南',
                    children: [{
                        value: 'shejiyuanze',
                        label: '设计原则',
                        children: [{
                            value: 'yizhi',
                            label: '一致',
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
        },
        mounted() {
            this.getDbmNormbasicInfo();
            this.getDbmSortTreeInfo();
        },
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
            dbMark_handleSizeChange(size) {
                this.pagesize = size;
            },
            dbMark_handleCurrentChange(currentPage) {
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
                if (!data.children) {
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
                    }, {
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
                    }, {
                        Categoryparent: '3级分类',
                        Standardnumber: 'IP500004',
                        ch_name: '报表日期',
                        Standardalias: '报表日期123',
                        datatype: '代码类',
                        Releasestatus: '未发布',
                        selectionState: false,
                    },]
                }

            },
            // 获取初始数据
            getDbmNormbasicInfo() {
                let params = {};
                params["currPage"] = 1;
                params["pageSize"] = 10;
                console.log(params)
                dataBenchmarkingAllFun.getDbmNormbasicInfo(params).then(res => {
                    console.log(res)
                });

            },
            // 新增标准分类
            saveAddDbmNormbasicInfo(ruleform) {
                console.log(this.ruleForm_Info)
                let params = {}
                params["norm_code"] = this.ruleForm_Info.standardNum;
                params["norm_cname"] = this.ruleForm_Info.cnName;
                params["norm_ename"] = this.ruleForm_Info.enName;
                params["norm_aname"] = this.ruleForm_Info.standardAlias;
                params[""] = this.ruleForm_Info.belongsClass;//归属分类--
                params[""] = this.ruleForm_Info.standardDescription;//标准描述--
                params[""] = this.ruleForm_Info.fieldName;//字段名称--
                params["data_type"] = this.ruleForm_Info.data_types;//数据类型
                params["col_len"] = this.ruleForm_Info.fieldLength;//字段长度
                params["decimal_point"] = this.ruleForm_Info.decimalLen;//小数长度
                params[""] = this.ruleForm_Info.belongsCode;//所属代码--
                params["business_def"] = this.ruleForm_Info.worksDefin;//业务定义
                params["business_rule"] = this.ruleForm_Info.workRule;//业务规则
                params["norm_basis"] = this.ruleForm_Info.sdefinition;//标准定义
                params["manage_department"] = this.ruleForm_Info.department;//管理部门
                params["relevant_department"] = this.ruleForm_Info.relevantDepartments;//相关部门
                params["origin_system"] = this.ruleForm_Info.trustedSystem;//可信系统
                params["related_system"] = this.ruleForm_Info.relatedStandards;//相关标准
                params["formulator"] = this.ruleForm_Info.enactingPerson;//制定人

            },
            getDbmSortTreeInfo() {
                dataBenchmarkingAllFun.getDbmSortInfoTreeData().then(res => {
                    console.log(res.data.dbmSortInfoTreeDataList);
                    this.data = res.data.dbmSortInfoTreeDataList;
                });
            }
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
        color: #2196f3;
    }

    .mytree /deep/ {
        .el-tree > .el-tree-node:after {
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

        .el-tree > .el-tree-node:before {
            border-left: none;
        }

        .el-tree > .el-tree-node:after {
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

        .el-button--mini,
        .el-button--mini.is-round {
            padding: 4px 5px;
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
