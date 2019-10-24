<template>
    <div>
        <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
        <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
            <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
            </el-dialog>
            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
            </div>
        </el-dialog>
        <p style="margin-top:20px">通过设置<code>append-to-body</code>属性，默认接受boolean，来实现Dialog嵌套Dialog</p>
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
                            <el-button type="text" @click="outerVisible = true">点击打开外层 Dialog</el-button>
                            <el-dialog title="外层 Dialog" :visible.sync="outerVisible">
                                <el-dialog width="30%" title="内层 Dialog" :visible.sync="innerVisible" append-to-body>
                                </el-dialog>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="outerVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="innerVisible = true">打开内层 Dialog</el-button>
                                </div>
                            </el-dialog>
                        </div>       
                    </template>
                    <script>
                        export default {
                            data() {
                                return {
                                    outerVisible: false,
                                    innerVisible: false
                                };
                            }
                        }
                    <\/script>
                `,
            outerVisible: false,
            innerVisible: false
        };
    }
}
</script>


<style>

</style>
