<template>
    <div>
        <el-collapse>
            <el-collapse-item title="Tabs 属性" name="1">
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
                            <td>绑定值，选中选项卡的 name</td>
                            <td>string</td>
                            <td>—</td>
                            <td>第一个选项卡的 name</td>
                        </tr>
                        <tr>
                            <td>type</td>
                            <td>风格类型</td>
                            <td>string</td>
                            <td>card/border-card</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>closable</td>
                            <td>标签是否可关闭</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>addable</td>
                            <td>标签是否可增加</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>editable</td>
                            <td>标签是否同时可增加和关闭</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>tab-position</td>
                            <td>选项卡所在位置</td>
                            <td>string</td>
                            <td>top/right/bottom/left</td>
                            <td>top</td>
                        </tr>
                        <tr>
                            <td>stretch</td>
                            <td>标签的宽度是否自撑开</td>
                            <td>boolean</td>
                            <td>-</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>before-leave</td>
                            <td>切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。</td>
                            <td>Function(activeName, oldActiveName)</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>

        <el-collapse>
            <el-collapse-item title="Tabs 事件" name="1">
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
                            <td>tab-click</td>
                            <td>tab 被选中时触发</td>
                            <td>被选中的标签 tab 实例</td>
                        </tr>
                        <tr>
                            <td>tab-remove</td>
                            <td>点击 tab 移除按钮后触发</td>
                            <td>被删除的标签的 name</td>
                        </tr>
                        <tr>
                            <td>tab-add</td>
                            <td>点击 tabs 的新增按钮后触发</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>edit</td>
                            <td>点击 tabs 的新增按钮或 tab 被关闭后触发</td>
                            <td>(targetName, action)</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
        
        <el-collapse>
            <el-collapse-item title="Tab-pane 属性" name="1">
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
                            <td>label</td>
                            <td>选项卡标题</td>
                            <td>string</td>
                            <td>—</td>
                            <td>—</td>
                        </tr>
                        <tr>
                            <td>disabled</td>
                            <td>是否禁用</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>name</td>
                            <td>与选项卡绑定值 value 对应的标识符，表示选项卡别名</td>
                            <td>string</td>
                            <td>—</td>
                            <td>该选项卡在选项卡列表中的顺序值，如第一个选项卡则为'1'</td>
                        </tr>
                        <tr>
                            <td>closable</td>
                            <td>标签是否可关闭</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>lazy</td>
                            <td>标签是否延迟渲染</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>