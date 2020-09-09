<template>
<div class="access">
    <el-row class="elRowtitle">
        <p class="tempalteInfo">取数</p>
        <el-button type="danger" class="templateButton" @click="goBack" size="small">
            返回上级
        </el-button>
    </el-row>
    <div class="lines"></div>
    <el-row class="elRowTemplate">
        <div class="elRowTemplateDiv">
            <div style="float:left">({{name}})模板信息</div>
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
                    <el-option v-for="item in valueDateData" :key="item.time" :label="item.time" :value="item.time">
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
                <el-button type="info" :loading="loadingSearch" @click="addTemplates" size="small" style="margin-right:10px;">
                    清单查询
                </el-button>
            </div>
        </div>
    </el-row>
    <!-- <div class="lines"></div> -->
    <el-table size="medium" :data="tableDataReusltWords" border stripe style="width: 100%" class="eltables">
        <el-table-column type="selection" width="70px" align='center' :selectable='checkboxSelect'>
        </el-table-column>
        <el-table-column label="条件名称" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="条件关系" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="条件值" align='center' show-overflow-tooltip>
            <template slot-scope="scope">
                <el-input v-model="scope.row.typeDec" size="mini" placeholder="条件值"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="值类型" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="类型描述" align='center' show-overflow-tooltip>
        </el-table-column>
    </el-table>
    <el-row class="elRows">
        <div class="elRowTemplateDiv">
            <p style="float:left">结果集列表</p>
            <div style="float:right">
                <span><span class="spanInfo">(温馨提示：最多只显示1000行)</span>
                    显示条数：<el-input placeholder="请输入非零的正整数" class="input-with-select" size="small" style="width:210px;margin-right:6px;" v-model="inputText">
                        <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
                    </el-input>
                </span>
                <el-button type="info" :loading="loadingSearch" @click="addTemplates" size="small">
                    查看SQL
                </el-button>
                <el-button type="primary"  @click="vieWCansee" size="small">
                    可视化
                </el-button>
                <el-button type="primary" :loading="loadingSearch" @click="addTemplates" size="small">
                    申请下载
                </el-button>
            </div>
        </div>
    </el-row>
    <el-table size="medium" :data="tableDataReusltWords" border stripe style="width: 100%" class="eltables">
        <el-table-column type="selection" width="70px" align='center'>
        </el-table-column>
        <el-table-column label="条件名称" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="条件关系" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="条件值" align='center' show-overflow-tooltip>
            <template slot-scope="scope">
                <el-input v-model="scope.row.typeDec" size="mini" placeholder="条件值"></el-input>
            </template>
        </el-table-column>
        <el-table-column label="值类型" align='center' show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="类型描述" align='center' show-overflow-tooltip>
        </el-table-column>
    </el-table>
    <!-- 选择结果字段弹出框 -->
    <el-dialog title="选择结果字段" :visible.sync="dialogGetKeys" width="660px">
        <el-table :data="tableDataColum" border stripe size="medium" @select-all="selectAll" @select="selectOnly">
            <el-table-column type="selection" width="60" align="center"></el-table-column>
            <el-table-column prop="column_name" label="显示名" align="center"></el-table-column>
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
</div>
</template>

<script>
export default {
    data() {
        return {
            showOrhidden: true,
            tableDataReusltWords: [{
                typeDec: '1,2,3'
            }, {}, {}, {}, {}, {}],
            name: 'xxx',
            dec: 'xxx',
            select: '差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考差多少参考',
            dialogGetKeys: false,
            tableDataColum: [{
                    column_name: 'test'
                }, {
                    column_name: 'teses'
                },
                {
                    column_name: 'play'
                },
            ],
            selectkeysArr: [],
            valueDateData: [{
                time: '2020-02-13 12:32:46'
            }, {
                time: '2020-02-12 12:32:46'
            }, {
                time: '2020-02-11 12:32:46'
            }, {
                time: '2020-12-12 12:32:46'
            }],
            valueDate: '',
            loadingSearch: false,
            inputText: ''
        }
    },
    methods: {
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
                    let indexMark = this.tableDataColum.findIndex(item => item.column_name == this.selectkeysArr[i].column_name);
                    forArry[indexMark] = this.selectkeysArr[i].column_name;
                }
                for (let i = 0; i < forArry.length; i++) { //数据拼接
                    if (forArry[i] != undefined) {
                        str += forArry[i] + ',';
                    }
                }
            } else if (this.selectkeysArr.length == 0) {
                str = "空"
            }
            this.select = str;
            this.dialogGetKeys = false;
        },
        //字段结果全选
        selectAll(val) {
            this.selectkeysArr = val;
        },
        // 字段结果单独选择
        selectOnly(val) {
            this.selectkeysArr = val;
        },
        //获取历史选择字段
        getChangeValue(val) {
            console.log(val)
        },
        checkboxSelect() {
            return false
        },
        // 可视化
        vieWCansee(){
            this.$router.push({
                name:'visualization',
                query:{

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
.eltables{
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
</style>
