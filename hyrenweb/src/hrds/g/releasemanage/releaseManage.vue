<template>
    <div class="releaseManage">
        <el-row class="topTitle">
            <span class="el-icon-menu">接口功能类</span>
            <router-link to="/serviceMage">
                <el-button class="goIndex" type="primary" size="mini" icon="el-icon-s-home">
                    返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-form ref="form" :inline=true :model="form" label-width="100px" size="medium">
            <span class="fontStyle">接口功能设置
                <el-button type="success" size="mini" class="saveButton"
                           @click="saveInterfaceUseInfo('form')">保存
                </el-button>
            </span>
            <el-divider/>
            <el-row>
                <el-col :span="11">
                    <el-form-item label="用户名称" prop="userIds" :rules="filter_rules([{required: true}])">
                        <el-select v-model="form.userIds" multiple filterable clearable placeholder="请选择">
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
                    <el-form-item label="开始日期" prop="start_date"
                                  :rules="filter_rules([{required: true}])">
                        <el-date-picker type="date" placeholder="开始日期" value-format="yyyyMMdd"
                                        v-model="form.start_date" @change="dateStartSelectChange"/>
                    </el-form-item>
                </el-col>
                <el-col :span="11">
                    <el-form-item label="结束日期" prop="end_date"
                                  :rules="filter_rules([{required: true}])">
                        <el-date-picker type="date" placeholder="结束日期" value-format="yyyyMMdd"
                                        v-model="form.end_date" @change="dateEndSelectChange"/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="备注">
                <el-input type="textarea" v-model="form.interface_note" autosize placeholder="备注"
                          style="width: 300px"/>
            </el-form-item>
            <el-tabs type="border-card" v-model="activeName" @tab-click="handleClick">
                <el-tab-pane v-for="item in interfaceType" value="item.code" v-model="item.code">
                    <span slot="label">{{item.value}}接口</span>
                </el-tab-pane>
                <!--接口信息列表展示-->
                <el-table :data="tableData.slice((currPage - 1) * pageSize,currPage * pageSize)"
                          border style="width: 100%" ref="multipleTable" size="medium"
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
                    <el-table-column prop="start_use_date" label="开始日期" align="center">
                        <template slot-scope="scope">
                            <el-date-picker type="date" placeholder="开始日期" value-format="yyyyMMdd"
                                            v-model="scope.row.start_use_date" size="small"
                                            style="width:100%"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="use_valid_date" label="结束日期" align="center">
                        <template slot-scope="scope">
                            <el-date-picker type="date" placeholder="结束日期" value-format="yyyyMMdd"
                                            v-model="scope.row.use_valid_date" size="small"
                                            style="width: 100%"/>
                        </template>
                    </el-table-column>
                    <el-table-column prop="use_state" label="接口状态" align="center">
                        <template slot-scope="scope">{{interfaceStateObj[scope.row.interface_state]}}
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
            </el-tabs>
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
                interfaceStateObj: {},
                activeName: "",
                form: {},
            }
        },
        created() {
            this.getInterfaceType();
            this.getInterfaceState();
        },
        mounted() {
            this.searchInterfaceInfoByType("1");
            this.searchUserInfo();
        },
        methods: {
            // 获取接口类型代码项
            getInterfaceType() {
                this.$Code.getCategoryItems({
                    'category': 'InterfaceType'
                }).then(res => {
                    res.data.forEach(row => {
                        this.interfaceType = res.data;
                    })
                })
            },
            // 获取接口状态代码项
            getInterfaceState() {
                this.$Code.getCategoryItems({
                    'category': 'InterfaceState'
                }).then(res => {
                    this.interfaceState = res.data;
                    res.data.forEach(row => {
                        this.interfaceStateObj[row.code] = row.value;
                    })
                })
            },
            // 根据接口类型查看接口信息
            searchInterfaceInfoByType(interface_type) {
                let params = {};
                params["interface_type"] = interface_type;
                interfaceFunctionAll.searchInterfaceInfoByType(params).then(res => {
                    this.tableData = res.data;
                    this.totalSize = res.data.length;
                })
            },
            // 获取接口用户信息
            searchUserInfo() {
                interfaceFunctionAll.searchUserInfo().then(res => {
                    this.userData = res.data;
                })
            },
            // 新增接口使用信息
            saveInterfaceUseInfo(formName) {
                this.form["interfaceUses"] = JSON.stringify(this.selectRow);
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        interfaceFunctionAll.saveInterfaceUseInfo(this.form).then((res) => {
                            message.saveSuccess(res);
                            this.form = {};
                            this.start_date = "";
                            this.end_date = "";
                            this.searchUserInfo();
                            this.activeName = "0";
                            this.$refs.multipleTable.clearSelection();
                            this.searchInterfaceInfoByType("1");
                            this.currPage = 1;
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
            // 接口类型转换
            handleClick(tab) {
                this.$refs.multipleTable.clearSelection();
                this.currPage = 1;
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
                    o.start_use_date = val;
                })
            },
            dateEndSelectChange(val) {
                this.tableData.forEach(o => {
                    o.use_valid_date = val;
                })
            },
        }
    };
</script>
<style scoped>
    .el-select {
        width: 300px;
    }

    .el-input {
        width: 300px;
    }

    .saveButton {
        float: right;
    }

    .fontStyle {
        color: #2196f3;
        font-size: 16px;
    }

    .locationcenter {
        text-align: center;
        margin-top: 5px;
    }

</style>