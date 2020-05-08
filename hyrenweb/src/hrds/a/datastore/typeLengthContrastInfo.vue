<template>
<div class="typeLengthContrastInfo">
    <el-row class="dataSave">
        <el-col :span="12">
            <span>存储层数据类型长度对比信息</span>
        </el-col>
        <el-col :span="12">
            <el-button size="small" type="primary" @click="addTypeLengthContrastInfo =true;addinfo()"><i class="el-icon-circle-plus-outline"></i>新增对照表</el-button>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row class="partOne">
        <el-table :data="tableData" border stripe size="medium" :span-method="arraySpanMethod">
            <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>
            <el-table-column label="长度对照名称" prop="dlcs_name" align="center"></el-table-column>
            <el-table-column label="长度对照表备注" prop="dlcs_remark" align="center"> </el-table-column>
            <el-table-column label="字段类型" prop="dlc_type" align="center"> </el-table-column>
            <el-table-column label="字段长度" prop="dlc_length" align="center"> </el-table-column>
            <el-table-column label="备注" prop="dlc_remark" align="center"> </el-table-column>

            <el-table-column label="操作" width="160" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="updateData(scope.row.dlcs_id)">编辑</el-button>
                    <el-button type="danger" size="mini" @click="deleteArry(scope.row.dlcs_id);">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>

    <!--存储层数据类型长度对照表 -->
    <el-dialog title="存储层数据类型长度对照主表" :visible.sync="dialogFormVisibleUpdate" width="70%" :before-close="beforeClose">
        <el-form ref="form" :model="form" label-width="140px">
            <el-col :span="12">
                <el-col :span="20">
                    <el-form-item label="长度对照名称" prop="dlcs_name" :rules="filter_rules([{required: true}])">
                        <el-input v-model="form.dlcs_name" placeholder="长度对照名称"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>

            <el-col :span="12">
                <el-col :span="20">
                    <el-form-item label="长度对照表备注" prop="dlcs_remark">
                        <el-input v-model="form.dlcs_remark" placeholder="长度对照表备注"></el-input>
                    </el-form-item>
                </el-col>
            </el-col>

            <span class="typeWord">存储层数据类型长度对照详细信息</span>
            <el-button size="medium" class="partTwoBtn" type="success" @click="addTableData">增加行</el-button>
            <el-table :data="form.dialogTableData" border stripe size="medium">
                <el-table-column type="index" label="序号" width="64" align="center"></el-table-column>

                <el-table-column label="字段类型" align="center">
                    <template slot-scope="scope">
                        <el-form-item :prop="`dialogTableData.${scope.$index}.dlc_type`" :rules="filter_rules([{required: true}])">
                            <el-input size="meduim" v-model="scope.row.dlc_type"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column label="字段长度" align="center">
                    <template slot-scope="scope">
                        <el-form-item :prop="`dialogTableData.${scope.$index}.dlc_length`" :rules="filter_rules([{required: true,dataType: 'number'}])">
                            <el-input size="meduim" v-model="scope.row.dlc_length"></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>

                <el-table-column prop="dlc_remark" label="备注" align="center">
                    <template slot-scope="scope">
                        <el-form-item>
                            <el-input type="textarea" v-model="scope.row.dlc_remark" autosize></el-input>
                        </el-form-item>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="80" align="center">
                    <template slot-scope="scope">
                        <el-button type="text" @click="deleteArrytable(scope.$index, scope.row);">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelUpdate" size="mini" type="danger">取 消</el-button>
            <el-button type="primary" @click="upDate('form')" size="mini">更新</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./dataStoreAction";
import * as validator from "@/utils/js/validator";
import * as message from "@/utils/js/message";
import regular from "@/utils/js/regular";
let data;
export default {
    data() {
        return {
            form: {
                dialogTableData: [],
                dlcs_name: '',
                dlcs_remark: ''
            },
            tableData: [],
            spanArr: [],
            pos: 0,
            spanArr2: [],
            pos2: 0,
            dialogFormVisibleUpdate: false,
            rule: validator.default
        }
    },
    created() {
        this.updateData();
    },
    methods: {
        // 点击新增对照表
        addinfo() {
            this.$router.push({
                name: "addTypeLengthContrastInfo"
            })
        },
        // 删除表格数据
        deleteArry(val) {
            message.confirmMsg("确认删除吗？").then(res => {
                functionAll.deleteTypeLengthContrastInfo({
                    dlcs_id: val
                }).then((res) => {
                    this.updateData();
                    message.deleteSuccess(res);
                })
            }).catch(() => {
                message.customizTitle('已取消删除', 'info')
            })
        },
        // 获取编辑表格信息
        updateData(val) {
            functionAll.searchDataLayerDataTypeLengthInfo({
                dlcs_id: val
            }).then((res) => {
                if (val != undefined) {
                    this.form.dlcs_name = res.data[0].dlcs_name;
                    this.form.dlcs_remark = res.data[0].dlcs_remark;
                    this.form.dialogTableData = res.data
                    this.dialogFormVisibleUpdate = true;
                } else {
                    this.tableData = res.data;
                    this.dataRosolve(res.data);
                }

            })
        },
        // 添加编辑字段类型行数据
        addTableData() {
            this.form.dialogTableData.push({
                dlc_type: "",
                dlc_length: ""
            })
        },
        // 关闭弹出框之前触发事件
        beforeClose() {
            this.dialogFormVisibleUpdate = false;
            this.$refs.form.resetFields();
        },
        // 取消更新触发的事件
        cancelUpdate() {
            this.dialogFormVisibleUpdate = false;
            this.$refs.form.resetFields();
        },
        // 删除编辑表格的当前行
        deleteArrytable(index, row) {
            if (this.form.dialogTableData.length > 1) {
                this.form.dialogTableData.splice(index, 1)
            } else {
                message.customizTitle('请至少选择一项', 'warning')
            }

        },
        // 保存更新数据
        //更新数据
        upDate(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    // 处理参数
                    data = this.form.dialogTableData
                    this.form['dlcs_id'] = data[0].dlcs_id;
                    this.form.dialogTableData.forEach((item) => {
                        delete item.dlcs_name;
                        delete item.dlcs_id;
                        delete item.dlcs_remark;
                        delete item.dlc_id;
                    })
                    this.form['lengthInfo'] = JSON.stringify(this.form.dialogTableData);
                    delete this.form.dialogTableData;
                    functionAll.updateTypeLengthContrastInfo(
                        this.form
                    ).then((res) => {
                        if (res && res.success) {
                            message.updateSuccess(res);
                            // 重新渲染页面
                            this.updateData();
                            // 关闭弹出层
                            this.dialogFormVisibleUpdate = false;
                        } else {
                            this.form.dialogTableData = data;
                        }
                    })
                } else {

                }
            });
        },
        dataRosolve(tableData) {
            // 获取合并行数据，初始化数据
            this.spanArr = [];
            this.pos = 0;
            this.spanArr2 = [];
            this.pos2 = 0;
            tableData.forEach((item, index) => {
                if (index === 0) {
                    this.spanArr.push(1);
                    this.pos = 0;
                    this.spanArr2.push(1);
                    this.pos2 = 0;
                } else {
                    if (tableData[index].dlcs_id === tableData[index - 1].dlcs_id) { //第一列需合并相同内容的判断条件
                        this.spanArr[this.pos] += 1;
                        this.spanArr.push(0);
                    } else {
                        this.spanArr.push(1);
                        this.pos = index;
                    };
                    if (tableData[index].dlcs_name === tableData[index - 1].dlcs_name) {
                        this.spanArr2[this.pos2] += 1;
                        this.spanArr2.push(0);
                    } else {
                        this.spanArr2.push(1);
                        this.pos2 = index;
                    };
                }

            });
        },
        // 合并行
        arraySpanMethod({
            row,
            column,
            rowIndex,
            columnIndex
        }) {
            if (columnIndex === 1) {
                const _row = this.spanArr[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
            if (columnIndex === 2 || columnIndex === 6) {
                const _row = this.spanArr2[rowIndex];
                const _col = _row > 0 ? 1 : 0;
                return {
                    rowspan: _row,
                    colspan: _col
                }
            }
        },
    }
}
</script>

<style scoped>
.typeLengthContrastInfo .dataSave {
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: #2196f3;
    font-size: 18px;
}

.typeLengthContrastInfo>>>.el-divider--horizontal {
    margin: 1px 0 15px 0;
}

.typeLengthContrastInfo .dataSave .el-button {
    float: right;
}

/* 按钮样式 */
.typeLengthContrastInfo .elButton {
    float: right;
    margin-top: 20px;
}

.typeLengthContrastInfo .partTwoBtn {
    float: right;
    margin-top: 20px;
}

/* span字体样式 */
.typeLengthContrastInfo .saveDataSpan {
    display: inline-block;
    margin-top: 20px;
    color: #2196f3;
    font-size: 18px;
}

/* dialog的input样式 */
.typeWord {
    display: inline-block;
    margin-top: 20px;
    font-size: 18px;
}

.typeLengthContrastInfo .el-table>>>.el-form-item__content {
    margin-left: 0 !important;
}
</style>
