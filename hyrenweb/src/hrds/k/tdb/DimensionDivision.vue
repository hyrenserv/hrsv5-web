<template>
<div>
      <el-row style="margin-bottom:10px">
        <span style="font-size: 20px;color:#2196f3">数据对标-维度划分</span>
    </el-row>
    <el-table ref="filterTable" stripe :default-sort="{prop: 'date', order: 'descending'}" :empty-text="tableloadingInfo" style="width: 100%" height="360" border :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
        <el-table-column label="序号" align="center" width="60">
            <template scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="Classification" label="划分类别"  align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="Fieldclassification" label="牵扯的表" align="center" >
             <template slot-scope="scope">
                <el-button size="mini" type="text" >{{scope.row.Fieldclassification}}</el-button>
            </template>
        </el-table-column>
        <el-table-column  label="牵扯的字段"  align="center" >
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="dialogColCleanclass=true">{{scope.row.data}}</el-button>
            </template>
        </el-table-column>
         <el-table-column prop="Classification" label="维度划分" align="center" >
                <template slot-scope="scope">
                    <el-select placeholder="维度划分"  style="width:160px" size="medium" v-model="scope.row.value">
                            <el-option size="medium" v-for="(item,index) in weiduType" :key="index" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                      </template>
        </el-table-column>
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" style="text-align: center;
    padding: 10px 0;"></el-pagination>
    <!-- 字段分类弹框 -->
    <el-dialog title="牵扯数据" :visible.sync="dialogColCleanclass" width="80%" class="alltable">
        <div slot="footer" class="dialog-footer">
            <el-table :data="colCleanDataclass.slice((colClean_currentPageclass - 1) * colClean_pagesizeclass, colClean_currentPageclass * colClean_pagesizeclass)" border :empty-text="tableloadingInfo" size="medium" highlight-current-row :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column property label="序号" width="60px" align="center">
                    <template scope="scope">
                        <span>{{scope.$index+(colClean_currentPageclass - 1) * colClean_pagesizeclass + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="data_table" label="表名" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="data_ziduan" label="字段名" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="value" label="数据类型" align="center" width="250" >
                      <template slot-scope="scope">
                    <el-select placeholder="重新划分"  style="width:160px" size="medium" v-model="scope.row.value">
                            <el-option size="medium" v-for="(item,index) in huafenType" :key="index" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                      </template>
                </el-table-column>
               <el-table-column  label="数据预览"  align="center" >
            <template slot-scope="scope">
                <el-button size="mini" type="text" @click="dialogColClean=true">预览详情</el-button>
            </template>
        </el-table-column>
            </el-table>
            <el-pagination :current-page.sync="colClean_currentPageclass" :page-size="colClean_pagesizeclass" layout="total, prev, pager, next" :total="colCleanDataclass.length" class="locationcenter"></el-pagination>
            <el-button @click="dialogColCleanclass = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogColCleanclass = false" size="mini">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 数据预览弹框 -->
    <el-dialog title="数据预览" :visible.sync="dialogColClean" width="40%" class="alltable">
        <div slot="footer" class="dialog-footer">
            <el-table :data="colCleanData.slice((colClean_currentPage - 1) * colClean_pagesize, colClean_currentPage * colClean_pagesize)" border :empty-text="tableloadingInfo" size="medium" highlight-current-row :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column property label="序号" width="60px" align="center">
                    <template scope="scope">
                        <span>{{scope.$index+(colClean_currentPage - 1) * colClean_pagesize + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="data" label="数据" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <el-pagination :current-page.sync="colClean_currentPage" :page-size="colClean_pagesize" layout="total, prev, pager, next" :total="colCleanData.length" class="locationcenter"></el-pagination>
            <el-button @click="dialogColClean = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogColClean = false" size="mini">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            tableloadingInfo: "数据加载中...",
            radio: '',
            tableData: [{
                    Classification: '分类一',
                    Fieldclassification: '10',
                    data:'3000',
                    value:'产品类'
                },
                {
                    Classification: '分类二',
                    Fieldclassification: '8',
                    data:'5000',
                    value:'渠道类'
                },
                {
                    Classification: '分类三',
                    Fieldclassification: '100',
                    data:'800',
                    value:'客户类'
                },
                {
                    Classification: '分类四',
                    Fieldclassification: '20',
                    data:'20',
                    value:'事件类'
                },
                {
                    Classification: '分类五',
                    Fieldclassification: '50',
                    data:'60',
                    value:'财务类'
                }
            ],
            currentPage: 1,
            pagesize: 5,
            colClean_currentPage: 1,
            colClean_pagesize: 5,
            colClean_currentPageclass: 1,
            currentPagedata: 1,
            pagesizedata: 5,
            dialogColClean: false,
            dialogColCleanclass: false,
            dialogColCleandata: false,
            colClean_pagesizeclass: 5,
            colCleanData: [{
                data: '张三'
            }, {
                data: '李四'
            }, {
                data: '王五'
            }, {
                data: '赵六'
            }, ],
            colCleanDataclass: [{
                data_table: 'auto_asso_info',
                data_ziduan: 'user_name',
                value:'分类一',
               
            }, {
                data_table: 'agent_relation_site',
                data_ziduan: 'customer_name',
                value:'分类一',
              

            }, {
                data_table: 'agent_info',
                data_ziduan: 'account_name',
                value:'分类一',
                

            }, {
                data_table: 'agent_down_info',
                data_ziduan: 'name',
                value:'分类一',
               

            }, ],
           huafenType:[
               {value:'分类一'},
               {value:'分类二'},
               {value:'分类三'},
               {value:'分类四'},
               {value:'分类五'},
           ],
           weiduType:[
                {value:'产品类'},
               {value:'渠道类'},
               {value:'客户类'},
               {value:'事件类'},
               {value:'财务类'},
           ]
         
        };
    },

}
</script>

<style scoped>
.alltable>>>.el-dialog__body {
    padding: 0 !important
}
</style>
