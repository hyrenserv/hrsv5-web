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
                <el-table :data="tableData" border size='medium' style="min-height: 200px;" class='outtable' ref="multipleTable" :row-key="(row)=>{ return row.basic_id}">
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
                            <el-button type="success" size="small" @click="editbasicByIdFun(scope.row)">查看详情
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @prev-click='dbMark_preclickFun' @next-click='dbMark_nextclickFun' @size-change="dbMark_handleSizeChange" @current-change="dbMark_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class='locationcenter' />
            </el-row>
        </el-col>
    </el-row>
    <!-- 查看详情的弹框 -->
    <el-dialog title="详细标准元" :visible.sync="dialogEditTableVisible" width="60%" class='data_edit'>
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">详细信息</span>
        </div>
        <el-row>
            <el-collapse v-model="activeNames">
                <el-form ref="ruleForm_Info" :model="ruleForm_Info" label-width="86px">
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>标准编号 : </p> {{ruleForm_Info.standardNum}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>中文名称 : </p> {{ruleForm_Info.cnName}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>英文名称 : </p> {{ruleForm_Info.enName}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>标准别名 : </p> {{ruleForm_Info.standardAlias}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span="7">
                            <el-row>
                                <span>
                                    <p>归属分类 : </p> {{ruleForm_Info.belongsClass}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>数据类型 : </p> {{ruleForm_Info.data_types}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>字段长度 : </p> {{ruleForm_Info.fieldLength}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>小数长度 : </p> {{ruleForm_Info.decimalLen}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>所属代码 : </p> {{ruleForm_Info.belongsCode}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>管理部门 : </p> {{ruleForm_Info.department}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>相关部门 : </p> {{ruleForm_Info.relevantDepartments}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>发布状态 : </p> {{ruleForm_Info.norm_status}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>可信系统 : </p> {{ruleForm_Info.trustedSystem}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>相关标准 : </p> {{ruleForm_Info.relatedStandards}}
                                </span>
                            </el-row>
                        </el-col>
                        <el-col :span='7'>
                            <el-row>
                                <span>
                                    <p>制定人 : </p> {{ruleForm_Info.enactingPerson}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col>
                            <el-row>
                                <span>
                                    <p>业务定义 : </p> {{ruleForm_Info.worksDefin}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col>
                            <el-row>
                                <span>
                                    <p>业务规则 : </p> {{ruleForm_Info.workRule}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col>
                            <el-row>
                                <span>
                                    <p>标准定义 : </p> {{ruleForm_Info.sdefinition}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class='xjtxtcolor'>
                        <el-col>
                            <el-row>
                                <span>
                                    <p>值域 : </p> {{ruleForm_Info.dbm_domain}}
                                </span>
                            </el-row>
                        </el-col>
                    </el-row>
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
        cleanFun() {
            this.listId = ''
            this.loading = true
            this.basic_id_s = []
            this.selectrow = []
            this.norm_status = ''
            this.search_status = ''
            this.NodeClick = ''
            this.nodeId = ''
            this.search_Value = ''
        },
        // 获取代码类下拉
        getDbmCodeTypeIdAndNameInfo() {
            dataBenchmarkingAllFun.getDbmCodeTypeIdAndNameInfo().then(res => {
                this.dbmCodeTypeInfos = res.data.dbmCodeTypeInfos
            });
        },
        //相关标准信息
        getDbmNormbasicIdAndNameInfo() {
            dataBenchmarkingAllFun.getDbmNormbasicIdAndNameInfo().then(res => {
                this.dbmNormbasicInfos = res.data.dbmNormbasicInfos
            });
        },
        dbMark_handleSizeChange(size) {
            this.pagesize = size;
            if (this.norm_status == '1' || this.norm_status == '0' || this.search_status == 'search' || this.nodeId != '') {
                this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status, this.nodeId)
            } else {
                this.getDbmNormbasicInfo(this.currentPage, this.pagesize)
            }

        },
        dbMark_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            if (this.norm_status == '1' || this.norm_status == '0' || this.search_status == 'search' || this.nodeId != '') {
                this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status, this.nodeId)
            } else {
                this.getDbmNormbasicInfo(this.currentPage, this.pagesize)
            }

        },
        dbMark_nextclickFun(currentPage) {
            this.dbMark_handleCurrentChange(currentPage)
        },
        dbMark_preclickFun(currentPage) {
            this.dbMark_handleCurrentChange(currentPage)
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
        // 数据类型遍历得到中文名
        datatypeFun(data_type) {
            for (let k = 0; k < this.dataType.length; k++) {
                if (data_type == this.dataType[k].code) {
                    return this.dataType[k].value
                }
            }
        },
        // 代码类遍历得到中文名
        codeValueFun(code) {
            for (let k = 0; k < this.dbmCodeTypeInfos.length; k++) {
                if (code == this.dbmCodeTypeInfos[k].code_type_id) {
                    return this.dbmCodeTypeInfos[k].code_type_name
                }
            }
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
                this.ruleForm_Info.belongsClass = this.getparentClassNmae(res.data.sort_id, this.options)
                //   params[""] = this.ruleForm_Info.standardDescription;//标准描述--
                //   params[""] = this.ruleForm_Info.fieldName;//字段名称--
                this.ruleForm_Info.data_types = this.datatypeFun(res.data.data_type)
                this.ruleForm_Info.fieldLength = res.data.col_len
                this.ruleForm_Info.decimalLen = res.data.decimal_point
                this.ruleForm_Info.belongsCode = this.codeValueFun(res.data.code_type_id)
                this.ruleForm_Info.worksDefin = res.data.business_def
                this.ruleForm_Info.workRule = res.data.business_rule
                this.ruleForm_Info.sdefinition = res.data.norm_basis
                this.ruleForm_Info.dbm_domain = res.data.dbm_domain
                this.ruleForm_Info.department = res.data.manage_department
                this.ruleForm_Info.relevantDepartments = res.data.relevant_department
                this.ruleForm_Info.norm_status = '已发布'
                this.ruleForm_Info.trustedSystem = res.data.origin_system
                this.ruleForm_Info.relatedStandards = res.data.related_system
                this.ruleForm_Info.enactingPerson = res.data.formulator
            });
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

.xjtxtcolor p {
    color: #636c73;
    display: inline-block;
    font-weight: bold;
}

.xjtxtcolor span {
    color: #a09d9d;
}

.xjtxtcolor {
    border-bottom: 1px dotted #eae7e7;
}
</style>
