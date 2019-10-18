<template>
    <div>
        <el-steps :active="active" finish-status="success">
            <el-step title="未完成" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="进行中" description="这是一段很长很长很长的描述性文字"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
        <p style="margin-top:20px">通过设置<code>title</code>属性，来显示步骤进行状态</p>
        <p style="margin-top:20px">通过设置<code>description</code>属性，来显示步骤描述信息</p>
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
                            <el-steps :active="active" finish-status="success">
                                <el-step title="未完成" description="这是一段很长很长很长的描述性文字"></el-step>
                                <el-step title="进行中" description="这是一段很长很长很长的描述性文字"></el-step>
                                <el-step title="步骤 3"></el-step>
                            </el-steps>
                            <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
                        </div>       
                    </template>
                `,
            active: 0
        };
    },

    methods: {
        next() {
            if (this.active++ > 2) this.active = 0;
        }
    }
}
</script>
