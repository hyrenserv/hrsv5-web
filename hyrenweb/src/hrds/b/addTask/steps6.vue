<template>
<div>
    <Step :active="active"></Step>
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">完成</el-button>
    <!--完成  -->

    <el-dialog title="提示信息" :visible.sync="finishDialogVisible" width="30%">
        <span>设置完成！请等待Agent运行...不运行请点击取消或按下Esc键</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="finishDialogVisible = false" type="danger" size="mini">取 消</el-button>
            <el-button type="primary" @click="finishSubmit()" size="mini">确 定</el-button>
        </span>
    </el-dialog>
</div>
</template>

<script>
import Step from "./step";
import * as sendTask from "./addTask"
export default {
    components: {
        Step
    },
    data() {
        return {
            active: 5,
            dbid: null,
            aId: null,
            sourId: null,
            sName: null,
            finishDialogVisible: false,
        };
    },
    created() {
        this.dbid = this.$route.query.id;
        this.aId = this.$route.query.agent_id;
        this.sourId = this.$route.query.source_id;
        this.sName = this.$Base64.decode(this.$route.query.source_name);
    },
    methods: {
        next() {
            this.active = 6;
            this.finishDialogVisible = true
        },
        pre() {
            let data = {}
            if (this.$route.query.edit == 'yes') {
                data = {
                    agent_id: this.aId,
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$Base64.encode(this.sName),
                    edit: "yes"
                }
            } else {
                data = {
                    id: this.dbid,
                    source_id: this.sourId,
                    source_name: this.$Base64.encode(this.sName),
                }
            }
            this.$router.push({
                path: "/collection1_5",
                query: data
            });
        },
        finishSubmit() {
            this.finishDialogVisible = false
            sendTask.sendDBCollctTaskById({
                colSetId: this.dbid
            }).then(res => {
                if (res.success) {
                    this.$router.push({
                        path: "/agentList"
                    });
                }
            })
        }
    }
};
</script>

<style scoped>
.leftbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: left;
    margin: 15px;
    margin-bottom: 10px;
}

.rightbtn {
    margin-top: 12px;
    margin-top: 12px;
    float: right;
    margin: 15px;
    margin-bottom: 10px;
}
</style>
