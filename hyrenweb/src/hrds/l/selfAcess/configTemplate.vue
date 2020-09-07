<template>
<div class="configTemplate">
    <el-row class="elRows">
        <p class="tempalteInfo">模板信息</p>
        <p class="tempalteButton">
            <el-button type="danger" class="templateButton" @click="goBack" size="small">
                返回
            </el-button>
            <el-button type="primary" class="templateButton" v-if="showOrhidden" @click="addTemplates" size="small">
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
                        <el-form-item label="模板名称" :label-width="formLabelWidth" prop="dep_name" :rules="filter_rules([{required: true}])">
                            <el-input v-model="formAdd.dep_name" autocomplete="off" placeholder="请输入部门名称" style="width:284px"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="数据来源" :label-width="formLabelWidth" prop="dep_remark">
                            <el-radio-group v-model="radio" @change="changeValue">
                                <el-radio :label="0">内部</el-radio>
                                <el-radio :label="1">外部</el-radio>
                            </el-radio-group>
                            <span class="radioSpan" @click="dialogDataName" v-show="showORhidden">查看内部数据库</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="24">
                        <el-form-item label="模板描述" :label-width="formLabelWidth" prop="dep_remark" :rules="filter_rules([{required: true}])">
                            <el-input type="textarea" v-model="formAdd.dep_remark" autocomplete="off" placeholder="备注" style="width:284px"></el-input>
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
            <!-- <SqlEditor ref="sqleditor" :data="1" :value="basicInfoForm.sqlMain" @changeTextarea="changeTextarea($event)" class='textasql' /> -->
            <div id="editor" style="width:100%;height:200px"></div>
            <el-button type="info" class="createPraButton" :loading="createPraLoading" @click="createPra" size="small">
                生成参数
            </el-button>
            <el-button type="success" class="createPraButton createPraButtonSql " @click="checkSQL" size="small">
                SQL校验
            </el-button>
        </el-col>
    </el-row>
    <el-row>
        <el-row class="elRows">
            <p class="tempalteInfo">模板参数 (SQL WHERE 条件)</p>
        </el-row>
        <div class="lines"></div>
        <el-table size="medium" :data="tableDataPra" border stripe style="width: 100%" class="eltables">
            <el-table-column type="index" label="选择" width="70px" align='center'>
                <template slot-scope="scope">
                    <el-checkbox name="nature" :checked="scope.row.is_hbase ==true" v-model="scope.row.is_hbase" @change="selectCheckbox(scope.row.is_hbase,scope.row,scope.$index)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="参数名称" align='center'>
            </el-table-column>
            <el-table-column prop="etl_sys_name" show-overflow-tooltip label="英文名称" align='center'>
            </el-table-column>
            <el-table-column prop="comments" show-overflow-tooltip label="别名" align='center'>
            </el-table-column>
            <el-table-column prop="curr_bath_date" show-overflow-tooltip label="关联关系" width="100px" align='center'>
            </el-table-column>
            <el-table-column label="值类型" align='center' width="140px">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.valueType" placeholder="请选择" size="mini">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column label="类型描述" align='center'>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.typeDec" size="mini" placeholder="类型描述"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="预设值" align='center'>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.begin" size="mini" placeholder="预设值"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="是否必填" align='center' width="120">
                <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.isTrue">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
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
            <el-table-column prop="etl_sys_cd" show-overflow-tooltip label="表名" align='center'>
            </el-table-column>
            <el-table-column prop="etl_sys_name" show-overflow-tooltip label="字段名" align='center'>
            </el-table-column>
            <el-table-column prop="comments" show-overflow-tooltip label="别名" align='center'>
            </el-table-column>
            <el-table-column prop="curr_bath_date" show-overflow-tooltip label="显示名" align='center'>
                <template slot-scope="scope">
                    <el-input v-model="scope.row.begin" size="mini" placeholder="显示名"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="字段类型" align='center' width="140px">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.valueType" placeholder="请选择" size="mini">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
    </el-row>

    <el-row class="elRowData">
        <el-row class="elRows">
            <p class="tempalteInfo">数据预览</p>
            <p class="tempalteButton">
                <span><span class="spanInfo">(温馨提示：最多只显示1000行)</span>
                    显示条数：<el-input placeholder="请输入非零的正整数" class="input-with-select" size="mini" style="width:200px" v-model="inputText">
                        <el-button slot="append" icon="el-icon-search" @click="searchInfo"></el-button>
                    </el-input>
                </span>
            </p>
        </el-row>
        <div class="lines"></div>
    </el-row>
    <!-- 复制小提示框 -->
    <span v-show="menuVisible" id="menu" class="menu" @mouseleave="foo" @click="copydatas">复制表名</span>
    <!-- 数据库信息 -->
    <el-dialog title="数据库信息(右键复制表名)" :visible.sync="dialogData" width="660px">
        <!--树菜单-->
        <div class='mytree '>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
            <el-tree class="filter-tree elDialogInfo" :data="webSqlTreeData" :indent='0' @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree" @node-contextmenu="rightClick">
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
        <!-- <div slot="footer" class="dialog-footer">
            <el-button size="mini" type="danger" @click="cancleAdd">取 消</el-button>
            <el-button type="primary" @click="saveChangeAgent('formAdd')" size="mini">保存</el-button>
        </div> -->
    </el-dialog>

</div>
</template>

<script>
import SqlEditor from '../../components/codemirror/index2'
import sqlFormatter from 'sql-formatter'
import * as functionAll from "./templateConfig";
export default {
    components: {
        SqlEditor
    },
    data() {
        return {
            showOrhidden: true,
            formLabelWidth: "130px",
            radio: 1,
            showORhidden: false,
            dialogData: false,
            inputText: '',
            formAdd: {

            },
            basicInfoForm: {
                sqlMain: ''
            },
            tableDataPra: [{
                is_hbase: true,
                isTrue: 1
            }, {
                is_hbase: false,
                isTrue: 0
            }],
            tableDataResult: [{}],
            filterText: '',
            webSqlTreeData: [],
            menuVisible: false,
            copydata: '',
            createPraLoading: false,
        }
    },
    mounted() {
        //区分编辑和新增
        let that = this;
        var editor = ace.edit("editor")
        editor.session.setMode('ace/mode/sql') // 设置语言
        editor.setTheme('ace/theme/chrome') // 设置主题
        editor.setFontSize(18); //字体大小
        editor.setReadOnly(false); //设置只读（true时只读，用于展示代码）
        //自动换行,设置为off关闭
        editor.setOption("wrap", "free");
        //启用提示菜单
        ace.require("ace/ext/language_tools");
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true
        });
        editor.setHighlightActiveLine(true); //代码高亮
        editor.setShowPrintMargin(false);
        editor.getSession().setUseWorker(false);
        editor.getSession().setUseWrapMode(true); //支持代码折叠
        editor.selection.getCursor(); //获取光标所在行或列
        editor.session.getLength(); //获取总行数
        editor.getSession().setUseSoftTabs(true);
        var langTools = ace.require("ace/ext/language_tools");
        // langTools.addCompleter({
        //     getCompletions: function (editor, session, pos, prefix, callback) {
        //         if (prefix.length === 0) {
        //             callback(null, []);
        //             return;
        //         }
        //         var value = editor.getValue() + "";
        //         if (value.toLowerCase().indexOf("from") >= 0 || value.toLowerCase().indexOf("into") >= 0 || value.toLowerCase().indexOf("set") >= 0) {
        //             callback(null, that.arry);
        //         }
        //     }
        // });
        // editor.on("change", that.debounce(function (e) {
        //     editor.execCommand("startAutocomplete");
        //     that.$emit('changeTextarea', editor.session.getValue())
        //     var execute_sql = editor.session.getValue() + "";
        //     if (execute_sql.toLowerCase().indexOf("from") >= 0 || execute_sql.toLowerCase().indexOf("into") >= 0 || execute_sql.toLowerCase().indexOf("set") >= 0) {
        //         that.getTablenameWords(execute_sql);
        //     }
        // }))
    },
    watch: {
        //设置检索内容
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    methods: {
        // 生成参数
        createPra() {

        },
        // 返回上一级
        goBack() {

        },
        // 保存模板
        addTemplates() {

        },
        // 校验sql
        checkSQL() {
            this.sqlFormatter(); //格式化sql;
            //调用后台查询接口
        },
        //格式化sql语句
        sqlFormatter() {
            var editors = ace.edit('editor')
            var beautifys = ace.require("ace/ext/beautify");
            editors.session.setValue(sqlFormatter.format(editors.session.getValue()));
            beautifys.beautify(editors.session);
        },
        // 改变单选按钮
        changeValue(val) {
            if (val == 0) {
                this.showORhidden = true;
            } else {
                this.showORhidden = false;
            }
        },
        // 查找数据预览信息
        searchInfo() {

        },
        //内部数据库弹出框
        dialogDataName() {
            this.dialogData = true
            this.getWebSQLTreeData()

        },
        // 获取树信息
        getWebSQLTreeData() {
            functionAll.getWebSQLTreeData().then(res => {
                this.webSqlTreeData = res.data;
            });
        },
        //树点击触发
        handleNodeClick(data) {
            this.isLoading = true;
            if ('undefined' !== typeof data.file_id && data.file_id !== '') {
                // 查询数据
                this.dataByTableName = [];
                functionAll.queryDataBasedOnTableName({
                    'tableName': data.hyren_name
                }).then((res) => {
                    if (res.success) {
                        this.isLoading = false;
                        this.dataByTableName = res.data;
                    } else {
                        this.isLoading = false;
                    }
                });
            }
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
            console.log(key, row, index)
        }

    }
}
</script>

<style scoped>
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
</style>
