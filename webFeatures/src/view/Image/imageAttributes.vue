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
                            <td>src</td>
                            <td>图片源，同原生</td>
                            <td>string</td>
                            <td>—</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>fit</td>
                            <td>确定图片如何适应容器框，同原生object-fit</td>
                            <td>string</td>
                            <td>fill / contain / cover / none / scale-down</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>alt</td>
                            <td>原生 alt</td>
                            <td>string</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>referrer-policy</td>
                            <td>原生 referrerPolicy</td>
                            <td>string</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>lazy</td>
                            <td>是否开启懒加载</td>
                            <td>boolean</td>
                            <td>—</td>
                            <td>false</td>
                        </tr>
                        <tr>
                            <td>scroll-container</td>
                            <td>开启懒加载后，监听 scroll 事件的容器</td>
                            <td>string / HTMLElement</td>
                            <td>—</td>
                            <td>最近一个 overflow 值为 auto 或 scroll 的父元素</td>
                        </tr>
                        <tr>
                            <td>preview-src-list</td>
                            <td>开启图片预览功能</td>
                            <td>Array</td>
                            <td>—</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>z-index</td>
                            <td>设置图片预览的 z-index</td>
                            <td>Number</td>
                            <td>—</td>
                            <td>2000</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
        
        <el-collapse>
            <el-collapse-item title="事件">
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
                            <td>load</td>
                            <td>图片加载成功触发</td>
                            <td>(e: Event)</td>
                        </tr>
                        <tr>
                            <td>error</td>
                            <td>图片加载失败触发</td>
                            <td>(e: Error)</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>

        <el-collapse>
            <el-collapse-item title="Slots">
                <table>
                    <thead>
                        <tr>
                            <th>名称</th>
                            <th>说明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>placeholder</td>
                            <td>图片未加载的占位内容</td>
                        </tr>
                        <tr>
                            <td>error</td>
                            <td>加载失败的内容</td>
                        </tr>
                    </tbody>
                </table>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<style scoped>
table{
    border-collapse: collapse;
    width: 100%;
    background-color: #fff;
    font-size: 14px;
    margin-bottom: 45px;
    line-height: 1.5em;
}
th{
    white-space: nowrap;
    color: #909399;
    font-weight: 400;
}
td{
    border-bottom: 1px solid #dcdfe6;
    padding: 15px;
    max-width: 250px;
}
</style>
