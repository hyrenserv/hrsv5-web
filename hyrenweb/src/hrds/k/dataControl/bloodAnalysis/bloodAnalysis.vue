<template>
    <div id='dataControl'>
        <el-row class='topTitle'>
            <span>血缘分析</span>
            <router-link to="/dataControl">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="类型">
                <el-select v-model="formInline.search_type" placeholder="类型"
                           :rules="filter_rules([{required: true}])">
                    <el-option label="表查看" value="0"/>
                    <el-option label="字段查看" value="1"/>
                </el-select>
            </el-form-item>
            <el-form-item label="关系">
                <el-select v-model="formInline.search_relationship" placeholder="关系"
                           :rules="filter_rules([{required: true}])">
                    <el-option label="影响" value="0"/>
                    <el-option label="血缘" value="1"/>
                </el-select>
            </el-form-item>
            <el-form-item label="表名" :rules="filter_rules([{required: true}])">
                <el-autocomplete
                        class="inline-input"
                        v-model="formInline.table_name"
                        :fetch-suggestions="querySearch"
                        placeholder="请输入表名"
                        :trigger-on-focus="false"/>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" size="mini" @click="getTableBloodRelationship">搜索</el-button>
            </el-form-item>
        </el-form>
        <!--echarts图展示血缘关系-->
        <div id="myChart" :style="{width: '100%', height: '500px'}"></div>
    </div>
</template>
<script>
    import * as dataControlFunctionAll from "./bloodAnalysis";
    import * as validator from "@/utils/js/validator";

    export default {
        //写定义的变量数据方法等
        data() {
            return {
                rule: validator.default,
                isFlag: [],
                tableNames: [],
                formInline: {
                    search_type: '0',
                    search_relationship: '1',
                    table_name: ''
                },
            }
        },
        mounted() {
            this.fuzzySearchTableName();
        },
        methods: {
            // 模糊搜索表名
            fuzzySearchTableName() {
                // 处理参数
                dataControlFunctionAll.fuzzySearchTableName(this.formInline).then(res => {
                    this.tableNames = res.data;
                    let params = [];
                    res.data.forEach(o => {
                        let param = {};
                        param.value = o;
                        params.push(param);
                    });
                    this.tableNames = params;
                });
            },
            // 根据表名称获取表与表之间的血缘关系
            getTableBloodRelationship(formName) {
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        // 处理参数
                        dataControlFunctionAll.getTableBloodRelationship(this.formInline).then(res => {
                            let myChart = this.$echarts.init(document.getElementById('myChart'));
                            myChart.hideLoading();

                            echarts.util.each(res.data.children, function (datum, index) {
                                index % 2 === 0 && (datum.collapsed = true);
                            });
                            myChart.setOption(option = {
                                tooltip: {
                                    trigger: 'item',
                                    triggerOn: 'mousemove'
                                },
                                series: [
                                    {
                                        type: 'tree',

                                        data: [data],

                                        top: '1%',
                                        left: '7%',
                                        bottom: '1%',
                                        right: '20%',

                                        symbolSize: 7,

                                        label: {
                                            position: 'left',
                                            verticalAlign: 'middle',
                                            align: 'right',
                                            fontSize: 9
                                        },

                                        leaves: {
                                            label: {
                                                position: 'right',
                                                verticalAlign: 'middle',
                                                align: 'left'
                                            }
                                        },

                                        expandAndCollapse: true,
                                        animationDuration: 550,
                                        animationDurationUpdate: 750
                                    }
                                ]
                            });
                        });
                    }
                });
            },
            // 查询之前先去选择关系
            querySearch(queryString, cb) {
                const res = this.tableNames;
                const results = queryString ? res.filter(this.createFilter(queryString)) : res;
                // 调用 callback 返回建议列表的数据
                cb(results);
            },
            createFilter(queryString) {
                return (restaurant) => {
                    return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
        },
    };
</script>
