<template>
<div class="singlesearch" id="singleTable">
    <Step :active="active"></Step>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="单表查询" name="first">
            <div id="singleTable">
                <div class="rightSearch">
                    <el-input v-model="search" placeholder="查询表名" style="width: 50%;
    margin-right: 10px;" @keyup.enter.native="searchEnterFun" />
                    <el-button size="mini" type="success" icon="el-icon-search" @click="schfilter(search)">查询</el-button>
                    <el-button size="mini" type="success" @click="getAllTableInfoFun()">查看全表</el-button>
                </div>
                <div>
                    <el-table ref="filterTable" stripe :default-sort="{prop: 'date', order: 'descending'}" :empty-text="tableloadingInfo" style="width: 100%" border :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
                        <el-table-column width="55" align="center" prop="selectionState">
                            <template slot="header" slot-scope="scope">
                                <el-checkbox @change="Allis_selectionStateFun(tableData,Allis_selectionState)" v-model="Allis_selectionState" :checked="Allis_selectionState"></el-checkbox>
                            </template>
                            <template slot-scope="scope">
                                <el-checkbox :checked="scope.row.selectionState" v-model="scope.row.selectionState" @change="evercheck(scope.row.selectionState,scope.row.table_name)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="序号" align="center" width="60">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="table_name" label="表名" width="180" align="center" :show-overflow-tooltip="true">
                        </el-table-column>
                        <el-table-column prop="table_ch_name" label="表中文名" width="160" align="center" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.table_ch_name" placeholder="中文名" @change="changetablechnameFun(scope.row.table_ch_name,scope.row.table_name)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="卸数方式" align="center">
                            <template slot-scope="scope">
                                <el-row>
                                    <el-col :span="19">
                                        <el-select placeholder="卸数方式" v-model="scope.row.unload_type" size="medium" @change="oneunloadTypeFun(scope.row)">
                                            <el-option size="medium" v-for="(item,index) in xsType" :key="index" :label="item.value" :value="item.value"></el-option>
                                        </el-select>
                                    </el-col>
                                    <el-col :span="3">
                                        <el-button type="text" style='font-weight: bold;' v-if="scope.row.unload_type=='增量'" @click="XSTypeFun(scope.row)">设置</el-button>
                                        <el-button type="text" style='font-weight: bold;' v-else disabled>设置</el-button>
                                    </el-col>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column prop="is_md5" label=" 计算MD5" align="center">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.is_md5" :checked="scope.row.is_md5" @change="md50Fun(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column prop="is_parallel" label=" 是否并行抽取" align="center">

                            <template slot-scope="scope">
                                <el-checkbox v-if="scope.row.unload_type=='全量'" v-model="scope.row.is_parallel" :checked="scope.row.is_parallel" @change="checkedis_parallelFun(scope.row)"></el-checkbox>
                                <el-checkbox v-else disabled></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column prop="sqlFiltering" label="SQL过滤" align="center">

                            <template slot-scope="scope">
                                <el-button size="mini" v-if="scope.row.unload_type=='全量'" @click="Sqlfilt(scope.$index, scope.row)" type="success">定义过滤</el-button>
                                <el-button size="mini" v-else disabled type="success">定义过滤</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="selectCol" label="选择列" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="selectCol(scope.$index, scope.row)" type="info">选择列</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="sig1_handleSizeChange" @current-change="sig1_handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="使用SQL抽取数据" name="second">
            <el-button type="success" style="margin:0 0 5px 0" class="addline" @click="addRow(ruleForm.sqlExtractData)" size="mini">新增行</el-button>
            <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
            <el-form ref="ruleForm" :model="ruleForm" class="steps2">
                <el-table :data="ruleForm.sqlExtractData.slice((sqlexcurrentPage - 1) * sqlexpagesize, sqlexcurrentPage * sqlexpagesize)" border size="medium" highlight-current-row>
                    <el-table-column property label="序号" width="60px" align="center">
                        <template slot-scope="scope">
                            <span>{{scope.$index+(sqlexcurrentPage - 1) * sqlexpagesize + 1}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column property="table_name" label="表名" width="150px" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'sqlExtractData.'+scope.$index+'.table_name'" :rules="rule.default">
                                <el-input v-if="scope.row.table_id&&scope.row.table_id!=''" disabled v-model="scope.row.table_name" placeholder="表名" size="medium"></el-input>
                                <el-input v-else v-model="scope.row.table_name" placeholder="表名" size="medium"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column property="table_ch_name" label="表中文名" width="150px" align="center">
                        <template slot-scope="scope">
                            <el-form-item :prop="'sqlExtractData.'+scope.$index+'.table_ch_name'" :rules="rule.default">
                                <el-input v-model="scope.row.table_ch_name" placeholder="表中文名" size="medium"></el-input>
                            </el-form-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="卸数方式" align="center">
                        <template slot-scope="scope">
                            <el-row>
                                <el-col :span="19">
                                    <el-form-item :prop="'sqlExtractData.'+scope.$index+'.unload_type'" :rules="rule.selected">
                                        <el-select placeholder="卸数方式" v-model="scope.row.unload_type" size="medium">
                                            <el-option size="medium" v-for="(item,index) in xsType" :key="index" :label="item.value" :value="item.value"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="3">
                                    <el-button type="text" style='font-weight: bold;' v-if="scope.row.unload_type=='全量'||scope.row.unload_type=='增量'" @click="XSTypeFun2(scope.row)">设置</el-button>
                                    <el-button type="text" v-else disabled style='font-weight: bold;'>设置</el-button>
                                </el-col>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_md5" label=" 计算MD5" align="center" width="100">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.is_md5" :checked="scope.row.is_md5"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column prop="is_parallel" label="是否并行抽取" align="center" width="120">
                        <template slot-scope="scope">
                            <el-checkbox v-if="scope.row.unload_type=='全量'" v-model="scope.row.is_parallel" :checked="scope.row.is_parallel" @change="checkedis_zdyparallelFun(scope.row)"></el-checkbox>
                            <el-checkbox v-else disabled></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="selectCol" label="选择列" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="selectCol2(scope.$index, scope.row)" type="info">选择列</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="70px">
                        <template slot-scope="scope">
                            <el-button class='delcolor' type="text" circle @click="DelRowFun(scope.$index, ruleForm.sqlExtractData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <el-pagination @size-change="sqlex_handleSizeChange" @current-change="sqlex_handleCurrentChange" :current-page.sync="sqlexcurrentPage" :page-size="sqlexpagesize" layout="total, prev, pager, next" :total="ruleForm.sqlExtractData.length" class="locationcenter"></el-pagination>
        </el-tab-pane>
    </el-tabs>
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">下一步</el-button>
    <!-- 测试弹框 -->
    <el-dialog title="测试sql" :visible.sync="testDialogVisible" width="30%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">测试sql</span>
        </div>
        <div class="testLinnk">
            <span>{{testLinkReturn}}</span>
        </div>
    </el-dialog>
    <!-- 定义过滤弹层 -->
    <el-dialog title="自定义SQL过滤设置" :visible.sync="dialogTableSqlFilt" width="50%" @close="SqlfiltCloseFun()">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">自定义SQL过滤设置</span>
            <el-tooltip class="dialogtoptxt" effect="dark" content="填写的过滤字段如果为日期类型,参数可以是固定值或变量名.如果为别的类型请填写明确的参数值" placement="right">
                <i class="fa fa-question-circle" aria-hidden="true"></i>
            </el-tooltip>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form ref="addClassTask">
            <el-row type="flex">
                <el-col :span="10">
                    <el-form-item label=" 表名: " prop="table_name" class="bordernone">
                        <span>{{sqlFiltSetData_tablename}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <!--   <el-form-item label=" 变量名: " prop="Variable_name">
                        <el-select placeholder="变量名" v-model="sqlFiltSetData_var" style="width:150px" size="mini">
                            <el-option :label="item.value" :value="item.code" v-for="(item,index) in sqlfiltVar" :key='index'></el-option>
                        </el-select>
                    </el-form-item> -->
                </el-col>
            </el-row>
            <el-row type="flex" justify="center">
                <el-col :span="24">
                    <el-form-item prop="table_des">
                        <el-input v-model="sqlFiltSetData_SQL" type="textarea"></el-input>
                    </el-form-item>

                </el-col>
            </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableSqlFilt = false;SqlfiltCloseFun()" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogTableSqlFilt = false;SqlfiltSubmitFun()" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 第一个页面 选择列弹层 -->
    <el-dialog title="选择列" :visible.sync="dialogSelectColumn" width="70%" @close="SelectColumnCloseFun()">
        <div slot="title" class="header-title">
            <span class="dialogtitle el-icon-caret-right">选择列</span>
            <span class="dialogtoptxt">
                表名:
                <p class="dialogtopname">{{coltable_name}} (卸数方式为增量时至少选择一个主键)</p>
            </span>
        </div>
        <el-table :data="SelectColumnData" border size="medium" highlight-current-row :empty-text="tableloadingInfo">

            <el-table-column label="选择列" align="center">

                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)" v-model="Allis_SelectColumn" :checked="Allis_SelectColumn" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox v-else @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)" v-model="Allis_SelectColumn" :checked="Allis_SelectColumn"></el-checkbox>&nbsp;选择列
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-else @change="every_SelectColumnfun(scope.row.is_get,SelectColumnData)"></el-checkbox>
                    <!-- <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get"></el-checkbox> -->
                </template>
            </el-table-column>

            <el-table-column label="主键定义" align="center">

                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Alliskey_SelectColumnFun(SelectColumnData,Alliskey_SelectColumn)" v-model="Alliskey_SelectColumn" :checked="Alliskey_SelectColumn" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox v-else @change="Alliskey_SelectColumnFun(SelectColumnData,Alliskey_SelectColumn)" v-model="Alliskey_SelectColumn" :checked="Alliskey_SelectColumn"></el-checkbox> 主键定义
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_primary_key" v-model="scope.row.is_primary_key" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox :checked="scope.row.is_primary_key" v-model="scope.row.is_primary_key" v-else @change="every_Selectkeyfun(scope.row.is_primary_key,SelectColumnData)"></el-checkbox>
                    <!-- <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get"></el-checkbox> -->
                </template>
            </el-table-column>
            <el-table-column property="column_name" label="列名" align="center" width="150px" :show-overflow-tooltip="true"></el-table-column>

            <el-table-column property="column_type" label="字段类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="column_ch_name" label="列中文名" align="center" :show-overflow-tooltip="true">

                <template slot-scope="scope">
                    <el-input v-model="scope.row.column_ch_name" placeholder="中文名" size="medium"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160px" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" v-if="disShow==false" disabled>
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-else :disabled="scope.$index===0" @click="moveUp(scope.$index,scope.row,SelectColumnData)">
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-if="disShow==false" disabled>
                        <i class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-button size="mini" v-else :disabled="scope.$index===(SelectColumnData.length-1)" @click="moveDown(scope.$index,scope.row,SelectColumnData)">
                        <i class="el-icon-arrow-down"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogSelectColumn = false;SelectColumnCloseFun()" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="SelectColumnSubmitFun()" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 第一个页面增量弹层 -->
    <el-dialog title :visible.sync="dialog_xsadd" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">卸数方式-增量</span>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form :model="xstypeadd" status-icon ref="xstypeadd" label-width="30%">
            <el-form-item label="删除SQL" prop="delete" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd.delete" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="新增SQL" prop="add" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd.add" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="更新SQL" prop="update" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd.update" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialog_xsadd=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="dialog_xsadd=false;xsaddSubmitFun()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 第二个页面增量弹层 -->
    <el-dialog title :visible.sync="dialog_xsadd2" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">卸数方式-增量</span>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form :model="xstypeadd2" status-icon ref="xstypeadd2" label-width="30%">
            <el-form-item label="删除SQL" prop="delete" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd2.delete" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="新增SQL" prop="add" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd2.add" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="更新SQL" prop="update" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd2.update" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialog_xsadd2=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="dialog_xsadd2=false;xsaddSubmittwoFun()">确 定</el-button>
        </div>
    </el-dialog>
    <!--第二个页面卸数方式-全量  -->
    <el-dialog title :visible.sync="dialog_xsall" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">卸数方式-全量</span>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form :model="xstypeadd2" status-icon ref="xstypeadd2" label-width="30%">
            <el-form-item label="SQL" prop="add" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd2.add" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialog_xsall=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="dialog_xsall=false;xsallSubmitFun()">确 定</el-button>
        </div>
    </el-dialog>
    <!--第一个页面是否并行抽取弹层 -->
    <el-dialog title :visible.sync="dialogTableVisible" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">定义分页抽取SQL</span>
            <span class="dialogtoptxt">
                表名:
                <p class="topcolumename">{{EXtable_name}}</p>
            </span>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form :model="ruleForm_ParallelEx" status-icon ref="ruleForm_ParallelEx" label-width="30%">
            <el-row type="flex" style="text-align:right;padding-right:10px;">
                <el-col :span="24">
                    <el-button type="warning" v-if='ruleForm_ParallelEx.issql=="1"' size="mini" @click="testParallelExtractionFun('test')">测试分页SQL</el-button>
                </el-col>
            </el-row>
            <el-form-item label="自定义SQL" prop="EXtable_sql">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-radio-group v-model="ruleForm_ParallelEx.issql">
                            <el-radio v-for="item in YesNo" :key="item.value" :label="item.code">{{item.value}}</el-radio>
                        </el-radio-group>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="分页抽取SQL" prop="EXtable_sql" :rules="rule.default" v-if="ruleForm_ParallelEx.issql=='1'">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.EXtable_sql" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="数据总量" prop="db_allnum" :rules="rule.default" v-if="ruleForm_ParallelEx.issql=='0'">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.db_allnum" size="medium" style="width:284px">
                            <el-button slot="append" @click="getTableDataCountFun()">获取数据量</el-button>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="每日数据增量" prop="everDay_addnum" :rules="rule.default" v-if="ruleForm_ParallelEx.issql=='0'">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.everDay_addnum" size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="分页并行数" prop="pageExnum" :rules="rule.default" v-if="ruleForm_ParallelEx.issql=='0'">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.pageExnum" size="medium" style="width:284px" placeholder="请根据数据总量指定合适的线程数"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="testParallelExtractionCloseFun()" type="danger" size="mini">取 消</el-button>
            <el-button @click="testParallelExtractionSubmitFun('ruleForm_ParallelEx')" type="primary" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 自定义是否并行抽取弹层 -->
    <!--  <el-dialog title :visible.sync="dialogTableVisible_zdy" width="50%" class="alltable" @close="testParallelExtractionCloseFun()">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">定义分页抽取SQL1111</span>
        </div>
        <el-form :model="ruleForm_ParallelEx" status-icon ref="ruleForm_ParallelEx" label-width="30%">
            <el-row type="flex" style="text-align:right;padding-right:10px;">
                <el-col :span="24">
                    <el-button type="warning" @click="testParallelExtractionFun('test')">测试分页SQL</el-button>
                </el-col>
            </el-row>
            <el-form-item label="数据总量" prop="db_allnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.db_allnum" size="medium" style="width:284px">
                            <el-button slot="append" @click="getTableDataCountFun()">获取数据量</el-button>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="每日数据增量" prop="everDay_addnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.everDay_addnum" size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="分页并行数" prop="pageExnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.pageExnum" size="medium" style="width:284px" placeholder="请根据数据总量指定合适的线程数"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialogTableVisible_zdy=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="dialogTableVisible_zdy=false">确 定</el-button>
        </div>
    </el-dialog> -->
    <!--第二个页面定义分页抽取sql  -->
    <el-dialog title :visible.sync="dialogdyfysql" width="50%" class="alltable" @close="testParallelExtractionCloseFun2()">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">定义分页抽取SQL</span>
        </div>
        <el-form :model="ruleForm_ParallelEx" status-icon ref="ruleForm_ParallelEx" label-width="30%">
            <el-form-item label="数据总量" prop="db_allnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.db_allnum" size="medium" style="width:284px">
                            <el-button slot="append" @click="getTableDataCountFun()">获取数据量</el-button>
                        </el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="每日数据增量" prop="everDay_addnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.everDay_addnum" size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="分页并行数" prop="pageExnum" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="ruleForm_ParallelEx.pageExnum" size="medium" style="width:284px" placeholder="请根据数据总量指定合适的线程数"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="testParallelExtractionCloseFun2()">取 消</el-button>
            <el-button type="primary" size="mini" @click="checkedis_zdyparallelSubmitFun()">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 第二个页面 选择列弹层 -->
    <el-dialog title="选择列" :visible.sync="dialogSelectColumn2" width="70%">
        <div slot="title" class="header-title">
            <span class="dialogtitle el-icon-caret-right">选择列</span>
            <span class="dialogtoptxt">
                表名:
                <p class="dialogtopname">{{coltable_name}} (卸数方式为增量时至少选择一个主键)</p>
            </span>
        </div>
        <el-table :data="SelectColumnData2" border size="medium" highlight-current-row :empty-text="tableloadingInfo">

            <el-table-column label="选择列" align="center">

                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Allis_SelectColumnFun(SelectColumnData2,Allis_SelectColumn2)" v-model="Allis_SelectColumn2" :checked="Allis_SelectColumn2" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox v-else @change="Allis_SelectColumnFun(SelectColumnData2,Allis_SelectColumn2)" v-model="Allis_SelectColumn2" :checked="Allis_SelectColumn2"></el-checkbox>&nbsp;选择列
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-else @change="every_SelectColumnfun(scope.row.is_get,SelectColumnData2)"></el-checkbox>
                    <!-- <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get"></el-checkbox> -->
                </template>
            </el-table-column>

            <el-table-column label="主键定义" align="center">

                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Alliskey_SelectColumnFun(SelectColumnData2,Alliskey_SelectColumn2)" v-model="Alliskey_SelectColumn2" :checked="Alliskey_SelectColumn2" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox v-else @change="Alliskey_SelectColumnFun(SelectColumnData2,Alliskey_SelectColumn2)" v-model="Alliskey_SelectColumn2" :checked="Alliskey_SelectColumn2"></el-checkbox> 主键定义
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_primary_key" v-model="scope.row.is_primary_key" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox :checked="scope.row.is_primary_key" v-model="scope.row.is_primary_key" v-else @change="every_Selectkeyfun(scope.row.is_primary_key,SelectColumnData2)"></el-checkbox>
                    <!-- <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get"></el-checkbox> -->
                </template>
            </el-table-column>
            <el-table-column property="column_name" label="列名" align="center" width="150px" :show-overflow-tooltip="true"></el-table-column>

            <el-table-column property="column_type" label="字段类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="column_ch_name" label="列中文名" align="center" :show-overflow-tooltip="true">

                <template slot-scope="scope">
                    <el-input v-model="scope.row.column_ch_name" placeholder="中文名" size="medium"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="160px" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" v-if="disShow==false" disabled>
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-else :disabled="scope.$index===0" @click="moveUp(scope.$index,scope.row,SelectColumnData2)">
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-if="disShow==false" disabled>
                        <i class="el-icon-arrow-down"></i>
                    </el-button>
                    <el-button size="mini" v-else :disabled="scope.$index===(SelectColumnData2.length-1)" @click="moveDown(scope.$index,scope.row,SelectColumnData2)">
                        <i class="el-icon-arrow-down"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="SelectColumnCloseFun2()" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="SelectColumnSubmitFun2()" size="mini">确 定</el-button>
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
import Loading from '../../components/loading'

export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 1,
            tableloadingInfo: "数据加载中...",
            rule: validator.default,
            Allis_selectionState: false,
            Allis_SelectColumn: false,
            Allis_SelectColumn2: false,
            Alliskey_SelectColumn: false,
            Alliskey_SelectColumn2: false,
            dialogTableVisible_zdy: false,
            dialogdyfysql: false,
            activeName: "first",
            data: [],
            currentPage: 1,
            pagesize: 100,
            sqlexcurrentPage: 1,
            sqlexpagesize: 100,
            search: "",
            input: "",
            input2: "",
            dialogTableVisible: false,
            testDialogVisible: false,
            dialogTableSqlFilt: false,
            dialogSelectColumn: false,
            dialogSelectColumn2: false,
            tableData: [],
            sqlFiltSetData_tablename: "",
            sqlFiltSetData_var: "",
            sqlFiltSetData_SQL: "",
            SelectColumnData: [],
            SelectColumnData2: [],
            multipleSelection: [],
            ruleForm: {
                sqlExtractData: []
            },

            ruleForm_ParallelEx: {
                issql: '',
                EXtable_sql: "",
                db_allnum: "",
                everDay_addnum: "",
                pageExnum: 5
            },
            xstypeadd: {
                delete: '',
                add: '',
                update: ''
            },
            xstypeadd2: {
                delete: '',
                add: '',
                update: ''
            },
            dbid: null,
            agentId: null,
            sourceId: null,
            sourceName: null,
            allData: [],
            callTable: [],
            allDataList: [],
            isdata: [],
            EXtable_name: "",
            testLinkReturn: "",
            coltable_name: "",
            tableInfoString: [],
            collTbConfParamString: [],
            tablename: "",
            SelectColumn: [], //第一个页面选择列点击过保存的值
            SelectColumn2: [], //第2个页面选择列点击过保存的值
            sqlFiltArr: [], //第一个页面sql过滤点击过保存的值
            ParallelExtractionArr: [], //第一个页面并行抽取数据
            ParallelExtractionLink: false,
            is_parallel: false,
            tableInfoArray: [],
            tablein: [],
            activeFirst: false,
            activeSec: false,
            edit: false,
            disShow: false,
            sqlSubmit: false,
            sqlfiltVar: [{
                    value: '当前跑批日',
                    code: '1'
                },
                {
                    value: '后一跑批日',
                    code: '2'
                },
                {
                    value: '前一跑批日',
                    code: '3'
                }
            ],
            xsType: [{
                    value: '全量',
                    code: '1'
                },
                {
                    value: '增量',
                    code: '2'
                },
            ],
            YesNo: [{
                    value: '是',
                    code: '1'
                },
                {
                    value: '否',
                    code: '0'
                },
            ],
            // handleactive: false,
            dialog_xsadd: false,
            dialog_xsall: false,
            dialog_xsadd2: false,
            isLoading: false,
            Xstable_name: '', //卸数方式存放表名
            xsTypeArr: [], //第一个页面卸数增量是存放数据
            xsTypeArr2: [], //第二个页面卸数增量是存放数据
            ParallelExtractionArr2: [], //第二个页面并行抽取保存数据
            callTable2: [],
            zdycallTable: []
        };
    },
    created() {
        this.dbid = parseInt(this.$route.query.id);
        this.agentId = this.$route.query.agent_id;
        this.sourceId = this.$route.query.source_id;
        this.sourceName = this.$Base64.decode(this.$route.query.source_name);
        this.edit = this.$route.query.edit;
    },
    mounted() {
        // 获取进入页面的总数据
        if (this.$route.query.edit == "yes") {
            this.steps_getInitInfo();
            this.editzdySQLFun()
        } else {
            this.tableloadingInfo = '暂无数据'
        }
        let params = {};
        params["colSetId"] = this.dbid;
        addTaskAllFun.getAllTableInfo(params).then(res => {
            console.log(res.data)
            let data = res.data
            for (let i = 0; i < data.length; i++) {
                if (data[i].table_id) {
                    data[i].selectionState = true;
                } else {
                    data[i].selectionState = false;
                }
                if (data[i].is_parallel != "0") {
                    data[i].is_parallel = true;
                } else {
                    data[i].is_parallel = false;
                }
                if (data[i].is_md5 != "0") {
                    data[i].is_md5 = true;
                } else {
                    data[i].is_md5 = false;
                }
                if (data[i].unload_type != "1") {
                    data[i].unload_type = '全量';
                } else if ((data[i].unload_type != "2")) {
                    data[i].unload_type = '增量';
                }
            }
            console.log(data)
            this.allDataList = data;
        });
    },
    computed: {
        address() {
            const {
                activeSec,
                activeFirst
            } = this;
            return {
                activeSec,
                activeFirst
            };
        }
    },
    watch: {
        address(val) {
            if (val.activeFirst == true && val.activeSec == true) {
                this.nextlinkFun();
            }
        }
    },
    methods: {
        //编辑状态获取第二个页面值
        editzdySQLFun() {
            let params0 = {};
            params0["colSetId"] = this.dbid;
            addTaskAllFun.getAllSQLs(params0).then(res => {
                let data = res.data ? res.data : [];
                for (let i = 0; i < data.length; i++) {
                    if (data[i].is_parallel != "0") {
                        data[i].is_parallel = true;
                    } else {
                        data[i].is_parallel = false;
                    }
                    if (data[i].is_md5 != "0") {
                        data[i].is_md5 = true;
                    } else {
                        data[i].is_md5 = false;
                    }
                    if (data[i].unload_type != "1") {
                        data[i].unload_type = '全量';
                    } else if ((data[i].unload_type != "2")) {
                        data[i].unload_type = '增量';
                    }
                }
                this.ruleForm.sqlExtractData = data ? data : [];
                console.log(this.ruleForm.sqlExtractData)
                this.zdycallTable = JSON.parse(JSON.stringify(data))
            });
        },
        //编辑状态获得初始化信息
        steps_getInitInfo() {
            let params = {};
            params["colSetId"] = this.dbid;
            // this.tableloadingInfo='数据加载中...'
            addTaskAllFun.steps_getInitInfo(params).then(res => {
                console.log(res)
                if (res.data.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                } else {
                    let data = res.data ? res.data : [];
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].table_id) {
                            data[i].selectionState = true;
                        }
                        if (data[i].is_parallel != "0") {
                            data[i].is_parallel = true;
                        } else {
                            data[i].is_parallel = false;
                        }
                        if (data[i].is_md5 != "0") {
                            data[i].is_md5 = true;
                        } else {
                            data[i].is_md5 = false;
                        }
                        if (data[i].unload_type == "1") {
                            data[i].unload_type = '全量';
                        } else {
                            data[i].unload_type = '增量';
                        }

                    }
                    this.tableData = data;
                    console.log(this.tableData)
                    this.callTable = JSON.parse(JSON.stringify(data)) //存储之前编辑的数据，不做改动，方便点击下一步保存时对比
                    this.callTable2 = JSON.parse(JSON.stringify(data))
                    // this.Allis_selectionState = true;
                }
            });
        },
        // 表第一列的全选
        Allis_selectionStateFun(items, e) {
            let that = this;
            items.forEach((item, j) => {
                if (e) {
                    item.selectionState = true;
                    for (let i = 0; i < that.allData.length; i++) {
                        if (that.allData[i].table_name == item.table_name) {
                            that.allData[i].selectionState = true;
                        }
                    }
                    for (let i = 0; i < that.allDataList.length; i++) {
                        if (that.allDataList[i].table_name == item.table_name) {
                            that.allDataList[i].selectionState = true;
                        }
                    }
                } else {
                    item.selectionState = false;
                    for (let i = 0; i < that.allData.length; i++) {
                        if (that.allData[i].table_name == item.table_name) {
                            that.allData[i].selectionState = false;
                        }
                    }
                    for (let i = 0; i < that.allDataList.length; i++) {
                        if (that.allDataList[i].table_name == item.table_name) {
                            that.allDataList[i].selectionState = false;
                        }
                    }
                }
            });
        },
        // 获取所有表信息
        getAllTableInfoFun() {
            this.Allis_selectionState = false;
            this.tableData.length = 0;
            this.isdata = JSON.parse(JSON.stringify(this.allDataList));
            this.tableData = JSON.parse(JSON.stringify(this.allDataList));
        },
        // 全表点击单个复选框
        evercheck(val, name) {
            let count = 0
            if (val == true) {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].selectionState == true) {
                        count++

                    }
                }
                if (count == this.tableData.length) {
                    this.Allis_selectionState = true
                } else {
                    this.Allis_selectionState = false
                }
                for (let i = 0; i < this.allDataList.length; i++) {
                    if (this.allDataList[i].table_name == name) {
                        this.allDataList[i].selectionState = true;
                    }
                }
            } else {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].selectionState == false) {
                        if (count < this.tableData.length) {
                            this.Allis_selectionState = false
                        }
                    }
                }
                for (let i = 0; i < this.allDataList.length; i++) {
                    if (this.allDataList[i].table_name == name) {
                        this.allDataList[i].selectionState = false;
                    }
                }
            }
        },
        //选择列
        every_SelectColumnfun(val, alldata) {
            let count = 0;
            if (val == true) {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_get == true) {
                        count++
                    }

                }
                if (count == alldata.length) {
                    this.Allis_SelectColumn = true
                } else {
                    this.Allis_SelectColumn = false
                }
            } else {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_get == false) {
                        if (count < alldata.length) {
                            this.Allis_SelectColumn = false
                        }
                    }
                }
            }
        },
        // 
        every_Selectkeyfun(val, alldata) {
            let count = 0
            if (val == true) {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_primary_key == true) {
                        count++
                    }
                }
                if (count == alldata.length) {
                    this.Alliskey_SelectColumn = true
                } else {
                    this.Alliskey_SelectColumn = false
                }
            } else {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_primary_key == false) {
                        if (count < alldata.length) {
                            this.Alliskey_SelectColumn = false
                        }
                    }
                }
            }
        },
        // 搜索
        schfilter(val) {
            if (this.isdata.length != 0) {
                this.tableData = this.allDataList.filter(
                    data =>
                    !val || data.table_name.toLowerCase().includes(val.toLowerCase())
                );
                if (this.tableData.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                }
            } else {
                this.tableData = this.callTable.filter(
                    data =>
                    !val || data.table_name.toLowerCase().includes(val.toLowerCase())
                );
                if (this.tableData.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                }
            }
        },
        searchEnterFun(e) {
            var keyCode = window.event ? e.keyCode : e.which;
            if (keyCode == 13 && this.search) {
                this.schfilter(this.search);
            }
        },
        next() {
            // this.isLoading = true

            // if (this.handleactive == true) { //切换过第二个页面
            this.$refs['ruleForm'].validate(valid => {
                if (valid) {
                    this.isLoading = true
                    let tableData = this.tableData,
                        sqlExtractData = this.ruleForm.sqlExtractData,
                        rep_table = [],
                        isparmi = [],
                        isparmi2 = [];
                    console.log(this.tableData, this.ruleForm.sqlExtractData)
                    for (let i = 0; i < tableData.length; i++) { //判断两个页面数据有无重复数据
                        if (tableData[i].selectionState == true) {
                            isparmi.push(tableData[i].table_name)
                        }
                        for (let j = 0; j < sqlExtractData.length; j++) {
                            if (tableData[i].table_name == sqlExtractData[j].table_name && tableData[i].selectionState == true) {
                                console.log(tableData[i].table_name, sqlExtractData[j].table_name)
                                rep_table.push(tableData[i].table_name)
                            }
                        }
                    }
                    for (let j = 0; j < sqlExtractData.length; j++) {
                        isparmi2.push(sqlExtractData[j].table_name)
                    }
                    if (isparmi2.length == 0 && isparmi.length == 0) {
                        this.$message({
                            showClose: true,
                            message: '至少选择一张表',
                            type: "error"
                        });
                    } else {
                        //checkTablePrimary 
                        let params1 = {};
                        params1["tableNames"] = JSON.stringify(isparmi);
                        params1["colSetId"] = parseInt(this.dbid);
                        console.log(params1)
                        addTaskAllFun.checkTablePrimary(params1).then(res => {
                            console.log(res, 1)
                        });
                        let params2 = {};
                        params2["tableNames"] = JSON.stringify(isparmi2);
                        params2["colSetId"] = parseInt(this.dbid);
                        console.log(params2)
                        addTaskAllFun.checkTablePrimary(params2).then(res => {
                            console.log(res, 2)
                        });

                    }

                    if (rep_table.length > 0) { //有重复表
                        this.isLoading = false
                        this.$message({
                            showClose: true,
                            message: '表' + rep_table + '重复,请修改',
                            type: "error"
                        });
                    } else {
                        // 判断每个表主键问题
                        /*   this.saveTableConfFun(); //处理第一个页面数据
                          this.sqlFun() //处理第二个页面数据 */
                    }
                } else {
                    this.activeName = 'second'
                }
            });

        },
        sqlFun() {
            console.log(this.ruleForm.sqlExtractData, '第二个页面数据')
            console.log(this.xsTypeArr2, '第二个页面卸数增量是存放数据')
            console.log(this.ParallelExtractionArr2, '第二个页面并行抽取保存数据')
            console.log(this.zdycallTable, 11)
            let delold = [],
                twotabledata = JSON.parse(JSON.stringify(this.ruleForm.sqlExtractData)) //删除的表
            /*   for (let i = 0; i < twotabledata.length; i++) {
                  for (let j = 0; j < this.zdycallTable.length; j++) {
                      if (twotabledata[i].table_name == this.zdycallTable[j].table_name) {
                          this.zdycallTable.splice(j, 1)
                          j--
                      }
                  }
              }
              for (let j = 0; j < this.zdycallTable.length; j++) {
                  delold.push({
                      'tableId': this.zdycallTable[j].table_id //存储删除的表id
                  })
              } */
            for (let i = 0; i < twotabledata.length; i++) {
                for (let j = 0; j < this.xsTypeArr2.length; j++) {
                    if (twotabledata[i].table_name = this.xsTypeArr2[j].table_name) {
                        twotabledata[i].sql = this.xsTypeArr2[j].sql
                    }

                }
            }
            console.log(this.ParallelExtractionArr2, twotabledata)
            for (let i = 0; i < twotabledata.length; i++) {
                if (twotabledata[i].unload_type == '增量') {
                    twotabledata[i].unload_type = '2'
                } else {
                    twotabledata[i].unload_type = '1'
                }
                if (twotabledata[i].is_md5 == false) {
                    twotabledata[i].is_md5 = '0'
                } else {
                    twotabledata[i].is_md5 = '1'
                }
                if (twotabledata[i].is_parallel == false) {
                    twotabledata[i].is_parallel = '0'
                } else {
                    twotabledata[i].is_parallel = '1'
                }
                for (let j = 0; j < this.ParallelExtractionArr2.length; j++) {
                    if (twotabledata[i].table_name == this.ParallelExtractionArr2[j].tablename) {
                        twotabledata[i].dataincrement = parseInt(this.ParallelExtractionArr2[j].dataincrement)
                        twotabledata[i].pageparallels = this.ParallelExtractionArr2[j].pageparallels != '' ? parseInt(this.ParallelExtractionArr2[j].pageparallels) : 0
                        twotabledata[i].table_count = this.ParallelExtractionArr2[j].table_count + ''
                        twotabledata[i].rec_num_date = this.ParallelExtractionArr2[j].rec_num_date
                    }

                }
            }
            let params1 = {};
            params1["tableInfoArray"] = twotabledata.length > 0 ? JSON.stringify(twotabledata) : '';
            params1["colSetId"] = parseInt(this.dbid);
            //delold  删除的
            // params1["delTbString"] = delold.length > 0 ? JSON.stringify(delold) : '';
            console.log(params1)
            addTaskAllFun.saveAllSQL(params1).then(res => {
                if (res.code == '200') {
                    this.activeSec = true;
                    console.log(111)
                } else {
                    this.isLoading = false
                }
            });
        },
        nextlinkFun() {
            this.isLoading = false
            let data = {};
            if (this.$route.query.edit == "yes") {
                data = {
                    agent_id: this.agentId,
                    id: this.dbid,
                    source_id: this.sourceId,
                    source_name: this.$Base64.encode(this.sourceName),
                    edit: "yes"
                };
            } else {
                data = {
                    id: this.dbid,
                    source_id: this.sourceId,
                    source_name: this.$Base64.encode(this.sourceName)
                };
            }
            this.$router.push({
                path: "/collection1_3",
                query: data
            });
        },
        // 处理第一个页面数据
        saveTableConfFun() {
            console.log(this.tableData, '第一个页面数据')
            console.log(this.SelectColumn, '第一个页面选择列点击过保存的值')
            console.log(this.sqlFiltArr, '第一个页面sql过滤点击过保存的值')
            console.log(this.ParallelExtractionArr, '第一个页面并行抽取数据')
            console.log(this.xsTypeArr, '第一个页面卸数增量是存放数据')
            let arrData = [],
                delJson = [],
                tableInfoString = [],
                params = {};
            params["colSetId"] = this.dbid;
            addTaskAllFun.getSQLInfoByColSetId(params).then(res => {
                // 遍历拿到所有勾选的数据
                for (let i = 0; i < this.allDataList.length; i++) {
                    if (this.allDataList[i].selectionState == true) {
                        arrData.push(this.allDataList[i]);
                    }
                }
                //对比要删除的数据
                for (let i = 0; i < arrData.length; i++) {
                    for (let j = 0; j < this.callTable.length; j++) {
                        if (arrData[i].table_name == this.callTable[j].table_name) {
                            this.callTable.splice(j, 1)
                            j--
                        }
                    }
                }
                for (let j = 0; j < this.callTable.length; j++) {
                    delJson.push({
                        'tableId': this.callTable[j].table_id //存储删除的表id
                    })
                }
                if (this.callTable2.length > 0) {
                    console.log(this.callTable2)
                    for (let i = 0; i < arrData.length; i++) { //已勾选的表
                        //与原接口数据对比
                        for (let j = 0; j < this.callTable2.length; j++) { //之前编辑的表
                            if (arrData[i].table_name == this.callTable2[j].table_name && arrData[i].unload_type == this.callTable2[j].unload_type) {
                                //本次勾选的表与之前已存的表数据对比，有相同的吧之前的数据先赋值给现在的
                                if (this.callTable2[j].dataincrement) {
                                    arrData[i].dataincrement = this.callTable2[j].dataincrement; //每日数据增量
                                }
                                if (this.callTable2[j].is_customize_sql) {
                                    arrData[i].is_customize_sql = this.callTable2[j].is_customize_sql; //并行抽取的自定义sql
                                }
                                /*   if (arr[j].table_ch_name) {
                                      arrData[i].table_ch_name = this.callTable2[j].table_ch_name;//是否sql抽取
                                  } */
                                if (this.callTable2[j].page_sql) {
                                    arrData[i].page_sql = this.callTable2[j].page_sql; //分页sql
                                }
                                if (this.callTable2[j].pageparallels) {
                                    arrData[i].pageparallels = this.callTable2[j].pageparallels; //分页并行数
                                }
                                if (this.callTable2[j].rec_num_date) {
                                    arrData[i].rec_num_date = this.callTable2[j].rec_num_date; //获取数据总量点击按钮日期
                                }
                                if (this.callTable2[j].sql) {
                                    arrData[i].sql = this.callTable2[j].sql; //过滤的sql

                                }

                                /*   if (this.callTable2[j].xssql) {
                                      arrData[i].xssql = this.callTable2[j].xssql; //卸数方式设置的sql
                                  } */
                                if (this.callTable2[j].table_count) {
                                    arrData[i].table_count = this.callTable2[j].table_count; //数据总量
                                }

                            }
                        }
                    }
                    console.log(arrData)
                }
                if (this.ParallelExtractionArr.length > 0) { //本次并行抽取数据与表对比，有相同表名的，将本次新的数据赋值
                    for (let j = 0; j < arrData.length; j++) {
                        for (let jj = 0; jj < this.ParallelExtractionArr.length; jj++) {
                            if (
                                arrData[j].table_name ==
                                this.ParallelExtractionArr[jj].tablename
                            ) {
                                arrData[j].is_customize_sql = this.ParallelExtractionArr[jj].is_customize_sql;
                                if (this.ParallelExtractionArr[jj].page_sql) {
                                    arrData[j].page_sql = this.ParallelExtractionArr[jj].page_sql;
                                }
                                if (this.ParallelExtractionArr[jj].rec_num_date) {
                                    arrData[j].rec_num_date = this.ParallelExtractionArr[jj].rec_num_date;
                                }
                                if (this.ParallelExtractionArr[jj].pageparallels) {
                                    arrData[j].pageparallels = this.ParallelExtractionArr[
                                        jj
                                    ].pageparallels;
                                }
                                if (this.ParallelExtractionArr[jj].dataincrement) {
                                    arrData[j].dataincrement = this.ParallelExtractionArr[
                                        jj
                                    ].dataincrement;
                                }
                                if (this.ParallelExtractionArr[jj].table_count) {
                                    arrData[j].table_count = this.ParallelExtractionArr[
                                        jj
                                    ].table_count;
                                }
                            }
                        }
                    }
                }
                if (this.sqlFiltArr.length > 0) { //本次sql过滤数据与表对比，有相同表名的，将本次新的数据赋值
                    for (let j = 0; j < arrData.length; j++) {
                        for (let jj = 0; jj < this.sqlFiltArr.length; jj++) {
                            if (arrData[j].table_name == this.sqlFiltArr[jj].tablename && arrData[j].unload_type == '全量') {
                                if (this.sqlFiltArr[jj].sql) {
                                    arrData[j].sql = this.sqlFiltArr[jj].sql;
                                }
                            }
                        }
                    }
                }
                //   xsTypeArr
                if (this.xsTypeArr.length > 0) { //本次sql过滤数据与表对比，有相同表名的，将本次新的数据赋值
                    for (let j = 0; j < arrData.length; j++) {
                        for (let jj = 0; jj < this.xsTypeArr.length; jj++) {
                            if (arrData[j].table_name == this.xsTypeArr[jj].table_name && arrData[j].unload_type == '增量') {
                                if (this.xsTypeArr[jj].sql) {
                                    arrData[j].sql = JSON.stringify(this.xsTypeArr[jj].sql);
                                }
                            }
                        }
                    }
                }
                console.log(arrData)
                for (let k = 0; k < arrData.length; k++) {
                    if (arrData[k].unload_type == '增量') {
                        tableInfoString.push({
                            database_id: this.dbid,
                            table_id: arrData[k].table_id ? parseInt(arrData[k].table_id) : "",
                            is_parallel: "0",
                            is_md5: arrData[k].is_md5 ? "1" : "0",
                            table_ch_name: arrData[k].table_ch_name,
                            table_name: arrData[k].table_name,
                            sql: arrData[k].sql ? arrData[k].sql : '',
                            unload_type: '2'
                        });
                    } else {
                        if (arrData[k].is_parallel == true) {
                            console.log(arrData[k])
                            if (arrData[k].is_customize_sql == '1') {

                                tableInfoString.push({
                                    database_id: this.dbid,
                                    table_id: arrData[k].table_id ? parseInt(arrData[k].table_id) : "",
                                    is_parallel: "1",
                                    unload_type: '1',
                                    is_customize_sql: "1",
                                    is_md5: arrData[k].is_md5 ? "1" : "0",
                                    table_ch_name: arrData[k].table_ch_name,
                                    table_name: arrData[k].table_name,
                                    page_sql: arrData[k].page_sql ? arrData[k].page_sql : "",
                                    sql: arrData[k].sql ? arrData[k].sql : '',
                                });
                            } else {
                                tableInfoString.push({
                                    database_id: this.dbid,
                                    unload_type: '1',
                                    table_id: arrData[k].table_id ? parseInt(arrData[k].table_id) : "",
                                    is_parallel: "1",
                                    is_customize_sql: "0",
                                    is_md5: arrData[k].is_md5 ? "1" : "0",
                                    table_ch_name: arrData[k].table_ch_name,
                                    table_name: arrData[k].table_name,
                                    sql: arrData[k].sql ? arrData[k].sql : '',
                                    pageparallels: arrData[k].pageparallels ?
                                        parseInt(arrData[k].pageparallels) : null,
                                    dataincrement: arrData[k].dataincrement ?
                                        parseInt(arrData[k].dataincrement) : null,
                                    table_count: arrData[k].table_count ?
                                        "" + arrData[k].table_count : "",
                                    rec_num_date: arrData[k].rec_num_date ? arrData[k].rec_num_date : ''
                                });
                            }

                        } else {
                            tableInfoString.push({
                                database_id: this.dbid,
                                unload_type: '1',
                                table_id: arrData[k].table_id ? parseInt(arrData[k].table_id) : "",
                                is_parallel: "0",
                                is_md5: arrData[k].is_md5 ? "1" : "0",
                                table_ch_name: arrData[k].table_ch_name,
                                table_name: arrData[k].table_name,
                                sql: arrData[k].sql ? arrData[k].sql : '',
                            });
                        }

                    }

                }
                this.tablein = tableInfoString;
                this.saveTableInfofun(arrData, delJson);
            });
        },
        saveTableInfofun(arrData, delJson) {
            let arrcol = [],
                cola = [],
                collTbConfParamString = [],
                params = {},
                params2 = {};
            params["colSetId"] = this.dbid;
            addTaskAllFun.getColumnInfoByColSetId(params).then(res => {
                let colData = res.data ? res.data : [];
                console.log(colData)
                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].selectionState == true) {
                        if (colData) {
                            for (let key in colData) {
                                if (arrData[i].table_name == key) {
                                    arrData[i].data = colData[key];
                                    arrData[i].edit = "1";
                                }
                            }
                        }
                        arrcol.push({
                            tablename: arrData[i].table_name,
                            edit: arrData[i].edit ? arrData[i].edit : "0", //为时上次编辑的加上标志
                            data: arrData[i].data ? arrData[i].data : "" //将之前编辑的列数据赋值
                        });
                    }
                }
                cola = arrcol;
                if (this.SelectColumn.length > 0) {
                    for (let j = 0; j < cola.length; j++) {
                        for (let n = 0; n < this.SelectColumn.length; n++) {
                            if (
                                cola[j].tablename == this.SelectColumn[n].tablename &&
                                cola[j].edit == "1"
                            ) {
                                for (let m = 0; m < cola[j].data.length; m++) {
                                    for (let k = 0; k < this.SelectColumn[n].data.length; k++) {
                                        if (cola[j].data[m].column_name == this.SelectColumn[n].data[k].column_name) {
                                            cola[j].data[m].is_get = this.SelectColumn[n].data[k].is_get,
                                                cola[j].data[m].is_primary_key = this.SelectColumn[n].data[k].is_primary_key,
                                                cola[j].data[m].column_ch_name = this.SelectColumn[n].data[k].column_ch_name
                                        }

                                    }
                                }
                            } else if (cola[j].tablename == this.SelectColumn[n].tablename) {
                                cola[j].data = this.SelectColumn[n].data;
                            }
                        }
                    }
                }
                for (let m = 0; m < cola.length; m++) {
                    let a = [],
                        c = [];
                    a = JSON.parse(JSON.stringify(cola[m].data));
                    for (let i = 0; i < a.length; i++) {
                        for (let key in a[i]) {
                            a[i].tc_remark = (i + 1) + ''
                            if (key == "is_get") {
                                if (a[i][key] == true) {
                                    a[i][key] = "1";
                                } else if (a[i][key] == false) {
                                    a[i][key] = "0";
                                }
                            }
                            if (key == "column_ch_name") {
                                if (a[i][key] == "") {
                                    a[i][key] = a[i].column_name;
                                }
                            }
                            if (key == "is_primary_key") {
                                if (a[i][key] == true) {
                                    a[i][key] = "1";
                                } else if (a[i][key] == false) {
                                    a[i][key] = "0";
                                }
                            }
                        }
                    }
                    collTbConfParamString.push({
                        collColumnString: a.length != 0 ? JSON.stringify(a) : ""
                    });
                }
                let collstring = collTbConfParamString;
                console.log(collTbConfParamString)
                params2["colSetId"] = parseInt(this.dbid);
                params2["tableInfoString"] = JSON.stringify(this.tablein);
                params2["collTbConfParamString"] = JSON.stringify(collstring);
                params2["delTbString"] = delJson.length > 0 ? JSON.stringify(delJson) : '';
                console.log(params2)
                addTaskAllFun.saveCollTbInfo(params2).then(res => {
                    if (res && res.code == 200) {
                        this.activeFirst = true;
                        // this.dbid = res.data;
                    } else {
                        this.isLoading = false
                    }
                });
            });
        },
        pre() {
            let data = {};
            if (this.$route.query.edit == "yes") {
                data = {
                    agent_id: this.agentId,
                    id: this.dbid,
                    source_id: this.sourceId,
                    source_name: this.$Base64.encode(this.sourceName),
                    edit: "yes"
                };
            } else {
                data = {
                    id: this.dbid,
                    source_id: this.sourceId,
                    source_name: this.$Base64.encode(this.sourceName)
                };
            }
            this.$router.push({
                path: "/collection1_1",
                query: data
            });
        },
        //第一个页面 定义过滤
        Sqlfilt(value, row) {
            this.dialogTableSqlFilt = true;
            this.tablename = row.table_name;
            this.sqlFiltSetData_tablename = "";
            this.sqlFiltSetData_SQL = "";
            if (this.sqlFiltArr.length != 0) {
                let arrid = [];
                for (let i = 0; i < this.sqlFiltArr.length; i++) {
                    arrid.push(this.sqlFiltArr[i].tablename);
                }
                if (arrid.indexOf(this.tablename) != -1) {
                    arrid.length = 0;
                    for (let i = 0; i < this.sqlFiltArr.length; i++) {
                        if (this.sqlFiltArr[i].tablename == this.tablename) {
                            this.sqlFiltSetData_SQL = this.sqlFiltArr[i].sql;
                            this.sqlFiltSetData_tablename = this.sqlFiltArr[i].tablename;
                        }
                    }
                } else {
                    arrid.length = 0;
                    this.SqlfiltShowFun(row.table_name);
                }
                //
            } else {
                this.SqlfiltShowFun(row.table_name);
            }
        },
        //第一个页面 定义过滤接口回显数据
        SqlfiltShowFun(name) {
            let params = {};
            params["colSetId"] = this.dbid;
            params["tableName"] = name;
            addTaskAllFun.getSingleTableSQL(params).then(res => {
                this.sqlFiltSetData_tablename = this.tablename;
                if (res.data.length != 0) {
                    this.sqlFiltSetData_SQL = res.data[0].sql ? res.data[0].sql : "";
                }
            });
        },
        //第一个页面 定义过滤提交按钮
        SqlfiltSubmitFun() {
            if (this.sqlFiltArr.length != 0) {
                for (let i = 0; i < this.sqlFiltArr.length; i++) {
                    if (this.sqlFiltArr[i].tablename == this.tablename) {
                        this.sqlFiltArr.splice(i, 1);
                        i--;
                    }
                }
                this.sqlFiltArr.push({
                    tablename: this.tablename,
                    sql: this.sqlFiltSetData_SQL
                    //    sqlFiltvar:this.sqlFiltSetData_var //接收变量名
                });
            } else {
                this.sqlFiltArr.push({
                    tablename: this.tablename,
                    sql: this.sqlFiltSetData_SQL,
                    // sqlFiltvar:this.sqlFiltSetData_var
                });
            }
            this.tablename = "";
            console.log(this.sqlFiltArr)
        },
        // 第一个页面过滤关闭
        SqlfiltCloseFun() {
            this.tablename = "";
        },
        //第二个页面 自定义是否抽取sql
        checkedis_zdyparallelFun(row) {
            let a = row.is_parallel
            this.EXtable_name = row.table_name
            this.is_parallel = a;
            this.dialogdyfysql = true
            this.ruleForm_ParallelEx.pageExnum = "";
            this.ruleForm_ParallelEx.db_allnum = "";
            this.ruleForm_ParallelEx.everDay_addnum = "";
            this.ruleForm_ParallelEx.rec_num_date = "";
            // 判断如果数组暂存的有数据就遍历显示，没有见调接口
            if (this.ParallelExtractionArr2.length != 0) {
                let arrid = [];
                for (let i = 0; i < this.ParallelExtractionArr2.length; i++) {
                    arrid.push(this.ParallelExtractionArr2[i].tablename);
                }
                if (arrid.indexOf(this.EXtable_name) != -1) {
                    arrid.length = 0;
                    for (let i = 0; i < this.ParallelExtractionArr2.length; i++) {
                        if (this.ParallelExtractionArr2[i].tablename == this.EXtable_name) {
                            if (this.ParallelExtractionArr2[i].is_customize_sql == '1') {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr2[i].is_customize_sql;
                                this.ruleForm_ParallelEx.EXtable_sql = this.ParallelExtractionArr2[
                                    i
                                ].page_sql;
                            } else {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr2[i].is_customize_sql;
                                this.ruleForm_ParallelEx.db_allnum = this.ParallelExtractionArr2[
                                    i
                                ].table_count;
                                this.ruleForm_ParallelEx.pageExnum = this.ParallelExtractionArr2[
                                    i
                                ].pageparallels;
                                this.ruleForm_ParallelEx.everDay_addnum = this.ParallelExtractionArr2[
                                    i
                                ].dataincrement;
                            }

                        }
                    }
                } else {
                    arrid.length = 0;
                    if (row.table_id) {
                        this.is_parallelShowFun(row.table_id);
                    }
                }
                //
            } else {
                if (row.table_id) {
                    this.is_parallelShowFun(row.table_id);
                }
            }
        },
        // 第二个页面自定义sql提交
        checkedis_zdyparallelSubmitFun() {
            if (this.ParallelExtractionArr2.length != 0) {
                for (let i = 0; i < this.ParallelExtractionArr2.length; i++) {
                    if (this.ParallelExtractionArr2[i].tablename == this.EXtable_name) {
                        this.ParallelExtractionArr2.splice(i, 1);
                        i--;
                    }
                }
                this.ParallelExtractionArr2.push({
                    tablename: this.EXtable_name,
                    table_count: this.ruleForm_ParallelEx.db_allnum,
                    pageparallels: this.ruleForm_ParallelEx.pageExnum,
                    dataincrement: this.ruleForm_ParallelEx.everDay_addnum,
                    rec_num_date: this.ruleForm_ParallelEx.rec_num_date,
                });
            } else {
                this.ParallelExtractionArr2.push({
                    tablename: this.EXtable_name,
                    table_count: this.ruleForm_ParallelEx.db_allnum,
                    pageparallels: this.ruleForm_ParallelEx.pageExnum,
                    dataincrement: this.ruleForm_ParallelEx.everDay_addnum,
                    rec_num_date: this.ruleForm_ParallelEx.rec_num_date,
                });
            }
            for (let j = 0; j < this.ruleForm.sqlExtractData.length; j++) {
                if (this.ruleForm.sqlExtractData[j].table_name == this.EXtable_name) {
                    this.ruleForm.sqlExtractData[j].is_parallel = true;
                    this.EXtable_name = "";
                }
            }
            this.dialogdyfysql = false;
        },

        //第一个页面 是否抽取sql弹框
        checkedis_parallelFun(row) {
            console.log(row)
            let a = JSON.parse(JSON.stringify(row.is_parallel))
            this.dialogTableVisible = true;
            this.EXtable_name = row.table_name;
            this.is_parallel = a;
            this.ruleForm_ParallelEx.issql = ''
            this.ruleForm_ParallelEx.EXtable_sql = "";
            this.ruleForm_ParallelEx.pageExnum = "";
            this.ruleForm_ParallelEx.db_allnum = "";
            this.ruleForm_ParallelEx.everDay_addnum = "";
            // 判断如果数组暂存的有数据就遍历显示，没有见调接口
            if (this.ParallelExtractionArr.length != 0) {
                let arrid = [];
                for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
                    arrid.push(this.ParallelExtractionArr[i].tablename);
                }
                if (arrid.indexOf(this.EXtable_name) != -1) {
                    arrid.length = 0;
                    for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
                        if (this.ParallelExtractionArr[i].tablename == this.EXtable_name) {
                            if (this.ParallelExtractionArr[i].is_customize_sql == '1') {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr[i].is_customize_sql;
                                this.ruleForm_ParallelEx.EXtable_sql = this.ParallelExtractionArr[
                                    i
                                ].page_sql;
                            } else {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr[i].is_customize_sql;
                                this.ruleForm_ParallelEx.db_allnum = this.ParallelExtractionArr[
                                    i
                                ].table_count;
                                this.ruleForm_ParallelEx.pageExnum = this.ParallelExtractionArr[
                                    i
                                ].pageparallels;
                                this.ruleForm_ParallelEx.everDay_addnum = this.ParallelExtractionArr[
                                    i
                                ].dataincrement;
                            }

                        }
                    }
                } else {
                    arrid.length = 0;
                    if (row.table_id) {
                        this.is_parallelShowFun(row.table_id);
                    }
                }
                //
            } else {
                if (row.table_id) {
                    this.is_parallelShowFun(row.table_id);
                }
            }
        },
        // 是否并行抽取sql弹框回显数据
        is_parallelShowFun(id) {
            // ParallelExtractionArr
            let params = {};
            params["tableId"] = id;
            addTaskAllFun.getPageSQL(params).then(res => {
                console.log(res.data)
                if (res.data) {
                    if (res.data[0].is_customize_sql == '1') {
                        this.ruleForm_ParallelEx.issql = res.data[0].is_customize_sql //是否
                        this.ruleForm_ParallelEx.EXtable_sql = res.data[0].page_sql; //自定义sql
                    } else {
                        this.ruleForm_ParallelEx.issql = res.data[0].is_customize_sql //是否
                        this.ruleForm_ParallelEx.pageExnum = res.data[0].pageparallels; //分页行数
                        this.ruleForm_ParallelEx.db_allnum = res.data[0].table_count; //数据总量
                        this.ruleForm_ParallelEx.everDay_addnum = res.data[0].dataincrement; //每日数据增量
                    }

                }
            });
        },
        // 测试
        testParallelExtractionFun(n) {
            if (n == "test") {
                this.testDialogVisible = true;
            }
            this.ParallelExtractionLink = false;
            if (this.ruleForm_ParallelEx.EXtable_sql == undefined) {
                this.$message({
                    showClose: true,
                    message: "sql为空",
                    type: "error"
                });
            } else {
                let params = {};
                params["colSetId"] = this.dbid;
                params["pageSql"] = this.ruleForm_ParallelEx.EXtable_sql;
                addTaskAllFun.testParallelExtraction(params).then(res => {
                    if (res.success == true) {
                        res.message = "测试成功";
                        this.ParallelExtractionLink = "true";
                        this.testLinkReturn = res.message;
                        if (n == "submit") {
                            this.subExFun();
                        }
                    } else {
                        this.testLinkReturn = res.message;
                        if (n == "submit") {
                            this.subExFun();
                        }
                    }
                });
            }
        },
        // 获取数据总量
        getTableDataCountFun() {
            let params = {};
            params["tableName"] = this.EXtable_name;
            params["colSetId"] = parseInt(this.dbid);
            addTaskAllFun.getTableDataCount(params).then(res => {
                var nowDate = new Date();
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate(),
                }
                this.ruleForm_ParallelEx.db_allnum = res.data ? res.data : "";
                this.ruleForm_ParallelEx.rec_num_date = date.year + (date.month < 9 ? ('0' + date.month) : date.month) + (date.date < 9 ? ('0' + date.date) : date.date);
                console.log(this.ruleForm_ParallelEx)
            });
        },
        // 是否抽取sql弹框确定提交
        testParallelExtractionSubmitFun(formName) {
            let that = this
            console.log(that.ruleForm_ParallelEx, 'that.ruleForm_ParallelEx')
            this.$refs[formName].validate(valid => {
                if (valid) {
                    console.log(this.EXtable_name)
                    let tablename = this.EXtable_name
                    if (that.ruleForm_ParallelEx.issql == '1') {
                        let params = {};
                        params["colSetId"] = this.dbid;
                        params["pageSql"] = this.ruleForm_ParallelEx.EXtable_sql;
                        addTaskAllFun.testParallelExtraction(params).then(res => {
                            if (res.success == true) {
                                if (this.ParallelExtractionArr.length != 0) {
                                    for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
                                        if (this.ParallelExtractionArr[i].tablename == tablename) {
                                            this.ParallelExtractionArr.splice(i, 1);
                                            i--;
                                        }
                                    }
                                    this.ParallelExtractionArr.push({
                                        tablename: tablename,
                                        is_customize_sql: this.ruleForm_ParallelEx.issql,
                                        page_sql: this.ruleForm_ParallelEx.EXtable_sql,
                                    });
                                } else {
                                    this.ParallelExtractionArr.push({
                                        tablename: tablename,
                                        is_customize_sql: this.ruleForm_ParallelEx.issql,
                                        page_sql: this.ruleForm_ParallelEx.EXtable_sql,
                                    });
                                }
                                for (let j = 0; j < this.tableData.length; j++) {
                                    if (this.tableData[j].table_name == tablename) {
                                        this.tableData[j].is_parallel = true;
                                        console.log(this.tableData[j])
                                        for (let m = 0; m < this.allDataList.length; m++) {
                                            if (this.allDataList[m].table_name == tablename) {
                                                this.allDataList[m].is_parallel = true;
                                            }
                                        }
                                        // this.EXtable_name = "";
                                    }
                                }
                                this.dialogTableVisible = false;
                            }
                        });

                    } else if (that.ruleForm_ParallelEx.issql == '0') {
                        if (this.ParallelExtractionArr.length != 0) {
                            for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
                                if (this.ParallelExtractionArr[i].tablename == tablename) {
                                    this.ParallelExtractionArr.splice(i, 1);
                                    i--;
                                }
                            }
                            this.ParallelExtractionArr.push({
                                tablename: tablename,
                                is_customize_sql: this.ruleForm_ParallelEx.issql,
                                table_count: this.ruleForm_ParallelEx.db_allnum,
                                pageparallels: this.ruleForm_ParallelEx.pageExnum,
                                dataincrement: this.ruleForm_ParallelEx.everDay_addnum,
                                rec_num_date: this.ruleForm_ParallelEx.rec_num_date
                            });
                        } else {
                            this.ParallelExtractionArr.push({
                                tablename: tablename,
                                is_customize_sql: this.ruleForm_ParallelEx.issql,
                                table_count: this.ruleForm_ParallelEx.db_allnum,
                                pageparallels: this.ruleForm_ParallelEx.pageExnum,
                                dataincrement: this.ruleForm_ParallelEx.everDay_addnum,
                                rec_num_date: this.ruleForm_ParallelEx.rec_num_date
                            });
                        }
                        for (let j = 0; j < that.tableData.length; j++) {
                            if (that.tableData[j].table_name == tablename) {
                                that.tableData[j].is_parallel = true;
                                // that.tableData[j].table_ch_name='11111'
                                console.log(that.tableData, 'that')
                                console.log(that.tableData[j])
                                for (let m = 0; m < that.allDataList.length; m++) {
                                    if (that.allDataList[m].table_name == tablename) {
                                        that.allDataList[m].is_parallel = true;
                                    }
                                }
                                // this.EXtable_name = "";
                            }
                        }
                        this.dialogTableVisible = false;
                    }

                    console.log(that.tableData)
                }
            });
        },
        subExFun() {
            if (this.ParallelExtractionLink == "true") {
                if (this.ParallelExtractionArr.length != 0) {
                    for (let i = 0; i < this.ParallelExtractionArr.length; i++) {
                        if (this.ParallelExtractionArr[i].tablename == this.tablename) {
                            this.ParallelExtractionArr.splice(i, 1);
                            i--;
                        }
                    }
                    this.ParallelExtractionArr.push({
                        tablename: this.EXtable_name,
                        page_sql: this.ruleForm_ParallelEx.EXtable_sql,
                        table_count: this.ruleForm_ParallelEx.db_allnum,
                        pageparallels: this.ruleForm_ParallelEx.pageExnum,
                        dataincrement: this.ruleForm_ParallelEx.everDay_addnum
                    });
                } else {
                    this.ParallelExtractionArr.push({
                        tablename: this.EXtable_name,
                        page_sql: this.ruleForm_ParallelEx.EXtable_sql,
                        table_count: this.ruleForm_ParallelEx.db_allnum,
                        pageparallels: this.ruleForm_ParallelEx.pageExnum,
                        dataincrement: this.ruleForm_ParallelEx.everDay_addnum
                    });
                }
                for (let j = 0; j < this.tableData.length; j++) {
                    if (this.tableData[j].table_name == this.EXtable_name) {
                        this.tableData[j].is_parallel = true;
                        for (let m = 0; m < this.allDataList.length; m++) {
                            if (this.allDataList[m].table_name == this.EXtable_name) {
                                this.allDataList[m].is_parallel = true;
                            }
                        }
                        this.EXtable_name = "";
                    }
                }
                this.dialogTableVisible = false;
            } else {
                this.$message({
                    showClose: true,
                    message: "sql有误",
                    type: "error"
                });
            }
        },
        // 第一个页面md5
        md50Fun(row) {
            console.log(row)
            if (row.is_md5 == true) {
                for (let i = 0; i < this.allDataList.length; i++) {
                    if (this.allDataList[i].table_name == row.table_name) {
                        this.allDataList[i].is_md5 = true;
                    }
                }
            } else {
                for (let i = 0; i < this.allDataList.length; i++) {
                    if (this.allDataList[i].table_name == row.table_name) {
                        this.allDataList[i].is_md5 = false;
                    }
                }
            }
        },
        // 是否抽取sql弹框关闭
        testParallelExtractionCloseFun() {
            console.log(this.is_parallel)
            for (let j = 0; j < this.tableData.length; j++) {
                if (this.tableData[j].table_name == this.EXtable_name) {
                    if (this.is_parallel == false) {
                        this.tableData[j].is_parallel = true;
                        for (let i = 0; i < this.allDataList.length; i++) {
                            if (this.allDataList[i].table_name == this.EXtable_name) {
                                this.allDataList[i].is_parallel = true;
                            }
                        }
                        this.dialogTableVisible = false;
                    } else {
                        this.tableData[j].is_parallel = false;
                        for (let i = 0; i < this.allDataList.length; i++) {
                            if (this.allDataList[i].table_name == this.EXtable_name) {
                                this.allDataList[i].is_parallel = false;
                            }
                        }
                        this.dialogTableVisible = false;
                    }

                    this.EXtable_name = "";
                }
            }
        },
        // 第二
        testParallelExtractionCloseFun2() {
            for (let j = 0; j < this.ruleForm.sqlExtractData.length; j++) {
                if (this.ruleForm.sqlExtractData[j].table_name == this.EXtable_name) {
                    if (this.is_parallel == false) {
                        this.ruleForm.sqlExtractData[j].is_parallel = true;
                        this.dialogdyfysql = false;
                    } else {
                        this.ruleForm.sqlExtractData[j].is_parallel = false;
                        this.dialogdyfysql = false;
                    }

                    this.EXtable_name = "";
                }
            }
        },
        //第一页 选择列
        selectCol(value, row) {
            this.dialogSelectColumn = true;
            this.tablename = row.table_name;
            this.unloadType = row.unload_type
            this.tableloadingInfo = "数据加载中...";
            // this.disShow = false
            if (this.SelectColumn.length != 0) {
                let arrid = [];
                for (let i = 0; i < this.SelectColumn.length; i++) {
                    arrid.push(this.SelectColumn[i].tablename);
                }
                if (arrid.indexOf(this.tablename) != -1) {
                    arrid.length = 0;
                    let params = {};
                    params["colSetId"] = this.dbid;
                    params["tableName"] = row.table_name;
                    params["tableId"] = row.table_id;
                    addTaskAllFun.getColumnsigleInfo(params).then(res => {
                        console.log(res)
                        this.disShow = res.data.editFlag == '1' ? true : false;
                        for (let i = 0; i < this.SelectColumn.length; i++) {
                            if (this.SelectColumn[i].tablename == this.tablename) {
                                this.SelectColumnData = this.SelectColumn[i].data;
                            }
                        }
                    })
                } else {
                    arrid.length = 0;
                    this.SelectColumnShowFun(row.table_name, row.table_id);
                }
            } else {
                this.SelectColumnShowFun(row.table_name, row.table_id);
            }
        },
        //第二个  选择列
        selectCol2(value, row) {
            this.dialogSelectColumn2 = true;
            this.tablename = row.table_name;
            this.unloadType = row.unload_type
            this.tableloadingInfo = "数据加载中...";
            // this.disShow = false
            if (this.SelectColumn2.length != 0) {
                let arrid = [];
                for (let i = 0; i < this.SelectColumn2.length; i++) {
                    arrid.push(this.SelectColumn2[i].tablename);
                }
                if (arrid.indexOf(this.tablename) != -1) {
                    arrid.length = 0;
                    let params = {};
                    params["colSetId"] = this.dbid;
                    params["tableName"] = row.table_name;
                    params["tableId"] = row.table_id;
                    addTaskAllFun.getColumnsigleInfo(params).then(res => {
                        console.log(res)
                        this.disShow = res.data.editFlag == '1' ? true : false;
                        for (let i = 0; i < this.SelectColumn2.length; i++) {
                            if (this.SelectColumn2[i].tablename == this.tablename) {
                                this.SelectColumnData2 = this.SelectColumn2[i].data;
                            }
                        }
                    })
                } else {
                    arrid.length = 0;
                    this.SelectColumnShowFun(row.table_name, row.table_id);
                }
            } else {
                this.SelectColumnShowFun(row.table_name, row.table_id);
            }
        },
        //第一页 选择列弹框回显数据调接口
        SelectColumnShowFun(name, id) {
            let params = {};
            params["colSetId"] = this.dbid;
            params["tableName"] = name;
            params["tableId"] = id;
            addTaskAllFun.getColumnsigleInfo(params).then(res => {
                console.log(res)
                if (res.data.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                } else {
                    this.coltable_name = "";
                    this.coltable_name = res.data.tableName ? res.data.tableName : "";
                    this.disShow = res.data.editFlag == '1' ? true : false;
                    let data = res.data.columnInfo ? res.data.columnInfo : [],
                        count = 0,
                        num = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].is_get) {
                            if (data[i].is_get == "1") {
                                count++;
                                data[i].is_get = true;
                            } else {
                                data[i].is_get = false;
                            }
                        } else {
                            data[i].is_get = false;
                        }
                        if (data[i].is_primary_key) {
                            if (data[i].is_primary_key == "1") {
                                num++;
                                data[i].is_primary_key = true;
                            } else {
                                data[i].is_primary_key = false;
                            }
                        } else {
                            data[i].is_primary_key = false;
                        }
                        if (data[i].column_ch_name == '') {
                            data[i].column_ch_name = data[i].column_name
                        }
                    }
                    if (count == data.length && data) {
                        this.Allis_SelectColumn = true;
                        count = 0;
                    } else {
                        this.Allis_SelectColumn = false;
                        count = 0;
                    }
                    if (num == data.length && data) {
                        this.Alliskey_SelectColumn = true;
                        num = 0;
                    } else {
                        this.Alliskey_SelectColumn = false;
                        num = 0;
                    }
                    this.SelectColumnData = JSON.parse(JSON.stringify(data));
                }

            });
        },
        //第二页 选择列弹框回显数据调接口
        SelectColumnShowFun(name, id) {
            let params = {};
            params["colSetId"] = this.dbid;
            params["tableName"] = name;
            params["tableId"] = id;
            addTaskAllFun.getColumnsigleInfo(params).then(res => {
                console.log(res)
                if (res.data.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                } else {
                    this.coltable_name = "";
                    this.coltable_name = res.data.tableName ? res.data.tableName : "";
                    this.disShow = res.data.editFlag == '1' ? true : false;
                    let data = res.data.columnInfo ? res.data.columnInfo : [],
                        count = 0,
                        num = 0;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].is_get) {
                            if (data[i].is_get == "1") {
                                count++;
                                data[i].is_get = true;
                            } else {
                                data[i].is_get = false;
                            }
                        } else {
                            data[i].is_get = false;
                        }
                        if (data[i].is_primary_key) {
                            if (data[i].is_primary_key == "1") {
                                num++;
                                data[i].is_primary_key = true;
                            } else {
                                data[i].is_primary_key = false;
                            }
                        } else {
                            data[i].is_primary_key = false;
                        }
                        if (data[i].column_ch_name == '') {
                            data[i].column_ch_name = data[i].column_name
                        }
                    }
                    if (count == data.length && data) {
                        this.Allis_SelectColumn = true;
                        count = 0;
                    } else {
                        this.Allis_SelectColumn = false;
                        count = 0;
                    }
                    if (num == data.length && data) {
                        this.Alliskey_SelectColumn = true;
                        num = 0;
                    } else {
                        this.Alliskey_SelectColumn = false;
                        num = 0;
                    }
                    this.SelectColumnData2 = JSON.parse(JSON.stringify(data));
                }

            });
        },
        //第一页 选择列弹框确认
        SelectColumnSubmitFun() {
            let arrData = this.SelectColumnData,
                hasprimaryKey = false;
            if (this.unloadType == '增量') {
                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].is_primary_key == true) {
                        hasprimaryKey = true
                    }
                }
            } else {
                hasprimaryKey = true
            }
            if (hasprimaryKey == true) {
                if (this.SelectColumn.length > 0) {
                    for (let i = 0; i < this.SelectColumn.length; i++) {
                        if (this.SelectColumn[i].tablename == this.tablename) {
                            this.SelectColumn.splice(i, 1);
                            i--;
                        }
                    }
                    this.SelectColumn.push({
                        tablename: this.tablename,
                        data: this.SelectColumnData,
                        hasprimaryKey: true
                    });
                } else {
                    this.SelectColumn.push({
                        tablename: this.tablename,
                        data: this.SelectColumnData,
                        hasprimaryKey: true
                    });
                }
                this.dialogSelectColumn = false;
                this.tablename = "";
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择至少一个主键',
                    type: "error"
                });
            }
            console.log(this.SelectColumn, this.SelectColumnData)

        },
        //第二页 选择列弹框确认
        SelectColumnSubmitFun2() {
            let arrData = this.SelectColumnData2,
                hasprimaryKey = false;
            if (this.unloadType == '增量') {
                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].is_primary_key == true) {
                        hasprimaryKey = true
                    }
                }
            } else {
                hasprimaryKey = true
            }
            if (hasprimaryKey == true) {
                if (this.SelectColumn2.length > 0) {
                    for (let i = 0; i < this.SelectColumn2.length; i++) {
                        if (this.SelectColumn2[i].tablename == this.tablename) {
                            this.SelectColumn2.splice(i, 1);
                            i--;
                        }
                    }
                    this.SelectColumn2.push({
                        tablename: this.tablename,
                        data: this.SelectColumnData2,
                        hasprimaryKey: true
                    });
                } else {
                    this.SelectColumn2.push({
                        tablename: this.tablename,
                        data: this.SelectColumnData2,
                        hasprimaryKey: true
                    });
                }
                this.dialogSelectColumn2 = false;
                this.tablename = "";
            } else {
                this.$message({
                    showClose: true,
                    message: '请选择至少一个主键',
                    type: "error"
                });
            }
            console.log(this.SelectColumn2, this.SelectColumnData2)

        },
        //第一页 选择列弹框关闭
        SelectColumnCloseFun() {
            this.tablename = "";
        },
        //第2页 选择列弹框关闭
        SelectColumnCloseFun2() {
            this.dialogSelectColumn2 = false;
            this.tablename = "";
        },
        //第一页 选择列的弹框复选框全选
        Allis_SelectColumnFun(items, e) {
            items.forEach((item, i) => {
                if (e) {
                    item.is_get = true;
                } else {
                    item.is_get = false;
                }
            });
        },
        //第一页 选择列 主键
        Alliskey_SelectColumnFun(items, e) {
            items.forEach((item, i) => {
                if (e) {
                    item.is_primary_key = true;
                } else {
                    item.is_primary_key = false;
                }
            });
        },
        sig1_handleSizeChange(size) {
            this.pagesize = size;
        },
        sig1_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        sqlex_handleSizeChange(size) {
            this.sqlexpagesize = size;
        },
        sqlex_handleCurrentChange(currentPage) {
            this.sqlexcurrentPage = currentPage;
        },
        //上移
        moveUp(index, row, tableData) {
            if (index > 0) {
                let upDate = tableData[index - 1];
                tableData.splice(index - 1, 1);
                tableData.splice(index, 0, upDate);
            } else {
                // alert("已经是第一条，不可上移");
            }
        },
        //下移
        moveDown(index, row, tableData) {
            if (index + 1 === tableData.length) {
                // alert("已经是最后一条，不可下移");
            } else {
                let downDate = tableData[index + 1];
                tableData.splice(index + 1, 1);
                tableData.splice(index, 0, downDate);
            }
        },
        //删除
        DelRowFun(index, rows) {

            message.confirmMsg('确定删除吗').then(res => {
                rows.splice(index, 1);
            }).catch(() => {})

        },
        //新增行
        addRow(tableData, event) {
            tableData.push({
                table_name: "",
                table_ch_name: "",
                unload_type: "",
                is_md5: false,
                is_parallel: ""
            });
        },
        // 修改表名
        changetablechnameFun(chname, name) {
            /*  for (let m = 0; m < this.allData.length; m++) {
                 if (this.allData[m].table_name == name) {
                     this.allData[m].table_ch_name = chname;
                 }
             } */
            for (let m = 0; m < this.allDataList.length; m++) {
                if (this.allDataList[m].table_name == name) {
                    this.allDataList[m].table_ch_name = chname;
                }
            }
        },

        // 第一个页面卸数方式发生改变
        oneunloadTypeFun(row) {
            for (let m = 0; m < this.allDataList.length; m++) {
                if (this.allDataList[m].table_name == row.table_name) {
                    this.allDataList[m].unload_type = row.unload_type;
                }
            }
        },
        // 使用SQL抽取数据
        handleClick(tab) {
            if (tab.name == "first") {
                this.sqlExtractDataSubmitFun('ruleForm')
            } else if (tab.name == "second") {
                if (this.sqlSubmit == true) {
                    this.ruleForm.sqlExtractData = this.tableInfoArray;
                }
            }
        },
        // 使用SQL抽取数据确定
        sqlExtractDataSubmitFun(formName) {
            this.tableInfoArray = this.ruleForm.sqlExtractData; //
            this.sqlSubmit = true
            /*  this.$refs[formName].validate(valid => {
                 if (valid) {
                     this.tableInfoArray = this.ruleForm.sqlExtractData;
                     this.sqlSubmit = true
                     console.log(this.ruleForm.sqlExtractData,2)
                 }
             }); */
        },
        //第一个页面打开卸数方式设置
        XSTypeFun(row) {
            /*  this.Xstable_name = row.table_name
             if (row.unload_type == '全量') {
                 this.dialog_xsall = true
             } else {
                 this.xstypeadd.add_sql = ''
                 this.xstypeadd.del_sql = ''
                 this.xstypeadd.updata_sql = ''
                 if (this.xsTypeArr.length > 0) {
                     for (let i = 0; i < this.xsTypeArr.length; i++) {
                         if (this.xsTypeArr[i].table_name == row.table_name) {
                             this.xstypeadd.add_sql = this.xsTypeArr[i].sql.add_sql
                             this.xstypeadd.del_sql = this.xsTypeArr[i].sql.del_sql
                             this.xstypeadd.updata_sql = this.xsTypeArr[i].sql.updata_sql
                         }
                     }
                 }
                 this.dialog_xsadd = true
             } */
            // 
            this.Xstable_name = row.table_name
            this.xstypeadd.add = ''
            this.xstypeadd.delete = ''
            this.xstypeadd.update = ''
            let arrid = [];
            if (this.xsTypeArr.length > 0) {
                for (let i = 0; i < this.xsTypeArr.length; i++) {
                    arrid.push(this.xsTypeArr[i].table_name);
                }
            }
            if (arrid.length > 0 && arrid.indexOf(row.table_name) != -1) {
                console.log('q')
                arrid.length = 0;
                if (row.unload_type == '全量') {
                    if (this.xsTypeArr.length > 0) {
                        for (let i = 0; i < this.xsTypeArr.length; i++) {
                            if (this.xsTypeArr[i].table_name == row.table_name) {
                                this.xstypeadd.add = this.xsTypeArr[i].sql
                            }
                        }
                    }
                    this.dialog_xsall = true
                } else {
                    console.log('z')
                    if (this.xsTypeArr.length > 0) {
                        for (let i = 0; i < this.xsTypeArr.length; i++) {
                            if (this.xsTypeArr[i].table_name == row.table_name) {
                                this.xstypeadd.add = this.xsTypeArr[i].sql.add
                                this.xstypeadd.delete = this.xsTypeArr[i].sql.delete
                                this.xstypeadd.update = this.xsTypeArr[i].sql.update
                            }
                        }
                    }
                    this.dialog_xsadd = true
                }
            } else {
                if (row.table_id && row.table_id != '') {
                    console.log(row.table_id, row.unload_type)
                    this.getTableSetUnloadDataFunfist(row.table_id, row.unload_type)
                } else {
                    console.log('wr')
                    if (row.unload_type == '全量') {
                        this.dialog_xsall = true
                    } else {
                        this.dialog_xsadd = true
                    }
                }
            }

            // 
        },
        //第二个页面打开卸数方式设置
        XSTypeFun2(row) {
            console.log(row, this.xsTypeArr2)
            this.Xstable_name = row.table_name
            this.xstypeadd2.add = ''
            this.xstypeadd2.delete = ''
            this.xstypeadd2.update = ''
            let arrid = [];
            if (this.xsTypeArr2.length > 0) {
                for (let i = 0; i < this.xsTypeArr2.length; i++) {
                    arrid.push(this.xsTypeArr2[i].table_name);
                }
            }
            if (arrid.length > 0 && arrid.indexOf(row.table_name) != -1) {
                console.log('q')
                arrid.length = 0;
                if (row.unload_type == '全量') {
                    if (this.xsTypeArr2.length > 0) {
                        for (let i = 0; i < this.xsTypeArr2.length; i++) {
                            if (this.xsTypeArr2[i].table_name == row.table_name) {
                                this.xstypeadd2.add = this.xsTypeArr2[i].sql
                            }
                        }
                    }
                    this.dialog_xsall = true
                } else {
                    console.log('z')
                    if (this.xsTypeArr2.length > 0) {
                        for (let i = 0; i < this.xsTypeArr2.length; i++) {
                            if (this.xsTypeArr2[i].table_name == row.table_name) {
                                this.xstypeadd2.add = this.xsTypeArr2[i].sql.add
                                this.xstypeadd2.delete = this.xsTypeArr2[i].sql.delete
                                this.xstypeadd2.update = this.xsTypeArr2[i].sql.update
                            }
                        }
                    }
                    this.dialog_xsadd2 = true
                }
            } else {
                if (row.table_id && row.table_id != '') {
                    this.getTableSetUnloadDataFun(row.table_id, row.unload_type)
                } else {
                    console.log('wr')
                    if (row.unload_type == '全量') {
                        this.dialog_xsall = true
                    } else {
                        this.dialog_xsadd2 = true
                    }
                }
            }

        },
        //点击设置调接口
        getTableSetUnloadDataFun(id, type) {
            console.log('d')
            let params = {};
            params["table_id"] = id;
            if (type == '全量') {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    this.dialog_xsall = true
                    this.xstypeadd2.add = res.data.sql
                })
            } else {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    this.dialog_xsadd2 = true
                    this.xstypeadd2 = JSON.parse(res.data.sql)
                })
            }

        },
        getTableSetUnloadDataFunfist(id, type) {
            console.log('d')
            let params = {};
            params["table_id"] = id;
            if (type == '全量') {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    this.dialog_xsall = true
                    this.xstypeadd.add = res.data.sql
                })
            } else {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    this.dialog_xsadd = true
                    this.xstypeadd = JSON.parse(res.data.sql)
                    console.log(res.data.sql, JSON.parse(res.data.sql))
                })
            }

        },
        //第一个页面面卸数方式增量的设置提交
        xsaddSubmitFun() {
            if (this.xsTypeArr.length > 0) {
                let arr = []
                this.xsTypeArr.forEach((item) => {
                    arr.push(item.table_name)
                })
                if (arr.indexOf(this.Xstable_name) != -1) {
                    this.xsTypeArr.forEach((item) => {
                        if (item.table_name == this.Xstable_name) {
                            item.sql = JSON.parse(JSON.stringify(this.xstypeadd))
                        }
                    })
                    arr = []
                } else {
                    this.xsTypeArr.push({
                        table_name: this.Xstable_name,
                        sql: JSON.parse(JSON.stringify(this.xstypeadd))
                    })
                    arr = []
                }
            } else {
                this.xsTypeArr.push({
                    table_name: this.Xstable_name,
                    sql: JSON.parse(JSON.stringify(this.xstypeadd))
                })

            }
            console.log(this.xsTypeArr)
        },
        //第2个页面面卸数方式增量的设置提交
        xsaddSubmittwoFun() {
            console.log(this.xstypeadd2)
            if (this.xsTypeArr2.length > 0) {
                let arr = []
                this.xsTypeArr2.forEach((item) => {
                    arr.push(item.table_name)
                })
                if (arr.indexOf(this.Xstable_name) != -1) {
                    this.xsTypeArr2.forEach((item) => {
                        if (item.table_name == this.Xstable_name) {
                            item.sql = JSON.parse(JSON.stringify(this.xstypeadd2))
                        }
                    })
                    arr = []
                } else {
                    this.xsTypeArr2.push({
                        table_name: this.Xstable_name,
                        sql: JSON.parse(JSON.stringify(this.xstypeadd2))
                    })
                    arr = []
                }
            } else {
                console.log(this.xstypeadd2, this.Xstable_name)
                this.xsTypeArr2.push({
                    table_name: this.Xstable_name,
                    sql: JSON.parse(JSON.stringify(this.xstypeadd2))
                })

            }
            console.log(this.xsTypeArr2)
        },
        xsallSubmitFun() {
            console.log(this.xsTypeArr2)

            if (this.xsTypeArr2.length > 0) {
                let arr = []
                this.xsTypeArr2.forEach((item) => {
                    arr.push(item.table_name)
                })
                if (arr.indexOf(this.Xstable_name) != -1) {
                    this.xsTypeArr2.forEach((item) => {
                        if (item.table_name == this.Xstable_name) {
                            item.sql = this.xstypeadd2.add
                        }
                    })
                    arr = []
                } else {
                    this.xsTypeArr2.push({
                        table_name: this.Xstable_name,
                        sql: this.xstypeadd2.add
                    })
                    arr = []
                }
            } else {
                this.xsTypeArr2.push({
                    table_name: this.Xstable_name,
                    sql: this.xstypeadd2.add
                })

            }
        }
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

.rightSearch {
    /* width: 32%; */
    position: absolute;
    top: -50px;
    right: 0;
}

#singleTable>>>.el-pagination {
    text-align: center;
    margin-top: 6px;
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
