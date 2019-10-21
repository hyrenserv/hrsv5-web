<template>
    <div>
        <ul class="infinite-list"  v-infinite-scroll="load" infinite-scroll-delay="3600" style="overflow:auto">
            <li v-for="(i,item) in count" class="infinite-list-item" :key="item">{{ i }}</li>
        </ul>
        <p style="margin-top:20px">在要实现滚动加载的列表上设置<code>v-infinite-scroll</code>属性，并且自定义方法,来实现滚动到底部时自动执行加载</p>
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
                        <ul class="infinite-list" v-infinite-scroll="load" infinite-scroll-delay="3600" style="overflow:auto">
                            <li v-for="i in count" class="infinite-list-item">{{ i }}</li>
                        </ul>
                    </template>

                    <script>
                        export default {
                            data () {
                                return {
                                    count: 0
                                }
                            },
                            methods: {
                                load () {
                                    this.count += 2
                                }
                            }
                        }
                    <\/script>
                `,
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
