<template>
<div class="visualizationindexList">
    <el-row class="elRows">
        <span>数据可视化</span>
        <el-button type="primary" class="els" @click="addProject" size="small">
            新建组件
        </el-button>
        <div class="lines"></div>
    </el-row>
    <el-row>
        <el-table size="medium" :data="tableData" border stripe style="width: 100%;margin-top:10px;">
            <el-table-column type="index" label="序号" width="70px" align='center'>
            </el-table-column>
            <el-table-column prop="component_name" show-overflow-tooltip label="组件名称" align='center'>
            </el-table-column>
            <el-table-column prop="component_desc" show-overflow-tooltip label="组件描述" align='center'>
            </el-table-column>
            <el-table-column prop="data_source" show-overflow-tooltip label="数据来源" align='center'>
            </el-table-column>
            <el-table-column prop="component_status" show-overflow-tooltip label="组件状态" align='center'>
            </el-table-column>
            <el-table-column label="创建日期" prop="create_date" show-overflow-tooltip align='center'>
            </el-table-column>
            <el-table-column label="创建用户" prop="create_user" show-overflow-tooltip align='center'>
            </el-table-column>
            <el-table-column label="操作" align='center' width="160">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="mini" type="text" @click="vieSql(scope.$index, scope.row)">查看sql
                    </el-button>
                    <el-button size="mini" class="endAgent" type="text" @click="deleteWork(scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>

        </el-table>
    </el-row>
</div>
</template>

<script>
import * as functionAll from "./selfAcess";
import * as fixedAll from "@/utils/js/fileOperations";

export default {
    data() {
        return {
            tableData: []
        }
    },
    mounted(){
        this.getVisualComponentInfo();
    },
    methods: {
        // 数据可视化首页列表展示
        getVisualComponentInfo() {
            functionAll.getVisualComponentInfo().then(res => {
                this.tableData = res.data;
            })
        },
        // 新建组件
        addProject() {
            this.$router.push({
                name: 'visualizationadd'
            })
        },
        //编辑
        handleEdit(index, row) {
            this.$router.push({
                name: 'visualizationadd',
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
        deleteWork(row) {
            this.$confirm('确认删除吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                // 删除接口
            }).catch(() => {
                this.$Msg.customizTitle('已取消删除', 'info')
            });
        }
    }
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
