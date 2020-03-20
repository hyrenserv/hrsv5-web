<template>
<div id='dui_two'>
    <el-row style="margin-bottom:10px">
        <el-col :span='17'>&nbsp;</el-col>

        <el-col :span='5' style="float:right">
            <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="codeValue">
                <el-button slot="append" icon="el-icon-search" @click="searchDbmCodeTypeInfo"></el-button>
            </el-input>
        </el-col>

    </el-row>
    <!--  -->
    <el-table :data="tableData" :row-key="(row)=>{ return row.code_type_id}" style="width: 100%;min-height:200px" border class='outtable' size='medium' ref="multipleTable" @cell-click="cellClick">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-row style="margin-bottom:10px">
                    <el-col :span='13'>&nbsp;</el-col>
                    <el-col :span='5' style="float:right">
                        <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="codeItem_Value">
                            <el-button slot="append" icon="el-icon-search" @click="searchDbmCodeItemInfo"></el-button>
                        </el-input>
                    </el-col>
                </el-row>
                <el-table :data="dataList.slice((itemcurrentPage - 1) * itempagesize, itemcurrentPage * itempagesize)" align="center" :empty-text="tableloadingInfo" stripe size='mini' class='in_tableColor' :row-key="(row)=>{ return row.code_item_id}">
                    <el-table-column label="序号" align="center" width="60">
                        <template scope="scope">
                            <span>{{scope.$index+(itemcurrentPage - 1) * itempagesize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="code_encode" label="代码编号">
                    </el-table-column>
                    <el-table-column align="center" prop="code_item_name" label="代码名称" width="100" :show-overflow-tooltip="true">
                    </el-table-column>
                    <el-table-column align="center" prop="code_value" label="代码值">
                    </el-table-column>
                    <el-table-column align="center" prop="dbm_level" label="层级">
                    </el-table-column>
                    <el-table-column align="center" prop="code_remark" label="代码描述" width="150" :show-overflow-tooltip="true">
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="item_handleSizeChange" @current-change="item_handleCurrentChange" :current-page="itemcurrentPage" :page-sizes="[10, 50, 100, 200]" :page-size="itempagesize" layout="total,prev, pager, next" :total="dataList.length" class='pagerigth'></el-pagination>
            </template>
        </el-table-column>
        <el-table-column label="序号" align="center" width="60">
            <template scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column label="代码编码" prop="code_encode" align="center">
        </el-table-column>
        <el-table-column label="代码类名" prop="code_type_name" align="center">
        </el-table-column>
        <el-table-column label="代码描述" prop="code_remark" align="center" width="150" :show-overflow-tooltip="true">
        </el-table-column>
    </el-table>
    <el-pagination @prev-click='sig_preclickFun' @next-click='sig_nextclickFun' @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="totalSize" class='locationcenter'></el-pagination>
</div>
</template>

<script>
import * as dataBenchmarkingAllFun from './dbm_check'
import * as message from "@/utils/js/message";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            tableloadingInfo: "数据加载中...",
            rule: validator.default,
            codeTypeValue: '',
            currentPage: 1,
            pagesize: 10,
            totalSize: 0,
            itemcurrentPage: 1,
            itempagesize: 10,
            dialogaddCodeclassableVisible: false,
            dialogaddCodeXableVisible: false,
            expands: [],
            tableData: [],
            codeItemData: {
                codeNum: '',
                codeName: '',
                codeValue: '',
                codeleav: '',
                codeDesc: ''
            },
            dataList: [],
            Releasestatus: [{
                text: '未发布',
                value: '0'
            }, {
                text: '已发布',
                value: '1'
            }, ],
            codeClassData: {
                code_encode: '',
                code_type_name: '',
                code_remark: '',
                code_status: ''
            },
            status: '',
            code_type_id: '',
            code_item_id: '',
            open: 'false',
            selectrow: [],
            code_type_id_s: [],
            code_status: '',
            item_selectrow: [],
            searchCodeTyp_status: '',
            codeValue: '',
            codeItem_Value: '',
            codeItemValue: '',
            codeItem_Status: '',
            title: ''
        }
    },
    mounted() {
        this.getDbmCodeTypeInfo(1, 10)
    },
    methods: {
        cleanFun() {
            this.status = ''
            this.code_type_id = ''
            this.code_item_id = ''
            this.open = 'false'
            this.selectrow = []
            this.code_type_id_s = []
            this.code_status = ''
            this.item_selectrow = []
            this.searchCodeTyp_status = ''
            this.codeValue = ''
            this.codeItem_Value = ''
            this.codeItemValue = ''
            this.codeItem_Status = ''
            this.title = ''
        },

        sig_handleSizeChange(size) {
            this.pagesize = size;
            if (this.code_status == '1' || this.code_status == '0') {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
                } else {
                    this.codefilterFun(this.currentPage, this.pagesize, this.code_status)
                }
            } else if (this.searchCodeTyp_status == 'search' && this.codeTypeValue != '') {
                this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
            } else {
                this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
            }
        },
        sig_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
            if (this.code_status == '1' || this.code_status == '0') {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
                } else {
                    this.codefilterFun(this.currentPage, this.pagesize, this.code_status)
                }
            } else if (this.searchCodeTyp_status == 'search' && this.codeTypeValue != '') {
                this.searchCodeTypeInfo(this.codeTypeValue, this.currentPage, this.pagesize, this.code_status)
            } else {
                this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)
            }
        },
        sig_preclickFun(currentPage) {
            this.sig_handleCurrentChange(currentPage)
        },
        sig_nextclickFun(currentPage) {
            this.sig_handleCurrentChange(currentPage)
        },
        item_handleSizeChange(size) {
            this.itempagesize = size;
        },
        item_handleCurrentChange(currentPage) {
            this.itemcurrentPage = currentPage;
        },
        //点击展开代码项
        cellClick(row, column, event) {
            this.dataList = []
            let $table = this.$refs.multipleTable;
            this.tableData.map((item) => {
                $table.toggleRowExpansion(item, false)
            })
            if (this.open == 'false') {
                if (event.cellIndex != 1 && event.cellIndex != 7) {
                    this.open = 'true'
                    this.$refs.multipleTable.toggleRowExpansion(row)
                    this.code_type_id = row.code_type_id
                    this.getAllCodeItemFun(row.code_type_id)
                }
            } else {
                this.open = 'false'
                this.$refs.multipleTable.toggleRowExpansion(row, false)
            }
        },
        //获取所有代码项方法
        getAllCodeItemFun(id) {
            let params = {}
            params["code_type_id"] = id;
            dataBenchmarkingAllFun.getDbmCodeItemInfoByCodeTypeId(params).then(res => {
                if (res.data.dbmCodeItemInfos.length > 0) {
                    this.dataList = res.data.dbmCodeItemInfos
                } else {
                    this.tableloadingInfo = '暂无数据'
                }
            });
        },

        //代码类- 获取分页数据
        getDbmCodeTypeInfo(page, size) {

            let params = {}
            params["currPage"] = page;
            params["pageSize"] = size;
            dataBenchmarkingAllFun.getDbmCodeTypeInfo(params).then(res => {
                this.tableData = res.data.dbmCodeTypeInfos
                this.totalSize = res.data.totalSize
            });
        },
        //过滤发布状态
        codeClass_fulterChangeFun(filter) {
            this.code_status = filter.Releasestatus[0] ? filter.Releasestatus[0] : ''
            if (this.code_status == '1' || this.code_status == '0') {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, 1, this.pagesize, this.code_status)
                } else {
                    this.codefilterFun(1, this.pagesize, this.code_status)
                }
            } else {
                if (this.codeTypeValue != '') {
                    this.searchCodeTypeInfo(this.codeTypeValue, 1, this.pagesize, this.code_status)
                } else {
                    this.getDbmCodeTypeInfo(this.currentPage, this.pagesize)

                }
            }

        },
        codefilterFun(curr, pagesize, code_status) {
            dataBenchmarkingAllFun.getDbmCodeTypeInfoByStatus({
                'code_status': code_status,
                'currPage': curr,
                'pageSize': pagesize
            }).then(res => {
                this.tableData = res.data.dbmCodeTypeInfos
                this.totalSize = res.data.totalSize
            });
        },
        //代码类搜索
        searchDbmCodeTypeInfo() {
            this.codeTypeValue = this.codeValue
            if (this.codeTypeValue != '') {
                this.searchCodeTyp_status = 'search'
                this.searchCodeTypeInfo(this.codeTypeValue, '1', this.pagesize, this.code_status)
            } else {
                this.searchCodeTyp_status = ''
            }
        },
        searchCodeTypeInfo(codeTypeValue, currentpage, pagesize, code_status) {
            dataBenchmarkingAllFun.searchDbmCodeTypeInfo({
                "search_cond": codeTypeValue,
                'currPage': currentpage,
                'pageSize': pagesize,
                'status': code_status
            }).then(res => {
                this.tableData = res.data.dbmCodeTypeInfos
                this.totalSize = res.data.totalSize
            })
        },
        //代码项搜索
        searchDbmCodeItemInfo() {
            this.codeItemValue = this.codeItem_Value
            if (this.codeItemValue != '') {
                this.codeItem_Status = 'seach'
                this.searchDbmCodeItemInfoFun(this.codeItemValue, this.itemcurrentPage, this.itempagesize, this.code_type_id)
            }
        },
        searchDbmCodeItemInfoFun(codeItemValue, currentpage, pagesize, code_type_id) {
            dataBenchmarkingAllFun.searchDbmCodeItemInfo({
                "search_cond": codeItemValue,
                'currPage': currentpage,
                'pageSize': pagesize,
                'code_type_id': code_type_id
            }).then(res => {
                this.dataList = res.data.dbmCodeItemInfos
            })
        }
    }
}
</script>

<style lang="less">
#dui_two {
    .pagerigth {
        text-align: right;
        margin-top: 10px;
    }

    .locationcenter {
        text-align: center;
        margin-top: 10px;
    }

    .allbutton /deep/ {

        .el-button--mini,
        .el-button--mini.is-round {
            padding: 4px 5px;
        }
    }

    .outtable /deep/ {

        .el-icon-arrow-down,
        .el-icon-arrow-up {
            color: #fff;
        }
    }

    .in_tableColor /deep/ {
        .el-table__header-wrapper {
            .el-table__header>thead>tr th {
                background-color: #829cfb !important
            }
        }
    }
}
</style>
