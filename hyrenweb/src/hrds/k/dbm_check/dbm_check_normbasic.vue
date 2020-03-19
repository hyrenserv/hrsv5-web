<template>
<div id='nameTable'>
    <el-row :gutter='20'>
        <el-col :span='6'>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
            </el-input>
            <Scrollbar>
                <div class="mytree" hight='200'>
                    <el-tree class="filter-tree" :empty-text='tip' :data="data" :indent='0' :props="data" @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </Scrollbar>
        </el-col>
        <el-col :span='18' style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
            <el-row style="margin-bottom:10px">
                <el-col :span='16'>&nbsp;</el-col>
                <el-col :span='8' style="text-align:right">
                    <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="search_Value">
                        <el-button slot="append" icon="el-icon-search" @click="searchDbmSortInfoFun" />
                    </el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="tableData" border size='medium' style="min-height: 200px;" class='outtable' ref="multipleTable" :row-key="(row)=>{ return row.basic_id}" @selection-change="handleSelectionChange" @filter-change="fulterChangeFun" @select-all='allselect'>
                    <el-table-column label="序号" align="center">
                        <template scope="scope">{{scope.$index+(currentPage - 1) * pagesize + 1}}</template>
                    </el-table-column>
                    <el-table-column prop="sortName" label="上级分类" align="center" width="100" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="norm_code" label="标准编号" align="center">
                    </el-table-column>
                    <el-table-column prop="norm_cname" label="中文名称" align="center" width="100" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="norm_aname" label="标准别名" align="center" width="100" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column prop="data_type" label="数据类型" align="center">
                    </el-table-column>
                    <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class='issuecolor' @click="editbasicByIdFun(scope.row)">查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="dbMark_handleSizeChange" @current-change="dbMark_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class='locationcenter' />
            </el-row>
        </el-col>
    </el-row>
    <!-- 编辑的弹框 -->
    <el-dialog title="新增标准元" :visible.sync="dialogEditTableVisible" width="60%" class='data_edit'>
        <div slot="title" class="header-title">
            <span class="title">查看标准元</span>
        </div>
        <el-row>
            <el-collapse v-model="activeNames">
                <el-form ref="ruleForm_Info" :model="ruleForm_Info" label-width="86px">
                    <el-collapse-item title="基本信息" name="1">
                        <div slot="title">
                            <span class="el-icon-edit zdtitle">基本信息</span>
                        </div>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="标准编号 : " prop='standardNum'>
                                        <el-input placeholder="标准编号" disabled v-model="ruleForm_Info.standardNum" size='mini'>
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="中文名称 : " prop="cnName" :rules="filter_rules([{required: true}])">
                                        <el-input placeholder="中文名称" disabled size='mini' v-model="ruleForm_Info.cnName">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="英文名称 : " prop="enName" :rules="filter_rules([{required: true}])">
                                        <el-input placeholder="英文名称" disabled size='mini' v-model="ruleForm_Info.enName">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="标准别名 : " prop="standardAlias">
                                        <el-input placeholder="标准别名" disabled size='mini' v-model="ruleForm_Info.standardAlias">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span="7">
                                <el-row>
                                    <el-form-item label="归属分类 : " prop="belongsClass" :rules="rule.selected">
                                        <el-cascader :options="options" disabled filterable clearable size='mini' :show-all-levels="false" v-model="ruleForm_Info.belongsClass" clearable :props="SetKesDept"></el-cascader>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--  <el-row :gutter="20" style="margin-left: 0;">
                                <el-col>
                                    <el-form-item label="标准描述 : " prop="standardDescription">
                                        <el-input type="textarea" :rows="2" placeholder="请输入内容" style='width:86%' v-model="ruleForm_Info.standardDescription">
                                        </el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row> -->
                    </el-collapse-item>
                    <el-collapse-item title="技术属性" name="2">
                        <div slot="title">
                            <span class="el-icon-edit zdtitle">技术属性</span>
                        </div>
                        <el-row :gutter="20">
                            <!--  <el-col :span='7'>
                                    <el-row>
                                        <el-form-item label="字段名称 : " prop="fieldName">
                                            <el-input placeholder="字段名称" size='mini' v-model="ruleForm_Info.fieldName">
                                            </el-input>
                                        </el-form-item>
                                    </el-row>
                                </el-col> -->
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="数据类型 : " prop="data_types">
                                        <el-select placeholder="请选择" disabled size="mini" v-model="ruleForm_Info.data_types">
                                            <el-option size="mini"  v-for="item in dataType" :key="item.code" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="字段长度 : " prop="fieldLength" :rules="filter_rules([{required: true,dataType:'number'}])">
                                        <el-input placeholder="字段长度" disabled size='mini' v-model="ruleForm_Info.fieldLength">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="小数长度 : " prop="decimalLen">
                                        <el-input placeholder="小数长度" disabled size='mini' v-model="ruleForm_Info.decimalLen">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20">
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="所属代码 : " prop="belongsCode">
                                        <el-select placeholder="请选择" disabled size="mini" v-model="ruleForm_Info.belongsCode">
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
                        <el-row :gutter="20" style="margin-left:0;margin-bottom:18px">
                            <el-col>
                                <el-form-item label="业务定义 : " prop="worksDefin">
                                    <el-input type="textarea" disabled :rows="2" v-model="ruleForm_Info.worksDefin" placeholder="请输入内容" style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0;margin-bottom:18px">
                            <el-col>
                                <el-form-item label="业务规则 : " prop="workRule">
                                    <el-input type="textarea" disabled :rows="2" v-model="ruleForm_Info.workRule" placeholder="请输入内容" style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0;margin-bottom:18px">
                            <el-col>
                                <el-form-item label="标准定义 : " prop="sdefinition">
                                    <el-input type="textarea" disabled :rows="2" v-model="ruleForm_Info.sdefinition" placeholder="请输入内容" style='width:86%'>
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" style="margin-left:0;margin-bottom:18px">
                            <el-col>
                                <el-form-item label="值域 : " prop="dbm_domain" :rules="filter_rules([{required: true}])">
                                    <el-input type="textarea" disabled :rows="2" v-model="ruleForm_Info.dbm_domain" placeholder="请输入内容" style='width:86%'>
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
                                        <el-input placeholder="管理部门" disabled size='mini' v-model="ruleForm_Info.department">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="相关部门 : " prop="relevantDepartments">
                                        <el-input placeholder="相关部门" disabled size='mini' v-model="ruleForm_Info.relevantDepartments">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="发布状态 : " prop="norm_status" :rules="rule.selected">
                                        <el-select placeholder="请选择" disabled size='mini' v-model="ruleForm_Info.norm_status">
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
                                        <el-input placeholder="可信系统" disabled size='mini' v-model="ruleForm_Info.trustedSystem">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="相关标准 : " prop="relatedStandards">
                                        <el-select placeholder="请选择" disabled size='mini' v-model="ruleForm_Info.relatedStandards">
                                            <el-option v-for="item in dbmNormbasicInfos" :key="item.value" :label="item.norm_cname" :value="item.norm_cname">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row>
                                    <el-form-item label="制定人 : " prop="enactingPerson" :rules="filter_rules([{required: true}])">
                                        <el-input placeholder="制定人"  disabled size='mini' v-model="ruleForm_Info.enactingPerson">
                                        </el-input>
                                    </el-form-item>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-collapse-item>
                </el-form>
            </el-collapse>
        </el-row>
    </el-dialog>
</div>
</template>

<script>
import * as dataBenchmarkingAllFun from './dbm_check'
import * as message from "@/utils/js/message";
import * as validator from "@/utils/js/validator";
import Scrollbar from '../../components/scrollbar';
import Loading from '../../components/loading'

export default {
    components: {
        Scrollbar,
        Loading
    },
    props: ['data', 'options', 'tip'],
    data() {
        return {
            rule: validator.default,
            title: '',
            search_Value: '',
            searchValue: '',
            currentPage: 1,
            pagesize: 10,
            totalSize: 0,
            Allis_selectionState: false,
            dialogEditTableVisible: false,
            SetKesDept: {
                // checkStrictly: true,
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
                // options:[],
                // data:[]
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
            // data: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            },
            // tableData:[],
            tableData: [],
            // options: [],
            fileList: [],
            listId: '',
            loading: true,
            basic_id_s: [],
            selectrow: [],
            norm_status: '',
            search_status: '',
            NodeClick: '',
            nodeId: ''
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
     
        // 复选框选中
        handleSelectionChange(selectTrue) {
            this.selectrow = selectTrue
        },
        
  
        // 获取代码类下拉
        getDbmCodeTypeIdAndNameInfo() {
            dataBenchmarkingAllFun.getDbmCodeTypeIdAndNameInfo().then(res => {
                this.dbmCodeTypeInfos = res.data.dbmCodeTypeInfos
            });
        },
        /*   // 左侧树菜单
          getDbmSortTreeInfo() {
              dataBenchmarkingAllFun.getDbmSortInfoTreeData().then(res => {
                  this.data = res.data.dbmSortInfoTreeDataList
                  this.options = res.data.dbmSortInfoTreeDataList
              });
          }, */
        //相关标准信息
        getDbmNormbasicIdAndNameInfo() {
            dataBenchmarkingAllFun.getDbmNormbasicIdAndNameInfo().then(res => {
                this.dbmNormbasicInfos = res.data.dbmNormbasicInfos
            });
        },

        dbMark_handleSizeChange(size) {
            this.pagesize = size;
            if (this.norm_status == '1' || this.norm_status == '0' || this.search_status == 'search' || this.nodeId != '') {
                // if (this.searchValue != '') {
                this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status, this.nodeId)
                /*  } else {
                     this.classfilterFun(this.currentPage, this.pagesize, this.norm_status)
                 } */
                /* } else if (this.search_status == 'search' && this.searchValue != '') {
                    this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status)
                 */
            } else {
                this.getDbmNormbasicInfo(this.currentPage, this.pagesize)
            }

        },
        dbMark_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            if (this.norm_status == '1' || this.norm_status == '0' || this.search_status == 'search' || this.nodeId != '') {
                // if (this.searchValue != '') {
                this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status, this.nodeId)
                /*   } else {
                          this.classfilterFun(this.currentPage, this.pagesize, this.norm_status)
                      }
                  } else if (this.search_status == 'search' && this.searchValue != '') {
                      this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status)
                  */
            } else {
                this.getDbmNormbasicInfo(this.currentPage, this.pagesize)
            }

        },
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        handleClick(row) {},
        handleNodeClick(data) {
            this.NodeClick = 'true'
            this.norm_status = ''
            this.search_status = ''
            this.searchValue = ''
            this.search_Value = ''
            // if (!data.children) {
            this.nodeId = data.id
            this.getDbmNormbasicInfoBySortId(data.id, 1, 10)
            // }

        },
        // 侧边树点击获取信息接口方法
        getDbmNormbasicInfoBySortId(id, currentPage, pagesize) {
            let params = {},
                that = this;
            params["sort_id"] = parseInt(id);
            params["currPage"] = currentPage;
            params["pageSize"] = pagesize
            dataBenchmarkingAllFun.getDbmNormbasicInfoBySortId(params).then(res => {
                let arr = res.data.dbmNormbasicInfos
                for (let i = 0; i < arr.length; i++) {
                    arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options)
                    for (let k = 0; k < that.dataType.length; k++) {
                        if (arr[i].data_type == that.dataType[k].code) {
                            arr[i].data_type = that.dataType[k].value
                        }
                    }
                }
                this.tableData = arr
                this.totalSize = res.data.totalSize
            });
        },
        // 获取初始数据
        getDbmNormbasicInfo(curr, size) {
            let params = {},
                that = this;
            params["currPage"] = curr;
            params["pageSize"] = size;
            dataBenchmarkingAllFun.getDbmNormbasicInfo(params).then(res => {
                let arr = res.data.dbmNormbasicInfos
                for (let i = 0; i < arr.length; i++) {
                    arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options)
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
        //通过id递归遍历树得到中文名
        getparentClassNmae(key, treeData) {
            let returnname = '';

            function childrenEach(childrenData) {
                for (var j = 0; j < childrenData.length; j++) {
                    if (childrenData[j].id == key) {
                        returnname = childrenData[j].label;
                        break
                    } else {
                        if (childrenData[j].children) {
                            childrenEach(childrenData[j].children);
                        }
                    }
                }
                return returnname;
            }

            return childrenEach(treeData);
        },
        // 编辑打开
        editbasicByIdFun(row) {
            this.title = '编辑'
            this.dialogEditTableVisible = true;
            this.basic_id = row.basic_id
            this.basicStaus = 'edit'
            let params = {}
            params["basic_id"] = row.basic_id;
            dataBenchmarkingAllFun.getDbmNormbasicInfoById(params).then(res => {
                this.ruleForm_Info.standardNum = res.data.norm_code
                this.ruleForm_Info.cnName = res.data.norm_cname
                this.ruleForm_Info.enName = res.data.norm_ename
                this.ruleForm_Info.standardAlias = res.data.norm_aname
                this.ruleForm_Info.belongsClass = this.changeDetSelect(res.data.sort_id, this.options)
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
        // 级联获取数组
        changeDetSelect(key, treeData) {
            let arr = []; // 在递归时操作的数组
            let returnArr = []; // 存放结果的数组
            let depth = 0; // 定义全局层级
            // 定义递归函数
            function childrenEach(childrenData, depthN) {
                for (var j = 0; j < childrenData.length; j++) {
                    depth = depthN; // 将执行的层级赋值 到 全局层级
                    arr[depthN] = (childrenData[j].id);
                    if (childrenData[j].id == key) {
                        returnArr = arr.slice(0, depthN + 1); //将目前匹配的数组，截断并保存到结果数组，
                        break
                    } else {
                        if (childrenData[j].children) {
                            depth++;
                            childrenEach(childrenData[j].children, depth);
                        }
                    }
                }
                return returnArr;
            }

            return childrenEach(treeData, depth);
        },
      
    
        // 导入数据
        importExcelData() {
            this.isLoading = true
            let params = new FormData(),
                that = this; // 创建form对象
            params.append('pathName', this.fileList[0].raw);
            dataBenchmarkingAllFun.importExcelData(params).then(res => {
                this.fileList.splice(0);
                if (res.code == '200') {
                    that.isLoading = false
                    that.$emit('handleClick');
                    that.getDbmNormbasicInfo(1, that.pagesize)
                } else {
                    that.isLoading = false
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: "error"
                    });
                }
            });
        },
       
        handleConfimr() {
            this.importUserDialog = false;
            this.importExcelData();
        },
        //导入数据的取消
        handleFirst1() {
            this.fileList.splice(0);
            this.importUserDialog = false;
            this.$message.info('已取消上传');
        },
        //过滤发布状态
        fulterChangeFun(filter) {
            this.norm_status = filter.Releasestatus[0] ? filter.Releasestatus[0] : ''
            this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status, this.nodeId)
            /*  if (this.norm_status == '1' || this.norm_status == '0') {
                 if (this.searchValue != '') {
                     this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status,this.nodeId)
                 } else {
                     this.classfilterFun(1, this.pagesize, this.norm_status)
                 }

             } else {
                 if (this.searchValue != '') {
                     this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status)
                 } else {
                     this.getDbmNormbasicInfo(this.currentPage, this.pagesize)
                 }

             } */

        },
        classfilterFun(curr, pagesize, code_status) {
            dataBenchmarkingAllFun.getDbmNormbasicByStatus({
                'norm_status': code_status,
                'currPage': curr,
                'pageSize': pagesize
            }).then(res => {
                let arr = res.data.dbmNormbasicInfos,
                    that = this;
                for (let i = 0; i < arr.length; i++) {
                    arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options)
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
        // 全选
        allselect(all) {
            this.selectrow = all
        },
      
        //检索标准分类信息
        searchDbmSortInfoFun() {
            this.searchValue = this.search_Value
            this.search_status = 'search'
            this.searchDbmSortInfo(this.searchValue, '1', this.pagesize, this.norm_status, this.nodeId)
        },
        searchDbmSortInfo(searchValue, currentpage, pagesize, norm_status, nodeId) {
            let that = this;
            dataBenchmarkingAllFun.searchDbmNormbasic({
                "search_cond": searchValue,
                'currPage': currentpage,
                'pageSize': pagesize,
                'status': norm_status,
                'sort_id': nodeId
            }).then(res => {
                let arr = res.data.dbmNormbasicInfos
                for (let i = 0; i < arr.length; i++) {
                    arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options)
                    for (let k = 0; k < that.dataType.length; k++) {
                        if (arr[i].data_type == that.dataType[k].code) {
                            arr[i].data_type = that.dataType[k].value
                        }
                    }
                }
                this.tableData = arr;
                this.totalSize = res.data.totalSize
            })
        },

    }
};
</script>

<style lang="less">
#nameTable {
    .mytree /deep/ {
        .el-tree>.el-tree-node:after {
            border-top: none;
        }

        .el-tree-node {
            position: relative;
            padding-left: 16px;
        }

        //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
        /*  .el-tree-node__expand-icon.is-leaf {
                display: none;
            } */

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

        .el-tree-node__content>.el-tree-node__expand-icon {
            padding: 0px;
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
}

#nameTable {
    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }

    .zdtitle {
        font-size: 15px;
        // font-weight: bold;
        color: #2196f3;
    }

    .scrollbar-wrap {
        width: 24% !important;
        position: absolute;
    }

    .scrollbar__track {
        width: 4px;
    }
}

.span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 14px;
}
</style>
