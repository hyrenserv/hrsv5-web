<template>
<div id='bbgl'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>集市版本管理</span>
        <router-link to="/collectmonitor">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <el-row>
        <el-col :span="5">
            <div class="mytree" hight='200'>
                <el-tree :data="data" :indent='0' show-checkbox class="filter-tree" node-key="id" :default-expanded-keys="[1]" :default-checked-keys="[2]" :props="defaultProps">
                    <span class="span-ellipsis" slot-scope="{ node, data }">
                        <span :title="data.label" v-if="data.type=='wb'">
                            <i class=" el-icon-document" />{{node.label}}
                        </span>
                        <span :title="data.label" v-else-if="data.type=='wj'">
                            <i class="el-icon-folder-opened" />{{node.label}}
                        </span>
                        <span :title="data.label" v-else>
                            <i />{{node.label}}
                        </span>
                    </span>
                </el-tree>
            </div>
        </el-col>
        <el-col :span="19">
            <el-tabs v-model="activeName" type="border-card">
                <el-tab-pane label="数据结构对比" name="first">
                    <div class="text item">
                        <div class='bd contrast'>
                            <el-row type="flex" justify="start" :gutter="2">
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td id="bar_1" colspan="3" style="background:#1890ff;color: #fff;text-align: center;">当前<div style="position: absolute;top: 13px;"></div>
                                                    </td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F176">用户评分</th> -->
                                                    <td style="font-weight: bold;">字段</td>
                                                    <td style="font-weight: bold;">中文</td>
                                                    <td style="font-weight: bold;">类型</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F187">参考报价</th> -->
                                                    <td>agent_type</td>
                                                    <td>agent类型</td>
                                                    <td>varchar(1)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F80">手机类型</th> -->
                                                    <td>agent_name</td>
                                                    <td>agent名称</td>
                                                    <td style="color:#b70707">varchar(100)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td style="color:#b70707">create_time</td>
                                                    <td style="color:#b70707">创建时间</td>
                                                    <td style="color:#b70707">varchar(8)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>agent_desc</td>
                                                    <td style="color:#b70707">描述</td>
                                                    <td>varchar(1024)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td id="bar_1" colspan="3" style="background:#1890ff;color: #fff;text-align: center;position:relative">2020-03-24<div style="position: absolute;top: 0px;right: 3px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                    </td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F176">用户评分</th> -->
                                                    <td style="font-weight: bold;">字段</td>
                                                    <td style="font-weight: bold;">中文</td>
                                                    <td style="font-weight: bold;">类型</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F187">参考报价</th> -->
                                                    <td>agent_type</td>
                                                    <td>agent类型</td>
                                                    <td>varchar(1)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F80">手机类型</th> -->
                                                    <td>agent_name</td>
                                                    <td>agent名称</td>
                                                    <td style="color:#b70707">varchar(100)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td style="color:#b70707">create_time</td>
                                                    <td style="color:#b70707">创建时间</td>
                                                    <td style="color:#b70707">varchar(8)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>agent_desc</td>
                                                    <td style="color:#b70707">描述</td>
                                                    <td>varchar(1024)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td id="bar_1" colspan="3" style="background:#1890ff;color: #fff;text-align: center;position:relative">2020-03-30<div style="position: absolute;top: 0px;right: 3px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                    </td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F176">用户评分</th> -->
                                                    <td style="font-weight: bold;">字段</td>
                                                    <td style="font-weight: bold;">中文</td>
                                                    <td style="font-weight: bold;">类型</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F187">参考报价</th> -->
                                                    <td>agent_type</td>
                                                    <td>agent类型</td>
                                                    <td>varchar(1)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F80">手机类型</th> -->
                                                    <td>agent_name</td>
                                                    <td>agent名称</td>
                                                    <td style="color:#b70707">varchar(100)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td style="color:#b70707">create_time</td>
                                                    <td style="color:#b70707">创建时间</td>
                                                    <td style="color:#b70707">varchar(8)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>agent_desc</td>
                                                    <td style="color:#b70707">描述</td>
                                                    <td>varchar(1024)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td id="bar_1" colspan="3" style="background:#1890ff;color: #fff;text-align: center;position:relative">2020-04-30<div style="position: absolute;top: 0px;right: 3px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                                    </td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F176">用户评分</th> -->
                                                    <td style="font-weight: bold;">字段</td>
                                                    <td style="font-weight: bold;">中文</td>
                                                    <td style="font-weight: bold;">类型</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F187">参考报价</th> -->
                                                    <td>agent_type</td>
                                                    <td>agent类型</td>
                                                    <td>varchar(1)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F80">手机类型</th> -->
                                                    <td>agent_name</td>
                                                    <td>agent名称</td>
                                                    <td style="color:#b70707">varchar(100)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td style="color:#b70707">create_time</td>
                                                    <td style="color:#b70707">创建时间</td>
                                                    <td style="color:#b70707">varchar(8)</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>-</td>
                                                    <td>-</td>
                                                    <td>-</td>
                                                </tr>
                                                <tr onmouseover="this.className='overbgh'" onmouseout="this.className='outbgh'" class="outbgh">
                                                    <!-- <th id="ctxt_0_F14">网络模式</th> -->
                                                    <td>agent_desc</td>
                                                    <td style="color:#b70707">描述</td>
                                                    <td>varchar(1024)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="数据mapping对比" name="second">
                    <div class="text item">
                        <div class='bd contrast'>
                            <el-row type="flex" justify="start" :gutter="2">
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <tr>
                                            <td id="bar_1" style="background:#1890ff;color: #fff;text-align: center;">当前<div style="position: absolute;top: 0;"></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td style="text-align:left;padding-top:0">
                                                <p class='topp'>select</p>
                                                <p class='pding'>,dt.d_year</p>
                                                <p class='pding' style="color:#b70707">,ppa.i_category_id</p>
                                                <p class='pding'>,ppa.i_category</p>
                                                <p class='pding' style="color:#b70707">,sum(ss_ext_sales_price)</p>
                                                <p class='topp'>from</p>
                                                <p class='pding'>pocc_pol7_date_dim_appendix dt</p>
                                                <p class='pding'>,pocc_pol7_store_sales_appendix pps</p>
                                                <p class='pding' style="color:#b70707">,pocc_pol7_item ppa</p>
                                                <p class='topp'>where</p>
                                                <p class='pding'>dt.d_date_sk=pps.ss_sold_date_sk</p>
                                                <p class='pding'>and pps.ss_item_sk=ppa.i_item_sk</p>
                                                <p class='pding'>&nbsp;</p>
                                                <p class='topp'>and dt.d_moy=12</p>
                                                <p class='pding'>and dt.d_year=1998</p>
                                                <p class='topp'>group by</p>
                                                <p class='pding' style="color:#b70707">ppa.i_category_id</p>
                                                <p class='pding'>,ppa.i_category</p>
                                            </td>
                                        </tr>
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <tr>
                                            <td id="bar_1" colspan="3" style="background:#1890ff;color: #fff;text-align: center;position:relative">2020-03-24<div style="position: absolute;top: 0px;right: 3px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class='topp'> select</p>
                                                <p class='pding'> ,dt.d_year</p>
                                                <p class='pding' style="color:#b70707"> ,ppa.i_category_id</p>
                                                <p class='pding'> ,ppa.i_category</p>
                                                <p class='pding' style="color:#b70707"> ,sum(ss_ext_sales_price)</p>
                                                <p class='topp'> from</p>
                                                <p class='pding'> pocc_pol7_date_dim_appendix dt</p>
                                                <p class='pding'> ,pocc_pol7_store_sales_appendix pps</p>
                                                <p class='pding' style="color:#b70707"> ,pocc_pol7_item ppa</p>
                                                <p class='topp'> where</p>
                                                <p class='pding'>dt.d_date_sk=pps.ss_sold_date_sk</p>
                                                <p class='pding'>and pps.ss_item_sk=ppa.i_item_sk</p>
                                                <p class='pding'>&nbsp;</p>
                                                <p class='topp'>and dt.d_moy=12</p>
                                                <p class='pding'>and dt.d_year=1998</p>
                                                <p class='topp'> group by</p>
                                                <p class='pding' style="color:#b70707">ppa.i_category_id</p>
                                                <p class='pding'> ,ppa.i_category</p>
                                            </td>
                                        </tr>
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <tr>
                                            <td id="bar_1" colspan="3" style="background:#1890ff;color: #fff;text-align: center;position:relative">2020-03-30<div style="position: absolute;top: 0px;right: 3px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class='topp'>select</p>
                                                <p class='pding'>,dt.d_year</p>
                                                <p class='pding' style="color:#b70707">,pps.i_category_id</p>
                                                <p class='pding'>,ppa.i_category</p>
                                                <p class='pding' style="color:#b70707">,sum(ss_ext_sales_price)</p>
                                                <p class='topp'>from</p>
                                                <p class='pding'>pocc_pol7_date_dim_appendix dt</p>
                                                <p class='pding'>,pocc_pol7_store_sales_appendix pps</p>
                                                <p class='pding' style="color:#b70707">,pocc_pol7_item_appendix ppa</p>
                                                <p class='topp'>where</p>
                                                <p class='pding'>dt.d_date_sk=pps.ss_sold_date_sk</p>
                                                <p class='pding'>and pps.ss_item_sk=ppa.i_item_sk</p>
                                                <p class='pding' style="color:#b70707">and ppa.i_manager_id = 1</p>
                                                <p class='topp'>and dt.d_moy=12</p>
                                                <p class='pding'>and dt.d_year=1998</p>
                                                <p class='topp'>group by</p>
                                                <p class='pding' style="color:#b70707">pps.i_category_id</p>
                                                <p class='pding'>,ppa.i_category</p>
                                            </td>
                                        </tr>
                                    </div>
                                </el-col>
                                <el-col>
                                    <div class="ctxt" name="ctxt">
                                        <tr>
                                            <td id="bar_1" colspan="3" style="background:#1890ff;color: #fff;text-align: center;position:relative">2020-04-30<div style="position: absolute;top: 0px;right: 3px;"><i class='el-icon-close' style="color:#fff"></i></div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p class='topp'>select</p>
                                                <p class='pding'>,dt.d_year</p>
                                                <p class='pding' style="color:#b70707">,pps.i_category_id</p>
                                                <p class='pding'>,ppa.i_category</p>
                                                <p class='pding' style="color:#b70707">,sum(ss_ext_sales_price)</p>
                                                <p class='topp'>from</p>
                                                <p class='pding'>pocc_pol7_date_dim_appendix dt</p>
                                                <p class='pding'>,pocc_pol7_store_sales_appendix pps</p>
                                                <p class='pding' style="color:#b70707">,pocc_pol7_item_appendix ppa</p>
                                                <p class='topp'>where</p>
                                                <p class='pding'>dt.d_date_sk=pps.ss_sold_date_sk</p>
                                                <p class='pding'>and pps.ss_item_sk=ppa.i_item_sk</p>
                                                <p class='pding' style="color:#b70707">and ppa.i_manager_id = 1</p>
                                                <p class='topp'>and dt.d_moy=12</p>
                                                <p class='pding'>and dt.d_year=1998</p>
                                                <p class='topp'>group by</p>
                                                <p class='pding' style="color:#b70707">pps.i_category_id</p>
                                                <p class='pding'>,ppa.i_category</p>
                                            </td>
                                        </tr>
                                    </div>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>

        </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    data() {
        return {
            activeName: 'first',
            data: [{
                id: 1,
                type: 'wj',
                label: '贴源层',
                children: [{
                    id: 4,
                    type: 'wj',
                    label: 'PSQL',
                    children: [{
                        id: 9,
                        type: 'wb',
                        label: 'agent_info',
                        children: [{
                            id: 10,
                            type: 'time',
                            label: '2020-03-24'
                        }, {
                            id: 110,
                            type: 'time',
                            label: '2020-03-30'
                        }, {
                            id: 111,
                            type: 'time',
                            label: '2020-04-30'
                        }]
                    }]
                }]
            }, {
                id: 2,
                label: '集市层',
                type: 'wj',
                children: [{
                    id: 5,
                    label: '二级 2-1'
                }, {
                    id: 6,
                    label: '二级 2-2'
                }]
            }, {
                id: 3,
                label: '管控层',
                type: 'wj',
                children: [{
                    id: 7,
                    label: '二级 3-1'
                }, {
                    id: 8,
                    label: '二级 3-2'
                }]
            }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },

}
</script>

<style scoped>
.text {
    font-size: 14px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

#bbgl>>>.el-card__body {
    padding: 4px !important;
}

.topp {
    /* font-weight: bold; */
    font-size: 14px;
}

.box-card {
    width: 480px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    border-bottom: 1px dashed #ccc;
    height: 24px;
    line-height: 24px;
    font-size: 14px;
    color: #706e6e;
}

.contrast .ctxt {
    /* margin: 2px auto 9px; */
    color: #000;
    width: 100%;
    line-height: 14px;
    box-sizing: border-box;
    border: solid #e5e5e5;
    border-width: 0px 1px 1px 0px;
}

#bbgl>>>.table {
    border-collapse: collapse;
    border-spacing: 0;
}

#bbgl>>>.contrast .ctxt caption {
    display: table-caption;
    background-color: #f9f9f9;
    color: #1890ff;
    height: 29px;
    line-height: 29px;
    padding-left: 15px;
    font-weight: 700;
}

#bbgl>>>.caption,
th {
    text-align: center;
}

#bbgl>>>.outbgh {
    background-color: #fff;
}

#bbgl>>>.tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
}

#bbgl>>>.contrast .ctxt .outbgh th {
    background-color: #f9f9f9;
}

#bbgl>>>.contrast .ctxt th {
    border-top: 1px solid #e5e5e5;
    border-right: 1px solid #c3c3c3;
    text-align: right;
    padding: 12px 24px 12px 7px;
    background-color: #f9f9f9;
    width: 98px;
}

#bbgl>>>.contrast .ctxt td {
    border: solid #e5e5e5;
    border-width: 1px 0 0 1px;
    padding: 4px 0px;
    width: 216px;
}

.bar th {
    width: 126px;
}

.bar td,
.bar th {
    font-weight: 700;
    color: #fff;
    background-color: #696969;
    border-right: 1px solid #fff;
    text-align: left;
    width: 247px;
    padding: 8px 2px;
    line-height: 14px;
}

.bar {
    margin: 0 auto;
    overflow: hidden;
    zoom: 1;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

#bbgl>>>td {
    margin: 0 auto;
    color: #333;
    line-height: 22px;
    font-size: 12px;
    font-family: "宋体", Verdana, Geneva, sans-serif;
    background-color: #fff;
    text-align: left;

}

#bbgl>>>.el-tree-node .is-leaf+.el-checkbox .el-checkbox__inner {
    display: inline-block;
}

#bbgl>>>.el-tree-node .el-checkbox__input>.el-checkbox__inner {

    display: none;
    margin: 0
}

#bbgl>>>.el-tree-node__content>label.el-checkbox {
    margin-right: 3px;
}

.pding {
    padding-left: 28px;
}

#bbgl>>>.el-tabs__header {
    margin: 0 !important;
}
</style>
