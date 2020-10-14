<template>
<div class="access">
    <el-row class="elRowtitle">
        <p class="tempalteInfo">自主取数</p>
        <el-button type="primary" class="templateButton" @click="goBack" size="small">
            返回上级
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-row class="elRowTemplate">
        <div class="elRowTemplateDiv">
            <div style="float:left">模板信息({{name}})</div>
        </div>
        <el-row>
            <div class="templateDec">模板描述:<span>{{dec}}</span></div>
        </el-row>
    </el-row>
    <el-row class="elRowTemplate">
        <div class="elRowTemplateDiv">
            <div style="float:left">结果字段</div>
            <div style="float:right;margin-right:2px">
                <el-select v-model="valueDate" placeholder="选择历史字段" size="small" @change="getChangeValue" clearable>
                    <el-option v-for="item in valueDateData" :key="item.fetch_sum_id" :label="item.createDateFormat" :value="item.fetch_sum_id">
                    </el-option>
                </el-select>
                <el-button type="info" @click="getKeyWords" size="small" style="margin-left:10px">
                    选择结果字段
                </el-button>
            </div>
        </div>
        <div class="selectWords"><span>已选中的字段：</span>{{select}}</div>
    </el-row>
    <el-row class="elRows">
        <div class="elRowTemplateDiv">
            <p style="float:left">选择过滤条件</p>
            <div style="float:right">
                <el-button type="info" :loading="loadingSearch" @click="saveAutoAccessInfoToQuery" size="small" style="margin-right:10px;">
                    清单查询
                </el-button>
            </div>
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
                    <el-input v-model="scope.row.pre_value" size="mini" placeholder="条件值" style="width:160px;margin-right:6px;"></el-input><span @click="moreChooseClick(scope.$index,scope.row)" class="moreChoose">更多选择</span>
                </div>
                <div v-else>
                    <el-input v-model="scope.row.pre_value" size="mini" placeholder="条件值"></el-input>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="值类型" align='center' prop="value_type" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="类型描述" prop="value_size" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="是否必填" align='center' width="120">
            <template slot-scope="scope">
                <el-radio-group v-model="scope.row.is_required" v-if="scope.row.is_required ==0">
                    <el-radio :label="'1'">是</el-radio>
                    <el-radio :label="'0'">否</el-radio>
                </el-radio-group>
                <el-radio-group v-model="scope.row.is_required" v-else disabled>
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
                    <span><span class="spanInfo">(温馨提示：最多只显示1000行，默认100行)</span>
                        显示条数：<el-input placeholder="请输入非零的正整数" class="input-with-select" size="small" style="width:210px;margin-right:6px;" v-model="inputText">
                            <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
                        </el-input>
                    </span>
                    <el-button type="info" @click="viewSql" size="small">
                        查看SQL
                    </el-button>
                    <el-button type="primary" @click="saveView" size="small">
                        保存及可视化
                    </el-button>
                    <el-button type="primary" @click="save" size="small">
                        保存
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

    <!-- 选择结果字段弹出框 -->
    <el-dialog title="选择结果字段" :visible.sync="dialogGetKeys" width="660px">
        <el-table :data="tableDataColum" border stripe size="medium" @select-all="selectAll" @select="selectOnly">
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column prop="res_show_column" label="显示名" align="center"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="moveUp(scope.$index,scope.row,tableDataColum)">上移</el-button>
                    <el-button type="primary" size="mini" @click="moveDown(scope.$index, scope.row,tableDataColum)">下移</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveTableColum" size="mini">保 存</el-button>
        </div>
    </el-dialog>
    <!-- 保存可视化的弹出表单 -->
    <el-dialog title="可视化" :visible.sync="dialogFormViewSave" :before-close="beforeCloseAccessView" width="580px">
        <el-form :model="FormViewSave" ref="FormViewSave" label-width="140px">
            <el-form-item label="取数主题" prop="fetch_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="FormViewSave.fetch_name" autocomplete="off" placeholder="请输入取数主题" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label="取数用途" prop="fetch_desc">
                <el-input type="textarea" v-model="FormViewSave.fetch_desc" autocomplete="off" placeholder="请输入取数用途" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="canclesaveAccessView" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveAccessView('FormViewSave')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 保存的弹出表单 -->
    <el-dialog title="保存取数" :visible.sync="dialogFormSave" :before-close="beforeCloseAccess" width="580px">
        <el-form :model="FormSave" ref="FormSave" label-width="140px">
            <el-form-item label="取数主题" prop="fetch_name" :rules="filter_rules([{required: true}])">
                <el-input v-model="FormSave.fetch_name" autocomplete="off" placeholder="请输入取数主题" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label="取数用途" prop="fetch_desc">
                <el-input type="textarea" v-model="FormSave.fetch_desc" autocomplete="off" placeholder="请输入取数用途" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="canclesaveAccess" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="saveAccess('FormSave')" size="mini">保存</el-button>
        </div>
    </el-dialog>
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
            showOrhidden: true,
            tableDataReusltWords: [],
            name: '',
            dec: '',
            select: '',
            dialogGetKeys: false,
            tableDataColum: [],
            selectkeysArr: [],
            dynamicColumnTable: [],
            dynamicColumn: [],
            valueDateData: [],
            valueDate: '',
            loadingSearch: false,
            inputText: null,
            dialogFormViewSave: false,
            dialogFormSave: false,
            viewSqlDataDiolag: false,
            FormViewSave: {
                fetch_desc: '',
                fetch_name: ''
            },
            FormSave: {
                fetch_desc: '',
                fetch_name: ''
            },
            options: [],
            markObject: {

            },
            chooseMoreData: [],
            chooseMoreDataDiolag: false,
            markGetAllCodeItems: [],
            chooseMoreDataSelect: [],
            moreChooseClickIndex: '',
            showNumArry: [],
            viewSqlText: '',
            markFetchId: ''

        }
    },
    mounted() {
        // 获取页面初始值
        this.getCategoryItems();
        this.getAccessTemplateInfoById();
        this.getAccessResultFields();
        this.getAccessSelectHistory();
        this.getAutoAccessFilterCond();
        this.getAllCodeItems();
    },
    methods: {
        // 返回上一级
        goBack() {
            this.$router.push({
                name: 'autonomousAnalysisOperate'
            })
        },
        // 获取取数的初始值
        getAccessTemplateInfoById() {
            functionAll.getAccessTemplateInfoById({
                template_id: this.$route.query.template_id
            }).then(res => {
                this.name = res.data.template_name;
                this.dec = res.data.template_desc;
                this.markObject = res.data;
            })
        },
        // 获取自主取数结果字段
        getAccessResultFields() {
            functionAll.getAccessResultFields({
                template_id: this.$route.query.template_id
            }).then(res => {
                this.tableDataColum = res.data;
                this.showNumArry = res.data;
            })
        },
        // 获取自主取数选择历史信息
        getAccessSelectHistory() {
            functionAll.getAccessSelectHistory({
                template_id: this.$route.query.template_id
            }).then(res => {
                res.data.forEach((item, i) => {
                    item.createDateFormat = fixedAll.dateFormat(item.create_date) + " " + fixedAll.hourFormat(item.create_time);
                })
                this.valueDateData = res.data;
            })
        },
        // 获取自主取数过滤条件
        getAutoAccessFilterCond() {
            functionAll.getAutoAccessFilterCond({
                template_id: this.$route.query.template_id
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
        },
        // 获取结果字段名称
        getKeyWords() {
            this.dialogGetKeys = true;
        },
        // 数据上移
        moveUp(val, data, tableData) {
            if (val > 0) {
                let upDate = tableData[val - 1];
                tableData.splice(val - 1, 1);
                tableData.splice(val, 0, upDate);
                this.showNumArry = tableData;
            } else {
                this.$Msg.customizTitle("已经是第一条，不可上移", "warning");
            }
        },
        // 数据下移
        moveDown(val, data, tableData) {
            if (val + 1 === tableData.length) {
                this.$Msg.customizTitle("已经是最后一条，不可下移", "warning");
            } else {
                let downDate = tableData[val + 1];
                tableData.splice(val + 1, 1);
                tableData.splice(val, 0, downDate);
                this.showNumArry = tableData;
            }
        },
        // 取消选择
        cancelSelect() {
            this.dialogGetKeys = false;
        },
        // 保存选择
        saveTableColum() {
            let str = "";
            let forArry = [];
            if (this.selectkeysArr.length > 0) {
                for (let i = 0; i < this.selectkeysArr.length; i++) { //根据上移下移数据处理
                    let indexMark = this.tableDataColum.findIndex(item => item.res_show_column == this.selectkeysArr[i].res_show_column);
                    forArry[indexMark] = this.selectkeysArr[i].res_show_column;
                }
                for (let i = 0; i < forArry.length; i++) { //数据拼接
                    if (forArry[i] != undefined) {
                        str += forArry[i] + "，";
                    }
                }
            } else if (this.selectkeysArr.length == 0) {
                str = ""
            }
            this.select = str;
            this.dialogGetKeys = false;
        },
        //字段结果全选 
        selectAll(val) {
            this.showNumArry = val;
            this.selectkeysArr = val;
        },
        // 字段结果单独选择
        selectOnly(val) {
            this.showNumArry = val;
            this.selectkeysArr = val;
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
                fetch_sum_id: this.markFetchId
            }).then(res => {
                this.viewSqlText = res.data
            })
        },
        //关闭sql弹出框
        cancelviewSqlData() {
            this.viewSqlDataDiolag = false;
        },
        // 保存及可视化
        saveView() {
            this.dialogFormViewSave = true;
        },
        // 保存到可视化
        saveAccessView(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let parama = {};
                    parama.fetch_sum_id = this.markFetchId;
                    parama.template_id = this.$route.query.template_id;
                    parama.fetch_name = this.FormViewSave.fetch_name;
                    parama.fetch_desc = this.FormViewSave.fetch_desc;
                    functionAll.saveAutoAccessInfo(parama).then((res) => {
                        if (res && res.success) {
                            this.$router.push({
                                name: 'visualization',
                                query: {
                                    fetch_sum_id: this.markFetchId,
                                    fetch_name: this.FormViewSave.fetch_name
                                }
                            })
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        //取消到保存可视化
        canclesaveAccessView() {
            this.dialogFormViewSave = false;
            this.$refs.FormViewSave.resetFields();
        },

        // 保存取数
        save() {
            this.dialogFormSave = true;
        },
        //保存自主取数
        saveAccess(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let parama = {};
                    parama.fetch_sum_id = this.markFetchId;
                    parama.template_id = this.$route.query.template_id;
                    parama.fetch_name = this.FormSave.fetch_name;
                    parama.fetch_desc = this.FormSave.fetch_desc;
                    functionAll.saveAutoAccessInfo(parama).then((res) => {
                        if (res && res.success) {
                            this.$router.push({
                                name: 'autonomousAnalysisOperate'
                            })
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        // 取消保存自主取数
        canclesaveAccess() {
            this.dialogFormSave = false;
            this.$refs.FormViewSave.resetFields();
        },
        //关闭diolag框
        beforeCloseAccessView() {
            this.dialogFormViewSave = false;
            this.$refs.FormViewSave.resetFields();
        },
        //关闭diolag框
        beforeCloseAccess() {
            this.dialogFormSave = false;
            this.$refs.FormSave.resetFields();
        },
        // 获取代码项
        getCategoryItems() {
            functionAll.getCategoryItems({
                category: 'AutoValueType'
            }).then(res => {
                this.options = res.data;
            })
        },
        //保存自主取数清单查询入库信息(清单查询前看)
        saveAutoAccessInfoToQuery() {
            if (this.select === "") {
                this.$Msg.customizTitle("请选择结果字段", "warning");
            } else {
                this.loadingSearch = true;
                this.showNumArry.forEach((item, index) => {
                    item.show_num = index + 1;
                })
                let parama = {};
                parama.template_id = this.$route.query.template_id;
                parama.autoFetchRes = JSON.stringify(this.showNumArry);
                let arrFetchConds = [];
                this.tableDataReusltWords.forEach(item => {
                    if (item.value_type !== "枚举") {
                        let obj = {
                            pre_value: item.pre_value,
                            template_cond_id: item.template_cond_id,
                            is_required: item.is_required,
                            value_type: item.valueType,
                            con_relation: item.con_relation,
                            cond_en_column: item.cond_en_column
                        }
                        arrFetchConds.push(obj)
                    } else if (item.value_type === "枚举") {
                        if (item.pre_valueCode) {
                            let obj = {
                                pre_value: item.pre_valueCode,
                                template_cond_id: item.template_cond_id,
                                is_required: item.is_required,
                                value_type: item.valueType,
                                con_relation: item.con_relation,
                                cond_en_column: item.cond_en_column
                            }
                            arrFetchConds.push(obj)
                        } else {
                            let obj = {
                                pre_value: item.pre_value,
                                template_cond_id: item.template_cond_id,
                                is_required: item.is_required,
                                value_type: item.valueType,
                                con_relation: item.con_relation,
                                cond_en_column: item.cond_en_column
                            }
                            arrFetchConds.push(obj)
                        }

                    }
                })
                parama.autoTpCondInfos = JSON.stringify(arrFetchConds);
                functionAll.saveAutoAccessInfoToQuery(parama).then(res => {
                    this.loadingSearch = false;
                    if (res && res.success) {
                        this.markFetchId = res.data;
                        this.getAutoAccessQueryResult(res.data)
                    }
                })
            }

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
                fetch_sum_id: this.markFetchId,
                showNum: this.inputText
            }).then(res => {
                if (res.data.length > 0) {
                    this.dynamicColumn = Object.keys(res.data[0])
                    this.dynamicColumnTable = res.data;
                }
            })
        }
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
