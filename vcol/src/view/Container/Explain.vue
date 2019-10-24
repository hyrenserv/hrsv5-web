<template>
  <div>
    <el-collapse accordion>
      <el-collapse-item title="内容栏属性" name="1">
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
              <td>direction</td>
              <td>子元素的排列方向</td>
              <td>string</td>
              <td>horizontal / vertical</td>
              <td>
                子元素中有
                <code>el-header</code> 或
                <code>el-footer</code> 时为 vertical，否则为 horizontal
              </td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="顶部栏属性" name="2">
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
              <td>height</td>
              <td>顶栏高度</td>
              <td>string</td>
              <td>—</td>
              <td>60px</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="侧边栏属性" name="3">
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
              <td>width</td>
              <td>侧边栏宽度</td>
              <td>string</td>
              <td>—</td>
              <td>300px</td>
            </tr>
          </tbody>
        </table>
      </el-collapse-item>
      <el-collapse-item title="底部栏属性" name="4">
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
              <td>height</td>
              <td>底栏高度</td>
              <td>string</td>
              <td>—</td>
              <td>60px</td>
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
