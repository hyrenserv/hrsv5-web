<template>
    <div>
        <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <el-button slot="reference">hover 激活</el-button>
        </el-popover>
        <el-popover placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
            <el-button slot="reference">click 激活</el-button>
        </el-popover>
        <p style="margin-top:20px">通过设置<code>trigger</code>属性，来改变触发方式</p>
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
                            <el-popover placement="top-start" title="标题" width="200" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                <el-button slot="reference">hover 激活</el-button>
                            </el-popover>
                            <el-popover placement="bottom" title="标题" width="200" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
                                <el-button slot="reference">click 激活</el-button>
                            </el-popover>
                        </div>       
                    </template>
                    <script>
                        export default {
                            data() {
                                return {
                                    visible: false
                                }
                            }
                        }
                    <\/script>
                `,
            visible: false
        };
    }
};
</script>
