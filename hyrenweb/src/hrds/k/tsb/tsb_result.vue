<template>
<div id="tsb_result">
    <el-row>
        <h4 class='el-icon-s-home title'>对标结果</h4>
    </el-row>
    <el-row class="partTwo">
        <el-table :data="tableData" border stripe size="medium">
            <el-table-column label="序号" align="center" width="60">
                <template scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="cName" label="中文名称" align="center" width="130">
            </el-table-column>
            <el-table-column prop="eName" label="英文名称" align="center" width="130">
            </el-table-column>
            <el-table-column label="结果1" align="center">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="2">
                            <el-radio v-model="scope.row.id" :label='scope.row.predict[0].standard_id'>&nbsp;</el-radio>
                        </el-col>
                        <el-col :span="18">
                            中文： <span style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;display:inline-block;">{{scope.row.predict[0].col_en_name}}</span><br>
                            字段名称： <span>{{scope.row.predict[0].col_zh_name}}</span><br>
                            匹配度： <span>{{scope.row.predict[0].xen}}</span>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>

            <el-table-column prop="result2" label="结果2" align="center">
                <template slot-scope="scope">
                    <el-col :span="2">
                        <el-radio v-model="scope.row.id" name="nature" :label='scope.row.predict[1].standard_id'>&nbsp;</el-radio>
                    </el-col>
                    <el-col :span="18">
                        中文： <span>{{scope.row.predict[1].col_en_name}}</span><br>
                        字段名称： <span>{{scope.row.predict[1].col_zh_name}}</span><br>
                        匹配度： <span>{{scope.row.predict[1].xen}}</span>
                    </el-col>
                </template>
            </el-table-column>

            <el-table-column prop="result3" label="结果3" align="center">
                <template slot-scope="scope">
                    <el-col :span="2">
                        <el-radio v-model="scope.row.id" :label='scope.row.predict[2].standard_id'>&nbsp;</el-radio>
                    </el-col>
                    <el-col :span="18">
                        中文： <span>{{scope.row.predict[2].col_en_name}}</span><br>
                        字段名称： <span>{{scope.row.predict[2].col_zh_name}}</span><br>
                        匹配度： <span>{{scope.row.predict[2].xen}}</span>
                    </el-col>
                </template>
            </el-table-column>

            <el-table-column prop="describe" label="选择" align="center" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="dialogManualBenchdata=true">人工对标</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button style="margin-top:10px;float:right" size="medium" type="primary" @click="tsb_resultFun()">确定</el-button>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="人工对标" :visible.sync="dialogManualBenchdata" width="90%" class="alltable">
        <div slot="footer" class="dialog-footer">
            <el-table :data="CollTaskData.slice((currentPagedata - 1) * pagesizedata, currentPagedata * pagesizedata)" border size="medium" highlight-current-row>
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <div style="padding-bottom: 15px;    padding-left: 20px;">
                            <el-row style="margin-bottom: 10px;">
                                <el-col :span="6"><strong style="color:#3d8dd2">标准编号 : </strong>IP500023</el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">标准中文名称 : </strong>投资占比</el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">标准英文名称 : </strong>Invest Ratio</el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">标准别名 : </strong></el-col>
                            </el-row>
                            <el-row style="margin-bottom: 10px;">
                                <el-col :span="6"><strong style="color:#3d8dd2">数据类别 : </strong>数值类</el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">字段长度 : </strong>8</el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">小数长度 : </strong>5</el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">字段名称 : </strong>INVST_RATO</el-col>
                            </el-row>
                            <el-row style="margin-bottom: 10px;">
                                <el-col style="margin-bottom: 10px;"><strong style="color:#3d8dd2">业务定义 : </strong>指股东出资金额占被投资对象全部资本的比例。</el-col>
                                <el-col style="margin-bottom: 10px;"><strong style="color:#3d8dd2">业务规则 : </strong>股东出资额/全部资本</el-col>
                                <el-col style="margin-bottom: 10px;"><strong style="color:#3d8dd2">值域 : </strong>[0,100.00000]</el-col>
                                <el-col><strong style="color:#3d8dd2">标准依据 : </strong></el-col>
                            </el-row>
                            <el-row style="margin-bottom: 10px;">
                                <el-col :span="6"><strong style="color:#3d8dd2">标准管理部门 : </strong></el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">可信数据源 : </strong></el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">相关标准 : </strong></el-col>
                                <el-col :span="6"><strong style="color:#3d8dd2">标准制定人 : </strong>数据治理组</el-col>
                            </el-row>
                            <el-row>
                                <el-col><strong style="color:#3d8dd2">标准相关部门 : </strong>公司业务部，机构业务部，小微业务部，互联网金融部，信用卡部</el-col>
                            </el-row>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property label="选择" type="index" align="center" width='60'>
                    <template slot-scope="scope">
                        <el-radio v-model="radio" :label="scope.row.id">&thinsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column property label="序号" align="center">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currentPagedata - 1) * pagesizedata + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column property="num" label="标准编号" align="center"></el-table-column>
                <el-table-column property="tit" label="标准主题" align="center"></el-table-column>
                <el-table-column property="Standardcategory" label="标准大类" align="center"></el-table-column>
                <el-table-column property="Standardsubclass" label="标准子类" align="center"></el-table-column>
                <el-table-column property="Standardch" label="标准中文名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="Standarden" label="标准英文名称" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="Standardname" label="标准别名" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="ziduan" label="字段名称" align="center"></el-table-column>
                <el-table-column property="Businessdefinition" label="业务定义" align="center" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column property="Businessrules" label="业务规则" align="center" :show-overflow-tooltip="true"></el-table-column>
            </el-table>
            <el-pagination :current-page.sync="currentPagedata" :page-size="pagesizedata" layout="total, prev, pager, next" :total="CollTaskData.length" class="locationcenter"></el-pagination>
            <el-button @click="dialogManualBenchdata = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="dialogManualBenchdata = false" size="mini">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            pagesize: 5,
            currentPagedata: 1,
            pagesizedata: 5,
            radio: '',
            dialogManualBenchdata: false,
            tableData: [{
                    cName: '机构名称',
                    eName: 'ORG_NM',
                    id: '111',
                    predict: [{
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500090",
                            'xen': 0.9991458654403687
                        },
                        {
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500091",
                            'xen': 0.9991458654403687
                        },
                        {
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500092",
                            'xen': 0.9991458654403687
                        },
                    ]
                },
                {
                    cName: '机构名称',
                    eName: 'ORG_NM',
                    id: '112',
                    predict: [{
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500093",
                            'xen': 0.9991458654403687
                        },
                        {
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500094",
                            'xen': 0.9991458654403687
                        },
                        {
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500095",
                            'xen': 0.9991458654403687
                        },
                    ]
                },
                {
                    cName: '机构名称',
                    eName: 'ORG_NM',
                    id: '113',
                    predict: [{
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500098",
                            'xen': 0.9991458654403687
                        },
                        {
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500099",
                            'xen': 0.9991458654403687
                        },
                        {
                            "col_en_name": "Financial Institute Code",
                            "col_zh_name": "金融机构编码",
                            "standard_id": "IP500097",
                            'xen': 0.9991458654403687
                        },
                    ]
                },
            ],
            CollTaskData: [{
                    id: '1',
                    ziduan: 'CNTC_MOD',
                    num: 'IP500023',
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
                    ziduan: 'CNTC_INFO',
                    num: 'IP500024',
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
                    ziduan: 'CNTC_PSN_NAM',
                    num: 'IP500025',
                    tit: '参与人',
                    Standardcategory: '对公客户',
                    Standardsubclass: '关联信息',
                    Standardch: '投向企业名称',
                    Standarden: 'Invested Enterprise Name',
                    Standardname: '/',
                    Businessdefinition: '指单位客户对外投资时被投资企业的名称，应为企业的全称。',
                    Businessrules: '/',
                }
            ]
        }
    },
    methods: {
        tsb_resultFun() {
            console.log(this.tableData)
        }
    }
}
</script>

<style lang="less" scoped>
#tsb_result {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }

    .partTwo {
        margin-top: 10px;
    }

    .el-col-18 {
        text-align: left;
        margin-left: 10px;
    }
}
</style>
