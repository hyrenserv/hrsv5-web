<template>
    <div class="releaseManage">
        <el-row>
            <i class="el-icon-menu">接口功能类</i>
            <router-link to="/serviceMage">
                <el-button type="primary" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-divider/>
        <el-form ref="form" :inline=true :model="form" label-width="100px" size="medium">
            <el-row>
            <span class="fontStyle">接口功能设置
                <el-button class="button-save" type="success" size="mini"
                           @click="saveInterfaceUseInfo('form')">保存
                </el-button>
            </span>
            </el-row>
            <el-divider/>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="用户名称" :rules="filter_rules([{required: true}])">
                        <el-select v-model="form.user_id" multiple filterable clearable placeholder="请选择">
                            <el-option
                                    v-for="item in userData"
                                    :label="item.user_name"
                                    :value="item.user_id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="分类名称">
                        <el-input v-model="form.classify_name" placeholder="分类名称"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="开始日期" :rules="filter_rules([{required: true}])">
                        <el-date-picker type="date" placeholder="开始日期" value-format="yyyyMMdd"
                                        v-model="start_date" @change="dateStartSelectChange"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="结束日期" :rules="filter_rules([{required: true}])">
                        <el-date-picker type="date" placeholder="结束日期" value-format="yyyyMMdd"
                                        v-model="end_date" @change="dateEndSelectChange"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.interface_note" autosize placeholder="备注"
                          style="width: 300px"/>
            </el-form-item>
            <el-tabs type="border-card" @tab-click="handleClick">
                <el-tab-pane v-for="item in interfaceType" value="item.code" v-model="item.code">
                    <span slot="label">{{item.value}}接口</span></el-tab-pane>
            </el-tabs>
            <!--接口信息列表展示-->
            <el-table :data="tableData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                      border style="width: 100%" ref="multipleTable"
                      :row-key="(row)=>{ return row.interface_id}"
                      @selection-change="handleSelectionChange" @select-all='allSelect'>
                <el-table-column width="40" align="center" type="selection" :reserve-selection="true">
                </el-table-column>
                <el-table-column label="序号" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="interface_name" label="接口名称" align="center"/>
                <el-table-column prop="interface_code" label="接口代码" align="center"/>
                <el-table-column prop="start_use_date_s" label="开始日期" align="center">
                    <template slot-scope="scope">
                        <el-date-picker type="date" placeholder="开始日期" value-format="yyyyMMdd"
                                        v-model="scope.row.start_use_date_s" size="small" style="width:100%"
                                        :rules="filter_rules([{required: true}])"/>
                    </template>
                </el-table-column>
                <el-table-column prop="use_valid_date_s" label="结束日期" align="center">
                    <template slot-scope="scope">
                        <el-date-picker type="date" placeholder="结束日期" value-format="yyyyMMdd"
                                        v-model="scope.row.use_valid_date_s" size="small" style="width: 100%"
                                        :rules="filter_rules([{required: true}])"/>
                    </template>
                </el-table-column>
                <el-table-column prop="interface_state" label="接口状态" align="center" :filters="interfaceState"
                                 :filter-multiple="false" column-key='interfaceState'>
                    <template slot-scope="scope">
                        <span v-if="scope.row.interface_state==='1'">禁用</span>
                        <span v-else>启用</span>
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
        </el-form>
    </div>
</template>
<script>
    import * as interfaceFunctionAll from "./releaseManage";
    import * as validator from "@/utils/js/validator";
    import * as message from "@/utils/js/message";

    export default {
        //写定义的变量数据方法等
        data() {
            return {
                rule: validator.default,
                currPage: 1,
                pageSize: 10,
                totalSize: 0,
                selectRow: [],
                tableData: [],
                userData: [],
                interfaceType: [],
                interfaceState: [],
                start_use_date_s: "",
                use_valid_date_s: "",
                start_date: "",
                end_date: "",
                form: {
                    interface_note: "",
                    classify_name: "",
                    user_id: []
                },
            }
        },
        created() {
            // 获取接口类型代码项
            this.$Code.getCategoryItems({
                'category': 'InterfaceType'
            }).then(res => {
                this.interfaceType = res.data
            });
            this.$Code.getCategoryItems({
                'category': 'InterfaceState'
            }).then(res => {
                this.interfaceState = res.data
            })
        },
        mounted() {
            this.searchInterfaceInfoByType("1");
            this.searchUserInfo();
        },
        methods: {
            searchInterfaceInfoByType(interface_type) {
                let params = {}
                params["interface_type"] = interface_type;
                interfaceFunctionAll.searchInterfaceInfoByType(params).then(res => {
                    this.tableData = res.data;
                    this.totalSize = res.data.length;
                })
            },
            searchUserInfo() {
                interfaceFunctionAll.searchUserInfo().then(res => {
                    this.userData = res.data;
                })
            },
            // 新增接口使用信息
            saveInterfaceUseInfo(formName) {
                if (this.selectRow.length === 0) {
                    this.$message({
                        message: "请至少选一项!"
                    });
                    return;
                }
                let interfaceUseInfos = [];
                this.selectRow.forEach(o => {
                    if (o.start_use_date_s === '') {
                        this.$message({
                            message: "开始日期不能为空!",
                            type: 'error'
                        });
                        return;
                    }
                    if (o.use_valid_date_s === '') {
                        this.$message({
                            message: "结束日期不能为空!",
                            type: 'error'
                        });
                        return;
                    }
                    if (new Date(o.start_use_date_s) > new Date(o.use_valid_date_s)) {
                        this.$message({
                            message: "结束日期不能小于开始日期",
                            type: 'error'
                        });
                        return;
                    }
                    let param = {};
                    param["interface_id"] = o.interface_id;
                    param["start_use_date"] = o.start_use_date_s;
                    param["use_valid_date"] = o.use_valid_date_s;
                    interfaceUseInfos.push(param);
                });
                if (this.selectRow.length !==interfaceUseInfos.length) {
                    this.$message({
                        message: "选择列与选中日期列长度不一致",
                        type: 'error',
                    });
                    return;
                }
                this.form["interfaceUseInfos"] = JSON.stringify(interfaceUseInfos);
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        interfaceFunctionAll.saveInterfaceUseInfo(this.form).then((res) => {
                            message.saveSuccess(res);
                            this.form = [];
                            this.start_date = "";
                            this.end_date = "";
                            this.$refs.multipleTable.clearSelection();
                            this.searchUserInfo();
                            this.searchInterfaceInfoByType("1");
                            this.currPage=1;
                        })
                    }
                });
            },
            //接口列表数据实现分页功能
            handleCurrentChangeList(currPage) {
                //把val赋给当前页面
                this.currPage = currPage;
                this.searchInterfaceInfoByType("1");
            },
            // 改变每页显示条数
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                this.searchInterfaceInfoByType("1");
            },
            handleClick(tab) {
                this.$refs.multipleTable.clearSelection();
                if (tab.paneName === "0") {
                    this.searchInterfaceInfoByType("1");
                } else if (tab.paneName === "1") {
                    this.searchInterfaceInfoByType("2");
                } else if (tab.paneName === "2") {
                    this.searchInterfaceInfoByType("3");
                } else if (tab.paneName === "3") {
                    this.searchInterfaceInfoByType("4");
                }
            },
            // 全选
            allSelect(all) {
                this.selectRow = all
            },
            // 复选框选中
            handleSelectionChange(selectTrue) {
                this.selectRow = selectTrue
            },
            dateStartSelectChange(val) {
                this.tableData.forEach(o => {
                    o.start_use_date_s = val;
                })
            },
            dateEndSelectChange(val) {
                this.tableData.forEach(o => {
                    o.use_valid_date_s = val;
                })
            },
        }
    };
</script>
<style scoped>
    .el-icon-menu {
        margin-bottom: 10px;
        margin-right: 1100px;
        font-size: 18px;
        text-align: center;
        color: #2196f3;
    }

    .button-save {
        margin-left: 1120px;
    }

    .el-select {
        width: 300px;
    }

    .el-input {
        width: 300px;
    }

    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }
    .fontStyle {
        color: #2196f3;
        font-size: 18px;
    }
</style>