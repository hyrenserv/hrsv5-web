<template>
    <div>
        <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
            <span>这是一段信息</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <p style="margin-top:20px">通过设置添加<code>width</code>属性，来控制弹出框的长度</p>
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
                            <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>
                            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
                                <span>这是一段信息</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                                </span>
                            </el-dialog>
                        </div>       
                    </template>
                    <script>
                        export default {
                            data(){
                                return {
                                    dialogVisible: false
                                }
                            },
                            methods: {
                                    handleClose(done) {
                                        this.$confirm('确认关闭？')
                                            .then(_ => {
                                                done();
                                            })
                                            .catch(_ => {});
                                    }
                                }
                            }
                    <\/script>
                `,
            dialogVisible: false
        };
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        }
    }
}
</script>

<style>

</style>
