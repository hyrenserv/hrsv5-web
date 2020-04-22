<template>
    <div>
        <Step :active="active"></Step>
        <el-row class='topTitle'>
            <span>配置SQL</span>
        </el-row>
        <el-row>
            <el-col class="borderStyle" :span="5" style="margin-right: 10px;">
                <!--树菜单-->
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"/>
                <div class='mytree'>
                    <el-tree empty-text="暂无数据" :expand-on-click-node="true" :indent='0' :props="treeProps"
                             :load="loadNode" lazy @node-click="showtablecolumn"
                             node-key="id" :filter-node-method="filterNode" ref="tree" highlight-current>
                          <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="node.label">{{ node.label }}</span>
                        </span>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="18">
                <el-tabs type="card">
                    <el-row>
                        <span>SQL查询</span>
                        <el-col :span='10' style="float:right">
                            <el-input placeholder="参数如: 自定义名称=123;自定义名称2=456,中间用分号;隔开" size="mini" v-model="sqlparameter">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-input class="inputframe" type="textarea" rows="5"  placeholder="请输入查询SQL" v-model="querysql"/>
                    </el-row>
                    <el-row class="partFour">
                        <div class="elButton">
                            <el-button type="primary" @click="getdatabysql()" size="medium">查询</el-button>
                            <el-button type="primary" @click="getcolumnbysql()" size="medium">确定</el-button>
                        </div>
                    </el-row>
                </el-tabs>
            </el-col>
        </el-row>
        <el-tabs type="card">
            <el-row>
                <el-col :span='2' style="float:right">
                    <el-button class="elButton" type="primary" @click="addcolumn()"
                               size="medium">新增字段
                    </el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="columnbysql" border size="mini">
                    <el-table-column type="index" label="序号" width="70px" align='center'></el-table-column>
                    <el-table-column prop="field_en_name" label="字段英文名" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.field_en_name" autocomplete="off"
                                      placeholder="字段英文名"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="field_cn_name" label="字段中文名" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.field_cn_name" autocomplete="off"
                                      placeholder="字段中文名"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field_type" label="字段类型" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.field_type" placeholder="请选择">
                                <el-option v-for="item in allfield_type" :key="item.target_type"
                                           :label="item.target_type"
                                           :value="item.target_type"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field_length" label="字段长度" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.field_length" autocomplete="off"
                                      placeholder="字段长度"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field_process" label="处理方式" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-select v-model="scope.row.field_process" placeholder="请选择">
                                <el-option v-for="item in allfield_process" :key="item.value"
                                           :label="item.value"
                                           :value="item.code"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="process_para" label="处理方式参数" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.process_para" autocomplete="off"
                                      placeholder="处理方式参数"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field_desc" label="描述" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.field_desc" autocomplete="off"
                                      placeholder="描述"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="index in columnmore"
                                     :label="index.dsla_storelayer" prop="index" align="center">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row[scope.column.label]"
                                         :checked="scope.row[scope.column.label]"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="medium" @click="deletecolumn(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" size="medium" class="rightbtn" @click="prenext('dm_datatable')">下一步
                </el-button>
                <el-button type="primary" size="medium" class="leftbtn" @click="back()">上一步</el-button>
            </el-row>
        </el-tabs>
        <el-dialog title="查询数据" :visible.sync="querydatadialogshow" width="60%">
            <el-row>
                <el-table :data="databysql" border size="mini">
                    <el-table-column v-for="(index, item) in databysql[0]" :key="databysql.$index" :label="item"
                                     :prop="item">
                        <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                        <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-button type="primary" size="medium" class="rightbtn"
                           @click="querydatadialogshow = false ; getcolumnbysql()">确定
                </el-button>
                <el-button type="primary" size="medium" class="rightbtn" @click="querydatadialogshow = false">取消
                </el-button>
            </el-row>
        </el-dialog>

        <el-dialog title="Hbase的Rowkey排序" :visible.sync="ifhbasesort" width="30%" class='data_edit'>
            <el-row>
                <el-table :data="hbasesort" border size="mini">
                    <el-table-column type="index" label="序号" width="70px" align='center'></el-table-column>
                    <el-table-column prop="field_en_name" label="字段英文名" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.field_en_name" autocomplete="off"
                                      placeholder="字段英文名"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column label="操作" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-button type="primary" size="medium" @click="upcolumn(scope.$index,scope.row)">上移
                            </el-button>
                            <el-button type="primary" size="medium" @click="downcolumn(scope.$index,scope.row)">下移
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-row>
            <el-row>
                <el-button type="primary" size="medium" class="rightbtn" @click="next()">确定</el-button>
                <el-button type="primary" size="medium" class="rightbtn" @click="dismissifhbasesort()">取消</el-button>
            </el-row>
        </el-dialog>

        <el-dialog title="表字段" :visible.sync="iftablecolumn" width="30%" class='data_edit'>
            <el-row>
                <el-table :data="tablecolumn" border size="mini" ref="filterTable">
                    <el-table-column prop="selectionstate" width="100%" align="center">
                        <template slot="header" slot-scope="scope">
                            <el-checkbox @change="Allis_selectionstateFun()"
                                         v-model="Allis_selectionstate"
                                         :checked="Allis_selectionstate"></el-checkbox>
                        </template>
                        <template slot-scope="scope">
                            <el-checkbox :checked="scope.row.selectionstate"
                                         @change="evercheck(scope.row.selectionstate,scope.row.columnname)"
                                         v-model="scope.row.selectionstate"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column type="index" width="100%" label="序号" align='center'></el-table-column>
                    <el-table-column prop="columnname" label="字段英文名" show-overflow-tooltip
                                     align="center">
                    </el-table-column>
                    <el-table-column prop="columntype" label="字段类型" show-overflow-tooltip
                                     align="center">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-button type="primary" size="medium" class="rightbtn" @click="changesql()">确定</el-button>
                <el-button type="primary" size="medium" class="rightbtn" @click="dismissiftablecolumn()">取消</el-button>
            </el-row>
        </el-dialog>

        <transition name="fade">
            <loading v-if="isLoading" />
        </transition>
    </div>
</template>
<script>
    import * as functionAll from "./marketAction";
    import * as validator from "@/utils/js/validator";
    import * as message from "@/utils/js/message";
    import Loading from '../../components/loading'
    import Step from "./step";

    export default {
        components: {
            Step,
            Loading
        },
        data() {
            return {
                active: 1,
                rule: validator.default,
                data_mart_id: this.$route.query.data_mart_id,
                is_add: this.$route.query.is_add,
                datatable_id: this.$route.query.datatable_id,
                querydatadialogshow: false,
                querysql: '',
                filterText: '',
                columnbysql: [],
                columnmore: [],
                columnmore: [],
                allfield_type: [],
                allfield_process: [],
                databysql: [],
                filterText: '',
                treeProps: {id: 'id', label: 'name', children: 'children',},
                treeDataInfo: {
                    isFileCo: 'false', tree_menu_from: 'webSQL', isPublicLayer: '1',
                    isRootNode: '1', tableName: ''
                },
                ifhbase: false,
                ifhbasesort: false,
                sqlparameter: "",
                hbasesort: [],
                iftablecolumn: false,
                tablecolumn: [],
                Allis_selectionstate: false,
                sqltablename: "",
                isLoading:false,

            };
        },
        watch: {
            //设置检索内容
            filterText() {
                this.$refs.tree.filter(this.filterText);
            }
        },
        mounted() {
            // this.getcolumnbysql();
            this.getallfield_type();
            this.getallfield_process();
            this.getcolumnmore();
            this.getcolumnfromdatabase();
            this.getquerysql();
            this.getifhbase();
        },
        methods: {
            showtablecolumn(node) {
                if(!node.isParent){
                    functionAll.queryAllColumnOnTableName({
                        'source': node.source,
                        'id': node.id
                    }).then((res) => {
                        this.tablecolumn = res.data.columnresult;
                        this.sqltablename = res.data.tablename;
                        this.iftablecolumn = true;
                        this.Allis_selectionstate = false;
                    });
                }
            },
            getifhbase() {
                functionAll.getIfHbase({"datatable_id": this.datatable_id}).then(((res) => {
                    this.ifhbae = res.data.result;
                    // this.ifhbae = true;
                }))
            },
            filterNode(value, data, node) {
                // 如果检索内容为空,直接返回
                if (!value) return true;
                // 如果传入的value和data中的name相同说明是匹配到了
                return data.name.indexOf(value) !== -1;
                // 否则要去判断它是不是选中节点的子节点
                // return this.checkBelongToChooseNode(value, data, node);
            },
            loadNode(node, resolve) {
                // this.searchResolve = resolve;
                // 如果节点level为0,获取源树节点,否则根据节点信息获取子节点数据 那个是搜索
                if (node.level === 0) {
                    functionAll.getTreeDataInfo(this.treeDataInfo).then((res) => {
                        return resolve(res.data.tree_sources);
                    }).catch(() => {
                        return resolve([]);
                    });
                } else {
                    // 如果当前节点是父节点,则根据当前节点数据获取下一级的所有节点,否则根据节点信息查询数据
                    if (node.data.isParent) {
                        functionAll.getTreeDataInfo(node.data).then((res) => {
                            return resolve(res.data.tree_sources);
                        });
                    } else {
                        // // 查询数据
                        // debugger;
                        // functionAll.queryAllColumnOnTableName({
                        //     'source': node.data.source,
                        //     'id': node.data.id
                        // }).then((res) => {
                        //     this.tablecolumn = res.data.columnresult;
                        //     this.sqltablename = res.data.tablename;
                        //     this.iftablecolumn = true;
                        //     this.Allis_selectionstate = false;
                        // });
                    }
                }

            },
            getquerysql() {
                let params = {
                    "datatable_id": this.datatable_id,
                };
                functionAll.getQuerySql(params).then((res) => {
                    if (res.data.length != 0) {
                        this.querysql = res.data[0].querysql;
                    }
                })
            },
            getcolumnfromdatabase() {
                let params = {
                    "datatable_id": this.datatable_id,
                };
                functionAll.getColumnFromDatabase(params).then((res) => {
                    this.columnbysql = res.data;
                })
            },
            getcolumnbysql() {
                if (this.querysql === '') {
                    this.$message({type: 'warning', message: '查询sql不能为空!'});
                } else {
                    this.isLoading = true;
                    let params = {
                        "querysql": this.querysql,
                        "datatable_id": this.datatable_id,
                        "sqlparameter": this.sqlparameter
                    };
                    functionAll.getColumnBySql(params).then(((res) => {
                        this.isLoading = false;
                        if (res && res.data.success) {
                            this.columnbysql = res.data.result;
                            let tmp_field_type = this.columnbysql[0].field_type;
                            let flag = true;
                            //向allfield_type放入默认选中的类型
                            for (var i = 0; i < this.allfield_type.length; i++) {
                                if (tmp_field_type == this.allfield_type[i].target_type) {
                                    flag = false;
                                    break;
                                }
                            }
                            if (flag) {
                                this.allfield_type.push({"target_type": tmp_field_type});
                            }
                        } else {
                            this.$message({
                                type: "error",
                                message: res.data.message
                            });
                        }
                    }))
                }
            },
            // 根据SQL查询数据
            getdatabysql() {
                if (this.querysql === '') {
                    this.$message({type: 'warning', message: '查询sql不能为空!'});
                } else {
                    this.isLoading = true;
                    this.databysql = [];
                    functionAll.getDataBySQL({
                        'querysql': this.querysql,
                        'sqlparameter': this.sqlparameter,
                        'datatable_id':this.datatable_id
                    }).then((res) => {
                        this.isLoading = false;
                        if (res && res.data.success) {
                            this.querydatadialogshow = true;
                            this.databysql = res.data.result;
                        } else {
                            this.$message({
                                type: "error",
                                message: res.data.message
                            });
                        }
                    });
                }
            },
            getcolumnmore() {
                functionAll.getColumnMore({
                    "datatable_id": this.datatable_id
                }).then((res) => {
                    this.columnmore = res.data;
                    res.data.forEach((item) => {
                        this.$Code.getValue({
                            category: "StoreLayerAdded",
                            code: item.dsla_storelayer,
                        }).then((res) => {
                            item.dsla_storelayer = res.data;
                        });
                    });
                    this.columnmore = res.data;
                });
            },
            getallfield_type() {
                functionAll.getAllField_Type({
                    "datatable_id": this.datatable_id
                }).then((res) => {
                    this.allfield_type = res.data;
                });
            },
            getallfield_process() {
                this.$Code.getCategoryItems({
                    'category': 'ProcessType'
                }).then(res => {
                    this.allfield_process = res.data
                })
            },
            back() {
                this.$router.push({
                    name: 'addMartTable_1',
                    query: {
                        data_mart_id: this.data_mart_id,
                        datatable_id: this.datatable_id,
                        is_add: 1
                    }
                });
            },
            prenext() {
                this.hbasesort = [];
                let ifhasrowkeyflag = false;
                if (this.ifhbae) {
                    for (var i = 0; i < this.columnbysql.length; i++) {
                        var everyrow = this.columnbysql[i];
                        if (everyrow.hasOwnProperty("rowkey") && everyrow.rowkey == true) {
                            ifhasrowkeyflag = true;
                            this.hbasesort.push({"field_en_name": everyrow.field_en_name})
                        }
                    }
                    if (!ifhasrowkeyflag) {
                        message.confirmMsg('目的地为Hbase,但没有选择rowkey,默认rowkey为全字段的MD5').then(res => {
                            this.next();
                        }).catch(() => {
                        })
                    } else {
                        functionAll.sortHbae({
                            "hbasesort": JSON.stringify(this.hbasesort),
                            "datatable_id": this.datatable_id
                        }).then((res) => {
                            this.hbasesort = res.data;
                        });
                        this.ifhbasesort = true;
                    }
                } else {
                    this.next();
                }
            },
            next() {
                if (this.querysql == "") {
                    this.$message({
                        type: "warning",
                        message: "请填写sql"
                    });
                    return false;
                }
                if (this.columnbysql.length == 0) {
                    this.$message({
                        type: "warning",
                        message: "请先点击确定 生成字段"
                    });
                    return false;
                }
                this.isLoading = true;
                let dm_column_storage = [];
                for (var i = 0; i < this.columnmore.length; i++) {
                    var dslad_id = this.columnmore[i].dslad_id;
                    var dsla_storelayer = this.columnmore[i].dsla_storelayer;
                    for (var j = 0; j < this.columnbysql.length; j++) {
                        var everydatatable_field_info = this.columnbysql[j];
                        if (everydatatable_field_info.hasOwnProperty(dsla_storelayer)) {
                            if (everydatatable_field_info[dsla_storelayer] == true) {
                                dm_column_storage.push({"csi_number": j, "dslad_id": dslad_id})
                            }
                        }
                    }
                }
                let param = {
                    "datatable_field_info": JSON.stringify(this.columnbysql),
                    "datatable_id": this.datatable_id,
                    "dm_column_storage": JSON.stringify(dm_column_storage),
                    "querysql": this.querysql,
                    "hbasesort": JSON.stringify(this.hbasesort)
                };
                functionAll.addDFInfo(param).then((res) => {
                    this.isLoading = false;
                    if (res && res.success) {
                        this.$message({
                            type: "success",
                            message: "保存成功!"
                        });
                        this.ifhbasesort = false;
                        this.$router.push({
                            name: 'addMartTable_3',
                            query: {
                                data_mart_id: this.data_mart_id,
                                datatable_id: this.datatable_id
                            }
                        });
                    } else {
                        this.$emit(res.message);
                    }
                })
            },
            addcolumn() {
                let param = {
                    field_en_name: "",
                    field_cn_name: "",
                    field_type: this.allfield_type[0].target_type,
                    field_length: "",
                    field_process: this.allfield_process[0].code,
                    process_para: "",
                    field_desc: "",
                };
                this.columnbysql.push(param);
            },
            deletecolumn(row) {
                let index = this.columnbysql.indexOf(row);
                this.columnbysql.splice(index, 1);
            },
            downcolumn(val, data) {
                if (val + 1 === this.hbasesort.length) {
                    this.$message({
                        message: '已经是最后一条，不可下移',
                        type: 'warning',
                    });
                } else {
                    let downDate = this.hbasesort[val + 1];
                    this.hbasesort.splice(val + 1, 1);
                    this.hbasesort.splice(val, 0, downDate);
                }
            },
            upcolumn(val, data) {
                if (val > 0) {
                    let upDate = this.hbasesort[val - 1];
                    this.hbasesort.splice(val - 1, 1);
                    this.hbasesort.splice(val, 0, upDate);
                } else {
                    this.$message({
                        message: '已经是第一条，不可上移',
                        type: 'warning',
                    });
                }
            },
            dismissifhbasesort() {
                this.ifhbasesort = false;
            },
            changesql() {
                let sql = "select ";
                for (let i = 0; i < this.tablecolumn.length; i++) {
                    if (this.tablecolumn[i].selectionstate == true) {
                        sql += this.tablecolumn[i].columnname + ","
                    }
                }
                sql = sql.substr(0, sql.length - 1);
                sql += " from " + this.sqltablename;
                this.querysql = sql;
                this.iftablecolumn = false;
                this.Allis_selectionstate = false;
            },
            dismissiftablecolumn() {
                this.iftablecolumn = false;
                this.Allis_selectionstate = false;
            },
            Allis_selectionstateFun() {
                if (this.Allis_selectionstate) {
                    this.tablecolumn.forEach(data => {
                        data.selectionstate = true;
                    });
                } else {
                    this.tablecolumn.forEach(data => {
                        data.selectionstate = false;
                    });
                }
            },
            evercheck(val, name) {
                let count = 0
                if (this.Allis_selectionstate == true) {
                    for (let i = 0; i < this.tablecolumn.length; i++) {
                        if (this.tablecolumn[i].selectionstate == true) {
                            count++
                        }
                    }
                    if (count == this.tablecolumn.length) {
                        this.Allis_selectionstate = true
                    } else {
                        this.Allis_selectionstate = false
                    }
                } else {
                    this.Allis_selectionstate = false;
                }
            },
        }
    }
</script>
<style scoped>

    /* 按钮样式 */
    .elButton {
        float: right;
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .borderStyle {
        border: 1px solid #e6e6e6;
        padding: 1%;
    }

    /* 查询sql按钮*/
    .query-sql-btn {
        margin-left: 5%;
    }

    .rightbtn {
        margin-top: 12px;
        margin-top: 12px;
        float: right;
        margin: 15px;
        margin-bottom: 10px;
    }

    .leftbtn {
        margin-top: 12px;
        margin-top: 12px;
        float: left;
        margin: 15px;
        margin-bottom: 10px;
    }
    .inputframe{
        margin-top: 12px;
        margin-bottom: 10px;
    }
</style>
