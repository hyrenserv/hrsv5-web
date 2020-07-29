<template>
<div class="websqlconsole">
    <el-row class='topTitle'>
        <span>SQL 操作台</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg" />返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row>
        <el-col class="borderStyle" :span="5">
            <!--树菜单-->
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
            <div class='mytree'>
                <el-tree class="filter-tree" :data="webSqlTreeData" :indent='0' @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree" @node-contextmenu="rightClick">
                    <span class="span-ellipsis" slot-scope="{ node, data }" v-if="data.description.length >0">
                        <span :title="data.description" v-if="data.file_id.length > 0">
                            <i class=" el-icon-document"></i>{{node.label}}
                        </span>
                        <span :title="data.description" v-else>
                            <i class="el-icon-folder-opened"></i>{{node.label}}
                        </span>
                    </span>
                    <span class="span-ellipsis" slot-scope="{ node, data }" v-else>
                        <span :title="data.label" v-if="data.file_id.length > 0">
                            <i class=" el-icon-document"></i>{{node.label}}
                        </span>
                        <span :title="data.label" v-else>
                            <i class="el-icon-folder-opened"></i>{{node.label}}
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="18" :offset="1">
            <el-tabs v-model="activeName" type="border-card" @tab-click='tabClick()'>
                <el-tab-pane label="表查询" name="tableQuery">
                    <el-table :data="dataByTableName" stripe border size="medium">
                        <el-table-column v-for="(index, item) in dataByTableName[0]" :key="item" :label="item" :prop="item" show-overflow-tooltip >
                            <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                            <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="Sql查询" name="sqlQuery">
                    <el-row>
                        <el-button class="query-sql-btn" style="float: right;" type="primary" @click="getDataBySQL()" size="small">查询
                        </el-button>
                        <el-button type="success" style="float: right;" size="small" class="sql-btn" @click="formaterSql (basicInfoForm.sqlMain)">格式化sql</el-button>
                    </el-row>
                    <el-row>
                        <el-col>
                            <div>
                                <SqlEditor ref="sqleditor" :value="basicInfoForm.sqlMain" @changeTextarea="changeTextarea($event)" class='textasql' />
                            </div>
                        </el-col>
                    </el-row>

                    <el-table :data="dataBySQL" stripe border size="medium" v-show="showOrhidden">
                        <el-table-column v-for="(index, item) in dataBySQL[0]" :key="item" :label="item" :prop="item" show-overflow-tooltip >
                            <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                            <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
    <!-- 复制小提示框 -->
    <span v-show="menuVisible" id="menu" class="menu" @mouseleave="foo" @click="copydatas">复制表名</span>
</div>
</template>

<script>
import * as dataQuery from "./dataQuery";
import Loading from '../../components/loading';
/* import {
    codemirror
} from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/duotone-dark.css'
import 'codemirror/mode/sql/sql.js' */
import sqlFormatter from 'sql-formatter'
import SqlEditor from '../../components/codemirror'
export default {
    name: "codeMirror",
    components: {
        Loading,
        // codemirror,
        SqlEditor
    },
    data() {
        return {
            isLoading: false,
            menuVisible: false,
            showOrhidden: false,
            querySQL: '',
            filterText: '',
            activeName: 'tableQuery',
            filterNodeData: [],
            dataByTableName: [],
            dataBySQL: [],
            copydata: '',
            basicInfoForm: {
                sqlMain: ''
            },
            webSqlTreeData: [],
        };
    },
    watch: {
        //设置检索内容
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    mounted() {
        //获取webSQL树信息
        this.getWebSQLTreeData();
    },
    methods: {
        tabClick() {
            if (this.activeName == 'sqlQuery') {
                this.$nextTick(() => {
                    this.$refs.sqleditor.refresh();
                });
            }
        },
        // 节点搜索
        filterNode(value, data) {
            // 如果检索内容为空,直接返回
            if (!value) return true;
            // 如果传入的value和data中的name相同说明是匹配到了,匹配时转小写匹配
            return data.hyren_name.toLowerCase().indexOf(value.toLowerCase()) !== -1;
        },
        getWebSQLTreeData() {
            dataQuery.getWebSQLTreeData().then(res => {
                this.webSqlTreeData = res.data;
            });
        },
        //树点击触发
        handleNodeClick(data) {
            this.isLoading = true;
            if (data.file_id !== '') {
                // 查询数据
                this.dataByTableName = [];
                dataQuery.queryDataBasedOnTableName({
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

        // 根据SQL查询数据
        getDataBySQL() {
            let querySQL = this.basicInfoForm.sqlMain;
            if (querySQL === '') {
                this.$message({
                    type: 'warning',
                    message: '查询sql不能为空!'
                });
            } else {
                this.dataBySQL = [];
                dataQuery.queryDataBasedOnSql({
                    'querySQL': querySQL
                }).then((res) => {
                    if (res.success) {
                        this.showOrhidden = true;
                        this.dataBySQL = res.data;
                    }
                });
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

        changeTextarea(val) {
            this.$set(this.basicInfoForm, 'sqlMain', val)
        },
        formaterSql(val) {
            let dom = this.$refs.sqleditor
            dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
        },
    }
}
</script>

<style scoped>
.borderStyle {
    border: 1px solid #e6e6e6;
    padding: 1%;
}

/* 查询sql按钮*/
.query-sql-btn {
    margin-left: 2%;
}

.websqlconsole .menu {
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
    z-index: 100;
    cursor: pointer;
}

.websqlconsole>>>.CodeMirror {
    width: 100%;
    border: 1px solid #ddd;
    height: 60px;
    background: #fff;
    margin-bottom: 10px;
}

.textasql>>>.CodeMirror {
    height: 200px !important;
    /* width:200px !important; */
}

.sql-btn {
    margin-bottom: 5px;
}
</style>
