<template>
<div class="configTemplate">
    <el-row class="elRows">
        <p class="tempalteInfo">模板信息</p>
        <p class="tempalteButton">
            <el-button type="danger" class="templateButton" @click="goBack" size="small">
                返回
            </el-button>
            <el-button type="primary" class="templateButton" v-if="showOrhiddenSave" @click="addTemplates('formAdd')" size="small">
                保存
            </el-button>
        </p>
    </el-row>
    <!-- <div class="lines"></div> -->
    <el-row class="elRowone">
        <el-col :span="10">
            <el-row>
                <el-form :model="formAdd" ref="formAdd">
                    <el-col :span="24">
                        <el-form-item label="模板名称" :label-width="formLabelWidth" prop="template_name" :rules="filter_rules([{required: true}])">
                            <el-input v-model="formAdd.template_name" autocomplete="off" placeholder="请输入模板名称" style="width:284px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="是否外部数据库" :label-width="formLabelWidth" prop="data_source">
                            <el-radio-group v-model="formAdd.data_source" @change="changeValue">
                                <el-radio :label="'0'">否</el-radio>
                                <el-radio :label="'1'">是</el-radio>
                            </el-radio-group>
                            <span class="radioSpan" @click="dialogDataName" v-show="showORhidden">查看内部数据库</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="模板描述" :label-width="formLabelWidth" prop="template_desc" :rules="filter_rules([{required: true}])">
                            <el-input type="textarea" v-model="formAdd.template_desc" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
                        </el-form-item>
                    </el-col>

                </el-form>
            </el-row>
        </el-col>
        <el-col :span="14">
            <span>SQL语句 <el-tooltip class="item" effect="dark" placement="right">
                    <div slot="content">1.设置别名必须使用'' ''<br />2.SQL末端不要使用;</div>
                    <i class="el-icon-info elIconInfo"></i>
                </el-tooltip></span>
            <div style="border:1px solid #ccc;margin-bottom:10px">
                <SqlEditor ref="sqleditormain" :data="1" :value="basicInfoForm.sqlMain" @changeTextarea="changeTextareaQuerySql($event)" class='textasql' />
            </div>
            <el-button type="info" class="createPraButton" v-if="showOrhiddenSave" :loading="createPraLoading" @click="createPra" size="small">
                生成参数
            </el-button>
            <el-button type="success" class="createPraButton  createPraButtonSql " v-if="showOrhiddenSave" :loading="checkPraLoading" @click="checkSQL" size="small">
                SQL校验
            </el-button>
            <el-button type="primary" size="small" class="createPraButton" @click="formaterSql (basicInfoForm.sqlMain )">格式化sql
            </el-button>
        </el-col>
    </el-row>
    <el-dialog title="查询数据" :visible.sync="querydatadialogshow" width="60%">
        <el-row>
            <el-table :data="databysql" border size="mini">
                <el-table-column v-for="(index, item) in databysql[0]" :key="item" :label="item" show-overflow-tooltip :prop="item">
                    <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                    <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-row>
            <el-button type="primary" size="small" class="rightbtn" @click="querydatadialogshow = false">确定
            </el-button>
        </el-row>
    </el-dialog>
    <div v-show="showOrhiddenResult">
        <el-row>
            <el-row class="elRows">
                <p class="tempalteInfo">模板参数 (SQL WHERE 条件)</p>
            </el-row>
            <div class="lines"></div>
            <el-table size="medium" :data="tableDataPra" border stripe style="width: 100%" class="eltables">
                <el-table-column type="index" label="选择" width="70px" align='center'>
                    <template slot-scope="scope">
                        <el-checkbox name="nature" :checked="scope.row.checked ==true" v-model="scope.row.checked" @change="selectCheckbox(scope.row.checked,scope.row,scope.$index)"></el-checkbox>
                    </template>
                </el-table-column>
                <el-table-column prop="cond_para_name" show-overflow-tooltip label="参数名称" align='center'>
                </el-table-column>
                <el-table-column prop="cond_en_column" show-overflow-tooltip label="英文名称" align='center'>
                </el-table-column>
                <el-table-column prop="cond_cn_column" show-overflow-tooltip label="字段中文名称" align='center'>
                </el-table-column>
                <el-table-column prop="con_relation" show-overflow-tooltip label="关联关系" width="100px" align='center'>
                </el-table-column>
                <el-table-column label="值类型" align='center' width="140px">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.value_type" placeholder="请选择" size="mini">
                            <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="类型描述" align='center' width="180px">
                    <template slot-scope="scope">
                        <el-input v-if="scope.row.value_type =='01' ||scope.row.value_type =='02'" v-model="scope.row.value_size" size="mini" placeholder="类型描述"></el-input>
                        <div v-if="scope.row.value_type =='03'">
                            <el-input v-model="scope.row.value_size" readonly size="mini" placeholder="选择日期格式" style="width:110px;margin-right:10px"></el-input><span @click="getDateFormat(scope.$index,scope.row)" class="spanWordsstyle">格式</span>
                        </div>
                        <div v-if="scope.row.value_type =='04'">
                            <el-input v-model="scope.row.value_size" readonly size="mini" placeholder="选择常量" style="width:110px;margin-right:10px"></el-input><span @click="getConstant(scope.$index,scope.row)" class="spanWordsstyle">常量</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="预设值" align='center'>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.pre_value" size="mini" placeholder="预设值"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="是否必填" align='center' width="120">
                    <template slot-scope="scope">
                        <el-radio-group v-model="scope.row.is_required">
                            <el-radio :label="'1'">是</el-radio>
                            <el-radio :label="'0'">否</el-radio>
                        </el-radio-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-row>
            <el-row class="elRows">
                <p class="tempalteInfo">结果设置</p>
            </el-row>
            <div class="lines"></div>
            <el-table size="medium" :data="tableDataResult" border stripe style="width: 100%" class="eltables">
                <el-table-column type="index" label="序号" width="70px" align='center'>
                </el-table-column>
                <el-table-column prop="source_table_name" show-overflow-tooltip label="表名" align='center'>
                </el-table-column>
                <el-table-column prop="column_en_name" show-overflow-tooltip label="字段英文名" align='center'>
                </el-table-column>
                <el-table-column prop="column_cn_name" show-overflow-tooltip label="字段中文名" align='center'>
                </el-table-column>
                <el-table-column prop="res_show_column" show-overflow-tooltip label="显示名" align='center'>
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.res_show_column" size="mini" placeholder="显示名"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="字段类型" align='center' width="140px">
                    <template slot-scope="scope">
                        <el-select v-model="scope.row.column_type" placeholder="请选择" size="mini">
                            <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>

        <el-row class="elRowData" v-if="dynamicColumnTable.length >0">
            <el-row class="elRows">
                <p class="tempalteInfo">数据预览</p>
                <p class="tempalteButton">
                    <span><span class="spanInfo">(温馨提示：最多只显示1000行，默认100行)</span>
                        显示条数：<el-input placeholder="请输入非零的正整数" class="input-with-select" size="mini" style="width:200px" v-model="inputText">
                            <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
                        </el-input>
                    </span>
                </p>
            </el-row>
            <div class="lines"></div>
            <el-table size="medium" :data="dynamicColumnTable" border stripe style="width: 100%">
                <el-table-column type="index" label="序号" width="70px" align='center'>
                </el-table-column>
                <el-table-column v-for="col in dynamicColumn" show-overflow-tooltip min-width="200px" :prop="col" :label="col" :key="col">
                </el-table-column>
            </el-table>

        </el-row>
    </div>

    <!-- 复制小提示框 -->
    <span v-show="menuVisible" id="menu" class="menu" @mouseleave="foo" @click="copydatas">复制表名</span>
    <!-- 数据库信息 -->
    <el-dialog title="数据库信息(右键复制表名)" :visible.sync="dialogData" width="660px">
        <!--树菜单-->
        <div class='mytree '>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
            <el-tree class="filter-tree elDialogInfo" :data="webSqlTreeData" :indent='0' :filter-node-method="filterNode" ref="tree" @node-contextmenu="rightClick">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span :title="data.description" v-if="'undefined' !== typeof data.file_id && data.file_id !== ''">
                        <i class=" el-icon-document"></i>
                        <template v-if="'undefined' !== typeof data.original_name && data.original_name !== ''">{{data.original_name}}</template>
                        <template v-else-if="data.original_name === '' && data.table_name!==''">{{data.table_name}}</template>
                        <template v-else>{{data.hyren_name}}</template>
                    </span>
                    <span :title="data.description" v-else>
                        <i class="el-icon-folder-opened"></i>{{node.label}}
                    </span>
                </span>
            </el-tree>
        </div>
    </el-dialog>

    <!-- //日期格式选择 -->
    <el-dialog title="选择日期格式" :visible.sync="dialogDataDateFormate" width="500px">
        <div style="margin-left:76px" v-if="DateFormateType !=='其他'">
            <span style="margin-right:8px;">日期格式</span>
            <el-select v-model="DateFormateType" placeholder="请选择" size="mini">
                <el-option v-for="item in dateDataFormate" :key="item.formate" :label="item.formate" :value="item.formate">
                </el-option>
            </el-select>
        </div>
        <div style="margin-left:46px" v-if="DateFormateType =='其他'">
            <span style="margin-right:8px;">日期格式</span>
            <el-select v-model="DateFormateType" placeholder="请选择" size="mini" style="width:100px">
                <el-option v-for="item in dateDataFormate" :key="item.formate" :label="item.formate" :value="item.formate">
                </el-option>
            </el-select>
            <el-input v-model="DateFormateTypeValue" size="mini" style="width:200px;margin-left:6px" placeholder="显示名"></el-input>
        </div>

        <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="danger" @click="canclesavedialogDataDateFormate">取 消</el-button>
            <el-button type="primary" @click="savedialogDataDateFormate" size="mini">保存</el-button>
        </div>
    </el-dialog>

    <!-- //选择维表 -->
    <el-dialog title="选择维表(单击选择)" :visible.sync="dialogDataConstant" width="600px">
        <div class='mytree '>
            <el-input placeholder="输入关键字进行过滤" v-model="filterTextChart" size="mini" />
            <el-tree class="filter-tree elDialogInfo" :data="data2" :indent='0' :filter-node-method="filterNodeChart" :props="defaultProps" ref="trees" @node-click="nodeClickChartTree">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span v-if="data.children.length =='0'">
                        <i class="el-icon-document"></i>{{node.label}}
                    </span>
                    <span v-else>
                        <i class="el-icon-folder-opened"></i>{{node.label}}
                    </span>
                </span>
            </el-tree>
        </div>
    </el-dialog>
</div>
</template>

<script>
import SqlEditor from '../../components/codemirror/index2'
import sqlFormatter from 'sql-formatter'
import * as functionAll from "./selfAcess";
export default {
    components: {
        SqlEditor
    },
    data() {
        return {
            formLabelWidth: "130px",
            showORhidden: true,
            dialogData: false,
            inputText: null,
            formAdd: {
                template_desc: '',
                data_source: '',
                template_name: '',
            },
            basicInfoForm: {
                sqlMain: ''
            },
            tableDataPra: [],
            tableDataResult: [],
            filterText: '',
            filterTextChart: '',
            webSqlTreeData: [],
            menuVisible: false,
            copydata: '',
            createPraLoading: false,
            checkPraLoading: false,
            options: [],
            dynamicColumn: [],
            dynamicColumnTable: [],
            showOrhiddenResult: false,
            markResultArr: [],
            showOrhiddenSave: true,
            markIndexData: false,
            dateDataFormate: [],
            dialogDataDateFormate: false,
            DateFormateType: 'yyyy-MM-dd',
            markIndexs: '',
            DateFormateTypeValue: '',
            dialogDataConstant: false,
            data2: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            querydatadialogshow: false,
            databysql: []
        }
    },
    mounted() {
        //区分编辑和新增
        if (this.$route.query.template_id) { //编辑
            if (this.$route.query.template_status) { //查看配置模板
                this.showOrhiddenSave = false;
            }
            this.getAutoTpInfoById();
            this.getAutoTpCondInfoById();
            this.getAutoTpResSetById();
            this.showOrhiddenResult = true;
            this.markIndexData = true;
        } else {
            this.formAdd.data_source = "0";
            this.markIndexData = false;
        }
        this.getCategoryItems(); //获取代码项
        this.getWebSQLTreeData(); //获取树结构
    },
    watch: {
        //设置检索内容
        filterText(val) {
            this.$refs.tree.filter(val);
        },
        filterTextChart(val) {
            this.$refs.trees.filter(val);
        }
    },
    methods: {
        changeTextareaQuerySql(val) {
            this.$set(this.basicInfoForm, 'sqlMain', val)
        },
        // 生成参数
        createPra() {
            this.markIndexData = true;
            this.basicInfoForm.sqlMain = this.$refs.sqleditormain.getmVal();
            if (this.basicInfoForm.sqlMain === '') {
                this.$Msg.customizTitle('查询sql不能为空!', 'warning');
            } else {
                this.createPraLoading = true;
                this.searchInfo();
                functionAll.generateTemplateParam({
                    template_sql: this.basicInfoForm.sqlMain
                }).then(res => {
                    if (res && res.success) {
                        this.tableDataPra = res.data.autoTpCondInfo;
                        this.tableDataResult = res.data.autoTpResSetInfo;
                        this.createPraLoading = false;
                        this.showOrhiddenResult = true;
                    } else {
                        this.createPraLoading = false;
                    }

                })
            }

        },
        // 返回上一级
        goBack() {
            this.$router.push({
                name: 'autonomousAnalysisManage'
            })
        },
        // 保存模板
        addTemplates(formName) {
            this.basicInfoForm.sqlMain = this.$refs.sqleditormain.getmVal();
            if (this.basicInfoForm.sqlMain === '') {
                this.$Msg.customizTitle('查询sql不能为空!', 'warning');
                return;
            }
            if (this.$route.query.template_id) { //编辑
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        let arr = [];
                        this.tableDataPra.forEach((item) => { //将选中的模板参数传给后台
                            if (item.checked == true) {
                                arr.push(item)
                            }
                        })
                        functionAll.updateTemplateConfInfo({
                            autoTpCondInfos: JSON.stringify(arr),
                            autoTpResSets: JSON.stringify(this.tableDataResult),
                            template_desc: this.formAdd.template_desc,
                            data_source: this.formAdd.data_source,
                            template_name: this.formAdd.template_name,
                            template_sql: this.basicInfoForm.sqlMain,
                            template_id: this.$route.query.template_id,
                            create_user: this.formAdd.create_user,
                            template_status: this.formAdd.template_status
                        }).then(res => {
                            if (res && res.success) {
                                this.$router.push({
                                    name: 'autonomousAnalysisManage'
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            } else { //新增
                if (this.markIndexData === false) {
                    this.$Msg.customizTitle("请点击生成参数", "warning");
                } else {
                    this.$refs[formName].validate(valid => {
                        if (valid) {
                            let arr = [];
                            this.tableDataPra.forEach((item) => { //将选中的模板参数传给后台
                                if (item.checked == true) {
                                    arr.push(item)
                                }
                            })
                            functionAll.saveTemplateConfInfo({
                                autoTpCondInfos: JSON.stringify(arr),
                                autoTpResSets: JSON.stringify(this.tableDataResult),
                                template_desc: this.formAdd.template_desc,
                                data_source: this.formAdd.data_source,
                                template_name: this.formAdd.template_name,
                                template_sql: this.basicInfoForm.sqlMain
                            }).then(res => {
                                if (res && res.success) {
                                    this.$router.push({
                                        name: 'autonomousAnalysisManage'
                                    })
                                }
                            })
                        } else {
                            return false;
                        }
                    });
                }

            }
        },
        // 校验sql
        checkSQL() {
            this.checkPraLoading = true;
            this.querydatadialogshow = true;
            this.basicInfoForm.sqlMain = this.$refs.sqleditormain.getmVal();
            if (this.basicInfoForm.sqlMain === '') {
                this.$Msg.customizTitle('查询sql不能为空!', 'warning');
                return;
            }
            functionAll.verifySqlIsLegal({
                template_sql: this.basicInfoForm.sqlMain
            }).then(res => {
                if (res && res.success) {
                    this.databysql = res.data;
                    this.checkPraLoading = false;
                } else {
                    this.checkPraLoading = false;
                    this.querydatadialogshow = false;
                }
            })
        },
        //格式化sql语句
        formaterSql(val) {
            this.$refs.sqleditormain.sqlFormatter()
        },
        // 改变单选按钮
        changeValue(val) {
            if (val == '0') {
                this.showORhidden = true;
            } else {
                this.showORhidden = false;
            }
        },
        // 查找数据预览信息
        searchInfo() {
            this.basicInfoForm.sqlMain = this.$refs.sqleditormain.getmVal();
            functionAll.getPreviewData({
                template_sql: this.basicInfoForm.sqlMain,
                showNum: Number(this.inputText)
            }).then(res => {
                if (res.data.length > 0) {
                    this.dynamicColumn = Object.keys(res.data[0])
                    this.dynamicColumnTable = res.data;
                }

            })
        },
        //内部数据库弹出框
        dialogDataName() {
            this.dialogData = true
        },
        // 获取树信息
        getWebSQLTreeData() {
            functionAll.getAutoAnalysisTreeData().then(res => {
                this.webSqlTreeData = res.data;
            });
        },
        // 节点搜索
        filterNode(value, data) {
            // 如果检索内容为空,直接返回
            if (!value) return true;
            // 如果传入的value和data中的name相同说明是匹配到了,匹配时转小写匹配
            // 检索内容为 original_name table_name hyren_name
            if ('undefined' !== typeof data.file_id && data.file_id !== '') {
                return (
                    ('undefined' !== typeof data.original_name && data.original_name !== '' && data.original_name.indexOf(value) !== -1) ||
                    ('undefined' !== typeof data.table_name && data.table_name !== '' && data.table_name.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
                    ('undefined' !== typeof data.hyren_name && data.hyren_name !== '' && data.hyren_name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
                )

            }
        },
        // 树右键复制代码
        rightClick(MouseEvent, object, Node, element) {
            if (Node.data.file_id.length > 0) {
                this.copydata = Node.label;
                this.menuVisible = false;
                this.menuVisible = true;
                var menu = document.querySelector('#menu');
                document.addEventListener('click', this.foo);
                menu.style.display = "block";
                menu.style.left = MouseEvent.pageX + 20 + 'px';
                menu.style.top = MouseEvent.pageY - 8 + 'px';
            } else {
                return false;
            }
        },
        foo() {
            this.menuVisible = false
            document.removeEventListener('click', this.foo) //关闭事件监听
        },
        // 复制代码
        copydatas() {
            let tableName = this.copydata;
            let oInput = document.createElement('input');
            oInput.value = tableName;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象;
            document.execCommand("Copy"); // 执行浏览器复制命令
            oInput.remove();
        },
        //模板参数checkbox选择
        selectCheckbox(key, row, index) {
            if (key === true) { //添加
                // row.con_row = index;
                if (this.markResultArr.findIndex(item => String(item) == String(row)) === -1) {
                    this.markResultArr.push(row)
                }
            } else { //删除
                let index = this.markResultArr.findIndex(item => String(item) == String(row));
                if (index !== 1) {
                    this.markResultArr.splice(index, 1)
                }
            }
        },
        // 获取代码项
        getCategoryItems() {
            functionAll.getCategoryItems({
                category: 'AutoValueType'
            }).then(res => {
                this.options = res.data;
            })
        },
        // 编辑时获取初始值
        getAutoTpInfoById() { //获取自主取数模板配置信息
            functionAll.getAutoTpInfoById({
                template_id: this.$route.query.template_id
            }).then(res => {
                this.formAdd = res.data;
                this.basicInfoForm.sqlMain = this.$refs.sqleditormain.setmVal(res.data.template_sql);
                this.formaterSql(res.data.template_sql);
                this.searchInfo();
            })
        },
        getAutoTpCondInfoById() { //获取自主取数模板条件信息
            functionAll.getAutoTpCondInfoById({
                template_id: this.$route.query.template_id
            }).then(res => {
                this.tableDataPra = res.data;

            })
        },
        getAutoTpResSetById() { //自主取数模板结果信息
            functionAll.getAutoTpResSetById({
                template_id: this.$route.query.template_id
            }).then(res => {
                this.tableDataResult = res.data;
            })
        },
        // 获取日期格式
        getDateFormat(index, row) {
            if (row.value_type === "03") {
                this.DateFormateType = row.value_size;
                this.DateFormateTypeValue = row.value_size;
            } else if (row.value_type === "04") {

            }
            this.markIndexs = index;
            this.dateDataFormate = [{
                formate: 'yyyy-MM-dd'
            }, {
                formate: 'yyyy/MM/dd'
            }, {
                formate: 'yyyy,MM,dd'
            }, {
                formate: 'MM/dd/yyyy'
            }, {
                formate: '其他'
            }]
            this.dialogDataDateFormate = true;
        },
        // 保存日期格式
        savedialogDataDateFormate() {
            if (this.DateFormateType !== '其他') {
                this.tableDataPra[this.markIndexs].value_size = this.DateFormateType;
            } else {
                this.tableDataPra[this.markIndexs].value_size = this.DateFormateTypeValue;
            }
            this.dialogDataDateFormate = false;
        },
        // 取消保存日期格式
        canclesavedialogDataDateFormate() {
            this.dialogDataDateFormate = false;
        },
        // 获取常量
        getConstant(index, row) {
            this.getAllCodeItems();
            this.markIndexs = index;
            this.dialogDataConstant = true;
        },
        // 获取全部代码项
        getAllCodeItems() {
            functionAll.getAllCodeItems({}).then(res => {
                let arr = [];
                for (let key in res.data) {
                    res.data[key].forEach(item => {
                        item.label = item.value;
                        item.children = [];
                    })
                    let object = {
                        label: res.data[key][0].catValue,
                        children: res.data[key]
                    }
                    arr.push(object)
                    this.data2 = arr;
                }
            })
        },
        // 点击树获得对应表信息
        nodeClickChartTree(data, node) {
            if (data.children.length === 0) {
                this.tableDataPra[this.markIndexs].value_size = data.catValue;
                this.tableDataPra[this.markIndexs].pre_value = data.label;
                this.dialogDataConstant = false;
            }
        },
        // 快速筛选树
        filterNodeChart(value, data) {
            // 如果检索内容为空,直接返回
            if (!value) return true;
            if ('undefined' !== typeof data.label) {
                return data.label.indexOf(value) !== -1
            }
        },
    }
}
</script>

<style scoped>
.textasql>>>.CodeMirror {
    height: 200px !important;
    /* width:200px !important; */
}

.rightbtn {
    margin-top: 12px;
    float: right;
    margin: 10px;
    margin-bottom: 10px;
}

/* title设置 */
.tempalteInfo {
    float: left;
    font-size: 18px;
    color: #2196f3;
}

.tempalteButton {
    float: right;
}

/* 行设置  */
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

.elRowone {
    margin-top: 4px;
    border: 1px solid #ddd;
    padding: 18px 2px 0px 4px;
    margin-bottom: 16px;
}

/* 生成参数按钮设置 */
.createPraButton {
    float: right;
    margin-bottom: 10px;
}

/* SQL校验 */
.createPraButtonSql {
    margin-right: 4px;
}

/* 提示信息 */
.configTemplate .elIconInfo {
    padding: 0 !important;
}

/* 数据预览 */
.spanInfo {
    color: red;
    font-size: 14px;
}

.elRowData {
    margin-bottom: 20px;
}

/* 数据库字体设置 */
.radioSpan {
    margin-left: 30px;
    color: #409EFF;
    cursor: pointer;
}

/* 复制表名样式设置 */
.configTemplate .menu {
    display: inline-block;
    text-align: center;
    height: 20px;
    line-height: 20px;
    width: 80px;
    left: 0px;
    top: 0px;
    font-size: 14px;
    position: absolute;
    border-radius: 5px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
    z-index: 3000;
    cursor: pointer;
}

/* 表格设置 */
.configTemplate .eltables {
    margin-bottom: 16px;
}

.elDialogInfo {
    margin-top: 4px;
    height: 240px;
    overflow: auto;
}

/*滚动条样式*/
::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}

::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(193, 193, 193);
    background: rgba(193, 193, 193);
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241);
    border-radius: 0;
    background: rgb(241, 241, 241);

}

/* 模板参数单选按钮 */
.configTemplate>>>.el-radio__label {
    padding-left: 4px;
}

.configTemplate>>>.el-radio {
    margin-right: 14px;
}

/* select选择框 */
.configTemplate .eltables>>>.el-input--mini .el-input__inner {
    height: 24px;
    line-height: 24px;
}

/* 表格span标签 */
.configTemplate .spanWordsstyle {
    cursor: pointer;
    color: #2196f3;
}
</style>
