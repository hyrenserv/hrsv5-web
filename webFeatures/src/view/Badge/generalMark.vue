<template>
<div>
    <el-badge :value="12" class="item">
        <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="3" class="item">
        <el-button size="small">回复</el-button>
    </el-badge>
    <el-badge :value="1" class="item" type="primary">
        <el-button size="small">评论</el-button>
    </el-badge>
    <el-badge :value="2" class="item" type="warning">
        <el-button size="small">回复</el-button>
    </el-badge>

    <el-dropdown trigger="click">
        <span class="el-dropdown-link">
            点我查看
            <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="clearfix">
                评论
                <el-badge class="mark" :value="12" />
            </el-dropdown-item>
            <el-dropdown-item class="clearfix">
                回复
                <el-badge class="mark" :value="3" />
            </el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
    <p>
        定义
        <code>value</code>属性，它接受
        <code>Number</code>或者
        <code>String</code>。
    </p>
    <el-collapse>
        <el-collapse-item title="显示代码" name="1">
            <el-input type="textarea" :autosize="{ minRows: 25, maxRows: 4}" readonly v-model="demo"></el-input>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        return {
            demo: `
            <el-badge :value="12" class="item">
                <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="3" class="item">
                <el-button size="small">回复</el-button>
            </el-badge>
            <el-badge :value="1" class="item" type="primary">
                <el-button size="small">评论</el-button>
            </el-badge>
            <el-badge :value="2" class="item" type="warning">
                <el-button size="small">回复</el-button>
            </el-badge>

            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    点我查看<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item class="clearfix">
                        评论
                        <el-badge class="mark" :value="12" />
                    </el-dropdown-item>
                    <el-dropdown-item class="clearfix">
                        回复
                        <el-badge class="mark" :value="3" />
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

            `,
            currentPage: 1
        };
    }
};
</script>

<style scoped>
.item {
    margin-top: 10px;
    margin-right: 40px;
}
</style>
