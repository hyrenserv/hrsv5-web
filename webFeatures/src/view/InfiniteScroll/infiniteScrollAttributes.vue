<template>
    <div>
        <el-collapse>
            <el-collapse-item title="属性">
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
                            <td>infinite-scroll-disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>-</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>infinite-scroll-delay</td>
                            <td>节流时延，单位为ms</td>
                            <td>number</td>
                            <td>-</td>
                            <td>200</td>
                        </tr>
                        <tr>
                            <td>infinite-scroll-distance</td>
                            <td>触发加载的距离阈值，单位为px</td>
                            <td>number</td>
                            <td>-</td>
                            <td>0</td>
                        </tr>
                        <tr>
                            <td>infinite-scroll-immediate</td>
                            <td>是否立即执行加载方法，以防初始状态下内容无法撑满容器。</td>
                            <td>boolean</td>
                            <td>-</td>
                            <td>true</td>
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
