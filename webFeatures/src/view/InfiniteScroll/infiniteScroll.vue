<template>
    <div>
        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-delay="3600" style="overflow:auto">
            <li v-for="(i,item) in count" class="infinite-list-item" :key="item">{{ i }}</li>
        </ul>
        <p style="margin-top:20px">通过设置<code>placement</code>属性，提供<code>bottom</code>--<code>right</code>,来显示提示信息出现的位置</p>
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
            count: 0
        }
    },
    methods: {
        load() {
            this.count += 2
        }
    }
}
</script>
