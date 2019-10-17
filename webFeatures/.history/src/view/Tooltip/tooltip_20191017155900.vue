<template>
<div class="box">
    <div class="right">
        <el-tooltip class="item" effect="dark" content="Right Center 提示文字" placement="right">
            <el-button>右边</el-button>
        </el-tooltip>
    </div>
    <div class="bottom">
        <el-tooltip class="item" effect="dark" content="Bottom Center 提示文字" placement="bottom">
            <el-button>下边</el-button>
        </el-tooltip>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.box {
    width: 400px;
}

.right {
    float: right;
    width: 60px;
}

.bottom {
    clear: both;
    text-align: center;
}

.item {
    margin: 4px;
}

.left .el-tooltip__popper,
.right .el-tooltip__popper {
    padding: 8px 10px;
}
</style>
