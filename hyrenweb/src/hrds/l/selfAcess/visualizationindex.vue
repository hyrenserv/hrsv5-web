<template>
<div class="visualizationindexList">
    <el-row class="elRows">
        <span>数据可视化</span>
        <el-button type="primary" class="els" @click="addProject" size="small">
            新建组件
        </el-button>
    </el-row>
    <el-table size="medium" :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50px" align='left'>
        </el-table-column>
        <el-table-column prop="component_name" show-overflow-tooltip label="组件名称" align='left'>
        </el-table-column>
        <el-table-column prop="component_desc" show-overflow-tooltip label="组件描述" align='left'>
        </el-table-column>
        <el-table-column prop="data_source" show-overflow-tooltip label="数据来源" width="130px" align='left'>
        </el-table-column>
        <el-table-column prop="component_status" show-overflow-tooltip label="组件状态" width="100px" align='left'>
        </el-table-column>
        <el-table-column prop="create_date" label="创建日期" align='left'>
        </el-table-column>
        <el-table-column label="创建用户" prop="create_user" width="150px" show-overflow-tooltip align='left'>
        </el-table-column>
        <el-table-column label="操作" align='left' width="160">
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="mini" type="text" @click="vieSql(scope.$index, scope.row)">查看sql
                </el-button>
                <el-button size="mini" class="endAgent" type="text" @click="deleteVisualComponent(scope.row)">删除
                </el-button>
            </template>
        </el-table-column>
    </el-table>
</div>
</template>

<script>
import * as functionAll from "./selfAcess";
import * as fixedAll from "@/utils/js/fileOperations";

export default {
    data() {
        return {
            tableData: [],
            compState: [],
            autoSourceObject: []
        }
    },
    mounted() {
        this.getVisualComponentInfo();
        this.getCodeItems('AutoFetchStatus');
        this.getCodeItems("AutoSourceObject");
    },
    methods: {
        getCodeItems(val) {
            if (val == "AutoFetchStatus") { //组件状态
                functionAll.getCategoryItems({
                    category: 'AutoFetchStatus'
                }).then(res => {
                    this.compState = res.data;
                })
            } else if (val == "AutoSourceObject") { //可视化源对象
                functionAll.getCategoryItems({
                    category: 'AutoSourceObject'
                }).then(res => {
                    this.autoSourceObject = res.data;
                })
            }
        },

        // 数据可视化首页列表展示
        getVisualComponentInfo() {
            functionAll.getVisualComponentInfo().then(res => {
                if (res && res.success) {
                    for (let index = 0; index < res.data.length; index++) {
                        if (res.data[index].create_date) {
                            res.data[index].create_date = fixedAll.dateToMilldate(res.data[index].create_date + " " + res.data[index].create_time);
                        }
                        this.compState.forEach(val => {
                            if (res.data[index].component_status == val.code) {
                                res.data[index].component_status = val.value;
                            }
                        })
                        this.autoSourceObject.forEach(val => {
                            if (res.data[index].data_source == val.code) {
                                res.data[index].data_source = val.value;
                            }
                        })
                    }
                    this.tableData = res.data;
                }
            });
        },
        // 新建组件
        addProject() {
            this.$router.push({
                name: 'visualization'
            })
        },
        //编辑
        handleEdit(index, row) {
            this.$router.push({
                name: 'visualization',
                query: {
                    //传参
                }
            })
        },
        //查看sql
        vieSql(index, row) {
            // 查看sql接口
        },
        //删除
        deleteVisualComponent(row) {
            this.$confirm('确认删除组件（' + row.component_name + '）吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 删除接口
                functionAll.deleteVisualComponent({
                    component_id: row.component_id
                }).then(res => {
                    if (res && res.success) {
                        this.$Msg.customizTitle('删除成功', 'success')
                        // 从新渲染表格
                        this.getVisualComponentInfo();
                    }
                })
            }).catch(() => {});
        }
    },
}
</script>

<style scoped>
.elRows {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* button样式设置 */
.els {
    float: right;
    margin-top: 3px;
}

.lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}
</style>
