<template>
<div id="metaDataManagement">
    <el-row class="topTitle">
        <span>元数据管理</span>
        <router-link to="/dataControl">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg" />返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row :gutter="42">
        <el-col :span="6">
            <el-tabs v-model="mdmActiveName" type="border-card" @tab-click="tagHandleClick">
                <el-tab-pane label="源数据列表" name="mdm">
                    <div class="mytree">
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
                        <el-tree class="filter-tree" :data="mdmTreeList" :indent="0" @node-click="mdmHandleClick" @node-contextmenu="MDMRightMouseClick" :filter-node-method="filterNode" ref="tree1">
                            <span class="span-ellipsis" slot-scope="{ node, data }" v-if="data.description.length >0">
                                <span :title="data.description" v-if="data.file_id.length > 0">
                                    <i class="el-icon-document" />
                                    {{node.label}}
                                </span>
                                <span :title="data.description" v-else>
                                    <i class="el-icon-folder-opened" />
                                    {{node.label}}
                                </span>
                            </span>
                            <span class="span-ellipsis" slot-scope="{ node, data }" v-else>
                                <span :title="data.label" v-if="data.file_id.length > 0">
                                    <i class="el-icon-document" />
                                    {{node.label}}
                                </span>
                                <span :title="data.label" v-else>
                                    <i class="el-icon-folder-opened" />
                                    {{node.label}}
                                </span>
                            </span>
                        </el-tree>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="数据回收站" name="drb">
                    <div class="mytree">
                        <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
                        <el-tree class="filter-tree" :data="drbTreeList" :indent="0" @node-click="drbHandleClick" @node-contextmenu="DRBRightMouseClick" :filter-node-method="filterNode" ref="tree2">
                            <span class="span-ellipsis" slot-scope="{node, data}">
                                <span :title="data.description">{{node.label}}</span>
                            </span>
                        </el-tree>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </el-col>
        <el-col :span="17">
            <el-row>
                <el-form :model="data_meta_info" :inline="true">
                    <el-form-item label="表英文名 : " prop="table_name">
                        <el-input placeholder="表英文名" size="mini" v-model="data_meta_info.table_name" :disabled="true" />
                    </el-form-item>
                    <el-form-item label="表中文名 : " prop="table_ch_name">
                        <el-input placeholder="表中文名" size="mini" v-model="data_meta_info.table_ch_name" v-bind:disabled="table_ch_name_input" />
                    </el-form-item>
                    <el-form-item label="创建日期 : " prop="create_date">
                        <el-input placeholder="创建日期 :" size="mini" v-model="data_meta_info.create_date" :disabled="true" />
                    </el-form-item>
                    <template v-if="data_meta_info.table_id !== ''">
                        <template v-if="tag_type === 'mdm'">
                            <el-form-item>
                                <template v-if="data_meta_info.data_layer !=='DQC'">
                                    <el-button type="primary" size="mini" @click="editMetadata()">编辑</el-button>
                                    <el-button type="success" size="mini" @click="saveMetaData()">保存</el-button>
                                </template>
                            </el-form-item>
                        </template>
                    </template>
                </el-form>
            </el-row>
            <el-row>
                <el-table :data="data_meta_info.column_info_list.slice((currentPage-1) * pageSize,currentPage * pageSize)" size="mini">
                    <el-table-column type="index" prop="date" label="序号" align="center" width="80px">
                        <template slot-scope="scope">{{scope.$index+(currentPage - 1) * pageSize + 1}}</template>
                    </el-table-column>
                    <el-table-column prop="column_name" label="字段名" align="center" />
                    <el-table-column prop="table_ch_name" label="字段中文名" align="center">
                        <template slot-scope="scope">
                            <el-input placeholder="表中文名" v-model="scope.row.column_ch_name" v-bind:disabled="column_ch_name_input" />
                        </template>
                    </el-table-column>
                    <el-table-column prop="data_type" label="字段类型" align="center" />
                    <el-table-column prop="data_len" label="长度" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.data_type==='numeric'">{{scope.row.data_len}},{{scope.row.decimal_point}}</span>
                            <span v-else>{{scope.row.data_len}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="is_primary_key" label="是否主键" align="center">
                        <template slot-scope="scope">
                            <span v-if="scope.row.is_primary_key==='0'">否</span>
                            <span v-else-if="scope.row.is_primary_key==='1'" class="issuecolor">是</span>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 50, 100, 500]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" style="text-align: center" :total="data_meta_info.column_info_list.length"></el-pagination>
            </el-row>
        </el-col>
    </el-row>
    <!--源数据列表右键弹框-->
    <div v-show="mouseVisible">
        <ul id="menu" class="menu">
            <li class="menu_item" @click="tableSetToInvalid()">删除</li>
        </ul>
    </div>
    <!--数据回收站右键弹框-->
    <div v-show="recoverMouseVisible">
        <ul id="menu2" class="menu2">
            <li class="menu_item2" @click="restoreDRBTable()">恢复表</li>
            <li class="menu_item2" @click="removeCompletelyTable()">彻底删除表</li>
        </ul>
    </div>
    <!-- 加载过度 -->
    <transition name="fade">
        <loading v-if="isLoading" />
    </transition>
</div>
</template>

<script>
import * as mdmFun from "./mateDataManage";
import Loading from "../../../components/loading/index";
import * as message from "@/utils/js/message";

export default {
    components: {
        Loading
    },
    data() {
        return {
            tag_type: "mdm",
            table_ch_name_input: true,
            column_ch_name_input: true,
            currentPage: 1,
            pageSize: 5,
            totalSize: 0,
            mdmActiveName: "mdm",
            mdmTreeList: [],
            drbTreeList: [],
            filterText: "",
            mouseVisible: false,
            recoverMouseVisible: false,
            isLoading: false,
            data_meta_info: {
                file_id: "",
                table_id: "",
                data_layer: "",
                table_type: "",
                table_name: "",
                table_ch_name: "",
                create_date: "",
                column_info_list: [],
                data_len: 0
            },
            node_data: {}
        };
    },
    created() {
        //页面初始化时获取源数据列表树
        this.getMDMTreeData();
    },
    watch: {
        //树节点搜索
        filterText(val) {
            this.$refs.tree1.filter(val);
            this.$refs.tree2.filter(val);
        }
    },
    methods: {
        /* 设置每页显示条数 */
        handleSizeChange(pageSize) {
            this.pageSize = pageSize;
        },
        /* 查询页面 */
        handleCurrentChange(currentPage) {
            this.currentPage = currentPage;
        },
        //点击tags标签触发
        tagHandleClick(data) {
            this.column_ch_name_input = true;
            this.table_ch_name_input = true;
            this.data_meta_info = { table_id: "", column_info_list: [] };
            if (data.name === "mdm") {
                this.tag_type = "mdm";
                this.getMDMTreeData();
            }
            if (data.name === "drb") {
                this.tag_type = "drb";
                this.getDRBTreeData();
            }
        },
        //获取源数据列表树信息
        getMDMTreeData() {
            mdmFun.getMDMTreeData().then(res => {
                this.mdmTreeList = res.data;
            });
        },
        //获取数据回收站树信息
        getDRBTreeData() {
            mdmFun.getDRBTreeData().then(res => {
                this.drbTreeList = res.data;
            });
        },
        //树节点搜索调用方法
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },
        //点击源数据管理树节点触发
        mdmHandleClick(data) {
            this.mouseVisible = false;
            //初始化输入框
            this.table_ch_name_input = true;
            this.column_ch_name_input = true;
            //初始化查询结果
            this.data_meta_info = { table_id: "", column_info_list: [] };
            if (data.file_id !== "") {
                mdmFun
                    .getMDMTableColumnInfo({
                        data_layer: data.data_layer,
                        file_id: data.file_id
                    })
                    .then(res => {
                        if (res.success) {
                            this.data_meta_info = res.data;
                        } else {
                            this.data_meta_info = { table_id: "", column_info_list: [] };
                        }
                    });
            }
        },
        //源数据管理树节点鼠标右击事件
        MDMRightMouseClick(event, object, node) {
            if (node.level === 3) {
                this.mouseVisible = true;
                const menu = document.querySelector("#menu");
                document.addEventListener("click", this.foo);
                menu.style.display = "block";
                menu.style.left = event.pageX + 20 + "px";
                menu.style.top = event.pageY - 8 + "px";
                this.node_data = object;
            }
        },
        foo() {
            this.mouseVisible = false;
            this.recoverMouseVisible = false;
            document.removeEventListener("click", this.foo); //关闭事件监听
        },
        // 回收站树节点鼠标右击事件
        DRBRightMouseClick(event, object, node) {
            if (node.level === 3) {
                // 共四个参数，依次为：event、传递给data属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
                this.recoverMouseVisible = true;
                const menu = document.querySelector("#menu2");
                document.addEventListener("click", this.foo);
                menu.style.display = "block";
                menu.style.left = event.pageX + 20 + "px";
                menu.style.top = event.pageY - 8 + "px";
                this.node_data = object;
            }
        },
        //点击回收站树节点触发
        drbHandleClick(data) {
            this.recoverMouseVisible = false;
            if (data.file_id !== "") {
                mdmFun
                    .getDRBTableColumnInfo({ failure_table_id: data.file_id })
                    .then(res => {
                        if (res.success) {
                            this.data_meta_info = res.data;
                        } else {
                            this.data_meta_info = { table_id: "", column_info_list: [] };
                        }
                    });
            }
        },
        //编辑元数据
        editMetadata() {
            this.table_ch_name_input = false;
            this.column_ch_name_input = false;
        },
        //保存元数据,保存完成后查询保存的信息
        saveMetaData() {
            let params = {};
            let columnInfoBeans = [];
            this.data_meta_info.column_info_list.forEach(o => {
                let column_info = {};
                column_info["column_id"] = o.column_id;
                column_info["column_ch_name"] = o.column_ch_name;
                columnInfoBeans.push(column_info);
            });
            params["columnInfoBeans"] = JSON.stringify(columnInfoBeans);
            params["data_layer"] = this.data_meta_info.data_layer;
            params["table_ch_name"] = this.data_meta_info.table_ch_name;
            params["file_id"] = this.data_meta_info.file_id;
            params["table_id"] = this.data_meta_info.table_id;
            mdmFun.saveMetaData(params).then(res => {
                if (res.success) {
                    this.table_ch_name_input = true;
                    this.column_ch_name_input = true;
                }
            });
        },
        //删除表(表设置为无效)
        tableSetToInvalid() {
            this.$Msg
                .confirmMsg(
                    "确定要将" + this.node_data.hyren_name + "表放入数据回收站吗？",
                    "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                .then(() => {
                    this.isLoading = true;
                    mdmFun
                        .tableSetToInvalid({
                            data_layer: this.node_data.data_layer,
                            file_id: this.node_data.file_id
                        })
                        .then(res => {
                            this.isLoading = false;
                            if (res.success) {
                                message.customizTitle("将表放入回收站成功", "success");
                                //重新获取树数据
                                this.getMDMTreeData();
                                this.data_meta_info = { table_id: "", column_info_list: [] };
                            }
                        });
                })
                .catch(() => {});
        },
        //恢复数据回收站的表
        restoreDRBTable() {
            this.$Msg
                .confirmMsg(
                    "确定要将" + this.node_data.hyren_name + "表恢复吗?",
                    "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                .then(() => {
                    this.isLoading = true;
                    mdmFun
                        .restoreDRBTable({
                            data_layer: this.node_data.data_layer,
                            file_id: this.node_data.file_id
                        })
                        .then(res => {
                            //重新获取树数据
                            this.isLoading = false;
                            if (res.success) {
                                message.customizTitle("恢复表成功", "success");
                                this.getDRBTreeData();
                                this.data_meta_info = { table_id: "", column_info_list: [] };
                            }
                        });
                })
                .catch(() => {});
        },
        //彻底删除数据回收站的表
        removeCompletelyTable() {
            this.$Msg
                .confirmMsg(
                    "确定要将" + this.node_data.hyren_name + "表彻底删除吗?",
                    "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning"
                    }
                )
                .then(() => {
                    this.isLoading = true;
                    mdmFun
                        .removeCompletelyTable({
                            file_id: this.node_data.file_id
                        })
                        .then(res => {
                            this.isLoading = false;
                            message.deleteSuccess(res);
                            //重新获取树数据
                            this.getDRBTreeData();
                            this.data_meta_info = { table_id: "", column_info_list: [] };
                        });
                })
                .catch(() => {});
        }
    }
};
</script>

<style lang="less">
.menu_item {
    display: block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
}

.menu {
    height: 20px;
    width: 40px;
    position: absolute;
    border: 1px solid #999999;
    background-color: #f5f5f5;
}

.menu_item2 {
    display: block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
}

.menu2 {
    height: 40px;
    width: 80px;
    position: absolute;
    border: 1px solid #999999;
    background-color: #f5f5f5;
}

li:hover {
    color: brown;
    cursor: pointer;
}
</style>
