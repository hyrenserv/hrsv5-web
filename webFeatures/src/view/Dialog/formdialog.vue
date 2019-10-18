<template>
    <div>
        <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
        <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
        <p style="margin-top:20px">通过添加自定义，比如<code>form</code>表单，来实现dialog嵌套</p>
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
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            formLabelWidth: '120px',
            textarea2: `
                     <template>
                        <div>
                            <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
                            <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                                <el-form :model="form">
                                    <el-form-item label="活动名称" :label-width="formLabelWidth">
                                        <el-input v-model="form.name" autocomplete="off"></el-input>
                                    </el-form-item>
                                    <el-form-item label="活动区域" :label-width="formLabelWidth">
                                        <el-select v-model="form.region" placeholder="请选择活动区域">
                                            <el-option label="区域一" value="shanghai"></el-option>
                                            <el-option label="区域二" value="beijing"></el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-form>
                                <div slot="footer" class="dialog-footer">
                                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                                </div>
                            </el-dialog>
                        </div>       
                    </template>
                    <script>
                        export default {
                            data(){
                                return {
                                    dialogFormVisible: false,
                                    formLabelWidth: '120px',
                                    form: {
                                        name: '',
                                        region: '',
                                        date1: '',
                                        date2: '',
                                        delivery: false,
                                        type: [],
                                        resource: '',
                                        desc: ''
                                    },
                                }
                            },  
                        }
                    <\/script>
                `,
        }
    }
}
</script>
