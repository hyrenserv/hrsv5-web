<template>
    <div id="tsb_result">
        <el-row class='topTitle'>
            <span>对标结果</span>
            <router-link to="/collectmonitor">
                <el-button type="primary" size="small" class="goIndex">
                    <i class="fa fa-home fa-lg"/>返回首页
                </el-button>
            </router-link>
        </el-row>
        <el-row class="partTwo">
            <el-table :data="tableData" border stripe size="medium">
                <el-table-column label="序号" align="center" width="60">
                    <template slot-scope="scope">
                        <span>{{scope.$index+(currentPageone - 1) * pagesizeone + 1}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="col_cname" label="中文名称" align="center" width="130">
                </el-table-column>
                <el-table-column prop="col_ename" label="英文名称" align="center" width="130">
                </el-table-column>
                <el-table-column label="结果1" align="center">
                    <template slot-scope="scope">
                        <el-col :span="2">
                            <el-radio v-model="scope.row.radio" :label='scope.row.predict[0].result_id'
                                      @change="clickRadioFun(scope.row.col_id,scope.row.predict[0].result_id)">
                                &nbsp;
                            </el-radio>
                        </el-col>
                        <el-col :span="18">
                            中文： <span>{{scope.row.predict[0].norm_cname}}</span><br>
                            字段名称： <span>{{scope.row.predict[0].norm_ename}}</span><br>
                            匹配度： <span>{{scope.row.predict[0].col_similarity}}</span>
                        </el-col>
                    </template>
                </el-table-column>
                <el-table-column prop="result2" label="结果2" align="center">
                    <template slot-scope="scope">
                        <el-col :span="2">
                            <el-radio v-model="scope.row.radio" :label='scope.row.predict[1].result_id'
                                      @change="clickRadioFun(scope.row.col_id,scope.row.predict[1].result_id)">
                                &nbsp;
                            </el-radio>
                        </el-col>
                        <el-col :span="18">
                            中文： <span>{{scope.row.predict[1].norm_cname}}</span><br>
                            字段名称： <span>{{scope.row.predict[1].norm_ename}}</span><br>
                            匹配度： <span>{{scope.row.predict[1].col_similarity}}</span>
                        </el-col>
                    </template>
                </el-table-column>
                <el-table-column prop="result3" label="结果3" align="center">
                    <template slot-scope="scope">
                        <el-col :span="2">
                            <el-radio v-model="scope.row.radio" :label='scope.row.predict[2].result_id'
                                      @change="clickRadioFun(scope.row.col_id,scope.row.predict[2].result_id)">
                                &nbsp;
                            </el-radio>
                        </el-col>
                        <el-col :span="18">
                            中文： <span>{{scope.row.predict[2].norm_cname}}</span><br>
                            字段名称： <span>{{scope.row.predict[2].norm_ename}}</span><br>
                            匹配度： <span>{{scope.row.predict[2].col_similarity}}</span>
                        </el-col>
                    </template>
                </el-table-column>
                <el-table-column prop="describe" label="选择" align="center" width="160">
                    <template slot-scope="scope">
                        <el-button size="mini" type="warning" @click="dialogDbFun(scope.row.col_id)">人工对标</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button style="margin-top:10px;float:right" size="medium" type="primary" @click="tsb_resultFun()">
                确定
            </el-button>
        </div>
        <!-- 弹出框 -->
        <el-dialog title="人工对标" :visible.sync="dialogManualBenchdata" width="90%">
            <div slot="title"><span class="dialogtitle el-icon-caret-right">人工对标</span></div>
            <div id='nameTable'>
                <el-row :gutter='20'>
                    <el-col :span='6'>
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini">
                        </el-input>
                        <Scrollbar>
                            <div class="mytree" hight='200'>
                                <el-tree class="filter-tree" :empty-text='tip' :data="data" :indent='0' :props="data"
                                         @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree">
                                <span class="span-ellipsis" slot-scope="{ node, data }">
                                    <span :title="node.label">{{ node.label }}</span>
                                </span>
                                </el-tree>
                            </div>
                        </Scrollbar>
                    </el-col>
                    <el-col :span='18' style="border-left: 1px #e0dcdc dashed;min-height: 400px;">
                        <el-row style="margin-bottom:10px">
                            <el-col :span='16'>&nbsp;</el-col>
                            <el-col :span='8' style="text-align:right">
                                <el-input placeholder="请输入内容" class="input-with-select" size="mini"
                                          v-model="search_Value">
                                    <el-button slot="append" icon="el-icon-search" @click="searchDbmSortInfoFun"/>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-table :data="tableData2" border size='medium' style="min-height: 200px;"
                                      class='outtable' ref="multipleTable" :row-key="(row)=>{ return row.basic_id}">
                                <el-table-column label="选择" align="center">
                                    <template scope="scope">
                                        <el-radio v-model="radio" :label="scope.row.basic_id">&thinsp;</el-radio>
                                    </template>
                                </el-table-column>
                                <el-table-column label="序号" align="center">
                                    <template scope="scope">{{scope.$index+(currentPage - 1) * pagesize + 1}}</template>
                                </el-table-column>
                                <el-table-column prop="sortName" label="上级分类" align="center" width="100"
                                                 :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="norm_code" label="标准编号" align="center">
                                </el-table-column>
                                <el-table-column prop="norm_cname" label="中文名称" align="center" width="100"
                                                 :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="norm_aname" label="标准别名" align="center" width="100"
                                                 :show-overflow-tooltip="true">
                                </el-table-column>
                                <el-table-column prop="data_type" label="数据类型" align="center">
                                </el-table-column>
                                <el-table-column label="操作" align="center">
                                    <template slot-scope="scope">
                                        <el-button type="success" size="small" @click="editbasicByIdFun(scope.row)">
                                            查看详情
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination @prev-click='dbMark_preclickFun' @next-click='dbMark_nextclickFun'
                                           @size-change="dbMark_handleSizeChange"
                                           @current-change="dbMark_handleCurrentChange" :current-page="currentPage"
                                           :page-sizes="[10, 50, 100, 200]" :page-size="pagesize"
                                           layout="total, sizes, prev, pager, next, jumper" :total="totalSize"
                                           class='locationcenter'/>
                        </el-row>
                    </el-col>
                </el-row>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogManualBenchdata = false" type="danger" size="mini">取 消</el-button>
                <el-button type="primary" @click="dbResultSubmitFun()" size="mini">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 查看详情的弹框 -->
        <el-dialog title="详细标准元" :visible.sync="dialogEditTableVisible" width="60%" class='data_edit'>
            <div slot="title">
                <span class="dialogtitle el-icon-caret-right">详细信息</span>
            </div>
            <el-row>
                <el-collapse v-model="activeNames" style='border:0'>
                    <el-form ref="ruleForm_Info" :model="ruleForm_Info" label-width="86px">
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col :span='7'>
                                <el-row><span><p>标准编号 : </p> {{ruleForm_Info.standardNum}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>中文名称 : </p> {{ruleForm_Info.cnName}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>英文名称 : </p> {{ruleForm_Info.enName}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col :span='7'>
                                <el-row><span><p>标准别名 : </p> {{ruleForm_Info.standardAlias}}</span></el-row>
                            </el-col>
                            <el-col :span="7">
                                <el-row><span><p>归属分类 : </p> {{ruleForm_Info.belongsClass}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>数据类型 : </p> {{ruleForm_Info.data_types}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col :span='7'>
                                <el-row><span><p>字段长度 : </p> {{ruleForm_Info.fieldLength}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>小数长度 : </p> {{ruleForm_Info.decimalLen}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>所属代码 : </p> {{ruleForm_Info.belongsCode}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col :span='7'>
                                <el-row><span><p>管理部门 : </p> {{ruleForm_Info.department}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>相关部门 : </p> {{ruleForm_Info.relevantDepartments}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>发布状态 : </p> {{ruleForm_Info.norm_status}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col :span='7'>
                                <el-row><span><p>可信系统 : </p> {{ruleForm_Info.trustedSystem}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>相关标准 : </p> {{ruleForm_Info.relatedStandards}}</span></el-row>
                            </el-col>
                            <el-col :span='7'>
                                <el-row><span><p>制定人 : </p> {{ruleForm_Info.enactingPerson}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col>
                                <el-row><span><p>业务定义 : </p> {{ruleForm_Info.worksDefin}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col>
                                <el-row><span><p>业务规则 : </p> {{ruleForm_Info.workRule}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col>
                                <el-row><span><p>标准定义 : </p> {{ruleForm_Info.sdefinition}}</span></el-row>
                            </el-col>
                        </el-row>
                        <el-row :gutter="20" class='xjtxtcolor'>
                            <el-col>
                                <el-row><span><p>值域 : </p> {{ruleForm_Info.dbm_domain}}</span></el-row>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse>
            </el-row>
        </el-dialog>
    </div>
</template>

<script>
    import * as tsbFun from './tsb'
    import * as dataBenchmarkingAllFun from '../dbm_check/dbm_check'
    import * as validator from "@/utils/js/validator";
    import Scrollbar from '../../components/scrollbar';
    import Loading from '../../components/loading'

    export default {
        components: {
            Scrollbar,
            Loading
        },
        data() {
            return {
                currentPageone: 1,
                pagesizeone: 10,
                radio: "",
                dialogManualBenchdata: false,
                dataType: [],
                dbmCodeTypeInfos: [],
                tableData: [],
                CollTaskData: [],
                col_id: '',
                dm_arr: [],//存人工对标数据
                rule: validator.default,
                title: '',
                search_Value: '',
                searchValue: '',
                currentPage: 1,
                pagesize: 10,
                totalSize: 0,
                Allis_selectionState: false,
                dialogEditTableVisible: false,
                SetKesDept: {value: 'id', label: 'label', children: 'children'},
                activeNames: ['1', '2', '3', '4'],
                filterText: '',
                textarea: '',
                value: '',
                basicStaus: '',
                basic_id: '',
                ruleForm_Info: {
                    basic_id: '', standardNum: '', cnName: '', enName: '', standardAlias: '', belongsClass: [],
                    standardDescription: '', fieldName: '', data_types: '', fieldLength: null, decimalLen: null,
                    belongsCode: '', worksDefin: '', workRule: '', sdefinition: '', department: '',
                    relevantDepartments: '', trustedSystem: '', relatedStandards: '', enactingPerson: '',
                    dbm_domain: '', norm_status: '',
                },
                dbmNormbasicInfos: [],
                defaultProps: {children: 'children', label: 'label'},
                tableData2: [],
                fileList: [],
                listId: '',
                loading: true,
                basic_id_s: [],
                selectrow: [],
                norm_status: '',
                search_status: '',
                NodeClick: '',
                nodeId: '',
                data: [],
                options: [],
                tip: '',
                isLoading: false,
            }
        },
        created() {
            // 获取数据类型下拉框
            this.$Code.getCategoryItems({
                'category': 'DbmDataType'
            }).then(res => {
                this.dataType = res.data
            });
            this.getPredictResult()
        },
        mounted() {
            this.getDbmNormbasicInfo(1, 10);
            //相关标准
            this.getDbmNormbasicIdAndNameInfo();
            //获取代码类
            this.getDbmCodeTypeIdAndNameInfo();
            this.getTreenFun();
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            handlerValue() {
                if (this.$refs.refHandle) {
                    this.$refs.refHandle.dropDownVisible = false; //监听值发生变化就关闭它
                }
            }
        },
        methods: {
            tsb_resultFun() {
                //获取选择的结果数据
                let save_data_list = [];
                this.tableData.forEach(data => {
                    let col_id = data.col_id;
                    let radio = data.radio ? data.radio : '';
                    let is_artificial = data.is_artificial ? data.is_artificial : '';
                    let col_ename = data.col_ename ? data.col_ename : '';
                    save_data_list.push({
                        'col_id': col_id,
                        'result_id': radio,
                        'is_artificial': is_artificial,
                        'col_ename': col_ename,
                    })
                });
                //保存对标结果
                this.isLoading = true;
                tsbFun.saveTSBConfData({"dbm_normbmd_info_s": JSON.stringify(save_data_list)}).then(res => {
                    if (res.success) {
                        this.isLoading = false;
                        this.$message({
                            type: 'success',
                            message: '表结构对标结果保存成功!'
                        });
                        //对标结果保存成功后,将对标结果置空
                        this.tableData = [];
                        //保存完成后,跳转到表结构对标首页
                        this.$router.push({
                            name: 'tsb'
                        })
                    } else {
                        this.isLoading = false;
                    }
                })
            },
            //点击人工对标
            dialogDbFun(col_id) {
                this.col_id = col_id;
                this.dialogManualBenchdata = true;
                this.getDbmNormbasicInfo(1, 10);
                this.radio = '';
                // 再次打开回显之前点击的
                for (let i = 0; i < this.dm_arr.length; i++) {
                    if (this.dm_arr[i].col_id === col_id) {
                        this.radio = this.dm_arr[i].basic_id;
                    }
                }
            },
            //初始化页面数据方法
            getPredictResult() {
                tsbFun.getPredictResult().then(res => {
                    if (res.success) {
                        this.tableData = res.data;
                    }
                });
            },
            // 单选按钮被点击触发
            clickRadioFun(col_id, result_id) {
                this.updataRationFun(col_id, result_id, '0');
                //点击选择后遍历之前人工对标存储的，将其删除
                for (let i = 0; i < this.dm_arr.length; i++) {
                    if (this.dm_arr[i].col_id === col_id) {
                        this.dm_arr.splice(i, 1);
                        i--
                    }
                }
            },
            //人工对标点击确定
            dbResultSubmitFun() {
                this.dialogManualBenchdata = false;
                this.dm_arr.push({'col_id': this.col_id, 'basic_id': this.radio});
                this.updataRationFun(this.col_id, this.radio, '1');
            },
            // 遍历表中数据修改radio值
            updataRationFun(col_id, result_id, is_artificial) {
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].col_id === col_id) {
                        this.tableData[i].radio = result_id + "";
                        //is_artificial: 是否人工对标,1:是,0:否
                        this.tableData[i].is_artificial = is_artificial;
                    }
                }
            },
            //获取树菜单
            getTreenFun() {
                dataBenchmarkingAllFun.getDbmSortInfoTreeData().then(res => {
                    this.data = res.data.dbmSortInfoTreeDataList;
                    if (this.data.length > 0) {
                        this.tip = ''
                    } else {
                        this.tip = '暂无数据'
                    }
                    this.options = res.data.dbmSortInfoTreeDataList;
                });
            },
            // 获取代码类下拉
            getDbmCodeTypeIdAndNameInfo() {
                dataBenchmarkingAllFun.getDbmCodeTypeIdAndNameInfo().then(res => {
                    this.dbmCodeTypeInfos = res.data.dbmCodeTypeInfos
                });
            },
            //相关标准信息
            getDbmNormbasicIdAndNameInfo() {
                dataBenchmarkingAllFun.getDbmNormbasicIdAndNameInfo().then(res => {
                    this.dbmNormbasicInfos = res.data.dbmNormbasicInfos
                });
            },
            dbMark_handleSizeChange(size) {
                this.pagesize = size;
                if (this.norm_status === '1' || this.norm_status === '0' || this.search_status === 'search' || this.nodeId !== '') {
                    this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status, this.nodeId)
                } else {
                    this.getDbmNormbasicInfo(this.currentPage, this.pagesize)
                }

            },
            dbMark_handleCurrentChange(currentPage) {
                this.currentPage = currentPage;
                if (this.norm_status === '1' || this.norm_status === '0' || this.search_status === 'search' || this.nodeId !== '') {
                    this.searchDbmSortInfo(this.searchValue, this.currentPage, this.pagesize, this.norm_status, this.nodeId)
                } else {
                    this.getDbmNormbasicInfo(this.currentPage, this.pagesize)
                }

            },
            dbMark_nextclickFun(currentPage) {
                this.dbMark_handleCurrentChange(currentPage)
            },
            dbMark_preclickFun(currentPage) {
                this.dbMark_handleCurrentChange(currentPage)
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.label.indexOf(value) !== -1;
            },
            handleClick(row) {
            },
            handleNodeClick(data) {
                this.NodeClick = 'true';
                this.norm_status = '';
                this.search_status = '';
                this.searchValue = '';
                this.search_Value = '';
                // if (!data.children) {
                this.nodeId = data.id;
                this.getDbmNormbasicInfoBySortId(data.id, 1, 10)
                // }

            },
            // 侧边树点击获取信息接口方法
            getDbmNormbasicInfoBySortId(id, currentPage, pagesize) {
                let params = {},
                    that = this;
                params["sort_id"] =id;
                params["currPage"] = currentPage;
                params["pageSize"] = pagesize;
                dataBenchmarkingAllFun.getDbmNormbasicInfoBySortId(params).then(res => {
                    let arr = res.data.dbmNormbasicInfos;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options);
                        for (let k = 0; k < that.dataType.length; k++) {
                            if (arr[i].data_type === that.dataType[k].code) {
                                arr[i].data_type = that.dataType[k].value
                            }
                        }
                    }
                    this.tableData2 = arr;
                    this.totalSize = res.data.totalSize
                });
            },
            // 获取初始数据
            getDbmNormbasicInfo(curr, size) {
                let params = {},
                    that = this;
                params["currPage"] = curr;
                params["pageSize"] = size;
                dataBenchmarkingAllFun.getDbmNormbasicInfo(params).then(res => {
                    let arr = res.data.dbmNormbasicInfos;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options);
                        for (let k = 0; k < that.dataType.length; k++) {
                            if (arr[i].data_type === that.dataType[k].code) {
                                arr[i].data_type = that.dataType[k].value
                            }
                        }
                    }
                    this.totalSize = res.data.totalSize;
                    this.tableData2 = arr;
                });

            },
            //通过id递归遍历树得到中文名
            getparentClassNmae(key, treeData) {
                let returnname = '';

                function childrenEach(childrenData) {
                    for (var j = 0; j < childrenData.length; j++) {
                        if (childrenData[j].id === key) {
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
                    if (data_type === this.dataType[k].code) {
                        return this.dataType[k].value
                    }
                }
            },
            // 代码类遍历得到中文名
            codeValueFun(code) {
                for (let k = 0; k < this.dbmCodeTypeInfos.length; k++) {
                    if (code === this.dbmCodeTypeInfos[k].code_type_id) {
                        return this.dbmCodeTypeInfos[k].code_type_name
                    }
                }
            },
            // 编辑打开
            editbasicByIdFun(row) {
                this.title = '编辑';
                this.dialogEditTableVisible = true;
                this.basic_id = row.basic_id;
                this.basicStaus = 'edit';
                let params = {};
                params["basic_id"] = row.basic_id;
                dataBenchmarkingAllFun.getDbmNormbasicInfoById(params).then(res => {
                    this.ruleForm_Info.standardNum = res.data.norm_code;
                    this.ruleForm_Info.cnName = res.data.norm_cname;
                    this.ruleForm_Info.enName = res.data.norm_ename;
                    this.ruleForm_Info.standardAlias = res.data.norm_aname;
                    this.ruleForm_Info.belongsClass = this.getparentClassNmae(res.data.sort_id, this.options);
                    //   params[""] = this.ruleForm_Info.standardDescription;//标准描述--
                    //   params[""] = this.ruleForm_Info.fieldName;//字段名称--
                    this.ruleForm_Info.data_types = this.datatypeFun(res.data.data_type);
                    this.ruleForm_Info.fieldLength = res.data.col_len;
                    this.ruleForm_Info.decimalLen = res.data.decimal_point;
                    this.ruleForm_Info.belongsCode = this.codeValueFun(res.data.code_type_id);
                    this.ruleForm_Info.worksDefin = res.data.business_def;
                    this.ruleForm_Info.workRule = res.data.business_rule;
                    this.ruleForm_Info.sdefinition = res.data.norm_basis;
                    this.ruleForm_Info.dbm_domain = res.data.dbm_domain;
                    this.ruleForm_Info.department = res.data.manage_department;
                    this.ruleForm_Info.relevantDepartments = res.data.relevant_department;
                    this.ruleForm_Info.norm_status = '已发布';
                    this.ruleForm_Info.trustedSystem = res.data.origin_system;
                    this.ruleForm_Info.relatedStandards = res.data.related_system;
                    this.ruleForm_Info.enactingPerson = res.data.formulator;
                });
            },
            //检索标准分类信息
            searchDbmSortInfoFun() {
                this.searchValue = this.search_Value;
                this.search_status = 'search';
                this.searchDbmSortInfo(this.searchValue, '1', this.pagesize, this.norm_status, this.nodeId)
            },
            searchDbmSortInfo(searchValue, currentpage, pagesize, norm_status, nodeId) {
                let that = this;
                dataBenchmarkingAllFun.searchDbmNormbasic({
                    "search_cond": searchValue,
                    'currPage': currentpage,
                    'pageSize': pagesize,
                    'status': norm_status,
                    'sort_id': nodeId
                }).then(res => {
                    let arr = res.data.dbmNormbasicInfos;
                    for (let i = 0; i < arr.length; i++) {
                        arr[i].sortName = this.getparentClassNmae(arr[i].sort_id, this.options);
                        for (let k = 0; k < that.dataType.length; k++) {
                            if (arr[i].data_type === that.dataType[k].code) {
                                arr[i].data_type = that.dataType[k].value
                            }
                        }
                    }
                    this.tableData2 = arr;
                    this.totalSize = res.data.totalSize
                })
            },
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
            // margin-left: 10px;
        }
    }

    #nameTable {
        .mytree /deep/ {
            .el-tree > .el-tree-node:after {
                border-top: none;
            }

            .el-tree-node {
                position: relative;
                padding-left: 16px;
            }

            //节点有间隙，隐藏掉展开按钮就好了,如果觉得空隙没事可以删掉
            /*  .el-tree-node__expand-icon.is-leaf {
                    display: none;
                } */

            .el-tree-node__children {
                padding-left: 16px;
            }

            .el-tree-node :last-child:before {
                height: 38px;
            }

            .el-tree > .el-tree-node:before {
                border-left: none;
            }

            .el-tree > .el-tree-node:after {
                border-top: none;
            }

            .el-tree-node:before {
                content: "";
                left: -4px;
                position: absolute;
                right: auto;
                border-width: 1px;
            }

            .el-tree-node:after {
                content: "";
                left: -4px;
                position: absolute;
                right: auto;
                border-width: 1px;
            }

            .el-tree-node:before {
                border-left: 1px dashed #4386c6;
                bottom: 0;
                height: 100%;
                top: -26px;
                width: 1px;
            }

            .el-tree-node__content > .el-tree-node__expand-icon {
                padding: 0;
            }

            .el-tree-node:after {
                border-top: 1px dashed #4386c6;
                height: 20px;
                top: 12px;
                width: 24px;
            }
        }

        .allbutton /deep/ {

            .el-button--mini,
            .el-button--mini.is-round {
                padding: 4px 5px;
            }
        }

        .data_edit /deep/ {
            .el-row {
                margin-bottom: 10px;
                padding-left: 10px;
            }

            .el-dialog__body {
                padding: 15px 20px;
            }

            .el-collapse {
                border: 0 !important;
            }

            .el-collapse-item__header {
                border: 0;

                .el-collapse-item__arrow {
                    display: none;
                }
            }

            .el-collapse-item__content {
                padding: 0;

                .el-form-item {
                    margin-bottom: 0;
                }
            }

            .el-collapse-item__wrap {
                border: 0;
                padding: 0 16px
            }
        }
    }

    #nameTable {
        .locationcenter {
            text-align: center;
            margin-top: 5px;
        }

        .zdtitle {
            font-size: 15px;
            // font-weight: bold;
            color: #2196f3;
        }

        .scrollbar-wrap {
            width: 24% !important;
            position: absolute;
        }

        .scrollbar__track {
            width: 4px;
        }
    }

    .span-ellipsis {
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        display: block;
        font-size: 14px;
    }

    .xjtxtcolor p {
        color: #636c73;
        display: inline-block;
        font-weight: bold;
    }

    .xjtxtcolor span {
        color: #a09d9d;
    }

    .xjtxtcolor {
        border-bottom: 1px dotted #eae7e7;
        height: 30px;
        line-height: 30px;
    }
</style>
