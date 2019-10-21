<template>
<div>
    <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
    </el-tree>

    <div class="buttons">
        <el-button @click="getCheckedNodes">通过 node 获取</el-button>
        <el-button @click="getCheckedKeys">通过 key 获取</el-button>
        <el-button @click="setCheckedNodes">通过 node 设置</el-button>
        <el-button @click="setCheckedKeys">通过 key 设置</el-button>
        <el-button @click="resetChecked">清空</el-button>
    </div>
    <p>本例展示如何获取和设置选中节点。获取和设置各有两种方式：通过 node 或通过 key。如果需要通过 key 来获取或设置，则必须设置<code>node-key</code>。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 30, maxRows: 4}" readonly v-model="textarea2"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    methods: {
        getCheckedNodes() {
            console.log(this.$refs.tree.getCheckedNodes());
        },
        getCheckedKeys() {
            console.log(this.$refs.tree.getCheckedKeys());
        },
        setCheckedNodes() {
            this.$refs.tree.setCheckedNodes([{
                id: 5,
                label: '二级 5'
            }, {
                id: 9,
                label: '三级 9'
            }]);
        },
        setCheckedKeys() {
            this.$refs.tree.setCheckedKeys([3]);
        },
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        }
    },

    data() {
        return {
            textarea2: `

                <el-tree :data="data" show-checkbox default-expand-all node-key="id" ref="tree" highlight-current :props="defaultProps">
                </el-tree>

                <div class="buttons">
                    <el-button @click="getCheckedNodes">通过 node 获取</el-button>
                    <el-button @click="getCheckedKeys">通过 key 获取</el-button>
                    <el-button @click="setCheckedNodes">通过 node 设置</el-button>
                    <el-button @click="setCheckedKeys">通过 key 设置</el-button>
                    <el-button @click="resetChecked">清空</el-button>
                </div>   

                getCheckedNodes() {
                    console.log(this.$refs.tree.getCheckedNodes());
                },
                getCheckedKeys() {
                    console.log(this.$refs.tree.getCheckedKeys());
                },
                setCheckedNodes() {
                    this.$refs.tree.setCheckedNodes([{
                        id: 5,
                        label: '二级 5'
                    }, {
                        id: 9,
                        label: '三级 9'
                    }]);
                },
                setCheckedKeys() {
                    this.$refs.tree.setCheckedKeys([3]);
                },
                resetChecked() {
                    this.$refs.tree.setCheckedKeys([]);
                }
            `,
            data: [{
                id: 1,
                label: '一级 1',
                children: [{
                    id: 4,
                    label: '二级 1-1',
                    children: [{
                        id: 9,
                        label: '三级 1-1-1'
                    }, {
                        id: 10,
                        label: '三级 1-1-2'
                    }]
                }]
            }, {
                id: 2,
                label: '一级 2',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '一级 3',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    }
};
</script>
