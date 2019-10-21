<template>
<div>
    <el-collapse accordion>
        <el-collapse-item title="参数选项" name="1">
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
                        <td>MessageBox 标题</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>message</td>
                        <td>MessageBox 消息正文内容</td>
                        <td>string / VNode</td>
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
                        <td>消息类型，用于显示图标</td>
                        <td>string</td>
                        <td>success / info / warning / error</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>iconClass</td>
                        <td>自定义图标的类名，会覆盖 <code>type</code></td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>customClass</td>
                        <td>MessageBox 的自定义类名</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>callback</td>
                        <td>若不使用 Promise，可以使用此参数指定 MessageBox 关闭后的回调</td>
                        <td>function(action, instance)，action 的值为'confirm', 'cancel'或'close', instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>showClose</td>
                        <td>MessageBox 是否显示右上角关闭按钮</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>beforeClose</td>
                        <td>MessageBox 关闭前的回调，会暂停实例的关闭</td>
                        <td>function(action, instance, done)，action 的值为'confirm', 'cancel'或'close'；instance 为 MessageBox 实例，可以通过它访问实例上的属性和方法；done 用于关闭 MessageBox 实例</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>distinguishCancelAndClose</td>
                        <td>是否将取消（点击取消按钮）与关闭（点击关闭按钮或遮罩层、按下 ESC 键）进行区分</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>lockScroll</td>
                        <td>是否在 MessageBox 出现时将 body 滚动锁定</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>showCancelButton</td>
                        <td>是否显示取消按钮</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false（以 confirm 和 prompt 方式调用时为 true）</td>
                    </tr>
                    <tr>
                        <td>showConfirmButton</td>
                        <td>是否显示确定按钮</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>cancelButtonText</td>
                        <td>取消按钮的文本内容</td>
                        <td>string</td>
                        <td>—</td>
                        <td>取消</td>
                    </tr>
                    <tr>
                        <td>confirmButtonText</td>
                        <td>确定按钮的文本内容</td>
                        <td>string</td>
                        <td>—</td>
                        <td>确定</td>
                    </tr>
                    <tr>
                        <td>cancelButtonClass</td>
                        <td>取消按钮的自定义类名</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>confirmButtonClass</td>
                        <td>确定按钮的自定义类名</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>closeOnClickModal</td>
                        <td>是否可通过点击遮罩关闭 MessageBox</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true（以 alert 方式调用时为 false）</td>
                    </tr>
                    <tr>
                        <td>closeOnPressEscape</td>
                        <td>是否可通过按下 ESC 键关闭 MessageBox</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true（以 alert 方式调用时为 false）</td>
                    </tr>
                    <tr>
                        <td>closeOnHashChange</td>
                        <td>是否在 hashchange 时关闭 MessageBox</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>showInput</td>
                        <td>是否显示输入框</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false（以 prompt 方式调用时为 true）</td>
                    </tr>
                    <tr>
                        <td>inputPlaceholder</td>
                        <td>输入框的占位符</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>inputType</td>
                        <td>输入框的类型</td>
                        <td>string</td>
                        <td>—</td>
                        <td>text</td>
                    </tr>
                    <tr>
                        <td>inputValue</td>
                        <td>输入框的初始文本</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>inputPattern</td>
                        <td>输入框的校验表达式</td>
                        <td>regexp</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>inputValidator</td>
                        <td>输入框的校验函数。可以返回布尔值或字符串，若返回一个字符串, 则返回结果会被赋值给 inputErrorMessage</td>
                        <td>function</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>inputErrorMessage</td>
                        <td>校验未通过时的提示文本</td>
                        <td>string</td>
                        <td>—</td>
                        <td>输入的数据不合法!</td>
                    </tr>
                    <tr>
                        <td>center</td>
                        <td>是否居中布局</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>roundButton</td>
                        <td>是否使用圆角按钮</td>
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
