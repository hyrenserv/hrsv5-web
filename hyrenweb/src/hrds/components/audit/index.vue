<template>
<div id='bbgl'>
    <el-dialog title="审计详情" :visible.sync="dialogFormAudit" width="70%" :before-close="beforeClose">
        <el-row class='topTitle'>
            <span class='el-icon-location'>贴源层表信息导入-H_ceshioracl -审核</span>
            <el-button type="info" size="mini" @click="dialogFormAudit = false" style="position: relative;float: right;">取消</el-button>
            <el-button type="success" size="mini" style="position: relative;float: right;right: 20px;">审批</el-button>
        </el-row>
        <el-row>
            <el-col style="text-align: left;">基本信息</el-col>
            <el-table stripe size="mini" border>
                <el-table-column label="表名" align="center" show-overflow-tooltip>
                    <template>
                        agent_info
                    </template>
                </el-table-column>
                <template>
                    <el-table-column label="表中文名" align="center" show-overflow-tooltip>
                        <p>表中文名称：【Agent信息表】</p>
                        <p>修改：【测试Agent信息表】</p>
                    </el-table-column>
                </template>
                <template>
                    <el-table-column label="表描述" align="center" show-overflow-tooltip>
                        <p>表描述：【-】</p>
                        <p>修改：【记录客户信息历史表，主要将客户的基本信息进行保存】</p>
                    </el-table-column>
                </template>
                <template>
                    <el-table-column label="表字段" align="center" show-overflow-tooltip>
                        <p>字段：【agent_id】类型:【varchar(20)】修改: 类型【varchar(30)】 </p>
                        <p>修改：【定长】</p>
                    </el-table-column>
                </template>
                <template>
                    <el-table-column label="表卸数方式" align="center" show-overflow-tooltip>
                        <p>原卸数方式：【CSV】</p>
                        <p>修改：【定长】</p>
                    </el-table-column>
                </template>
                <!-- <br />
                                删除：【DOWN_ID】、【AGENT_NAME】字段信息
                                <br />
                                新增：AGENT_ID/agentID/varchar(10)
                                LOG_DIR/日志目录信息/varchar(1000)
                                <br />
                                修改：PASSWD类型由【varchar(10)】修改为【varchar（200）】
                                USER_ID中文由【-】修改为【用户id信息】 -->
            </el-table>
        </el-row>
        <el-row>
            <!-----------------------------表影响开始--------------------------->
            <el-col style="text-align: left;">对表的影响</el-col>
            <el-row>
                <div id="jsmind_table" :style="{width: '100%', height: '500px'}"></div>
            </el-row>
            <!-----------------------------表影响结束--------------------------->
        </el-row>
        <el-row>
            <!-----------------------------表作业影响开始--------------------------->
            <el-col style="text-align: left;">对上下游作业影响</el-col>
            <div id="jsmind_job" :style="{width: '100%', height: '500px'}"></div>
            <!-----------------------------表作业影响结束--------------------------->
        </el-row>
    </el-dialog>
</div>
</template>

<script>
import jsMind from 'jsmind';
require('@/assets/css/jsmind.css');
let _jm = null;
export default {
    props: ['dialogFormAudit', 'excelAuditData'],
    data() {
        return {
            showOrHidden: false,
        }
    },
    mounted() {
        // console.log(this.excelAuditData);
        setTimeout(()=>{this.load_jsmind()},500)
    },
    methods: {
        // 关闭弹框之前
        beforeClose() {
            this.dialogFormAudit = false;
            this.excelAuditData = [];
        },
        load_jsmind: function () {
            var mind = {
                'meta': {
                    'name': 'demo',
                    'author': 'hizzgdev@163.com',
                    'version': '0.2'
                },
                'format': 'node_array',
                'data': [{
                        'id': 'root',
                        'isroot': true,
                        'topic': 'jsMind'
                    },
                    {
                        'id': 'sub1',
                        'parentid': 'root',
                        'topic': 'sub1',
                        'background-color': '#0000ff'
                    },
                    {
                        'id': 'sub11',
                        'parentid': 'sub1',
                        'topic': 'sub11'
                    },
                    {
                        'id': 'sub12',
                        'parentid': 'sub1',
                        'topic': 'sub12'
                    },
                    {
                        'id': 'sub13',
                        'parentid': 'sub1',
                        'topic': 'sub13'
                    },
                    {
                        'id': 'sub2',
                        'parentid': 'root',
                        'topic': 'sub2'
                    },
                    {
                        'id': 'sub21',
                        'parentid': 'sub2',
                        'topic': 'sub21'
                    },
                    {
                        'id': 'sub22',
                        'parentid': 'sub2',
                        'topic': 'sub22',
                        'foreground-color': '#33ff33'
                    },
                    {
                        'id': 'sub3',
                        'parentid': 'root',
                        'topic': 'sub3'
                    }
                ]
            }
            var options = {
                container: 'jsmind_table',
                editable: true,
                theme: 'primary'
            }
            var jm = jsMind.show(options, mind)
            // jm.set_readonly(true);
            // var mind_data = jm.get_data();
            // // alert(mind_data);
            // jm.add_node('sub2', 'sub23', 'new node', {
            //     'background-color': 'red'
            // })
            // jm.set_node_color('sub21', 'green', '#ccc')
        }
    }
}
</script>

<style scoped>

</style>
