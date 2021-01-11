<template>
    <div class='dataDashboardList'>
        <el-row class="elRows">
            <span>自主分析->数据仪表盘</span>
            <el-button type="primary" size='mini' class='creatPanelBtn' @click="creatPanel()">新建仪表盘</el-button>
            <el-button type="primary" size='mini' class='creatPanelBtn' @click="createLargeScreen()">新建大屏展示</el-button>
        </el-row>
        <el-table size='medium' :data="dataDashboardList" border style="width: 100%;">
            <el-table-column label="序号" type="index" width="50" align="left"></el-table-column>
            <el-table-column label="仪表板名称" prop='dashboard_name' align="left" show-overflow-tooltip></el-table-column>
            <el-table-column label="仪表板描述" prop='dashboard_desc' align="left" show-overflow-tooltip></el-table-column>
            <el-table-column label="仪表盘发布状态" prop='dashboard_status' width="120px" align="left"></el-table-column>
            <el-table-column label="创建日期" prop='create_date' align="left"></el-table-column>
            <el-table-column label="最后更新日期" prop='last_update_date' align="left"></el-table-column>
            <el-table-column label="操作" align="left">
                <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="releaseDashboardInfo(scope.row)">发布</el-button>
                    <el-button type="text" size="mini" v-if="!scope.row.iflargescreen"
                               @click="goToDashbaord(scope.row)">编辑仪表盘
                    </el-button>
                    <el-button type="text" size="mini" v-if="scope.row.iflargescreen"
                               @click="goToLargeScreen(scope.row)">查看大屏
                    </el-button>
                    <el-button type="text" size="mini" v-if="scope.row.iflargescreen"
                               @click="editLargeScreen(scope.row)">编辑大屏
                    </el-button>
                    <el-button type="text" size="mini" @click="deleteDashboardInfo(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="添加组件" :visible.sync="dialogAddComponentVisible" width="50%">
            <el-table :data="auto_comp_sum_array.slice((currPage - 1) * pageSize,currPage * pageSize)" border
                      style="width: 100%">
                <el-table-column width="55" align="center" prop="selectionstate">
                    <!--<template slot="header" slot-scope="scope">-->
                    <!--<el-checkbox @change="allCheck()" v-model="allchecked" :checked="allchecked"></el-checkbox>-->
                    <!--</template>-->
                    <template slot-scope="scope">
                        <el-checkbox :checked="scope.row.selectionstate"
                                     v-model="scope.row.selectionstate"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column label="序号" width="50px" align="left">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="component_name" label="组件名称" align="center"/>
                <el-table-column prop="component_desc" label="组件描述" align="center"/>
            </el-table>
            <!-- 分页内容 -->
            <el-row>
                <el-pagination @current-change="handleCurrentChangeList" :current-page="currPage"
                               @size-change="handleSizeChange" :page-sizes="[5, 10, 25, 50, 100,500]"
                               :page-size="pageSize" layout=" total,sizes,prev, pager, next,jumper" :total="totalSize"
                               class='locationcenter'/>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddComponentVisible = false" size="mini">取 消</el-button>
                <el-button type="primary" @click="addLargeScreen" size="mini">确 认
                </el-button>
            </div>
        </el-dialog>

        <el-dialog title="添加大屏展示" :visible.sync="dialogDashboardVisible" width="50%">
            <el-form label-width="160px">
                <el-form-item label="仪表盘名称">
                    <el-input v-model="large_dashboard_name"></el-input>
                </el-form-item>
                <el-form-item label="仪表盘描述">
                    <el-input v-model="large_dashboard_desc"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogDashboardVisible=false" size="mini">取 消</el-button>
                <el-button type="primary" @click="confirmLargeScreen" size="mini">确 认
                </el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as functionAll from "./dataDashboard";
    import * as fixedAll from "@/utils/js/fileOperations";

    export default {
        //TODO 还有页面回显的时候 大屏展示跳转问题
        data() {
            return {
                dataDashboardList: [],
                options: [],
                dialogAddComponentVisible: false,
                dialogDashboardVisible: false,
                auto_comp_sum_array: [],
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                selectRow2: "",
                large_dashboard_name: "",
                large_dashboard_desc: "",
                isadd: false,
                dashboard_id: "",
                component_id_list: [],
            }
        },
        mounted() {
            this.getCategoryItems();
            this.getDataDashboardInfo();
        },
        methods: {
            creatPanel() {
                this.$router.push({
                    path: '/dataDashboard',
                    query: {}
                })
            },
            createLargeScreen() {
                this.isadd = false;
                this.dialogAddComponentVisible = true;
                functionAll.getVisualComponentInfo({}).then(res => {
                    if (res && res.success) {
                        this.auto_comp_sum_array = res.data;
                        this.totalSize = res.data.length;
                    }
                })
            },
            cancel() {
                this.$refs.multipleComponent.clearSelection();
                this.dialogAddComponentVisible = false
            },
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
            },
            addLargeScreen() {
                this.component_id_list = [];
                for (var i = 0; i < this.auto_comp_sum_array.length; i++) {
                    var item = this.auto_comp_sum_array[i];
                    if (item.selectionstate) {
                        this.component_id_list.push(item.component_id);
                    }
                }
                if (this.component_id_list.length <= 0) {
                    this.$Msg.customizTitle('请至少选择一个组件', 'warning')
                } else {
                    if (this.isadd) {

                    }
                    this.dialogDashboardVisible = true;
                }
            },
            confirmLargeScreen() {
                if (!this.isadd) {
                    //新增保存
                    functionAll.saveLargeScreen({
                        component_id_list: this.component_id_list,
                        dashboard_name: this.large_dashboard_name,
                        dashboard_desc: this.large_dashboard_desc,
                    }).then(res => {
                        this.$router.push({
                            path: '/largeScreenDisplay_1',
                            query: {
                                "dashboard_id": res.data,
                                "dashboard_name": this.large_dashboard_name
                            }
                        })
                    });
                }else{
                    functionAll.updateLargeScreen({
                        dashboard_id:this.dashboard_id,
                        component_id_list: this.component_id_list,
                        dashboard_name: this.large_dashboard_name,
                        dashboard_desc: this.large_dashboard_desc,
                    }).then(res => {
                        this.$router.push({
                            path: '/largeScreenDisplay_1',
                            query: {
                                "dashboard_id": res.data,
                                "dashboard_name": this.large_dashboard_name
                            }
                        })
                    });
                }
                //跳转
            },
            // 获取代码项
            getCategoryItems() {
                functionAll.getCategoryItems({
                    category: 'IsFlag'
                }).then(res => {
                    this.options = res.data;
                })
            },
            //获取数据仪表盘首页数据展示
            getDataDashboardInfo() {
                functionAll.getDataDashboardInfo({}).then(res => {
                    if (res && res.success) {
                        res.data.forEach(item => {
                            if (item.create_date && item.create_time) {
                                item.create_date = fixedAll.dateToMilldate(item.create_date + " " + item.create_time);
                            }
                            if (item.last_update_date && item.last_update_time) {
                                item.last_update_date = fixedAll.dateToMilldate(item.last_update_date + " " + item.last_update_time);
                            }
                            this.options.forEach(val => {
                                if (item.dashboard_status == val.code) {
                                    item.dashboard_status = val.value;
                                }
                            })
                        })
                        this.dataDashboardList = res.data;

                    }
                })
            },
            //数据仪表盘发布
            releaseDashboardInfo(row) {
                this.$confirm('确认发布仪表盘(' + row.dashboard_name + ')吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    functionAll.releaseDashboardInfo({
                        "dashboard_id": row.dashboard_id,
                        "dashboard_name": row.dashboard_name
                    }).then(res => {
                        if (res && res.success) {
                            this.$Msg.customizTitle('发布成功，请到接口管理组件中配置权限', 'success');
                            this.getCategoryItems();
                            this.getDataDashboardInfo();
                        }
                    })
                })
            },
            // 跳转仪表盘页面
            goToDashbaord(row) {
                this.$router.push({
                    name: 'dataDashboard',
                    query: {
                        dashboard_id: row.dashboard_id,
                        dashboard_name: row.dashboard_name
                    }
                })
            },
            goToLargeScreen(row) {
                this.$router.push({
                    path: '/largeScreenDisplay_1',
                    query: {
                        "dashboard_id": row.dashboard_id,
                        "dashboard_name": row.dashboard_name
                    }
                })
            },
            //数据仪表盘删除
            deleteDashboardInfo(row) {
                this.$confirm('确认删除仪表盘(' + row.dashboard_name + ')吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    functionAll.deleteDashboardInfo({
                        "dashboard_id": row.dashboard_id
                    }).then(res => {
                        if (res && res.success) {
                            this.$Msg.customizTitle('删除成功', 'success');
                            this.getCategoryItems();
                            this.getDataDashboardInfo();
                        }
                    })
                })
            },
            editLargeScreen(row) {
                this.isadd = true;
                this.dashboard_id = row.dashboard_id;
                this.large_dashboard_name = row.dashboard_name;
                this.large_dashboard_desc = row.dashboard_desc;
                this.dialogAddComponentVisible = true;
                functionAll.getLargeScreenComponentInfoByDashboardId({
                    "dashboard_id": row.dashboard_id
                }).then(res => {
                    if (res && res.success) {
                        this.auto_comp_sum_array = res.data;
                        this.totalSize = res.data.length;
                    }
                })
            },
        }
    }
</script>

<style scoped>
    .creatPanelBtn {
        float: right;
        margin: 0 10px 10px 0;
    }

    .elRows {
        height: 40px;
        line-height: 40px;
        width: 100%;
    }

    .el-row span {
        color: #2196f3;
        font-size: 18px;
    }

    .el-table-column {
        height: 49px;
    }
</style>
