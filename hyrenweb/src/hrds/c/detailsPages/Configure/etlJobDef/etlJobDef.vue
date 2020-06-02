<template>
<div class="etljob">
    <el-form :model="form" ref="form" class="demo-form-inlines" :inline="true">
        <el-col :span="12">
            <el-form-item label="作业名称">
                <el-autocomplete :fetch-suggestions="querySearch" size="mini" v-model="form.etl_job" clearable style="width:264px" placeholder="作业名称"></el-autocomplete>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="作业程序名称">
                <el-input size="mini" v-model="form.pro_name" style="width:264px" placeholder="作业程序名称"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="任务编号">
                <el-input size="mini" v-model="form.sub_sys_cd" style="width:264px" placeholder="任务编号"></el-input>
            </el-form-item>
        </el-col>
        <el-col :span="12">
            <el-form-item label="作业程序类型">
                <el-select size="mini" v-model="form.pro_type" style="width:200px" placeholder="选择程序类型" clearable>
                    <el-option v-for="item in addSelect.proType" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
                <el-button class="searchBtn" size="mini" type="primary" @click="searchBtn">搜索
                </el-button>
            </el-form-item>
        </el-col>
    </el-form>
    <el-divider></el-divider>
    <el-row>
        <div class="subSystemdiv">
            <el-upload class="buttonStyle" accept=".xlsx" action="" :show-file-list="false" :auto-upload="false" :on-change="handleChange" :limit="1" :on-exceed="handleExceed" :fileList="fileList">
                <el-button size="mini" type="primary">导入数据</el-button>
            </el-upload>
            <el-button class="buttonStyle" size="mini" type="primary" @click="downloadModel">下载模板
            </el-button>
            <el-button class="buttonStyle" size="mini" type="primary" @click="handleAdd">新增
            </el-button>
            <el-button class="buttonStyle" size="mini" type="danger" @click="handleBatchDelete">批量删除
            </el-button>
        </div>
    </el-row>
    <el-table size="medium" ref="multipleTable" :data="tableData" tooltip-effect="dark" stripe border style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column type="selection" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="etl_sys_cd" label="工程编号" width="88" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="sub_sys_cd" label="任务编号" width="88" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="etl_job" label="作业名称" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="etl_job_desc" label="作业描述" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="pro_name" label="作业程序名称" width="110" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="dispFreq" label="调度频率" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="dispType" label="调度触发方式" width="110" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="jobEffFlag" label="作业有效标志" width="110" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="upd_time" label="定义时间" align='center'>
        </el-table-column>
        <el-table-column show-overflow-tooltip prop="todayDisp" label="当天是否调度" width="110" align='center'>
        </el-table-column>
        <el-table-column label="操作" align='center' width="150">
            <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
    <el-row :gutter="20" class="tabBtns">
        <el-pagination layout="total, sizes,prev, pager, next, jumper" style="float:right" :page-sizes="[5, 10, 15, 20]"  :page-size="pagesize" :total="pageLength" @current-change="handleCurrentChange" @size-change="handleSizeChange">
        </el-pagination>
    </el-row>
    <!-- 添加/修改任务模态框 -->
    <el-dialog :title="jobTitle" :visible.sync="dialogFormVisibleAdd" width="70%" v-if="this.formAdd.disp_freq != 'F' && this.formAdd.disp_type != 'D'" :before-close="beforeClosechange">
        <el-form :model="formAdd" ref="formAdd" class="demo-form-inline" :inline="true" label-width="150px">
            <el-col :span="12">
                <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                    <el-input v-model="formAdd.etl_sys_cd" style="width:218px;" autocomplete="off" placeholder="工程编号" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="任务编号" prop="sub_sys_cd" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.sub_sys_cd" placeholder="数据库调度(i)" clearable>
                        <el-option v-for="item in addSelect.project_no" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业名称" prop="etl_job" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_job" autocomplete="off" :disabled="disabledControl" placeholder="任务名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业描述" prop="etl_job_desc" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_job_desc" autocomplete="off" placeholder="作业描述"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序类型" prop="pro_type" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.pro_type" placeholder="--程序类型--" clearable>
                        <el-option v-for="item in addSelect.proType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序目录" prop="pro_dic" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.pro_dic" autocomplete="off" placeholder="作业程序目录"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序名称" prop="pro_name" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.pro_name" autocomplete="off" placeholder="作业程序名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="workProgrammsDivFather">
                <el-form-item label="作业程序参数" prop="pro_para">
                    <el-input v-model="formAdd.pro_para" clearable @focus="focusMenthods" @blur="blurMenthods" style="width:218px" placeholder="多个参数时,使用@分割"></el-input>
                </el-form-item>
                <div class="workProgrammsDiv" v-if="showHiddenOr">
                    <span class="workProgrammsDivSpan"> <span>参数</span> <i class="el-icon-close close" @click="closeShow"></i></span>
                    <p class="workProgramms" v-for="(item,index) in workhidden " @click="clickData(item.value)" :key="index">{{item.value}}</p>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item label="日志目录" prop="log_dic" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.log_dic" autocomplete="off" placeholder="日志目录"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度频率" prop="disp_freq" :rules="rule.selected">
                    <el-select v-model="formAdd.disp_freq" placeholder="--频率选择--" clearable>
                        <el-option style="width:218px;" v-for="item in addSelect.dispRate" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度时间位移" prop="disp_offset">
                    <div style="width:150px">
                        <el-input style="width:218px;" v-model="formAdd.disp_offset" autocomplete="off" placeholder="0"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度触发方式" prop="disp_type" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" @change="changeValue" v-model="formAdd.disp_type" placeholder="--触发选择--" clearable>
                            <el-option v-for="item in addSelect.dispType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度触发时间" prop="disp_time">
                    <div style="width:150px">
                        <el-time-picker style="width:218px;" v-model="formAdd.disp_time" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="调度时间 hh:mm:ss" value-format="HH:mm:ss" format="HH:mm:ss">
                        </el-time-picker>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业优先级" prop="job_priority">
                    <div style="width:150px">
                        <el-input style="width:218px;" v-model="formAdd.job_priority" autocomplete="off" placeholder="0"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业有效标志" prop="job_eff_flag" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" v-model="formAdd.job_eff_flag" placeholder="--有效选择--" clearable>
                            <el-option v-for="item in addSelect.jobEfflag" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="当天是否调度" prop="today_disp" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" v-model="formAdd.today_disp" placeholder="--调度选择--" clearable>
                            <el-option v-for="item in addSelect.todayDisp" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="备注" prop="comments">
                    <div style="width:600px">
                        <el-input type="textarea" v-model="formAdd.comments" autocomplete="off" placeholder="备注"></el-input>
                    </div>
                </el-form-item>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 添加/修改任务模态框1 -->
    <el-dialog :title="jobTitle" :visible.sync="dialogFormVisibleAdd" width="70%" v-if="this.formAdd.disp_freq == 'F'" :before-close="beforeClosechange">
        <el-form :model="formAdd" ref="formAdd" class="demo-form-inline" :inline="true" label-width="150px">
            <el-col :span="12">
                <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="任务编号" prop="sub_sys_cd" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.sub_sys_cd" placeholder="数据库调度(i)" clearable>
                        <el-option v-for="item in addSelect.project_no" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业名称" prop="etl_job" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_job" autocomplete="off" :disabled="disabledControl" placeholder="任务名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业描述" prop="etl_job_desc" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_job_desc" autocomplete="off" placeholder="作业描述"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序类型" prop="pro_type" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.pro_type" placeholder="--程序类型--" clearable>
                        <el-option v-for="item in addSelect.proType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序目录" prop="pro_dic" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.pro_dic" autocomplete="off" placeholder="作业程序目录"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序名称" prop="pro_name" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.pro_name" autocomplete="off" placeholder="作业程序名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="workProgrammsDivFather">
                <el-form-item label="作业程序参数" prop="pro_para">
                    <el-input v-model="formAdd.pro_para" @focus="focusMenthods" @blur="blurMenthods" clearable style="width:218px" placeholder="多个参数时,使用@分割"></el-input>
                </el-form-item>
                <div class="workProgrammsDiv" v-if="showHiddenOr">
                    <span class="workProgrammsDivSpan"> <span>参数</span> <i class="el-icon-close close" @click="closeShow"></i></span>
                    <p class="workProgramms" v-for="(item,index) in workhidden " @click="clickData(item.value)" :key="index">{{item.value}}</p>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item label="日志目录" prop="log_dic" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.log_dic" autocomplete="off" placeholder="日志目录"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度频率" prop="disp_freq" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.disp_freq" placeholder="--频率选择--" clearable @change="clears">
                        <el-option v-for="item in addSelect.dispRate" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="每隔(分)执行" prop="exe_frequency">
                    <div style="width:150px">
                        <el-input style="width:218px;" v-model="formAdd.exe_frequency" autocomplete="off" placeholder="每隔(分)执行"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="执行次数" prop="exe_num">
                    <div style="width:150px">
                        <el-input style="width:218px;" v-model="formAdd.exe_num" autocomplete="off" placeholder="执行次数"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="开始执行时间" prop="star_time" :rules="filter_rules([{required: true}])">
                    <div style="width:120px">
                        <el-date-picker style="width:218px;" v-model="formAdd.star_time" type="datetime" placeholder="开始执行时间 hh:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="结束执行时间" prop="end_time" :rules="filter_rules([{required: true}])">
                    <div style="width:150px">
                        <el-date-picker style="width:218px;" v-model="formAdd.end_time" type="datetime" placeholder="结束执行时间 hh:mm:ss" value-format="yyyy-MM-dd HH:mm:ss">
                        </el-date-picker>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业有效标志" prop="job_eff_flag" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" v-model="formAdd.job_eff_flag" placeholder="--有效选择--" clearable>
                            <el-option v-for="item in addSelect.jobEfflag" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="当天是否调度" prop="today_disp" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" v-model="formAdd.today_disp" placeholder="--调度选择--" clearable>
                            <el-option v-for="item in addSelect.todayDisp" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="备注" prop="comments">
                    <div style="width:600px">
                        <el-input type="textarea" v-model="formAdd.comments" autocomplete="off" placeholder="备注"></el-input>
                    </div>
                </el-form-item>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd1" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd1('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 添加/修改任务模态框2 -->
    <el-dialog :title="jobTitle" :visible.sync="dialogFormVisibleAdd" width="70%" v-if="this.formAdd.disp_type == 'D'" :before-close="beforeClosechange">
        <el-form :model="formAdd" ref="formAdd" class="demo-form-inline" :inline="true" label-width="170px">
            <el-col :span="12">
                <el-form-item label="工程编号" prop="etl_sys_cd" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_sys_cd" autocomplete="off" placeholder="工程编号" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="任务编号" prop="sub_sys_cd" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.sub_sys_cd" placeholder="数据库调度(i)" clearable>
                        <el-option v-for="item in addSelect.project_no" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业名称" prop="etl_job" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_job" autocomplete="off" :disabled="disabledControl" placeholder="任务名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业描述" prop="etl_job_desc" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.etl_job_desc" autocomplete="off" placeholder="作业描述"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序类型" prop="pro_type" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.pro_type" placeholder="--程序类型--" clearable>
                        <el-option v-for="item in addSelect.proType" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序目录" prop="pro_dic" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.pro_dic" autocomplete="off" placeholder="作业程序目录"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业程序名称" prop="pro_name" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.pro_name" autocomplete="off" placeholder="作业程序名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12" class="workProgrammsDivFather">
                <el-form-item label="作业程序参数" prop="pro_para">
                    <el-input v-model="formAdd.pro_para" @focus="focusMenthods" @blur="blurMenthods" clearable style="width:218px" placeholder="多个参数时,使用@分割"></el-input>
                </el-form-item>
                <div class="workProgrammsDiv" v-if="showHiddenOr">
                    <span class="workProgrammsDivSpan"> <span>参数</span> <i class="el-icon-close close" @click="closeShow"></i></span>
                    <p class="workProgramms" v-for="(item,index) in workhidden " @click="clickData(item.value)" :key="index">{{item.value}}</p>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form-item label="日志目录" prop="log_dic" :rules="filter_rules([{required: true}])">
                    <el-input style="width:218px;" v-model="formAdd.log_dic" autocomplete="off" placeholder="日志目录"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度频率" prop="disp_freq" :rules="rule.selected">
                    <el-select style="width:218px;" v-model="formAdd.disp_freq" placeholder="--频率选择--" clearable>
                        <el-option v-for="item in addSelect.dispRate" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度时间位移" prop="disp_offset">
                    <div style="width:150px">
                        <el-input style="width:218px;" v-model="formAdd.disp_offset" autocomplete="off" placeholder="0"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="调度触发方式" prop="disp_type" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" @change="changeValue" v-model="formAdd.disp_type" placeholder="--触发选择--" clearable>
                            <el-option v-for="item in addSelect.dispType" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业优先级" prop="job_priority">
                    <div style="width:150px">
                        <el-input style="width:218px;" v-model="formAdd.job_priority" autocomplete="off" placeholder="0"></el-input>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="作业有效标志" prop="job_eff_flag" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" v-model="formAdd.job_eff_flag" placeholder="--有效选择--" clearable>
                            <el-option v-for="item in addSelect.jobEfflag" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="当天是否调度" prop="today_disp" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" v-model="formAdd.today_disp" placeholder="--调度选择--" clearable>
                            <el-option v-for="item in addSelect.todayDisp" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="上游工程名称" prop="pre_etl_sys_cd">
                    <el-input style="width:218px;" v-model="formAdd.pre_etl_sys_cd" autocomplete="off" placeholder="0" disabled></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="上游作业名">
                    <el-select v-model="formAdd.pre_etl_job" multiple :collapse-tags='true' style="width:218px;" placeholder="上游作业名" @change="selectChange">
                        <el-option v-for="item in addSelect.preJobName" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="依赖是否有效" prop="status" :rules="rule.selected">
                    <div style="width:150px">
                        <el-select style="width:218px;" v-model="formAdd.status" placeholder="--有效选择--" clearable @change="selectChange">
                            <el-option v-for="item in addSelect.status" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-col>
            <el-col :span="24">
                <el-form-item label="备注" prop="comments">
                    <div style="width:600px;">
                        <el-input type="textarea" v-model="formAdd.comments" autocomplete="off" placeholder="备注"></el-input>
                    </div>
                </el-form-item>
            </el-col>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancleAdd2" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="saveAdd2('formAdd')" size="mini">保存</el-button>
        </div>
    </el-dialog>
    <!-- 获取上传文件 -->
    <el-dialog title="导入作业数据" :visible.sync="dialogImportData" :before-close="importDatacancel">
        <span v-if="fileList != ''">确认导入 “ {{fileList[0].name}} ” </span>
        <div slot="footer" class="dialog-footer">
            <el-button @click="importDatacancel" size="mini" type="danger">取消</el-button>
            <el-button type="primary" @click="importData" :loading="loadingUpload" size="mini">保存</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as etlJobDefAllFun from "./etlJobDef";
import * as message from "@/utils/js/message";
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
let arr = [];
export default {
    data() {
        return {
            fileList: [],
            sys_cd: '',
            form: {
                etl_job: '',
                pro_name: '',
                sub_sys_cd: '',
                pro_type: '',
            },
            workhidden: [{
                value: "#{txdate}"
            }, {
                value: "#{txdate_next}"
            }, {
                value: "#{txdate_pre}"
            }],
            tableData: [],
            listDatas: [],
            Today_Dispatch_Flag: [],
            Job_Effective_Flag: [],
            Dispatch_Type: [],
            Dispatch_Frequency: [],
            jobTitle: '',
            temp: 'false',
            disabledControl: false,
            rule: validator.default,
            multipleSelection: [],
            dialogFormVisibleAdd: false,
            dialogImportData: false,
            showHiddenOr: false,
            loadingUpload: false,
            formAdd: {
                etl_sys_cd: '',
                sub_sys_cd: '',
                etl_job: '',
                etl_job_desc: '',
                pro_type: '',
                pro_dic: '',
                pro_name: '',
                pro_para: '',
                log_dic: '',
                disp_freq: '',
                disp_offset: '',
                disp_type: '',
                disp_time: '',
                job_priority: '',
                job_eff_flag: '',
                today_disp: '',
                comments: '',
                exe_frequency: '',
                exe_num: '',
                star_time: '',
                end_time: '',
                pre_etl_sys_cd: '',
                pre_etl_job: [],
                status: '',
            },
            addSelect: {
                project_no: [],
                proType: [],
                dispRate: [],
                dispType: [],
                jobEfflag: [],
                todayDisp: [],
                preJobName: [],
                status: [],
            },
            deleteForm: {
                etl_sys_cd: '',
                etl_job: ''
            },
            tempForm: {
                old_disp_freq: '',
                old_pre_etl_job: [],
                old_dispatch_type: '',
            },
            pagesize: 5,
            currpage: 1,
            pageLength: 0,
        };
    },
    mounted() {
        this.getCodeItems("Dispatch_Frequency");
        this.getCodeItems("Dispatch_Type");
        this.getCodeItems("Job_Effective_Flag");
        this.getCodeItems("Today_Dispatch_Flag");
        this.getSelect();
        this.getTable();
        this.getProType();
        this.getJobName();
    },
    methods: {
        //下拉框数据强制渲染
        selectChange() {
            this.$forceUpdate();
        },
        //获取代码项
        getCode() {
            // this.getProType();
            this.getDispRate();
            this.getDispType();
            this.getJobFlag();
            this.getTodayDisp();
            this.getStatus();
            this.getPreJobName();
        },
        //任务编号下拉框数据
        getSelect() {
            let params = {};
            let arr = [];
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            etlJobDefAllFun.searchEtlSubSys(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.sub_sys_desc + '(' + item.sub_sys_cd + ')';
                    item.value = item.sub_sys_cd;
                });
                this.addSelect.project_no = arr;
            });
        },
        // input框的历史信息
        querySearch(queryString, cb) {
            var res = this.listDatas;
            var results = queryString ? res.filter(this.createFilter(queryString)) : res;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (res) => {
                return (res.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        //获取作业名称/上游作业名称下拉框数据
        getJobName() {
            let params = {};
            let arr = [];
            let obj = {};
            params["etl_sys_cd"] = this.sys_cd;
            etlJobDefAllFun.searchEtlJob(params).then(res => {
                res.data.forEach((item) => {
                    obj.label = item;
                    obj.value = item;
                    arr.push(obj);
                    obj = {};
                });
                this.listDatas = arr;
            });
        },
        //作业程序类型下拉框数据
        getProType() {
            let params = {};
            let arr = [];
            params["category"] = "Pro_Type";
            etlJobDefAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.addSelect.proType = arr;
            });
        },
        //调度频率下拉框数据
        getDispRate() {
            let params = {};
            let arr = [];
            params["category"] = "Dispatch_Frequency";
            etlJobDefAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.addSelect.dispRate = arr;
            });
        },
        //调度触发方式下拉框数据
        getDispType() {
            let params = {};
            let arr = [];
            params["category"] = "Dispatch_Type";
            etlJobDefAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].code == 'A' || arr[i].code == 'B') {
                        arr.splice(i, 1);
                        i--
                    }
                }
                this.addSelect.dispType = arr;
            });
        },
        //作业有效标志下拉框数据
        getJobFlag() {
            let params = {};
            let arr = [];
            params["category"] = "Job_Effective_Flag";
            etlJobDefAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.addSelect.jobEfflag = arr;
            });
        },
        //当天是否调度下拉框数据
        getTodayDisp() {
            let params = {};
            let arr = [];
            params["category"] = "Today_Dispatch_Flag";
            etlJobDefAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.addSelect.todayDisp = arr;
            });
        },
        //依赖是否有效下拉框数据
        getStatus() {
            let params = {};
            let arr = [];
            params["category"] = "Status";
            etlJobDefAllFun.getCategoryItems(params).then(res => {
                arr = res.data;
                arr.forEach((item) => {
                    item.label = item.value;
                    item.value = item.code;
                });
                this.addSelect.status = arr;
            });
        },
        //上游作业名下拉框数据
        getPreJobName() {
            let params = {};
            let arr = [];
            params["etl_sys_cd"] = this.sys_cd;
            etlJobDefAllFun.searchEtlJob(params).then(res => {
                res.data.forEach((item) => {
                    let obj = {};
                    obj.label = item;
                    obj.value = item;
                    arr.push(obj);
                });
                this.addSelect.preJobName = arr;
            });
        },
        //刷新表格
        getTable() {
            let params = {};
            this.sys_cd = sessionStorage.getItem('sys_cd');
            params["etl_sys_cd"] = this.sys_cd;
            params["sub_sys_cd"] = '';
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            this.searchEtlJobDefByPage(params);
        },
        // 获取表格代码项
        getCodeItems(val) {
            if (val == "Dispatch_Frequency") { //调度频率
                etlJobDefAllFun.getCategoryItems({
                    category: 'Dispatch_Frequency'
                }).then(res => {
                    this.Dispatch_Frequency = res.data;
                })
            } else if (val == "Dispatch_Type") { //触发方式
                etlJobDefAllFun.getCategoryItems({
                    category: 'Dispatch_Type'
                }).then(res => {
                    this.Dispatch_Type = res.data;
                })
            } else if (val == "Job_Effective_Flag") { //作业有效标志
                etlJobDefAllFun.getCategoryItems({
                    category: 'Job_Effective_Flag'
                }).then(res => {
                    this.Job_Effective_Flag = res.data;
                })
            } else if (val == "Today_Dispatch_Flag") { //是否当天调度
                etlJobDefAllFun.getCategoryItems({
                    category: 'Today_Dispatch_Flag'
                }).then(res => {
                    this.Today_Dispatch_Flag = res.data;
                })
            }
        },

        //清空模态框切换残余数据
        clears() {
            this.formAdd.disp_type = '';
        },
        //搜索按钮
        searchBtn() {
            let params = {};
            params["etl_sys_cd"] = this.sys_cd;
            params["pro_type"] = this.form.pro_type;
            params["etl_job"] = this.form.etl_job;
            params["pro_name"] = this.form.pro_name;
            params["sub_sys_cd"] = this.form.sub_sys_cd;
            params["currPage"] = this.currpage;
            params["pageSize"] = this.pagesize;
            this.searchEtlJobDefByPage(params);
        },
        // 获取表格数据封装
        searchEtlJobDefByPage(params) {
            etlJobDefAllFun.searchEtlJobDefByPage(params).then(res => {
                let dates = res.data.etlJobDefList;
                this.pageLength = res.data.totalSize;
                //作业有效标志
                dates.forEach((item) => {
                    this.Job_Effective_Flag.forEach(val => {
                        if (item.job_eff_flag == val.code) {
                            item.jobEffFlag = val.value;
                        }
                    });

                    //调度频率
                    this.Dispatch_Frequency.forEach(val => {
                        if (item.disp_freq == val.code) {
                            item.dispFreq = val.value;
                        }
                    })

                    //调度触发方式
                    this.Dispatch_Type.forEach(val => {
                        if (item.disp_type == val.code) {
                            item.dispType = val.value;
                        }
                    })
                    //是否当天调度
                    this.Today_Dispatch_Flag.forEach(val => {
                        if (item.today_disp == val.code) {
                            item.todayDisp = val.value;
                        }
                    })
                });
                this.tableData = dates;
            });
        },
        //选中的数据
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //新增按钮
        handleAdd() {
            this.getCode();
            this.jobTitle = '添加作业';
            this.dialogFormVisibleAdd = true;
            this.formAdd.etl_sys_cd = this.sys_cd;
            this.formAdd.pre_etl_sys_cd = this.sys_cd;
        },
        //批量删除按钮
        handleBatchDelete() {
            if (this.multipleSelection.length == 0) {
                this.$message({
                    message: '请选择需要删除的数据',
                    type: 'warning'
                });
            } else {
                this.$confirm('确认批量删除吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    let arr = [];
                    this.multipleSelection.forEach((item) => {
                        arr.push(item.etl_job);
                    });
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["etl_job"] = arr;
                    etlJobDefAllFun.batchDeleteEtlJobDef(params).then(res => {
                        if (res && res.success) {
                            this.getTable();
                            this.$message({
                                message: '批量删除成功',
                                type: 'success'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消批量删除'
                    });
                });
            }
        },
        //编辑按钮
        handleEdit(index, row) {
            this.getCode();
            let params = {};
            let arr = [];
            this.disabledControl = true;
            params["etl_sys_cd"] = row.etl_sys_cd;
            params["etl_job"] = row.etl_job;
            etlJobDefAllFun.searchEtlJobDefById(params).then(res => {
                this.dialogFormVisibleAdd = true;
                this.jobTitle = '修改作业';
                this.formAdd = res.data;
                this.formAdd.pre_etl_sys_cd = this.sys_cd;
                this.tempForm.old_disp_freq = res.data.disp_freq;
                if (res.data.dependencyList.length != 0) {
                    let arr = [];
                    let status = '';
                    res.data.dependencyList.forEach((item) => {
                        arr.push(item.pre_etl_job);
                        status = item.status;
                    });
                    this.formAdd.pre_etl_job = arr;
                    this.formAdd.status = status;
                    this.tempForm.old_pre_etl_job = arr;
                } else {
                    this.tempForm.old_pre_etl_job = [];
                }
                if (res.data.disp_type) {
                    this.tempForm.old_dispatch_type = res.data.disp_type;
                } else {
                    this.tempForm.old_dispatch_type = '';
                }
            });
        },
        //删除按钮
        handleDelete(index, row) {
            this.deleteForm.etl_sys_cd = row.etl_sys_cd;
            this.deleteForm.etl_job = row.etl_job;
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                let params = {};
                params["etl_sys_cd"] = this.deleteForm.etl_sys_cd;
                params["etl_job"] = this.deleteForm.etl_job;
                etlJobDefAllFun.deleteEtlJobDef(params).then(res => {
                    if (res.code == 200) {
                        this.getTable();
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },

        //新增/修改模态框取消按钮
        cancleAdd() {
            if (this.jobTitle == "修改作业") {
                this.getTable();
                this.disabledControl = true;
            }
            this.showHiddenOr = false;
            this.disabledControl = false;
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
            this.tempForm = {};
            this.$refs.formAdd.resetFields();
        },
        beforeClosechange() {
            if (this.jobTitle == "修改作业") {
                this.disabledControl = true;
            }
            this.showHiddenOr = false;
            this.disabledControl = false;
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
            this.$refs.formAdd.resetFields();
        },
        //新增/修改模态框保存按钮
        saveAdd(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["sub_sys_cd"] = this.formAdd.sub_sys_cd;
                    params["etl_job"] = this.formAdd.etl_job;
                    params["etl_job_desc"] = this.formAdd.etl_job_desc;
                    params["pro_type"] = this.formAdd.pro_type;
                    params["pro_dic"] = this.formAdd.pro_dic;
                    params["pro_name"] = this.formAdd.pro_name;
                    params["pro_para"] = this.formAdd.pro_para;
                    params["log_dic"] = this.formAdd.log_dic;
                    params["disp_freq"] = this.formAdd.disp_freq;
                    if (this.formAdd.disp_offset == '') {
                        this.formAdd.disp_offset = null;
                    }
                    params["disp_offset"] = this.formAdd.disp_offset;
                    params["disp_type"] = this.formAdd.disp_type;
                    params["disp_time"] = this.formAdd.disp_time;
                    if (this.formAdd.job_priority == '') {
                        this.formAdd.job_priority = null;
                    }
                    params["job_priority"] = this.formAdd.job_priority;
                    params["job_eff_flag"] = this.formAdd.job_eff_flag;
                    params["today_disp"] = this.formAdd.today_disp;
                    params["comments"] = this.formAdd.comments;
                    params['pre_etl_job'] = this.formAdd.pre_etl_job;
                    params["old_disp_freq"] = this.tempForm.old_disp_freq;
                    params["old_pre_etl_job"] = this.tempForm.old_pre_etl_job;
                    params["old_dispatch_type"] = this.tempForm.old_dispatch_type;

                    if (this.jobTitle == '添加作业') {
                        etlJobDefAllFun.saveEtlJobDef(params).then(res => {
                            if (res && res.success) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.getTable();
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                                this.$refs.formAdd.resetFields();
                            }
                        });
                    } else if (this.jobTitle == '修改作业') {
                        etlJobDefAllFun.updateEtlJobDef(params).then(res => {
                            if (res && res.success) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getTable();
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                                this.tempForm = {};
                                this.$refs.formAdd.resetFields();
                            }
                        });
                    }
                }
            })
        },
        //新增/修改模态框1取消按钮
        cancleAdd1() {
            if (this.jobTitle == "修改作业") {
                this.getTable();
                this.disabledControl = true;
            }
            this.showHiddenOr = false;
            this.disabledControl = false;
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};
            this.$refs.formAdd.resetFields();
        },
        //新增/修改模态框1保存按钮
        saveAdd1(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["sub_sys_cd"] = this.formAdd.sub_sys_cd;
                    params["etl_job"] = this.formAdd.etl_job;
                    params["etl_job_desc"] = this.formAdd.etl_job_desc;
                    params["pro_type"] = this.formAdd.pro_type;
                    params["pro_dic"] = this.formAdd.pro_dic;
                    params["pro_name"] = this.formAdd.pro_name;
                    params["pro_para"] = this.formAdd.pro_para;
                    params["log_dic"] = this.formAdd.log_dic;
                    params["disp_freq"] = this.formAdd.disp_freq;
                    params["exe_frequency"] = this.formAdd.exe_frequency;
                    params["exe_num"] = this.formAdd.exe_num;
                    params["star_time"] = this.formAdd.star_time;
                    params["end_time"] = this.formAdd.end_time;
                    params["job_eff_flag"] = this.formAdd.job_eff_flag;
                    params["today_disp"] = this.formAdd.today_disp;
                    params["comments"] = this.formAdd.comments;
                    params["old_disp_freq"] = this.tempForm.old_disp_freq;
                    params["old_pre_etl_job"] = this.tempForm.old_pre_etl_job;
                    params["old_dispatch_type"] = this.tempForm.old_dispatch_type;
                    if (this.jobTitle == '添加作业') {
                        etlJobDefAllFun.saveEtlJobDef(params).then(res => {
                            if (res && res.success) {
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.getTable();
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                            }

                        });
                    } else if (this.jobTitle == '修改作业') {
                        etlJobDefAllFun.updateEtlJobDef(params).then(res => {
                            if (res && res.success) {
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.getTable();
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                            }

                        });
                    }
                }
            })
        },
        //新增/修改模态框2取消按钮
        cancleAdd2() {
            if (this.jobTitle == "修改作业") {
                this.getTable();
                this.disabledControl = true;
            }
            this.showHiddenOr = false;
            this.disabledControl = false;
            this.dialogFormVisibleAdd = false;
            this.formAdd = {};

            this.$refs.formAdd.resetFields();
        },
        //新增/修改模态框2保存按钮
        saveAdd2(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = {};
                    params["etl_sys_cd"] = this.sys_cd;
                    params["sub_sys_cd"] = this.formAdd.sub_sys_cd;
                    params["etl_job"] = this.formAdd.etl_job;
                    params["etl_job_desc"] = this.formAdd.etl_job_desc;
                    params["pro_type"] = this.formAdd.pro_type;
                    params["pro_dic"] = this.formAdd.pro_dic;
                    params["pro_name"] = this.formAdd.pro_name;
                    params["pro_para"] = this.formAdd.pro_para;
                    params["log_dic"] = this.formAdd.log_dic;
                    params["disp_freq"] = this.formAdd.disp_freq;
                    if (this.formAdd.disp_offset == '') {
                        this.formAdd.disp_offset = null;
                    }
                    params["disp_offset"] = this.formAdd.disp_offset;
                    params["disp_type"] = this.formAdd.disp_type;
                    if (this.formAdd.job_priority == '') {
                        this.formAdd.job_priority = null;
                    }
                    params["job_priority"] = this.formAdd.job_priority;
                    params["job_eff_flag"] = this.formAdd.job_eff_flag;
                    params["today_disp"] = this.formAdd.today_disp;
                    params["pre_etl_sys_cd"] = this.formAdd.pre_etl_sys_cd;
                    params["pre_etl_job"] = this.formAdd.pre_etl_job;
                    params["status"] = this.formAdd.status;
                    params["comments"] = this.formAdd.comments;
                    params["old_disp_freq"] = this.tempForm.old_disp_freq;
                    params["old_pre_etl_job"] = this.tempForm.old_pre_etl_job;
                    params["old_dispatch_type"] = this.tempForm.old_dispatch_type;
                    if (this.jobTitle == '添加作业') {
                        etlJobDefAllFun.saveEtlJobDef(params).then(res => {
                            if (res && res.success) {
                                this.getTable();
                                this.$message({
                                    message: '添加成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {};
                            }
                        });
                    } else if (this.jobTitle == '修改作业') {
                        etlJobDefAllFun.updateEtlJobDef(params).then(res => {
                            if (res && res.success) {
                                this.getTable();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                                this.dialogFormVisibleAdd = false;
                                this.formAdd = {}
                            };
                        });
                    }
                }
            })
        },
        //分页方法
        handleCurrentChange(cpage) {
            this.currpage = cpage;
            this.getTable();
        },
        handleSizeChange(psize) {
            this.pagesize = psize;
            this.getTable();
        },
        //文件超出个数限制时的钩子
        handleExceed(files, fileList) {
            this.$message.warning(`只能选择一个文件`);
        },
        // 获取上传的文件详情
        handleChange(file, fileList) {
            this.fileList = fileList;
            if (fileList.length != 0) {
                this.dialogImportData = true;
            } else {
                this.dialogImportData = false;
            }
            arr = fileList;
        },
        // 取消数据导入
        importDatacancel() {
            this.dialogImportData = false;
            this.fileList = [];
            this.$message.info('已取消导入数据');
        },
        //导入数据按钮
        importData() {
            if (arr.length > 0) {
                this.loadingUpload = true;
                let param = new FormData() // 创建form对象
                for (let i = 0; i < arr.length; i++) {
                    param.append('file', arr[i].raw);
                }
                param.append('table_name', 'etl_job_def');
                etlJobDefAllFun.uploadExcelFile(param).then(res => {
                    if (res && res.success) {
                        message.customizTitle("导入数据成功", "success");
                        this.getTable();
                        this.fileList = [];
                        this.dialogImportData = false;
                        this.loadingUpload = false;
                    } else {
                        this.loadingUpload = false;
                    }
                });
            } else {
                message.customizTitle("请选择上传文件", "warning");
            }

        },
        //下载按钮
        downloadModel() {
            let that = this;
            etlJobDefAllFun.generateExcel({
                etl_sys_cd: that.$route.query.etl_sys_cd,
                tableName: 'etl_job_def'
            }).then(res => {
                if (res && res.code == 200) {
                    that.downloadFile(res.data)
                }
            })
        },
        // 下载模板表格
        downloadFile(val) {
            etlJobDefAllFun.downloadFile({
                fileName: val
            }).then(res => {
                this.filename = val;
                const blob = new Blob([res.data]);
                if (window.navigator.msSaveOrOpenBlob) {
                    // 兼容IE10
                    navigator.msSaveBlob(blob, this.filename);
                } else {
                    //  chrome/firefox
                    let aTag = document.createElement("a");
                    // document.body.appendChild(aTag);
                    aTag.download = this.filename;
                    aTag.href = URL.createObjectURL(blob);
                    if (aTag.all) {
                        aTag.click();
                    } else {
                        //  兼容firefox
                        var evt = document.createEvent("MouseEvents");
                        evt.initEvent("click", true, true);
                        aTag.dispatchEvent(evt);
                    }
                    URL.revokeObjectURL(aTag.href);
                }
            })
        },
        // 获取点击作业程序参数下拉值
        clickData(val) {
            // 赋值
            if (this.formAdd.pro_para.length < 1) {
                this.formAdd.pro_para = val;
            } else if (this.formAdd.pro_para == "@" && this.formAdd.pro_para.length == 1) {
                this.formAdd.pro_para = val;
            } else {
                this.formAdd.pro_para += val;
            }
            this.showHiddenOr = false;
        },
        // 获取键盘监听事件
        keyCodeForEventup(e) {
            let self = this;
            if (e.shiftKey == 0 && e.key == "2") {
                self.showHiddenOr = true;
            }
        },
        keyCodeForEventdown(e) {
            let self = this;
            if (e.shiftKey == 1 && e.key == "Process" || e.shiftKey == 1 && e.key == "@") {
                self.showHiddenOr = true;
            }
        },
        // 作业程序参数聚焦
        focusMenthods() {
            window.addEventListener('keyup', this.keyCodeForEventup);
            window.addEventListener('keydown', this.keyCodeForEventdown);
        },
        // 作业程序参数失焦
        blurMenthods() {
            window.removeEventListener('keyup', this.keyCodeForEventup);
            window.removeEventListener('keydown', this.keyCodeForEventdown);
        },
        // 关闭参数选择栏
        closeShow() {
            this.showHiddenOr = false;
        },
        // 调度触发方式控制依赖是否有效
        changeValue(val) {
            if (val == "D") {
                this.formAdd.status = "T"
            } else {
                this.formAdd.status = ""
            }
        }
    },
};
</script>

<style scoped>
.tabBtns {
    margin-top: 15px;
}

.buttonStyle {
    display: block;
    float: left;
    margin-right: 10px;
    margin-left: 0px;
}

.subSystemdiv {
    float: right;
    margin-bottom: 14px;
}

.demo-form-inlines {
    height: 100px;
}

.searchBtn {
    margin-left: 10px;
}

.etljob>>>.el-select__tags {
    white-space: nowrap;
    overflow: hidden;
}

.workProgramms {
    width: 194px;
    height: 20px;
    font-size: 16px;
    cursor: pointer;
    padding-left: 8px;
}

.workProgramms:hover {
    color: #409EFF;
}

.workProgrammsDiv {
    padding: 4px;
    position: absolute;
    z-index: 10000;
    background: #fff;
    left: 150px;
    top: 40px;
    border-radius: 6px;
    border: 1px solid #e6e6e6;
    border-top: none;
    columns: black;
}

.workProgrammsDivFather {
    position: relative;
}

.workProgrammsDivSpan {
    padding-left: 4px;
    display: block;
    height: 20px;
    line-height: 20px;
    font-size: 16px;
    border-bottom: 1px solid #e6e6e6;
}

.close {
    cursor: pointer;
    float: right;
}
</style><style>
.el-autocomplete-suggestion li {
    overflow: visible;
    /* text-overflow: ellipsis; */
}
</style>
