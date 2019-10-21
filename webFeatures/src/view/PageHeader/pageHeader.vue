<template>
    <div>
        <el-page-header @back="goBack" title="回到首页" content="详情页面"></el-page-header>
        <p style="margin-top:20px">默认<code>title</code>属性，它接受 string类型，有<code>空</code>--<code>自定义</code>，表示返回地址的描述。</p>
        <p style="margin-top:20px">默认<code>content</code>属性，它接受 string类型，支持<code>自定义</code>，表示当前页面的描述。</p>
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
                            <el-page-header @back="goBack" title="回到首页" content="详情页面">
                            </el-page-header>
                        </div>       
                    </template>
                    <script>
                        export default {
                            methods: {
                                goBack() {
                                    console.log('go back');
                                }
                            }
                        }
                    <\/script>
                `,
        }
    },
    methods: {
        goBack() {

        }
    }
}
</script>
