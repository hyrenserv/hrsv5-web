<template>
<div>
    <Step :active="active" :typeinfo='typeinfo'></Step>
    <el-tabs v-model="activeNames" type="border-card">
        <el-tab-pane label="数据采集" name="first">
            <div id="dataAcquisition">
                <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="30%" class="demo-ruleForm">
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据采集任务名" prop="task_name" :rules="filter_rules([{required: true}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.task_name" size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="作业编号" prop="database_number" :rules="filter_rules([{required: true,dataType:'noLengthVaild'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.database_number" size="medium" v-if="show==true" disabled placeholder="作业编号"></el-input>
                                    <el-input v-model="ruleForm.database_number" size="medium" v-else placeholder="作业编号"></el-input>
                                </el-col>
                                <el-tooltip class="item" effect="dark" content="在命令触发中使用，第一个参数可以是当前输入的值(作业编号不能有中文或者中文字符)" placement="right">
                                    <i class="fa fa-question-circle" aria-hidden="true" style="margin-left: 4px;"></i>
                                </el-tooltip>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="分类编号" prop="classify_num" :rules="filter_rules([{required: true,dataType:'compositions'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.classify_num" size="medium" disabled placeholder="分类编号">
                                        <el-button slot="append" icon="el-icon-zoom-in" @click="collTaskClassFun('1');outerVisible = true"></el-button>
                                    </el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="分类名称" prop="classify_name" :rules="rule.default">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.classify_name" size="medium" disabled placeholder="分类名称"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据源" prop="sourceName">
                                <el-col :span="16">
                                    <el-input v-model="sourceName" size="medium" disabled></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="数据库" prop="database_type" :rules="rule.selected">
                                <el-col :span="16">
                                    <el-select placeholder="数据库类型" v-model="ruleForm.database_type" @change="dbTypeFun" size="medium">
                                        <el-option v-for="(item,index) in DatabaseType" :key="index" :label="item.value" :value="item.code"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据库驱动" prop="database_drive">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.database_drive" size="medium" disabled></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="数据库名称" prop="database_name" :rules="rule.default">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.database_name" size="medium" @input="jdbcChangeFun()"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据库服务器IP" prop="database_ip" :rules="filter_rules([{required: true,dataType:'ip_verification'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.database_ip" size="medium" @input="jdbcChangeFun()"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="数据库端口" prop="database_port" :rules="filter_rules([{required: true,dataType:'port_verification'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.database_port" size="medium" @input="jdbcChangeFun()"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="用户名" :rules="rule.default" prop="user_name">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.user_name" size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" prop="database_pad">
                            <el-form-item label="密码" :rules="filter_rules([{required: true}])" prop="database_pad">
                                <el-col :span="16">
                                    <el-input v-model="ruleForm.database_pad" size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="jdbcURL" prop="jdbc_url" :rules="rule.default" style="width: 70%;">
                                <el-col :span="24">
                                    <el-input style="width: 124%;" v-model="ruleForm.jdbc_url" size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6" style="text-align:right;">
                            <el-button type="primary" :loading="linkloading" @click="testLinkFun('1')" size="mini">测试连接</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="success" @click="viewLogFun()" size="mini">查看日志</el-button>
                        </el-col>
                    </el-row>
                </el-form>

            </div>
        </el-tab-pane>
        <el-tab-pane label="贴源登记" name="second">
            <div>
                <el-row>
                    <el-col :span="12" :offset="1">
                        <el-button type="primary" size='medium' @click="chooseStorageTierFun()">选择存储层</el-button>
                        <span class="dialogtoptxt"><p class="dialogtopname">选择存储层确定后自动回显对应的数据库信息</p> </span>
                    </el-col>
                </el-row>
                <el-form :model="ruleFormSecond" status-icon ref="ruleFormSecond" label-width="30%" class="demo-ruleForm ruleFormSe">
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据采集任务名" prop="task_name" :rules="filter_rules([{required: true}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.task_name" size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="作业编号" prop="database_number" :rules="filter_rules([{required: true,dataType:'noLengthVaild'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.database_number" size="medium" v-if="show==true" disabled placeholder="作业编号"></el-input>
                                    <el-input v-model="ruleFormSecond.database_number" size="medium" v-else placeholder="作业编号"></el-input>
                                </el-col>
                                <el-tooltip class="item" effect="dark" content="在命令触发中使用，第一个参数可以是当前输入的值(作业编号不能有中文或者中文字符)" placement="right">
                                    <i class="fa fa-question-circle" aria-hidden="true" style="margin-left: 4px;"></i>
                                </el-tooltip>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="分类编号" prop="classify_num" :rules="filter_rules([{required: true,dataType:'compositions'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.classify_num" size="medium" readonly placeholder="分类编号">
                                        <el-button slot="append" icon="el-icon-zoom-in" @click="collTaskClassFun('2');outerVisible = true"></el-button>
                                    </el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="分类名称" prop="classify_name" :rules="rule.default">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.classify_name" size="medium" disabled placeholder="分类名称"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据源" prop="sourceName">
                                <el-col :span="16">
                                    <el-input v-model="sourceName" size="medium" disabled></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="数据库" prop="database_type" :rules="rule.selected">
                                <el-col :span="16">
                                    <el-select placeholder="数据库类型" v-model="ruleFormSecond.database_type" disabled @change="dbTypeFun" size="medium">
                                        <el-option v-for="(item,index) in DatabaseType" :key="index" :label="item.value" :value="item.code"></el-option>
                                    </el-select>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据库驱动" prop="database_drive">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.database_drive" size="medium" disabled></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="数据库名称" prop="database_name" :rules="rule.default">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.database_name" disabled size="medium" @input="jdbcChangeFun()"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="数据库服务器IP" prop="database_ip" :rules="filter_rules([{required: true,dataType:'ip_verification'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.database_ip" disabled size="medium" @input="jdbcChangeFun()"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="数据库端口" prop="database_port" :rules="filter_rules([{required: true,dataType:'port_verification'}])">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.database_port" disabled size="medium" @input="jdbcChangeFun()"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row type="flex" justify="center">
                        <el-col :span="10">
                            <el-form-item label="用户名" :rules="rule.default" prop="user_name">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.user_name" disabled size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10" prop="database_pad">
                            <el-form-item label="密码" :rules="filter_rules([{required: true}])" prop="database_pad">
                                <el-col :span="16">
                                    <el-input v-model="ruleFormSecond.database_pad" disabled size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item label="jdbcURL" prop="jdbc_url" :rules="rule.default" style="width: 70%;">
                                <el-col :span="24">
                                    <el-input style="width: 124%;" v-model="ruleFormSecond.jdbc_url" disabled size="medium"></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="6" style="text-align:right;">
                            <el-button type="primary" :loading="linkloading" @click="testLinkFun('1')" size="mini">测试连接</el-button>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="success" @click="viewLogFun()" size="mini">查看日志</el-button>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>
    <el-row>
        <el-col :span="12">
            <el-button type="primary" size="medium" class="leftbtn" @click="backFun()">返回</el-button>
        </el-col>
        <el-col :span="12">
            <el-button v-if="activeNames=='first'" type="primary" size="medium" class='rightbtn' @click="next('ruleForm')">下一步</el-button>
            <el-button v-else type="primary" size="medium" class='rightbtn' @click="next('ruleFormSecond')">下一步</el-button>
            <el-button type="primary" size="medium" class='rightbtn' disabled>上一步</el-button>
        </el-col>
    </el-row>
    <!-- 分类编号弹层 -->
    <el-dialog title="采集任务分类" :visible.sync="outerVisible" class="collTask">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">采集任务分类</span>
        </div>
        <el-dialog width="40%" title="新增采集任务分类" :visible.sync="innerVisible" append-to-body>
            <div slot="title">
                <span class="dialogtitle el-icon-caret-right">新增采集任务分类</span>
            </div>
            <el-form :model="addClassTask" ref="addClassTask">
                <el-form-item label=" 分类编号" prop="class_num" :rules="filter_rules([{required: true,dataType:'compositions'}])" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.class_num" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label=" 分类名称" prop="class_name" :rules="rule.default" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.class_name" style="width:284px"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="class_des" :label-width="formLabelWidth">
                    <el-input v-model="addClassTask.class_des" type="textarea" style="width:284px"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button size="mini" type="danger" @click="innerVisible = false">取 消</el-button>
                <el-button type="primary" size="mini" @click="innerVisible = false;addClassTaskFun(addClassTask)">保存</el-button>
            </div>
        </el-dialog>
        <div slot="footer" class="dialog-footer">
            <el-table stripe :data="CollTaskData.slice((currentPage - 1) * pagesize, currentPage * pagesize)" border size="medium" highlight-current-row @current-change="handleSelectionChange" @row-click="chooseone">
                <el-table-column property label="选择" width="60px" type="index" align="center">
                    <template slot-scope="scope">
                        <el-radio v-model="radio2" :label="scope.row.classify_id">&thinsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column property label="序号" width="60px" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="classify_num" label="分类编号" align="center"></el-table-column>
                <el-table-column property="classify_name" label="分类名称" width="100px" align="center"></el-table-column>
                <el-table-column property="remark" label="描述" width="100px" align="center"></el-table-column>
                <el-table-column label="操作" width="150px" align="center">
                    <template slot-scope="scope">
                        <el-row>

                            <el-col :span="12" style="text-align: center;">
                                <el-button type="text" circle @click="colltaskEditBtn(scope.row)" class='editcolor'>编辑</el-button>
                            </el-col>
                            <el-col :span="12">
                                <el-button class='delcolor' type="text" circle @click="colltaskDeleBtn(scope.row)" @row-click="chooseone">删除</el-button>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="pagesize" layout="total, prev, pager, next" :total="CollTaskData.length"></el-pagination>
            <div class="btntop">
                <el-button @click="cancelClassNumBtn()" type="danger" size="mini">取 消</el-button>
                <el-button @click="addClassNumBtn();innerVisible = true" type="success" size="mini">新增</el-button>

                <el-button @click="updataClassNumBtn(CollTaskData)" type="primary" size="mini">确定</el-button>

            </div>
        </div>
    </el-dialog>
    <!-- 点击编辑弹层 -->
    <el-dialog width="40%" title="修改采集任务分类" :visible.sync="ediltVisible" append-to-body>
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">修改采集任务分类</span>
        </div>
        <el-form :model="editClassTask" ref="addClassTask">
            <el-form-item label=" 分类编号" prop="class_num" :rules="rule.default" :label-width="formLabelWidth" width="130">
                <el-input v-model="editClassTask.class_num" style="width:284px" disabled></el-input>
            </el-form-item>
            <el-form-item label=" 分类名称" prop="class_name" :rules="rule.default" :label-width="formLabelWidth">
                <el-input v-model="editClassTask.class_name" style="width:284px"></el-input>
            </el-form-item>
            <el-form-item label="备注" prop="class_des" :label-width="formLabelWidth">
                <el-input v-model="editClassTask.class_des" type="textarea" style="width:284px"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button size="mini" type="danger" @click="ediltVisible = false">取 消</el-button>
            <el-button size="mini" type="primary" @click="editClassTaskSane(editClassTask)">保存</el-button>
        </div>
    </el-dialog>

    <!-- 测试连接弹层 -->
    <el-dialog title="提示信息" :visible.sync="testLink" width="30%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">提示信息</span>
        </div>
        <div class="testLinnk">
            <span>{{linkTip}}</span>
        </div>
    </el-dialog>
    <!-- 查看日志弹层 -->

    <el-dialog title="Agent日志信息" :visible.sync="viewLog" width="80%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">Agent日志信息</span>
        </div>
        <div class="logseach">
            <el-input placeholder="请输入查看条数" v-model="lognum" class="input-with-select" size="mini">
                <el-button slot="append" icon="el-icon-search" @click='getviewlog()'></el-button>
            </el-input>
        </div>
        <div class='logclass' style="min-height:200px">
            <pre>{{logMsg}}</pre>
        </div>
    </el-dialog>
    <!-- 选择存储层弹框 -->
    <el-dialog title="选择存储层" :visible.sync="dialogChooseStorageTier" width="70%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">存储层</span>
        </div>
        <el-table stripe :data="StorageTierData.slice((StorageTier_currentPage - 1) * StorageTier_pagesize,StorageTier_currentPage * StorageTier_pagesize)" border size="medium" highlight-current-row ref="multipleTable" tooltip-effect="dark" :row-key="(row)=>{ return row.dsl_id}" >
             <el-table-column property label="选择" width="60px" type="index" align="center">
                    <template slot-scope="scope">
                        <el-radio v-model="radioSave" :label="scope.row.dsl_id">&thinsp;</el-radio>
                    </template>
                </el-table-column>
            <el-table-column label="序号" align="center" width="60">
                <template slot-scope="scope">
                    <span>{{scope.$index+(StorageTier_currentPage - 1) * StorageTier_pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="dsl_name" label="存储名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="store_type" label="存储类型" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="详情" width="160px" align="center">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="24" class="delbtn">
                            <el-button size="medium" type="text" circle @click="getStoDestDetailFun(scope.row)">查看详情</el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="StorageTier_handleSizeChange" @current-change="StorageTier_handleCurrentChange" :current-page.sync="StorageTier_currentPage" :page-size="StorageTier_pagesize" layout="total, prev, pager, next" :total="StorageTierData.length" class="locationcenter"></el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChooseStorageTier = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="ChooseStorageTierSubmitFun()" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 查看详情 -->
    <el-dialog title=" 查看详情" :visible.sync="dialogViewDetails" width="60%" class="alltable">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">查看详情</span>
        </div>
        <table v-if="viewDatilsData.length==0" class="mailTable" border="0" cellspacing="0" cellpadding="0">
            <tr>
                <td class="nocontent">暂无信息</td>
            </tr>
        </table>
        <table v-else class="mailTable" border="0" cellspacing="0" cellpadding="0">
            <tr v-for="(item,index) in viewDatilsData" :key="index">
                <td>{{item.storage_property_key}}：</td>
                <td>
                    <p>{{item.storage_property_val}}</p>
                </td>
            </tr>
        </table>
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
import {
    viewTaskLog
} from '../agentList/agentList'
export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 0,
            typeinfo:1,
            tableloadingInfo: "数据加载中...",
            dialogChooseStorageTier: false,
            dialogViewDetails: false,
            activeNames: "first",
            radio: null,
            radio2: null,
            linkTip: "",
            isLoading: false,
            linkloading: false,
            CollTaskData: [],
            currentPage: 1,
            pagesize: 10,
            formLabelWidth: "150px",
            ruleForm: {
                task_name: "",
                database_number: "",
                classify_num: "",
                classify_name: "",
                database_drive: "",
                database_name: "",
                database_ip: "",
                database_port: "",
                user_name: "",
                database_pad: "",
                jdbc_url: "",
                database_type: ""
            },
            ruleFormSecond: {
                task_name: "",
                database_number: "",
                classify_num: "",
                classify_name: "",
                database_drive: "",
                database_name: "",
                database_ip: "",
                database_port: "",
                user_name: "",
                database_pad: "",
                jdbc_url: "",
                database_type: ""
            },
            sourceName: "",
            sourceId: null,
            agentId: null,
            rule: validator.default,
            outerVisible: false,
            innerVisible: false,
            ediltVisible: false,
            testLink: false,
            viewLog: false,
            input0: "",
            addClassTask: {
                class_num: "",
                class_name: "",
                class_des: ""
            },
            editClassTask: {
                class_id: "",
                class_num: "",
                class_name: "",
                class_des: ""
            },
            currentSelectItem: {},
            classifyName: "",
            classifyNum: "",
            DatabaseType: [],
            ipPlaceholder: "",
            portPlaceholder: "",
            urlPrefix: "",
            urlSuffix: "",
            dbid: null,
            activelink: "",
            formLabelWidth: "150px",
            show: false,
            lognum: 100,
            logMsg: '',
            StorageTierData: [],
            storeTypeData: [],
            StorageTier_currentPage: 1,
            StorageTier_pagesize: 10,
            viewDatilsData: [],
            radioSave:null,//存储层弹框单选
        };
    },
    created() {
        let params = {};
        params["category"] = "DatabaseType";
        this.$Code.getCategoryItems(params).then(res => {
            this.DatabaseType = res.data ? res.data : [];
        });
        this.sourceName = this.$Base64.decode(this.$route.query.source_name);
        this.sourceId = this.$route.query.source_id;
        this.agentId = this.$route.query.agent_id;
        this.dbid = this.$route.query.id;
        this.edit = this.$route.query.edit;
        this.storeTypeFun()
    },
    mounted() {
        if (this.edit == "yes") {
            this.show = true;
            let params = {};
            params["databaseId"] = this.dbid;
            addTaskAllFun.getDBConfInfo(params).then(res => {
                if (res.data) {
                    this.ruleForm = res.data[0];
                    this.radio = res.data[0].classify_id;
                }
                let params = {};
                params["dbType"] = String(res.data[0].database_type);
                addTaskAllFun.getDBConnectionProp(params).then(res => {
                    if (res.data) {
                        this.ipPlaceholder = res.data.ipPlaceholder;
                        this.portPlaceholder = res.data.portPlaceholder;
                        this.urlPrefix = res.data.urlPrefix;
                        this.urlSuffix = res.data.urlSuffix;
                    }
                });
                //
            });
        } else {
            let params = {};
            params["databaseId"] = this.sourceId;
            params["agent_id"] = this.$route.query.agent_id
            addTaskAllFun.addDBConfInfo(params).then(res => {
                if (res.data.length != 0) {
                    this.ruleForm = res.data[0];
                    this.radio = res.data[0].classify_id;
                    this.dbid = res.data[0].database_id;
                    if (res.data[0].database_type != '') {
                        let params = {};
                        params["dbType"] = String(res.data[0].database_type);
                        addTaskAllFun.getDBConnectionProp(params).then(res => {
                            if (res.data) {
                                this.ipPlaceholder = res.data.ipPlaceholder;
                                this.portPlaceholder = res.data.portPlaceholder;
                                this.urlPrefix = res.data.urlPrefix;
                                this.urlSuffix = res.data.urlSuffix;
                            }
                        });
                    }
                }
            });
        }
    },
    methods: {
        next(formName) {
            this.isLoading = true
            let that = this;
            that.$refs[formName].validate(valid => {
                if (valid) {
                    that.testLinkFun("2");
                } else {
                    this.isLoading = false
                }
            });
            // saveDbConf
        },
        nextLink(data) {
            if (data == "true") {
                // 根据activeNames值判断传值？？？？？？
                let params = {};
                params["task_name"] = this.ruleForm.task_name;
                params["database_number"] = this.ruleForm.database_number;
                params["classify_id"] = this.radio;
                params["database_type"] = this.ruleForm.database_type;
                params["database_drive"] = this.ruleForm.database_drive;
                params["database_name"] = this.ruleForm.database_name;
                params["database_ip"] = this.ruleForm.database_ip;
                params["database_port"] = this.ruleForm.database_port;
                params["user_name"] = this.ruleForm.user_name;
                params["database_pad"] = this.ruleForm.database_pad;
                params["jdbc_url"] = this.ruleForm.jdbc_url;
                // if (this.edit == "yes") {
                params["database_id"] = this.dbid;
                // }
                params["agent_id"] = this.agentId;
                addTaskAllFun.saveDbConf(params).then(res => {
                    this.isLoading = false
                    if (res.code == "200") {
                        let data = {};
                        if (this.edit == "yes") {
                            data = {
                                agent_id: this.agentId,
                                id: this.dbid,
                                source_id: this.sourceId,
                                source_name: this.$Base64.encode(this.sourceName),
                                edit: "yes"
                            };
                        } else {
                            data = {
                                id: res.data,
                                source_id: this.sourceId,
                                agent_id: this.agentId,
                                source_name: this.$Base64.encode(this.sourceName)
                            };
                        }
                        this.$router.push({
                            path: "/collection1_2",
                            query: data
                        });
                    }
                    /* else {
                                           this.$message({
                                               showClose: true,
                                               message: res.message,
                                               type: "error"
                                           });
                                       } */
                });
            }
            /* else {
                           this.$message({
                               showClose: true,
                               message: "提交失败，请检查信息",
                               type: "error"
                           });
                       } */
        },
        backFun() {
            this.$router.push({
                path: "/agentList"
            });
        },
        getviewlog() {
            let params = {};
            params["agentId"] = this.agentId;
            params["readNum"] = this.lognum;
            viewTaskLog(params).then(res => {
                this.logMsg = res.data.trim();
            });
        },
        viewLogFun() {
            this.viewLog = true
            this.getviewlog()
        },
        handleSizeChange(size) {
            this.pagesize = size;
        },
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },

        // 采集任务分类单选选择时
        handleSelectionChange(row) {
            if (row) {
                this.currentSelectItem = row;
                this.classifyName = row.classify_name;
                this.classifyNum = row.classify_num;
            }
        },
        chooseone(row) {
            this.radio = row.classify_id;
        },
        // 采集任务分类确定提交时

        updataClassNumBtn(row) {
            console.log(this.activeName)
            if (row.length > 0) {
                if (this.activeNames == 'second') {
                    if (this.radio2 != '') {
                        for (let i = 0; i < row.length; i++) {
                            if (row[i].classify_id == this.radio2) {
                                this.outerVisible = false;
                                this.ruleFormSecond.classify_name = row[i].classify_name;
                                this.ruleFormSecond.classify_num = row[i].classify_num;
                            }
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: "请至少选择一项",
                            type: "error"
                        });
                    }
                } else {
                    if (this.radio != '') {
                        for (let i = 0; i < row.length; i++) {
                            if (row[i].classify_id == this.radio) {
                                this.outerVisible = false;
                                this.ruleForm.classify_name = row[i].classify_name;
                                this.ruleForm.classify_num = row[i].classify_num;
                            }
                        }
                    } else {
                        this.$message({
                            showClose: true,
                            message: "请至少选择一项",
                            type: "error"
                        });
                    }
                }

            } else {
                this.$message({
                    showClose: true,
                    message: "请新增任务并选择",

                    type: "error"
                });
            }
        },
        // 采集任务取消时
        cancelClassNumBtn() {
            this.outerVisible = false;
            this.radio = "";
            this.currentSelectItem = {};
            this.classifyName = "";
            this.classifyNum = "";
        },
        // 点击分类编号时调
        collTaskClassFun(num) {
            if (num == '2') {
                this.ruleFormSecond.classify_name = "";
                this.ruleFormSecond.classify_num = "";
                this.radio2 = ''
            } else {
                this.ruleForm.classify_name = "";
                this.ruleForm.classify_num = "";
                this.radio = ''
            }
            let params = {};
            params["sourceId"] = this.sourceId;
            addTaskAllFun.getClassifyInfo(params).then(res => {
                if (res.data) {
                    if (res.data.length == 0) {
                        this.tableloadingInfo = "暂无数据";
                    } else {
                        this.CollTaskData = res.data
                    }
                }
            });
        },
        // 点击编辑按钮回显之前数据
        colltaskEditBtn(row) {
            this.ediltVisible = true;
            this.editClassTask.class_id = row.classify_id;
            this.editClassTask.class_name = row.classify_name;
            this.editClassTask.class_num = row.classify_num;
            this.editClassTask.class_des = row.remark;
        },
        // 点击编辑后-提交
        editClassTaskSane(data) {
            this.ediltVisible = false;
            let params = {};
            params["classify_id"] = data.class_id;
            params["classify_num"] = data.class_num;
            params["classify_name"] = data.class_name;
            params["remark"] = data.class_des;
            params["agent_id"] =this.agentId;
            params["sourceId"] =this.sourceId;
            addTaskAllFun.updateClassifyInfo(params).then(res => {
                message.updateSuccess(res);
                this.collTaskClassFun();
            });
        },
        // 点击任务采集-删除
        colltaskDeleBtn(row) {
            let that = this
            message.confirmMsg('确定删除吗').then(res => {
                let params = {};
                params["classifyId"] = row.classify_id;
                addTaskAllFun.deleteClassifyInfo(params).then(res => {
                    message.deleteSuccess(res);
                    that.collTaskClassFun();
                });
            }).catch(() => {})

        },
        // 点击新增
        addClassNumBtn() {
            this.addClassTask.class_num = "",
                this.addClassTask.class_name = "",
                this.addClassTask.class_des = "";
        },
        // 点击新增后的弹框保存
        addClassTaskFun(data) {
            let params = {};
            params["classify_num"] = data.class_num;
            params["classify_name"] = data.class_name;
            params["remark"] = data.class_des;
            params["agent_id"] = this.agentId;
            params["sourceId"] = this.sourceId;
            addTaskAllFun.saveClassifyInfo(params).then(res => {
                message.saveSuccess(res);
                this.collTaskClassFun();
            });
        },
        // 根据数据库类型获取数据驱动
        dbTypeFun(sval) {
            let params = {};
            params["dbType"] = String(sval);
            addTaskAllFun.getJDBCDriver(params).then(res => {
                this.ruleForm.database_drive = res.data ? res.data : "";
            });
            addTaskAllFun.getDBConnectionProp(params).then(res => {
                if (res.data) {
                    this.ipPlaceholder = res.data.ipPlaceholder;
                    this.portPlaceholder = res.data.portPlaceholder;
                    this.urlPrefix = res.data.urlPrefix;
                    this.urlSuffix = res.data.urlSuffix;
                    this.jdbcUrlFun();
                }
            });
        },
        jdbcUrlFun() {
            let that = this;
            let code;
            that.DatabaseType.forEach(function (currentValue, index) {
                if (currentValue.value == "TeraData") {
                    code = currentValue.code;
                    if (that.ruleForm.database_type == code) {
                        that.ruleForm.jdbc_url =
                            that.urlPrefix +
                            that.ruleForm.database_ip +
                            that.ipPlaceholder +
                            that.ruleForm.database_name +
                            that.urlSuffix +
                            that.ruleForm.database_port;
                    } else {
                        that.ruleForm.jdbc_url =
                            that.urlPrefix +
                            that.ruleForm.database_ip +
                            that.ipPlaceholder +
                            that.ruleForm.database_port +
                            that.portPlaceholder +
                            that.ruleForm.database_name +
                            that.urlSuffix;
                    }
                }
            });
        },
        jdbcChangeFun() {
            this.jdbcUrlFun();
        },
        // 点击测试连接
        testLinkFun(n) {
            console.log(this.activeNames)
            if (n == '1') {
                this.linkloading = true
            }
            let params = {};
            params["database_drive"] =this.activeNames=='first'?this.ruleForm.database_drive:this.ruleFormSecond.database_drive;
            params["user_name"] = this.activeNames=='first'?this.ruleForm.user_name:this.ruleFormSecond.user_name;
            params["database_pad"] = this.activeNames=='first'?this.ruleForm.database_pad:this.ruleFormSecond.database_pad;
            params["jdbc_url"] = this.activeNames=='first'?this.ruleForm.jdbc_url:this.ruleFormSecond.jdbc_url;
            params["database_type"] = this.activeNames=='first'?this.ruleForm.database_type:this.ruleFormSecond.database_type;
            params["agent_id"] =this.agentId;
            addTaskAllFun.testConnection(params).then(res => {
                if (res.success == true) {
                    if (n == '1') {
                        // this.testLink = true
                        this.linkloading = false
                        this.$Msg.customizTitle('连接成功');
                    }
                    // this.linkTip = "连接成功";
                    this.activelink = "true";
                } else {
                    this.linkloading = false
                    // this.linkTip = res.message;
                    this.activelink = "false";
                    this.isLoading = false
                }
                if (n == "2") {
                    this.nextLink(this.activelink);
                }
            });
        },
        // 选择存储层
        chooseStorageTierFun() {
            this.dialogChooseStorageTier = true
            //    AlldestinationData
            addTaskAllFun.getStorageData().then(res => {
                console.log(res)
                let arr = JSON.parse(JSON.stringify(res.data));
                let data = this.storeTypeData;
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (data[j].code == arr[i].store_type) {
                            arr[i].store_type = data[j].value;
                        }
                    }
                }
                this.StorageTierData = arr;
            })

        },
        storeTypeFun() {
            let params = {};
            params["category"] = "Store_type";
            this.$Code.getCategoryItems(params).then(res => {
                if (res) {
                    this.storeTypeData = res.data;
                }
            });
        },
        StorageTier_handleSizeChange(size) {
            this.StorageTier_pagesize = size
        },
        StorageTier_handleCurrentChange(currentpage) {
            this.StorageTier_currentPage = currentpage
        },
        // 点击查看详情
        getStoDestDetailFun(row) {
            this.dialogViewDetails = true;
            let params = {};
            params["dslId"] = row.dsl_id;
            addTaskAllFun.getStoDestDetail(params).then(res => {
                if (res.data) {
                    this.viewDatilsData = res.data;
                }
            });
        },
        ChooseStorageTierSubmitFun() {
            this.dialogChooseStorageTier = false
            console.log(this.radioSave)
        }
    }
};
</script>

<style scoped>
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

.ruleFormSe {
    margin-top: 15px;
    border-top: 1px dotted #ccc;
    padding-top: 10px;
}

#jdbcUrl>lable {
    width: 20% !important;
}

.testLinnk {
    text-align: center;
}

.testLinnk>span {
    font-size: 14px;
    color: #e84d45
}

.logseach {
    width: 25%;
    position: absolute;

    top: 18px;

    left: 160px;
}

.logseach>div>input {
    height: 20px;
}

#dataAcquisition>>>.el-dialog__header {
    border-bottom: 1px solid #f3f0f0;
}

.collTask>>>.el-dialog__body {
    padding: 0;
}

.btntop {
    margin: 10px 0;
}

.mailTable {
    width: 66%;
    margin: 0 auto;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-left: 1px solid #ccc;
    box-sizing: border-box;
}

.mailTable>tr>td:nth-child(1) {
    width: 25%;
    text-align: right;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    box-sizing: border-box;
    font-weight: bold;
    background-color: #eff3f6;
}

.mailTable>tr>td:nth-child(2) {
    width: 40%;
    text-align: left;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    box-sizing: border-box;
}
</style>
