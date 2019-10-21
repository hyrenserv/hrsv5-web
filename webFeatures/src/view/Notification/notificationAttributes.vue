<template>
<div>
    <el-collapse accordion>
        <el-collapse-item title="参数属性" name="1">
            <table >
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
                        <td>message</td>
                        <td>说明文字</td>
                        <td>string/Vue.VNode</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>dangerouslyUseHTMLString</td>
                        <td>是否将 message 属性作为 HTML 片段处理</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>type</td>
                        <td>主题样式，如果不在可选值内将被忽略</td>
                        <td>string</td>
                        <td>success/warning/info/error</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>iconClass</td>
                        <td>自定义图标的类名。若设置了 <code>type</code>，则 <code>iconClass</code> 会被覆盖</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>customClass</td>
                        <td>自定义类名</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>duration</td>
                        <td>显示时间, 毫秒。设为 0 则不会自动关闭</td>
                        <td>number</td>
                        <td>—</td>
                        <td>4500</td>
                    </tr>
                    <tr>
                        <td>position</td>
                        <td>自定义弹出位置</td>
                        <td>string</td>
                        <td>top-right/top-left/bottom-right/bottom-left</td>
                        <td>top-right</td>
                    </tr>
                    <tr>
                        <td>showClose</td>
                        <td>是否显示关闭按钮</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>onClose</td>
                        <td>关闭时的回调函数</td>
                        <td>function</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>onClick</td>
                        <td>点击 Notification 时的回调函数</td>
                        <td>function</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>offset</td>
                        <td>偏移的距离，在同一时刻，所有的 Notification 实例应当具有一个相同的偏移量</td>
                        <td>number</td>
                        <td>—</td>
                        <td>0</td>
                    </tr>
                </tbody>
            </table>
        </el-collapse-item>
    </el-collapse>
</div>
</template>

<script>
export default {
    data() {
        return {}
    }
};
</script>
