<template>
<div>
    <el-row style="margin-bottom:10px">
        <el-col :span='5' >
            <el-input placeholder="请输入内容" class="input-with-select" size="mini">
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </el-col>
        <el-col :span='13'>&nbsp;</el-col>
        <el-col :span='6' style="text-align:right" class='allbutton'>
            <el-button size="mini" type="success" class="el-icon-upload">发布所有</el-button>
            <el-button size="mini" type="primary" class='el-icon-circle-plus-outline'>新增代码类</el-button>
            <!-- <el-button size="mini" type="danger" class='el-icon-remove-outline'>删除所有代码类</el-button> -->
        </el-col>
    </el-row>
    <!--  -->
    <el-table :data="tableData" style="width: 100%" border class='outtable' size='medium'>
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-row style="margin-bottom:10px">
                      <el-col :span='5' >
                        <el-input placeholder="请输入内容" class="input-with-select" size="mini">
                            <el-button slot="append" icon="el-icon-search"></el-button>
                        </el-input>
                    </el-col>
                    <el-col :span='13'>&nbsp;</el-col>
                    <el-col :span='6' style="text-align:right" class='allbutton'>
                        <el-button size="mini" type="primary" >新增代码项</el-button>
                    </el-col>
                </el-row>
                <el-table :data="dataList" align="center" stripe size='mini' class='in_tableColor'>
                    <el-table-column width="55" align="center" prop="selectionState">
                        <template slot="header" slot-scope="scope">
                            <el-checkbox></el-checkbox>
                        </template>
                        <template slot-scope="scope">
                            <el-checkbox></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column label="序号" align="center" width="60">
                        <template scope="scope">
                            <span>{{scope.$index}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" prop="duty" label="代码编号">
                    </el-table-column>
                    <el-table-column align="center" prop="guard" label="代码名称">
                    </el-table-column>
                    <el-table-column align="center" prop="accident" label="代码值">
                    </el-table-column>
                    <el-table-column align="center" prop="base" label="层级">
                    </el-table-column>
                    <el-table-column align="center" prop="import" label="代码描述">
                    </el-table-column>
                      <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class='delcolor'>删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total,prev, pager, next" :total="tableData.length" class='pagerigth'></el-pagination>
            </template>
        </el-table-column>
        <!-- <el-table-column width="55" align="center" prop="selectionState">
            <template slot="header" slot-scope="scope">
                <el-checkbox></el-checkbox>
            </template>
            <template slot-scope="scope">
                <el-checkbox></el-checkbox>
            </template>
        </el-table-column> -->
        <el-table-column label="序号" align="center" width="60">
            <template scope="scope">
                <span>{{scope.$index}}</span>
            </template>
        </el-table-column>
        <el-table-column label="代码编码" prop="id" align="center">
        </el-table-column>
        <el-table-column label="代码类名" prop="pigeonhole" align="center">
        </el-table-column>
        <el-table-column label="代码描述" prop="date" align="center">
        </el-table-column>
        <el-table-column label="状态" prop="scene" :filters="Releasestatus" :filter-multiple="false" align="center">
        </el-table-column>
         <el-table-column label="操作" width="100" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" class='delcolor'>删除</el-button>
                            <el-button type="text" size="small" >发布</el-button>
                        </template>
                    </el-table-column>
    </el-table>
    <el-pagination @size-change="sig_handleSizeChange" @current-change="sig_handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 50, 100, 200]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" class='locationcenter'></el-pagination>

</div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            pagesize: 10,
            tableData: [{
                    id: 'P201900001',
                    pigeonhole: '国家和地区代码',
                    date: '201931',
                    scene: '已发布',
                },
                {
                    id: 'P201900002',
                    pigeonhole: '国家和地区代码',
                    date: '13241234',
                    scene: '已发布',
                },
                {
                    id: 'P201900003',
                    pigeonhole: '国家和地区代码',
                    date: '2019131',
                    scene: '已发布',
                }
            ],
            dataList: [{
                    duty: '004',
                    guard: '阿富汗',
                    accident: 'AFG',
                    base: 'AF',
                    import: '阿富汗伊斯兰国'
                },
                {
                    duty: '004',
                    guard: '阿富汗',
                    accident: 'AFG',
                    base: 'AF',
                    import: '阿富汗伊斯兰国s'
                }
            ],
            Releasestatus: [{
                text: '未发布',
                value: '01'
            }, {
                text: '已发布',
                value: '02'
            }, ],
        }
    },
    methods: {
        sig_handleSizeChange(size) {
            this.pagesize = size;
        },
        sig_handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
    }
}
</script>

<style lang="less">
.pagerigth {
    text-align: right;
    margin-top: 10px;
}

.outtable /deep/ {

    .el-icon-arrow-down,
    .el-icon-arrow-up {
        color: #fff;
    }
}

.in_tableColor /deep/ {
    .el-table__header-wrapper {
        .el-table__header>thead>tr th {
            background-color: #829cfb !important
        }
    }
}
</style>
