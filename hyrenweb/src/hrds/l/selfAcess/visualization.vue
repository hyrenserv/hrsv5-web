<template>
    <div class="visualizationDiv">
        <el-row class="elRowtitle">
            <p class="tempalteInfo">选择数据源</p>
            <div class="templateButton">
                <el-button type="danger" @click="goBack" size="small">
                    返回上级
                </el-button>
                <el-button type="primary" @click="addVisualComponentInfo()" size="small">
                    保存组件
                </el-button>
            </div>
        </el-row>
        <div class="lines"></div>
        <el-row>
            <el-col :span="12">
                <el-select v-model="formvalue" placeholder="请选择数据源" size="small" style="width:150px" clearable
                           @change="changeSelectDataCollect">
                    <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code">
                    </el-option>
                </el-select>
                <el-input style="width:260px;margin-right:10px" size="small" v-model="input" disabled
                          placeholder="选择数据源表名">
                    <el-button slot="append" @click="showDataCollect">查看</el-button>
                </el-input>
            </el-col>
            <el-col :span="12">
                <el-form :model="auto_comp_sum" ref="auto_comp_sum" size="small" :inline="true">
                    <el-form-item label="组件名称" prop="component_name" :rules="filter_rules([{required: true}])">
                        <el-input v-model="auto_comp_sum.component_name" placeholder="组件名称"></el-input>
                    </el-form-item>
                    <el-form-item label="组件描述" prop="component_name" :rules="filter_rules([{required: true}])">
                        <el-input v-model="auto_comp_sum.component_desc" placeholder="组件描述"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8" class="elcol8">
                <p class="optionsWords">设置显示字段 </p>
                <div class="showArryDiv">
                    <ul>
                        <li v-for="(item,index) in optionsWords" class="showArryDivContent" :key="item.name"
                            style="padding-left:10px;height:30px;line-height:30px;"> {{item.name}}
                            <span style="cursor:pointer;" @click="clickClose(item,index)">
                                <i class="el-icon-close"></i></span>
                            <span v-if="optionsWords.length >1" @click="moveUp(index,item,optionsWords)">
                                <i class="el-icon-top"></i></span>
                            <span v-if="optionsWords.length >1" @click="moveDown(index,item,optionsWords)"><i
                                    class="el-icon-bottom"></i></span>
                        </li>
                    </ul>
                </div>
                <div class="elcol8Button">
                    <el-button size="mini" @click="addWords" :disabled="disabled" type="info">添加字段</el-button>
                </div>

            </el-col>
            <el-col :span="8" class="elcol8">
                <p class="optionsWords">设置过滤条件
                    <el-button :disabled="canChangeFiflter" size="mini" type="primary">修改条件逻辑</el-button>
                </p>
                <div class="showArryDiv">
                    <ul>
                        <li v-for="(item,index) in fiflterConditionArr" class="showArryDivContent" :key="item.nameAll"
                            style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}} <span
                                style="cursor:pointer;" @click="clickCloseConditionWords(item,index)"><i
                                class="el-icon-close"></i></span></li>
                    </ul>
                </div>
                <div class="elcol8Button">
                    <el-button size="mini" @click="fiflterCondition" :disabled="disabled" type="info">添加过滤条件</el-button>
                </div>
                <div class="showArryDiv showArryDivSelect " v-if="addfiflterCondition">
                    <ul>
                        <li v-for="(item,index) in columnsWordsALL" class="showArryDivContent" :key="item.nameAll"
                            @click="addfiflterConditionWords(item,index)"
                            style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}
                        </li>
                    </ul>
                </div>
                <div class="showArryDiv showArryDivSelect " v-if="addfiflterConditionDetails">
                    <div style="background: #f5f5f5;height:40px;line-height:40px;" class="fiflterConditionDetails">
                        <p style="float:left;margin-left:6px;width:208px;font-size:14px;">{{input}}-->{{keyWords}}
                            <el-tooltip class="item" effect="dark" placement="top" style="margin-left:-12px;">
                                <div slot="content">字符串类型的条件要带"</div>
                                <i class="el-icon-question elIconInfo"></i>
                            </el-tooltip>
                        </p>
                        <p style="float:right;margin-right:6px;margin-top: -2px;">
                            <el-select v-model="optionsCodevalue" placeholder="请选择" size="mini" style="width:110px"
                                       @change="changeOptionsCode">
                                <el-option v-for="item in optionsCode" :key="item.value" :label="item.label"
                                           :value="item.value">
                                </el-option>
                            </el-select>
                        </p>
                        <div style="padding:0 10px 0 10px" v-if="twoInput">
                            <el-input v-model="inputvalueOptions1" size="small" placeholder="请输入条件"></el-input>
                            <el-input v-model="inputvalueOptions2" size="small" placeholder="请输入条件"></el-input>
                        </div>
                        <div style="padding:0 10px 0 10px" v-if="oneInput">
                            <el-input v-model="inputvalueOptions3" size="small" placeholder="请输入条件"></el-input>
                        </div>
                        <div style="clear:both"></div>
                        <div style="float:right;margin-right:4px;">
                            <el-button size="mini" @click="fiflterSqlOptions" :disabled="fiflterSqlOptionsButton"
                                       type="primary">添加筛选器
                            </el-button>
                            <el-button size="mini" @click="goBackfiflterCondition" type="primary">返回</el-button>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" class="elcol8">
                <p class="optionsWords">设置分组条件</p>
                <div class="showArryDiv">
                    <ul>
                        <li v-for="(item,index) in groupCondtionArr" class="showArryDivContent" :key="item.nameAll"
                            style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}} <span
                                style="cursor:pointer;" @click="clickCloseGroupWords(item,index)"><i
                                class="el-icon-close"></i></span></li>
                    </ul>
                </div>
                <div class="elcol8Button">
                    <el-button size="mini" @click="addGroup" :disabled="disabled" type="info">添加分组条件</el-button>
                </div>
                <div class="showArryDiv showArryDivSelect " v-show="groupHidden">
                    <ul>
                        <li v-for="(item,index) in columnsWordsALL" class="showArryDivContent" :key="item.nameAll"
                            @click="addGroupWords(item,index)" style="padding-left:10px;height:30px;line-height:30px;">
                            {{item.nameAll}}
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
        <el-row style="margin:16px 0 8px 0;">
            <div style="width:400px;margin:0 auto;">
                <el-button size="small" @click="getAnswer(false)" :loading="loadingsearch"
                           :disabled="optionsWordsbuttons" type="primary">得到答案
                </el-button>
                <el-input style="width:220px;margin-left:6px;" size="small" v-model="showNum"
                          placeholder="显示条数"></el-input>
            </div>
        </el-row>
        <el-row class="elRowtitle" v-if="isDataShow">
            <p class="tempalteInfo">结果信息</p>
        </el-row>
        <div class="lines" v-if="isDataShow"></div>
        <el-table size="medium"
                  :data="dynamicColumnTables.slice((answerCurrPage - 1) * answerPageSize, answerCurrPage *answerPageSize)"
                  border stripe style="width: 100%" v-if="isDataShow">
            <el-table-column label="序号" width="64" align="center">
                <template scope="scope">
                    <span>{{scope.$index+(answerCurrPage - 1) * answerPageSize + 1}}</span>
                </template>
            </el-table-column>
            <el-table-column v-for="col in dynamicColumns" show-overflow-tooltip min-width="200px" :prop="col"
                             :label="col" :key="Math.random()">
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="answerCurrPage" v-if="isDataShow" :page-sizes="[5, 10, 20, 50 ,100]"
                       :page-size="answerPageSize" layout="total, sizes, prev, pager, next, jumper"
                       :total="dynamicColumnTables.length" class="locationcenter"></el-pagination>
        <div class="lines"></div>
        <el-row class="elRowtitle">
            <p class="tempalteInfo">可视化设置</p>
        </el-row>
        <div class="lines"></div>
        <el-row :gutter="20">
            <el-col :span="5">
                <div>
                    <el-input placeholder="请输入内容" @change="fuzzyquery1()" v-model="input1" size="small"
                              style="width:100%;">
                        <template slot="prepend">维度</template>
                    </el-input>
                    <div class="showArryDiv showArryDivSelect ">
                        <ul>
                            <draggable class="list-group" :list="weiduArry" group="people">
                                <li v-for="item in weiduArry" class="showArryDivContent" :key="item.nameAll"
                                    style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}
                                </li>
                            </draggable>
                        </ul>
                    </div>
                </div>
                <div>
                    <el-input placeholder="请输入内容" @change="fuzzyquery2()" v-model="input2" size="small"
                              style="width:100%;margin-top:30px;">
                        <template slot="prepend">度量</template>
                    </el-input>
                    <div class="showArryDiv showArryDivSelect ">
                        <ul>
                            <draggable class="list-group" :list="duliangArry" group="people">
                                <li v-for="item in duliangArry" class="showArryDivContent" :key="item.nameAll"
                                    style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}
                                </li>
                            </draggable>
                        </ul>
                    </div>
                </div>
            </el-col>
            <el-col :span="12">
                <div class="axisStyle">
                    <span class="el-input-group__prepends"
                          style="width:70px;margin-top:0px;border-top:none;border-left:none;border-bottom:none;height:30px;line-height:30px;padding:0;">横轴</span>
                    <draggable :list="xValueArry" group="people">
                        <div style="width:85%;height:30px;line-height:30px;background:#fff;overflow:auto;font-size:14px;">
                            <span v-for="(item,index) in xValueArry" :key="item.nameAll">{{item.nameAll}}<i
                                    class="el-icon-close" @click="deleteXvalue(item,index)" style="cursor:pointer;"></i>&nbsp</span>
                        </div>
                    </draggable>
                </div>

                <div class="axisStyle">
                    <span class="el-input-group__prepends"
                          style="width:70px;margin-top:0px;border-top:none;border-left:none;border-bottom:none;height:30px;line-height:30px;padding:0;">纵轴</span>
                    <draggable :list="yValueArry" group="people" onupdate="">
                        <div style="width:85%;height:30px;line-height:30px;background:#fff;overflow:auto;font-size:14px;">
                            <span v-for="(item,index) in yValueArry" :key="item.nameAll">{{item.nameAll}}<i
                                    class="el-icon-close" @click="deleteYvalue(item,index)" style="cursor:pointer;"></i>&nbsp</span>
                        </div>
                    </draggable>
                </div>
                <div style="font-size:16px;color:red;margin:6px 10px 0px 10px;">{{tips}}</div>
                <div v-show="echart_type=='table'" style="wdith:100%;overflow: auto;">
                    <el-table id="tableStyle" size="medium"
                              :data="echartTableData.slice((currPage - 1) * pageSize, currPage * pageSize)"
                              style="width: 100%" :row-style="getRowStyle" :border="show_border" :stripe="show_stripe">
                        <el-table-column label="序号" width="50" align="center">
                            <template scope="scope">
                                <span>{{scope.$index+(currPage - 1) * pageSize + 1}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column v-for="col in dynamicColumns" show-overflow-tooltip min-width="200px"
                                         :prop="col" :label="col" :key="col">
                        </el-table-column>
                    </el-table>
                    <el-pagination @size-change="echartTableSizeChange" @current-change="echartCurrentChange"
                                   :current-page="currPage" :page-sizes="[5, 10, 20, 50, 100]" :page-size="pageSize"
                                   layout="total, sizes, prev, pager, next, jumper" :total="echartTableData.length"
                                   class="locationcenter"></el-pagination>
                </div>
                <div v-show="echart_type=='card'" style="margin-bottom:10px;height:440px" class="thumbnails">
                    <div style="transform: translate(-50%,-50%);top:50%;left:50%;position:absolute;">
                        <p id="cardp">{{auto_comp_sum.chart_theme}}</p>
                        <h1 id="carddiv"></h1>
                    </div>
                </div>
                <div id="myChart" v-show="echart_type!='card' && echart_type!='table'"
                     style="width:100%; height: 360px;"></div>
            </el-col>
            <el-col :span="7">
                <el-select v-model="value" size="small" placeholder="请选择图表类型" style="width:98%;"
                           @change="changeChartType">
                    <el-option v-for="item in optionsCharts" :key="item.value" :value="item.value"
                               :label="item.label"></el-option>
                </el-select>
                <div style="margin-top:10px;" v-show="value == 'line' || echart_type=='line'">
                    <img style="width:87px;height:70px;cursor:pointer;" @click="echartshow('line')"
                         src="@/assets/images/chart/line.png" alt="标准折线图" title="标准折线图">
                </div>
                <div style="margin-top:10px;"
                     v-show="value =='bar' || echart_type=='stackingbar' ||echart_type=='polarbar'">
                    <img class="imgStyle" @click="echartshow('bar')" src="@/assets/images/chart/bar.png" alt="标准柱状图"
                         title="标准柱状图">
                    <img class="imgStyle" @click="echartshow('stackingbar')"
                         src="@/assets/images/chart/stacking-bar.png" alt="堆叠柱状图" title="堆叠柱状图">
                    <img class="imgStyle" @click="echartshow('polarbar')" src="@/assets/images/chart/bar-polar.png"
                         alt="极坐标柱状图" title="极坐标柱状图">
                </div>

                <div style="margin-top:10px;"
                     v-show="value =='pie' || echart_type=='fasanpie' || echart_type=='huanpie'">
                    <img class="imgStyle" @click="echartshow('pie')" src="@/assets/images/chart/pie.png" alt="标准饼图"
                         title="标准饼图">
                    <img class="imgStyle" @click="echartshow('fasanpie')" src="@/assets/images/chart/pie-customized.png"
                         alt="发散饼图" title="发散饼图">
                    <img class="imgStyle" @click="echartshow('huanpie')" src="@/assets/images/chart/pie-doughnut.png"
                         alt="环形饼图" title="环形饼图">
                </div>
                <div style="margin-top:10px;" v-show="value =='scatter' || echart_type=='bubble'">
                    <img class="imgStyle" @click="echartshow('scatter')" src="@/assets/images/chart/scatter.png"
                         alt="标准散点图" title="标准散点图">
                </div>
                <div style="margin-top:10px;" v-show="value =='card' || echart_type=='card'">
                    <img class="imgStyle" @click="echartshow('card')" src="@/assets/images/chart/card.jpg" alt="卡片"
                         title="卡片">
                </div>
                <div style="margin-top:10px;" v-show="value =='treemap' || echart_type=='treemap'">
                    <img class="imgStyle" @click="echartshow('treemap')" src="@/assets/images/chart/treemap.png"
                         alt="矩形树图" title="矩形树图">
                </div>
                <div style="margin-top:10px;" v-show="value =='bl' || echart_type=='blsimple'">
                    <img class="imgStyle" @click="echartshow('bl')" src="@/assets/images/chart/bar-line.png"
                         alt="柱状折线混合图" title="柱状折线混合图">
                    <img class="imgStyle" @click="echartshow('blsimple')" src="@/assets/images/chart/barline-simple.png"
                         alt="柱状折线混合图-简单" title="柱状折线混合图-简单">
                </div>
                <div style="margin-top:10px;" v-show="value =='map' || echart_type=='map'">
                    <img class="imgStyle" @click="echartshow('map')" src="@/assets/images/chart/map.png" alt="地图"
                         title="地图">
                </div>
                <div style="position: relative;"
                     v-show="value !='table' && value !='card' && value !='' && value !=undefined">
                    <el-button @click="refreshEchart" size="mini" icon="el-icon-refresh"
                               style="position: absolute;top:0;right:0;z-index:10;top:10px;right:4px;"></el-button>
                    <el-tabs type="border-card" size="mini" v-if="value !='table' && value !='card'">
                        <el-tab-pane label="常规设置" v-if="value !='table' && value !='card'">
                            <div style="height:200px;overflow:auto;">
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图表背景颜色</span>
                                    <el-color-picker v-model="auto_comp_sum.background"
                                                     style="width:20px;height:20px;"></el-color-picker>
                                    <el-input v-model="auto_comp_sum.background" placeholder="图表背景颜色" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle" v-show="echart_type!='bubble' && echart_type!='polarbar'">
                                    <span class="el-input-group__prepends">是否显示文本</span>
                                    <el-select v-model="echartsLabel.show_label" placeholder="是否显示文本" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in normalOptions.optionShowlabel" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle"
                                     v-show="value!='map' && echart_type!='bubble' && echart_type!='polarbar'">
                                    <span class="el-input-group__prepends">文本显示位置</span>
                                    <el-select v-model="echartsLabel.position" placeholder="文本显示位置" size="small"
                                               class="selectPosition"
                                               v-show="echart_type!='pie' && echart_type!='fasanpie' && echart_type!='huanpie'">
                                        <el-option v-for="item in normalOptions.optionposition" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                    <el-select v-model="echartsLabel.position" placeholder="文本显示位置" size="small"
                                               class="selectPosition"
                                               v-show="echart_type=='pie' || echart_type=='fasanpie' || echart_type=='huanpie'">
                                        <el-option v-for="item in normalOptions.optionposition1" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle"
                                     v-show="value!='scatter' && echart_type!='bubble' && echart_type!='polarbar'">
                                <span class="el-input-group__prepends">文本格式化<el-tooltip class="item" effect="dark"
                                                                                        placement="top"
                                                                                        style="margin-left:-8px; color:black">
                                        <div slot="content"><span>{a}表示系列名 <br/>{b}表示数据名<br/>{c}表示数据值<br/>{d}%表示百分比(饼图)</span></div>
                                        <i class="el-icon-question elIconInfo"></i>
                                    </el-tooltip></span>
                                    <el-input v-model="echartsLabel.formatter" placeholder="文本格式化" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle" v-show="value=='pie' || echart_type=='fasanpie' || echart_type=='huanpie'">
                                    <span class="el-input-group__prepends">是否显示引导线</span>
                                    <el-select v-model="echartsLabel.show_line" placeholder="请选择" size="small" class="selectPosition">
                                        <el-option v-for="item in normalOptions.optionShowlabel" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle" v-show="value=='map'">
                                    <span class="el-input-group__prepends">中国地图或省份</span>
                                    <el-select v-model="seriesStyle.provincename" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in map_array" :key="item" :label="item" :value="item">
                                        </el-option>
                                    </el-select>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="标题设置" v-if="value !='table' && value !='card'">
                            <div style="height:300px;overflow:auto;">
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">名称</span>
                                    <el-input v-model="auto_comp_sum.chart_theme" placeholder="名称" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">背景颜色</span>
                                    <el-color-picker v-model="titleFont.backgroundcolor"
                                                     style="width:20px;height:20px;"></el-color-picker>
                                    <el-input v-model="titleFont.backgroundcolor" placeholder="背景颜色" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">水平位置</span>
                                    <el-select v-model="titleFont.align" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in titleFontalignArr" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">垂直位置</span>
                                    <el-select v-model="titleFont.verticalalign" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in titleFontverticalAlignArr" :key="item.value"
                                                   :label="item.label" :value="item.value">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">字体颜色</span>
                                    <el-color-picker v-model="titleFont.color"
                                                     style="width:20px;height:20px;"></el-color-picker>
                                    <el-input v-model="titleFont.color" placeholder="字体颜色" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">字体大小</span>
                                    <el-input v-model="titleFont.fontsize" placeholder="字体大小" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">字体风格</span>
                                    <el-select v-model="titleFont.fontstyle" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in titleFontfontStyleArr" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">字体系列</span>
                                    <el-select v-model="titleFont.fontfamily" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in titleFontfontFamilyArr" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">字体粗细</span>
                                    <el-select v-model="titleFont.fontweight" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in titleFontfontWeightArr" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">边框颜色</span>
                                    <el-color-picker v-model="titleFont.bordercolor"
                                                     style="width:20px;height:20px;"></el-color-picker>
                                    <el-input v-model="titleFont.bordercolor" placeholder="边框颜色" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">边框粗细</span>
                                    <el-input v-model="titleFont.borderwidth" placeholder="边框粗细" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="轴线设置"
                                     v-if="value !='table' && value !='card' && value!='treemap' && value!='map' && echart_type!='bubble' && echart_type!='polarbar'">
                            <el-tabs type="border-card" size="mini" style="margin-top:0px;">
                                <el-tab-pane label="横轴">
                                    <div style="height:240px;overflow:auto;">
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称</span>
                                            <el-input v-model="xAxis.name" placeholder="轴名称" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴位置</span>
                                            <el-select v-model="xAxis.position" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in xAxispositionArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">是否显示</span>
                                            <el-select v-model="xAxis.show" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴偏移量</span>
                                            <el-input v-model="xAxis.axisoffset" placeholder="轴偏移量" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称位置</span>
                                            <el-select v-model="xAxis.namelocation" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in xAxisnameLocationArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称旋转角度</span>
                                            <el-input v-model="xAxis.namerotate" placeholder="轴名称旋转角度" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称与轴线距离</span>
                                            <el-input v-model="xAxis.namegap" placeholder="轴名称与轴线距离" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴线是否显示</span>
                                            <el-select v-model="xAxisLine.show" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴线是否在0刻度</span>
                                            <el-select v-model="xAxisLine.onzero" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签是否显示</span>
                                            <el-select v-model="xAxisLabel.show" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签是否朝内</span>
                                            <el-select v-model="xAxisLabel.inside" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签旋转角度</span>
                                            <el-input v-model="xAxisLabel.rotate" placeholder="轴标签旋转角度" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签与轴线间距</span>
                                            <el-input v-model="xAxisLabel.margin" placeholder="轴标签与轴线间距" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签内容格式器</span>
                                            <el-input v-model="xAxisLabel.formatter" placeholder="轴标签内容格式器" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="纵轴">
                                    <div style="height:240px;overflow:auto;">
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称</span>
                                            <el-input v-model="yAxis.name" placeholder="轴名称" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴位置</span>
                                            <el-select v-model="yAxis.position" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in yAxispositionArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">是否显示</span>
                                            <el-select v-model="yAxis.show" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴偏移量</span>
                                            <el-input v-model="yAxis.axisoffset" placeholder="轴偏移量" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称位置</span>
                                            <el-select v-model="yAxis.namelocation" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in yAxisnameLocationArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称旋转角度</span>
                                            <el-input v-model="yAxis.namerotate" placeholder="轴名称旋转角度" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴名称与轴线距离</span>
                                            <el-input v-model="yAxis.namegap" placeholder="轴名称与轴线距离" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴线是否显示</span>
                                            <el-select v-model="yAxisLine.show" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴线是否在0刻度</span>
                                            <el-select v-model="yAxisLine.onzero" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签是否显示</span>
                                            <el-select v-model="yAxisLabel.show" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签是否朝内</span>
                                            <el-select v-model="yAxisLabel.inside" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisCheck" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签旋转角度</span>
                                            <el-input v-model="yAxisLabel.rotate" placeholder="轴标签旋转角度" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签与轴线间距</span>
                                            <el-input v-model="yAxisLabel.margin" placeholder="轴标签与轴线间距" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">轴标签内容格式器</span>
                                            <el-input v-model="yAxisLabel.formatter" placeholder="轴标签内容格式器" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="字体样式" v-if="value !='table' && value !='card'">
                                    <div style="height:240px;overflow:auto;">
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">背景色</span>
                                            <el-color-picker v-model="axisStyle.backgroundcolor"
                                                             style="width:20px;height:20px;"></el-color-picker>
                                            <el-input v-model="axisStyle.backgroundcolor" placeholder="背景色" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">水平位置</span>
                                            <el-select v-model="axisStyle.align" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisStylealignArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">垂直位置</span>
                                            <el-select v-model="axisStyle.verticalalign" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in axisStyleverticalAlignArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">字体颜色</span>
                                            <el-color-picker v-model="axisStyle.color"
                                                             style="width:20px;height:20px;"></el-color-picker>
                                            <el-input v-model="axisStyle.color" placeholder="字体颜色" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">字体大小</span>
                                            <el-input v-model="axisStyle.fontsize" placeholder="字体大小" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">字体风格</span>
                                            <el-select v-model="axisStyle.fontstyle" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in titleFontfontStyleArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">字体系列</span>
                                            <el-select v-model="axisStyle.fontfamily" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in titleFontfontFamilyArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">字体粗细</span>
                                            <el-select v-model="axisStyle.fontweight" placeholder="请选择" size="small"
                                                       class="selectPosition">
                                                <el-option v-for="item in  titleFontfontWeightArr" :key="item.value"
                                                           :label="item.value" :value="item.code">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">边框颜色</span>
                                            <el-color-picker v-model="axisStyle.bordercolor"
                                                             style="width:20px;height:20px;"></el-color-picker>
                                            <el-input v-model="axisStyle.bordercolor" placeholder="边框颜色" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                        <div class="divStyle">
                                            <span class="el-input-group__prepends">边框粗细</span>
                                            <el-input v-model="axisStyle.borderwidth" placeholder="边框粗细" size="small"
                                                      class="selectPosition">
                                            </el-input>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </el-tab-pane>
                        <el-tab-pane label="图例设置"
                                     v-if="value !='table' && value !='card' && value!='treemap' && echart_type!='bubble' && echart_type!='polarbar'">
                            <div style="height:300px;overflow:auto;">
                                <div class="divStyle" v-show="echart_type !='map'">
                                    <span class="el-input-group__prepends">图例类型</span>
                                    <el-select v-model="legendStyle.type" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in legendStyletypeArr" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">是否显示</span>
                                    <el-select v-model="legendStyle.show" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in axisCheck" :key="item.value" :label="item.value"
                                                   :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle" v-show="value !='map'">
                                    <span class="el-input-group__prepends">是否显示提示</span>
                                    <el-select v-model="legendStyle.tooltip" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in axisCheck" :key="item.value" :label="item.value"
                                                   :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">左边距</span>
                                    <el-input v-model="legendStyle.left_distance" placeholder="左边距" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">右边距</span>
                                    <el-input v-model="legendStyle.right_distance" placeholder="右边距" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">上边距</span>
                                    <el-input v-model="legendStyle.top_distance" placeholder="上边距" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">下边距</span>
                                    <el-input v-model="legendStyle.bottom_distance" placeholder="下边距" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图例个数</span>
                                    <el-input class="selectPosition" placeholder="图例个数"
                                              v-model="legendStyle.intervalnumber"/>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图例容量</span>
                                    <el-input class="selectPosition" placeholder="图例容量" size="small" v-model="legendStyle.interval"/>
                                </div>
                                <div class="divStyle" v-show="value !='map'">
                                    <span class="el-input-group__prepends">图例宽度</span>
                                    <el-input v-model="legendStyle.width" placeholder="图例宽度" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle" v-show="value !='map'">
                                    <span class="el-input-group__prepends">图例高度</span>
                                    <el-input v-model="legendStyle.height" placeholder="图例高度" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">布局朝向</span>
                                    <el-select v-model="legendStyle.orient" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in legendStyleorientArr" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">文本对齐</span>
                                    <el-select v-model="legendStyle.align" placeholder="请选择" size="small"
                                               class="selectPosition">
                                        <el-option v-for="item in legendStylealignArr" :key="item.value"
                                                   :label="item.value" :value="item.code">
                                        </el-option>
                                    </el-select>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">内边距</span>
                                    <el-input v-model="legendStyle.padding" placeholder="内边距" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图例间隔</span>
                                    <el-input class="selectPosition" placeholder="图例间隔" size="small" v-model="legendStyle.itemgap"/>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图形宽度</span>
                                    <el-input v-model="legendStyle.itemwidth" placeholder="图形宽度" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图形高度</span>
                                    <el-input v-model="legendStyle.itemheight" placeholder="图形高度" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle" v-show="value !='map'">
                                    <span class="el-input-group__prepends">图例关闭颜色</span>
                                    <el-color-picker v-model="legendStyle.inactivecolor"
                                                     style="width:20px;height:20px;"></el-color-picker>
                                    <el-input v-model="legendStyle.inactivecolor" placeholder="图例关闭颜色" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle" v-show="value !='map'">
                                    <span class="el-input-group__prepends">图例背景颜色</span>
                                    <el-color-picker v-model="legendStyle.backgroundcolor"
                                                     style="width:20px;height:20px;"></el-color-picker>
                                    <el-input v-model="legendStyle.backgroundcolor" placeholder="图例背景颜色" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图例边框颜色</span>
                                    <el-color-picker v-model="legendStyle.bordercolor"
                                                     style="width:20px;height:20px;"></el-color-picker>
                                    <el-input v-model="legendStyle.bordercolor" placeholder="图例边框颜色" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                                <div class="divStyle">
                                    <span class="el-input-group__prepends">图例边框粗细</span>
                                    <el-input v-model="legendStyle.borderwidth" placeholder="图例边框粗细" size="small"
                                              class="selectPosition">
                                    </el-input>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>

                </div>
                <!--二维表-->
                <el-tabs type="border-card" width="30%" size="mini" v-show="value=='table'">
                    <el-tab-pane label="常规设置">
                        <div style="height:200px;overflow:auto;margin-top:0px" v-show="value=='table'">
                            <!--<div class="divStyle">-->
                            <!--<span class="el-input-group__prepends">表头背景色</span>-->
                            <!--<el-color-picker v-model="auto_table_info.th_background" style="width:20px;height:20px;"></el-color-picker>-->
                            <!--<el-input class="selectPosition" v-model="auto_table_info.th_background" placeholder="表头背景色" size="small" />-->
                            <!--</div>-->
                            <div class="divStyle">
                                <span class="el-input-group__prepends">单元格边框</span>
                                <el-select v-model="auto_table_info.is_gridline" class="selectPosition"
                                           placeholder="单元格边框" size="small">
                                    <el-option v-for="item in axisCheck" :key="item.value" :label="item.value"
                                               :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="divStyle">
                                <span class="el-input-group__prepends">斑马线条纹</span>
                                <el-select v-model="auto_table_info.is_zebraline" class="selectPosition"
                                           placeholder="斑马线条纹" size="small">
                                    <el-option v-for="item in axisCheck" :key="item.value" :label="item.value"
                                               :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="divStyle" v-if="auto_table_info.is_zebraline == '1'">
                                <span class="el-input-group__prepends">斑马线颜色</span>
                                <el-color-picker v-model="auto_table_info.zl_background"
                                                 style="width:20px;height:20px;"></el-color-picker>
                                <el-input class="selectPosition" v-model="auto_table_info.zl_background"
                                    placeholder="斑马线颜色" size="small"/>
                            </div>
                            <div class="divStyle">
                                <el-button class="el-input-group__prepends2" @click="echartshow('table')">预览</el-button>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
                <!--卡片-->
                <div style="height:360px;overflow:auto;margin-top:26px" v-show="value=='card'">
                    <div class="divStyle">
                        <span class="el-input-group__prepends">标题名称</span>
                        <el-input class="selectPosition" v-model="auto_comp_sum.chart_theme" placeholder="标题名称"
                                  size="small"/>
                    </div>
                    <div class="divStyle">
                        <span class="el-input-group__prepends">标题行高</span>
                        <el-input class="selectPosition" v-model="titleFont.lineheight" placeholder="标题行高"
                                  size="small"/>
                    </div>
                    <div class="divStyle">
                        <span class="el-input-group__prepends">背景色</span>
                        <el-color-picker v-model="titleFont.backgroundcolor"
                                         style="width:20px;height:20px;"></el-color-picker>
                        <el-input class="selectPosition" v-model="titleFont.backgroundcolor" placeholder="背景色"
                                  size="small"/>
                    </div>
                    <div class="divStyle">
                        <span class="el-input-group__prepends">字体颜色</span>
                        <el-color-picker v-model="titleFont.color" style="width:20px;height:20px;"></el-color-picker>
                        <el-input class="selectPosition" v-model="titleFont.color" placeholder="字体颜色" size="small"/>
                    </div>
                    <div class="divStyle">
                        <span class="el-input-group__prepends">字体大小</span>
                        <el-input class="selectPosition" v-model="titleFont.fontsize" placeholder="字体大小" size="small"/>
                    </div>
                    <div class="divStyle">
                        <span class="el-input-group__prepends">字体风格</span>
                        <el-select v-model="titleFont.fontstyle" class="selectPosition" placeholder="字体风格" size="small">
                            <el-option value="normal">标准风格</el-option>
                            <el-option value="italic">斜体风格</el-option>
                            <el-option value="oblique">倾斜风格</el-option>
                        </el-select>
                    </div>
                    <div class="divStyle">
                        <span class="el-input-group__prepends">字体系列</span>
                        <el-select v-model="titleFont.fontfamily" class="selectPosition" placeholder="字体系列"
                                   size="small">
                            <el-option value="sans-serif">无衬线字体</el-option>
                            <el-option value="serif">衬线字体</el-option>
                            <el-option value="monospace">等宽字体</el-option>
                            <el-option value="Arial">宋体</el-option>
                        </el-select>
                    </div>
                    <div class="divStyle">
                        <span class="el-input-group__prepends">字体粗细</span>
                        <el-select v-model="titleFont.fontweight" class="selectPosition" placeholder="字体粗细"
                                   size="small">
                            <el-option value="lighter">细的</el-option>
                            <el-option value="normal">标准的</el-option>
                            <el-option value="bold">粗的</el-option>
                            <el-option value="bolder">加粗的</el-option>
                        </el-select>
                    </div>
                    <el-button class="previewData" @click="echartshow('card')">预览</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- 系统级数据信息 -->
        <el-dialog title="选择表单(单击选择表名)" :visible.sync="dialogData" width="660px">
            <!--树菜单-->
            <div class='mytree '>
                <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini"/>
                <el-tree class="filter-tree elDialogInfo" :data="webSqlTreeData" :indent='0'
                         :filter-node-method="filterNode" ref="tree" @node-click="nodeClickChartTree">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span :title="data.description" v-if="'undefined' != typeof data.file_id && data.file_id != ''">
                        <i class=" el-icon-document"></i>
                        <template v-if="'undefined' != typeof data.original_name && data.original_name != ''">{{data.original_name}}</template>
                        <template
                                v-else-if="data.original_name === '' && data.table_name!=''">{{data.table_name}}</template>
                        <template v-else>{{data.hyren_name}}</template>
                    </span>
                    <span :title="data.description" v-else>
                        <i class="el-icon-folder-opened"></i>{{node.label}}
                    </span>
                </span>
                </el-tree>
                <div slot="footer" class="dialog-footer" style="height:30px">
                    <el-button @click="cancelSelectTreeName" size="mini" type="danger" style="float:right">取 消
                    </el-button>
                </div>
            </div>
        </el-dialog>
        <!-- 自主数据数据集 -->
        <el-dialog title="选择表单(单击选择表名)" :visible.sync="dialogSelfData" width="660px">
            <el-table :data="tableDataColumAuto" border stripe size="medium" @cell-click="cellClick">
                <el-table-column type="index" label="序号" width="70px" align='center'>
                </el-table-column>
                <el-table-column prop="fetch_name" label="表名" align="center"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSelect" size="mini" type="danger">取 消</el-button>
            </div>
        </el-dialog>
        <!-- 添加字段 -->
        <el-dialog title="添加字段(单击选择字段)" :visible.sync="selectWords" width="580px">
            <div class='mytree '>
                <el-tree class="filter-tree elDialogInfo" :data="data2" :indent='0' :props="defaultProps" ref="trees"
                         @node-click="nodeClickChartTreeWords">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span v-if="data.children.length =='0'">
                        <i class="el-icon-document"></i>{{node.label}}
                    </span>
                    <span v-else>
                        <i class="el-icon-folder-opened"></i>{{node.label}}
                    </span>
                </span>
                </el-tree>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancelSelectWords" size="mini" type="danger">关 闭</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import * as functionAll from "./selfAcess";
    import draggable from 'vuedraggable';
    import * as validator from "@/utils/js/validator";
    import * as generatepic from "../generatePic/generatePic";
    import * as drawLine from "../generatePic/line";
    import * as drawBarChart from "../generatePic/barChart";
    import * as drawStackingBarChart from "../generatePic/stackingBarChart";
    import * as drawPolarBarChart from "../generatePic/polarBarChart";
    import * as drawPieChart from "../generatePic/pieChart";
    import * as drawScatterChart from "../generatePic/scatterChart";
    import * as drawBlChart from "../generatePic/blChart";
    import * as drawBlSimpleChart from "../generatePic/blSimpleChart";
    import * as drawTreeMapChart from "../generatePic/treeMapChart";
    import * as drawMapChart from "../generatePic/mapChart";
    // import echarts from 'echarts';
    require('echarts/map/js/china.js')
    export default {
        components: {
            draggable
        },
        data() {
            return {
                currPage: 1,
                pageSize: 5,
                echartTableData: [],
                component_id: this.$route.query.component_id,
                rule: validator.default,
                show_stripe: true, // 是否显示斑马纹
                show_border: true, // 是否展示单元格边框
                formvalue: '',
                echart_type: '',
                value: '',
                myChart: '',
                input: '',
                options: [{
                    value: '自主数据数据集',
                    code: '01',
                },
                    {
                        value: '系统级数据集',
                        code: '02'
                    }
                ],
                numbersArray: ['int', 'int8', 'int16', 'integer', 'tinyint', 'smallint', 'mediumint', 'bigint', 'float', 'double', 'decimal'],
                keyWords: '',
                columnsWordsALL: [],
                groupCondtionArr: [],
                optionsWords: [],
                fiflterConditionArr: [],
                dialogData: false,
                dialogSelfData: false,
                filterText: "",
                webSqlTreeData: [],
                defaultProps: {
                    children: "children",
                    label: "label"
                },
                tableDataColumAuto: [],
                fiflterSqlOptionsButton: true,
                codeArry: [],
                markCodeIndex: '',
                selectWords: false,
                data2: [{
                    label: "计算字段汇总值(sum)",
                    children: [{}]
                }, {
                    label: '计算字段平均值(avg)',
                    children: [{}]
                }, {
                    label: '计算字段最大值(max)',
                    children: [{}]
                }, {
                    label: '计算字段最小值(min)',
                    children: [{}]
                }, {
                    label: '统计总记录数(count)',
                    children: [{}]
                }, {
                    label: '选择所有结果字段(*)',
                    children: []
                }, {
                    label: '逐个选择表字段',
                    children: []
                }],
                disabled: false,
                groupHidden: false,
                addfiflterCondition: false,
                addfiflterConditionDetails: false,
                optionsCode: [],
                optionsCodevalue: '',
                oneInput: false,
                twoInput: false,
                inputvalueOptions3: "",
                inputvalueOptions2: '',
                inputvalueOptions1: '',
                markCodeOptionsValue: '',
                canChangeFiflter: true,
                showNum: null,
                optionsWordsbuttons: true,
                dynamicColumnTables: [],
                isDataShow: false,
                dynamicColumns: [],
                answerCurrPage: 1,
                answerPageSize: 5,
                loadingsearch: false,
                backgroundcolor: '#000000',
                // color: '#000000',
                borderwidth: '1',
                bordercolor: '#ffffff',
                // 常规设置
                echartsLabel: {
                    show_label: '1', //是否显示文本标签
                    position: "outside", //标签位置
                    formatter: "{b}", //格式化文本标签
                    show_line: '1', //是否显示文本标签引导线
                    smooth: '0', //是否平滑视觉引导线
                },
                normalOptions: {
                    optionShowlabel: [{
                        code: '0',
                        value: '否'
                    }, {
                        code: '1',
                        value: '是'
                    }],
                    optionposition1: [{
                        code: 'outside',
                        value: '扇形外侧'
                    }, {
                        code: 'inside',
                        value: '扇形内侧'
                    }],
                    optionposition: [{
                        code: 'left',
                        value: 'left'
                    }, {
                        code: 'right',
                        value: 'right'
                    }, {
                        code: 'top',
                        value: 'top'
                    }, {
                        code: 'bottom',
                        value: 'bottom'
                    }, {
                        code: 'inside',
                        value: 'inside'
                    }, {
                        code: 'insideTop',
                        value: 'insideTop'
                    }, {
                        code: 'insideLeft',
                        value: 'insideLeft'
                    }, {
                        code: 'insideRight',
                        value: 'insideRight'
                    }, {
                        code: 'insideBottom',
                        value: 'insideBottom'
                    }, {
                        code: 'insideTopLeft',
                        value: 'insideTopLeft'
                    }, {
                        code: 'insideTopRight',
                        value: 'insideTopRight'
                    }, {
                        code: 'insideBottomLeft',
                        value: 'insideBottomLeft'
                    }, {
                        code: 'insideBottomRight',
                        value: 'insideBottomRight'
                    }]
                },
                titleFontalignArr: [{
                    code: 'left',
                    value: 'left'
                }, {
                    code: 'center',
                    value: 'center'
                }, {
                    code: 'right',
                    value: 'right'
                }],

                titleFontverticalAlignArr: [{
                    code: 'top',
                    value: 'top'
                }, {
                    code: 'middle',
                    value: 'middle'
                }, {
                    code: 'bottom',
                    value: 'bottom'
                }],
                titleFontfontFamilyArr: [{
                    code: 'sans-serif',
                    value: '无衬线字体'
                }, {
                    code: 'serif',
                    value: '衬线字体'
                }, {
                    code: 'monospace',
                    value: '等宽字体'
                }, {
                    code: 'Arial',
                    value: '宋体'
                }],
                titleFontfontStyleArr: [{
                    code: 'normal',
                    value: '标准风格'
                }, {
                    code: 'italic',
                    value: '斜体风格'
                }, {
                    code: 'oblique',
                    value: '倾斜风格'
                }],
                titleFontfontWeightArr: [{
                    code: 'lighter',
                    value: '细的'
                }, {
                    code: 'normal',
                    value: '标准的'
                }, {
                    code: 'bold',
                    value: '粗的'
                }, {
                    code: 'bolder',
                    value: '加粗的'
                }],
                //标题设置字段总和
                titleFont: {
                    align: "center", //标题水平位置
                    backgroundcolor: "#ffffff", //标题背景色
                    bordercolor: "#ffffff", //标题边框颜色
                    borderwidth: 0, //标题边框粗细
                    borderradius: 0, //坐标轴边框圆角
                    color: "#000000", //字体颜色
                    fontfamily: "Arial", //字体系列
                    verticalalign: "top", //标题垂直位置
                    fontsize: 24, //字体大小
                    fontstyle: "normal", //字体风格
                    fontweight: "normal", //字体粗细
                    lineheight: "40", //字体行高
                },
                //轴线设置--x轴字段
                xAxispositionArr: [{
                    code: 'top',
                    value: 'top'
                }, {
                    code: 'bottom',
                    value: 'bottom'
                }],
                xAxisnameLocationArr: [{
                    code: 'start',
                    value: 'start'
                }, {
                    code: 'middle',
                    value: 'middle'
                }, {
                    code: 'end',
                    value: 'end'
                }],
                xAxis: {
                    axis_type: "1", //轴类型
                    data: [], //x轴数据
                    show: '1', //是否显示
                    position: "bottom", //轴位置
                    axisoffset: 0, //轴偏移量
                    name: "x轴", //轴名称
                    namelocation: "end", //轴名称位置
                    min: "",
                    max: "",
                    silent: "1",
                    nameTextStyle: {}, //--轴名称样式
                    namegap: 15, //名称与轴线距离
                    namerotate: 0, //名称旋转角度
                    axisLine: {}, //--轴线
                    axisLabel: {} //--刻度标签
                },
                axisCheck: [],
                xAxisLine: {
                    show: '1', //轴线是否显示
                    onzero: '1', //是否在0刻度上
                    // symbol: "none", //箭头显示方式
                    // symboloffset: 0, //箭头偏移量
                },
                xAxisLabel: {
                    show: '1', //刻度标签是否显示
                    inside: '0', //刻度标签是否朝内
                    rotate: 0, //刻度标签旋转角度
                    margin: 10, //刻度标签与轴线间距
                    formatter: null, //刻度标签内容格式器
                },
                //轴线设置--y轴
                yAxispositionArr: [{
                    code: 'left',
                    value: 'left'
                }, {
                    code: 'right',
                    value: 'right'
                }],
                yAxisnameLocationArr: [{
                    code: 'start',
                    value: 'start'
                }, {
                    code: 'middle',
                    value: 'middle'
                }, {
                    code: 'end',
                    value: 'end'
                }],
                yAxis: {
                    axis_type: "2", //轴类型
                    show: '1', //是否显示
                    position: "left", //轴位置
                    axisoffset: 0, //轴偏移量
                    name: "y轴", //轴名称
                    namelocation: "end", //轴名称位置
                    silent: "1",
                    nameTextStyle: {}, //--轴名称样式
                    namegap: 15, //名称与轴线距离
                    namerotate: 0, //名称旋转角度
                    axisLine: {}, //--轴线
                    axisLabel: {} //--刻度标签
                },
                yAxisLine: {
                    show: '1', //轴线是否显示
                    onzero: '1', //是否在0刻度上
                    symbol: "none", //箭头显示方式
                    symbolOffset: 0, //箭头偏移量
                },
                yAxisLabel: {
                    show: '1', //刻度标签是否显示
                    inside: '0', //刻度标签是否朝内
                    rotate: 0, //刻度标签旋转角度
                    margin: 20, //刻度标签与轴线间距
                    formatter: null, //刻度标签内容格式器
                },
                axisStylealignArr: [{
                    code: 'left',
                    value: 'left'
                }, {
                    code: 'center',
                    value: 'center'
                }, {
                    code: 'right',
                    value: 'right'
                }],
                axisStyleverticalAlignArr: [{
                    code: 'top',
                    value: 'top'
                }, {
                    code: 'middle',
                    value: 'middle'
                }, {
                    code: 'bottom',
                    value: 'bottom'
                }],
                //轴线字体
                axisStyle: {
                    align: "center", //坐标轴水平位置
                    verticalalign: "middle", //坐标轴垂直位置
                    backgroundcolor: "#ffffff", //坐标轴背景色
                    bordercolor: "#ffffff", //坐标轴边框颜色
                    borderwidth: 0, //坐标轴边框粗细
                    borderradius: 0, //坐标轴边框圆角
                    color: "#000000", //字体颜色
                    fontfamily: "Arial", //字体系列
                    fontsize: 12, //字体大小
                    fontstyle: "normal", //字体风格
                    fontweight: "normal", //字体粗细
                    lineheight: "", //字体行高
                },
                legendStyletypeArr: [{
                    code: 'plain',
                    value: '普通图例'
                }, {
                    code: 'scroll',
                    value: '可滚动翻页的图例'
                }],
                legendStyleorientArr: [{
                    code: 'horizontal',
                    value: '横向布局'
                }, {
                    code: 'vertical',
                    value: '纵向布局'
                }],
                legendStylealignArr: [{
                    code: 'auto',
                    value: '居中对齐'
                }, {
                    code: 'left',
                    value: '左对齐'
                }, {
                    code: 'right',
                    value: '右对齐'
                }],
                //图例设置字段信息总和
                legendStyle: {
                    type: "plain", //图例类型
                    show: '1', //是否显示
                    tooltip: '1', //是否显示提示
                    left_distance: "10", //左边距
                    top_distance: "0", //上边距
                    right_distance: "0", //右边距
                    bottom_distance: "0", //下边距
                    width: "0", //宽度
                    height: "0", //高度
                    orient: "horizontal", //布局朝向
                    align: "auto", //图例与文本对齐,
                    padding: 5, //图例内边距
                    itemgap: 10, //图例间隔
                    itemwidth: 25, //图例宽度
                    itemheight: 14, //图例高度
                    inactivecolor: "#000000", //图例关闭时颜色
                    backgroundcolor: "#ffffff", //图例背景颜色
                    bordercolor: "#ffffff", //边框颜色
                    borderwidth: 0, //边框大小
                    interval: 100, //图例容量(地图)
                    intervalnumber: 4, //图例个数(地图)
                },
                //组件汇总表
                auto_comp_sum: {
                    chart_theme: "",
                    condition_sql: '',
                    chart_type: '',
                    background: '#ffffff',
                    component_id: '',
                    component_nam: '',
                    component_desc: '',
                    show_line: '1',
                },
                optionsCharts: [{
                    value: 'line',
                    label: '折线图',
                }, {
                    value: 'bar',
                    label: '柱状图',
                }, {
                    value: 'pie',
                    label: '饼图',
                }, {
                    value: 'scatter',
                    label: '散点图',
                }, {
                    value: 'table',
                    label: '二维表',
                }, {
                    value: 'treemap',
                    label: '矩形树图',
                }, {
                    value: 'bl',
                    label: '混合图',
                }, {
                    value: 'map',
                    label: '地理坐标/地图',
                }],
                input1: '',
                input2: '',
                tips: '',
                xValueArry: [],
                yValueArry: [],
                value: '',
                weiduArry: [],
                allcolumns: [],
                allnumcolumns: [],
                originalweiduArry: [],
                duliangArry: [],
                originalduliangArry: [],
                markarrx: [],
                markarry: [],
                //图表配置
                seriesStyle: {
                    type: "", //图表类型
                    center: ['50%', '50%'], //饼图的中心（圆心）坐标
                    provincename: "全国", //省份名称(地图)
                },
                //地图
                map_array: ['全国', '上海', '河北', '山西', '内蒙古', '辽宁',
                    '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西',
                    '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川',
                    '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆',
                    '北京', '天津', '重庆', '香港', '澳门', '台湾'
                ],
                auto_table_info: {
                    th_background: "#3d8dd2",
                    is_gridline: "1",
                    is_zebraline: "0",
                    zl_background: "#F5C8C8"
                },
                color: ['#e5323e', '#003366', '#fc8c54', '#30ff3a'],
            }
        },
        created() {
            this.getWebSQLTreeData(); //获取树结构
            this.getMyAccessInfo();
            this.getCategoryItems();
            this.getCategoryItemsFilfter();
            if (this.component_id != undefined) {
                this.getVisualComponentInfoById();
            }
        },
        watch: {
            //设置检索内容
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            inputvalueOptions3(val) {
                if (val != "") {
                    this.fiflterSqlOptionsButton = false;
                } else {
                    this.fiflterSqlOptionsButton = true;
                }
            },
            inputvalueOptions2(val) {
                if (val != "") {
                    this.fiflterSqlOptionsButton = false;
                } else {
                    this.fiflterSqlOptionsButton = true;
                }
            },
            inputvalueOptions1(val) {
                if (val != "") {
                    this.fiflterSqlOptionsButton = false;
                } else {
                    this.fiflterSqlOptionsButton = true;
                }
            },
            fiflterConditionArr(val) {
                if (val.length > 0) {
                    this.canChangeFiflter = false;
                } else {
                    this.canChangeFiflter = true;
                }
            },
            optionsWords(val) {
                if (val.length > 0) {
                    this.optionsWordsbuttons = false;
                } else {
                    this.optionsWordsbuttons = true;
                }
            },
        },
        methods: {
            getVisualComponentInfoById() {
                functionAll.getVisualComponentInfoById({
                    component_id: this.component_id
                }).then(res => {
                    if (res && res.success) {
                        this.auto_comp_sum = res.data.compSum;
                        this.echart_type = res.data.compSum.chart_type;
                        if (this.echart_type == 'polarbar' || this.echart_type == 'stackingbar') {
                            this.value = 'bar';
                        } else if (this.echart_type == 'bubble') {
                            this.value = 'scatter';
                        } else if (this.echart_type == 'fasanpie' || this.echart_type == 'huanpie') {
                            this.value = 'pie';
                        } else if (this.echart_type == 'blsimple') {
                            this.value = 'bl';
                        } else {
                            this.value = res.data.compSum.chart_type;
                        }
                        this.input = res.data.compSum.sources_obj;
                        this.formvalue = res.data.compSum.data_source;
                        this.markCodeIndex = res.data.compSum.data_source;
                        res.data.columnAndNumberColumnInfo.columns.forEach(itemAll => {
                            if (this.formvalue == '01') {
                                itemAll.nameAll = itemAll.fetch_res_name;
                            } else {
                                itemAll.nameAll = itemAll.column_name;
                            }
                        })
                        this.weiduArry = res.data.columnAndNumberColumnInfo.columns;
                        this.originalweiduArry = res.data.columnAndNumberColumnInfo.columns;
                        res.data.columnAndNumberColumnInfo.numColumns.forEach(itemAll => {
                            if (this.formvalue == '01') {
                                itemAll.nameAll = itemAll.fetch_res_name;
                            } else {
                                itemAll.nameAll = itemAll.column_name;
                            }
                        })
                        this.duliangArry = res.data.columnAndNumberColumnInfo.numColumns;
                        this.originalduliangArry = res.data.columnAndNumberColumnInfo.numColumns;
                        res.data.compDataSum.forEach(itemAll => {
                            this.huixiandealwithoptionsWords(itemAll.column_name, itemAll.summary_type)
                        })
                        res.data.compCond.forEach(itemAll => {
                            itemAll.nameAll = itemAll.cond_en_column + itemAll.arithmetic_logic + itemAll.cond_value;
                        })
                        this.fiflterConditionArr = res.data.compCond;
                        res.data.compGroup.forEach(itemAll => {
                            itemAll.nameAll = itemAll.column_name;
                        })
                        this.groupCondtionArr = res.data.compGroup;
                        if (this.echart_type == 'card') {
                            this.showNum = 1;
                        }
                        this.getAnswer(true);
                        res.data.xAxisCol.forEach(itemAll => {
                            itemAll.nameAll = itemAll.column_name;
                        })
                        this.xValueArry = res.data.xAxisCol;
                        res.data.yAxisCol.forEach(itemAll => {
                            itemAll.nameAll = itemAll.column_name;
                        })
                        this.getColumnByName(this.auto_comp_sum.sources_obj, this.auto_comp_sum.data_source)
                        if (res.data.xAxisCol != '' && res.data.xAxisCol != undefined && res.data.xAxisCol.length != 0) {
                            this.xValueArry = res.data.xAxisCol;
                        }
                        if (res.data.yAxisCol != '' && res.data.yAxisCol != undefined && res.data.yAxisCol.length != 0) {
                            this.yValueArry = res.data.yAxisCol;
                        }
                        if (res.data.titleFontInfo != '' && res.data.titleFontInfo != undefined && JSON.stringify(res.data.titleFontInfo) != '{}') {
                            this.titleFont = res.data.titleFontInfo;
                        }
                        if (res.data.axisFontInfo != '' && res.data.axisFontInfo != undefined && JSON.stringify(res.data.axisFontInfo) != '{}') {
                            this.axisStyle = res.data.axisFontInfo;
                        }
                        if (res.data.xAxisInfo != '' && res.data.xAxisInfo != undefined && JSON.stringify(res.data.xAxisInfo) != '{}') {
                            this.xAxis = res.data.xAxisInfo[0];
                        }
                        if (res.data.yAxisInfo != '' && res.data.yAxisInfo != undefined && JSON.stringify(res.data.yAxisInfo) != '{}') {
                            this.yAxis = res.data.yAxisInfo[0];
                        }
                        if (res.data.xAxisLine != '' && res.data.xAxisLine != undefined && JSON.stringify(res.data.xAxisLine) != '{}') {
                            this.xAxisLine = res.data.xAxisLine;
                        }
                        if (res.data.yAxisLine != '' && res.data.yAxisLine != undefined && JSON.stringify(res.data.yAxisLine) != '{}') {
                            this.yAxisLine = res.data.yAxisLine;
                        }
                        if (res.data.xAxisLabel != '' && res.data.xAxisLabel != undefined && JSON.stringify(res.data.xAxisLabel) != '{}') {
                            this.xAxisLabel = res.data.xAxisLabel;
                        }
                        if (res.data.yAxisLabel != '' && res.data.yAxisLabel != undefined && JSON.stringify(res.data.yAxisLabel) != '{}') {
                            this.yAxisLabel = res.data.yAxisLabel;
                        }
                        if (res.data.legendInfo != '' && res.data.legendInfo != undefined && JSON.stringify(res.data.legendInfo) != '{}') {
                            this.legendStyle = res.data.legendInfo;
                        }
                        if (res.data.textLabel != '' && res.data.textLabel != undefined && JSON.stringify(res.data.textLabel) != '{}') {
                            this.echartsLabel = res.data.textLabel;
                        }
                        if (res.data.twoDimensionalTable != '' && res.data.twoDimensionalTable != undefined && JSON.stringify(res.data.twoDimensionalTable) != '{}') {
                            this.auto_table_info = res.data.twoDimensionalTable;
                        }
                    }
                });
            },
            huixiandealwithoptionsWords(column_name, code) {
                switch (code) {
                    case '01':
                        var obj = {
                            name: '求和->' + column_name,
                            realName: column_name,
                            code: '01'
                        }
                        this.optionsWords.push(obj)
                        break;
                    case '02':
                        var obj = {
                            name: '求平均->' + column_name,
                            realName: column_name,
                            code: '02'
                        }
                        this.optionsWords.push(obj)
                        break;
                    case '03':
                        var obj = {
                            name: '求最大值->' + column_name,
                            realName: column_name,
                            code: '03'
                        }
                        this.optionsWords.push(obj)
                        break;
                    case '04':
                        var obj = {
                            name: '求最小值->' + column_name,
                            realName: column_name,
                            code: '04'
                        }
                        this.optionsWords.push(obj)
                        break;
                    case '07':
                        var obj = {
                            name: '所有字段',
                            code: '07',
                            realName: '*'
                        }
                        this.optionsWords.push(obj)
                        break;
                    case '06':
                        var obj = {
                            name: column_name,
                            realName: column_name,
                            code: '06'
                        }
                        this.optionsWords.push(obj)
                        break;
                    case '05':
                        var obj = {
                            name: '总行数',
                            code: '05',
                            realName: 'count(*)'
                        }
                        this.optionsWords.push(obj)
                        break;
                }
            },
            //选择数据来源
            changeSelectDataCollect(val) {
                if (val === "01") {
                    this.markCodeIndex = val;
                    this.dialogSelfData = true;
                } else if (val === "02") {
                    this.markCodeIndex = val;
                    this.dialogData = true;
                } else {
                    this.input = '';
                }
            },
            showDataCollect() {
                if (this.formvalue === "01") {
                    this.dialogSelfData = true;
                } else if (this.formvalue === "02") {
                    this.dialogData = true;
                } else {
                    this.$Msg.customizTitle('请先选择数据源', 'warning');
                }
            },
            // 节点搜索
            filterNode(value, data) {
                // 如果检索内容为空,直接返回
                if (!value) return true;
                // 如果传入的value和data中的name相同说明是匹配到了,匹配时转小写匹配
                // 检索内容为 original_name table_name hyren_name
                if ('undefined' != typeof data.file_id && data.file_id != '') {
                    return (
                        ('undefined' != typeof data.original_name && data.original_name != '' && data.original_name.indexOf(value) != -1) ||
                        ('undefined' != typeof data.table_name && data.table_name != '' && data.table_name.toLowerCase().indexOf(value.toLowerCase()) != -1) ||
                        ('undefined' != typeof data.hyren_name && data.hyren_name != '' && data.hyren_name.toLowerCase().indexOf(value.toLowerCase()) != -1)
                    )

                }
            },
            // 点击树获得对应表信息
            nodeClickChartTree(data, node) {
                if (data.file_id) {
                    this.disabled = false;
                    this.input = data.hyren_name;
                    this.dialogData = false;
                    this.getColumnByName(data.hyren_name, this.markCodeIndex);
                    this.optionsWords = [];
                }
            },
            nodeClickChartTreeWords(data, node) {
                if (data.id != undefined) {
                    switch (node.parent.label) {
                        case '计算字段汇总值(sum)':
                            var obj = {
                                name: '求和->' + data.label,
                                realName: data.label,
                                code: '01'
                            }
                            this.optionsWords.push(obj)
                            break;
                        case '计算字段平均值(avg)':
                            var obj = {
                                name: '求平均->' + data.label,
                                realName: data.label,
                                code: '02'
                            }
                            this.optionsWords.push(obj)
                            break;
                        case '计算字段最大值(max)':
                            var obj = {
                                name: '求最大值->' + data.label,
                                realName: data.label,
                                code: '03'
                            }
                            this.optionsWords.push(obj)
                            break;
                        case '计算字段最小值(min)':
                            var obj = {
                                name: '求最小值->' + data.label,
                                realName: data.label,
                                code: '04'
                            }
                            this.optionsWords.push(obj)
                            break;
                    }

                } else if (data.label == "选择所有结果字段(*)") {
                    var obj = {
                        name: '所有字段',
                        code: '07',
                        realName: '*'
                    }
                    this.optionsWords.push(obj)
                } else if (data.label == "统计总记录数(count)") {
                    var obj = {
                        name: '总行数',
                        code: '05',
                        realName: 'count(*)'
                    }
                    this.optionsWords.push(obj)
                } else if (data.label == "逐个选择表字段") {

                } else if (data.mark === "1") {
                    var obj = {
                        name: data.label,
                        realName: data.label,
                        code: data.code
                    }
                    this.optionsWords.push(obj)
                }
            },
            //取消树点击选择表名
            cancelSelectTreeName() {
                this.dialogData = false;
            },
            // 获取树信息
            getWebSQLTreeData() {
                functionAll.getAutoAnalysisTreeData().then(res => {
                    this.webSqlTreeData = res.data;
                });
            },
            // 点击删除设置显示字段信息
            clickClose(item, index) {
                this.optionsWords.splice(index, 1);
                if (this.optionsWords.length==0) {
                    this.isDataShow=false;
                }else{
                    this.dynamicColumns=[];
                    for (let i = 0; i < this.optionsWords.length; i++) {
                        this.dynamicColumns.push(this.putcodenametogether(this.optionsWords[i].code,this.optionsWords[i].realName))
                    }
                    this.disabled = false;
                }
            },
            // 取消选择
            cancelSelect() {
                this.dialogSelfData = false;
            },
            //点击自主取数数据集表格信息
            cellClick(row) {
                this.disabled = false;
                this.input = row.fetch_name;
                this.dialogSelfData = false;
                this.getColumnByName(row.fetch_name, this.markCodeIndex);
                this.optionsWords = [];
            },
            // 查询我的取数信息
            getMyAccessInfo() {
                functionAll.getMyAccessInfo().then(res => {
                    this.tableDataColumAuto = res.data;
                })
            },
            // 获取代码项
            getCategoryItems() {
                functionAll.getCategoryItems({
                    category: 'AutoSourceObject'
                }).then(res => {
                    this.codeArry = res.data;
                })
                functionAll.getCategoryItems({
                    category: 'IsFlag'
                }).then(res => {
                    this.axisCheck = res.data;
                })
            },
            // 根据表名获取字段信息
            getColumnByName(val1, val2) {
                functionAll.getColumnByName({
                    table_name: val1,
                    data_source: val2
                }).then(res => {
                    // 数据处理
                    res.data.columns.forEach(itemAll => {
                        if (this.markCodeIndex === "01") {
                            itemAll.nameAll = itemAll.fetch_res_name;
                        } else if (this.markCodeIndex === "02") {
                            itemAll.nameAll = itemAll.column_name;
                        }
                    })
                    this.weiduArry = res.data.columns;
                    this.allcolumns = res.data.columns
                    //保存全部的weiduArry,用以模糊查询时恢复
                    this.originalweiduArry = this.weiduArry;
                    if (res.data.numColumns) {
                        if (res.data.numColumns.length > 0) {
                            res.data.numColumns.forEach(itemAll => {
                                if (this.markCodeIndex === "01") {
                                    itemAll.nameAll = itemAll.fetch_res_name;
                                } else if (this.markCodeIndex === "02") {
                                    itemAll.nameAll = itemAll.column_name;
                                }
                            })
                            this.duliangArry = res.data.numColumns;
                            this.allnumcolumns = [];
                            res.data.numColumns.forEach(itemAll => {
                                this.allnumcolumns.push(itemAll.nameAll);
                            })
                            // this.allnumcolumns = res.data.numColumns;
                            //保存全部的duliangArry,用以模糊查询时恢复
                            this.originalduliangArry = this.duliangArry;
                        }
                    }
                    this.columnsWordsALL = res.data.columns;
                    let that = this;
                    // 变成树结构选择字段
                    this.data2.forEach(item => {
                        item.children = [];
                        if (res.data.numColumns.length > 0) {
                            res.data.numColumns.forEach((val, i) => {
                                if (that.markCodeIndex === "01") {
                                    let obj = {
                                        label: val.fetch_res_name,
                                        children: [],
                                        id: i
                                    }
                                    if (item.label == "选择所有结果字段(*)") {
                                        item.children = []
                                    } else if (item.label == "逐个选择表字段") {
                                        let arr = [];
                                        res.data.columns.forEach(value => {
                                            let object = {
                                                label: value.fetch_res_name,
                                                children: [],
                                                mark: '1',
                                                code: '06'
                                            }
                                            arr.push(object)
                                        })
                                        item.children = arr;
                                    } else if (item.label == "统计总记录数(count)") {
                                        item.children = []
                                    } else {
                                        item.children.push(obj)
                                    }
                                } else if (that.markCodeIndex === "02") {
                                    let obj = {
                                        label: val.column_name,
                                        children: [],
                                        id: i
                                    }
                                    if (item.label == "选择所有结果字段(*)") {
                                        item.children = []
                                    } else if (item.label == "逐个选择表字段") {
                                        let arr = [];
                                        res.data.columns.forEach(value => {
                                            let object = {
                                                label: value.column_name,
                                                children: [],
                                                mark: '1',
                                                code: '06'
                                            }
                                            arr.push(object)
                                        })
                                        item.children = arr;
                                    } else if (item.label == '统计总记录数(count)') {
                                        item.children = []
                                    } else {
                                        item.children.push(obj)
                                    }
                                }
                            })
                        } else {
                            let obj = {
                                children: [],
                                label: '该表没有数字类型列'
                            }
                            if (item.label == "选择所有结果字段(*)") {
                                item.children = []
                            } else if (item.label == "统计总记录数(count)") {
                                item.children = []
                            } else if (item.label == "逐个选择表字段") {
                                let arr = [];
                                res.data.columns.forEach(value => {
                                    if (that.markCodeIndex == "01") {
                                        let object = {
                                            label: value.fetch_res_name,
                                            children: [],
                                            mark: '1',
                                            code: '06'
                                        }
                                        arr.push(object)
                                    } else if (that.markCodeIndex == "02") {
                                        let object = {
                                            label: value.column_name,
                                            children: [],
                                            mark: '1'
                                        }
                                        arr.push(object)
                                    }
                                })
                                item.children = arr;
                            } else {
                                item.children.push(obj)
                            }
                        }
                    })
                })
            },
            fuzzyquery1() {
                this.weiduArry = this.originalweiduArry;
                if (this.input1 != "") {
                    let array = [];
                    this.weiduArry.forEach(value => {
                        if (value.nameAll.indexOf(this.input1) != -1) {
                            array.push(value);
                        }
                    })
                    this.weiduArry = array;
                }
            },
            fuzzyquery2() {
                this.duliangArry = this.originalduliangArry;
                if (this.input2 != "") {
                    let array = [];
                    this.duliangArry.forEach(value => {
                        if (value.nameAll.indexOf(this.input2) != -1) {
                            array.push(value);
                        }
                    })
                    this.duliangArry = array;
                }
            },
            // 添加字段信息
            addWords() {
                if (this.input == '') {
                    this.$Msg.customizTitle("请先选择数据源与表名", "warning");
                }else{
                    this.selectWords = true;
                }
            },
            // 取消字段添加
            cancelSelectWords() {
                this.selectWords = false;
            },
            // 数据上移
            moveUp(val, data, tableData) {
                if (val > 0) {
                    let upDate = tableData[val - 1];
                    tableData.splice(val - 1, 1);
                    tableData.splice(val, 0, upDate);
                    this.showNumArry = tableData;
                    this.dynamicColumns=[];
                    for (let i = 0; i < tableData.length; i++) {
                        this.dynamicColumns.push(this.putcodenametogether(tableData[i].code,tableData[i].realName))
                    }
                } else {
                    this.$Msg.customizTitle("已经是第一条,不可上移", "warning");
                }
            },
            // 数据下移
            moveDown(val, data, tableData) {
                if (val + 1 === tableData.length) {
                    this.$Msg.customizTitle("已经是最后一条,不可下移", "warning");
                } else {
                    let downDate = tableData[val + 1];
                    tableData.splice(val + 1, 1);
                    tableData.splice(val, 0, downDate);
                    this.showNumArry = tableData;
                    this.dynamicColumns=[];
                    for (let i = 0; i < tableData.length; i++) {
                        this.dynamicColumns.push(this.putcodenametogether(tableData[i].code,tableData[i].realName))
                    }
                }
            },
            // 添加分组条件按钮
            addGroup() {
                if (this.input=='') {
                    this.$Msg.customizTitle('请先选择数据源与表名','warning');
                } else {
                    this.groupHidden = !this.groupHidden;
                }
            },
            // 添加分组条件
            addGroupWords(item, index) {
                this.groupCondtionArr.push(item)
            },
            // 删除分组条件
            clickCloseGroupWords(item, index) {
                this.groupCondtionArr.splice(index, 1);
            },
            // 添加过滤条件
            fiflterCondition() {
                if (this.input=='') {
                    this.$Msg.customizTitle('请先选择数据源与表名','warning');
                } else {
                    this.addfiflterCondition = !this.addfiflterCondition;
                }
            },
            // 条件过滤字段
            addfiflterConditionWords(item, index) {
                this.addfiflterCondition = false;
                this.addfiflterConditionDetails = true;
                this.keyWords = item.nameAll;
            },
            // 获取代码项
            getCategoryItemsFilfter() {
                functionAll.getCategoryItems({
                    category: 'AutoDataOperator'
                }).then(res => {
                    this.optionsCode = res.data;
                })
            },
            // 下拉框改变条件
            changeOptionsCode(val) {
                this.markCodeOptionsValue = val;
                if (val === "介于") {
                    this.twoInput = true;
                    this.oneInput = false;
                } else if (val === "不介于") {
                    this.twoInput = true;
                    this.oneInput = false;
                } else if (val === "为空") {
                    let obj = {
                        nameAll: this.keyWords + " 为空",
                        key: this.keyWords,
                        realtion: '为空',
                        number: '11'
                    }
                    this.fiflterConditionArr.push(obj);
                    this.inputvalueOptions3 = '';
                    this.inputvalueOptions2 = '';
                    this.inputvalueOptions1 = '';
                    this.optionsCodevalue = '';
                    this.oneInput = false;
                    this.twoInput = false;
                    this.addfiflterConditionDetails = false;
                } else if (val === "非空") {
                    let obj = {
                        nameAll: this.keyWords + " 非空",
                        key: this.keyWords,
                        realtion: '非空',
                        number: '12'
                    }
                    this.fiflterConditionArr.push(obj);
                    this.inputvalueOptions3 = '';
                    this.inputvalueOptions2 = '';
                    this.inputvalueOptions1 = '';
                    this.optionsCodevalue = '';
                    this.oneInput = false;
                    this.twoInput = false;
                    this.addfiflterConditionDetails = false;
                } else {
                    this.twoInput = false;
                    this.oneInput = true;
                }
            },
            // 取消添加筛选
            goBackfiflterCondition() {
                this.addfiflterCondition = true;
                this.addfiflterConditionDetails = false;
            },
            // 添加筛选器
            fiflterSqlOptions() {
                if (this.markCodeOptionsValue === "介于") {
                    let obj = {
                        nameAll: this.keyWords + " 介于" + this.inputvalueOptions1 + ',' + this.inputvalueOptions2,
                        key: this.keyWords,
                        realtion: '介于',
                        number: '01',
                        value: this.inputvalueOptions1 + ',' + this.inputvalueOptions2,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "不介于") {
                    let obj = {
                        nameAll: this.keyWords + " 不介于" + this.inputvalueOptions1 + ',' + this.inputvalueOptions2,
                        key: this.keyWords,
                        realtion: '不介于',
                        number: '02',
                        value: this.inputvalueOptions1 + ',' + this.inputvalueOptions2,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "为空") {

                } else if (this.markCodeOptionsValue === "非空") {

                } else if (this.markCodeOptionsValue === "等于") {
                    let obj = {
                        nameAll: this.keyWords + " 等于" + this.inputvalueOptions3,
                        key: this.keyWords,
                        realtion: '等于',
                        number: '03',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "不等于") {
                    let obj = {
                        nameAll: this.keyWords + " 不等于" + this.inputvalueOptions3,
                        key: this.keyWords,
                        realtion: '不等于',
                        number: '04',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "大于") {
                    let obj = {
                        nameAll: this.keyWords + " 大于" + this.inputvalueOptions3,
                        key: this.keyWords,
                        realtion: '大于',
                        number: '05',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "小于") {
                    let obj = {
                        nameAll: this.keyWords + " 小于" + this.inputvalueOptions3,
                        key: this.keyWords,
                        realtion: '小于',
                        number: '06',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "大于等于") {
                    let obj = {
                        nameAll: this.keyWords + " 大于等于" + this.inputvalueOptions3,
                        key: this.keyWords,
                        realtion: '大于等于',
                        number: '07',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "小于等于") {
                    let obj = {
                        nameAll: this.keyWords + " 小于等于" + this.inputvalueOptions3,
                        key: this.keyWords,
                        realtion: '小于等于',
                        number: '08',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "最大的N个") {
                    let obj = {
                        nameAll: this.keyWords + ' 最大的' + this.inputvalueOptions3 + '个',
                        key: this.keyWords,
                        realtion: '最大的N个',
                        number: '09',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                } else if (this.markCodeOptionsValue === "最小的N个") {
                    let obj = {
                        nameAll: this.keyWords + ' 最小的' + this.inputvalueOptions3 + '个',
                        key: this.keyWords,
                        realtion: '最小的N个',
                        number: '10',
                        value: this.inputvalueOptions3,
                    }
                    this.fiflterConditionArr.push(obj);
                }
                this.inputvalueOptions3 = '';
                this.inputvalueOptions2 = '';
                this.inputvalueOptions1 = '';
                this.optionsCodevalue = '';
                this.oneInput = false;
                this.twoInput = false;
                this.addfiflterConditionDetails = false;
            },
            // 删除条件选择
            clickCloseConditionWords(item, index) {
                this.fiflterConditionArr.splice(index, 1);
            },
            checkIfObjInArray(arry, obj) {
                return JSON.stringify(arry).indexOf(JSON.stringify(obj)) != -1;
            },
            // 获取答案
            getAnswer(flag) {
                // 处理数据
                this.loadingsearch = true;
                let parama = {};
                parama.fetch_name = this.input;
                parama.data_source = this.markCodeIndex;
                parama.showNum = this.showNum;
                let arry1 = [];
                let arry2 = [];
                let arry3 = [];
                let obj = {};
                // 设置显示字段数组
                var repeatflag = false;
                this.optionsWords.forEach(val => {
                    obj = {
                        summary_type: val.code,
                        column_name: val.realName
                    }
                    if (this.checkIfObjInArray(arry1, obj)) {
                        this.$Msg.customizTitle("查询字段重复:" + val.realName, "warning");
                        repeatflag = true;
                    }
                    arry1.push(obj);
                })
                // 设置过滤条件数组
                this.fiflterConditionArr.forEach(val => {
                    obj = {
                        cond_en_column: val.key == undefined ? val.cond_en_column : val.key,
                        operator: val.number == undefined ? val.operator : val.number,
                        cond_value: val.value == undefined ? val.cond_value : val.value,
                    }
                    if (this.checkIfObjInArray(arry2, obj)) {
                        this.$Msg.customizTitle("条件字段重复:" + val.realName, "warning");
                        repeatflag = true;
                    }
                    arry2.push(obj);
                })
                // 设置分组数组
                this.groupCondtionArr.forEach(val => {
                    obj = {
                        column_name: val.nameAll,
                    }
                    if (this.checkIfObjInArray(arry3, obj)) {
                        this.$Msg.customizTitle("分组字段重复:" + val.realName, "warning");
                        repeatflag = true;
                    }
                    arry3.push(obj);
                })
                if (repeatflag) {
                    this.loadingsearch = false;
                    return;
                }
                parama.autoCompDataSums = JSON.stringify(arry1);
                parama.autoCompConds = JSON.stringify(arry2);
                parama.autoCompGroups = JSON.stringify(arry3);
                functionAll.getSqlByCondition(parama).then(res => {
                    this.loadingsearch = false;
                    if (res && res.success) {
                        this.auto_comp_sum.exe_sql = res.data;
                        this.getVisualComponentResult(this.auto_comp_sum.exe_sql, this.showNum)
                        if (flag) {
                            setTimeout(() => {
                                this.echartshow(this.echart_type);
                            }, 2000);
                        }
                        if (!flag) {
                            this.weiduArry = [];
                            this.originalweiduArry = [];
                            this.duliangArry = [];
                            this.originalduliangArry = [];
                            this.optionsWords.forEach((item) => {
                                if (item.code != '07') {
                                    let obj = {
                                        nameAll: this.putcodenametogether(item.code, item.realName)
                                    }
                                    this.weiduArry.push(obj);
                                    this.originalweiduArry.push(obj);
                                    if (item.code == '01' || item.code == '02' || item.code == '03' || item.code == '04' || item.code == '05') {
                                        this.duliangArry.push(obj);
                                        this.originalduliangArry.push(obj);
                                    } else {
                                        if (this.allnumcolumns.indexOf(item.realName) != -1) {
                                            this.duliangArry.push(obj);
                                            this.originalduliangArry.push(obj);
                                        }
                                    }

                                } else {
                                    this.allcolumns.forEach((item) => {
                                        this.weiduArry.push({
                                            nameAll: item.nameAll
                                        });
                                        this.originalweiduArry.push({
                                            nameAll: item.nameAll
                                        });
                                        if (this.allnumcolumns.indexOf(item.nameAll) != -1) {
                                            this.duliangArry.push({
                                                nameAll: item.nameAll
                                            });
                                            this.originalduliangArry.push({
                                                nameAll: item.nameAll
                                            });
                                        }
                                    });

                                }
                            });
                        }
                    }
                })
            },
            putcodenametogether(code, name) {
                switch (code) {
                    case '01':
                        return 'sum(' + name + ')';
                    case '02':
                        return 'avg(' + name + ')';
                    case '03':
                        return 'max(' + name + ')';
                    case '04':
                        return 'min(' + name + ')';
                    case '06':
                        return name;
                    case '05':
                        return 'count(*)';
                }
            },
            // 获取答案
            getVisualComponentResult(val, num) {
                functionAll.getVisualComponentResult({
                    exe_sql: val,
                    showNum: num
                }).then(res => {
                    if (res && res.success) {
                        this.dynamicColumns = res.data.columnList;
                        this.dynamicColumnTables = res.data.visualComponentList;
                        this.echartTableData = res.data.visualComponentList;
                        if (res.data.visualComponentList.length > 0) {
                            this.isDataShow = true;
                        } else {
                            this.isDataShow = false;
                        }
                        if (res.data.visualComponentList.length == 1 && res.data.columnList.length == 1) {
                            this.optionsCharts.push({
                                value: 'card',
                                label: '卡片',
                            })
                        }
                    }
                })
            },
            //分页
            handleCurrentChange(current) {
                this.answerCurrPage = current;
            },
            handleSizeChange(size) {
                this.answerPageSize = size;
            },
            // 二维表分页
            echartTableSizeChange(size) {
                this.pageSize = size;
            },
            echartCurrentChange(currPage) {
                this.currPage = currPage;
            },
            // 删除横轴x的选择字段信息
            deleteXvalue(item, index) {
                this.xValueArry.splice(index, 1);
                let warry = [];
                let darry = [];
                this.weiduArry.forEach((item, index) => {
                    warry.push(item.nameAll);
                });
                if (!this.checkIfObjInArray(warry, item.nameAll)) {
                    this.weiduArry.push(item);
                }
                this.duliangArry.forEach((item, index) => {
                    darry.push(item.nameAll);
                });
                if (!this.checkIfObjInArray(darry, item.nameAll)) {
                    if (this.checkIfObjInArray(this.numbersArray, item.column_type))
                        this.duliangArry.push(item);
                }
            },
            // 删除横轴y的选择字段信息
            deleteYvalue(item, index) {
                this.yValueArry.splice(index, 1);
                let warry = [];
                let darry = [];
                this.weiduArry.forEach((item, index) => {
                    warry.push(item.nameAll);
                });
                if (!this.checkIfObjInArray(warry, item.nameAll)) {
                    this.weiduArry.push(item);
                }
                this.duliangArry.forEach((item, index) => {
                    darry.push(item.nameAll);
                });
                if (!this.checkIfObjInArray(darry, item.nameAll)) {
                    if (this.checkIfObjInArray(this.numbersArray, item.column_type))
                        this.duliangArry.push(item);
                }
            },
            // 改变图标类型
            changeChartType() {
                this.echart_type = this.value;
                this.changeTips(this.value);
                if (this.value == 'table' || this.value == 'card') {
                    this.echartshow(this.value)
                }
            },
            // 刷新echart
            refreshEchart() {
                this.echartshow(this.echart_type);
            },
            // 选择图标类型
            echartshow(type) {
                this.echart_type = type;
                this.auto_comp_sum.chart_type = type;
                let xColumns = []
                let yColumns = [];
                //数据处理获取图信息
                if (this.xValueArry.length > 0) {
                    this.xValueArry.forEach((item, index) => {
                        if (index != this.xValueArry.length - 1) {
                            xColumns.push(item.nameAll)
                        } else {
                            xColumns.push(item.nameAll)
                        }
                    })
                }
                if (this.yValueArry.length > 0) {
                    this.yValueArry.forEach((item, index) => {
                        if (index != this.yValueArry.length - 1) {
                            yColumns.push(item.nameAll)
                        } else {
                            yColumns.push(item.nameAll)
                        }
                    })
                }
                this.changeTips(type);
                if (this.checkifvalidate(this.auto_comp_sum.exe_sql)) {
                    this.$Msg.customizTitle("请先点击得到答案", "warning");
                    return;
                }
                if (type!='card' && type!='table') {
                    if (xColumns.length == 0 || yColumns.length == 0) {
                    this.$Msg.customizTitle("请先选择横纵轴", "warning");
                    return;
                    }
                }
                 
                if (type == "card") { // 卡片
                    var value = '';
                    for (var key in this.echartTableData[0]) {
                        value = this.echartTableData[0][key];
                    }
                    $("#carddiv").text(value);
                    this.changeToCard();
                } else if (type == "table") { // 二维表
                    this.changeToTable();
                } else { // 其他图表类型
                    functionAll.getChartShow({
                        exe_sql: this.auto_comp_sum.exe_sql,
                        x_columns: xColumns,
                        y_columns: yColumns,
                        chart_type: type,
                        showNum:this.showNum
                    }).then(res => {
                        if (res && res.success) {
                            if (type == 'line') { //折线图
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("维度大于1,请修改", "warning");
                                    return;
                                }
                                var result = this.initproperty();
                                var option = drawLine.drawLine(result, res.data);
                                this.drawPic(option);
                            } else if (type == 'bar') { //标准柱状图
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("维度大于1,请修改", "warning");
                                    return;
                                }
                                var result = this.initproperty();
                                var option = drawBarChart.drawBarChart(result, res.data);
                                this.drawPic(option);
                            } else if (type == 'stackingbar') { //堆叠柱状图
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("维度大于1,请修改", "warning");
                                    return;
                                }
                                var result = this.initproperty();
                                var option = drawStackingBarChart.drawStackingBarChart(result, res.data);
                                this.drawPic(option);
                            } else if (type == "polarbar") { //极坐标堆叠柱状图
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("维度大于1,请修改", "warning");
                                    return;
                                }
                                var result = this.initproperty();
                                var option = drawPolarBarChart.drawPolarBarChart(result, res.data);
                                this.drawPic(option);
                            } else if (type == "pie" || type == "huanpie" || type == "fasanpie") { // 饼图、环饼、发散饼
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("维度大于1,请修改", "warning");
                                    return;
                                }
                                if (yColumns.length > 1) {
                                    this.$Msg.customizTitle("度量大于1,请修改", "warning");
                                    return;
                                }
                                var result = this.initproperty();
                                var option = drawPieChart.drawPieChart(result, res.data);
                                this.drawPic(option);
                            } else if (type == "scatter") { // 标准散点图
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("度量大于1,请修改", "warning");
                                    return;
                                }
                                if (yColumns.length > 1) {
                                    this.$Msg.customizTitle("度量大于1,请修改", "warning");
                                    return;
                                }
                                var result = this.initproperty();
                                var option = drawScatterChart.drawScatterChart(result, res.data);
                                this.drawPic(option);
                            } else if (type == "bl") { // 柱状折线混合图
                                var result = this.initproperty();
                                var option = drawBlChart.drawBlChart(result, res.data);
                                this.drawPic(option);
                            } else if (type == "blsimple") { // 柱状折线混合图-简单
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("维度大于1,请修改", "warning");
                                    return;
                                }
                                if (yColumns.length != 2) {
                                    this.$Msg.customizTitle("度量必须为2,请修改", "warning");
                                    return;
                                }
                                var result = this.initproperty();
                                var option = drawBlSimpleChart.drawBlSimpleChart(result, res.data);
                                this.drawPic(option);
                            } else if (type == "treemap") { // 矩形树图
                                var result = this.initproperty();
                                var option = drawTreeMapChart.drawTreeMapChart(result, res.data, this.echartsLabel, this.auto_comp_sum);
                                this.drawPic(option);
                            } else if (type == "map") { // 地图
                                if (xColumns.length > 1) {
                                    this.$Msg.customizTitle("维度大于1,请修改", "warning");
                                    return;
                                }
                                if (yColumns.length > 1) {
                                    this.$Msg.customizTitle("度量大于1,请修改", "warning");
                                    return;
                                }
                                //定义全国省份的数组
                                var provinces = ['shanghai', 'hebei', 'shanxi', 'neimenggu', 'liaoning', 'jilin',
                                    'heilongjiang', 'jiangsu', 'zhejiang', 'anhui', 'fujian', 'jiangxi', 'shandong', 'henan',
                                    'hubei', 'hunan', 'guangdong', 'guangxi', 'hainan', 'sichuan', 'guizhou', 'yunnan', 'xizang',
                                    'shanxi1', 'gansu', 'qinghai', 'ningxia', 'xinjiang', 'beijing', 'tianjin', 'chongqing',
                                    'xianggang', 'aomen', 'taiwan'
                                ];

                                var provincesText = ['上海', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '江苏', '浙江',
                                    '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '四川', '贵州', '云南',
                                    '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '北京', '天津', '重庆', '香港', '澳门', '台湾'
                                ];
                                // for (var l = 0; l < provincesText.length; l++) {
                                //     if (this.seriesStyle.provincename == provincesText[l]) {
                                //         //显示对应省份的方法
                                //         this.showProvince(provinces[l])
                                //         break;
                                //     }
                                // }
                                var result = this.initproperty();
                                var option = drawMapChart.drawMapChart(result, res.data ,this.seriesStyle);
                                this.drawPic(option);
                            }
                        }
                    })
                }
            },
            // 展示省
            // showProvince(pName) {
            //     var script = document.createElement("script")
            //     script.type = "text/javascript";
            //     script.src = '../../../../node_modules/echarts/map/js/province/'+pName+'.js';
            //     script.id = '$'+pName+'JS';
            //     document.getElementsByTagName("head")[0].appendChild(script);
            // },
            changeTips(type) {
                if (type == 'line') { // 折线图
                    this.tips = "横轴为1个维度,纵轴接受多个度量";
                } else if (type == 'bar' || type == 'stackingbar') { // 标准柱状图、堆叠柱状图
                    this.tips = "横轴为1个维度,纵轴接受多个度量";
                } else if (type == "polarbar") { // 极坐标柱状图
                    this.tips = "横轴为1个维度,纵轴为1个度量";
                } else if (type == "pie" || type == "huanpie" || type == "fasanpie") { // 饼图、环饼、发散饼
                    this.tips = "横轴为1个维度,纵轴为1个度量";
                } else if (type == "scatter") { //散点图
                    this.tips = "横轴,纵轴都必须为度量";
                } else if (type == "table") { // 二维表
                    this.tips = "直接根据SQL得到的结果进行展示";
                } else if (type == "card") { // 卡片
                    this.tips = "直接展示标题内容";
                } else if (type == "bl") { // 柱状折线混合图
                    this.tips = "纵轴前两个字段为柱状图,从第三个字段开始为折线图";
                } else if (type == "blsimple") {
                    this.tips = "横轴为1个维度,纵轴必须为2个度量";
                } else if (type == "treemap") { // 矩形树图
                    this.tips = "横轴接受1至2个维度,按第一个维度分类,纵轴都必须为度量";
                } else if (type == "map") { // 地理坐标、地图
                    this.tips = "横轴为1个维度,纵轴为1个度量";
                }
            },
            initproperty() {
                var result = {};
                // 初始化标题属性
                generatepic.initTitleStyle(this.auto_comp_sum.chart_theme, this.titleFont, result);
                //设置图上每个节点的显示情况
                generatepic.initLabelOption(this.echartsLabel, result);
                // 初始化轴配置信息
                generatepic.initAxisStyle(this.axisStyle, this.xAxis, this.yAxis, this.xAxisLine, this.xAxisLabel, this.yAxisLine, this.yAxisLabel, result);
                // 初始化图例信息
                generatepic.initLengendStyle(this.legendStyle, result);
                result.background = this.auto_comp_sum.background
                return result;
            },
            //初始化echart
            drawPic(option) {
                this.myChart = echarts.init(document.getElementById('myChart'));
                this.myChart.clear();
                this.myChart.setOption(option, true)
            },
            // 卡片
            changeToCard() {
                $("#cardp").css("font-size", this.titleFont.fontSize + "px");
                $("#cardp").css("line-height", parseInt(this.titleFont.lineheight) + "px");
                $("#carddiv").css("font-size", this.titleFont.fontsize + "px");
                $(".thumbnails").css("background", this.titleFont.backgroundcolor);
                $(".thumbnails").css("color", this.titleFont.color);
                $(".thumbnails").css("font-style", this.titleFont.fontstyle);
                $(".thumbnails").css("font-family", this.titleFont.fontfamily);
                $(".thumbnails").css("font-weight", this.titleFont.fontweight);
            },
            // 二维表
            changeToTable() {
                // 斑马线条纹
                if (this.auto_table_info.is_zebraline == '0') {
                    this.show_stripe = false;
                    this.auto_table_info.zl_background = '';
                } else {
                    this.show_stripe = true;
                }
                // 单元格边框
                if (this.auto_table_info.is_gridline == '0') {
                    this.show_border = false;
                } else {
                    this.show_border = true;
                }
                $("#tableStyle").css("background", this.auto_table_info.th_background);
            },
            getRowStyle({
                            row,
                            rowIndwx
                        }) {
                if (this.auto_table_info.is_zebraline == '1') {
                    return {
                        'background': this.auto_table_info.zl_background
                    }
                } else {
                    this.auto_table_info.zl_background = ''
                }
            },
            // 返回上一级
            goBack() {
                this.$router.push({
                    name: 'visualizationindex'
                })
            },
            checkifvalidate(val) {
                return val == "" || val == undefined;
            },
            // 保存组件
            addVisualComponentInfo() {
                let param = new FormData();
                if (this.value != 'table' && this.value != 'card') {
                    if (this.checkifvalidate(this.auto_comp_sum.component_name)) {
                        this.$Msg.customizTitle('组件名称为空,请填写', 'warning');
                        return;
                    }
                    let autoAxisInfos = [];
                    autoAxisInfos.push(this.xAxis);
                    autoAxisInfos.push(this.yAxis);
                    // 文本标签信息
                    param.append('auto_labelString', JSON.stringify(this.echartsLabel));
                    // 标题信息
                    param.append('titleFontString', JSON.stringify(this.titleFont));
                    if (this.value != 'treemap') { // 矩形树图
                        if (this.value != 'map') { // 地理坐标、地图
                            if (this.checkifvalidate(this.xAxis.name)) {
                                this.$Msg.customizTitle('横轴名称为空,请填写', 'warning');
                                return;
                            }
                            if (this.checkifvalidate(this.yAxis.name)) {
                                this.$Msg.customizTitle('纵轴名称为空,请填写', 'warning');
                                return;
                            }
                            // 轴线字体信息
                            param.append('axisStyleFontString', JSON.stringify(this.axisStyle));
                            // 轴配置信息
                            param.append('autoAxisInfoString', JSON.stringify(autoAxisInfos));
                            // 轴标签配置信息
                            param.append('xAxisLabelString', JSON.stringify(this.xAxisLabel));
                            param.append('yAxisLabelString', JSON.stringify(this.yAxisLabel));
                            // 轴线配置信息
                            param.append('xAxisLineString', JSON.stringify(this.xAxisLine));
                            param.append('yAxisLineString', JSON.stringify(this.yAxisLine));
                        }
                        // 图例信息
                        param.append('auto_legend_infoString', JSON.stringify(this.legendStyle));
                    }
                    // 图表信息
                    param.append('auto_chartsconfigString', JSON.stringify(this.seriesStyle));
                }
                if (this.value == 'table') {
                    // 二维表设置
                    param.append('auto_table_infoString', JSON.stringify(this.auto_table_info));
                }
                if (this.value == 'card') {
                    // 标题信息
                    param.append('titleFontString', JSON.stringify(this.titleFont));
                }
                let x_columns = [];
                let y_columns = [];
                let obj = {};
                let autoCompConds = [];
                let autoCompGroups = [];
                let autoCompDataSums = [];
                this.xValueArry.forEach(val => {
                    x_columns.push(val.nameAll)
                })
                this.yValueArry.forEach(val => {
                    y_columns.push(val.nameAll)
                })
                this.auto_comp_sum.data_source = this.formvalue;
                this.auto_comp_sum.sources_obj = this.input;
                this.fiflterConditionArr.forEach(val => {
                    obj = {
                        arithmetic_logic: val.realtion,
                        cond_en_column: val.key,
                        operator: val.number,
                        cond_value: val.value,
                    }
                    autoCompConds.push(obj);
                });
                this.groupCondtionArr.forEach(val => {
                    obj = {
                        column_name: val.column_name,
                    }
                    autoCompGroups.push(obj);
                });
                this.optionsWords.forEach(val => {
                    obj = {
                        summary_type: val.code,
                        column_name: val.realName
                    }
                    autoCompDataSums.push(obj);

                });
                param.append("componentBeanString", JSON.stringify({
                    fetch_name: this.input,
                    data_source: this.markCodeIndex,
                    showNum: this.showNum,
                    x_columns: x_columns,
                    y_columns: y_columns,
                }));
                param.append('auto_comp_sumString', JSON.stringify(this.auto_comp_sum));
                param.append('autoCompCondString', JSON.stringify(autoCompConds));
                param.append('autoCompGroupString', JSON.stringify(autoCompGroups));
                param.append('autoCompDataSumString', JSON.stringify(autoCompDataSums));
                // fromData();
                if (this.component_id != undefined) {
                    functionAll.updateVisualComponentInfo(param).then(res => {
                        if (res && res.success) {
                            this.$Msg.customizTitle('更新保存成功', 'success');
                            this.$router.push({
                                name: 'visualizationindex'
                            })
                        }
                    })
                } else {
                    functionAll.addVisualComponentInfo(param).then(res => {
                        if (res && res.success) {
                            this.$Msg.customizTitle('保存成功', 'success');
                            this.$router.push({
                                name: 'visualizationindex'
                            })
                        }
                    })
                }
            },

        }
    }
</script>

<style scoped>
    /* 行标题 */
    .visualizationDiv .elRowtitle {
        height: 40px;
        line-height: 40px;
        width: 100%;
    }

    .visualizationDiv .tempalteInfo {
        float: left;
        font-size: 18px;
        color: #2196f3;
    }

    .visualizationDiv .templateButton {
        float: right;
    }

    .visualizationDiv .lines {
        margin-top: 2px;
        width: 100%;
        min-height: 1px;
        background: #dddddd;
        margin-bottom: 10px;
    }

    .visualizationDiv .elcol8 {
        position: relative;
    }

    .elcol8Button {
        position: absolute;
        top: 18px;
        right: 10%;
    }

    .showArryDiv {
        width: 100%;
        height: 120px;
        border: 1px solid #ddd;
        overflow: auto;
        margin-top: 4px;
    }

    .showArryDivSelect {
        height: 200px;
    }

    .divStyle {
        width: 100%;
        height: 34px;
        margin-bottom: 6px;
        position: relative
    }

    .visualizationDiv .elDialogInfo {
        margin-top: 4px;
        height: 240px;
        overflow: auto;
    }

    .visualizationDiv .optionsWords {
        height: 40px;
        line-height: 40px;
        width: 91%;
        background: #f5f5f5;
        margin-top: 10px;
        border-radius: 2px;
    }

    .visualizationDiv .showArryDivContent {
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        margin-left: 6px;
        border-bottom: 1px solid #DCDFE6;
        color: #393939;
        font-size: 14px;
    }

    .visualizationDiv .showArryDivContent:hover {
        color: #2196f3
    }

    .visualizationDiv >>> .el-tabs--border-card {
        width: 98% !important;
        margin-top: 40px;
    }

    .visualizationDiv >>> .el-tabs__item {
        padding: 0 6px !important;
    }

    .visualizationDiv .el-input-group__prepends {
        background-color: #F5F7FA;
        color: #909399;
        vertical-align: middle;
        display: table-cell;
        position: relative;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        padding: 6px 0;
        text-align: center;
        width: 40%;
        white-space: nowrap;
        font-size: 12px;
        float: left;
        margin-top: 2px;
    }

    .visualizationDiv .el-input-group__prepends2 {
        background-color: #F5F7FA;
        color: #909399;
        vertical-align: middle;
        display: table-cell;
        position: relative;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
        padding: 6px 0;
        text-align: center;
        width: 100%;
        white-space: nowrap;
        font-size: 12px;
        float: left;
        margin-top: 2px;
    }


    .visualizationDiv >>> .el-tabs--border-card > .el-tabs__content {
        padding: 10px;
    }

    .visualizationDiv >>> .el-color-picker__trigger {
        display: inline-block;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        padding: 4px;
        border: 1px solid #e6e6e6;
        border-radius: 4px;
        font-size: 0;
        position: absolute;
        cursor: pointer;
        top: 2px;
        right: 20px;
    }

    .selectPosition {
        position: absolute;
        top: 0%;
        right: 1%;
        width: 59%;
        height: 33px;
        line-height: 33px;
    }

    .previewData {
        position: absolute;
        background-color: #F5F7FA;
        color: #909399;
        width: 29%;
        height: 33px;
        margin-bottom: -6px;
    }

    /*滚动条样式*/
    ::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 4px;
        /*高宽分别对应横竖滚动条的尺寸*/
        height: 4px;
    }

    ::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 5px;
        -webkit-box-shadow: inset 0 0 5px rgba(193, 193, 193, 0.3);
        background: rgba(193, 193, 193, 0.3);
    }

    ::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241, 0.3);
        border-radius: 0;
        background: rgb(241, 241, 241);

    }

    .imgStyle {
        width: 87px;
        height: 70px;
        cursor: pointer;
        margin-right: 4px;
    }

    .axisStyle {
        width: 90%;
        height: 30px;
        margin-bottom: 12px;
        position: relative;
        border: 1px solid #DCDFE6;
        border-radius: 4px;
    }
</style>
