<template>
    <div>
        <el-collapse>
            <el-collapse-item title="Collapse 属性">
                <table>
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>可选值</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>value / v-model</td>
                            <td>当前激活的面板(如果是手风琴模式，绑定值类型需要为<code>string</code>，否则为<code>array</code>)</td>
                            <td>string / array</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>accordion</td>
                            <td>是否手风琴模式</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
        
        <el-collapse>
            <el-collapse-item title="Collapse 事件">
                <table>
                    <thead>
                        <tr>
                            <th>事件名称</th>
                            <th>说明</th>
                            <th>回调参数</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>change</td>
                            <td>当前激活面板改变时触发(如果是手风琴模式，参数 <code>activeNames</code> 类型为<code>string</code>，否则为<code>array</code>)</td>
                            <td>(activeNames: array / string)</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
        
        <el-collapse>
            <el-collapse-item title="Collapse Item 属性">
                <table>
                    <thead>
                        <tr>
                            <th>参数</th>
                            <th>说明</th>
                            <th>类型</th>
                            <th>可选值</th>
                            <th>默认值</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>name</td>
                            <td>唯一标志符</td>
                            <td>string/number</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>面板标题</td>
                            <td>string</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style scoped>
table {
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;
}

th {
    white-space: nowrap;
    color: #909399;
    font-weight: 400;
}

td {
    border-bottom: 1px solid #dcdfe6;
    padding: 15px;
    max-width: 250px;
}
</style>
