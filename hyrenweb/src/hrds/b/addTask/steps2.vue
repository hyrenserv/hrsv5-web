<template>
<div class="singlesearch" id="singleTable">
    <Step :active="active"></Step>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="单表查询" name="first">
            <div id="singleTable">
                <div class="rightSearch">
                    <el-input v-model="search" placeholder="多表查询请用|分隔" style="width: 50%;
    margin-right: 10px;" @keyup.enter.native="searchEnterFun" />
                    <el-button size="mini" type="success" icon="el-icon-search" @click="schfilter(search)">查询</el-button>
                    <el-button size="mini" type="success" @click="getAllTableInfoFun()">查看全表</el-button>
                </div>
                <div class="singleTableinner">
                    <el-table ref="filterTable" stripe :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" border :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
                        <el-table-column width="55" align="center" prop="selectionState">
                            <template slot="header" slot-scope="scope">
                                <el-checkbox @change="Allis_selectionStateFun(tableData,Allis_selectionState)" v-model="Allis_selectionState" :checked="Allis_selectionState"></el-checkbox>
                            </template>
                            <template slot-scope="scope">
                                <el-checkbox :checked="scope.row.selectionState" v-model="scope.row.selectionState" @change="evercheck(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column label="序号" align="center" width="60">
                            <template slot-scope="scope">
                                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="table_name" label="表名" width="180" align="center" :show-overflow-tooltip="true"></el-table-column>
                        <el-table-column prop="table_ch_name" label="表中文名" width="160" align="center" :show-overflow-tooltip="true">
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.table_ch_name" placeholder="中文名" @change="changetablechnameFun(scope.row)"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="卸数方式" align="center">
                            <template slot-scope="scope">
                                <el-row>
                                    <!-- <el-col :span="19"> -->
                                    <el-radio-group v-model="scope.row.unload_type" v-if="scope.row.collectState==false">
                                        <el-radio v-for="(item,index) in xsType" :key="index" :label="item.value" disabled>{{item.value}}设置</el-radio>
                                    </el-radio-group>
                                    <el-radio-group v-model="scope.row.unload_type" v-else>
                                        <el-radio v-for="(item,index) in xsType" :key="index" :label="item.value" @click.native.prevent="XSTypeFun(scope.row,item.value)">{{item.value}}设置</el-radio>
                                    </el-radio-group>
                                </el-row>
                            </template>
                        </el-table-column>
                        <el-table-column prop="is_md5" label=" 计算MD5" align="center">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.is_md5" v-if="scope.row.collectState==true" :checked="scope.row.is_md5" @change="md50Fun(scope.row)"></el-checkbox>
                                <el-checkbox v-model="scope.row.is_md5" v-else disabled :checked="scope.row.is_md5" @change="md50Fun(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>
                        <el-table-column prop="is_parallel" label=" 是否并行抽取" align="center">
                            <template slot-scope="scope">
                                <el-checkbox disabled v-if="scope.row.unload_type=='增量'||scope.row.collectState==false" v-model="scope.row.is_parallel" :checked="scope.row.is_parallel" @change="checkedis_parallelFun(scope.row)"></el-checkbox>
                                <el-checkbox v-else v-model="scope.row.is_parallel" :checked="scope.row.is_parallel" @change="checkedis_parallelFun(scope.row)"></el-checkbox>
                            </template>
                        </el-table-column>

                        <el-table-column prop="sqlFiltering" label="SQL过滤" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" disabled v-if="scope.row.unload_type=='增量'||scope.row.collectState==false" type="success">定义过滤</el-button>
                                <el-button size="mini" v-else @click="Sqlfilt(scope.$index, scope.row)" type="success">定义过滤</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column prop="selectCol" label="选择列" align="center">
                            <template slot-scope="scope">
                                <el-button size="mini" @click="selectCol(scope.$index, scope.row)" type="info">选择列</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="sig1_handleSizeChange" @current-change="sig1_handleCurrentChange" :current-page="currentPage" :page-sizes="[50, 100, 150, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length"></el-pagination>
                </div>
            </div>
        </el-tab-pane>
        <el-tab-pane label="使用SQL抽取数据" name="second">
            <el-button type="success" style="margin:0 0 5px 0" class="addline" @click="addRow(ruleForm.sqlExtractData)" size="mini">新增行</el-button>
            <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
            <el-form ref="ruleForm" :model="ruleForm" class="steps2">
                <el-table stripe :data="ruleForm.sqlExtractData.slice((sqlexcurrentPage - 1) * sqlexpagesize, sqlexcurrentPage * sqlexpagesize)" border size="medium" highlight-current-row>
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
                            <el-row class="twopageradior">
                                <!-- <el-col :span="19"> -->
                                <el-form-item :prop="'sqlExtractData.'+scope.$index+'.unload_type'" :rules="rule.selected">
                                    <el-radio-group v-model="scope.row.unload_type" v-if="scope.row.collectState==false">
                                        <el-radio v-for="(item,index) in xsType" :key="index" :label="item.value" disabled>{{item.value}}设置</el-radio>
                                    </el-radio-group>
                                    <el-radio-group v-model="scope.row.unload_type" v-else>
                                        <el-radio v-for="(item,index) in xsType" :key="index" :label="item.value" @click.native.prevent="XSTypeFun2(scope.row,item.value)">{{item.value}}设置</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-row>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_md5" label=" 计算MD5" align="center" width="100">
                        <template slot-scope="scope">
                            <el-checkbox v-model="scope.row.is_md5" disabled v-if="scope.row.collectState==false" :checked="scope.row.is_md5"></el-checkbox>
                            <el-checkbox v-model="scope.row.is_md5" v-else :checked="scope.row.is_md5"></el-checkbox>
                        </template>
                    </el-table-column>

                    <el-table-column prop="is_parallel" label="是否并行抽取" align="center" width="120">
                        <template slot-scope="scope">
                            <el-checkbox disabled v-if="scope.row.unload_type=='增量'||scope.row.collectState==false" v-model="scope.row.is_parallel" :checked="scope.row.is_parallel" @change="checkedis_zdyparallelFun(scope.row)"></el-checkbox>
                            <el-checkbox v-else v-model="scope.row.is_parallel" :checked="scope.row.is_parallel" @change="checkedis_zdyparallelFun(scope.row)"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column prop="selectCol" label="选择列" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="selectCol2(scope.$index, scope.row)" type="info">选择列</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="90px">
                        <template slot-scope="scope">
                            <el-button class="delcolor" type="text" circle @click="DelRowFun(scope.$index, ruleForm.sqlExtractData)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form>
            <el-pagination @size-change="sqlex_handleSizeChange" @current-change="sqlex_handleCurrentChange" :current-page.sync="sqlexcurrentPage" :page-size="sqlexpagesize" layout="total, prev, pager, next" :total="ruleForm.sqlExtractData.length" class="locationcenter"></el-pagination>
        </el-tab-pane>
    </el-tabs>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="leftbtn" @click="backFun()">返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="rightbtn" @click="next()">下一步</el-button>
            <el-button type="primary" size="medium" class="rightbtn" @click="pre()">上一步</el-button>
        </el-col>
    </el-row>
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
            <span class="dialogtoptxt">
                表名:
                <p class="dialogtopname">{{sqlFiltSetData_tablename}}</p>
            </span>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form ref="addClassTask">
            <el-row type="flex" justify="center">
                <el-col :span="24">
                    <el-form-item prop="table_des">
                        <el-input v-model="sqlFiltSetData_SQL" type="textarea" placeholder="自定义SQL"></el-input>
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
        <el-table stripe :data="SelectColumnData" border size="medium" highlight-current-row>
            <el-table-column label="选择列" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)" v-model="Allis_SelectColumn" :checked="Allis_SelectColumn" v-if="disShow==true" disabled></el-checkbox>
                    <el-checkbox v-else @change="Allis_SelectColumnFun(SelectColumnData,Allis_SelectColumn)" v-model="Allis_SelectColumn" :checked="Allis_SelectColumn"></el-checkbox>&nbsp;选择列
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-if="disShow==true" disabled></el-checkbox>
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-else @change="every_SelectColumnfun(scope.row.is_get,SelectColumnData)"></el-checkbox>
                    <!-- <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get"></el-checkbox> -->
                </template>
            </el-table-column>

            <el-table-column label="主键定义" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Alliskey_SelectColumnFun(SelectColumnData,Alliskey_SelectColumn)" v-model="Alliskey_SelectColumn" :checked="Alliskey_SelectColumn" v-if="disShow==true" disabled></el-checkbox>
                    <el-checkbox v-else @change="Alliskey_SelectColumnFun(SelectColumnData,Alliskey_SelectColumn)" v-model="Alliskey_SelectColumn" :checked="Alliskey_SelectColumn"></el-checkbox>主键定义
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_primary_key" v-model="scope.row.is_primary_key" v-if="disShow==true" disabled></el-checkbox>
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
                    <el-button size="mini" v-if="disShow==true" disabled>
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-else :disabled="scope.$index===0" @click="moveUp(scope.$index,scope.row,SelectColumnData)">
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-if="disShow==true" disabled>
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
            <el-form-item label="新增SQL" prop="insert" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd.insert" type="textarea" autosize size="medium" style="width:284px"></el-input>
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
            <el-button type="primary" size="mini" @click="xsaddSubmitFun('xstypeadd')">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 第二个页面增量弹层 -->
    <el-dialog title :visible.sync="dialog_xsadd2" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">卸数方式-增量</span>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form :model="xstypeadd2" ref="xstypeadd2" status-icon label-width="30%">
            <el-form-item label="删除SQL" prop="delete" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd2.delete" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="新增SQL" prop="insert" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd2.insert" type="textarea" autosize size="medium" style="width:284px"></el-input>
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
            <el-button type="primary" size="mini" @click="xsaddSubmittwoFun('xstypeadd2')">确 定</el-button>
        </div>
    </el-dialog>
    <!--第二个页面卸数方式-全量  -->
    <el-dialog title :visible.sync="dialog_xsall" width="50%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">卸数方式-全量</span>
        </div>
        <span class="alltabletitle">sql说明：#{tx_date} 当前跑批日期; #{tx_date_next} 后一跑批日期; #{tx_date_pre} 前一跑批日期; #{自定义列名} 自定义列名</span>
        <el-form :model="xstypeadd2q" status-icon ref="xstypeadd2q" label-width="30%">
            <el-form-item label="SQL" prop="insert" :rules="rule.default">
                <el-row type="flex" justify="center">
                    <el-col>
                        <el-input v-model="xstypeadd2q.insert" type="textarea" autosize size="medium" style="width:284px"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini" @click="dialog_xsall=false">取 消</el-button>
            <el-button type="primary" size="mini" @click="xsallSubmitFun('xstypeadd2q')">确 定</el-button>
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
                    <el-button type="warning" :loading="linkloading" v-if="ruleForm_ParallelEx.issql=='1'" size="mini" @click="testParallelExtractionFun('test')">测试分页SQL</el-button>
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
    <!--第二个页面定义分页抽取sql  -->
    <el-dialog title :visible.sync="dialogdyfysql" width="50%" class="alltable">
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
            <el-button type="primary" size="mini" @click="checkedis_zdyparallelSubmitFun('ruleForm_ParallelEx')">确 定</el-button>
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
        <el-table stripe :data="SelectColumnData2" border size="medium" highlight-current-row>
            <el-table-column label="选择列" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Allis_SelectColumnFun(SelectColumnData2,Allis_SelectColumn2)" v-model="Allis_SelectColumn2" :checked="Allis_SelectColumn2" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox v-else @change="Allis_SelectColumnFun(SelectColumnData2,Allis_SelectColumn2)" v-model="Allis_SelectColumn2" :checked="Allis_SelectColumn2" disabled></el-checkbox>&nbsp;选择列
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-if="disShow==false" disabled></el-checkbox>
                    <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get" v-else @change="every_SelectColumnfun(scope.row.is_get,SelectColumnData2)" disabled></el-checkbox>
                    <!-- <el-checkbox :checked="scope.row.is_get" v-model="scope.row.is_get"></el-checkbox> -->
                </template>
            </el-table-column>

            <el-table-column label="主键定义" align="center">
                <template slot="header" slot-scope="scope">
                    <el-checkbox @change="Alliskey_SelectColumnFun(SelectColumnData2,Alliskey_SelectColumn2)" v-model="Alliskey_SelectColumn2" :checked="Alliskey_SelectColumn2" v-if="disShow==true" disabled></el-checkbox>
                    <el-checkbox v-else @change="Alliskey_SelectColumnFun(SelectColumnData2,Alliskey_SelectColumn2)" v-model="Alliskey_SelectColumn2" :checked="Alliskey_SelectColumn2"></el-checkbox>主键定义
                </template>
                <template slot-scope="scope">
                    <el-checkbox :checked="scope.row.is_primary_key" v-model="scope.row.is_primary_key" v-if="disShow==true" disabled></el-checkbox>
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
                    <el-button size="mini" v-if="disShow==true" disabled>
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-else :disabled="scope.$index===0" @click="moveUp(scope.$index,scope.row,SelectColumnData2)">
                        <i class="el-icon-arrow-up"></i>
                    </el-button>
                    <el-button size="mini" v-if="disShow==true" disabled>
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
import Loading from "../../components/loading";

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
            Allis_SelectColumn2: true,
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
                issql: "",
                EXtable_sql: "",
                db_allnum: "",
                everDay_addnum: "",
                pageExnum: 5
            },
            xstypeadd: {
                delete: "",
                insert: "",
                update: ""
            },
            xstypeadd2: {
                delete: "",
                insert: "",
                update: ""
            },
            xstypeadd2q: {
                insert: ""
            },
            dbid: null,
            agentId: null,
            sourceId: null,
            sourceName: null,
            allData: [],
            callTable: [],
            allDataList: [],
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
            linkloading: false,
            sqlfiltVar: [{
                    value: "当前跑批日",
                    code: "1"
                },
                {
                    value: "后一跑批日",
                    code: "2"
                },
                {
                    value: "前一跑批日",
                    code: "3"
                }
            ],
            xsType: [{
                    value: "全量",
                    code: "1"
                },
                {
                    value: "增量",
                    code: "2"
                }
            ],
            YesNo: [{
                    value: "是",
                    code: "1"
                },
                {
                    value: "否",
                    code: "0"
                }
            ],
            // handleactive: false,
            dialog_xsadd: false,
            dialog_xsall: false,
            dialog_xsadd2: false,
            isLoading: false,
            Xstable_name: "", //卸数方式存放表名
            xsTypeArr: [], //第一个页面卸数增量是存放数据
            xsTypeArr2: [], //第二个页面卸数增量是存放数据
            xsTypeArr2All: [], //第二个页面卸数全量是存放数据
            ParallelExtractionArr2: [], //第二个页面并行抽取保存数据
            callTable2: [],
            callTable3: [],
            zdycallTable: [],
            onclickAll: false,
            alltableact: false,
            Searchzt: false, //是否点击搜索
            firstTableInfo: [], //存储第一页修改数据
            secondTrue: true,
        };
    },
    created() {
        this.dbid =this.$route.query.id;
        this.agentId = this.$route.query.agent_id;
        this.sourceId = this.$route.query.source_id;
        this.sourceName = this.$Base64.decode(this.$route.query.source_name);
        this.edit = this.$route.query.edit;
        // this.getAllTableInfo()

    },
    beforeMount() {},
    mounted() {
        // 获取进入页面的总数据
        this.steps_getInitInfo();
        this.editzdySQLFun();
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
        getAllTableInfo() {
            this.isLoading = true
            let params = {};
            params["colSetId"] = this.dbid;
            addTaskAllFun.getAllTableInfo(params).then(res => {
                this.isLoading = false
                if (res.code == 200) {
                    this.alltableact = true
                }
                let data = res.data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].table_id && data[i].table_id != "") {
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
                    if (data[i].unload_type == "1") {
                        data[i].unload_type = "全量";
                    } else if (data[i].unload_type == "2") {
                        data[i].unload_type = "增量";
                    } else {
                        // data[i].unload_type = "";
                        data[i].unload_type = "全量";
                    }
                    // 
                    if (this.firstTableInfo.length > 0) {
                        for (let j = 0; j < this.firstTableInfo.length; j++) {
                            if (this.firstTableInfo[j].table_name == data[i].table_name) {
                                data[i].selectionState = this.firstTableInfo[j].selectionState
                                data[i].is_parallel = this.firstTableInfo[j].is_parallel
                                data[i].is_md5 = this.firstTableInfo[j].is_md5
                                data[i].unload_type = this.firstTableInfo[j].unload_type
                            }
                        }
                    }

                }
                this.tableData = JSON.parse(JSON.stringify(data));
            });
        },
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
                    if (data[i].unload_type == "1") {
                        data[i].unload_type = "全量";
                    } else if (data[i].unload_type == "2") {
                        data[i].unload_type = "增量";
                    }
                }
                this.ruleForm.sqlExtractData = data ? data : [];
                this.zdycallTable = JSON.parse(JSON.stringify(data));
            });
        },
        //编辑状态获得初始化信息
        steps_getInitInfo() {
            let params = {};
            params["colSetId"] = this.dbid;
            // this.tableloadingInfo='数据加载中...'
            addTaskAllFun.steps_getInitInfo(params).then(res => {
                if (res.data.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                } else {
                    let data = res.data ? res.data : [];
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
                        if (data[i].unload_type == "1") {
                            data[i].unload_type = "全量";
                        } else if (data[i].unload_type == "2") {
                            data[i].unload_type = "增量";
                        } else {
                            data[i].unload_type = "";
                        }
                    }
                    this.tableData = data;
                    this.callTable = JSON.parse(JSON.stringify(data)); //存储之前编辑的数据，不做改动，方便点击下一步保存时对比
                    this.callTable2 = JSON.parse(JSON.stringify(data));
                    this.callTable3 = JSON.parse(JSON.stringify(data));
                    // this.Allis_selectionState = true;
                }
            });
        },
        // 表第一列的全选
        Allis_selectionStateFun(items, e) {
            let change = false;
            if (e == true) {
                change = true
            } else {
                change = false
            }
            let num = this.pagesize * this.currentPage >= items.length ? items.length : this.pagesize * this.currentPage
            if (this.firstTableInfo.length > 0) {
                for (let i = this.pagesize * (this.currentPage - 1); i < num; i++) {
                    for (let j = 0; j < this.firstTableInfo.length; j++) {
                        if (items[i].table_name == this.firstTableInfo[j].table_name) {
                            items[i].selectionState = change
                            this.firstTableInfo.splice(j, 1)
                        }
                    }
                    this.firstTableInfo.push(items[i])

                }
            } else {
                for (let i = this.pagesize * (this.currentPage - 1); i < num; i++) {
                    items[i].selectionState = change
                    this.firstTableInfo.push(items[i])
                }
            }
        },
        // 获取所有表信息
        getAllTableInfoFun() {
            this.onclickAll = true;
            this.Allis_selectionState = false;
            this.tableData.length = 0;
            this.getAllTableInfo()
        },
        // 全表点击单个复选框
        evercheck(row) {
            if (this.firstTableInfo.length > 0) {
                for (let i = 0; i < this.firstTableInfo.length; i++) {
                    if (this.firstTableInfo[i].table_name == row.table_name) {
                        this.firstTableInfo.splice(i, 1)
                    }
                }
                this.firstTableInfo.push(row)
            } else {
                this.firstTableInfo.push(row)
            }
        },
        //选择列
        every_SelectColumnfun(val, alldata) {
            let count = 0;
            if (val == true) {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_get == true) {
                        count++;
                    }
                }
                if (count == alldata.length) {
                    this.Allis_SelectColumn = true;
                } else {
                    this.Allis_SelectColumn = false;
                }
            } else {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_get == false) {
                        if (count < alldata.length) {
                            this.Allis_SelectColumn = false;
                        }
                    }
                }
            }
        },
        //
        every_Selectkeyfun(val, alldata) {
            let count = 0;
            if (val == true) {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_primary_key == true) {
                        count++;
                    }
                }
                if (count == alldata.length) {
                    this.Alliskey_SelectColumn = true;
                } else {
                    this.Alliskey_SelectColumn = false;
                }
            } else {
                for (let i = 0; i < alldata.length; i++) {
                    if (alldata[i].is_primary_key == false) {
                        if (count < alldata.length) {
                            this.Alliskey_SelectColumn = false;
                        }
                    }
                }
            }
        },
        // 搜索
        schfilter(val) {
            if (val != "") {
                let params = {};
                params["colSetId"] = this.dbid;
                params["inputString"] = val;
                this.tableloadingInfo = "数据加载中...";
                addTaskAllFun.getTableInfo(params).then(res => {
                    if (res.data.length > 0) {
                        this.Searchzt = true
                        let data = res.data;
                        for (let i = 0; i < data.length; i++) {
                            if (data[i].table_id && data[i].table_id != "") {
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
                            if (data[i].unload_type == "1") {
                                data[i].unload_type = "全量";
                            } else if (data[i].unload_type == "2") {
                                data[i].unload_type = "增量";
                            } else {
                                data[i].unload_type = "全量";
                            }
                            // 
                            if (this.firstTableInfo.length > 0) {
                                for (let j = 0; j < this.firstTableInfo.length; j++) {
                                    if (this.firstTableInfo[j].table_name == data[i].table_name) {
                                        data[i].selectionState = this.firstTableInfo[j].selectionState
                                        data[i].is_parallel = this.firstTableInfo[j].is_parallel
                                        data[i].is_md5 = this.firstTableInfo[j].is_md5
                                        data[i].unload_type = this.firstTableInfo[j].unload_type
                                    }
                                }
                            }

                        }
                        this.tableData = res.data;
                    } else {
                         this.tableData = [];
                        this.tableloadingInfo = "暂无数据";
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
        backFun() {
            this.$router.push({
                path: "/agentList"
            });
        },
        next() {
            // if (this.handleactive == true) { //切换过第二个页面
            this.$refs["ruleForm"].validate(valid => {
                if (valid) {
                    this.isLoading = true;
                    let tableData = [], //第一个页面所有表
                        sqlExtractData = this.ruleForm.sqlExtractData, //第二个页面所有表
                        rep_table = [], //两张表重复的表
                        isparmi = [], //存第一个页面是增量的表的名字
                        tableidArr1 = {}, //第一个页面单表查询中增量存在的表
                        isparmi2 = [], //第二个页面sql抽取中增量存在的表的名称
                        tableDatalin = [],
                        istrue = []; //存两个页面存在的表，为了判断至少有一张表存在

                    //第一个页面数据整合--start
                    if (this.callTable3.length > 0) {
                        if (this.firstTableInfo.length > 0) {
                            for (let j = 0; j < this.firstTableInfo.length; j++) {
                                for (let i = 0; i < this.callTable3.length; i++) {
                                    if (this.firstTableInfo[j].table_name == this.callTable3[i].table_name) {
                                        this.callTable3.splice(i, 1);
                                        i--;
                                    }
                                }
                            }
                            tableDatalin = this.callTable3.concat(this.firstTableInfo)
                            for (let i = 0; i <tableDatalin.length; i++) {
                                if (tableDatalin[i].selectionState == true) {
                                    tableData.push(tableDatalin[i])
                                }
                            }
                        } else {
                            for (let i = 0; i < this.callTable3.length; i++) {
                                if (this.callTable3[i].selectionState == true) {
                                    tableData.push(this.callTable3[i])
                                }
                            }
                        }
                    } else {
                        if (this.firstTableInfo.length > 0) {
                            for (let i = 0; i < this.firstTableInfo.length; i++) {
                                if (this.firstTableInfo[i].selectionState == true) {
                                    tableData.push(this.firstTableInfo[i])
                                }
                            }
                        }
                    }
                    //第一个页面数据整合--end
                    // 判断第二个页面表重复的
                    if (sqlExtractData.length > 0) {
                        let reparr2 = []
                        for (let j = 0; j < sqlExtractData.length; j++) {
                            reparr2.push(sqlExtractData[j].table_name);
                        }
                        if (reparr2.length > 0) {
                            let s = reparr2.join(",") + ",",
                                rep_table2 = [];
                            for (var i = 0; i < reparr2.length; i++) {
                                if (s.replace(reparr2[i] + ",", "").indexOf(reparr2[i] + ",") > -1) {
                                    rep_table2.push(reparr2[i]);
                                }
                            }
                            if (rep_table2.length > 0) {
                                this.secondTrue = false
                                this.isLoading = false;
                                this.$message({
                                    showClose: true,
                                    message: "sql抽取数据中存在表" + rep_table2 + "重复,请修改",
                                    type: "error"
                                });
                                this.activeName = "second";
                            } else {
                                for (let j = 0; j < sqlExtractData.length; j++) {
                                    if (sqlExtractData[j].unload_type == "增量") {
                                        isparmi2.push(sqlExtractData[j].table_name);
                                    }
                                    istrue.push(sqlExtractData[j].table_name);
                                }
                            }

                        }
                    }
                    // 
                    if (this.secondTrue == true) {
                        //判断两个页面数据有无重复数据
                        if (tableData.length > 0) {
                            for (let i = 0; i < tableData.length; i++) {
                                if (
                                    tableData[i].selectionState == true && tableData[i].unload_type == "增量"
                                ) {
                                    isparmi.push(tableData[i].table_name); //第一个页面存勾选并且是增量的表
                                    if (tableData[i].table_id && tableData[i].table_id != "") {
                                        tableidArr1[tableData[i].table_name] = tableData[i].table_id; //存上次编辑表
                                    }
                                }
                                if (tableData[i].selectionState == true) {
                                    istrue.push(tableData[i].table_name); //仅存勾选的表--第一个页面
                                }
                                for (let j = 0; j < sqlExtractData.length; j++) {
                                    if (
                                        tableData[i].table_name == sqlExtractData[j].table_name &&
                                        tableData[i].selectionState == true
                                    ) {
                                        rep_table.push(tableData[i].table_name); //
                                    }
                                }
                            }
                        }
                        if (istrue.length == 0) {
                            //判断第二步整体有没有表存在
                            this.isLoading = false;
                            this.$message({
                                showClose: true,
                                message: "至少选择一张表",
                                type: "error"
                            });
                        } else {
                            //checkTablePrimary
                            if (rep_table.length > 0) {
                                //有重复表
                                this.isLoading = false;
                                this.$message({
                                    showClose: true,
                                    message: "单表查询和sql抽取数据中存在表" + rep_table + "重复,请修改",
                                    type: "error"
                                });
                            } else {
                                //没有重复表
                                if (isparmi.length > 0) {
                                    //第一个页面卸数方式是增量存在的
                                    let params1 = {};
                                    params1["tableNames"] = isparmi; //勾选表并且卸数方式是增量
                                    params1["colSetId"] =this.dbid;
                                    params1["tableIds"] =
                                        JSON.stringify(tableidArr1) === "{}" ?
                                        "" :
                                        JSON.stringify(tableidArr1);
                                    addTaskAllFun.checkTablePrimary(params1).then(res => {
                                        let arrdata = res.data;
                                        if (this.SelectColumn.length > 0) {
                                            if (arrdata.length > 0) {
                                                for (let key in arrdata) {
                                                    for (let j = 0; j < this.SelectColumn.length; j++) {
                                                        if (key == this.SelectColumn[j].tablename) {
                                                            //判断手动保存的列当时是true或者false,true则删除
                                                            if (this.SelectColumn[j].hasprimaryKey == true) {
                                                                delete arrdata[key];
                                                            }
                                                        }
                                                    }
                                                }
                                            }

                                            // arrdata删除本次设置了主键的剩余的做判断
                                            if (arrdata.length > 0) {
                                                let arr = [];
                                                for (let key in arrdata) {
                                                    if (arrdata[key] == false) {
                                                        arr.push(key);
                                                    }
                                                }
                                                if (arr.length > 0) {
                                                    //存在未设置主键
                                                    this.isLoading = false;
                                                    this.$message({
                                                        showClose: true,
                                                        message: "单表查询中表" + arr + "未设置主键",
                                                        type: "error"
                                                    });
                                                } else {
                                                    //不存在继续下面方法
                                                    this.saveTableConfFun(tableData); //处理第一个页面数据
                                                }
                                            } else {
                                                this.saveTableConfFun(tableData);
                                            }
                                        } else {
                                            //手动没有保存的选择列信息，只需要判断从接口获取的原本的
                                            let arr = [];
                                            for (let key in arrdata) {
                                                if (arrdata[key] == false) {
                                                    arr.push(key);
                                                }
                                            }
                                            if (arr.length > 0) {
                                                //存在未设置主键的表
                                                this.isLoading = false;
                                                this.$message({
                                                    showClose: true,
                                                    message: "单表查询中表" + arr + "未设置主键",
                                                    type: "error"
                                                });
                                            } else {
                                                //不存在未设置主键的表则继续下面整合数据方法
                                                this.saveTableConfFun(tableData); //处理第一个页面数据
                                            }
                                        }
                                    });
                                } else {
                                    //第一个页面无增量的卸数存在直接进整理数据方法
                                    this.saveTableConfFun(tableData); //处理第一个页面数据
                                }
                                // 第二个页面
                                this.sqlFun();
                            }
                        }
                    }

                } else {
                    this.activeName = "second";
                }
            });
        },
        sqlFun() {
            // console.log(this.ruleForm.sqlExtractData, '第二个页面数据')
            // console.log(this.xsTypeArr2, '第二个页面卸数增量是存放数据', this.xsTypeArr2All, '第二个页面卸数增量是存放数据')
            // console.log(this.ParallelExtractionArr2, '第二个页面并行抽取保存数据')
            // console.log(this.zdycallTable, '编辑时原本的数据')
            // console.log(this.SelectColumn2, '第二个页面选择列保存数据')
            let delold = [],
                twotabledata = JSON.parse(JSON.stringify(this.ruleForm.sqlExtractData)),
                twotabledata2 = JSON.parse(
                    JSON.stringify(this.ruleForm.sqlExtractData)
                );
            if (twotabledata.length > 0) {
                if (this.zdycallTable.length > 0) {
                    for (let i = 0; i < twotabledata.length; i++) {
                        for (let j = 0; j < this.zdycallTable.length; j++) {
                            if (
                                twotabledata[i].table_name == this.zdycallTable[j].table_name
                            ) {
                                if (
                                    twotabledata[i].unload_type == this.zdycallTable[j].unload_type
                                ) {
                                    twotabledata[i].sql = this.zdycallTable[j].sql;
                                }
                            }
                        }
                    }
                }
                for (let i = 0; i < twotabledata.length; i++) {
                    if (twotabledata[i].unload_type == "增量") {
                        for (let j = 0; j < this.xsTypeArr2.length; j++) {
                            if (
                                (twotabledata[i].table_name == this.xsTypeArr2[j].table_name)
                            ) {
                                twotabledata[i].sql = this.xsTypeArr2[j].sql;
                            }
                        }
                    } else {
                        for (let j = 0; j < this.xsTypeArr2All.length; j++) {
                            if (
                                (twotabledata[i].table_name == this.xsTypeArr2All[j].table_name)
                            ) {
                                twotabledata[i].sql = this.xsTypeArr2All[j].sql;
                            }
                        }
                    }
                }
                for (let i = 0; i < twotabledata.length; i++) {
                    if (twotabledata[i].unload_type == "增量") {
                        twotabledata[i].unload_type = "2";
                    } else {
                        twotabledata[i].unload_type = "1";
                    }
                    if (twotabledata[i].is_md5 == false) {
                        twotabledata[i].is_md5 = "0";
                    } else {
                        twotabledata[i].is_md5 = "1";
                    }
                    if (twotabledata[i].is_parallel == false) {
                        twotabledata[i].is_parallel = "0";
                    } else {
                        twotabledata[i].is_parallel = "1";
                    }
                    for (let j = 0; j < this.ParallelExtractionArr2.length; j++) {
                        if (twotabledata[i].is_parallel == '1' && twotabledata[i].table_name == this.ParallelExtractionArr2[j].tablename) {
                            twotabledata[i].dataincrement = parseInt(
                                this.ParallelExtractionArr2[j].dataincrement
                            );
                            twotabledata[i].pageparallels =
                                this.ParallelExtractionArr2[j].pageparallels != "" ?
                                parseInt(this.ParallelExtractionArr2[j].pageparallels) :
                                0;
                            twotabledata[i].table_count =
                                this.ParallelExtractionArr2[j].table_count + "";
                            twotabledata[i].rec_num_date = this.ParallelExtractionArr2[
                                j
                            ].rec_num_date;
                        }
                    }
                }
                let tableColumn = {};
                if (this.SelectColumn2.length > 0) {
                    for (let j = 0; j < twotabledata2.length; j++) {
                        for (let n = 0; n < this.SelectColumn2.length; n++) {
                            if (
                                twotabledata2[j].table_name == this.SelectColumn2[n].tablename
                            ) {
                                twotabledata2[j].data = this.SelectColumn2[n].data;
                            }
                        }
                    }
                    let twotabledata22 = JSON.parse(JSON.stringify(twotabledata2));
                    for (let m = 0; m < twotabledata22.length; m++) {
                        if (twotabledata22[m].data) {
                            for (let i = 0; i < twotabledata22[m].data.length; i++) {
                                for (let key in twotabledata22[m].data[i]) {
                                    twotabledata22[m].data[i].tc_remark = i + 1 + "";
                                    if (key == "is_get") {
                                        if (twotabledata22[m].data[i][key] == true) {
                                            twotabledata22[m].data[i][key] = "1";
                                        } else if (twotabledata22[i][key] == false) {
                                            twotabledata22[m].data[i][key] = "0";
                                        }
                                    }
                                    if (key == "column_ch_name") {
                                        if (twotabledata22[m].data[i][key] == "") {
                                            twotabledata22[m].data[i][key] =
                                                twotabledata22[m].data[i].column_name;
                                        }
                                    }
                                    if (key == "is_primary_key") {
                                        if (twotabledata22[m].data[i][key] == true) {
                                            twotabledata22[m].data[i][key] = "1";
                                        } else if (twotabledata22[m].data[i][key] == false) {
                                            twotabledata22[m].data[i][key] = "0";
                                        }
                                    }
                                }
                            }
                        }
                        tableColumn[twotabledata22[m].table_name] = twotabledata22[m].data;
                    }
                }
                let params1 = {};
                params1["tableInfoArray"] =
                    twotabledata.length > 0 ? JSON.stringify(twotabledata) : "";
                params1["colSetId"] =this.dbid;
                params1["tableColumn"] =
                    JSON.stringify(tableColumn) === "{}" ?
                    "" :
                    JSON.stringify(tableColumn);
                addTaskAllFun.saveAllSQL(params1).then(res => {
                    if (res.code == "200") {
                        this.activeSec = true;
                    } else {
                        this.isLoading = false;
                    }
                });
            } else {
                this.activeSec = true;
            }
        },
        nextlinkFun() {
            this.isLoading = false;
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
                    agent_id: this.agentId,
                    source_name: this.$Base64.encode(this.sourceName)
                };
            }
            this.$router.push({
                path: "/collection1_3",
                query: data
            });
        },
        // 处理第一个页面数据
        saveTableConfFun(tableData) {
            // console.log(tableData, '第一个页面数据')
            // console.log(this.SelectColumn, '第一个页面选择列点击过保存的值')
            // console.log(this.sqlFiltArr, '第一个页面sql过滤点击过保存的值')
            // console.log(this.ParallelExtractionArr, '第一个页面并行抽取数据')
            // console.log(this.xsTypeArr, '第一个页面卸数增量是存放数据')
            let arrData = [],
                delJson = [],
                tableInfoString = [],
                params = {};
            params["colSetId"] = this.dbid;
            addTaskAllFun.getSQLInfoByColSetId(params).then(res => {
                // 遍历拿到所有勾选的数据
                for (let i = 0; i < tableData.length; i++) {
                    if (tableData[i].selectionState == true) {
                        arrData.push(tableData[i]);
                    }
                }
                //对比要删除的数据
                for (let j = 0; j < this.callTable.length; j++) {
                    for (let i = 0; i < arrData.length; i++) {
                        if (this.callTable[j].table_name == arrData[i].table_name) {
                            this.callTable.splice(j, 1);
                            j--;
                            break;
                        }
                    }
                }
                for (let j = 0; j < this.callTable.length; j++) {
                    delJson.push({
                        tableId: this.callTable[j].table_id //存储删除的表id
                    });
                }
                if (this.ParallelExtractionArr.length > 0) {
                    //本次并行抽取数据与表对比，有相同表名的，将本次新的数据赋值
                    for (let j = 0; j < arrData.length; j++) {
                        for (let jj = 0; jj < this.ParallelExtractionArr.length; jj++) {
                            if (
                                arrData[j].unload_type == '全量' && arrData[j].is_parallel == true && arrData[j].table_name == this.ParallelExtractionArr[jj].tablename
                            ) {
                                arrData[j].is_customize_sql = this.ParallelExtractionArr[
                                    jj
                                ].is_customize_sql;
                                if (this.ParallelExtractionArr[jj].page_sql) {
                                    arrData[j].page_sql = this.ParallelExtractionArr[jj].page_sql;
                                }
                                if (this.ParallelExtractionArr[jj].rec_num_date) {
                                    arrData[j].rec_num_date = this.ParallelExtractionArr[
                                        jj
                                    ].rec_num_date;
                                }
                                if (this.ParallelExtractionArr[jj].pageparallels) {
                                    arrData[j].pageparallels = this.ParallelExtractionArr[jj].pageparallels;
                                }
                                if (this.ParallelExtractionArr[jj].dataincrement) {
                                    arrData[j].dataincrement = this.ParallelExtractionArr[jj].dataincrement;
                                }
                                if (this.ParallelExtractionArr[jj].table_count) {
                                    arrData[j].table_count = this.ParallelExtractionArr[jj].table_count;
                                }
                            }
                        }
                    }
                }
                if (this.sqlFiltArr.length > 0) {
                    //本次sql过滤数据与表对比，有相同表名的，将本次新的数据赋值
                    for (let j = 0; j < arrData.length; j++) {
                        for (let jj = 0; jj < this.sqlFiltArr.length; jj++) {
                            if (
                                arrData[j].table_name == this.sqlFiltArr[jj].tablename &&
                                arrData[j].unload_type == "全量"
                            ) {
                                if (this.sqlFiltArr[jj].sql) {
                                    arrData[j].sql = this.sqlFiltArr[jj].sql;
                                }
                            }
                        }
                    }
                }
                //   xsTypeArr
                if (this.xsTypeArr.length > 0) {
                    //本次sql过滤数据与表对比，有相同表名的，将本次新的数据赋值
                    for (let j = 0; j < arrData.length; j++) {
                        for (let jj = 0; jj < this.xsTypeArr.length; jj++) {
                            if (
                                arrData[j].table_name == this.xsTypeArr[jj].table_name &&
                                arrData[j].unload_type == "增量"
                            ) {
                                if (this.xsTypeArr[jj].sql) {
                                    arrData[j].sql = JSON.stringify(this.xsTypeArr[jj].sql);
                                }
                            }
                        }
                    }
                }
                for (let k = 0; k < arrData.length; k++) {
                    if (arrData[k].unload_type == "增量") {
                        tableInfoString.push({
                            database_id: this.dbid,
                            table_id: (arrData[k].table_id&&arrData[k].table_id!=undefined)?arrData[k].table_id: "",
                            is_parallel: "0",
                            is_md5: arrData[k].is_md5 == true ? "1" : "0",
                            table_ch_name: arrData[k].table_ch_name,
                            table_name: arrData[k].table_name,
                            sql: arrData[k].sql ? arrData[k].sql : "",
                            unload_type: "2"
                        });
                    } else {
                        if (arrData[k].is_parallel == true) {
                            if (arrData[k].is_customize_sql == "1") {
                                tableInfoString.push({
                                    database_id: this.dbid,
                                    table_id:(arrData[k].table_id&&arrData[k].table_id!=undefined)?arrData[k].table_id: "",
                                    is_parallel: "1",
                                    unload_type: "1",
                                    is_customize_sql: "1",
                                    is_md5: arrData[k].is_md5 == true ? "1" : "0",
                                    table_ch_name: arrData[k].table_ch_name,
                                    table_name: arrData[k].table_name,
                                    page_sql: arrData[k].page_sql ? arrData[k].page_sql : "",
                                    sql: arrData[k].sql ? arrData[k].sql : ""
                                });
                            } else {
                                tableInfoString.push({
                                    database_id: this.dbid,
                                    unload_type: "1",
                                    table_id: (arrData[k].table_id&&arrData[k].table_id!=undefined)?arrData[k].table_id: "",
                                    is_parallel: "1",
                                    is_customize_sql: "0",
                                    is_md5: arrData[k].is_md5 == true ? "1" : "0",
                                    table_ch_name: arrData[k].table_ch_name,
                                    table_name: arrData[k].table_name,
                                    sql: arrData[k].sql ? arrData[k].sql : "",
                                    pageparallels: arrData[k].pageparallels ?
                                        parseInt(arrData[k].pageparallels) : 0,
                                    dataincrement: arrData[k].dataincrement ?
                                        parseInt(arrData[k].dataincrement) : 0,
                                    table_count: arrData[k].table_count ?
                                        "" + arrData[k].table_count : "",
                                    rec_num_date: arrData[k].rec_num_date ?
                                        arrData[k].rec_num_date : ""
                                });
                            }
                        } else {
                            tableInfoString.push({
                                database_id: this.dbid,
                                unload_type: "1",
                                table_id:(arrData[k].table_id&&arrData[k].table_id!=undefined)?arrData[k].table_id: "",
                                is_parallel: "0",
                                is_md5: arrData[k].is_md5 == true ? "1" : "0",
                                table_ch_name: arrData[k].table_ch_name,
                                table_name: arrData[k].table_name,
                                sql: arrData[k].sql ? arrData[k].sql : ""
                            });
                        }
                    }
                }
                this.tablein = tableInfoString;
                this.saveTableInfofun(arrData, delJson);
            });
        },
        saveTableInfofun(arrData, delJson) {
            let collTbConfParamString = [],
                params = {},
                params2 = {},
                arrData1 = JSON.parse(JSON.stringify(arrData));
            params["colSetId"] = this.dbid;
            addTaskAllFun.getColumnInfoByColSetId(params).then(res => {
                let colData = res.data ? res.data : [];
                // if (colData.length > 0) {
                for (let i = 0; i < arrData1.length; i++) {
                    if (arrData1[i].selectionState == true) {
                        for (let key in colData) {
                            if (arrData1[i].table_name == key) {
                                arrData1[i].data = colData[key];
                                arrData1[i].edit = "1";
                            }
                        }
                    }
                }
                // }
                if (this.SelectColumn.length > 0) {
                    for (let j = 0; j < arrData1.length; j++) {
                        for (let n = 0; n < this.SelectColumn.length; n++) {
                            if (arrData1[j].table_name == this.SelectColumn[n].tablename) {
                                arrData1[j].data = this.SelectColumn[n].data;
                            }
                        }
                    }
                }
                let arrData11 = JSON.parse(JSON.stringify(arrData1));
                for (let m = 0; m < arrData11.length; m++) {
                    if (arrData11[m].data) {
                        for (let i = 0; i < arrData11[m].data.length; i++) {
                            for (let key in arrData11[m].data[i]) {
                                arrData11[m].data[i].tc_remark = i + 1 + "";
                                if (key == "is_get") {
                                    if (arrData11[m].data[i][key] == true) {
                                        arrData11[m].data[i][key] = "1";
                                    } else if (arrData11[m].data[i][key] == false) {
                                        arrData11[m].data[i][key] = "0";
                                    }
                                }
                                if (key == "column_ch_name") {
                                    if (arrData11[m].data[i][key] == "") {
                                        arrData11[m].data[i][key] = arrData1[m].data[i].column_name;
                                    }
                                }
                                if (key == "is_primary_key") {
                                    if (arrData11[m].data[i][key] == true) {
                                        arrData11[m].data[i][key] = "1";
                                    } else if (arrData11[m].data[i][key] == false) {
                                        arrData11[m].data[i][key] = "0";
                                    }
                                }
                            }
                        }
                    }
                    collTbConfParamString.push({
                        collColumnString: arrData11[m].data ?
                            JSON.stringify(arrData11[m].data) : ""
                    });
                }
                let collstring = collTbConfParamString;
                params2["colSetId"] =this.dbid;
                params2["tableInfoString"] = JSON.stringify(this.tablein);
                params2["collTbConfParamString"] = JSON.stringify(collstring);
                params2["delTbString"] =
                    delJson.length > 0 ? JSON.stringify(delJson) : "";
                addTaskAllFun.saveCollTbInfo(params2).then(res => {
                    if (res && res.code == 200) {
                        this.activeFirst = true;
                        this.dbid = res.data;
                    } else {
                        this.isLoading = false;
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
                    agent_id: this.agentId,
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
                if (res.data.length != 0 && res.data[0].unload_type == "1") {
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
                    sql: this.sqlFiltSetData_SQL
                    // sqlFiltvar:this.sqlFiltSetData_var
                });
            }
            this.tablename = "";
        },
        // 第一个页面过滤关闭
        SqlfiltCloseFun() {
            this.tablename = "";
        },
        //第二个页面 自定义是否抽取sql
        checkedis_zdyparallelFun(row) {
            let a = row.is_parallel;
            this.EXtable_name = row.table_name;
            this.is_parallel = a;
            this.dialogdyfysql = true;
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
                            if (this.ParallelExtractionArr2[i].is_customize_sql == "1") {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr2[
                                    i
                                ].is_customize_sql;
                                this.ruleForm_ParallelEx.EXtable_sql = this.ParallelExtractionArr2[
                                    i
                                ].page_sql;
                            } else {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr2[
                                    i
                                ].is_customize_sql;
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
        checkedis_zdyparallelSubmitFun(form) {
            this.$refs[form].validate(valid => {
                if (valid) {
                    if (this.ParallelExtractionArr2.length != 0) {
                        for (let i = 0; i < this.ParallelExtractionArr2.length; i++) {
                            if (
                                this.ParallelExtractionArr2[i].tablename == this.EXtable_name
                            ) {
                                this.ParallelExtractionArr2.splice(i, 1);
                                i--;
                            }
                        }
                        this.ParallelExtractionArr2.push({
                            tablename: this.EXtable_name,
                            table_count: this.ruleForm_ParallelEx.db_allnum,
                            pageparallels: this.ruleForm_ParallelEx.pageExnum,
                            dataincrement: this.ruleForm_ParallelEx.everDay_addnum,
                            rec_num_date: this.ruleForm_ParallelEx.rec_num_date
                        });
                    } else {
                        this.ParallelExtractionArr2.push({
                            tablename: this.EXtable_name,
                            table_count: this.ruleForm_ParallelEx.db_allnum,
                            pageparallels: this.ruleForm_ParallelEx.pageExnum,
                            dataincrement: this.ruleForm_ParallelEx.everDay_addnum,
                            rec_num_date: this.ruleForm_ParallelEx.rec_num_date
                        });
                    }
                    for (let j = 0; j < this.ruleForm.sqlExtractData.length; j++) {
                        if (
                            this.ruleForm.sqlExtractData[j].table_name == this.EXtable_name
                        ) {
                            this.ruleForm.sqlExtractData[j].is_parallel = true;
                            this.EXtable_name = "";
                        }
                    }
                    this.dialogdyfysql = false;
                }
            });
        },

        //第一个页面 是否抽取sql弹框
        checkedis_parallelFun(row) {
            if (this.firstTableInfo.length > 0) {
                for (let i = 0; i < this.firstTableInfo.length; i++) {
                    if (this.firstTableInfo[i].table_name == row.table_name) {
                        this.firstTableInfo.splice(i, 1)
                    }
                }
                this.firstTableInfo.push(row)
            } else {
                this.firstTableInfo.push(row)
            }
            let a = JSON.parse(JSON.stringify(row.is_parallel));
            this.dialogTableVisible = true;
            this.EXtable_name = row.table_name;
            this.is_parallel = a;
            this.ruleForm_ParallelEx.issql = "";
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
                            if (this.ParallelExtractionArr[i].is_customize_sql == "1") {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr[
                                    i
                                ].is_customize_sql;
                                this.ruleForm_ParallelEx.EXtable_sql = this.ParallelExtractionArr[
                                    i
                                ].page_sql;
                            } else {
                                this.ruleForm_ParallelEx.issql = this.ParallelExtractionArr[
                                    i
                                ].is_customize_sql;
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
                if (res.data) {
                    if (res.data[0].is_customize_sql == "1") {
                        this.ruleForm_ParallelEx.issql = res.data[0].is_customize_sql; //是否
                        this.ruleForm_ParallelEx.EXtable_sql = res.data[0].page_sql; //自定义sql
                    } else {
                        this.ruleForm_ParallelEx.issql = res.data[0].is_customize_sql; //是否
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
                // this.testDialogVisible = true;
                this.linkloading = true
            }
            this.ParallelExtractionLink = false;
            if (this.ruleForm_ParallelEx.EXtable_sql == undefined) {
                this.linkloading = false
                this.$message({
                    showClose: true,
                    message: "sql为空",
                    type: "error"
                });
            } else {
                if (this.ruleForm_ParallelEx.EXtable_sql != '') {
                    let params = {};
                    params["colSetId"] = this.dbid;
                    params["pageSql"] = this.ruleForm_ParallelEx.EXtable_sql;
                    addTaskAllFun.testParallelExtraction(params).then(res => {
                        this.linkloading = false
                        if (res.success == true) {
                            this.$Msg.customizTitle('测试成功');
                            this.ParallelExtractionLink = "true";
                            // this.testLinkReturn = res.message;
                            if (n == "submit") {
                                this.subExFun();
                            }
                        } else {
                            // this.testLinkReturn = res.message;
                            if (n == "submit") {
                                this.subExFun();
                            }
                        }
                    });
                } else {
                    this.linkloading = false
                    this.$message({
                        showClose: true,
                        message: "sql为空",
                        type: "error"
                    });
                }

            }
        },
        // 获取数据总量
        getTableDataCountFun() {
            let params = {};
            params["tableName"] = this.EXtable_name;
            params["colSetId"] =this.dbid;
            addTaskAllFun.getTableDataCount(params).then(res => {
                var nowDate = new Date();
                let date = {
                    year: nowDate.getFullYear(),
                    month: nowDate.getMonth() + 1,
                    date: nowDate.getDate()
                };
                this.ruleForm_ParallelEx.db_allnum = res.data;
                this.ruleForm_ParallelEx.rec_num_date =
                    date.year +
                    (date.month < 9 ? "0" + date.month : date.month) +
                    (date.date < 9 ? "0" + date.date : date.date);
            });
        },
        // 是否抽取sql弹框确定提交
        testParallelExtractionSubmitFun(formName) {
            let that = this;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let tablename = this.EXtable_name;
                    if (that.ruleForm_ParallelEx.issql == "1") {
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
                                        page_sql: this.ruleForm_ParallelEx.EXtable_sql
                                    });
                                } else {
                                    this.ParallelExtractionArr.push({
                                        tablename: tablename,
                                        is_customize_sql: this.ruleForm_ParallelEx.issql,
                                        page_sql: this.ruleForm_ParallelEx.EXtable_sql
                                    });
                                }
                                this.dialogTableVisible = false;
                            }
                        });
                    } else if (that.ruleForm_ParallelEx.issql == "0") {
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
                        this.dialogTableVisible = false;
                    }
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
            if (this.firstTableInfo.length > 0) {
                for (let i = 0; i < this.firstTableInfo.length; i++) {
                    if (this.firstTableInfo[i].table_name == row.table_name) {
                        this.firstTableInfo.splice(i, 1)
                    }
                }
                this.firstTableInfo.push(row)
            } else {
                this.firstTableInfo.push(row)
            }
        },
        // 是否抽取sql弹框关闭
        testParallelExtractionCloseFun() {
            for (let j = 0; j < this.tableData.length; j++) {
                if (this.tableData[j].table_name == this.EXtable_name) {
                    this.tableData[j].is_parallel = false;
                }
            }
            this.dialogTableVisible = false;
        },
        // 第二
        testParallelExtractionCloseFun2() {
            for (let j = 0; j < this.ruleForm.sqlExtractData.length; j++) {
                if (this.ruleForm.sqlExtractData[j].table_name == this.EXtable_name) {
                    this.ruleForm.sqlExtractData[j].is_parallel = false;
                    this.dialogdyfysql = false;
                    this.EXtable_name = "";
                }
            }
        },
        //第一页 选择列
        selectCol(value, row) {
            this.dialogSelectColumn = true;
            this.tablename = row.table_name;
            this.unloadType = row.unload_type;
            this.tableloadingInfo = "数据加载中...";
            // this.disShow = false
            if (this.SelectColumn.length != 0) {
                let arrid = [];
                for (let i = 0; i < this.SelectColumn.length; i++) {
                    arrid.push(this.SelectColumn[i].tablename);
                }
                if (arrid.indexOf(this.tablename) != -1) {
                    arrid.length = 0;
                    this.disShow = (row.collectState == false) ? true : false;
                    for (let i = 0; i < this.SelectColumn.length; i++) {
                        if (this.SelectColumn[i].tablename == this.tablename) {
                            this.SelectColumnData = this.SelectColumn[i].data;
                        }
                    }
                } else {
                    arrid.length = 0;
                    this.SelectColumnShowFun(
                        row.table_name,
                        row.table_id,
                        row.collectState
                    );
                }
            } else {
                this.SelectColumnShowFun(
                    row.table_name,
                    row.table_id,
                    row.collectState
                );
            }
        },
        //第二个  选择列
        selectCol2(value, row) {
            this.dialogSelectColumn2 = true;
            this.tablename = row.table_name;
            this.unloadType = row.unload_type;
            this.tableloadingInfo = "数据加载中...";
            // this.disShow = false
            if (this.SelectColumn2.length != 0) {
                let arrid = [];
                for (let i = 0; i < this.SelectColumn2.length; i++) {
                    arrid.push(this.SelectColumn2[i].tablename);
                }
                if (arrid.indexOf(this.tablename) != -1) {
                    arrid.length = 0;
                    this.disShow = row.collectState == false ? true : false;
                    for (let i = 0; i < this.SelectColumn2.length; i++) {
                        if (this.SelectColumn2[i].tablename == this.tablename) {
                            this.SelectColumnData2 = this.SelectColumn2[i].data;
                        }
                    }
                } else {
                    arrid.length = 0;
                    this.SelectColumnShowFun2(row);
                }
            } else {
                this.SelectColumnShowFun2(row);
            }
        },
        //第一页 选择列弹框回显数据调接口
        SelectColumnShowFun(name, id, collectState) {
            let params = {};
            params["colSetId"] = this.dbid;
            params["tableName"] = name;
            params["tableId"] = id ? id : "";
            addTaskAllFun.getColumnsigleInfo(params).then(res => {
                if (res.data.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                } else {
                    this.coltable_name = "";
                    this.coltable_name = res.data.tableName ? res.data.tableName : "";
                    this.disShow = (collectState == false) ? true : false;
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
                            if (
                                data[i].is_primary_key == "true" ||
                                data[i].is_primary_key == "1"
                            ) {
                                num++;
                                data[i].is_primary_key = true;
                            } else {
                                data[i].is_primary_key = false;
                            }
                        } else {
                            data[i].is_primary_key = false;
                        }
                        if (data[i].column_ch_name == "") {
                            data[i].column_ch_name = data[i].column_name;
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
        SelectColumnShowFun2(row) {
            this.coltable_name = "";
            this.coltable_name = row.table_name;
            let arrdata = [],
                sql = "";
            if (row.unload_type == "增量") {
                for (let i = 0; i < this.xsTypeArr2.length; i++) {
                    arrdata.push(this.xsTypeArr2[i].table_name);
                }
            } else {
                for (let i = 0; i < this.xsTypeArr2All.length; i++) {
                    arrdata.push(this.xsTypeArr2All[i].table_name);
                }
            }
            if (row.table_id && row.table_id != "") {
                if (arrdata.indexOf(row.table_name) == -1) {
                    for (let i = 0; i < this.zdycallTable.length; i++) {
                        if (this.zdycallTable[i].table_name == row.table_name) {
                            if (this.zdycallTable[i].unload_type == row.unload_type) {
                                sql = row.sql;
                                this.getSqlColumnDataFun(row, sql);
                                //   break
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: "请先为此表设置卸数方式sql语句",
                                    type: "error"
                                });
                            }
                        }
                    }
                } else {
                    let sql = "";
                    if (row.unload_type == "增量") {
                        for (let i = 0; i < this.xsTypeArr2.length; i++) {
                            if (this.xsTypeArr2[i].table_name == row.table_name) {
                                sql = this.xsTypeArr2[i].sql;
                                // break;
                            }
                        }
                    } else {
                        for (let i = 0; i < this.xsTypeArr2All.length; i++) {
                            if (this.xsTypeArr2All[i].table_name == row.table_name) {
                                sql = this.xsTypeArr2All[i].sql;
                                // break;
                            }
                        }
                    }

                    this.getSqlColumnDataFun(row, sql);
                }
            } else {
                if (arrdata.indexOf(row.table_name) == -1) {
                    this.$message({
                        showClose: true,
                        message: "请先为此表设置卸数方式sql语句",
                        type: "error"
                    });
                } else {
                    let sql = "";
                    if (row.unload_type == "增量") {
                        for (let i = 0; i < this.xsTypeArr2.length; i++) {
                            if (this.xsTypeArr2[i].table_name == row.table_name) {
                                sql = this.xsTypeArr2[i].sql;
                                // break;
                            }
                        }
                    } else {
                        for (let i = 0; i < this.xsTypeArr2All.length; i++) {
                            if (this.xsTypeArr2All[i].table_name == row.table_name) {
                                sql = this.xsTypeArr2All[i].sql;
                                // break;
                            }
                        }
                    }
                    this.getSqlColumnDataFun(row, sql);
                }
            }
        },
        // 第二页选择列调接口显示数据
        getSqlColumnDataFun(row, sql) {
            let params = {};
            params["colSetId"] = this.dbid;
            params["unloadType"] = this.xsTypeCode(row.unload_type);
            params["sql"] = sql;
            params["tableId"] = row.table_id?row.table_id : "";
            params['tableName']=row.table_name
            addTaskAllFun.getSqlColumnData(params).then(res => {
                if (res.data.length == 0) {
                    this.tableloadingInfo = "暂无数据";
                } else {
                    this.disShow = row.collectState == false ? true : false;
                    let data = res.data ? res.data : [],
                        count = 0,
                        num = 0;
                    for (let i = 0; i < data.length; i++) {
                        data[i].is_get = true;
                        if (data[i].is_primary_key) {
                            if (
                                data[i].is_primary_key == "true" ||
                                data[i].is_primary_key == "1"
                            ) {
                                num++;
                                data[i].is_primary_key = true;
                            } else {
                                data[i].is_primary_key = false;
                            }
                        } else {
                            data[i].is_primary_key = false;
                        }
                        if (data[i].column_ch_name == "") {
                            data[i].column_ch_name = data[i].column_name;
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
        //根据卸数方式返回code值
        xsTypeCode(unloadType) {
            for (let i = 0; i < this.xsType.length; i++) {
                if (this.xsType[i].value == unloadType) {
                    return this.xsType[i].code;
                }
            }
        },
        //第一页 选择列弹框确认
        SelectColumnSubmitFun() {
            let arrData = this.SelectColumnData,
                hasprimaryKey = false;
            if (this.unloadType == "增量") {
                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].is_primary_key == true) {
                        hasprimaryKey = true;
                        break;
                    }
                }
            } else if (this.unloadType == "全量") {
                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].is_primary_key == true) {
                        hasprimaryKey = true;
                        break;
                    }
                }
            }
            if (this.unloadType == "增量") {
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
                            unloadType: "增量",
                            hasprimaryKey: true
                        });
                    } else {
                        this.SelectColumn.push({
                            tablename: this.tablename,
                            data: this.SelectColumnData,
                            unloadType: "增量",
                            hasprimaryKey: true
                        });
                    }
                    this.dialogSelectColumn = false;
                    this.tablename = "";
                } else {
                    this.$message({
                        showClose: true,
                        message: "请选择至少一个主键",
                        type: "error"
                    });
                }
            } else if (this.unloadType == "全量") {
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
                            unloadType: "全量",
                            hasprimaryKey: true
                        });
                    } else {
                        this.SelectColumn.push({
                            tablename: this.tablename,
                            data: this.SelectColumnData,
                            unloadType: "全量",
                            hasprimaryKey: true
                        });
                    }
                    this.dialogSelectColumn = false;
                } else {
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
                            unloadType: "全量",
                            hasprimaryKey: false
                        });
                    } else {
                        this.SelectColumn.push({
                            tablename: this.tablename,
                            data: this.SelectColumnData,
                            unloadType: "全量",
                            hasprimaryKey: false
                        });
                    }
                    this.dialogSelectColumn = false;
                }
            }
        },
        //第二页 选择列弹框确认
        SelectColumnSubmitFun2() {
            let arrData = this.SelectColumnData2,
                hasprimaryKey = false;
            if (this.unloadType == "增量") {
                for (let i = 0; i < arrData.length; i++) {
                    if (arrData[i].is_primary_key == true) {
                        hasprimaryKey = true;
                    }
                }
            } else {
                hasprimaryKey = true;
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
                    message: "请选择至少一个主键",
                    type: "error"
                });
            }
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
            message
                .confirmMsg("确定删除吗")
                .then(res => {
                    rows.splice(index, 1);
                })
                .catch(() => {});
        },
        //新增行
        addRow(tableData, event) {
            //  this.disShow=false
            tableData.push({
                isdisabled: false,
                table_name: "",
                table_ch_name: "",
                unload_type: "",
                is_md5: false,
                is_parallel: false
            });
        },
        // 修改表名
        changetablechnameFun(row) {
            if (this.firstTableInfo.length > 0) {
                for (let i = 0; i < this.firstTableInfo.length; i++) {
                    if (this.firstTableInfo[i].table_name == row.table_name) {
                        this.firstTableInfo.splice(i, 1)
                    }
                }
                this.firstTableInfo.push(row)
            } else {
                this.firstTableInfo.push(row)
            }
            /*  for (let m = 0; m < this.allDataList.length; m++) {
                 if (this.allDataList[m].table_name == name) {
                     this.allDataList[m].table_ch_name = chname;
                 }
             } */
        },

        // 第一个页面卸数方式发生改变
        /*  oneunloadTypeFun(row) {
             console.log(row)
             for (let m = 0; m < this.allDataList.length; m++) {
                 if (this.allDataList[m].table_name == row.table_name) {
                     this.allDataList[m].unload_type = row.unload_type;
                 }
             }
         }, */
        // 使用SQL抽取数据
        handleClick(tab) {
            if (tab.name == "first") {
                this.sqlExtractDataSubmitFun("ruleForm");
            } else if (tab.name == "second") {
                if (this.sqlSubmit == true) {
                    this.ruleForm.sqlExtractData = this.tableInfoArray;
                }
            }
        },
        // 使用SQL抽取数据确定
        sqlExtractDataSubmitFun(formName) {
            this.tableInfoArray = this.ruleForm.sqlExtractData; //
            this.sqlSubmit = true;
        },
        //第一个页面打开卸数方式设置
        XSTypeFun(row, e) {
            row.sql = ''
            if (this.firstTableInfo.length > 0) {
                for (let i = 0; i < this.firstTableInfo.length; i++) {
                    if (this.firstTableInfo[i].table_name == row.table_name) {
                        this.firstTableInfo.splice(i, 1)
                    }
                }
                this.firstTableInfo.push(row)
            } else {
                this.firstTableInfo.push(row)
            }
            row.unload_type = e;
            if (row.unload_type == "增量") {
                this.Xstable_name = row.table_name;
                this.xstypeadd.insert = "";
                this.xstypeadd.delete = "";
                this.xstypeadd.update = "";
                let arrid = [];
                if (this.xsTypeArr.length > 0) {
                    for (let i = 0; i < this.xsTypeArr.length; i++) {
                        arrid.push(this.xsTypeArr[i].table_name);
                    }
                }
                if (arrid.length > 0 && arrid.indexOf(row.table_name) != -1) {
                    arrid.length = 0;
                    if (row.unload_type == "全量") {
                        if (this.xsTypeArr.length > 0) {
                            for (let i = 0; i < this.xsTypeArr.length; i++) {
                                if (this.xsTypeArr[i].table_name == row.table_name) {
                                    this.xstypeadd.insert = this.xsTypeArr[i].sql;
                                }
                            }
                        }
                        this.dialog_xsall = true;
                    } else {
                        if (this.xsTypeArr.length > 0) {
                            for (let i = 0; i < this.xsTypeArr.length; i++) {
                                if (this.xsTypeArr[i].table_name == row.table_name) {
                                    this.xstypeadd.insert = this.xsTypeArr[i].sql.insert;
                                    this.xstypeadd.delete = this.xsTypeArr[i].sql.delete;
                                    this.xstypeadd.update = this.xsTypeArr[i].sql.update;
                                }
                            }
                        }
                        this.dialog_xsadd = true;
                    }
                } else {
                    if (row.table_id && row.table_id != "") {
                        this.getTableSetUnloadDataFunfist(row.table_id, row.unload_type);
                    } else {
                        if (row.unload_type == "全量") {
                            this.dialog_xsall = true;
                        } else {
                            this.dialog_xsadd = true;
                        }
                    }
                }
            }

            //
        },
        //第二个页面打开卸数方式设置
        XSTypeFun2(row, e) {
            row.sql = ''
            this.Xstable_name = row.table_name;
            row.unload_type = e;
            let arrid = [];
            if (row.unload_type == "增量") {
                this.xstypeadd2.insert = "";
                this.xstypeadd2.delete = "";
                this.xstypeadd2.update = "";
                if (this.xsTypeArr2.length > 0) {
                    for (let i = 0; i < this.xsTypeArr2.length; i++) {
                        arrid.push(this.xsTypeArr2[i].table_name);
                    }
                }
                if (arrid.length > 0 && arrid.indexOf(row.table_name) != -1) {
                    arrid.length = 0;
                    if (this.xsTypeArr2.length > 0) {
                        for (let i = 0; i < this.xsTypeArr2.length; i++) {
                            if (this.xsTypeArr2[i].table_name == row.table_name) {
                                this.xstypeadd2.insert = this.xsTypeArr2[i].sql.insert;
                                this.xstypeadd2.delete = this.xsTypeArr2[i].sql.delete;
                                this.xstypeadd2.update = this.xsTypeArr2[i].sql.update;
                            }
                        }
                    }
                    this.dialog_xsadd2 = true;
                } else {
                    if (row.table_id && row.table_id != "") {
                        this.getTableSetUnloadDataFun(row.table_id, row.unload_type);
                    } else {
                        if (row.unload_type == "全量") {
                            this.dialog_xsall = true;
                        } else {
                            this.dialog_xsadd2 = true;
                        }
                    }
                }
            } else {
                this.xstypeadd2q.insert = "";
                if (this.xsTypeArr2All.length > 0) {
                    for (let i = 0; i < this.xsTypeArr2All.length; i++) {
                        arrid.push(this.xsTypeArr2All[i].table_name);
                    }
                }
                if (arrid.length > 0 && arrid.indexOf(row.table_name) != -1) {
                    arrid.length = 0;
                    if (this.xsTypeArr2All.length > 0) {
                        for (let i = 0; i < this.xsTypeArr2All.length; i++) {
                            if (this.xsTypeArr2All[i].table_name == row.table_name) {
                                this.xstypeadd2q.insert = this.xsTypeArr2All[i].sql;
                            }
                        }
                    }
                    this.dialog_xsall = true;
                } else {
                    if (row.table_id && row.table_id != "") {
                        this.getTableSetUnloadDataFun(row.table_id, row.unload_type);
                    } else {
                        if (row.unload_type == "全量") {
                            this.dialog_xsall = true;
                        } else {
                            this.dialog_xsadd2 = true;
                        }
                    }
                }
            }
        },
        //点击设置调接口
        getTableSetUnloadDataFun(id, type) {
            let params = {};
            params["table_id"] = id;
            if (type == "全量") {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    this.dialog_xsall = true;
                    if (res.data.unload_type == "1") {
                        this.xstypeadd2q.insert = res.data.sql;
                    }
                });
            } else {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    this.dialog_xsadd2 = true;
                    if (res.data.unload_type == "2") {
                        this.xstypeadd2 = JSON.parse(res.data.sql);
                    }
                });
            }
        },
        getTableSetUnloadDataFunfist(id, type) {
            let params = {};
            params["table_id"] = id;
            if (type == "全量") {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    this.dialog_xsall = true;
                    if (res.data.unload_type == "1") {
                        this.xstypeadd.insert = res.data.sql;
                    }
                });
            } else {
                addTaskAllFun.getTableSetUnloadData(params).then(res => {
                    if (res.data.unload_type == "2") {
                        let data = JSON.parse(res.data.sql);
                        this.xstypeadd.insert = data.add;
                        this.xstypeadd.delete = data.delete;
                        this.xstypeadd.update = data.update;
                    }
                    this.dialog_xsadd = true;
                });
            }
        },
        //第一个页面面卸数方式增量的设置提交
        xsaddSubmitFun(xstypeadd) {
            this.$refs[xstypeadd].validate(valid => {
                if (valid) {
                    if (this.xsTypeArr.length > 0) {
                        let arr = [];
                        this.xsTypeArr.forEach(item => {
                            arr.push(item.table_name);
                        });
                        if (arr.indexOf(this.Xstable_name) != -1) {
                            this.xsTypeArr.forEach(item => {
                                if (item.table_name == this.Xstable_name) {
                                    item.sql = JSON.parse(JSON.stringify(this.xstypeadd));
                                }
                            });
                            arr = [];
                        } else {
                            this.xsTypeArr.push({
                                table_name: this.Xstable_name,
                                sql: JSON.parse(JSON.stringify(this.xstypeadd))
                            });
                            arr = [];
                        }
                    } else {
                        this.xsTypeArr.push({
                            table_name: this.Xstable_name,
                            sql: JSON.parse(JSON.stringify(this.xstypeadd))
                        });
                    }
                    this.dialog_xsadd = false;
                }
            })

        },
        //第2个页面面卸数方式增量的设置提交
        xsaddSubmittwoFun(xstypeadd2) {
            this.$refs[xstypeadd2].validate(valid => {
                if (valid) {
                    if (this.xsTypeArr2.length > 0) {
                        let arr = [];
                        this.xsTypeArr2.forEach(item => {
                            arr.push(item.table_name);
                        });
                        if (arr.indexOf(this.Xstable_name) != -1) {
                            this.xsTypeArr2.forEach(item => {
                                if (item.table_name == this.Xstable_name) {
                                    item.sql = JSON.parse(JSON.stringify(this.xstypeadd2));
                                }
                            });
                            arr = [];
                        } else {
                            this.xsTypeArr2.push({
                                table_name: this.Xstable_name,
                                sql: JSON.parse(JSON.stringify(this.xstypeadd2))
                            });
                            arr = [];
                        }
                    } else {
                        this.xsTypeArr2.push({
                            table_name: this.Xstable_name,
                            sql: JSON.parse(JSON.stringify(this.xstypeadd2))
                        });
                    }
                    this.dialog_xsadd2 = false;
                }
            });
        },
        xsallSubmitFun(xstypeadd2q) {
            this.$refs[xstypeadd2q].validate(valid => {
                if (valid) {
                    if (this.xsTypeArr2All.length > 0) {
                        let arr = [];
                        this.xsTypeArr2All.forEach(item => {
                            arr.push(item.table_name);
                        });
                        if (arr.indexOf(this.Xstable_name) != -1) {
                            this.xsTypeArr2All.forEach(item => {
                                if (item.table_name == this.Xstable_name) {
                                    item.sql = this.xstypeadd2q.insert;
                                }
                            });
                            arr = [];
                        } else {
                            this.xsTypeArr2All.push({
                                table_name: this.Xstable_name,
                                sql: this.xstypeadd2q.insert
                            });
                            arr = [];
                        }
                    } else {
                        this.xsTypeArr2All.push({
                            table_name: this.Xstable_name,
                            sql: this.xstypeadd2q.insert
                        });
                    }
                    this.dialog_xsall = false;
                }
            });
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
