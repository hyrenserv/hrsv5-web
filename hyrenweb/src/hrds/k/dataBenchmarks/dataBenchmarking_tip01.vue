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
                    <el-input placeholder="请输入内容" class="input-with-select" size="mini">
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
                <el-col :span='10' style="text-align:right" class='allbutton'>
                    <el-button size="mini" type="primary" plain>批量导入</el-button>
                    <el-button size="mini" type="success" class="el-icon-upload">发布所有标准</el-button>
                    <el-button size="mini" type="primary" class='el-icon-circle-plus-outline' @click="addBascicFun()">新增标准</el-button>
                    <!-- <el-button size="mini" type="danger" class='el-icon-remove-outline'>删除标准</el-button> -->
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border size='medium' style="min-height: 400px;" class='outtable'>
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
                    <el-table-column prop="sort_id" label="上级分类" align="center">
                    </el-table-column>
                    <el-table-column prop="norm_code" label="标准编号" align="center">
                    </el-table-column>
                    <el-table-column prop="norm_cname" label="中文名称" align="center">
                    </el-table-column>
                    <el-table-column prop="norm_aname" label="标准别名" align="center">
                    </el-table-column>
                    <el-table-column prop="data_type" label="数据类型" align="center">
                    </el-table-column>
                    <el-table-column label="发布状态" align="center" column-key='Releasestatus' :filters="Releasestatus" :filter-multiple="false">
                        <template slot-scope="scope">
                            <span v-if="scope.row.norm_status=='0'">未发布</span>
                            <span v-else>已发布</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="editbasicByIdFun(scope.row)">编辑</el-button>
                            <el-button type="text" size="small">发布</el-button>
                            <el-button type="text" size="small" @click="deleteDbbasicInfo(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="dbMark_handleSizeChange" @current-change="dbMark_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class='locationcenter'></el-pagination>
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
                                        <el-input placeholder="标准编号" v-model="ruleForm_Info.standardNum" size='mini'>
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
                                        <el-input placeholder="标准别名" size='mini' v-model="ruleForm_Info.standardAlias">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="7">
                                <el-form-item label="归属分类 : " prop="belongsClass">
                                    <el-cascader :options="options" clearable size='mini' :show-all-levels="false" v-model="ruleForm_Info.belongsClass" clearable :props="SetKesDept"></el-cascader>
                                </el-form-item>
                            </el-col>

                        </el-row>
                        <el-row :gutter="20" style="margin-left: 0;">
                            <el-col>
                                <el-form-item label="标准描述 : " prop="standardDescription">
                                    <el-input type="textarea" :rows="2" placeholder="请输入内容" style='width:86%' v-model="ruleForm_Info.standardDescription">
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
                                            <el-option size="mini" v-for="item in dataType" :key="item.code" :label="item.value" :value="item.code">
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
                                        <el-input placeholder="字段长度" size='mini' v-model="ruleForm_Info.fieldLength">
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
                                        <el-select placeholder="请选择" size="mini" v-model="ruleForm_Info.belongsCode">
                                            <el-option v-for="item in dbmCodeTypeInfos" :key="item.code_type_id" :label="item.code_type_name" :value="item.code_type_id" :disabled="item.disabled">
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
                                    <el-input type="textarea" :rows="2" v-model="ruleForm_Info.worksDefin" placeholder="请输入内容" style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0">
                            <el-col>
                                <el-form-item label="业务规则 : " prop="workRule">
                                    <el-input type="textarea" :rows="2" v-model="ruleForm_Info.workRule" placeholder="请输入内容" style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0">
                            <el-col>
                                <el-form-item label="标准定义 : " prop="sdefinition">
                                    <el-input type="textarea" :rows="2" v-model="ruleForm_Info.sdefinition" placeholder="请输入内容" style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0">
                            <el-col>
                                <el-form-item label="值域 : " prop="dbm_domain">
                                    <el-input type="textarea" :rows="2" v-model="ruleForm_Info.dbm_domain" placeholder="请输入内容" style='width:86%'>
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
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="相关部门 : " prop="relevantDepartments">
                                        <el-input placeholder="相关部门" size='mini' v-model="ruleForm_Info.relevantDepartments">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="发布状态 : " prop="relatedStandards">
                                        <el-select placeholder="请选择" size='mini' v-model="ruleForm_Info.norm_status">
                                            <el-option v-for="item in Releasestatus" :key="item.value" :label="item.text" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="可信系统 : " prop="trustedSystem">
                                        <el-input placeholder="可信系统" size='mini' v-model="ruleForm_Info.trustedSystem">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="相关标准 : " prop="relatedStandards">
                                        <el-select placeholder="请选择" size='mini' v-model="ruleForm_Info.relatedStandards">
                                            <el-option v-for="item in dbmNormbasicInfos" :key="item.value" :label="item.norm_cname" :value="item.norm_cname">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="制定人 : " prop="enactingPerson">
                                        <el-input placeholder="制定人" size='mini' v-model="ruleForm_Info.enactingPerson">
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
            <el-button type="danger" size="mini" @click="dialogEditTableVisible=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="saveAddDbmNormbasicInfo('ruleForm_Info')">保存</el-button>
            <el-button type="success" size="mini" class="el-icon-upload">发布</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as dataBenchmarkingAllFun from './dataBenchmarking'
import * as message from "@/utils/js/message";

export default {
    data() {
        return {
            currentPage: 1,
            pagesize: 10,
            totalSize: 0,
            Allis_selectionState: false,
            dialogEditTableVisible: false,
            SetKesDept: {
                checkStrictly: true,
                value: 'id',
                label: 'label',
                children: 'children'
            },
            activeNames: ['1', '2', '3', '4'],
            Releasestatus: [{
                text: '未发布',
                value: '0'
            }, {
                text: '已发布',
                value: '1'
            }, ],
            filterText: '',
            textarea: '',
            value: '',
            basicStaus: '',
            basic_id: '',
            ruleForm_Info: {
                standardNum: '',
                cnName: '',
                enName: '',
                standardAlias: '',
                belongsClass: [],
                standardDescription: '',
                fieldName: '',
                data_types: '',
                fieldLength: null,
                decimalLen: null,
                belongsCode: '',
                worksDefin: '',
                workRule: '',
                sdefinition: '',
                department: '',
                relevantDepartments: '',
                trustedSystem: '',
                relatedStandards: '',
                enactingPerson: '',
                dbm_domain: '', //值域
                norm_status: '', //发布状态
            },
            Releasestatus: [{
                text: '未发布',
                value: '0'
            }, {
                text: '已发布',
                value: '1'
            }, ],
            dataType: [],
            dbmCodeTypeInfos: [],
            dbmNormbasicInfos: [],
            data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            // tableData:[],
            tableData: [],
            options: []
        };
    },
    created() {
        // 获取数据类型下拉框
        this.$Code.getCategoryItems({
            'category': 'DbmDataType'
        }).then(res => {
            this.dataType = res.data
        })
    },
    mounted() {
        this.getDbmNormbasicInfo(1, 10)
        this.getDbmSortTreeInfo();
        this.getDbmNormbasicIdAndNameInfo() //相关标准

        // 获取代码类
        this.getDbmCodeTypeIdAndNameInfo()
    },
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        handlerValue() {
      if (this.$refs.refHandle) {
        this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
      }
    }
    },
   
    methods: {
        // 获取代码类下拉
        getDbmCodeTypeIdAndNameInfo() {
            dataBenchmarkingAllFun.getDbmCodeTypeIdAndNameInfo().then(res => {
                console.log(res)
                this.dbmCodeTypeInfos = res.data.dbmCodeTypeInfos
            });
        },
        // 左侧树菜单
        getDbmSortTreeInfo() {
            dataBenchmarkingAllFun.getDbmSortInfoTreeData().then(res => {
                console.log(res.data)
                this.data = res.data.dbmSortInfoTreeDataList
                this.options = res.data.dbmSortInfoTreeDataList
            });
        },
        //相关标准信息
        getDbmNormbasicIdAndNameInfo() {
            dataBenchmarkingAllFun.getDbmNormbasicIdAndNameInfo().then(res => {
                this.dbmNormbasicInfos = res.data.dbmNormbasicInfos
            });
        },
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
            console.log(data)
            if (!data.children) {
                let params = {};
                params["sort_id"] =parseInt(data.id);
                console.log(params)
                dataBenchmarkingAllFun.getDbmNormbasicInfoBySortId(params).then(res => {
                    console.log(res)
                    // this.tableData=res.data
                });

            }

        },
        // 获取初始数据
        getDbmNormbasicInfo(curr, size) {
            let params = {},
                that = this;
            params["currPage"] = curr;
            params["pageSize"] = size;
            console.log(params)
            dataBenchmarkingAllFun.getDbmNormbasicInfo(params).then(res => {
                let arr = res.data.dbmNormbasicInfos
                for (let i = 0; i < arr.length; i++) {
                    for (let k = 0; k < that.dataType.length; k++) {
                        if (arr[i].data_type == that.dataType[k].code) {
                            arr[i].data_type = that.dataType[k].value
                        }
                    }
                }

                this.totalSize = res.data.totalSize
                this.tableData = arr
            });

        },
        // 新增打开
        addBascicFun() {
            this.dialogEditTableVisible = true
            this.basicStaus = 'add'
            this.ruleForm_Info.standardNum = ''
            this.ruleForm_Info.cnName = ''
            this.ruleForm_Info.enName = ''
            this.ruleForm_Info.standardAlias = ''
            this.ruleForm_Info.belongsClass = ''
            this.ruleForm_Info.data_types = '' //数据类型
            this.ruleForm_Info.fieldLength = ''; //字段长度
            this.ruleForm_Info.decimalLen = '' //小数长度
            this.ruleForm_Info.belongsCode = '' //所属代码--
            this.ruleForm_Info.worksDefin = ''; //业务定义
            this.ruleForm_Info.workRule = ''; //业务规则
            this.ruleForm_Info.sdefinition = ''; //标准定义
            this.ruleForm_Info.dbm_domain = ''; //值域
            this.ruleForm_Info.department = ''; //管理部门
            this.ruleForm_Info.relevantDepartments = ''; //相关部门
            this.ruleForm_Info.norm_status = ''; //发布状态
            this.ruleForm_Info.trustedSystem = ''; //可信系统
            this.ruleForm_Info.relatedStandards = ''; //相关标准
            this.ruleForm_Info.enactingPerson = ''; //制定人
        },

        // 编辑打开
        editbasicByIdFun(row) {
            this.dialogEditTableVisible = true;
            this.basic_id = row.basic_id
            this.basicStaus = 'edit'
            let params = {}
            params["basic_id"] = row.basic_id;
            console.log(params)
            dataBenchmarkingAllFun.getDbmNormbasicInfoById(params).then(res => {
                console.log(res.data)
               
                this.ruleForm_Info.standardNum = res.data.norm_code
                this.ruleForm_Info.cnName = res.data.norm_cname
                this.ruleForm_Info.enName = res.data.norm_ename
                this.ruleForm_Info.standardAlias = res.data.norm_aname
                this.ruleForm_Info.belongsClass = res.data.sort_id
                //   params[""] = this.ruleForm_Info.standardDescription;//标准描述--
                //   params[""] = this.ruleForm_Info.fieldName;//字段名称--
                this.ruleForm_Info.data_types = res.data.data_type
                this.ruleForm_Info.fieldLength = res.data.col_len
                this.ruleForm_Info.decimalLen = res.data.decimal_point
                this.ruleForm_Info.belongsCode = res.data.code_type_id
                this.ruleForm_Info.worksDefin = res.data.business_def
                this.ruleForm_Info.workRule = res.data.business_rule
                this.ruleForm_Info.sdefinition = res.data.norm_basis
                this.ruleForm_Info.dbm_domain = res.data.dbm_domain
                this.ruleForm_Info.department = res.data.manage_department
                this.ruleForm_Info.relevantDepartments = res.data.relevant_department
                this.ruleForm_Info.norm_status = res.data.norm_status
                this.ruleForm_Info.trustedSystem = res.data.origin_system
                this.ruleForm_Info.relatedStandards = res.data.related_system
                this.ruleForm_Info.enactingPerson = res.data.formulator
            });
        },
        // 新增标准分类
        saveAddDbmNormbasicInfo(ruleform) {
            let params = {},
                that = this;
            params["norm_code"] = this.ruleForm_Info.standardNum;
            params["norm_cname"] = this.ruleForm_Info.cnName;
            params["norm_ename"] = this.ruleForm_Info.enName;
            params["norm_aname"] = this.ruleForm_Info.standardAlias;
            params["sort_id"] = this.ruleForm_Info.belongsClass; //归属分类--
            //   params[""] = this.ruleForm_Info.standardDescription;//标准描述--
            //   params[""] = this.ruleForm_Info.fieldName;//字段名称--
            params["data_type"] = this.ruleForm_Info.data_types; //数据类型
            params["col_len"] = parseInt(this.ruleForm_Info.fieldLength); //字段长度
            params["decimal_point"] = parseInt(this.ruleForm_Info.decimalLen); //小数长度
            params["code_type_id"] = parseInt(this.ruleForm_Info.belongsCode); //所属代码--
            params["business_def"] = this.ruleForm_Info.worksDefin; //业务定义
            params["business_rule"] = this.ruleForm_Info.workRule; //业务规则
            params["norm_basis"] = this.ruleForm_Info.sdefinition; //标准定义
            params["dbm_domain"] = this.ruleForm_Info.dbm_domain; //值域
            params["manage_department"] = this.ruleForm_Info.department; //管理部门
            params["relevant_department"] = this.ruleForm_Info.relevantDepartments; //相关部门
            params["norm_status"] = this.ruleForm_Info.norm_status; //发布状态
            params["origin_system"] = this.ruleForm_Info.trustedSystem; //可信系统
            params["related_system"] = this.ruleForm_Info.relatedStandards; //相关标准
            params["formulator"] = this.ruleForm_Info.enactingPerson; //制定人
            console.log(params)
            if (this.basicStaus == 'edit') {
                params["basic_id"] = this.basic_id;
                dataBenchmarkingAllFun.updateDbmNormbasicInfo(params).then(res => {
                    console.log(res)
                    message.updateSuccess(res);
                    that.dialogEditTableVisible = false
                    that.getDbmNormbasicInfo(that.currentPage, that.pagesize)
                });
            } else {
                dataBenchmarkingAllFun.addDbmNormbasicInfo(params).then(res => {
                    console.log(res)
                    message.saveSuccess(res);
                    that.dialogEditTableVisible = false
                    that.getDbmNormbasicInfo(that.currentPage, that.pagesize)
                });
            }

        },
        // 
        deleteDbbasicInfo(row) {
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
                let params = {}
                params["basic_id"] = row.basic_id;
                dataBenchmarkingAllFun.deleteDbmNormbasicInfo(params).then(res => {
                    message.deleteSuccess(res);
                    that.getDbmNormbasicInfo(that.currentPage, that.pagesize)
                });
            }).catch(() => {})
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
