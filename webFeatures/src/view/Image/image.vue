<template>
    <div class="demo-image__placeholder">
        <div class="block">
            <span class="demonstration">自定义</span>
            <el-image :src="src">
                <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                </div>
            </el-image>
        </div>
        <p style="margin-top:20px">设置<code>slot = placeholder</code>属性，可实现图片在加载过程中的占位</p>
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
                        <div class="demo-image__placeholder">
                            <div class="block">
                                <span class="demonstration">自定义</span>
                                <el-image :src="src">
                                    <div slot="placeholder" class="image-slot">
                                        加载中<span class="dot">...</span>
                                    </div>
                                </el-image>
                            </div>
                    </template>

                    <script>
                        export default {
                            data () {
                                return {
                                   src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
                                }
                            }
                        }
                    <\/script>
                `,
            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
    }
}
</script>
