<template>
<div>
    <el-collapse accordion>
        <el-collapse-item title="Menu Attribute(菜单属性)" name="1">
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
                        <td>mode</td>
                        <td>模式</td>
                        <td>string</td>
                        <td>horizontal / vertical</td>
                        <td>vertical</td>
                    </tr>
                    <tr>
                        <td>collapse</td>
                        <td>是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>background-color</td>
                        <td>菜单的背景色（仅支持 hex 格式）</td>
                        <td>string</td>
                        <td>—</td>
                        <td>#ffffff</td>
                    </tr>
                    <tr>
                        <td>text-color</td>
                        <td>菜单的文字颜色（仅支持 hex 格式）</td>
                        <td>string</td>
                        <td>—</td>
                        <td>#303133</td>
                    </tr>
                    <tr>
                        <td>active-text-color</td>
                        <td>当前激活菜单的文字颜色（仅支持 hex 格式）</td>
                        <td>string</td>
                        <td>—</td>
                        <td>#409EFF</td>
                    </tr>
                    <tr>
                        <td>default-active</td>
                        <td>当前激活菜单的 index</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>default-openeds</td>
                        <td>当前打开的 sub-menu 的 index 的数组</td>
                        <td>Array</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>unique-opened</td>
                        <td>是否只保持一个子菜单的展开</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>menu-trigger</td>
                        <td>子菜单打开的触发方式(只在 mode 为 horizontal 时有效)</td>
                        <td>string</td>
                        <td>hover / click</td>
                        <td>hover</td>
                    </tr>
                    <tr>
                        <td>router</td>
                        <td>是否使用 vue-router 的模式，启用该模式会在激活导航时以 index 作为 path 进行路由跳转</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>collapse-transition</td>
                        <td>是否开启折叠动画</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>true</td>
                    </tr>
                </tbody>
            </table>
        </el-collapse-item>
        <el-collapse-item title="Menu Methods(菜单方法)" name="2">
            <table >
                <thead>
                    <tr>
                        <th>方法名称</th>
                        <th>说明</th>
                        <th>参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>open</td>
                        <td>展开指定的 sub-menu</td>
                        <td>index: 需要打开的 sub-menu 的 index</td>
                    </tr>
                    <tr>
                        <td>close</td>
                        <td>收起指定的 sub-menu</td>
                        <td>index: 需要收起的 sub-menu 的 index</td>
                    </tr>
                </tbody>
            </table>
        </el-collapse-item>
        <el-collapse-item title="Menu Events(菜单事件)" name="3">
            <table >
                <thead>
                    <tr>
                        <th>事件名称</th>
                        <th>说明</th>
                        <th>回调参数</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>select</td>
                        <td>菜单激活回调</td>
                        <td>index: 选中菜单项的 index, indexPath: 选中菜单项的 index path</td>
                    </tr>
                    <tr>
                        <td>open</td>
                        <td>sub-menu 展开的回调</td>
                        <td>index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path</td>
                    </tr>
                    <tr>
                        <td>close</td>
                        <td>sub-menu 收起的回调</td>
                        <td>index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path</td>
                    </tr>
                </tbody>
            </table>
        </el-collapse-item>
        <el-collapse-item title="SubMenu Attribute(子菜单属性)" name="4">
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
                        <td>index</td>
                        <td>唯一标志</td>
                        <td>string/null</td>
                        <td>—</td>
                        <td>null</td>
                    </tr>
                    <tr>
                        <td>popper-class</td>
                        <td>弹出菜单的自定义类名</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>show-timeout</td>
                        <td>展开 sub-menu 的延时</td>
                        <td>number</td>
                        <td>—</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <td>hide-timeout</td>
                        <td>收起 sub-menu 的延时</td>
                        <td>number</td>
                        <td>—</td>
                        <td>300</td>
                    </tr>
                    <tr>
                        <td>disabled</td>
                        <td>是否禁用</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>false</td>
                    </tr>
                    <tr>
                        <td>popper-append-to-body</td>
                        <td>是否将弹出菜单插入至 body 元素。在菜单的定位出现问题时，可尝试修改该属性</td>
                        <td>boolean</td>
                        <td>—</td>
                        <td>一级子菜单：true / 非一级子菜单：false</td>
                    </tr>
                </tbody>
            </table>
        </el-collapse-item>
        <el-collapse-item title="Menu-Item Attribute(菜单项属性)" name="5">
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
                        <td>index</td>
                        <td>唯一标志</td>
                        <td>string</td>
                        <td>—</td>
                        <td>—</td>
                    </tr>
                    <tr>
                        <td>route</td>
                        <td>Vue Router 路径对象</td>
                        <td>Object</td>
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
                </tbody>
            </table>
        </el-collapse-item>
        <el-collapse-item title="Menu-Group Attribute(菜单组属性)" name="6">
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
                        <td>分组标题</td>
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
