<template>
  <div>
  <el-collapse   accordion>
      <el-collapse-item title="属性" name="1">
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
              <td>绑定值</td>
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>label</td>
              <td>
                选中状态的值（只有在
                <code>checkbox-group</code>或者绑定对象类型为
                <code>array</code>时有效）
              </td>
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>true-label</td>
              <td>选中时的值</td>
              <td>string / number</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>false-label</td>
              <td>没有选中时的值</td>
              <td>string / number</td>
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
              <td>border</td>
              <td>是否显示边框</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>size</td>
              <td>Checkbox 的尺寸，仅在 border 为真时有效</td>
              <td>string</td>
              <td>medium / small / mini</td>
              <td>—</td>
            </tr>
            <tr>
              <td>name</td>
              <td>原生 name 属性</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>checked</td>
              <td>当前是否勾选</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
            <tr>
              <td>indeterminate</td>
              <td>设置 indeterminate 状态，只负责样式控制</td>
              <td>boolean</td>
              <td>—</td>
              <td>false</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="事件" name="2">
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
              <td>当绑定值变化时触发的事件</td>
              <td>更新后的值</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="组属性" name="3">
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
              <td>绑定值</td>
              <td>array</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>size</td>
              <td>多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效</td>
              <td>string</td>
              <td>medium / small / mini</td>
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
              <td>min</td>
              <td>可被勾选的 checkbox 的最小数量</td>
              <td>number</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>max</td>
              <td>可被勾选的 checkbox 的最大数量</td>
              <td>number</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>text-color</td>
              <td>按钮形式的 Checkbox 激活时的文本颜色</td>
              <td>string</td>
              <td>—</td>
              <td>#ffffff</td>
            </tr>
            <tr>
              <td>fill</td>
              <td>按钮形式的 Checkbox 激活时的填充色和边框色</td>
              <td>string</td>
              <td>—</td>
              <td>#409EFF</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="组事件" name="4">
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
              <td>当绑定值变化时触发的事件</td>
              <td>更新后的值</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="按钮式属性" name="5">
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
              <td>
                选中状态的值（只有在
                <code>checkbox-group</code>或者绑定对象类型为
                <code>array</code>时有效）
              </td>
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>true-label</td>
              <td>选中时的值</td>
              <td>string / number</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>false-label</td>
              <td>没有选中时的值</td>
              <td>string / number</td>
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
              <td>原生 name 属性</td>
              <td>string</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>checked</td>
              <td>当前是否勾选</td>
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

<script>

</script>
