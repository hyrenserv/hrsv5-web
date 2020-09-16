<template>
<div class="visualizationDiv">
    <el-row class="elRowtitle">
        <p class="tempalteInfo">选择数据源</p>
        <div class="templateButton">
            <el-button type="danger" size="small">
                返回上级
            </el-button>
            <el-button type="primary" size="small">
                保存组件
            </el-button>
        </div>
    </el-row>
    <div class="lines"></div>
    <el-row>
        <el-select v-model="formvalue" placeholder="请选择表单" size="small" style="width:160px" clearable @change="changeSelectDataCollect">
            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code">
            </el-option>
        </el-select>
        <el-input style="width:220px;" size="small" v-model="input" disabled placeholder="选择表单内容"></el-input>
    </el-row>
    <el-row>
        <el-col :span="8" class="elcol8">
            <p class="optionsWords">设置显示字段 </p>
            <div class="showArryDiv">
                <ul>
                    <li v-for="(item,index) in optionsWords" :key="item.name" style="padding-left:10px;height:30px;line-height:30px;"> {{item.name}} <span style="cursor:pointer;" @click="clickClose(item,index)"><i class="el-icon-close"></i></span><span v-if="optionsWords.length >1"><i class="el-icon-top"></i></span><span v-if="optionsWords.length >1"><i class="el-icon-bottom"></i></span></li>
                </ul>
            </div>
            <div class="elcol8Button">
                <el-button size="mini" type="primary">添加字段</el-button>
            </div>

            <div class="showArryDiv showArryDivSelect ">
                <div class="showArryDivContent">计算字段汇总值（sum）</div>
                <div class="showArryDivContent">计算字段平均值（avg）</div>
                <div class="showArryDivContent">计算字段最大值（max）</div>
                <div class="showArryDivContent">计算字段最小值（min）</div>
                <div class="showArryDivContent">统计总记录数（count）</div>
                <div class="showArryDivContent">选择所有结果字段（*）</div>
                <div class="showArryDivContent">逐个选择表字段</div>
            </div>
        </el-col>
        <el-col :span="8" class="elcol8">
            <p class="optionsWords">设置过滤条件<el-button disabled size="mini" type="primary">修改条件逻辑</el-button>
            </p>
            <div class="showArryDiv">

            </div>
            <div class="elcol8Button">
                <el-button size="mini" type="primary">添加过滤条件</el-button>
            </div>
            <div class="showArryDiv showArryDivSelect ">
            </div>
        </el-col>
        <el-col :span="8" class="elcol8">
            <p class="optionsWords">设置分组条件</p>
            <div class="showArryDiv">

            </div>
            <div class="elcol8Button">
                <el-button size="mini" type="primary">添加分组条件</el-button>
            </div>
            <div class="showArryDiv showArryDivSelect ">
            </div>
        </el-col>
    </el-row>
    <el-row>
        <el-button size="mini" type="primary">得到答案</el-button>
    </el-row>
    <el-row>

    </el-row>
    <!-- 系统级数据信息 -->
    <el-dialog title="选择表单(单击选择表名)" :visible.sync="dialogData" width="660px">
        <!--树菜单-->
        <div class='mytree '>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
            <el-tree class="filter-tree elDialogInfo" :data="webSqlTreeData" :indent='0' :filter-node-method="filterNode" ref="tree" @node-click="nodeClickChartTree">
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
            <div slot="footer" class="dialog-footer" style="height:30px">
                <el-button @click="cancelSelectTreeName" size="mini" type="danger" style="float:right">取 消</el-button>
            </div>
        </div>
    </el-dialog>
    <!-- 自主数据数据集 -->
    <el-dialog title="选择表单(单击选择表名)" :visible.sync="dialogSelfData" width="660px">
        <el-table :data="tableDataColumAuto" border stripe size="medium" @cell-click="cellClick">
            <el-table-column type="index" label="序号" width="70px" align='center'>
            </el-table-column>
            <el-table-column prop="name" label="表名" align="center"></el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>

<script>
import * as functionAll from "./selfAcess";
export default {
    data() {
        return {
            formvalue: '',
            input: '',
            options: [{
                    value: '自主数据数据集',
                    code: '0',
                },
                {
                    value: '系统级数据集',
                    code: '1'
                }
            ],
            auto_comp_data_sum_array: [],
            optionsWords: [{
                name: 'sss'
            }],
            dialogData: false,
            dialogSelfData: false,
            filterText: "",
            webSqlTreeData: [],
            defaultProps: {
                children: "children",
                label: "label"
            },
            tableDataColumAuto: [{
                name: 'jiezi'
            }, {
                name: 'junjun'
            }],

        }
    },
    mounted() {
        this.getWebSQLTreeData(); //获取树结构
    },
    watch: {
        //设置检索内容
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },
    methods: {
        //选择数据来源
        changeSelectDataCollect(val) {
            if (val === "0") {
                this.dialogSelfData = true;
            } else if (val === "1") {
                this.dialogData = true;
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
        // 点击树获得对应表信息
        nodeClickChartTree(data, node) {
            if (data.file_id) {
                this.input = data.hyren_name;
                this.dialogData = false;
            }
        },
        //取消树点击选择表名
        cancelSelectTreeName() {
            this.dialogData = false;
        },
        // 获取树信息
        getWebSQLTreeData() {
            functionAll.getAutoAnalysisTreeData().then(res => {
                this.webSqlTreeData = res.data;
            });
        },
        // 点击删除设置显示字段信息
        clickClose(item, index) {
            this.optionsWords.splice(index, 1)
        },
        // 取消选择
        cancelSelect() {
            this.dialogSelfData = false;
        },
        //点击自主取数数据集表格信息
        cellClick(row) {
            this.input = row.name
            this.dialogSelfData = false;
        }

    }
}
</script>

<style scoped>
/* 行标题 */
.visualizationDiv .elRowtitle {
    height: 40px;
    line-height: 40px;
    width: 100%;
}

.visualizationDiv .tempalteInfo {
    float: left;
    font-size: 18px;
    color: #2196f3;
}

.visualizationDiv .templateButton {
    float: right;
}

.visualizationDiv .lines {
    margin-top: 2px;
    width: 100%;
    min-height: 1px;
    background: #dddddd;
    margin-bottom: 10px;
}

.visualizationDiv .elcol8 {
    position: relative;
}

.elcol8Button {
    position: absolute;
    top: 18px;
    right: 10%;
}

.showArryDiv {
    width: 90%;
    height: 100px;
    border: 1px solid #ddd;
    overflow: auto;
    margin-top: 4px;
}

.showArryDivSelect {
    height: 140px;
}

.visualizationDiv .elDialogInfo {
    margin-top: 4px;
    height: 240px;
    overflow: auto;
}

.visualizationDiv .optionsWords {
    height: 40px;
    line-height: 40px;
    width: 91%;
    background: #f5f5f5;
    margin-top: 10px;
    border-radius:2px; 
}

.visualizationDiv .showArryDivContent {
    height: 28px;
    line-height: 28px;
    /* margin-bottom: 4px; */
    cursor: pointer;
    margin-left: 6px;
    border-bottom: 1px solid #DCDFE6;
    color: #393939;
    font-size: 14px;
}

.visualizationDiv .showArryDivContent:hover {
    color: #2196f3
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
</style>
