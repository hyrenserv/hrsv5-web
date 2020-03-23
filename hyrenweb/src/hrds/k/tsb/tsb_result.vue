<template>
<div id="tsb_result">
    <el-row class='topTitle'>
        <span>对标结果</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row class="partTwo">
        <el-table :data="tableData" border stripe size="medium">
            <el-table-column label="序号" align="center" width="60">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPage - 1) * pagesize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="col_cnname" label="中文名称" align="center" width="130">
            </el-table-column>
            <el-table-column prop="eName" label="英文名称" align="center" width="130">
            </el-table-column>
            <el-table-column label="结果1" align="center">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="2">
                            <el-radio v-model="scope.row.radio" :label='scope.row.predict[0][0]' @change="radioClickFun(scope.row.radio)">&nbsp;</el-radio>
                        </el-col>
                        <el-col :span="18">
                            中文： <span>{{scope.row.predict[0][0].col_zh_name}}</span><br>
                            字段名称： <span>{{scope.row.predict[0][0].col_en_name}}</span><br>
                            匹配度： <span>{{scope.row.predict[0][1]}}</span>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>

            <el-table-column prop="result2" label="结果2" align="center">
                <template slot-scope="scope">
                    <el-col :span="2">
                        <el-radio v-model="scope.row.radio" name="nature" :label='scope.row.predict[1][0]' @change="radioClickFun(scope.row.radio)">&nbsp;</el-radio>
                    </el-col>
                    <el-col :span="18">
                        中文： <span>{{scope.row.predict[1][0].col_zh_name}}</span><br>
                        字段名称： <span>{{scope.row.predict[1][0].col_en_name}}</span><br>
                        匹配度： <span>{{scope.row.predict[1][1]}}</span>
                    </el-col>
                </template>
            </el-table-column>

            <el-table-column prop="result3" label="结果3" align="center">
                <template slot-scope="scope">
                    <el-col :span="2">
                        <el-radio v-model="scope.row.radio" :label='scope.row.predict[2][0]' @change="radioClickFun(scope.row.radio)">&nbsp;</el-radio>
                    </el-col>
                    <el-col :span="18">
                        中文： <span>{{scope.row.predict[2][0].col_zh_name}}</span><br>
                        字段名称： <span>{{scope.row.predict[2][0].col_en_name}}</span><br>
                        匹配度： <span>{{scope.row.predict[2][1]}}</span>
                    </el-col>
                </template>
            </el-table-column>

            <el-table-column prop="describe" label="选择" align="center" width="160">
                <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="dialogDbFun(scope.row.id)">人工对标</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-row>
    <div slot="footer" class="dialog-footer">
        <el-button style="margin-top:10px;float:right" size="medium" type="primary" @click="tsb_resultFun()">确定</el-button>
    </div>
    <!-- 弹出框 -->
    <el-dialog title="人工对标" :visible.sync="dialogManualBenchdata" width="90%">
        <div slot="title">
            <span class="dialogtitle el-icon-caret-right">人工对标</span>
        </div>
        <el-table :data="CollTaskData.slice((currentPagedata - 1) * pagesizedata, currentPagedata * pagesizedata)" border size="medium" highlight-current-row>
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <div style="padding-bottom: 15px;    padding-left: 20px;">
                        <el-row style="margin-bottom: 10px;">
                            <el-col :span="6"><strong style="color:#3d8dd2">标准编号 : </strong>{{scope.row.norm_code}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">标准中文名称 : </strong>{{scope.row.norm_cname}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">标准英文名称 : </strong>{{scope.row.norm_ename}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">标准别名 : </strong>{{scope.row.norm_aname}}</el-col>
                        </el-row>
                        <el-row style="margin-bottom: 10px;">
                            <el-col :span="6"><strong style="color:#3d8dd2">数据类别 : </strong>{{scope.row.data_type}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">字段长度 : </strong>{{scope.row.col_len}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">小数长度 : </strong>{{scope.row.decimal_point}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">字段名称 : </strong>1111111</el-col>
                        </el-row>
                        <el-row style="margin-bottom: 10px;">
                            <el-col style="margin-bottom: 10px;"><strong style="color:#3d8dd2">业务定义 : </strong>{{scope.row.business_def}}</el-col>
                            <el-col style="margin-bottom: 10px;"><strong style="color:#3d8dd2">业务规则 : </strong>{{scope.row.business_rule}}</el-col>
                            <el-col style="margin-bottom: 10px;"><strong style="color:#3d8dd2">值域 : </strong>{{scope.row.dbm_domain}}</el-col>
                            <el-col><strong style="color:#3d8dd2">标准依据 : </strong>{{scope.row.norm_basis}}</el-col>
                        </el-row>
                        <el-row style="margin-bottom: 10px;">
                            <el-col :span="6"><strong style="color:#3d8dd2">标准管理部门 : </strong>{{scope.row.manage_department}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">可信数据源 : </strong>{{scope.row.origin_system}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">相关标准 : </strong>{{scope.row.related_system}}</el-col>
                            <el-col :span="6"><strong style="color:#3d8dd2">标准制定人 : </strong>{{scope.row.formulator}}</el-col>
                        </el-row>
                        <el-row>
                            <el-col><strong style="color:#3d8dd2">标准相关部门 : </strong>{{scope.row.relevant_department}}</el-col>
                        </el-row>
                    </div>
                </template>
            </el-table-column>
            <el-table-column property label="选择" type="index" align="center" width='60'>
                <template slot-scope="scope">
                    <el-radio v-model="radio" :label="scope.row">&thinsp;</el-radio>
                </template>
            </el-table-column>
            <el-table-column property label="序号" align="center">
                <template slot-scope="scope">
                    <span>{{scope.$index+(currentPagedata - 1) * pagesizedata + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column property="norm_code" label="标准编号" align="center"></el-table-column>
            <el-table-column property="tit" label="标准主题" align="center"></el-table-column>
            <el-table-column property="Standardcategory" label="标准大类" align="center"></el-table-column>
            <el-table-column property="Standardsubclass" label="标准子类" align="center"></el-table-column>
            <el-table-column property="norm_cname" label="标准中文名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="norm_ename" label="标准英文名称" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="norm_aname" label="标准别名" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="ziduan" label="字段名称" align="center"></el-table-column>
            <el-table-column property="business_def" label="业务定义" align="center" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column property="business_rule" label="业务规则" align="center" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
        <el-pagination :current-page="currentPagedata" :page-size="pagesizedata" @current-change="db_dialoghandleCurrentChange" @prev-click='db_preFun' @next-click='db_nextFun' layout="total, prev, pager, next" :total="totalSize" class="locationright"></el-pagination>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogManualBenchdata = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="dbResultSubmitFun()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import * as tsbFun from './tsb'
export default {
    data() {
        return {
            currentPage: 1,
            pagesize: 10,
            currentPagedata: 1,
            pagesizedata: 10,
            radio: '',
            options: [],
            dialogManualBenchdata: false,
            dataType: [],
            dbmCodeTypeInfos: [],
            tableData: [{
                "col_cnname": "金融机构代码",
                "col_desc": "",
                "id": "1000440385",
                'radio':'',
                predict: [
                    [{
                            col_en_name: "Financial Institute Code",
                            col_zh_name: "金融机构编码",
                            description: "是标识各类金融机构的唯一编码。根据中国金融机构分类标准，明确金融机构涵盖范围和界定各类金融机构具体组成包括的货币当局、监管当局及其境内外派出机构；境内银行、证券、保险类金融机构的法人机构及其境内外具有经营许可的分支机构；交易结算类金融机构及其境内分支机构；境内设立的金融控股公司；国外金融机构在我国境内设立的具有经营许可的非法人分支机构，中国人民银行认定的其他有关金融机构。",
                            standard_id: "IP500090"
                        },
                        0.9991458654403687
                    ],
                    [{
                            col_en_name: "Organization Code",
                            col_zh_name: "机构编码",
                            description: "指贵州银行为统一管理，根据既定规则生成并分配给行内机构的唯一编码，在贵州银行内具有唯一性。 ",
                            standard_id: "IP600012"
                        },
                        0.9990861415863037
                    ],
                    [{
                            col_en_name: "National Organization Code (NOC)",
                            col_zh_name: "组织机构代码",
                            description: "指由国家质量技术监督部门对中华人民共和国境内依法注册、依法登记的机关、企业、事业单位、社会团体及其他组织颁发一个在全国范围内唯一的、始终不变的法定标识。组织机构代码实际上可以理解为单位的身份证号码。具有唯一性、终身不变性、准确性、完整性和统一性。",
                            standard_id: "IP500054"
                        },
                        0.9982936978340149
                    ]
                ]
            }],
            CollTaskData: [],
            totalSize: 0,
            dbid: '',
            dm_arr:[]
        }
    },
    created() {
        // 获取数据类型下拉框
        this.$Code.getCategoryItems({
            'category': 'DbmDataType'
        }).then(res => {
            this.dataType = res.data
        })
        this.getDbmCodeTypeIdAndNameInfo()
        this.getPredictResult()
    },
    mounted() {

    },
    methods: {
        tsb_resultFun() {
            console.log(this.tableData)
        },
        dialogDbFun(id) {
            this.dbid = id
            this.dialogManualBenchdata = true
            this.getDbmNormbasicInfo(1, 10)
        },
        //初始化页面数据方法
        getPredictResult(){
             tsbFun.getPredictResult().then(res => {
                console.log(res)
            });
        },
        getDbmSortTreeInfo() {
            tsbFun.getDbmSortInfoTreeData().then(res => {
                this.options = res.data.dbmSortInfoTreeDataList
            });
        },
        //弹框点击翻页   
        db_dialoghandleCurrentChange(currentPagedata) {
            this.getDbmNormbasicInfo(currentPagedata, this.pagesizedata)
        },
        db_preFun(currentPagedata) {
            this.getDbmNormbasicInfo(currentPagedata, this.pagesizedata)
        },
        db_nextFun(currentPagedata) {
            this.getDbmNormbasicInfo(currentPagedata, this.pagesizedata)
        },
        // 点击下拉获取数据
        getDbmNormbasicInfo(curr, size) {
            let params = {}
            params["currPage"] = curr;
            params["pageSize"] = size;
            tsbFun.getDbmNormbasicInfo(params).then(res => {
                let arr = res.data.dbmNormbasicInfos
                for (let i = 0; i < arr.length; i++) {
                    arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options)
                    arr[i].data_type = this.datatypeFun(arr[i].data_type)
                    arr[i].code_type_id = this.codeValueFun(arr[i].code_type_id)
                }
                this.totalSize = res.data.totalSize
                this.CollTaskData = arr
            });

        },
        //通过id递归遍历树得到中文名
        getparentClassNmae(key, treeData) {
            let returnname = '';

            function childrenEach(childrenData) {
                for (var j = 0; j < childrenData.length; j++) {
                    if (childrenData[j].id == key) {
                        returnname = childrenData[j].label;
                        break
                    } else {
                        if (childrenData[j].children) {
                            childrenEach(childrenData[j].children);
                        }
                    }
                }
                return returnname;
            }

            return childrenEach(treeData);
        },
        // 数据类型遍历得到中文名
        datatypeFun(data_type) {
            for (let k = 0; k < this.dataType.length; k++) {
                if (data_type == this.dataType[k].code) {
                    return this.dataType[k].value
                }
            }
        },
        // 代码类遍历得到中文名
        codeValueFun(code) {
            for (let k = 0; k < this.dbmCodeTypeInfos.length; k++) {
                if (code == this.dbmCodeTypeInfos[k].code_type_id) {
                    return this.dbmCodeTypeInfos[k].code_type_name
                }
            }
        },
        // 获取代码类下拉
        getDbmCodeTypeIdAndNameInfo() {
            tsbFun.getDbmCodeTypeIdAndNameInfo().then(res => {
                this.dbmCodeTypeInfos = res.data.dbmCodeTypeInfos
            });
        },
        //人工对标确定
        dbResultSubmitFun() {
            this.dialogManualBenchdata = false
            this.dm_arr.push({col_id:this.dbid,col_similarity:this.radio.norm_code,standard_id:this.radio.basic_id,is_artificial:'1'})
            this.dbid=''
            console.log(this.dm_arr)
        },
        //单选按钮点击
        radioClickFun(row){
          console.log(row)
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
