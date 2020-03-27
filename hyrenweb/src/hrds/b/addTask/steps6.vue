<template>
<div id='steps6'>
    <Step :active="active"></Step>
    <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="30%" class="startupform">
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <el-form-item label="工程编号" prop="Project_num" :rules="filter_rules([{required: true}])">
                    <el-col :span="16">
                        <el-input v-model="ruleForm.Project_num" size="medium" disabled placeholder="工程编号">
                            <el-button slot="append" icon="el-icon-zoom-in" @click="Projectnumdialog=true"></el-button>
                        </el-input>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="任务编号" prop="work_num" :rules="filter_rules([{required: true}])">
                    <el-col :span="16">
                        <el-input v-model="ruleForm.work_num" size="medium" disabled placeholder="任务编号">
                            <el-button slot="append" icon="el-icon-zoom-in"  @click="getwork_numFun()"></el-button>
                        </el-input>
                    </el-col>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="作业程序类型" prop="work_type" :rules="rule.default">
                    <el-col :span="16">
                        <el-input v-model="ruleForm.work_type" size="medium" disabled placeholder="作业程序类型"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <el-form-item label="作业程序名称" prop="work_name">
                    <el-col :span="16">
                        <el-input v-model="ruleForm.work_name" size="medium" disabled></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="调度频率" prop="Dispatching_frequency" :rules="rule.default">
                    <el-col :span="16">
                        <el-select style="width:100%" v-model="ruleForm.Dispatching_frequency" placeholder="频率选择" clearable size="medium" @change="Dispatching_frequencyFun">
                            <el-option v-for="item in Dispatch_Frequency" :key="item.value" :label="item.value" :value="item.code">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="8" prop="database_pad">
                <el-form-item label="作业优先级" :rules="filter_rules([{required: true}])" prop="work_pro">
                    <el-col :span="16">
                        <el-input v-model="ruleForm.work_pro" size="medium" placeholder="0" @change="getwork_proFun"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="8">
                <el-form-item label="调度触发方式" prop="Dispatching_mode" :rules="filter_rules([{required: true,dataType:'port_verification'}])">
                    <el-col :span="16">
                        <el-select style="width:100%" v-model="ruleForm.Dispatching_mode" @change="Dispatching_modeFun" placeholder="调度触发方式选择" clearable>
                            <el-option v-for="item in Dispatching_mode" :key="item.value" :label="item.value" :value="item.code">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="8" v-if="TandZ=='1'">
                <el-form-item label="调度触发时间" :rules="rule.default" prop="Dispatching_time">
                    <el-col :span="16">
                        <el-time-picker style="width:100%" v-model="ruleForm.Dispatching_time" @change="getDispatching_timeFun" :picker-options="{selectableRange: '00:00:00 - 23:59:59'}" placeholder="调度时间 hh:mm:ss" value-format="HH:mm:ss" format="HH:mm:ss">
                        </el-time-picker>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="8" v-else-if="TandZ=='2'">
                <el-form-item label="上游作业" :rules="rule.default" prop="Upstream_operation">
                    <el-col :span="16">
                        <el-select style="width:100%" v-model="ruleForm.Upstream_operation" multiple placeholder="上游作业" @change="getUpstream_operationFun">
                            <el-option v-for="item in preJobName" :key="item.value" :label="item.value" :value="item.code">
                            </el-option>
                        </el-select>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="8" v-else>
            </el-col>
             <el-col :span="8">
                <el-form-item label="调度时间位移" prop="Dispatching_timedrift" :rules="filter_rules([{required: true}])" v-show="TandZ=='1'">
                    <el-col :span="16">
                        <el-input v-model="ruleForm.Dispatching_timedrift" @change="getDispatching_timedriftFun" size="medium" placeholder="0"></el-input>
                    </el-col>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row type="flex" justify="center">
            <el-col :span="10">
                <el-form-item label="作业程序目录" prop="work_path" :rules="rule.selected" class='ml_lable'>
                    <el-col :span="24">
                        <el-input v-model="ruleForm.work_path" placeholder="作业程序目录" size="medium">
                        </el-input>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="12">
                 <el-form-item label="日志目录" prop="log_path" :rules="rule.selected" class='ml_lable'>
                    <el-col :span="24">
                        <el-input v-model="ruleForm.log_path" placeholder="日志目录" size="medium">
                        </el-input>
                    </el-col>
                </el-form-item>
            </el-col>
            <el-col :span="4"></el-col>
        </el-row>
        
    </el-form>
    <el-form ref="ruleForm" :model="ruleForm" class="steps4">
        <el-table :header-cell-style="{background:'#e6e0e0'}" ref="filterTable" stripe :empty-text="tableloadingInfo" :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" size="medium" border :data="ruleForm.startuptableData.slice((currentPage - 1) * pagesize, currentPage *pagesize)">
            <el-table-column label="序号" align="center" width="60">
                <template scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="work_name" label="作业名称" width="110" align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.work_name" placeholder="作业名称" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="work_desc" label="作业描述"  align="center" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.work_desc" type="textarea" placeholder="作业描述" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="Dispatching_frequency" label="调度频率" align="center" :show-overflow-tooltip="true">
              <template slot-scope="scope">
                    <el-input v-model="scope.row.Dispatching_frequency"  placeholder="调度频率" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="work_pri" label="作业优先级" align="center" :show-overflow-tooltip="true">
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.work_pri"  placeholder="作业优先级" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="Dispatching_timedrift" label="调度时间位移" align="center" :show-overflow-tooltip="true" v-if="TandZ==='1'">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.Dispatching_timedrift"  placeholder="调度时间位移" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="Scheduling_trigger_time" label="调度触发时间" align="center" :show-overflow-tooltip="true" v-if="TandZ==='1'">
                 <template slot-scope="scope">
                    <el-input v-model="scope.row.Scheduling_trigger_time"  placeholder="调度触发时间" size="mini"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="Upstream_operation" label="上游作业" align="center" :show-overflow-tooltip="true" v-if="TandZ==='2'">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.Upstream_operation"  placeholder="上游作业" size="mini"></el-input>
                </template>
            </el-table-column>
        </el-table>
    </el-form>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, prev, pager, next" :total="ruleForm.startuptableData.length" class="locationright"></el-pagination>
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">完成</el-button>
    <!-- 选择工程编号 -->
    <el-dialog title="选择工程编号" :visible.sync="Projectnumdialog">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择工程编号</span>
        </div>
        <el-table :empty-text="tableloadingInfo" :data="ProjectnumData.slice((ProjectnumcurrentPage - 1) * Projectnumpagesize, ProjectnumcurrentPage * Projectnumpagesize)" border size="medium" highlight-current-row>
            <el-table-column property label="选择" width="60px" type="index" align="center">
                <template slot-scope="scope">
                    <el-radio v-model="projnum_radio" :label="scope.row">&thinsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column property label="序号" width="60px" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(ProjectnumcurrentPage - 1) * Projectnumpagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="proj_num" label="工程编号" align="center"></el-table-column>
            <el-table-column property="proj_name" label="工程名称" align="center"></el-table-column>
        </el-table>
        <el-pagination @size-change="Projectnum_handleSizeChange" @current-change="Projectnum_handleCurrentChange" :current-page.sync="ProjectnumcurrentPage" :page-size="Projectnumpagesize" layout="total, prev, pager, next" :total="ProjectnumData.length" class="locationright"></el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini" @click="projNumSubmitFun()">确定</el-button>
        </div>
    </el-dialog>
    <!-- 选择任务编号 -->
    <el-dialog title="选择任务编号" :visible.sync="Worknumdialog" width="40%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">选择任务编号</span>
            <span class="dialogtoptxt">
                工程名称:
                <p class="dialogtopname">000</p>
            </span>
        </div>
        <el-table :empty-text="tableloadingInfo" :data="WorknumData.slice((WorknumcurrentPage - 1) * Worknumpagesize, WorknumcurrentPage * Worknumpagesize)" border size="medium" highlight-current-row>
            <el-table-column property label="选择" width="60px" type="index" align="center">
                <template slot-scope="scope">
                    <el-radio v-model="worknum_radio" :label="scope.row.work_id">&thinsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column property label="序号" width="60px" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(WorknumcurrentPage - 1) * Worknumpagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="work_num" label="任务编号" align="center"></el-table-column>
            <el-table-column property="work_name" label="任务名称" align="center"></el-table-column>
        </el-table>
        <el-pagination @size-change="Worknum_handleSizeChange" @current-change="Worknum_handleCurrentChange" :current-page.sync="WorknumcurrentPage" :page-size="Worknumpagesize" layout="total, prev, pager, next" :total="WorknumData.length" class="locationright"></el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button type="danger" size="mini">取 消</el-button>
            <el-button type="primary" size="mini">确定</el-button>

        </div>
    </el-dialog>
    <!--完成  -->
    <el-dialog title="提示信息" :visible.sync="finishDialogVisible" width="30%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">提示信息</span>
        </div>
        <span>设置完成！请等待Agent运行...不运行请点击取消或按下Esc键</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="finishDialogVisible = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="finishSubmit()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import Step from "./step";
import * as sendTask from "./addTask"
import Loading from '../../components/loading'
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
export default {
    components: {
        Step,
        Loading
    },
    data() {
        return {
            active: 5,
            isLoading: false,
            dbid: null,
            aId: null,
            sourId: null,
            sName: null,
            currentPage: 1,
            pagesize: 100,
            ProjectnumcurrentPage: 1,
            Projectnumpagesize: 10,
            WorknumcurrentPage: 1,
            Worknumpagesize: 10,
            finishDialogVisible: false,
            Projectnumdialog: false,
            Worknumdialog: false,
            tableloadingInfo: '数据加载中...',
            rule: validator.default,
            ruleForm: {
                Project_num: "",
                work_num: "",
                work_type: "",
                work_name: "",
                work_path: "",
                log_path: "",
                Dispatching_frequency: "",
                Dispatching_timedrift: "",
                Dispatching_time: "",
                work_pro: "",
                Upstream_operation: '', //上游作业
                startuptableData: [{
                        work_name: '2',
                        work_desc: '2',
                        Dispatching_frequency: '2',
                        Dispatching_timedrift: '0',
                        work_pri: '0',
                        Scheduling_trigger_time: '2',
                        Upstream_operation: '2'
                    },
                    {
                        work_name: '2',
                        work_desc: '2',
                        Dispatching_frequency: '2',
                        Dispatching_timedrift: '0',
                        work_pri: '0',
                        Scheduling_trigger_time: '2',
                        Upstream_operation: '2'
                    }
                ]

            },
            Dispatch_Frequency: [], //调度频率
            Dispatching_mode: [], //调度触发方式
            ProjectnumData: [{
                    proj_id: '1',
                    proj_num: '111',
                    proj_name: 'name',
                },
                {
                    proj_id: '12',
                    proj_num: '111',
                    proj_name: 'name',
                }
            ], //工程编号数据
            projnum_radio: {}, //工程编号选择radio
            WorknumData: [{
                proj_id: '1',
                work_num: '22',
                work_name: 'namename',
            }, {
                proj_id: '2',
                work_num: '222',
                work_name: 'namename',
            }], //工程编号数据
            worknum_radio: '',
            Pro_Type: [], //作业程序类型
            preJobName: [], //上游作业名称
            TandZ: '0',
        };
    },
    created() {
        this.dbid = this.$route.query.id;
        this.aId = this.$route.query.agent_id;
        this.sourId = this.$route.query.source_id;
        this.sName = this.$Base64.decode(this.$route.query.source_name);

    },
    mounted() {
        //Dispatch_Frequency
        this.getPreJobName() //获取上游作业名称
        // 调度频率
        this.$Code.getCategoryItems({
            'category': 'Dispatch_Frequency'
        }).then(res => {
            if (res.data) {
                this.Dispatch_Frequency = res.data;
            }
        });
        // 调度触发方式
        this.$Code.getCategoryItems({
            'category': 'Dispatch_Type'
        }).then(res => {
            if (res.data) {
                this.Dispatching_mode = res.data;
                console.log(res.data)
            }
        });
        // 作业程序类型
        this.$Code.getCategoryItems({
            'category': 'Pro_Type'
        }).then(res => {
            if (res.data) {
                this.Pro_Type = res.data;
                console.log(res.data)
            }
        });
    },
    methods: {
        next() {
            this.active = 6;
            this.finishDialogVisible = true
        },
        pre() {
            let data = {}
            if (this.$route.query.edit == 'yes') {
                data = {
                    agent_id: this.aId,
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$Base64.encode(this.sName),
                    edit: "yes"
                }
            } else {
                data = {
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$Base64.encode(this.sName),
                }
            }
            this.$router.push({
                path: "/collection1_4",
                query: data
            });
        },
        finishSubmit() {
            this.finishDialogVisible = false
            sendTask.sendDBCollctTaskById({
                colSetId: this.dbid
            }).then(res => {
                if (res.success) {
                    this.$router.push({
                        path: "/agentList"
                    });
                }
            })
        },
        handleSizeChange() {},
        handleCurrentChange() {},
        Projectnum_handleSizeChange() {},
        Projectnum_handleCurrentChange() {},
        Worknum_handleSizeChange() {},
        Worknum_handleCurrentChange() {},
        //触发方式改变
        Dispatching_modeFun(key) {
            console.log(key, this.ruleForm.Dispatching_mode)
           
            let value = this.getDispatching_modeValueFun(key)
            if (key == 'T' || key == 'Z') {
                this.TandZ = '1'
            this.ruleForm.Upstream_operation = ''
                this.ruleForm.startuptableData.forEach((item) => {
                    item.workUpstream_operation_pri = ''
                })
            } else if (key == 'D') {
                this.TandZ = '2'
                 this.ruleForm.Dispatching_timedrift = ''
            this.ruleForm.Dispatching_time = ''
                this.ruleForm.startuptableData.forEach((item) => {
                    item.Scheduling_trigger_time = ''
                    item.Dispatching_timedrift = ''
                })
            }
        },
        //通过触发方式key值遍历得到中文value值
        getDispatching_modeValueFun(key) {
            this.Dispatching_mode.forEach((item) => {
                console.log(item)
                if (item.code == key) {
                    return item.value
                }
            })
        },
        // 获取上游作业下拉
        getPreJobName() {
            let arr = [];
            sendTask.searchEtlJob({
                'etl_sys_cd': 'A1'
            }).then(res => {
                res.data.forEach((item) => {
                    arr.push({
                        'value': item,
                        'code': item
                    });
                });
                this.preJobName = arr;
            });
        },
        // 选择工程弹框确定
        projNumSubmitFun() {
            this.ruleForm.Project_num = this.projnum_radio.proj_num
            this.ruleForm.work_num = ''
            this.ruleForm.work_type = "",
                this.ruleForm.work_name = "",
                this.Projectnumdialog = false
        },
        //点击任务编号按钮
        getwork_numFun() {
            this.Worknumdialog = true
            //调接口显示内容
        },
        // 调度频率改变时
        Dispatching_frequencyFun() {
            console.log(this.ruleForm.Dispatching_frequency)
            let code = this.ruleForm.Dispatching_frequency
            this.Dispatch_Frequency.forEach((item) => {
                if (item.code == code) {
                    this.getstartuptableData(item.value)
                }
            })
        },
        //遍历全表改变对应列值--调度频率
        getstartuptableData(key) {
            this.ruleForm.startuptableData.forEach((item) => {
                item.Dispatching_frequency = key
            })
        },
        // 作业优先级发生改变
        getwork_proFun() {
            let value = this.ruleForm.work_pro
            this.ruleForm.startuptableData.forEach((item) => {
                item.work_pri = value
            })
        },
        //上游作业改变
        getUpstream_operationFun() {
            console.log(this.ruleForm.Upstream_operation)
            let value = ''
            for (let i = 0; i < this.ruleForm.Upstream_operation.length; i++) {
                if (i == this.ruleForm.Upstream_operation.length - 1) {
                    value += this.ruleForm.Upstream_operation[i]

                } else {
                    value += this.ruleForm.Upstream_operation[i] + ','

                }
            }
            this.ruleForm.startuptableData.forEach((item) => {
                item.Upstream_operation = value
            })
        },
        // 调度时间发生改变
        getDispatching_timeFun() {
            let value = this.ruleForm.Dispatching_time
            this.ruleForm.startuptableData.forEach((item) => {
                item.Scheduling_trigger_time = value
            })
        },
        // 调度时间位移发生改变时
        getDispatching_timedriftFun() {
            let value = this.ruleForm.Dispatching_timedrift
            this.ruleForm.startuptableData.forEach((item) => {
                item.Dispatching_timedrift = value
            })
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

.startupform {
    border: 1px solid #efebeb;
    padding: 14px 0 0 10px;
    margin: 12px 0;
    border-radius: 4px;
}

.startupform>>>.el-input-group__prepend {
    background-color: #E6A23C;
    color: white;
}
.ml_lable>>>.el-form-item__label{
    width:26% !important;
}
.ml_lable>>>.el-form-item__content{
        margin-left: 26% !important;
}
</style>
