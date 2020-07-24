<template>
<div>
    <el-row class='topTitle'>
        <span class='el-icon-location'>{{lableName}}创建表</span>
    </el-row>
    <el-button type="success" size="mini" style='float:right;margin-bottom:5px;' @click="createTableFun('ruleForm')">保存</el-button>
    <div class='boxCreateTable'>
        <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="30%" style='clear:both;'>
            <div class="startupform">
                <el-row type="flex" justify="center">
                    <!-- <el-col>
                        <el-form-item label="表空间名" prop="table_kjname" :rules="filter_rules([{required: true}])">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.table_kjname" size="medium" placeholder="表空间名">
                                </el-input>
                            </el-col>
                        </el-form-item>
                    </el-col> -->
                    <el-col>
                        <el-form-item label="表名" prop="table_name" :rules="filter_rules([{required: true}])">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.table_name" size="medium" placeholder="表名">
                                </el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="表中文名" prop="table_ch_name" :rules="rule.default">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.table_ch_name" size="medium" placeholder="表中文名"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-form-item label="是否数据溯源" prop="isdata">
                            <el-col :span="16">
                                <el-radio-group v-model="ruleForm.isdata">
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="0">否</el-radio>
                                </el-radio-group>
                            </el-col>
                        </el-form-item>
                    </el-col>
                   
                    <el-col>
                        <el-form-item label="备注" prop="remarks">
                            <el-col :span="16">
                                <el-input v-model="ruleForm.remarks" size="medium" type="textarea"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                     <!-- <el-col :span="8">
                        <el-form-item label="表类型" prop="remarks">
                            <el-col :span="16">
                                <el-select v-model="ruleForm.table_type" placeholder="表类型" clearable size="medium">
                                    <el-option v-for="item in fileFormat" :key="item.code" :label="item.value" :value="item.code"></el-option>
                                </el-select>
                            </el-col>
                        </el-form-item>
                    </el-col> -->
                </el-row>
            </div>
            <div class="steps4">
                <el-row>
                    <el-col :span="2">
                        <div class='middleTitle'><i class="el-icon-s-grid"></i>表字段</div>
                    </el-col>
                    <el-col :span="22" style="text-align: right;">
                        <el-button type="primary" size="mini" style="margin-bottom: 5px;" @click="addRow(ruleForm.startuptableData)">新增行</el-button>
                    </el-col>
                </el-row>
                <el-table :header-cell-style="{background:'#e6e0e0'}" ref="filterTable" stripe :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%;clear:both;" size="medium" border :data="ruleForm.startuptableData.slice((currentPage - 1) * pagesize,currentPage *pagesize)">
                    <el-table-column label="序号" align="center" width="60">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段英文" align="center" :show-overflow-tooltip="true">
                        <template slot-scope="scope">
                            <el-form-item :prop="'startuptableData.'+scope.$index+'.column_name'" :rules="rule.default">
                                <el-input v-model="scope.row.column_name" placeholder="字段英文" size="mini"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段中文名称" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'startuptableData.'+scope.$index+'.field_ch_name'" :rules="rule.default">
                                <el-input v-model="scope.row.field_ch_name" placeholder="字段中文名称" size="mini"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段类型" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'startuptableData.'+scope.$index+'.column_type'" :rules="rule.default">
                                <el-select style="width:100%" v-model="scope.row.column_type" placeholder="字段类型" clearable size="mini">
                                    <el-option v-for="item in filedTypes" :key="item" :label="item" :value="item"></el-option>
                                </el-select>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="字段长度" align="center" :show-overflow-tooltip="true" width="90">
                        <template slot-scope="scope">
                            <el-input style="width:100%" v-model="scope.row.column_length" placeholder="0" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否为空" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.is_null"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column v-if='iskey' label="是否为主键" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.iskey"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column v-if='isrowkey' label="是否为rowkey" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.isrowkey"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column v-if='issyl' label="是否为索引列" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.issyl"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column v-if='isyjhl' label="是否为预聚合列" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.isyjhl"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column v-if='ispxl' label="是否为排序列" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.ispxl"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column v-if='isfql' label="是否为分区列" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :true-label="'1'" :false-label="'0'" v-model="scope.row.isfql"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="备注" align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.dq_remark" type="textarea" placeholder="备注" size="mini"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="selectCol" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" class="delcolor" type="text" circle @click="DelRowFun(scope.$index,ruleForm.startuptableData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-form>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[50, 100, 150, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="ruleForm.startuptableData.length" class="locationcenter"></el-pagination>
    </div>
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import Loading from "../../../components/loading/index";
import * as message from "@/utils/js/message";
import * as mdmFun from "./mateDataManage";
export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading:false,
            rule: validator.default,
            currentPage: 1,
            pagesize: 50,
            lableName: '',
            ruleForm: {
                table_kjname: "",
                table_name: "",
                table_ch_name: "",
                isdata: 1,
                table_type: '',
                remarks: "",
                startuptableData: []
            },
            filedTypes: [], //下拉数据类型
            fileFormat: [],
            CollectType: [],
            iskey: false, //是否主键
            isrowkey: false, //是否rowkey
            issyl: false, //是否索引列
            isyjhl: false, //是否预聚合列
            isfql: false, //是否分区列
            ispxl: false, //是否排序
            iskeyId: '', //是否主键
            isrowkeyId: '', //是否rowkey
            issylId: '', //是否索引列
            isyjhlId: '', //是否预聚合列
            isfqlId: '', //是否分区列
            ispxlId: '', //是否排序
        }
    },
    created() {
        this.getType()
    },
    mounted() {
        this.lableName = this.$Base64.decode(this.$route.query.label)
        this.getStorageLayerConfInfoFun(this.$route.query.dsl_id)
        // StoreLayerAdded
        let params = {};
        params["category"] = "FileFormat";
        this.$Code.getCategoryItems(params).then(res => {
            this.fileFormat = res.data ? res.data : [];
        });
    },
    methods: {
        getType() {
            // CollectType
            let params = {};
            params["category"] = "StoreLayerAdded";
            this.$Code.getCategoryItems(params).then(res => {
                this.CollectType = res.data ? res.data : [];
            });
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        getStorageLayerConfInfoFun(dsl_id) {
            mdmFun.getStorageLayerConfInfo({
                'dsl_id': dsl_id
            }).then(res => {
                console.log(res.data)
                if (res.data.dsl_added_s.length > 0) {
                    console.log(res.data.dsl_added_s)
                    let typeArr = res.data.dsl_added_s
                    for (let i = 0; i < typeArr.length; i++) {
                        for (let j = 0; j < this.CollectType.length; j++) {
                            if (typeArr[i].dsla_storelayer == this.CollectType[j].code) {
                                if (this.CollectType[j].value == '主键') {
                                    this.iskey = true
                                    this.iskeyId = typeArr[i].dslad_id
                                } else if (this.CollectType[j].value == 'rowkey') {
                                    this.isrowkey = true
                                    this.isrowkeyId = typeArr[i].dslad_id
                                } else if (this.CollectType[j].value == '索引列') {
                                    this.issyl = true
                                    this.issylId = typeArr[i].dslad_id
                                } else if (this.CollectType[j].value == '预聚合列') {
                                    this.isyjhl = true
                                    this.isyjhlId = typeArr[i].dslad_id
                                } else if (this.CollectType[j].value == '分区列') {
                                    this.isfql = true
                                    this.isfqlId = typeArr[i].dslad_id
                                } else if (this.CollectType[j].value == '排序列') {
                                    this.ispxl = true
                                    this.ispxlId = typeArr[i].dslad_id
                                }
                            }
                        }
                    }
                }
                this.filedTypes = res.data.filedTypes
            });
        },
        // 新增行
        addRow(tableData, event) {
            //  this.disShow=false
            tableData.push({
                field_ch_name: '',
                column_name: "",
                column_type: "",
                column_length: "",
                is_null: '',
                dq_remark: ''
            });
        },
        //删除
        DelRowFun(index, rows) {
            message
                .confirmMsg("确定删除吗")
                .then(res => {
                    rows.splice(index, 1);
                })
                .catch(() => {});
        },
        // 保存
        createTableFun(formName) {
            let that=this
            this.$refs[formName].validate(valid => {
                if (valid) {
                    that.isLoading = true
                    if (this.ruleForm.startuptableData.length == 0) {
                        this.$Msg.customizTitle("至少新增一行字段");
                    } else {
                        for (let i = 0; i < this.ruleForm.startuptableData.length; i++) {
                            this.ruleForm.startuptableData[i].dslad_id_s = []
                            if (this.ruleForm.startuptableData[i].iskey == '1') {
                                this.ruleForm.startuptableData[i].dslad_id_s.push(this.iskeyId)
                            }
                            if (this.ruleForm.startuptableData[i].isrowkey == '1') {
                                this.ruleForm.startuptableData[i].dslad_id_s.push(this.isrowkeyId)
                            }
                            if (this.ruleForm.startuptableData[i].issyl == '1') {
                                this.ruleForm.startuptableData[i].dslad_id_s.push(this.issylId)
                            }
                            if (this.ruleForm.startuptableData[i].isyjhl == '1') {
                                this.ruleForm.startuptableData[i].dslad_id_s.push(this.isyjhlId)
                            }
                            if (this.ruleForm.startuptableData[i].isfql == '1') {
                                this.ruleForm.startuptableData[i].dslad_id_s.push(this.isfqlId)
                            }
                            if (this.ruleForm.startuptableData[i].ispxl == '1') {
                                this.ruleForm.startuptableData[i].dslad_id_s.push(this.ispxlId)
                            }
                        }
                        let params = {}
                        params["dsl_id"] = this.$route.query.dsl_id;
                        params["table_space"] = this.ruleForm.table_kjname;
                        params["table_name"] = this.ruleForm.table_name;
                        params["ch_name"] = this.ruleForm.table_ch_name;
                        params["is_trace"] = this.ruleForm.isdata;
                        params["dq_remark"] = this.ruleForm.remarks;
                        params["dqTableColumnBeans"] = JSON.stringify(this.ruleForm.startuptableData);
                        console.log(params)
                        mdmFun.createTable(params).then(res => {
                            that.isLoading = false
                            if (res.code == '200') {
                                this.$router.push({
                                    path: 'mateDataManagement'
                                })
                            }
                        });
                    }
                }
            })

        }
    }
}
</script>

<style scoped>
.startupform {
    border-bottom: 1px solid #efebeb;
    padding: 14px 0 0 10px;
    margin: 12px 0;
    border-radius: 4px;
}

.middleTitle {
    color: #2196f3;
    font-size: 16px;
}

.boxCreateTable {
    border: 1px solid #cccccc4f;
    padding: 8px;
    clear: both;
}

.steps4>>>.el-form-item {
    margin-bottom: 0 !important;
}

.steps4>>>.el-form-item__content {
    margin-left: 0px !important;
}

.steps4>>>.el-form-item__error {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 6px;
    position: absolute;
    top: 69%;
    left: 4%;
    z-index: 1;
}

.steps4>>>.el-form-item__content::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
    display: inline-block;
    position: absolute;
    left: -8px;
}

.steps4>>>tr>td {
    padding: 0;
}

.steps4>>>.el-input-group__prepend {
    color: #fff !important;
    background-color: #e6a23c !important;
    border-color: #e6a23c !important;
}

.steps4>>>tr>td>.cell {
    padding: 6px 10px;
}
</style>
