<template>
<div>
    <el-collapse accordion>
        <el-collapse-item title="表属性" name="1">
            <table stripe size="medium">
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
                        <td>data</td>
                        <td>显示的数据</td>
                        <td>array</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>height</td>
                        <td>Table 的高度，默认为自动高度。如果 height 为 number 类型，单位 px；如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。</td>
                        <td>string/number</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>max-height</td>
                        <td>Table 的最大高度。合法的值为数字或者单位为 px 的高度。</td>
                        <td>string/number</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>stripe</td>
                        <td>是否为斑马纹 table</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>border</td>
                        <td>是否带有纵向边框</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>size</td>
                        <td>Table 的尺寸</td>
                        <td>string</td>
                        <td>medium / small / mini</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>fit</td>
                        <td>列的宽度是否自撑开</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>show-header</td>
                        <td>是否显示表头</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>highlight-current-row</td>
                        <td>是否要高亮当前行</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>current-row-key</td>
                        <td>当前行的 key，只写属性</td>
                        <td>String,Number</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>row-class-name</td>
                        <td>行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className。</td>
                        <td>Function({row, rowIndex})/String</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>row-style</td>
                        <td>行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style。</td>
                        <td>Function({row, rowIndex})/Object</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>cell-class-name</td>
                        <td>单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className。</td>
                        <td>Function({row, column, rowIndex, columnIndex})/String</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>cell-style</td>
                        <td>单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style。</td>
                        <td>Function({row, column, rowIndex, columnIndex})/Object</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>header-row-class-name</td>
                        <td>表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className。</td>
                        <td>Function({row, rowIndex})/String</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>header-row-style</td>
                        <td>表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style。</td>
                        <td>Function({row, rowIndex})/Object</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>header-cell-class-name</td>
                        <td>表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className。</td>
                        <td>Function({row, column, rowIndex, columnIndex})/String</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>header-cell-style</td>
                        <td>表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style。</td>
                        <td>Function({row, column, rowIndex, columnIndex})/Object</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>row-key</td>
                        <td>行数据的 Key，用来优化 Table 的渲染；在使用 reserve-selection 功能与显示树形数据时，该属性是必填的。类型为 String 时，支持多层访问：<code>user.info.id</code>，但不支持 <code>user.info[0].id</code>，此种情况请使用 <code>Function</code>。</td>
                        <td>Function(row)/String</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>empty-text</td>
                        <td>空数据时显示的文本内容，也可以通过 <code>slot="empty"</code> 设置</td>
                        <td>String</td>
                        <td>—</td>
                        <td>暂无数据</td>
                    </tr>
                    <tr>
                        <td>default-expand-all</td>
                        <td>是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效</td>
                        <td>Boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>expand-row-keys</td>
                        <td>可以通过该属性设置 Table 目前的展开行，需要设置 row-key 属性才能使用，该属性为展开行的 keys 数组。</td>
                        <td>Array</td>
                        <td>—</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>default-sort</td>
                        <td>默认的排序列的 prop 和顺序。它的<code>prop</code>属性指定默认的排序的列，<code>order</code>指定默认排序的顺序</td>
                        <td>Object</td>
                        <td><code>order</code>: ascending, descending</td>
                        <td>如果只指定了<code>prop</code>, 没有指定<code>order</code>, 则默认顺序是ascending</td>
                    </tr>
                    <tr>
                        <td>tooltip-effect</td>
                        <td>tooltip <code>effect</code> 属性</td>
                        <td>String</td>
                        <td>dark/light</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>show-summary</td>
                        <td>是否在表尾显示合计行</td>
                        <td>Boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>sum-text</td>
                        <td>合计行第一列的文本</td>
                        <td>String</td>
                        <td>—</td>
                        <td>合计</td>
                    </tr>
                    <tr>
                        <td>summary-method</td>
                        <td>自定义的合计计算方法</td>
                        <td>Function({ columns, data })</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>span-method</td>
                        <td>合并行或列的计算方法</td>
                        <td>Function({ row, column, rowIndex, columnIndex })</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>select-on-indeterminate</td>
                        <td>在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。若为 true，则选中所有行；若为 false，则取消选择所有行</td>
                        <td>Boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                    <tr>
                        <td>indent</td>
                        <td>展示树形数据时，树节点的缩进</td>
                        <td>Number</td>
                        <td>—</td>
                        <td>16</td>
                    </tr>
                    <tr>
                        <td>lazy</td>
                        <td>是否懒加载子节点数据</td>
                        <td>Boolean</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>load</td>
                        <td>加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息</td>
                        <td>Function(row, treeNode, resolve)</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>tree-props</td>
                        <td>渲染嵌套数据的配置选项</td>
                        <td>Object</td>
                        <td>—</td>
                        <td>{ hasChildren: 'hasChildren', children: 'children' }</td>
                    </tr>
                </tbody>
            </table>
        </el-collapse-item>
        <el-collapse-item title="表事件" name="2">
            <table >
                <thead>
                    <tr>
                        <th>事件名</th>
                        <th>说明</th>
                        <th>参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>select</td>
                        <td>当用户手动勾选数据行的 Checkbox 时触发的事件</td>
                        <td>selection, row</td>
                    </tr>
                    <tr>
                        <td>select-all</td>
                        <td>当用户手动勾选全选 Checkbox 时触发的事件</td>
                        <td>selection</td>
                    </tr>
                    <tr>
                        <td>selection-change</td>
                        <td>当选择项发生变化时会触发该事件</td>
                        <td>selection</td>
                    </tr>
                    <tr>
                        <td>cell-mouse-enter</td>
                        <td>当单元格 hover 进入时会触发该事件</td>
                        <td>row, column, cell, event</td>
                    </tr>
                    <tr>
                        <td>cell-mouse-leave</td>
                        <td>当单元格 hover 退出时会触发该事件</td>
                        <td>row, column, cell, event</td>
                    </tr>
                    <tr>
                        <td>cell-click</td>
                        <td>当某个单元格被点击时会触发该事件</td>
                        <td>row, column, cell, event</td>
                    </tr>
                    <tr>
                        <td>cell-dblclick</td>
                        <td>当某个单元格被双击击时会触发该事件</td>
                        <td>row, column, cell, event</td>
                    </tr>
                    <tr>
                        <td>row-click</td>
                        <td>当某一行被点击时会触发该事件</td>
                        <td>row, column, event</td>
                    </tr>
                    <tr>
                        <td>row-contextmenu</td>
                        <td>当某一行被鼠标右键点击时会触发该事件</td>
                        <td>row, column, event</td>
                    </tr>
                    <tr>
                        <td>row-dblclick</td>
                        <td>当某一行被双击时会触发该事件</td>
                        <td>row, column, event</td>
                    </tr>
                    <tr>
                        <td>header-click</td>
                        <td>当某一列的表头被点击时会触发该事件</td>
                        <td>column, event</td>
                    </tr>
                    <tr>
                        <td>header-contextmenu</td>
                        <td>当某一列的表头被鼠标右键点击时触发该事件</td>
                        <td>column, event</td>
                    </tr>
                    <tr>
                        <td>sort-change</td>
                        <td>当表格的排序条件发生变化的时候会触发该事件</td>
                        <td>{ column, prop, order }</td>
                    </tr>
                    <tr>
                        <td>filter-change</td>
                        <td>当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。</td>
                        <td>filters</td>
                    </tr>
                    <tr>
                        <td>current-change</td>
                        <td>当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlight-current-row 属性</td>
                        <td>currentRow, oldCurrentRow</td>
                    </tr>
                    <tr>
                        <td>header-dragend</td>
                        <td>当拖动表头改变了列的宽度的时候会触发该事件</td>
                        <td>newWidth, oldWidth, column, event</td>
                    </tr>
                    <tr>
                        <td>expand-change</td>
                        <td>当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）</td>
                        <td>row, (expandedRows | expanded)</td>
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
