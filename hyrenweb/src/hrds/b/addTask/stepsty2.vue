<template>
<div class="singlesearch" >
     <Step :active="active" :typeinfo='typeinfo'></Step>
     <el-tabs v-model="activeName" type="border-card" >
        <el-tab-pane  name="first">
    <div id="singleTable">
        <div class="rightSearch">
            <el-input v-model="search" placeholder="多表查询请用|分隔" style="width: 50%;margin-right: 10px;" @keyup.enter.native="searchEnterFun" />
            <el-button size="mini" type="success" icon="el-icon-search" @click="schfilter(search)">查询</el-button>
            <el-button size="mini" type="success" @click="getAllTableInfoFun()" >查看全表</el-button>
        </div>
        <div class="singleTableinner">
            <el-table ref="ty_Table" stripe :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" border :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
                 <el-table-column  align="center" width="60" type="selection">
                </el-table-column>
                <el-table-column label="序号" align="center" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="table_name" label="表名"  align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="table_ch_name" label="表中文名"  align="center" :show-overflow-tooltip="true">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.table_ch_name" placeholder="中文名" ></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="selectCol" label="选择列" align="center">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="dialogSelectColumn=true" type="info">选择列</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="ty_handleSizeChange" @current-change="ty_handleCurrentChange" :current-page="currentPage" :page-sizes="[50, 100, 150, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
        </div>
    </div>
        </el-tab-pane>
     </el-tabs>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="leftbtn">返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="rightbtn">完成</el-button>
            <el-button type="primary" size="medium" class="rightbtn">上一步</el-button>
        </el-col>
    </el-row>
    <!-- 第一个页面 选择列弹层 -->
    <el-dialog title="选择列" :visible.sync="dialogSelectColumn" width="60%">
        <div slot="title" class="header-title">
            <span class="dialogtitle el-icon-caret-right">选择列</span>
        </div>
        <el-table stripe :data="SelectColumnData" border size="medium" highlight-current-row>
            <el-table-column  align="center" width="60" type="selection">
                </el-table-column>
            <el-table-column property="column_name" label="列名" align="center"  :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="column_type" label="字段类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="column_ch_name" label="列中文名" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.column_ch_name" placeholder="中文名" size="medium"></el-input>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import Step from "./step";
import Loading from "../../components/loading";

export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 1,
            typeinfo:2,
            rule: validator.default,
            dialogSelectColumn: false,
            tableData:[{
                table_ch_name:'123',
                table_name:'123',
            }],
            activeName:'first',
            isLoading:false,
            SelectColumnData: [
                {
                    column_name:'123',
                    column_type:'v',
                    column_ch_name:'132'
                }
            ],
            currentPage:1,
            pagesize:100,
            search:''
        };
    },
    created() {
       /*  this.dbid = parseInt(this.$route.query.id);
        this.agentId = this.$route.query.agent_id;
        this.sourceId = this.$route.query.source_id;
        this.sourceName = this.$Base64.decode(this.$route.query.source_name);
        this.edit = this.$route.query.edit; */
        // this.getAllTableInfo()

    },
    mounted() {

    },
    methods:{
        ty_handleSizeChange(size){
            this.pagesize=size
        },
        ty_handleCurrentChange(current){
            this.currentPage=current
        },
          // 搜索
        schfilter(val) {
            if (val != "") {
                let params = {};
                params["colSetId"] = this.dbid;
                params["inputString"] = val;
                addTaskAllFun.getTableInfo(params).then(res => {
                    if (res.data.length > 0) {
                        let data = res.data;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].table_id && data[i].table_id != "") {
                                data[i].selectionState = true;
                            } else {
                                data[i].selectionState = false;
                            }
                        }
                        this.tableData = res.data;
                    } else {
                         this.tableData = [];
                    }
                });
            }
        },
        searchEnterFun(e) {
            var keyCode = window.event ? e.keyCode : e.which;
            if (keyCode == 13 && this.search) {
                this.schfilter(this.search);
            }
        },
         // 获取所有表信息
        getAllTableInfoFun() {
            this.onclickAll = true;
            this.Allis_selectionState = false;
            this.tableData.length = 0;
            this.getAllTableInfo()
        },
         getAllTableInfo() {
            this.isLoading = true
            let params = {};
            params["colSetId"] = this.dbid;
            addTaskAllFun.getAllTableInfo(params).then(res => {
                this.isLoading = false
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].table_id && data[i].table_id != "") {
                        data[i].selectionState = true;
                    } else {
                        data[i].selectionState = false;
                    }
                }
                this.tableData = JSON.parse(JSON.stringify(data));
            });
        },
    }

};
</script>

<style scoped>
.singlesearch>>>.el-tabs__content {
    overflow: visible !important;
}

#singleTable {
    position: relative;
}
.singlesearch>>>.el-tabs__nav{
    z-index:-1;
}
.rightSearch {
    /* width: 32%; */
    position: absolute;
    top: -53px;
    right: 0;
}

#singleTable>>>.el-pagination {
    text-align: center;
    margin-top: 6px;
}

.singleTableinner>>>.el-radio {
    color: #3d8dd2;
    margin: 6px 0 0 0;
}

.twopageradior>>>.el-radio {
    color: #3d8dd2;
    margin: -6px 6px 0 0;
}

/* #singleTable >>> .el-table__header tr,
#singleTable >>> .el-table__header th {
  padding: 0;
  height: 40px;
}
#singleTable >>> .el-table__body tr,
#singleTable >>> .el-table__body td {
  padding: 0;
  height: 40px;
}

#singleTable >>> .el-textarea__inner {
  height: 30px;
} */
.rightSearch>>>.el-input__inner {
    height: 30px;
}

.rightSearch>button {
    padding-top: 8px;
}

.locationcenter {
    text-align: center;
    margin-top: 5px;
}

.locationright {
    text-align: right;
}

.leftbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: left;
    margin: 15px;
    margin-bottom: 10px;
}

.rightbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: right;
    margin: 15px;
    margin-bottom: 10px;
}

.topcolumename {
    display: inline-block;
    background: #f3eded;
    color: #ec0b35;
    padding: 2px;
}

.alltable>>>.el-dialog__body {
    padding: 0 20px;
}

.textheight>textarea {
    min-height: 66px !important;
}

.testLinnk {
    text-align: center;
}

.testLinnk>span {
    font-size: 18px;
    color: #409eff;
}

.steps2>>>.el-form-item {
    margin-bottom: 0 !important;
}

.steps2>>>.el-form-item__content::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
    position: absolute;
    left: -8px;
}

.steps2>>>tr>td {
    padding: 0;
}

.steps2>>>tr>td>.cell {
    padding: 22px 10px;
}

.alltabletitle {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #d86b6b;
    background: #f3f0f0;
    margin-left: 4px;
}

.steps2>>>.el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 6px;
    position: absolute;
    top: 100%;
    left: 0%;
}

.steps2>>>.el-textarea>textarea {
    line-height: 14px;
}
</style>
