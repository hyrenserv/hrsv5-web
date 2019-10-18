<template>
    <div>
        <el-dropdown>
            <span class="el-dropdown-link">
                下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>博彦科技</el-dropdown-item>
                <el-dropdown-item>博彦</el-dropdown-item>
                <el-dropdown-item>博彦泓智</el-dropdown-item>
                <el-dropdown-item disabled>上海</el-dropdown-item>
                <el-dropdown-item divided>海上</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <p style="margin-top:20px">设置<code>slot</code>为<code>dropdown</code>来实现下拉菜单。</p>
        <p style="margin-top:20px">默认情况下拉按钮为hover，通过设置<code>trigger</code>属性，来改变触条件</p>
        <p style="margin-top:20px">通过设置<code>disabled</code>属性，来改变为禁用</p>
        <p style="margin-top:20px">通过设置<code>divided</code>属性，来显示分隔符</p>
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
</style>

<script>
    export default {
        data() {
            return {
                textarea2: `
                     <template>
                        <div>
                           <el-dropdown  trigger="click">
                                <span class="el-dropdown-link">
                                    下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item>博彦科技</el-dropdown-item>
                                    <el-dropdown-item>博彦</el-dropdown-item>
                                    <el-dropdown-item>博彦泓智</el-dropdown-item>
                                    <el-dropdown-item disabled>上海</el-dropdown-item>
                                    <el-dropdown-item divided>海上</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>       
                    </template>
                `,
        }
    },
}
</script>