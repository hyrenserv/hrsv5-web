<template>
<div>
    <el-row class='topTitle'>
        <span class='el-icon-location'>表数据对标</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row class="rowDioloag">
        <el-col :span="7" class="colContent">
            <el-tree :data="data2" show-checkbox>
            </el-tree>
        </el-col>
        <el-col :span="16" class="colTableContent" :offset="1">
            <el-table :data="tableData" border stripe size="medium">
                <el-table-column width="100" align="center" prop="selectionState">
                    <template slot="header" slot-scope="scope">
                        <el-checkbox></el-checkbox>&nbsp;选择
                    </template>
                    <template slot-scope="scope">
                        <el-checkbox :checked="scope.row.selectionState" v-model="scope.row.selectionState"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="序号" align="center" width="60">
                    <template scope="scope">
                        <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="EName" label="表英文名" align="center">
                </el-table-column>
                <el-table-column prop="cName" label="表中文名" align="center">
                </el-table-column>
            </el-table>
            <el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" style='    text-align: center;
    margin-top: 10px;'></el-pagination>
            <el-row style="
    margin-top: 30px;">
                <el-col :span="7" style="     background: rgba(233, 243, 192, 0.51);
    padding: 5px;
    border-radius: 5px;
    min-height: 140px;
    margin-right: 32px;
    position: relative;">
                    <el-checkbox></el-checkbox> <span class='duibiaostyle'> 数据分析</span>
                    <div style='    padding-left: 19px;
    font-size: 16px;color:#4d5052'>
                        <el-row>
                            <el-checkbox></el-checkbox> 数据类型探索
                        </el-row>
                        <el-row>
                            <el-checkbox></el-checkbox> 银标分类
                        </el-row>
                        <el-row>
                            <el-checkbox></el-checkbox> 主键探索
                        </el-row>
                        <el-row>
                            <el-checkbox></el-checkbox> 外键探索
                        </el-row>
                    </div>
                    <div style="    position: absolute;
    top: 40%;
    right: -28px;
    font-size: 24px;
    color: rgb(177, 212, 41);"><i class='el-icon-right'></i></div>
                </el-col>
                <el-col :span="7" style="    background: rgba(204, 232, 210, 0.5);
    padding: 5px;
    border-radius: 5px;
    min-height: 140px;
    margin-right: 32px;
    position: relative;">
                    <el-checkbox></el-checkbox> <span class='duibiaostyle'> 维度划分</span>
                    <div style="    position: absolute;
    top: 40%;
    right: -28px;
    font-size: 24px;
    color: rgb(177, 212, 41);"><i class='el-icon-right'></i></div>
                </el-col>
                <el-col :span="7" style=" background: rgba(226, 209, 209, 0.52);
    padding: 5px;
    border-radius: 5px;
    min-height: 140px;">
                    <el-checkbox></el-checkbox> <span class='duibiaostyle'> 数据血缘</span>
                </el-col>
            </el-row>
            <!--   <el-row style="
    margin-top: 30px;">
                <el-col  style="    background: #e9f3c0;
    padding: 5px;
    border-radius: 5px;
    min-height: 50px;
    margin-right: 32px; line-hright:50px;">
                    <el-checkbox></el-checkbox> <span class='duibiaostyle'> 数据分析</span>
                    <div style='    padding-left: 19px;
    font-size: 16px;color:#4d5052'>
                        <el-row>
                            <el-col :span='6' style="    text-align: center;">
                            <el-checkbox></el-checkbox> 数据类型探索</el-col>
                             <el-col :span='6'  style="    text-align: center;"><el-checkbox></el-checkbox> 银标分类</el-col>
                             <el-col :span='6'  style="    text-align: center;"><el-checkbox></el-checkbox> 主键探索</el-col>
                             <el-col :span='6'  style="    text-align: center;"><el-checkbox></el-checkbox> 外键探索</el-col>
                        </el-row>
                    </div>
                </el-col>
                <el-col  style="background: #cce8d2;
    padding: 5px;
    border-radius: 5px;
    min-height: 50px;
    margin-right: 32px;
    margin-top:5px;margin-bottom:5px;
    line-hright:50px;
    ">
                    <el-checkbox></el-checkbox> <span class='duibiaostyle'> 维度划分</span>
                </el-col>
                <el-col style="    background: #e2d1d1;
    padding: 5px;
    border-radius: 5px;
    min-height: 50px; line-hright:50px;">
                    <el-checkbox></el-checkbox> <span class='duibiaostyle'> 数据血缘</span>
                </el-col>
            </el-row> -->
            <el-row>
                <el-col style="color: red;margin-top: 10px;">
                    备注：
                </el-col>
                <el-col style="color: red;padding-left:30px;font-size:14px">
                    1：如果选择数据分析，即会显示数据分析下的四个选项(数据类型探索/银标分类/主键探索/外键探索)供选择；
                </el-col>
                <el-col style="color: red;padding-left:30px;font-size:14px">
                    2：如果选择了维度划分、数据血缘，则数据分析必选，且数据分析下的四个选项必选
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button @click="Select" size="medium" type="primary">对标<i class="el-icon-right"></i></el-button>
    </div>

</div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            pagesize: 5,
            data2: [{
                label: '贴源层',
                children: [{
                    label: '批量数据',
                    children: [{
                            label: 'TBH'
                        },
                        {
                            label: '南通政务中心',
                            children: [{
                                    label: 'agent_down_info'
                                },
                                {
                                    label: 'agent_info'
                                },
                                {
                                    label: 'auto_areastyle'
                                },
                                {
                                    label: 'auto_asso_info'
                                },
                                {
                                    label: 'agent_relation_site'
                                },
                            ]
                        }
                    ]
                }]
            }, {
                label: '加工层',
                children: [{
                    label: '加工层-1',
                    children: [{
                        label: '加工层-1-1'
                    }]
                }, {
                    label: '加工层-2',
                    children: [{
                        label: '加工层-2-1'
                    }]
                }]
            }, {
                label: '集市层',
                children: [{
                    label: '集市层-1',
                    children: [{
                        label: '集市层-1-1'
                    }]
                }, {
                    label: '集市层-2',
                    children: [{
                        label: '集市层2-1'
                    }]
                }]
            }],
            tableData: [{
                selectionState: false,
                EName: "agent_down_info",
                cName: "agent下载",
            }, {
                selectionState: false,
                EName: "agent_info",
                cName: "agent信息",
            }, {
                selectionState: false,
                EName: "auto_areastyle",
                cName: "样式表",
            }, {
                selectionState: false,
                EName: "auto_asso_info",
                cName: "信息表",
            }, {
                selectionState: false,
                EName: "agent_relation_site",
                cName: "设置表",
            }]
        }
    },
    methods: {
        Select() {
            this.$router.push({
                name: 'Databenchmarking'
            })
        }
    }
}
</script>

<style scoped>
.rowDioloag {
    padding: 2%;
    width: 100%;
    border: 1px solid #e6e6e6;
    margin-top: 10px;
}

.dialog-footer {
    float: right;
    margin-top: 10px;
}

.duibiaostyle {
    font-size: 16px;
    font-weight: bold;
    color: #4d5052;
    padding-left: 2px;
}
</style>
