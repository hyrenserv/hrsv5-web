<template>
    <div>
        <el-collapse>
            <el-collapse-item title="Steps 属性" name="1">
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
                            <td>space</td>
                            <td>每个 step 的间距，不填写将自适应间距。支持百分比。</td>
                            <td>number / string</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>direction</td>
                            <td>显示方向</td>
                            <td>string</td>
                            <td>vertical/horizontal</td>
                            <td>horizontal</td>
                        </tr>
                        <tr>
                            <td>active</td>
                            <td>设置当前激活步骤</td>
                            <td>number</td>
                            <td>—</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>process-status</td>
                            <td>设置当前步骤的状态</td>
                            <td>string</td>
                            <td>wait / process / finish / error / success</td>
                            <td>process</td>
                        </tr>
                        <tr>
                            <td>finish-status</td>
                            <td>设置结束步骤的状态</td>
                            <td>string</td>
                            <td>wait / process / finish / error / success</td>
                            <td>finish</td>
                        </tr>
                        <tr>
                            <td>align-center</td>
                            <td>进行居中对齐</td>
                            <td>boolean</td>
                            <td>-</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>simple</td>
                            <td>是否应用简洁风格</td>
                            <td>boolean</td>
                            <td>-</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
        
        <el-collapse>
            <el-collapse-item title="Step 属性" name="1">
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
                            <td>title</td>
                            <td>标题</td>
                            <td>string</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>描述性文字</td>
                            <td>string</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>icon</td>
                            <td>图标</td>
                            <td>传入 icon 的 class 全名来自定义 icon，也支持 slot 方式写入</td>
                            <td>string</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>status</td>
                            <td>设置当前步骤的状态，不设置则根据 steps 确定状态</td>
                            <td>wait / process / finish / error / success</td>
                            <td>-</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table> 
            </el-collapse-item>
        </el-collapse>
        
        <el-collapse>
            <el-collapse-item title="Step Slot" name="1">
                <table>
                    <thead>
                        <tr>
                            <th>name</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>icon</td>
                            <td>自定义图标</td>
                        </tr>
                        <tr>
                            <td>title</td>
                            <td>自定义标题</td>
                        </tr>
                        <tr>
                            <td>description</td>
                            <td>自定义描述性文字</td>
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
