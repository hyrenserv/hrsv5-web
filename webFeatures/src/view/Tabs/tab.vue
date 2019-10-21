<template>
<div>
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
        <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
    <p>默认<code>type</code>属性，它接受 string类型，有<code>card</code>--<code>border-card</code>--<code>空</code>，表示是选项卡还是卡片还是默认样式。</p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2">
            </el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
    export default {
        data() {
            return {
                textarea2: `
                    <template>
                        <div>
                            <el-tabs v-model="activeName"  type="border-card" @tab-click="handleClick">
                                <el-tab-pane label="用户管理" name="first">用户管理</el-tab-pane>
                                <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
                                <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
                                <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
                            </el-tabs>
                        </div>       
                    </template>
                    <script>
                        export default {
                            data() {
                                return {
                                    activeName: 'first'
                                };
                            },
                            methods: {
                                handleClick(tab, event) {
                                    console.log(tab, event);
                                }
                            }
                        };
                    <\/script>
                `,
            activeName: 'first',
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};
</script>
