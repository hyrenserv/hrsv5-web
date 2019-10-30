<template>
<div>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>

    <el-tree class="filter-tree" show-checkbox accordion :data="data" :props="defaultProps" :filter-node-method="filterNode" ref="tree"></el-tree>
    <p>
        在需要对节点进行过滤时，调用 Tree 实例的
        <code>filter</code>方法，参数为关键字。需要注意的是，此时需要设置
        <code>filter-node-method</code>，值为过滤函数。
        <code>show-checkbox</code> 是否显示复选框
    </p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 20, maxRows: 4}" readonly v-model="textarea2"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        }
    },

    methods: {
        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        }
    },

    data() {
        return {
            filterText: "",
            textarea2: `
                <el-input placeholder="输入关键字进行过滤" v-model="filterText">
                </el-input>

                <el-tree class="filter-tree" show-checkbox accordion :data="data" :props="defaultProps" default-expand-all :filter-node-method="filterNode" ref="tree">
                </el-tree>

                watch: {
                    filterText(val) {
                        this.$refs.tree.filter(val);
                    }
                },

                methods: {
                    filterNode(value, data) {
                        if (!value) return true;
                        return data.label.indexOf(value) !== -1;
                    }
                },
            `,
            data: [{
                    id: 1,
                    label: "一级 1",
                    children: [{
                        id: 4,
                        label: "二级 1-1",
                        children: [{
                                id: 9,
                                label: "三级 1-1-1"
                            },
                            {
                                id: 10,
                                label: "三级 1-1-2"
                            }
                        ]
                    }]
                },
                {
                    id: 2,
                    label: "一级 2",
                    children: [{
                            id: 5,
                            label: "二级 2-1"
                        },
                        {
                            id: 6,
                            label: "二级 2-2"
                        }
                    ]
                },
                {
                    id: 3,
                    label: "一级 3",
                    children: [{
                            id: 7,
                            label: "二级 3-1"
                        },
                        {
                            id: 8,
                            label: "二级 3-2"
                        }
                    ]
                }
            ],
            defaultProps: {
                children: "children",
                label: "label"
            }
        };
    }
};
</script>
