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
        <el-col :span="6">
            <!--树菜单-->
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
            <div style='height:0.1px'>&nbsp;</div>
            <Scrollbar>
                <div class='mytree' height='260'>
                    <el-tree class="filter-tree" :data="webSqlTreeData" :indent='0' @node-click="handleNodeClick" :filter-node-method="filterNode" ref="tree" @node-contextmenu="rightClick">
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
            </Scrollbar>
        </el-col>
        <el-col :span="18" style="border-left: 1px #e0dcdc dashed;min-height: 570px;">
            <el-tabs v-model="activeName" type="border-card" @tab-click='tabClick()'>
                <el-tab-pane label="表查询" name="tableQuery">
                    <el-table :data="dataByTableName" stripe border size="medium" :header-cell-style="thStyleFun" :cell-style="cellStyleFun">
                        <template v-for="(index, item) in dataByTableName[0]">
                            <el-table-column v-if="item !=='hyren_s_date' && item !=='hyren_e_date' && item !=='hyren_md5_val'" :render-header="labelHead" :key="item" :label="item" :prop="item" show-overflow-tooltip>
                                <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                                <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                            </el-table-column>
                        </template>
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
                                <SqlEditor ref="sqleditor" :data="1" :value="basicInfoForm.sqlMain" @changeTextarea="changeTextarea($event)" class='textasql' />
                            </div>
                        </el-col>
                    </el-row>
                    <el-table :data="dataBySQL" stripe border size="medium" :header-cell-style="thStyleFun" :cell-style="cellStyleFun" v-show="showOrhidden">
                        <template v-for="(index, item) in dataBySQL[0]">
                            <el-table-column v-if="item !=='hyren_s_date' && item !=='hyren_e_date' && item !=='hyren_md5_val'" :render-header="labelHead" :key="item" :label="item" :prop="item" show-overflow-tooltip>
                                <!-- 数据的遍历  scope.row就代表数据的每一个对象-->
                                <template slot-scope="scope">{{scope.row[scope.column.property]}}</template>
                            </el-table-column>
                        </template>
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
import sqlFormatter from 'sql-formatter'
import SqlEditor from '../../components/codemirror/index2'
import Scrollbar from '../../components/scrollbar';
export default {
    name: "codeMirror",
    components: {
        Loading,
        SqlEditor,
        Scrollbar,
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
            index1: 1,
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
        //表头居中
        thStyleFun() {
            return 'text-align:center'
        },
        //数据居中
        cellStyleFun() {
            return 'text-align:center'
        },
        //表头自适应
        labelHead: function (h, { column, index }) {
            let l = column.label.length
            let f = 14 //每个字大小，其实是每个字的比例值，大概会比字体大小差不多大一点，
            column.minWidth = f * l //字大小乘个数即长度 ,注意不要加px像素，这里minWidth只是一个比例值，不是真正的长度
            //然后将列标题放在一个div块中，注意块的宽度一定要100%，否则表格显示不完全
            return h('div', { class: 'table-head', style: { width: '100%' } }, [column.label])
        },
        //点击标签触发
        tabClick() {
            if (this.activeName == 'sqlQuery') {
                // this.$nextTick(() => {
                //     // this.$refs.sqleditor.refresh();
                // });
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
        getWebSQLTreeData() {
            dataQuery.getWebSQLTreeData().then(res => {
                this.webSqlTreeData = res.data;
            });
        },
        //树点击触发
        handleNodeClick(data) {
            this.isLoading = true;
            if ('undefined' !== typeof data.file_id && data.file_id !== '') {
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
            let querySQL = this.$refs.sqleditor.getmVal();
            // let querySQL = this.basicInfoForm.sqlMain;
            if (querySQL === '') {
                this.$Msg.customizTitle('查询sql不能为空', 'warning')
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
            // let dom = this.$refs.sqleditor
            // dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
            this.$refs.sqleditor.sqlFormatter()
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

.scrollbar-wrap {
    width: 24% !important;
    position: absolute;
}

.scrollbar__track {
    width: 4px;
}
</style>
