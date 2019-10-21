<template>
<div>
    <el-collapse accordion>
        <el-collapse-item title="加载事件" name="2">
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
                        <td>body</td>
                        <td>同 <code>v-loading</code> 指令中的 <code>body</code> 修饰符</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>fullscreen</td>
                        <td>同 <code>v-loading</code> 指令中的 <code>fullscreen</code> 修饰符</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>lock</td>
                        <td>同 <code>v-loading</code> 指令中的 <code>lock</code> 修饰符</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>text</td>
                        <td>显示在加载图标下方的加载文案</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>spinner</td>
                        <td>自定义加载图标类名</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>background</td>
                        <td>遮罩背景色</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>customClass</td>
                        <td>Loading 的自定义类名</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                </tbody>
            </table>
        </el-collapse-item>
    </el-collapse>
</div>
</template>
