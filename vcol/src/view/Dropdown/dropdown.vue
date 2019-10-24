<template>
    <div>
        <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">博彦科技</el-dropdown-item>
                <el-dropdown-item command="2">博彦</el-dropdown-item>
                <el-dropdown-item command="3">博彦泓智</el-dropdown-item>
                <el-dropdown-item command="4" disabled>上海</el-dropdown-item>
                <el-dropdown-item command="5" divided>海上</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <el-dropdown @command="handleCommand">
            <el-button type="primary">
                更多菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="1">博彦科技</el-dropdown-item>
                    <el-dropdown-item command="2">博彦</el-dropdown-item>
                    <el-dropdown-item command="3">博彦泓智</el-dropdown-item>
                    <el-dropdown-item command="4" disabled>上海</el-dropdown-item>
                    <el-dropdown-item command="5" divided>海上</el-dropdown-item>
                </el-dropdown-menu>
        </el-dropdown>
        <p style="margin-top:20px">通过设置<code>disabled</code>属性，来改变为禁用</p>
        <p style="margin-top:20px">通过设置<code>divided</code>属性，来显示分隔符</p>
        <p style="margin-top:20px">通过设置添加<code>button</code>按钮，来显示按钮下拉列表</p>
        <el-collapse>
            <el-collapse-item title="显示代码" name="1">
                <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2">
                </el-input>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style>
.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
.el-button{
    margin-left: 20px;
}
</style>

<script>
    export default {
        data() {
            return {
                textarea2: `
                     <template>
                        <div>
                           <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link">
                                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="1">博彦科技</el-dropdown-item>
                                    <el-dropdown-item command="2">博彦</el-dropdown-item>
                                    <el-dropdown-item command="3">博彦泓智</el-dropdown-item>
                                    <el-dropdown-item command="4" disabled>上海</el-dropdown-item>
                                    <el-dropdown-item command="5" divided>海上</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>       
                    </template>
                    
                    <script>
                         export default {
                            methods: {
                                handleCommand(command) {
                                    this.$message('click on item ' + command);
                                }
                            }
                        }
                    <\/script>
                `,
        }
    },
    methods: {
        handleCommand(command) {
            this.$message('click on item ' + command);
        }
    }
}
</script>