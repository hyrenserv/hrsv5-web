<template>
<div>
      <el-row style="margin-bottom:10px">
        <span style="font-size: 20px;color:#2196f3">数据对标-数据分析</span>
    </el-row>
    <el-table ref="filterTable" stripe :default-sort="{prop: 'date', order: 'descending'}" :empty-text="tableloadingInfo" style="width: 100%" height="360" border :data="tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
        <el-table-column label="序号" align="center" width="60">
            <template scope="scope">
                <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column prop="Classification" label="表中文名"  align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="Fieldclassification" label="表英文名" align="center" :show-overflow-tooltip="true">
        </el-table-column>
        <el-table-column prop="Fieldclassification" label="数据分析结果"  align="center" :show-overflow-tooltip="true">
            <template slot-scope="scope">
                <el-button size="mini" type="success" @click="dialogColCleanclass=true">详情</el-button>
            </template>
        </el-table-column>
      <!--   <el-table-column prop="Datapreview" label="数据预览" align="center">

            <template slot-scope="scope">
                <el-button size="mini" type="success" @click="dialogColClean=true">数据预览</el-button>
            </template>
        </el-table-column>
        <el-table-column prop="selectCol" label="选择标准" align="center">
            <template slot-scope="scope">
                <el-button size="mini" type="warning" @click="dialogColCleandata=true">选择</el-button>
            </template>
        </el-table-column> -->
    </el-table>
    <el-pagination :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length" style="text-align: center;
    padding: 10px 0;"></el-pagination>
    <!-- 字段分类弹框 -->
    <el-dialog title="数据对标-数据分析-信息表" :visible.sync="dialogColCleanclass" width="80%" class="alltable">
        <div slot="footer" class="dialog-footer">
            <el-table :data="colCleanDataclass.slice((colClean_currentPageclass - 1) * colClean_pagesizeclass, colClean_currentPageclass * colClean_pagesizeclass)" border :empty-text="tableloadingInfo" size="medium" highlight-current-row :default-sort="{prop: 'date', order: 'descending'}">
                <el-table-column property label="序号" width="60px" align="center">
                    <template scope="scope">
                        <span>{{scope.$index+(colClean_currentPageclass - 1) * colClean_pagesizeclass + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="data_table" label="字段名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="data_ziduan" label="字段中文名" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="value" label="数据类型" align="center" width="250" >
                      <template slot-scope="scope">
                    <el-select placeholder="数据类型"  style="width:160px" size="medium" v-model="scope.row.value">
                            <el-option size="medium" v-for="(item,index) in ExtractDataType" :key="index" :label="item.value" :value="item.value"></el-option>
                        </el-select>
                      </template>
                </el-table-column>
                 <el-table-column property="value" label="银标分类" align="center" >
                      <template slot-scope="scope">
                    <el-select placeholder="数据类型"  style="width:100px" size="medium" v-model="scope.row.value1">
                            <el-option size="medium" v-for="(item,index) in yinbiaoType" :key="index" :label="item.value1" :value="item.value1"></el-option>
                        </el-select>
                      </template>
                </el-table-column>
                 <el-table-column  label="是否为主键" align="center" >
                      <template slot-scope="scope">
                    <el-select   style="width:80px" size="medium" v-model="scope.row.value2">
                            <el-option size="medium" v-for="(item,index) in isType" :key="index" :label="item.value2" :value="item.value2"></el-option>
                        </el-select>
                      </template>
                </el-table-column>
                 <el-table-column  label="是否为外键" align="center" >
                      <template slot-scope="scope">
                    <el-select   style="width:80px" size="medium" v-model="scope.row.value2">
                            <el-option size="medium" v-for="(item,index) in isType" :key="index" :label="item.value2" :value="item.value2"></el-option>
                        </el-select>
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
    <!--人工对标  -->
    <el-dialog title="选择标准" :visible.sync="dialogColCleandata" width="70%" class="alltable">
        <div slot="footer" class="dialog-footer">
            <el-table :empty-text="tableloadingInfo" :data="CollTaskData.slice((currentPagedata - 1) * pagesizedata, currentPagedata * pagesizedata)" border size="medium" highlight-current-row>
                <el-table-column property label="选择" width="60px" type="index" align="center">
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.row.id">&thinsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column property label="序号" width="60px" align="center">
                    <template scope="scope">
                        <span>{{scope.$index+(currentPagedata - 1) * pagesizedata + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="num" label="标准编号" align="center"></el-table-column>
                <el-table-column property="tit" label="标准主题"  align="center"></el-table-column>
                <el-table-column property="Standardcategory" label="标准大类"  align="center"></el-table-column>
                <el-table-column property="Standardsubclass" label="标准子类"  align="center"></el-table-column>
                <el-table-column property="Standardch" label="标准中文名称"  align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="Standarden" label="标准英文名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="Standardname" label="标准别名" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="Businessdefinition" label="业务定义"  align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="Businessrules" label="业务规则"  align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <el-pagination :current-page.sync="currentPagedata" :page-size="pagesizedata" layout="total, prev, pager, next" :total="CollTaskData.length" class="locationcenter"></el-pagination>
            <el-button @click="dialogColCleandata = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogColCleandata = false" size="mini">确 定</el-button>
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
                    Classification: 'agent下载',
                    Fieldclassification: 'agent_down_info'
                },
                {
                    Classification: 'agent信息',
                    Fieldclassification: 'agent_info'
                },
                {
                    Classification: '样式表',
                    Fieldclassification: 'auto_areastyle'
                },
                {
                    Classification: '信息表',
                    Fieldclassification: 'auto_asso_info'
                },
                {
                    Classification: '设置表',
                    Fieldclassification: 'agent_relation_site'
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
                data_table: 'acct_no',
                data_ziduan: '账户',
                value:'8位定长字符类型',
                value1:'账户类',
                value2:'是'
            }, {
                data_table: 'Invest Amount',
                data_ziduan: '投资金额',
                value:'18位数据类型',
                 value1:'金额类',
                value2:'是'

            }, {
                data_table: 'Gender',
                data_ziduan: '性别',
                value:'字符类型',
                 value1:'代码类',
                value2:'否'

            }, {
                data_table: 'Cash_Management_Customer_Indicato',
                data_ziduan: '现金管理客户标识',
                value:'符点类型',
                 value1:'标识类',
                value2:'否'

            }, ],
            CollTaskData: [{
                id: '1',
                num:'IP500023',
                tit: '参与人',
                Standardcategory: '对公客户',
                Standardsubclass: '关联信息',
                Standardch: '投资占比',
                Standarden: 'Invest Ratio',
                Standardname: '/',
                Businessdefinition: '指股东出资金额占被投资对象全部资本的比例。',
                Businessrules: '股东出资额/全部资本',
            },
            {
                id: '2',
                num:'IP500024',
                tit: '参与人',
                Standardcategory: '对公客户',
                Standardsubclass: '关联信息',
                Standardch: '是否控股股东或实际控制人',
                Standarden: 'Controlling Shareholders Indicator',
                Standardname: '/',
                Businessdefinition: '指该股东是否控股或为实际控制人的说明。',
                Businessrules: '遵循标识的填写规则，“1”是“0”否。',
            },
            {
                id: '3',
                num:'IP500025',
                tit: '参与人',
                Standardcategory: '对公客户',
                Standardsubclass: '关联信息',
                Standardch: '投向企业名称',
                Standarden: 'Invested Enterprise Name',
                Standardname: '/',
                Businessdefinition: '指单位客户对外投资时被投资企业的名称，应为企业的全称。',
                Businessrules: '/',
            }],
            ExtractDataType:[
                {value:'8位定长字符类型',code:'01'},
                {value:'18位数据类型',code:'02'},
                {value:'字符类型',code:'03'},
                {value:'符点类型',code:'04'},
            ],
            yinbiaoType:[
                {value:'账户类',code:'01'},
                {value:'金额类',code:'02'},
                {value:'代码类',code:'03'},
                {value:'标识类',code:'04'},
            ],
             isType:[
                {value2:'是',code:'01'},
                {value2:'否',code:'02'},
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
