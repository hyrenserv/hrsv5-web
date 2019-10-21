<template>
  <div>
    <el-collapse accordion>
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
              <td>Radio 的 value</td>
              <td>string / number / boolean</td>
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
              <td>Radio 的尺寸，仅在 border 为真时有效</td>
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
              <td>绑定值变化时触发的事件</td>
              <td>选中的 Radio label 值</td>
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
              <td>string / number / boolean</td>
              <td>—</td>
              <td>—</td>
            </tr>
            <tr>
              <td>size</td>
              <td>单选框组尺寸，仅对按钮形式的 Radio 或带有边框的 Radio 有效</td>
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
              <td>text-color</td>
              <td>按钮形式的 Radio 激活时的文本颜色</td>
              <td>string</td>
              <td>—</td>
              <td>#ffffff</td>
            </tr>
            <tr>
              <td>fill</td>
              <td>按钮形式的 Radio 激活时的填充色和边框色</td>
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
              <td>绑定值变化时触发的事件</td>
              <td>选中的 Radio label 值</td>
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
              <td>Radio 的 value</td>
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
          </tbody>
        </table>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {};
</script>
