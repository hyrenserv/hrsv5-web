<template>
    <div>
        <el-row>
            <span class="el-icon-monitor" style="color: #3a8ee6"> SQL 操作台</span>
        </el-row>
        <el-row>
            <hr>
        </el-row>
        <el-row>
            <el-col :span="2">
                <navigation-menu></navigation-menu>
            </el-col>
            <el-col :span="6">
                <template>
                    <el-tree :props="props" :load="loadNode" lazy>
                    </el-tree>
                </template>
            </el-col>
            <el-col :span="16">
                <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                    <el-tab-pane label="表查询" name="tableQuery">表查询</el-tab-pane>
                    <el-tab-pane label="Sql查询" name="sqlQuery">Sql查询</el-tab-pane>
                    <el-tab-pane label="图查询" name="graphQuery">图查询</el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>
<script>
    import navigationMenu from "./navigationMenu";

    export default {
        name: "webSqlConsole",
        components: {
            "navigation-menu": navigationMenu,
        },
        data() {
            return {
                activeName: 'tableQuery',
                props: {
                    label: 'name',
                    children: 'zones',
                    isLeaf: 'leaf'
                },
            };
        },
        methods: {
            loadNode(node, resolve) {
                if (node.level === 0) {
                    return resolve([{name: '贴源层', label: 'aaa'}, {name: '加工层'}, {name: '集市层'}, {name: '系统层'},
                        {name: '管控层'}, {name: '自定义层'},]);
                }
                if (node.level > 1) return resolve([]);
                const data = [
                    {
                        name: 'leaf',
                        leaf: true
                    }, {
                        name: 'zone'
                    }];
                resolve(data);
                setTimeout(() => {
                }, 5000);
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>
