<template>
<div class="selfAcess">
    <el-row class="elRows">
        <span>自主取数</span>
        <div class="lines"></div>
    </el-row>
    <el-row class="tabsInputPosition">
        <el-input placeholder="请输入内容" class="input-with-select" size="mini" v-model="inputText">
            <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
        </el-input>
        <el-tabs class="tabes" v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="自主取数模板" name="first">
                <el-table size="medium" :data="tableDataSelf" border stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="70px" align='center'>
                    </el-table-column>
                    <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="名称" align='center'>
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="details(scope.$index, scope.row)">
                                {{scope.row.etl_sys_cd}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="etl_sys_name" show-overflow-tooltip label="模板描述" align='center'>
                    </el-table-column>
                    <el-table-column prop="comments" show-overflow-tooltip label="日期" align='center'>
                    </el-table-column>
                    <el-table-column prop="curr_bath_date" show-overflow-tooltip label="创建人" align='center'>
                    </el-table-column>
                    <el-table-column label="取数次数" align='center'>
                    </el-table-column>
                    <el-table-column label="操作" align='center' width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="handleEdit(scope.$index, scope.row)">取数
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="我的取数" name="second">
                <el-table size="medium" :data="tableDataMy" border stripe style="width: 100%">
                    <el-table-column type="index" label="序号" width="70px" align='center'>
                    </el-table-column>
                    <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="名称" align='center'>
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="details(scope.$index, scope.row)">
                                {{scope.row.etl_sys_cd}}
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="etl_sys_name" show-overflow-tooltip label="取数用途" align='center'>
                    </el-table-column>
                    <el-table-column prop="comments" show-overflow-tooltip label="日期" align='center'>
                    </el-table-column>
                    <el-table-column prop="curr_bath_date" show-overflow-tooltip label="创建人" align='center'>
                    </el-table-column>
                    <el-table-column label="操作" align='center' width="100">
                        <template slot-scope="scope">
                            <el-button size="mini" type="text" @click="handleEditMy(scope.$index, scope.row)">查看
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
    </el-row>

</div>
</template>

<script>
export default {
    data() {
        return{
            tableDataSelf:[{}],
            tableDataMy:[{}],
            activeName: 'first',
            inputText:'',
            searchMark:"auto"
        }
    },
    methods: {
        // 点击搜索按钮搜索
        searchInfo(){
            if(this.searchMark =="auto"){

            }else if(this.searchMark =="my"){

            }
        },
        // 选项卡切换
        handleClick(tab, event) {
            if (tab.label == '自主取数模板') {
                this.searchMark = "auto";
            } else {
                this.searchMark = "my";
            }
        },
        //自主取数
        handleEdit(index,row){
            this.$router.push({
                name:'access',
                query:{

                }
            })
        },
        //我的取数
        handleEditMy(index,row){

        }
    }
}
</script >

<style scoped>
/* 标题信息 */
.elRows {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

.el-row span {
    color: #2196f3;
    font-size: 18px;
}

/* 选项卡 */
.tabes {
    margin-top: 14px;
}

.tabsInputPosition {
    position: relative;
}

.input-with-select {
    width: 284px;
    position: absolute;
    top: 20px;
    right: 4px;
    z-index: 10;
}
</style>
