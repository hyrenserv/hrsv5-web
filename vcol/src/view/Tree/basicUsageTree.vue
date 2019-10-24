<template>
<div>
    <el-tree :data="data" :props="defaultProps" @node-expand="expand" @node-click="handleNodeClick"></el-tree>

    <p>
        Tree
        <code>el-tree</code>标签即可
        <code>data</code>生成树的数据结构...注意格式
    </p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly v-model="textarea2"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        return {
            textarea2: `
                <el-tree :data="data" :props="defaultProps" @node-expand="expand" @node-click="handleNodeClick"></el-tree>

               <script>
                export default {
                    data() {
                    return {
                        data: [{
                        label: '一级 1',
                        children: [{
                            label: '二级 1-1',
                            children: [{
                            label: '三级 1-1-1'
                            }]
                        }]
                        }, {
                        label: '一级 2',
                        children: [{
                            label: '二级 2-1',
                            children: [{
                            label: '三级 2-1-1'
                            }]
                        }, {
                            label: '二级 2-2',
                            children: [{
                            label: '三级 2-2-1'
                            }]
                        }]
                        }, {
                        label: '一级 3',
                        children: [{
                            label: '二级 3-1',
                            children: [{
                            label: '三级 3-1-1'
                            }]
                        }, {
                            label: '二级 3-2',
                            children: [{
                            label: '三级 3-2-1'
                            }]
                        }]
                        }],
                        defaultProps: {
                        children: 'children',
                        label: 'label'
                        }
                    };
                    },
                    methods: {
                    handleNodeClick(data) {
                        console.log(data);
                    }
                    }
                };
                <\/script>
            `,
            data: [{
                    label: "一级 1",
                    id : '121212',
                    children: [{
                        label: "二级 1-1",
                        children: [{
                            label: "三级 1-1-1"
                        }]
                    }]
                },
                {
                    label: "一级 2",
                    children: [{
                            label: "二级 2-1",
                            children: [{
                                label: "三级 2-1-1"
                            }]
                        },
                        {
                            label: "二级 2-2",
                            children: [{
                                label: "三级 2-2-1"
                            }]
                        }
                    ]
                },
                {
                    label: "一级 3",
                    children: [{
                            label: "二级 3-1",
                            children: [{
                                label: "三级 3-1-1"
                            }]
                        },
                        {
                            label: "二级 3-2",
                            children: [{
                                label: "三级 3-2-1"
                            }]
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        }
    },
    methods: {
        handleNodeClick(data) {
            // console.log(data);
        },
        expand(data) {
             console.log(data);
        }
    }
};
</script>
