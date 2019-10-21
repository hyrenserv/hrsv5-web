<template>
    <div>
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
            <el-radio-button label="top">top</el-radio-button>
            <el-radio-button label="left">left</el-radio-button>
        </el-radio-group>

        <el-tabs :tab-position="tabPosition" type="border-card" style="height: 200px;">
            <el-tab-pane label="用户管理">用户管理</el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
        </el-tabs>
        <p>绑定<code>v-model</code>属性，传入<code>left</code>--<code>top</code>，表示Tabs显示的位置。</p>
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
                            <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
                                <el-radio-button label="top">top</el-radio-button>
                                <el-radio-button label="left">left</el-radio-button>
                            </el-radio-group>
                            <el-tabs :tab-position="tabPosition" type="border-card" style="height: 200px;">
                                <el-tab-pane label="用户管理">用户管理</el-tab-pane>
                                <el-tab-pane label="配置管理">配置管理</el-tab-pane>
                                <el-tab-pane label="角色管理">角色管理</el-tab-pane>
                                <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
                            </el-tabs>
                        </div>       
                    </template>
                    <script>
                        export default {
                            data() {
                                return {
                                    tabPosition: 'top'
                                };
                            }
                        };
                    <\/script>
                `,
            tabPosition: 'top'
        };
    }
};
</script>
