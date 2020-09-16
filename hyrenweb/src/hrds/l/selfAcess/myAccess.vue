<template>
<div class="access">
    <el-row class="elRowtitle">
        <p class="tempalteInfo">我的取数</p>
        <el-button type="danger" class="templateButton" @click="goBack" size="small">
            返回上级
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-row class="elRowTemplate">
        <div class="elRowTemplateDiv">
            <div style="float:left">({{name}})的取数用途</div>
        </div>
        <el-row>
            <div class="templateDec">用途描述:<span>{{dec}}</span></div>
        </el-row>
    </el-row>
    <el-row class="elRowTemplate">
        <div class="elRowTemplateDiv">
            <div style="float:left">结果字段</div>
        </div>
        <div class="selectWords"><span>已选中的字段：</span>{{select}}</div>
    </el-row>
    <el-row class="elRows">
        <div class="elRowTemplateDiv">
            <p style="float:left">选择过滤条件</p>
        </div>
    </el-row>
    <!-- <div class="lines"></div> -->
    <el-table size="medium" :data="tableDataReusltWords" border stripe style="width: 100%" class="eltables">
        <el-table-column label="条件名称" align='center' prop="cond_en_column" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="条件关系" align='center' prop="con_relation" show-overflow-tooltip width="130">
        </el-table-column>
        <el-table-column label="条件值" align='center' prop="pre_value" show-overflow-tooltip width="254">
            <template slot-scope="scope">
                <div v-if="scope.row.value_type =='枚举'">
                    <el-input v-model="scope.row.pre_value" size="mini" readonly placeholder="条件值" style="width:160px;margin-right:6px;"></el-input><span @click="moreChooseClick(scope.$index,scope.row)" class="moreChoose">更多选择</span>
                </div>
                <div v-else>
                    <el-input v-model="scope.row.pre_value" readonly size="mini" placeholder="条件值"></el-input>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="值类型" align='center' prop="value_type" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="类型描述" prop="value_size" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="是否必填" align='center' width="120">
            <template slot-scope="scope">
                <el-radio-group v-model="scope.row.is_required" disabled>
                    <el-radio :label="'1'">是</el-radio>
                    <el-radio :label="'0'">否</el-radio>
                </el-radio-group>
            </template>
        </el-table-column>
    </el-table>
    <el-row v-if="dynamicColumnTable.length >0" style="margin-bottom:20px;">
        <el-row class="elRows">
            <div class="elRowTemplateDiv">
                <p style="float:left">结果集列表</p>
                <div style="float:right">
                    <span><span class="spanInfo">(温馨提示：最多只显示1000行，默认10行)</span>
                        显示条数：<el-input placeholder="请输入非零的正整数" class="input-with-select" size="small" style="width:210px;margin-right:6px;" v-model="inputText">
                            <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
                        </el-input>
                    </span>
                    <el-button type="info" @click="viewSql" size="small">
                        查看SQL
                    </el-button>
                    <el-button type="primary" @click="ViewCansee" size="small">
                        可视化
                    </el-button>
                    <el-button type="primary" @click="saveDownload" size="small">
                        申请下载
                    </el-button>
                </div>
            </div>
        </el-row>
        <el-table size="medium" :data="dynamicColumnTable" border stripe style="width: 100%">
            <el-table-column type="index" label="序号" width="70px" align='center'>
            </el-table-column>
            <el-table-column v-for="col in dynamicColumn" show-overflow-tooltip min-width="200px" :prop="col" :label="col" :key="col">
            </el-table-column>
        </el-table>
    </el-row>

    <!-- 点击更多选择按钮 -->
    <el-dialog title="选择条件值" :visible.sync="chooseMoreDataDiolag" width="600px">
        <el-table :data="chooseMoreData" border stripe size="medium" @select-all="selectAllChooseMore" @select="selectOnlyChooseMore">
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column prop="value" label="名称" align="center"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelchooseMoreData" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="savechooseMoreData" size="mini">保 存</el-button>
        </div>
    </el-dialog>
    <!-- 查看sql -->
    <el-dialog title="查看sql" :visible.sync="viewSqlDataDiolag" width="900px">
        <el-input type="textarea" :rows="14" placeholder="请输入内容" v-model="viewSqlText">
        </el-input>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelviewSqlData" size="mini" type="danger">关 闭</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./selfAcess";
import * as fixedAll from "@/utils/js/fileOperations";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    data() {
        return {
            tableDataReusltWords: [],
            name: '',
            dec: '',
            select: '',
            dynamicColumnTable: [],
            dynamicColumn: [],
            inputText: '10',
            dialogFormSave: false,
            viewSqlDataDiolag: false,
            options: [],
            chooseMoreData: [],
            chooseMoreDataDiolag: false,
            markGetAllCodeItems: [],
            chooseMoreDataSelect: [],
            moreChooseClickIndex: '',
            viewSqlText: '',
        }
    },
    mounted() {
        // 获取页面初始值
        this.getCategoryItems();
        this.getAllCodeItems();
        this.getMyAccessInfoById();
        this.getChangeValue(this.$route.query.fetch_sum_id);
        this.getAutoAccessQueryResult(this.$route.query.fetch_sum_id);
    },
    methods: {
        // 返回上一级
        goBack() {
            this.$router.push({
                name: 'autonomousAnalysisOperate'
            })
        },
        // 获取取数的初始值
        getMyAccessInfoById() {
            functionAll.getMyAccessInfoById({
                fetch_sum_id: this.$route.query.fetch_sum_id
            }).then(res => {
                this.name = res.data.fetch_name;
                this.dec = res.data.fetch_desc;
            })
        },
        //获取历史选择字段
        getChangeValue(val) {
            if (val === "") {
                this.getAccessTemplateInfoById();
                this.getAccessResultFields();
                this.getAccessSelectHistory();
                this.getAutoAccessFilterCond();
                this.select = ""
            } else {
                functionAll.getAccessCondFromHistory({ //选择过滤条件
                    fetch_sum_id: val
                }).then(res => {
                    res.data.forEach(item => {
                        this.options.forEach(val => {
                            if (item.value_type == val.code) {
                                item.value_type = val.value;
                                item.valueType = val.code;
                            }
                        })
                    })
                    this.tableDataReusltWords = res.data;
                })
                functionAll.getAccessResultFromHistory({ //选中字段展示
                    fetch_sum_id: val
                }).then(res => {
                    this.select = ""
                    res.data.forEach((item) => {
                        this.select += item.res_show_column + "，"
                    })
                })
            }

        },
        // 查看sql
        viewSql() {
            this.viewSqlDataDiolag = true;
            functionAll.getAccessSql({
                fetch_sum_id: this.$route.query.fetch_sum_id
            }).then(res => {
                this.viewSqlText = res.data
            })
        },
        //关闭sql弹出框
        cancelviewSqlData() {
            this.viewSqlDataDiolag = false;
        },
        // 可视化
        ViewCansee() {
            this.$router.push({
                name: 'visualization',
                query: {
                    fetch_sum_id: this.$route.query.fetch_sum_id
                }
            })
        },
        // 申请下载
        saveDownload() {
            this.$confirm('确认下载(' + this.name + ')模板吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                functionAll.downloadMyAccessTemplate({
                    fetch_sum_id: this.$route.query.fetch_sum_id
                }).then(res => {
                    if (res && res.success) {
                        this.$Msg.customizTitle('文件将下载至服务器，请联系管理员', 'success')

                    }
                })
            }).catch(() => {
                this.$Msg.customizTitle('已取消下载', 'info')
            });
        },
        // 获取代码项
        getCategoryItems() {
            functionAll.getCategoryItems({
                category: 'AutoValueType'
            }).then(res => {
                this.options = res.data;
            })
        },
        // 获取自主取数清单查询结果
        getAutoAccessQueryResult(val) {
            functionAll.getAutoAccessQueryResult({
                fetch_sum_id: val
            }).then(res => {
                if (res.data.length > 0) {
                    this.dynamicColumn = Object.keys(res.data[0])
                    this.dynamicColumnTable = res.data;
                }
            })
        },
        // 根据value_type类型显示更多选择
        moreChooseClick(index, row) {
            this.moreChooseClickIndex = index;
            let i = this.markGetAllCodeItems.findIndex(item => item.value == row.value_size);
            functionAll.getCategoryItems({
                category: this.markGetAllCodeItems[i].keycode
            }).then(res => {
                this.chooseMoreData = res.data;
            })
            this.chooseMoreDataDiolag = true;
        },
        // 获取全部代码项
        getAllCodeItems() {
            functionAll.getAllCodeItems({}).then(res => {
                let arr = [];
                for (let key in res.data) {
                    let object = {}
                    object.keycode = key;
                    object.value = res.data[key][0].catValue;
                    arr.push(object)
                }
                this.markGetAllCodeItems = arr;
            })
        },
        // 全选
        selectAllChooseMore(val) {
            this.chooseMoreDataSelect = val;
        },
        // 单独选择
        selectOnlyChooseMore(val) {
            this.chooseMoreDataSelect = val;
        },
        // 保存
        savechooseMoreData() {
            this.tableDataReusltWords[this.moreChooseClickIndex].pre_value = '';
            this.tableDataReusltWords[this.moreChooseClickIndex].pre_valueCode = '';
            this.chooseMoreDataSelect.forEach(item => {
                this.tableDataReusltWords[this.moreChooseClickIndex].pre_value += item.value + ',';
                this.tableDataReusltWords[this.moreChooseClickIndex].pre_valueCode += item.code + ',';
            })
            this.chooseMoreDataDiolag = false;
        },
        // 取消保存
        cancelchooseMoreData() {
            this.chooseMoreDataDiolag = false;
        },
        searchInfo() {
            functionAll.getAccessResultByNumber({
                fetch_sum_id: this.$route.query.fetch_sum_id,
                showNum: this.inputText
            }).then(res => {
                if (res.data.length > 0) {
                    this.dynamicColumn = Object.keys(res.data[0])
                    this.dynamicColumnTable = res.data;
                }
            })
        },
    }
}
</script>

<style scoped>
/* 模板信息 */
.elRowTemplate {
    border: 1px solid #ddd;
    margin-bottom: 10px;
}

.templateDec {
    width: 100%;
    height: 54px;
    line-height: 54px;
}

.elRowTemplateDiv {
    width: 100%;
    height: 44px;
    line-height: 44px;
    background: #f5f5f5;
    font-size: 16px;
    /* color: #2196f3; */
    border-bottom: 1px solid #ddd;
}

/* 行设置  */
/* 行标题 */
.elRowtitle {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.elRows {
    height: 44px;
    line-height: 44px;
    width: 100%;
    margin-bottom: 10px;
}

/* title设置 */
.tempalteInfo {
    float: left;
    font-size: 18px;
    color: #2196f3;
}

.tempalteButton {
    float: right;
}

.lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

/* 表格 */
.eltables {
    margin-bottom: 30px;
}

/*表格输入框 */
.access .eltables>>>.el-input--mini .el-input__inner {
    height: 24px;
    line-height: 24px;
}

/* 选择结果字段 */
.selectResultWords {
    width: 200px;
    height: 30px;
    line-height: 30px;
    margin-top: 8px;
}

.selectResultWords:hover {
    cursor: pointer;
    color: #337AB7;
    /* font-size: 18px; */
}

.selectWords {
    margin: 18px 0 20px 0;
}

.selectWords span {
    color: red;
}

/* 结果数据查询 */
.spanInfo {
    color: red;
    font-size: 14px;
}

/* 按钮 */
.templateButton {
    float: right;
    margin-top: 4px;
}

/* 模板参数单选按钮 */
.access>>>.el-radio__label {
    padding-left: 4px;
}

.access>>>.el-radio {
    margin-right: 14px;
}

.access .moreChoose {
    color: #2196f3;
    cursor: pointer;
}
</style>
