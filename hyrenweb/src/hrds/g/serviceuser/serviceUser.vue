<template>
    <div class="interfaceInfo">
        <el-row class="borderStyle">
            <el-col :span="13">
                <el-button class="elButton" type="info" icon="el-icon-s-data">
                    <p class="textUse">数据使用信息</p>
                </el-button>
            </el-col>
            <el-col :span="11">
                <el-button class="elButton" type="info" icon="el-icon-s-operation">
                    <p class="textUse">接口使用信息</p>
                </el-button>
            </el-col>
        </el-row>
        <el-divider/>
        <el-row>
            <i class="el-icon-s-operation"><span>接口使用信息</span></i>
            <router-link to="/interfaceTest">
                <el-button type="success" size="mini">接口测试</el-button>
            </router-link>
            <el-input placeholder="请输入接口名称" clearable v-model="interface_name" class="input-with-select">
                <el-button slot="append" @click="searchInterfaceInfo" icon="el-icon-search">查询
                </el-button>
            </el-input>
        </el-row>
        <el-divider/>
        <!--接口使用信息列表展示-->
        <el-table :data="interfaceUseData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                  border style="width: 100%">
            <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="interface_name" label="接口名称" align="center"/>
            <el-table-column prop="start_use_date" label="开始使用日期" align="center"/>
            <el-table-column prop="use_valid_date" label="结束使用日期" align="center"/>
            <el-table-column label="接口使用API查看" align="center" prop="interface_name">
                <template slot-scope="scope">
                    <router-link
                            :to="{path:scope.row.url,query:{interface_use_id:scope.row.interface_use_id,
                            url:scope.row.url}}" :key="scope.row.interface_use_id">
                        <el-button size="medium" type="text" class='editcolor'>
                            {{scope.row.interface_name}}
                        </el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页内容 -->
        <el-row class="pagination">
            <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage"
                           @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]"
                           :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper"
                           :total="totalSize" class='locationcenter'/>
        </el-row>
        <el-divider/>
        <el-row>
            <i class="el-icon-s-data"><span>数据使用信息</span></i>
            <el-input placeholder="请输入表名称" clearable v-model="sysreg_name" class="input-data-select">
                <el-button slot="append" @click="searchDataTableInfo" icon="el-icon-search">查询</el-button>
            </el-input>
        </el-row>
        <el-divider/>
        <!--数据使用信息列表展示-->
        <el-table :data="dataUseData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                  border style="width: 100%">
            <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sysreg_name" label="表名称" align="center"/>
            <el-table-column prop="original_name" label="表中文名称" align="center"/>
            <el-table-column label="表列信息查看" align="center">
                <template slot-scope="scope">
                    <el-button size="medium" type="text" class='editcolor'
                               @click="searchColumnInfoById(scope.row)">
                        表字段查看
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页内容 -->
        <el-row class="pagination">
            <el-pagination @current-change="handleCurrentChangeList" :current-page="currDataPage"
                           @size-change="handleSizeChange" :page-sizes="[5, 10, 50, 100,500]"
                           :page-size="pageDataSize" layout=" total,sizes,prev, pager, next,jumper"
                           :total="totalDataSize" class='locationcenter'/>
        </el-row>
        <!--查看字段弹出框-->
        <el-dialog title="表列名信息" :visible.sync="dialogViewFieldFormVisible"
                   :before-close="beforeViewFieldClose">
            <el-table :data="filedData" border style="width: 100%">
                <el-table-column label="序号" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="table_column_name" label="字段名" align="center"/>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" size="mini" @click="dialogViewFieldFormVisible = false">
                    确 认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./serviceUser";
    import * as validator from "@/utils/js/validator";

    export default {
        //写定义的变量数据方法等
        data() {
            return {
                rule: validator.default,
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                currDataPage: 1,
                pageDataSize: 10,
                totalDataSize: 0,
                tableData: [],
                interfaceUseData: [],
                dataUseData: [],
                filedData: [],
                dialogViewFieldFormVisible: false,
                interface_name: "",
                sysreg_name: "",
                tokenData: {
                    interface_use_id: 0,
                    interface_name: '获取token值接口',
                    start_use_date: '-',
                    use_valid_date: '-',
                    url: 'getToken'
                }
            }
        },
        mounted() {
            this.searchDataTableInfo();
            this.searchInterfaceInfo()
        },
        methods: {
            // 查询数据使用信息
            searchDataTableInfo() {
                interfaceFunctionAll.searchDataTableInfo({"sysreg_name": this.sysreg_name}).then(res => {
                    this.dataUseData = res.data;
                    this.totalDataSize = res.data.length;
                })
            },
            // 查询接口使用信息
            searchInterfaceInfo() {
                interfaceFunctionAll.searchInterfaceInfo({"interface_name": this.interface_name}).then(res => {
                    this.interfaceUseData = res.data;
                    // 添加到第一行
                    this.interfaceUseData.unshift(this.tokenData);
                    this.totalSize = this.interfaceUseData.length;
                })
            },
            // 根据表使用ID查询当前用户对应的列信息
            searchColumnInfoById(row) {
                this.dialogViewFieldFormVisible = true;
                interfaceFunctionAll.searchColumnInfoById({"use_id": row.use_id}).then(res => {
                    this.filedData = res.data;
                })
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
            beforeViewFieldClose() {
                this.dialogViewFieldFormVisible = false;
            },
        }
    }
</script>
<style scoped>
    .borderStyle {
        border: 1px solid #e6e6e6;
        padding: 2%;
        width: 100%;
        margin-bottom: 20px;
    }

    .elButton {
        margin-left: 200px;
        margin-right: 60px;
        width: 160px;
        height: 110px;
        text-align: center;
        font-size: 50px;
    }

    .textUse {
        text-align: center;
        font-size: 20px;
        margin-top: 10px;
    }

    .el-icon-s-operation {
        margin-bottom: 10px;
        margin-right: 10px;
        font-size: 16px;
        text-align: center;
        color: #2196f3;
    }

    .el-icon-s-data {
        margin-bottom: 10px;
        margin-right: 10px;
        font-size: 16px;
        text-align: center;
        color: #2196f3;
    }

    .input-with-select {
        margin-left: 735px;
        width: 360px;
    }

    .input-data-select {
        margin-left: 820px;
        width: 360px;
    }

    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }
</style>