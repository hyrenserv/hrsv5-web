<template>
<div>
    <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
    </el-container>

    <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
    </el-container>

    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
    </el-container>

    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
        </el-container>
    </el-container>

    <el-container>
        <el-header>Header</el-header>
        <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-container>
                <el-main>Main</el-main>
                <el-footer>Footer</el-footer>
            </el-container>
        </el-container>
    </el-container>

    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
        </el-container>
    </el-container>

    <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>Main</el-main>
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
    <!--  -->
    <p>用于布局的容器组件，方便快速搭建页面的基本结构：</p>
    <p>
        <code>&lt;el-container&gt;</code>：外层容器。当子元素中包含
        <code>&lt;el-header&gt;</code> 或
        <code>&lt;el-footer&gt;</code> 时，全部子元素会垂直上下排列，否则会水平左右排列。
    </p>
    <p>
        <code>&lt;el-header&gt;</code>：顶栏容器。
    </p>
    <p>
        <code>&lt;el-aside&gt;</code>：侧边栏容器。
    </p>
    <p>
        <code>&lt;el-main&gt;</code>：主要区域容器。
    </p>
    <p>
        <code>&lt;el-footer&gt;</code>：底栏容器。
    </p>
    <div class="tip">
        <p>
            以上组件采用了 flex 布局，使用前请确定目标浏览器是否兼容。此外，
            <code>&lt;el-container&gt;</code> 的子元素只能是后四者，后四者的父元素也只能是
            <code>&lt;el-container&gt;</code>。
        </p>
    </div>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly placeholder="请输入内容" v-model="textarea2"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
    export default {
        methods: {
            handleClick(row) {
                console.log(row);
            }
        },
        data() {
            return {
                textarea2: `
                <template>
                   <div>
                        <el-container>
                            <el-header>Header</el-header>
                            <el-main>Main</el-main>
                        </el-container>

                        <el-container>
                            <el-header>Header</el-header>
                            <el-main>Main</el-main>
                            <el-footer>Footer</el-footer>
                        </el-container>

                        <el-container>
                            <el-aside width="200px">Aside</el-aside>
                            <el-main>Main</el-main>
                        </el-container>

                        <el-container>
                            <el-header>Header</el-header>
                            <el-container>
                                <el-aside width="200px">Aside</el-aside>
                                <el-main>Main</el-main>
                            </el-container>
                        </el-container>

                        <el-container>
                            <el-header>Header</el-header>
                            <el-container>
                                <el-aside width="200px">Aside</el-aside>
                                <el-container>
                                <el-main>Main</el-main>
                                <el-footer>Footer</el-footer>
                                </el-container>
                            </el-container>
                        </el-container>

                        <el-container>
                            <el-aside width="200px">Aside</el-aside>
                            <el-container>
                                <el-header>Header</el-header>
                                <el-main>Main</el-main>
                            </el-container>
                        </el-container>

                        <el-container>
                            <el-aside width="200px">Aside</el-aside>
                            <el-container>
                                <el-header>Header</el-header>
                                <el-main>Main</el-main>
                                <el-footer>Footer</el-footer>
                            </el-container>
                        </el-container>
                   </div>
                
</template>

                
<style>
.el-header,
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style><style scoped>
`
}

;
}
}

;

</script>.el-header,
.el-footer {
    background-color: #b3c0d1;
    color: #333;
    text-align: center;
    line-height: 60px;
}

.el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: center;
    line-height: 200px;
}

.el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
}

body>.el-container {
    margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
    line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
    line-height: 320px;
}
</style>
