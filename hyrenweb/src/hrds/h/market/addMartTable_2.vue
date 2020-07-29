<template>
    <div>
        <Step :active="active"></Step>
        <el-row class='topTitle'>
            <span>配置SQL</span>
        </el-row>
        <el-row>
            <el-col class="borderStyle" :span="7" style="margin-right: 10px;">
                <!--树菜单-->
                <el-input placeholder="输入关键字进行过滤" v-model="filterText"/>
                <div class='mytree'>
                    <el-tree class="filter-tree" :data="treedata" :indent='0'
                             @node-click="showtablecolumn">
                         <span class="span-ellipsis" slot-scope="{ node, data }">
                             <span :title="data.description">{{node.label}}</span>
                         </span>
                    </el-tree>
                </div>
            </el-col>
            <el-col :span="16">
                <el-tabs type="card">
                    <el-row>
                        <span>SQL查询</span>
                        <el-col :span='10' style="float:right;width: 60%;margin-bottom: 10px;">
                            <el-input placeholder="SQL中使用#{}进行替换，例如#{abc};参数处填写abc=123,多个参数时,中间用分号;隔开"
                                      size="mini"
                                      v-model="sqlparameter">
                            </el-input>
                        </el-col>
                    </el-row>
                    <el-row>
                        <div style="border:1px solid #ccc;">
                            <SqlEditor ref="sqleditor" :value="basicInfoForm.sqlMain"
                                       @changeTextarea="changeTextarea($event)" class='textasql'/>
                        </div>
                    </el-row>
                    <el-row class="partFour">
                        <div class="elButton">
                            <el-button type="primary" @click="getdatabysql()" size="medium">查询</el-button>
                            <el-button :disabled="iflock" type="primary" @click="getcolumnbysql()"
                                       size="medium">确定
                            </el-button>
                            <el-button type="primary" size="medium" class="sql-btn"
                                       @click="formaterSql (basicInfoForm.sqlMain)">格式化sql
                            </el-button>
                        </div>
                    </el-row>
                </el-tabs>
            </el-col>
        </el-row>
        <el-button type="primary" size="medium" @click="selectTableCreateVisible = true">选择表创建</el-button>
        <el-dialog title="选择表创建" :visible.sync="selectTableCreateVisible" width="80%">
            <el-form :inline="true" :model="formInline" class="demo-form-inline"
                     :label-position="labelPosition" label-width="80px">
                <el-row :gutter="20">
                    <el-col>
                        <el-form-item label="select">
                            <el-input v-model="formInline.selectColumns" placeholder="选择列"/>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="表名称">
                            <el-input v-model="formInline.table_name" placeholder="表名称">
                                <el-button slot="append" @click="getTableTreeData(-1)">选择表</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <label type="text">T1</label>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="addRelationTable" size="medium">
                                添加关联表
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col v-for="(item,index) in relationNums" :span="24">
                        <el-form-item label="JOIN 条件">
                            <el-select v-model="formInline['joinCondition'+index]" placeholder="请选择join条件"
                                       style="width: 160px">
                                <el-option label="LEFT JOIN" value="LEFT JOIN"/>
                                <el-option label="RIGHT JOIN" value="RIGHT JOIN"/>
                                <el-option label="FULL JOIN" value="FULL JOIN"/>
                                <el-option label="INNER JOIN" value="INNER JOIN"/>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="关联表">
                            <el-input v-model="formInline['tableName'+index]" placeholder="表名称">
                                <el-button slot="append" @click="getTableTreeData(index)">选择表</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <label type="text">T{{index+2}}</label>
                        </el-form-item>
                        <el-form-item>
                            <template type="text">ON</template>
                        </el-form-item>
                        <el-form-item>
                            <el-input type="textarea" v-model="formInline['onCondition'+index]"
                                      placeholder="关联条件"/>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="deleteRelation(index)" size="medium">删除
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="where">
                            <el-input placeholder="过滤条件,如果使用占位符，使用方式如：column=#{column}"
                                      v-model="formInline.whereColumns" style="width: 500px">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-col>
                        <el-form-item label="group by">
                            <el-input placeholder="分组条件" v-model="formInline.groupColumns">
                            </el-input>
                        </el-form-item>
                    </el-col>
                    <el-form-item>
                        <el-button type="primary" size="medium" @click="selectTableCreateVisible = false">
                            取消
                        </el-button>
                        <el-button type="primary" size="medium" @click="addSql">确定</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
        </el-dialog>
        <!--选择表弹出框-->
        <el-dialog title="选择表" :visible.sync="selectTableVisible" width="60%">
            <el-row :gutter="20">
                <el-col :span='6'>
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
                    </el-input>
                    <div class="mytree" hight='200'>
                        <el-tree class="filter-tree" :data="treedata" :indent='0'
                                 :filter-node-method="filterNode"
                                 ref="tree" @node-click="handleNodeClick">
                        <span class="span-ellipsis" slot-scope="{ node, data }"
                              v-if="data.description.length >0">
                            <span :title="data.description" v-if="data.file_id.length > 0">
                                <i class=" el-icon-document"/>{{node.label}}
                            </span>
                            <span :title="data.description" v-else>
                                <i class="el-icon-folder-opened"/>{{node.label}}
                            </span>
                            </span>
                            <span class="span-ellipsis" slot-scope="{ node, data }" v-else>
                            <span :title="data.label" v-if="data.file_id.length > 0">
                                <i class=" el-icon-document"/>{{node.label}}
                            </span>
                            <span :title="data.label" v-else>
                                <i class="el-icon-folder-opened"/>{{node.label}}
                            </span>
                         </span>
                        </el-tree>
                    </div>
                </el-col>
                <!--表信息列表-->
                <el-col :span='18' style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
                    <el-table :data="tableData.slice((currPage - 1) * pageSize,currPage*pageSize)"
                              border style="width: 100%" size="medium" ref="multipleTable"
                              :row-key="(row)=>{ return row.id}"
                              @selection-change="selectionChange">
                        <el-table-column width="40" align="center" type="selection"
                                         :reserve-selection="true">
                        </el-table-column>
                        <el-table-column label="序号" width="50px" align="center">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="table_name" label="采集原始表名" align="center"/>
                        <el-table-column prop="original_name" label="原始表中文名" align="center"/>
                        <el-table-column prop="selectColumn" label="选择字段" align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" size="mini"
                                           @click="showtablecolumn(scope.row,scope.$index)">
                                    选择字段
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- 分页内容 -->
                    <el-row class="pagination">
                        <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage"
                                       @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]"
                                       :page-size="pageSize"
                                       layout=" total,sizes,prev, pager, next,jumper"
                                       :total="totalSize" class='locationcenter'/>
                    </el-row>
                </el-col>
            </el-row>
            <el-row slot="footer" class="dialog-footer">
                <el-button @click="selectTableVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addTable" size="mini">确 认</el-button>
            </el-row>
        </el-dialog>
        <el-tabs type="card">
            <el-row>
                <el-col :span='2' style="float:right">
                    <el-button :disabled="iflock" class="elButton" type="primary" @click="addcolumn()"
                               size="medium">新增字段
                    </el-button>
                </el-col>
                <el-col v-show="false" :span='2' style="float:left">
                    <el-button class="elButton" type="primary" @click="showprejob()"
                               size="medium">前置作业
                    </el-button>
                </el-col>
                <el-col :span='2' style="float:left">
                    <el-button class="elButton" type="primary" @click="showafterjob()"
                               size="medium">后置作业
                    </el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-table :data="columnbysql" border size="mini">
                    <el-table-column type="index" label="序号" width="70px" align='center'></el-table-column>
                    <el-table-column prop="field_en_name" label="字段英文名" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="iflock" v-model="scope.row.field_en_name" autocomplete="off"
                                      placeholder="英文名"></el-input>
                        </template>
                    </el-table-column>

                    <el-table-column prop="field_cn_name" label="字段中文名" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="iflock" v-model="scope.row.field_cn_name" autocomplete="off"
                                      placeholder="中文名"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field_type" label="字段类型" width="140" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope" width="140">
                            <el-select :disabled="iflock" v-model="scope.row.field_type" placeholder="请选择">
                                <el-option v-for="item in allfield_type" :key="item.target_type"
                                           :label="item.target_type"
                                           :value="item.target_type"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field_length" label="字段长度" width="90" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="iflock" width="90" v-model="scope.row.field_length"
                                      autocomplete="off"
                                      placeholder="长度"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column prop="field_process" label="处理方式" width="100" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope" width="100">
                            <el-select :disabled="iflock" v-model="scope.row.field_process"
                                       @change="changecolumnfiledproccess(scope.row)"
                                       placeholder="请选择">
                                <el-option v-for="item in allfield_process" :key="item.value"
                                           :label="item.value"
                                           :value="item.code"></el-option>
                            </el-select>
                        </template>
                    </el-table-column>

                    <el-table-column prop="process_para" label="来源值" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-select :disabled="iflock" v-if="scope.row.field_process == '3'"
                                       v-model="scope.row.process_para"
                                       placeholder="请选择">
                                <el-option v-for="item in allfromcolumn" :key="item.value"
                                           :label="item.value"
                                           :value="item.code"></el-option>
                            </el-select>

                            <el-input :disabled="iflock" v-else v-model="scope.row.process_para"
                                      autocomplete="off"
                                      placeholder="处理方式参数"></el-input>

                        </template>
                    </el-table-column>

                    <!--<el-table-column prop="process_para" label="处理方式参数" show-overflow-tooltip-->
                    <!--align="center">-->
                    <!--<template slot-scope="scope">-->
                    <!--<el-input v-if="scope.row.field_process != '3'" v-model="scope.row.process_para" autocomplete="off"-->
                    <!--placeholder="处理方式参数"></el-input>-->
                    <!--</template>-->
                    <!--</el-table-column>-->

                    <el-table-column prop="field_desc" label="描述" show-overflow-tooltip
                                     align="center">
                        <template slot-scope="scope">
                            <el-input :disabled="iflock" v-model="scope.row.field_desc" autocomplete="off"
                                      placeholder="描述"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="index in columnmore"
                                     :label="index.dsla_storelayer" prop="index" align="center">
                        <template slot-scope="scope">
                            <el-checkbox :disabled="iflock" v-model="scope.row[scope.column.label]"
                                         :checked="scope.row[scope.column.label]"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" show-overflow-tooltip
                                     align="center" width="150">
                        <template slot-scope="scope">
                            <el-button :disabled="iflock" size="mini" icon="el-icon-arrow-up" title="上移"
                                       @click="upcolumn(scope.$index,scope.row)"
                                       circle type="primary">
                            </el-button>
                            <el-button :disabled="iflock" size="mini" icon="el-icon-arrow-down" title="下移"
                                       @click="downcolumn(scope.$index,scope.row)"
                                       circle type="primary">
                            </el-button>
                            <el-button :disabled="iflock" size="mini" icon="el-icon-delete" title="删除"
                                       @click="deletecolumn(scope.$index)"
                                       circle type="primary">
                            </el-button>
                            <!--<el-button type="primary" size="mini" @click="upcolumn(scope.$index,scope.row)">上移-->
                            <!--</el-button>-->
                            <!--<el-button type="primary" size="mini" @click="downcolumn(scope.$index,scope.row)">下移-->
                            <!--</el-button>-->
                            <!--<el-button type="primary" size="mini" @click="deletecolumn(scope.row)">删除</el-button>-->
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
                    <el-table-column v-for="(index, item) in databysql[0]" :key="databysql.$index"
                                     :label="item"
                                     :prop="item">
                        <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                        <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-button :disabled="iflock" type="primary" size="medium" class="rightbtn"
                           @click="querydatadialogshow = false ; getcolumnbysql()">确定
                </el-button>
                <el-button type="primary" size="medium" class="rightbtn" @click="querydatadialogshow = false">
                    取消
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
                            <el-button type="primary" size="medium"
                                       @click="hbaseupcolumn(scope.$index,scope.row)">上移
                            </el-button>
                            <el-button type="primary" size="medium"
                                       @click="hbasedowncolumn(scope.$index,scope.row)">下移
                            </el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </el-row>
            <el-row>
                <el-button type="primary" size="mini" class="rightbtn" @click="next()">确定</el-button>
                <el-button type="primary" size="mini" class="rightbtn" @click="dismissifhbasesort()">取消
                </el-button>
            </el-row>
        </el-dialog>

        <el-dialog title="表字段" :visible.sync="iftablecolumn" width="30%" class='data_edit'>
            <el-row>
                <el-table :data="tablecolumn" border size="mini" ref="filterTable">
                    <el-table-column prop="selectionstate" width="50" align="center">
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
                    <el-table-column type="index" label="序号" align='center'></el-table-column>
                    <el-table-column prop="columnname" label="字段英文名" show-overflow-tooltip
                                     align="center">
                    </el-table-column>
                    <el-table-column prop="columntype" label="字段类型" show-overflow-tooltip
                                     align="center">
                    </el-table-column>
                </el-table>
            </el-row>
            <el-row>
                <el-button type="primary" size="mini" class="rightbtn" @click="changesql()">确定</el-button>
                <el-button type="primary" size="mini" class="rightbtn" @click="dismissiftablecolumn()">取消
                </el-button>
            </el-row>
        </el-dialog>


        <el-dialog title="前置作业" :visible.sync="ifprejob" width="80%">
            <el-row>
                <el-col class="borderStyle" :span="7" style="margin-right: 10px;">
                    <!--树菜单-->
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText"/>
                    <div class='mytree'>
                        <el-tree class="filter-tree" :data="treedata" :indent='0'
                                 @node-click="showtablecolumn">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="data.description">{{node.label}}</span>
                        </span>
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="16">
                    <el-tabs type="card">
                        <el-row>
                            <el-input class="inputframe" type="textarea" rows="5"
                                      placeholder="请输入SQL,多个SQL用;;分隔"
                                      v-model="presql"/>
                        </el-row>
                    </el-tabs>
                </el-col>
            </el-row>
            <el-row>
                <el-button type="primary" size="mini" class="rightbtn" @click="savePreAndAfterJob()">确定
                </el-button>
                <el-button type="primary" size="mini" class="rightbtn" @click="cancelprejob()">取消</el-button>
            </el-row>
        </el-dialog>

        <el-dialog title="后置作业" :visible.sync="ifafterjob" width="80%">
            <el-row>
                <el-col class="borderStyle" :span="7" style="margin-right: 10px;">
                    <!--树菜单-->
                    <el-input placeholder="输入关键字进行过滤" v-model="filterText"/>
                    <div class='mytree'>
                        <el-tree class="filter-tree" :data="treedata" :indent='0'
                                 @node-click="showtablecolumn">
                        <span class="span-ellipsis" slot-scope="{ node, data }">
                            <span :title="data.description">{{node.label}}</span>
                        </span>
                        </el-tree>
                    </div>
                </el-col>
                <el-col :span="16">
                    <el-tabs type="card">
                        <el-row>
                            <el-input class="inputframe" type="textarea" rows="5"
                                      placeholder="请输入SQL,多个SQL用;;分隔"
                                      v-model="aftersql"/>
                        </el-row>
                    </el-tabs>
                </el-col>
            </el-row>
            <el-row>
                <el-button type="primary" size="mini" class="rightbtn" @click="savePreAndAfterJob()">确定
                </el-button>
                <el-button type="primary" size="mini" class="rightbtn" @click="cancelafterjob()">取消
                </el-button>
            </el-row>
        </el-dialog>
        <transition name="fade">
            <loading v-if="isLoading"/>
        </transition>
    </div>
</template>
<script>
    import * as functionAll from "./marketAction";
    import * as validator from "@/utils/js/validator";
    import * as message from "@/utils/js/message";
    import Loading from '../../components/loading'
    import Step from "./step";
    import sqlFormatter from 'sql-formatter'
    import SqlEditor from '../../components/codemirror'

    export default {
        components: {
            Step,
            Loading,
            SqlEditor
        },
        data() {
            return {
                presql: "",
                aftersql: "",
                ifprejob: false,
                ifafterjob: false,
                treedata: [],
                active: 1,
                rule: validator.default,
                data_mart_id: this.$route.query.data_mart_id,
                is_add: this.$route.query.is_add,
                datatable_id: this.$route.query.datatable_id,
                ifrepeat: this.$route.query.ifrepeat,
                querydatadialogshow: false,
                querysql: '',
                filterText: '',
                columnbysql: [],
                columnmore: [],
                columnmore: [],
                allfield_type: [],
                allfield_process: [],
                allfromcolumn: [],
                databysql: [],
                filterText: '',
                ifhbase: false,
                ifhbasesort: false,
                sqlparameter: "",
                hbasesort: [],
                iftablecolumn: false,
                tablecolumn: [],
                Allis_selectionstate: false,
                sqltablename: "",
                isLoading: false,
                iflock: false,
                formInline: {
                    table_name: '',
                    selectColumns: '',
                    whereColumns: '',
                    groupColumns: ''
                },
                selectTableVisible: false,
                selectTableCreateVisible: false,
                labelPosition: 'right',
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                selectRow: [],
                tableData: [],
                relationNums: [],
                relationIndex: 1,
                basicInfoForm: {
                    sqlMain: ''
                }
            };
        },
        watch: {
            //设置检索内容
            filterText() {
                this.$refs.tree.filter(this.filterText);
            }
        },
        created() {
            this.gettreeData();
            this.getallfield_type();
            this.getallfield_process();
            this.getcolumnmore();
            this.getcolumnfromdatabase(this.datatable_id);
            this.getifhbase();
            this.getfromcolumnlist(this.datatable_id);
            this.getquerysql();

        },
        mounted() {
            this.checkifrepeat();

        },
        methods: {
            checkifrepeat() {
                // debugger;
                if (this.ifrepeat == "true" || this.ifrepeat == true) {
                    functionAll.getTableIdFromSameNameTableId({
                        "datatable_id": this.datatable_id
                    }).then((res) => {
                        let tmpdatatable_id = res.data[0].datatable_id;
                        this.getcolumnfromdatabase(tmpdatatable_id);
                        this.getfromcolumnlist(tmpdatatable_id);
                        this.iflock = true;
                    });
                }
            },
            showtablecolumn(node) {
                if (this.checkiftable(node)) {
                    functionAll.queryAllColumnOnTableName({
                        'source': node.data_layer,
                        'id': node.id
                    }).then((res) => {
                        this.tablecolumn = res.data.columnresult;
                        this.sqltablename = res.data.tablename;
                        this.iftablecolumn = true;
                        this.Allis_selectionstate = false;
                    });
                }
            },
            checkiftable(node) {
                if (!node.hasOwnProperty("children")) {
                    if (node.data_layer == "DCL" && node.file_id != "") {
                        return true;
                    } else if (node.data_layer == "DML" && node.datatable_id != "") {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return false;
                }
            },
            getifhbase() {
                functionAll.getIfHbase({"datatable_id": this.datatable_id}).then(((res) => {
                    this.ifhbae = res.data;
                    // this.ifhbae = true;
                }))
            },
            // filterNode(value, data, node) {
            //     // 如果检索内容为空,直接返回
            //     if (!value) return true;
            //     // 如果传入的value和data中的name相同说明是匹配到了
            //     return data.name.indexOf(value) !== -1;
            //     // 否则要去判断它是不是选中节点的子节点
            //     // return this.checkBelongToChooseNode(value, data, node);
            // },
            gettreeData() {
                functionAll.getTreeDataInfo().then(res => {
                    this.treedata = res.data.marketTreeList;
                });
            },
            // loadNode(node, resolve) {
            //
            //     // this.searchResolve = resolve;
            //     // 如果节点level为0,获取源树节点,否则根据节点信息获取子节点数据 那个是搜索
            //     if (node.level === 0) {
            //         functionAll.getTreeDataInfo(this.treeDataInfo).then((res) => {
            //             return resolve(res.data.tree_sources);
            //         }).catch(() => {
            //             return resolve([]);
            //         });
            //     } else {
            //         // 如果当前节点是父节点,则根据当前节点数据获取下一级的所有节点,否则根据节点信息查询数据
            //         if (node.data.isParent) {
            //             functionAll.getTreeDataInfo(node.data).then((res) => {
            //                 return resolve(res.data.tree_sources);
            //             });
            //         } else {
            //             // // 查询数据
            //             // debugger;
            //             // functionAll.queryAllColumnOnTableName({
            //             //     'source': node.data.source,
            //             //     'id': node.data.id
            //             // }).then((res) => {
            //             //     this.tablecolumn = res.data.columnresult;
            //             //     this.sqltablename = res.data.tablename;
            //             //     this.iftablecolumn = true;
            //             //     this.Allis_selectionstate = false;
            //             // });
            //         }
            //     }
            //
            // },
            getquerysql() {
                let params = {
                    "datatable_id": this.datatable_id,
                };
                functionAll.getQuerySql(params).then((res) => {
                   this.$refs.sqleditor.setmVal(res.data)
                   this.formaterSql(res.data)
                })
            },
            getcolumnfromdatabase(datatable_id) {
                let params = {
                    "datatable_id": datatable_id,
                };
                functionAll.getColumnFromDatabase(params).then((res) => {
                    this.columnbysql = res.data;
                })
            },
            getfromcolumnlist(datatable_id) {
                let params = {
                    "datatable_id": datatable_id,
                };
                functionAll.getFromColumnList(params).then((res) => {
                    this.allfromcolumn = res.data;
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
                        if (res && res.data) {
                            this.allfromcolumn = res.data.columnlist;
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
                    }).then((res) => {
                        this.isLoading = false;
                        // if (res && res.data.success) {
                        this.querydatadialogshow = true;
                        this.databysql = res.data;
                        // }
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
            changecolumnfiledproccess(row) {
                if (row.field_process != '3') {
                    row.process_para = "";
                } else {
                    row.process_para = 0;
                }
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
                for (var i = 0; i < this.columnbysql.length; i++) {
                    var field_en_name = this.columnbysql[i].field_en_name;
                    if (field_en_name === "" || field_en_name == undefined) {
                        this.$message({
                            type: "warning",
                            message: "第" + (i + 1) + "行字段英文名为空"
                        });
                        return false;
                    }
                    var field_cn_name = this.columnbysql[i].field_cn_name;
                    if (field_cn_name === "" || field_cn_name == undefined) {
                        this.$message({
                            type: "warning",
                            message: "第" + (i + 1) + "行字段中文名为空"
                        });
                        return false;
                    }
                    var field_type = this.columnbysql[i].field_type;
                    if (field_type === "" || field_type == undefined) {
                        this.$message({
                            type: "warning",
                            message: "第" + (i + 1) + "行字段类型名为空"
                        });
                        return false;
                    }
                    var field_process = this.columnbysql[i].field_process;
                    if (field_process === "" || field_process == undefined) {
                        this.$message({
                            type: "warning",
                            message: "第" + (i + 1) + "行字段处理方式为空"
                        });
                        return false;
                    }
                    var process_para = this.columnbysql[i].process_para;
                    if (process_para === '' || process_para == undefined) {
                        this.$message({
                            type: "warning",
                            message: "第" + (i + 1) + "行来源值为空"
                        });
                        return false;
                    }
                    var field_type = this.columnbysql[i].field_type;
                    if (field_type == "decimal" || field_type == "varchar") {
                        if (!this.columnbysql[i].hasOwnProperty("field_length")) {
                            this.$message({
                                type: "warning",
                                message: "第" + (i + 1) + "行字段类型为" + field_type + "且没有长度，请填写长度"
                            });
                            return false;
                        } else {
                            var field_length = this.columnbysql[i].field_length;
                            if (field_length == "") {
                                this.$message({
                                    type: "warning",
                                    message: "第" + (i + 1) + "行字段类型为" + field_type + "且没有长度，请填写长度"
                                });
                                return false;
                            }
                        }
                    }

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
                    "hbasesort": JSON.stringify(this.hbasesort),
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
                                datatable_id: this.datatable_id,
                                is_add: 1,
                                ifrepeat: this.ifrepeat,
                            }
                        });
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
            hbasedowncolumn(val, data) {
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
            downcolumn(val, data) {
                if (val + 1 === this.columnbysql.length) {
                    this.$message({
                        message: '已经是最后一条，不可下移',
                        type: 'warning',
                    });
                } else {
                    let downDate = this.columnbysql[val + 1];
                    this.columnbysql.splice(val + 1, 1);
                    this.columnbysql.splice(val, 0, downDate);
                }
            },
            hbaseupcolumn(val, data) {
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
            upcolumn(val, data) {
                if (val > 0) {
                    let upDate = this.columnbysql[val - 1];
                    this.columnbysql.splice(val - 1, 1);
                    this.columnbysql.splice(val, 0, upDate);
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
                if (this.ifprejob == true) {
                    this.presql = sql;
                } else if (this.ifafterjob == true) {
                    this.aftersql = sql;
                } else {
                    this.querysql = sql;
                }
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
            getpreandafterjob() {
                functionAll.getPreAndAfterJob({
                    "datatable_id": this.datatable_id
                }).then((res) => {
                    if (res && res.success) {
                        if (res.data.length > 0) {
                            if (res.data.post_work != undefined)
                                this.aftersql = res.data.post_work;
                            if (res.data.pre_work != undefined)
                                this.presql = res.data.pre_work;
                        }
                    }
                });
            },
            showprejob() {
                this.ifprejob = true;
                this.getpreandafterjob();
            },
            cancelprejob() {
                this.ifprejob = false;
            },
            showafterjob() {
                this.ifafterjob = true;
                this.getpreandafterjob();

            },
            cancelafterjob() {
                this.ifafterjob = false;
            },
            savePreAndAfterJob() {
                functionAll.savePreAndAfterJob({
                    "pre_work": this.presql,
                    "post_work": this.aftersql,
                    "datatable_id": this.datatable_id
                }).then((res) => {
                    if (res && res.success) {
                        this.ifprejob = false;
                        this.ifafterjob = false;
                    }
                });
            },
            // 树节点触发
            handleNodeClick(data) {
                this.tableData = [];
                if (data.file_id === "" && data.classify_id !== "") {
                    if (typeof data.children !== "undefined")
                        this.tableData = data.children;
                } else if (data.data_layer === "DML" && data.file_id === "") {
                    if (typeof data.children !== "undefined")
                        this.tableData = data.children;
                } else if (data.file_id !== "") {
                    this.tableData.push(data);
                }
            },
            // 搜索过滤节点
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            // 表复选框选中
            selectionChange(selectTrue) {
                this.selectRow = selectTrue;
            },
            //表数据实现分页功能
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
            },
            // 改变每页显示条数
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            changeTextarea(val) {
                this.$set(this.basicInfoForm, 'sqlMain', val)
            },
            formaterSql(val) {
                let dom = this.$refs.sqleditor
                dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
            },
            addSql() {
                // 提示信息
                let sql = "select " + this.formInline.selectColumns + " from " +
                    this.formInline.table_name;
                if (this.relationNums.length !== 0) {
                    for (let i = 0; i < this.relationNums.length; i++) {
                        sql = sql + " " + this.formInline["joinCondition" + i] + " "
                            + this.formInline["tableName" + i] + " T" + i + 2
                            + " ON " + this.formInline["onCondition" + i]
                    }
                    sql = sql + " where " + this.formInline.whereColumns;
                } else if (this.formInline.groupColumns.length !== 0) {
                    sql = sql + " group by " + this.formInline.groupColumns;
                }
                this.querysql = sql;
                this.basicInfoForm.sqlMain = this.querysql;
                console.log(this.basicInfoForm.sqlMain)
                this.selectTableVisible = false;
                this.selectTableCreateVisible = false;
            },
            // 添加关联表
            addRelationTable() {
                this.relationNums.push({});
            },
            // 删除关联表
            deleteRelation(index) {
                this.relationNums.splice(index, 1);
            },
            // 选择表
            getTableTreeData(index) {
                this.relationIndex = index + 2;
                this.selectTableVisible = true;
                this.gettreeData()
            },
            // 确认
            addTable() {
                const len = this.selectRow.length;
                let selectColumns = "";
                if (this.relationIndex === 1) {
                    this.formInline.table_name = this.selectRow[len - 1].hyren_name;
                    for (let i = 0; i < this.tablecolumn.length; i++) {
                        if (this.tablecolumn[i].selectionstate === true) {
                            selectColumns += "T1." + this.tablecolumn[i].columnname + ","
                        }
                    }
                } else {
                    this.formInline['tableName' + (this.relationIndex - 2)] =
                        this.selectRow[len - 1].hyren_name;
                    for (let i = 0; i < this.tablecolumn.length; i++) {
                        if (this.tablecolumn[i].selectionstate === true) {
                            selectColumns += "T" + this.relationIndex + "." +
                                this.tablecolumn[i].columnname + ","
                        }
                    }
                }
                if (this.formInline.selectColumns.length === 0) {
                    this.formInline.selectColumns = selectColumns.substr(0, selectColumns.length - 1);
                } else {
                    this.formInline.selectColumns = this.formInline.selectColumns + "," +
                        selectColumns.substr(0, selectColumns.length - 1);
                }
                this.selectTableVisible = false;
                this.$refs.multipleTable.clearSelection();
                this.tableData = [];
            },
        }
    }
</script>
<style scoped>
    .textasql >>> .CodeMirror {
        height: 200px !important;
        /* width:200px !important; */
    }

    .sql-btn {
        margin-bottom: 20px;
    }

    /* 按钮样式 */
    .elButton {
        float: right;

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

    .partFour {
        margin-top: 10px;
    }

    .rightbtn {
        margin-top: 12px;
        float: right;
        margin: 10px;
        margin-bottom: 10px;
    }

    .leftbtn {
        margin-top: 12px;
        margin-top: 12px;
        float: left;
        margin: 15px;
        margin-bottom: 10px;
    }

    .inputframe {
        margin-top: 12px;
        margin-bottom: 10px;
    }
</style>
