<template>
<div class="visualizationDiv">
    <el-row class="elRowtitle">
        <p class="tempalteInfo">选择数据源</p>
        <div class="templateButton">
            <el-button type="primary" @click="goBack" size="small">
                返回上级
            </el-button>
            <el-button type="primary" size="small" @click="addVisualComponentInfo()">
                保存组件
            </el-button>
        </div>
    </el-row>
    <div class="lines"></div>
    <el-row>
        <el-select v-model="formvalue" placeholder="请选择表单" size="small" style="width:160px" clearable @change="changeSelectDataCollect">
            <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.code">
            </el-option>
        </el-select>
        <el-input style="width:220px;" size="small" v-model="input" disabled placeholder="选择表单内容"></el-input>
    </el-row>
    <el-row>
        <el-col :span="8" class="elcol8">
            <p class="optionsWords">设置显示字段 </p>
            <div class="showArryDiv">
                <ul>
                    <li v-for="(item,index) in optionsWords" class="showArryDivContent" :key="item.name" style="padding-left:10px;height:30px;line-height:30px;"> {{item.name}} <span style="cursor:pointer;" @click="clickClose(item,index)"><i class="el-icon-close"></i></span><span v-if="optionsWords.length >1" @click="moveUp(index,item,optionsWords)"><i class="el-icon-top"></i></span><span v-if="optionsWords.length >1" @click="moveDown(index,item,optionsWords)"><i class="el-icon-bottom"></i></span></li>
                </ul>
            </div>
            <div class="elcol8Button">
                <el-button size="mini" @click="addWords" :disabled="disabled" type="info">添加字段</el-button>
            </div>

        </el-col>
        <el-col :span="8" class="elcol8">
            <p class="optionsWords">设置过滤条件<el-button style="margin-left:10px" :disabled="canChangeFiflter" size="mini" type="primary">修改条件逻辑</el-button>
            </p>
            <div class="showArryDiv">
                <ul>
                    <li v-for="(item,index) in fiflterConditionArr" class="showArryDivContent" :key="item.nameAll" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}} <span style="cursor:pointer;" @click="clickCloseConditionWords(item,index)"><i class="el-icon-close"></i></span></li>
                </ul>
            </div>
            <div class="elcol8Button">
                <el-button size="mini" @click="fiflterCondition" :disabled="disabled" type="info">添加过滤条件</el-button>
            </div>
            <div class="showArryDiv showArryDivSelect " v-if="addfiflterCondition">
                <ul>
                    <li v-for="(item,index) in columnsWordsALL" class="showArryDivContent" :key="item.nameAll" @click="addfiflterConditionWords(item,index)" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}</li>
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
                        <el-select v-model="optionsCodevalue" placeholder="请选择" size="mini" style="width:110px" @change="changeOptionsCode">
                            <el-option v-for="item in optionsCode" :key="item.value" :label="item.label" :value="item.value">
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
                        <el-button size="mini" @click="fiflterSqlOptions" :disabled="fiflterSqlOptionsButton" type="primary">添加筛选器</el-button>
                        <el-button size="mini" @click="goBackfiflterCondition" type="primary">返回</el-button>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="8" class="elcol8">
            <p class="optionsWords">设置分组条件</p>
            <div class="showArryDiv">
                <ul>
                    <li v-for="(item,index) in groupCondtionArr" class="showArryDivContent" :key="item.nameAll" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}} <span style="cursor:pointer;" @click="clickCloseGroupWords(item,index)"><i class="el-icon-close"></i></span></li>
                </ul>
            </div>
            <div class="elcol8Button">
                <el-button size="mini" @click="addGroup" :disabled="disabled" type="info">添加分组条件</el-button>
            </div>
            <div class="showArryDiv showArryDivSelect " v-show="groupHidden">
                <ul>
                    <li v-for="(item,index) in columnsWordsALL" class="showArryDivContent" :key="item.nameAll" @click="addGroupWords(item,index)" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}</li>
                </ul>
            </div>
        </el-col>
    </el-row>
    <el-row style="margin:16px 0 8px 0;">
        <div style="width:400px;margin:0 auto;">
            <el-button size="small" @click="getAnswer" :loading="loadingsearch" :disabled="optionsWordsbuttons" type="primary">得到答案</el-button>
            <el-input style="width:220px;margin-left:6px;" size="small" v-model="showNum" placeholder="显示条数"></el-input>
        </div>
    </el-row>
    <el-row class="elRowtitle" v-if="dynamicColumnTableHiddens">
        <p class="tempalteInfo">结果信息</p>
    </el-row>
    <div class="lines" v-if="dynamicColumnTableHiddens"></div>
    <el-table size="medium" :data="dynamicColumnTables.slice((ex_destinationcurrentPage - 1) * ex_destinationpagesize, ex_destinationcurrentPage *ex_destinationpagesize)" border stripe style="width: 100%" v-if="dynamicColumnTableHiddens">
        <el-table-column label="序号" width="64" align="center">
            <template scope="scope">
                <span>{{scope.$index+(ex_destinationcurrentPage - 1) * ex_destinationpagesize + 1}}</span>
            </template>
        </el-table-column>
        <el-table-column v-for="col in dynamicColumns" show-overflow-tooltip min-width="200px" :prop="col" :label="col" :key="col">
        </el-table-column>
    </el-table>
    <el-pagination @size-change="ex_destination_handleSizeChange" @current-change="ex_destination_handleCurrentChange" :current-page="ex_destinationcurrentPage" v-if="dynamicColumnTableHiddens" :page-sizes="[5, 10, 20, 50, 100, 500, 1000]" :page-size="ex_destinationpagesize" layout="total, sizes, prev, pager, next, jumper" :total="dynamicColumnTables.length" class="locationcenter"></el-pagination>
    <el-row class="elRowtitle" v-if="showVisualSetting">
        <p class="tempalteInfo">可视化设置</p>
    </el-row>
    <el-divider v-if="showVisualSetting" />
    <el-row v-if="showVisualSetting">
        <el-col :span="5">
            <div>
                <el-input placeholder="请输入内容" v-model="input1" size="small" style="width:90%;">
                    <template slot="prepend">维度</template>
                    <el-button slot="append" icon="el-icon-search" size="small"></el-button>
                </el-input>
                <div class="showArryDiv showArryDivSelect ">
                    <ul>
                        <draggable class="list-group" :list="weiduArry" group="people">
                            <li v-for="item in weiduArry" class="showArryDivContent" :key="item.nameAll" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}</li>
                        </draggable>
                    </ul>
                </div>
            </div>
            <div>
                <el-input placeholder="请输入内容" v-model="input1" size="small" style="width:90%;margin-top:30px;">
                    <template slot="prepend">度量</template>
                    <el-button slot="append" icon="el-icon-search" size="small"></el-button>
                </el-input>
                <div class="showArryDiv showArryDivSelect ">
                    <ul>
                        <draggable class="list-group" :list="duliangArry" group="people">
                            <li v-for="item in duliangArry" class="showArryDivContent" :key="item.nameAll" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}</li>
                        </draggable>
                    </ul>
                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <div style="width:90%;height:30px;margin-bottom:12px;position: relative;border:1px solid #DCDFE6;border-radius: 4px;">
                <span class="el-input-group__prepends" style="width:70px;margin-top:0px;border-top:none;border-left:none;border-bottom:none;height:30px;line-height:30px;padding:0;">横轴</span>
                <draggable :list="xValueArry" group="people">
                    <div style="width:85%;height:30px;line-height:30px;background:#fff;overflow:auto;font-size:14px;">
                        <span v-for="(item,index) in xValueArry" :key="item.nameAll">{{item.nameAll}}<i class="el-icon-close" @click="deleteXvalue(item,index)" style="cursor:pointer;"></i>&nbsp</span>
                    </div>
                </draggable>
            </div>

            <div style="width:90%;height:30px;margin-bottom:12px;position: relative;border:1px solid #DCDFE6;border-radius: 4px;">
                <span class="el-input-group__prepends" style="width:70px;margin-top:0px;border-top:none;border-left:none;border-bottom:none;height:30px;line-height:30px;padding:0;">纵轴</span>
                <draggable :list="yValueArry" group="people">
                    <div style="width:85%;height:30px;line-height:30px;background:#fff;overflow:auto;font-size:14px;">
                        <span v-for="(item,index) in yValueArry" :key="item.nameAll">{{item.nameAll}}<i class="el-icon-close" @click="deleteYvalue(item,index)" style="cursor:pointer;"></i>&nbsp</span>
                    </div>
                </draggable>
            </div>
            <div style="font-size:16px;color:red;margin:6px 10px;">{{tips}}</div>

            <div v-if="echarttype=='table'" id="type_table" style="height:440px;overflow: auto;">
                //二位表
            </div>
            <div v-if="echarttype=='card'" style="margin-bottom:10px;height:440px">
                <div style="transform: translate(-50%,-50%);top:50%;left:50%;position:absolute;">
                    <p id="cardp">{{auto_comp_sum.chart_theme}}</p>
                    <h1 id="carddiv"></h1>
                </div>
            </div>
            <div v-if="echarttype!='table' && echarttype!='card'" id="myChart" style="width:100%; height: 440px; margin-bottom: 25px"></div>

        </el-col>
        <el-col :span="7">
            <el-select v-model="changeGetchartsValue" size="small" placeholder="请选择" style="width:98%;" @change="changeGetcharts">
                <el-option v-for="item in optionsCharts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='line'">
                <img style="width:87px;height:70px;cursor:pointer;" @click="echartshow('line')" src="@/assets/images/chart/line.png" alt="标准折线图" title="标准折线图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='bar' || echarttype=='barmd' || echarttype=='polarbar'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('bar')" src="@/assets/images/chart/bar.png" alt="标准柱状图" title="标准柱状图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('barmd')" src="@/assets/images/chart/bar-muldimension.png" alt="多维柱状图(3)" title="多维柱状图(3)">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('polarbar')" src="@/assets/images/chart/bar-polar.png" alt="极坐标柱状图" title="极坐标柱状图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='scatter'|| echarttype=='bubble'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('scatter')" src="@/assets/images/chart/scatter.png" alt="标准散点图" title="标准散点图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('bubble')" src="@/assets/images/chart/bubble.png" alt="气泡图" title="气泡图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='pie' || echarttype=='fasanpie' || echarttype=='huanpie'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('pie')" src="@/assets/images/chart/pie.png" alt="标准饼图" title="标准饼图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('fasanpie')" src="@/assets/images/chart/pie-customized.png" alt="发散饼图" title="发散饼图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('huanpie')" src="@/assets/images/chart/pie-doughnut.png" alt="环形饼图" title="环形饼图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='treemap'|| echarttype=='treemap'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('treemap')" src="@/assets/images/chart/treemap.png" alt="矩形树图" title="矩形树图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='blend'|| echarttype=='bl' ||echarttype=='blsimple'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('bl')" src="@/assets/images/chart/bar-line.png" alt="柱状折线混合图" title="柱状折线混合图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('blsimple')" src="@/assets/images/chart/barline-simple.png" alt="柱状折线混合图-简单" title="柱状折线混合图-简单">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='map'|| echarttype=='map'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" @click="echartshow('map')" src="@/assets/images/chart/map.png" alt="地图" title="地图">
            </div>
            <div style="position: relative;">
                <el-button size="mini" icon="el-icon-refresh" style="position: absolute;top:0;right:0;z-index:10;top:6px;right:4px;"></el-button>
                <el-tabs type="border-card" size="mini">
                    <el-tab-pane label="常规设置">
                        <div style="height:170px;overflow:auto;">
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图表背景颜色</span>
                                <el-color-picker v-model="auto_comp_sum.background" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="auto_comp_sum.background" placeholder="图表背景颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">是否显示文本</span>
                                <el-select v-model="echartsLabel.show_label" placeholder="是否显示文本" size="small" class="selectPosition">
                                    <el-option v-for="item in normalOptions.optionShowlabel" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;" v-if="changeGetchartsValue!='map'">
                                <span class="el-input-group__prepends">文本显示位置</span>
                                <el-select v-model="echartsLabel.position" placeholder="文本显示位置" size="small" class="selectPosition" v-show="changeGetchartsValue!='pie' && echarttype!='fasanpie' && echarttype!='huanpie'">
                                    <el-option v-for="item in normalOptions.optionposition" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                                <el-select v-model="echartsLabel.position" placeholder="文本显示位置" size="small" class="selectPosition" v-show="changeGetchartsValue=='pie' || echarttype=='fasanpie' || echarttype=='huanpie'">
                                    <el-option v-for="item in normalOptions.optionposition1" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">文本格式化<el-tooltip class="item" effect="dark" placement="top" style="margin-left:-8px; color:black">
                                        <div slot="content"><span>{a}表示系列名 <br />{b}表示数据名<br />{c}表示数据值<br />{d}%表示百分比(饼图)</span></div>
                                        <i class="el-icon-question elIconInfo"></i>
                                    </el-tooltip></span>
                                <el-input v-model="echartsLabel.formatter" placeholder="文本格式化" size="small" class="selectPosition">
                                </el-input>
                            </div>

                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;" v-if="changeGetchartsValue=='pie' || echarttype=='fasanpie' || echarttype=='huanpie'">
                                <span class="el-input-group__prepends">是否显示引导线</span>
                                <el-select v-model="echartsLabel.show_line" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in normalOptions.optionShowlabel" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>

                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;" v-if="changeGetchartsValue=='map'">
                                <span class="el-input-group__prepends">中国地图或省份</span>
                                <el-select v-model="seriesStyle.provincename" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in map_array" :key="item" :label="item" :value="item">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="标题设置">
                        <div style="height:300px;overflow:auto;">
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">名称</span>
                                <el-input v-model="auto_comp_sum.chart_theme" placeholder="名称" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">背景颜色</span>
                                <el-color-picker v-model="titleFont.backgroundColor" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="titleFont.backgroundColor" placeholder="背景颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">水平位置</span>
                                <el-select v-model="titleFont.align" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in titleFont.titleFontalignArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">垂直位置</span>
                                <el-select v-model="titleFont.verticalAlign" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in titleFont.titleFontverticalAlignArr" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体颜色</span>
                                <el-color-picker v-model="titleFont.color" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="titleFont.color" placeholder="字体颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体大小</span>
                                <el-input v-model="titleFont.fontSize" placeholder="字体大小" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体风格</span>
                                <el-select v-model="titleFont.fontStyle" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in titleFont.titleFontfontStyleArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体系列</span>
                                <el-select v-model="titleFont.fontFamily" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in titleFont.titleFontfontFamilyArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体粗细</span>
                                <el-select v-model="titleFont.fontWeight" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in titleFont.titleFontfontWeightArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">边框颜色</span>
                                <el-color-picker v-model="titleFont.borderColor" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="titleFont.borderColor" placeholder="边框颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">边框粗细</span>
                                <el-input v-model="titleFont.borderWidth" placeholder="边框粗细" size="small" class="selectPosition">
                                </el-input>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="轴线设置">
                        <el-tabs type="border-card" size="mini" style="margin-top:0px;">
                            <el-tab-pane label="横轴">
                                <div style="height:240px;overflow:auto;">
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称</span>
                                        <el-input v-model="xAxis.name" placeholder="轴名称" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴位置</span>
                                        <el-select v-model="xAxis.position" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in xAxis.xAxispositionArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">是否显示</span>
                                        <el-select v-model="xAxis.show" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴偏移量</span>
                                        <el-input v-model="xAxis.offset" placeholder="轴偏移量" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称位置</span>
                                        <el-select v-model="xAxis.nameLocation" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in xAxis.xAxisnameLocationArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称旋转角度</span>
                                        <el-input v-model="xAxis.nameRotate" placeholder="轴名称旋转角度" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称与轴线距离</span>
                                        <el-input v-model="xAxis.nameGap" placeholder="轴名称与轴线距离" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否显示</span>
                                        <el-select v-model="xAxisLine.show" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否在0刻度</span>
                                        <el-select v-model="xAxisLine.onZero" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否显示</span>
                                        <el-select v-model="xAxisLabel.show" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否朝内</span>
                                        <el-select v-model="xAxisLabel.inside" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签旋转角度</span>
                                        <el-input v-model="xAxisLabel.rotate" placeholder="轴标签旋转角度" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签与轴线间距</span>
                                        <el-input v-model="xAxisLabel.margin" placeholder="轴标签与轴线间距" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签内容格式器</span>
                                        <el-input v-model="xAxisLabel.formatter" placeholder="轴标签内容格式器" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="纵轴">
                                <div style="height:240px;overflow:auto;">
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称</span>
                                        <el-input v-model="yAxis.name" placeholder="轴名称" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴位置</span>
                                        <el-select v-model="yAxis.position" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in yAxis.yAxispositionArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">是否显示</span>
                                        <el-select v-model="yAxis.show" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴偏移量</span>
                                        <el-input v-model="yAxis.offset" placeholder="轴偏移量" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称位置</span>
                                        <el-select v-model="yAxis.nameLocation" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in yAxis.yAxisnameLocationArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称旋转角度</span>
                                        <el-input v-model="yAxis.nameRotate" placeholder="轴名称旋转角度" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称与轴线距离</span>
                                        <el-input v-model="yAxis.nameGap" placeholder="轴名称与轴线距离" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否显示</span>
                                        <el-select v-model="yAxisLine.show" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否在0刻度</span>
                                        <el-select v-model="yAxisLine.onZero" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否显示</span>
                                        <el-select v-model="yAxisLabel.show" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否朝内</span>
                                        <el-select v-model="yAxisLabel.inside" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签旋转角度</span>
                                        <el-input v-model="yAxisLabel.rotate" placeholder="轴标签旋转角度" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签与轴线间距</span>
                                        <el-input v-model="yAxisLabel.margin" placeholder="轴标签与轴线间距" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签内容格式器</span>
                                        <el-input v-model="yAxisLabel.formatter" placeholder="轴标签内容格式器" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="字体样式">
                                <div style="height:240px;overflow:auto;">
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">背景色</span>
                                        <el-color-picker v-model="axisStyle.backgroundColor" style="width:20px;height:20px;"></el-color-picker>
                                        <el-input v-model="axisStyle.backgroundColor" placeholder="背景色" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">水平位置</span>
                                        <el-select v-model="axisStyle.align" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisStyle.axisStylealignArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">垂直位置</span>
                                        <el-select v-model="axisStyle.verticalAlign" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in axisStyle.axisStyleverticalAlignArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">字体颜色</span>
                                        <el-color-picker v-model="axisStyle.color" style="width:20px;height:20px;"></el-color-picker>
                                        <el-input v-model="axisStyle.color" placeholder="字体颜色" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">字体大小</span>
                                        <el-input v-model="axisStyle.fontSize" placeholder="字体大小" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">字体风格</span>
                                        <el-select v-model="axisStyle.fontStyle" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in titleFont.titleFontfontStyleArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">字体系列</span>
                                        <el-select v-model="axisStyle.fontFamily" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in titleFont.titleFontfontFamilyArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">字体粗细</span>
                                        <el-select v-model="axisStyle.fontWeight" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in  titleFont.titleFontfontWeightArr" :key="item.value" :label="item.value" :value="item.code">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">边框颜色</span>
                                        <el-color-picker v-model="axisStyle.borderColor" style="width:20px;height:20px;"></el-color-picker>
                                        <el-input v-model="axisStyle.borderColor" placeholder="边框颜色" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">边框粗细</span>
                                        <el-input v-model="axisStyle.borderWidth" placeholder="边框粗细" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="图例设置" v-if="changeGetchartsValue !=='map'">
                        <div style="height:300px;overflow:auto;">
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例类型</span>
                                <el-select v-model="legendStyle.type" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in legendStyle.legendStyletypeArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">是否显示</span>
                                <el-select v-model="legendStyle.show" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">左边距</span>
                                <el-input v-model="legendStyle.left" placeholder="左边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">右边距</span>
                                <el-input v-model="legendStyle.right" placeholder="右边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">上边距</span>
                                <el-input v-model="legendStyle.top" placeholder="上边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">下边距</span>
                                <el-input v-model="legendStyle.bottom" placeholder="下边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例宽度</span>
                                <el-input v-model="legendStyle.width" placeholder="图例宽度" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例高度</span>
                                <el-input v-model="legendStyle.height" placeholder="图例高度" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">布局朝向</span>
                                <el-select v-model="legendStyle.orient" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in legendStyle.legendStyleorientArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">文本对齐</span>
                                <el-select v-model="legendStyle.align" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in legendStyle.legendStylealignArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">内边距</span>
                                <el-input v-model="legendStyle.padding" placeholder="内边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图形宽度</span>
                                <el-input v-model="legendStyle.itemWidth" placeholder="图形宽度" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图形高度</span>
                                <el-input v-model="legendStyle.itemHeight" placeholder="图形高度" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例关闭颜色</span>
                                <el-color-picker v-model="legendStyle.inactiveColor" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="legendStyle.inactiveColor" placeholder="图例关闭颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例背景颜色</span>
                                <el-color-picker v-model="legendStyle.backgroundColor" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="legendStyle.backgroundColor" placeholder="图例背景颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例边框颜色</span>
                                <el-color-picker v-model="legendStyle.borderColor" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="legendStyle.borderColor" placeholder="图例边框颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例边框粗细</span>
                                <el-input v-model="legendStyle.borderWidth" placeholder="图例边框粗细" size="small" class="selectPosition">
                                </el-input>
                            </div>
                        </div>

                    </el-tab-pane>
                    <el-tab-pane label="图例设置" v-if="changeGetchartsValue =='map'">
                        <div style="height:300px;overflow:auto;">
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">是否显示</span>
                                <el-select v-model="legendStyle.show" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in axisCheck" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">左边距</span>
                                <el-input v-model="legendStyle.left" placeholder="左边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">右边距</span>
                                <el-input v-model="legendStyle.right" placeholder="右边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">上边距</span>
                                <el-input v-model="legendStyle.top" placeholder="上边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">下边距</span>
                                <el-input v-model="legendStyle.bottom" placeholder="下边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例个数</span>
                                <el-input v-model="legendStyle.intervalnumber" placeholder="图例个数" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例容量</span>
                                <el-input v-model="legendStyle.interval" placeholder="图例容量" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">布局朝向</span>
                                <el-select v-model="legendStyle.orient" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in legendStyle.legendStyleorientArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">文本对齐</span>
                                <el-select v-model="legendStyle.align" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in legendStyle.legendStylealignArr" :key="item.value" :label="item.value" :value="item.code">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">内边距</span>
                                <el-input v-model="legendStyle.padding" placeholder="内边距" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例间隔</span>
                                <el-input v-model="legendStyle.itemGap" placeholder="图例间隔" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图形宽度</span>
                                <el-input v-model="legendStyle.itemWidth" placeholder="图形宽度" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图形高度</span>
                                <el-input v-model="legendStyle.itemHeight" placeholder="图形高度" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例边框颜色</span>
                                <el-color-picker v-model="legendStyle.borderColor" style="width:20px;height:20px;"></el-color-picker>
                                <el-input v-model="legendStyle.borderColor" placeholder="图例边框颜色" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例边框粗细</span>
                                <el-input v-model="legendStyle.borderWidth" placeholder="图例边框粗细" size="small" class="selectPosition">
                                </el-input>
                            </div>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </el-col>
    </el-row>
    <!-- 系统级数据信息 -->
    <el-dialog title="选择表单(单击选择表名)" :visible.sync="dialogData" width="660px">
        <!--树菜单-->
        <div class='mytree '>
            <el-input placeholder="输入关键字进行过滤" v-model="filterText" size="mini" />
            <el-tree class="filter-tree elDialogInfo" :data="webSqlTreeData" :indent='0' :filter-node-method="filterNode" ref="tree" @node-click="nodeClickChartTree">
                <span class="span-ellipsis" slot-scope="{ node, data }">
                    <span :title="data.description" v-if="'undefined' !== typeof data.file_id && data.file_id !== ''">
                        <i class=" el-icon-document"></i>
                        <template v-if="'undefined' !== typeof data.original_name && data.original_name !== ''">{{data.original_name}}</template>
                        <template v-else-if="data.original_name === '' && data.table_name!==''">{{data.table_name}}</template>
                        <template v-else>{{data.hyren_name}}</template>
                    </span>
                    <span :title="data.description" v-else>
                        <i class="el-icon-folder-opened"></i>{{node.label}}
                    </span>
                </span>
            </el-tree>
            <div slot="footer" class="dialog-footer" style="height:30px">
                <el-button @click="cancelSelectTreeName" size="mini" type="danger" style="float:right">取 消</el-button>
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
            <el-tree class="filter-tree elDialogInfo" :data="data2" :indent='0' :props="defaultProps" ref="trees" @node-click="nodeClickChartTreeWords">
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
require('echarts/dist/extension/dataTool.js');
export default {
    components: {
        draggable
    },
    data() {
        return {
            showVisualSetting: false,
            formvalue: '',
            echarttype: '',
            myChart: '',
            myChartType: '',
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
            keyWords: '',
            columnsWordsALL: [],
            groupCondtionArr: [],
            hasComputeArry: [],
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
            disabled: true,
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
            dynamicColumnTableHiddens: false,
            dynamicColumns: [],
            ex_destinationcurrentPage: 1,
            ex_destinationpagesize: 5,
            loadingsearch: false,
            backgroundcolor: 'transparent',
            color: '#000000',
            borderwidth: '0',
            bordercolor: '#000000',
            // auto_label
            // titleFont
            // 常规设置
            echartsLabel: {
                show_label: '1', //是否显示文本标签
                position: "", //标签位置
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
                    value: '扇区内侧'
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
            //标题设置字段总和
            titleFont: {
                align: "left", //标题水平位置
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
                verticalAlign: "top", //标题垂直位置
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
                backgroundColor: "transparent", //标题背景色
                borderColor: "transparent", //标题边框颜色
                borderWidth: 0, //标题边框粗细
                borderRadius: 0, //坐标轴边框圆角
                color: "#000000", //字体颜色
                fontFamily: "Arial", //字体系列
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
                fontSize: 24, //字体大小
                fontStyle: "normal", //字体风格
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
                fontWeight: "normal", //字体粗细
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
                lineHeight: "40", //字体行高
            },
            //轴线设置--x轴字段
            xAxis: {
                type: "", //轴类型
                data: [], //x轴数据
                show: '1', //是否显示
                position: "bottom", //轴位置
                xAxispositionArr: [{
                    code: 'top',
                    value: 'top'
                }, {
                    code: 'bottom',
                    value: 'bottom'
                }],
                offset: 0, //轴偏移量
                name: "", //轴名称
                nameLocation: "end", //轴名称位置
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
                nameTextStyle: {}, //--轴名称样式
                nameGap: 15, //名称与轴线距离
                nameRotate: 0, //名称旋转角度
                axisLine: {}, //--轴线
                axisLabel: {} //--刻度标签
            },
            axisCheck: [{
                code: '0',
                value: '否'
            }, {
                code: '1',
                value: '是'
            }],
            xAxisLine: {
                show: '1', //轴线是否显示
                onZero: '1', //是否在0刻度上
                symbol: "none", //箭头显示方式
                symbolOffset: 0, //箭头偏移量
            },
            xAxisLabel: {
                show: '1', //刻度标签是否显示
                inside: '0', //刻度标签是否朝内
                rotate: 0, //刻度标签旋转角度
                margin: 10, //刻度标签与轴线间距
                formatter: null, //刻度标签内容格式器
            },
            //轴线设置--y轴
            yAxis: {
                type: "", //轴类型
                show: '1', //是否显示
                position: "left", //轴位置
                yAxispositionArr: [{
                    code: 'left',
                    value: 'left'
                }, {
                    code: 'right',
                    value: 'right'
                }],
                offset: 0, //轴偏移量
                name: "", //轴名称
                nameLocation: "end", //轴名称位置
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
                nameTextStyle: {}, //--轴名称样式
                nameGap: 15, //名称与轴线距离
                nameRotate: 0, //名称旋转角度
                axisLine: {}, //--轴线
                axisLabel: {} //--刻度标签
            },
            yAxisLine: {
                show: '1', //轴线是否显示
                onZero: '1', //是否在0刻度上
                symbol: "none", //箭头显示方式
                symbolOffset: 0, //箭头偏移量
            },
            yAxisLabel: {
                show: '1', //刻度标签是否显示 
                inside: 0, //刻度标签是否朝内
                rotate: 0, //刻度标签旋转角度
                margin: 20, //刻度标签与轴线间距
                formatter: null, //刻度标签内容格式器
            },
            //轴线字体
            axisStyle: {
                align: "center", //坐标轴水平位置
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
                verticalAlign: "middle", //坐标轴垂直位置
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
                backgroundColor: "transparent", //坐标轴背景色
                borderColor: "transparent", //坐标轴边框颜色
                borderWidth: 0, //坐标轴边框粗细
                borderRadius: 0, //坐标轴边框圆角
                color: "#000000", //字体颜色
                fontFamily: "Arial", //字体系列
                fontSize: 12, //字体大小
                fontStyle: "normal", //字体风格
                fontWeight: "normal", //字体粗细
                lineHeight: "", //字体行高
            },
            //图例设置字段信息总和
            legendStyle: {
                legendStyletypeArr: [{
                    code: 'plain',
                    value: '普通图例'
                }, {
                    code: 'scroll',
                    value: '可滚动翻页的图例'
                }],
                type: "plain", //图例类型
                show: '1', //是否显示
                left: "center", //左边距
                top: "auto", //上边距
                right: "auto", //右边距
                bottom: "auto", //下边距
                width: "auto", //宽度
                height: "auto", //高度
                orient: "horizontal", //布局朝向
                legendStyleorientArr: [{
                    code: 'horizontal',
                    value: '横向布局'
                }, {
                    code: 'vertical',
                    value: '纵向布局'
                }],
                align: "auto", //图例与文本对齐,
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
                padding: 5, //图例内边距
                itemGap: 10, //图例间隔
                itemWidth: 25, //图例宽度
                itemHeight: 14, //图例高度
                inactiveColor: "#cccccc", //图例关闭时颜色
                backgroundColor: "transparent", //图例背景颜色
                borderColor: "#cccccc", //边框颜色
                borderWidth: 0, //边框大小
                interval: 100, //图例容量(地图)
                intervalnumber: 4, //图例个数(地图)

            },
            //组件汇总表
            auto_comp_sum: {
                condition_sql: '',
                chart_theme: '',
                background: 'transparent',
                component_id: '',
                component_nam: '',
                component_desc: '',
            },
            optionsCharts: [{
                value: 'line',
                label: '折线图'
            }, {
                value: 'bar',
                label: '柱状图'
            }, {
                value: 'scatter',
                label: '散点图'
            }, {
                value: 'pie',
                label: '饼图'
            }, {
                value: 'card',
                label: '卡片'
            }, {
                value: 'table',
                label: '二维表'
            }, {
                value: 'treemap',
                label: '矩形树图'
            }, {
                value: 'blend',
                label: '混合图'
            }, {
                value: 'map',
                label: '地理坐标/地图'
            }],
            changeGetchartsValue: '',
            input1: '',
            tips: '',
            xValueArry: [],
            yValueArry: [],
            value: '',
            weiduArry: [],
            duliangArry: [],
            markexe_sql: '',
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

        }
    },
    mounted() {
        this.getWebSQLTreeData(); //获取树结构
        this.getMyAccessInfo();
        this.getCategoryItems();
        this.getCategoryItemsFilfter();
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
        dynamicColumnTables(val) {
            if (val.length > 0) {
                this.dynamicColumnTableHiddens = true;
            } else {
                this.dynamicColumnTableHiddens = false;
            }
        },
        duliangArry(val) {

        },
    },
    methods: {
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
        // 节点搜索
        filterNode(value, data) {
            // 如果检索内容为空,直接返回
            if (!value) return true;
            // 如果传入的value和data中的name相同说明是匹配到了,匹配时转小写匹配
            // 检索内容为 original_name table_name hyren_name
            if ('undefined' !== typeof data.file_id && data.file_id !== '') {
                return (
                    ('undefined' !== typeof data.original_name && data.original_name !== '' && data.original_name.indexOf(value) !== -1) ||
                    ('undefined' !== typeof data.table_name && data.table_name !== '' && data.table_name.toLowerCase().indexOf(value.toLowerCase()) !== -1) ||
                    ('undefined' !== typeof data.hyren_name && data.hyren_name !== '' && data.hyren_name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
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
            this.optionsWords.splice(index, 1)
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
                if (res.data.numColumns) {
                    if (res.data.numColumns.length > 0) {
                        res.data.numColumns.forEach(itemAll => {
                            if (this.markCodeIndex === "01") {
                                itemAll.nameAll = itemAll.fetch_res_name;
                            } else if (this.markCodeIndex === "02") {
                                itemAll.nameAll = itemAll.column_name;
                            }
                        })
                        this.weiduArry = JSON.parse(JSON.stringify(res.data.columns)); //深拷贝
                        this.markarrx = JSON.parse(JSON.stringify(res.data.columns)); //深拷贝
                    } else {
                        this.weiduArry = [];
                    }
                } else {
                    this.weiduArry = [];
                }
                if (res.data.measureColumns) {
                    if (res.data.measureColumns.length > 0) {
                        res.data.measureColumns.forEach(itemAll => {
                            if (this.markCodeIndex === "01") {
                                itemAll.nameAll = itemAll.fetch_res_name;
                            } else if (this.markCodeIndex === "02") {
                                itemAll.nameAll = itemAll.column_name;
                            }
                        })
                        this.duliangArry = JSON.parse(JSON.stringify(res.data.measureColumns));
                        this.markarry = JSON.parse(JSON.stringify(res.data.measureColumns));
                    } else {
                        this.duliangArry = [];
                    }
                } else {
                    this.duliangArry = [];
                }
                this.columnsWordsALL = res.data.columns;
                this.hasComputeArry = res.data.numColumns;
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
                                            label: value.column_name,
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
        // 添加字段信息
        addWords() {
            this.selectWords = true;
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
            } else {
                this.$Msg.customizTitle("已经是第一条，不可上移", "warning");
            }
        },
        // 数据下移
        moveDown(val, data, tableData) {
            if (val + 1 === tableData.length) {
                this.$Msg.customizTitle("已经是最后一条，不可下移", "warning");
            } else {
                let downDate = tableData[val + 1];
                tableData.splice(val + 1, 1);
                tableData.splice(val, 0, downDate);
                this.showNumArry = tableData;
            }
        },
        // 添加组件
        addGroup() {
            this.groupHidden = !this.groupHidden;
        },
        // 添加分组条件
        addGroupWords(item, index) {
            this.groupCondtionArr.push(item)
        },
        // 删除分组条件
        clickCloseGroupWords(item, index) {
            this.groupCondtionArr.splice(index, 1)
        },
        // 添加过滤条件
        fiflterCondition() {
            this.addfiflterCondition = !this.addfiflterCondition;
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
                    nameAll: this.keyWords + " 介于" + this.inputvalueOptions1 + '，' + this.inputvalueOptions2,
                    key: this.keyWords,
                    realtion: '介于',
                    number: '01'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "不介于") {
                let obj = {
                    nameAll: this.keyWords + " 不介于" + this.inputvalueOptions1 + '，' + this.inputvalueOptions2,
                    key: this.keyWords,
                    realtion: '不介于',
                    number: '02'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "为空") {

            } else if (this.markCodeOptionsValue === "非空") {

            } else if (this.markCodeOptionsValue === "等于") {
                let obj = {
                    nameAll: this.keyWords + " 等于" + this.inputvalueOptions3,
                    key: this.keyWords,
                    realtion: '等于',
                    number: '03'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "不等于") {
                let obj = {
                    nameAll: this.keyWords + " 不等于" + this.inputvalueOptions3,
                    key: this.keyWords,
                    realtion: '不等于',
                    number: '04'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "大于") {
                let obj = {
                    nameAll: this.keyWords + " 大于" + this.inputvalueOptions3,
                    key: this.keyWords,
                    realtion: '大于',
                    number: '05'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "小于") {
                let obj = {
                    nameAll: this.keyWords + " 小于" + this.inputvalueOptions3,
                    key: this.keyWords,
                    realtion: '小于',
                    number: '06'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "大于等于") {
                let obj = {
                    nameAll: this.keyWords + " 大于等于" + this.inputvalueOptions3,
                    key: this.keyWords,
                    realtion: '大于等于',
                    number: '07'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "小于等于") {
                let obj = {
                    nameAll: this.keyWords + " 小于等于" + this.inputvalueOptions3,
                    key: this.keyWords,
                    realtion: '小于等于',
                    number: '08'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "最大的N个") {
                let obj = {
                    nameAll: this.keyWords + ' 最大的' + this.inputvalueOptions3 + '个',
                    key: this.keyWords,
                    realtion: '最大的N个',
                    number: '09'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "最小的N个") {
                let obj = {
                    nameAll: this.keyWords + ' 最小的' + this.inputvalueOptions3 + '个',
                    key: this.keyWords,
                    realtion: '最小的N个',
                    number: '10'
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
        // 获取答案
        getAnswer() {
            // 处理数据
            this.loadingsearch = true;
            let parama = {};
            parama.fetch_name = this.input;
            parama.data_source = this.markCodeIndex;
            parama.showNum = this.showNum;
            let arry1 = [];
            let arry2 = [];
            let arry3 = [];
            // 设置显示字段数组
            this.optionsWords.forEach(val => {
                let obj = {
                    summary_type: val.code,
                    column_name: val.realName
                }
                arry1.push(obj);
            })
            // 设置过滤条件数组
            // 设置分组数组
            parama.autoCompDataSums = JSON.stringify(arry1);
            parama.autoCompConds = JSON.stringify(arry2);
            parama.autoCompGroups = JSON.stringify(arry3);
            functionAll.getSqlByCondition(parama).then(res => {
                this.loadingsearch = false;
                if (res && res.success) {
                    this.loadingsearch = true;
                    this.markexe_sql = res.data;
                    this.getVisualComponentResult(res.data, this.showNum)
                }
            })
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
                    this.showVisualSetting = true;
                }
                this.loadingsearch = false;
            })
        },
        //分页
        ex_destination_handleCurrentChange(current) {
            this.ex_destinationcurrentPage = current;
        },
        ex_destination_handleSizeChange(size) {
            this.ex_destinationpagesize = size;
        },
        // 获取不同表的显示图片
        changeGetcharts(val) {
            // if (val == 'line') {
            //    
            // } else if (val == 'bar') {
            //    
            // } else if (val == 'scatter') {
            //    
            // } else if (val == 'pie') {
            //    
            // } else if (val == 'treemap') {
            //    
            // } else if (val == 'blend') {
            //    
            // } else if (val == 'map') {
            //    
            // }
        },
        // 删除横轴x的选择字段信息
        deleteXvalue(item, index) {
            this.xValueArry.splice(index, 1);
            this.duliangArry = JSON.parse(JSON.stringify(this.markarry));
            this.weiduArry = JSON.parse(JSON.stringify(this.markarrx));
            // this.markarrx.forEach(item=>{})
            // if (this.weiduArry.findIndex(val => val.nameAll == item.nameAll) == -1) {
            //     this.weiduArry.push(item)
            // }
        },
        // 删除横轴y的选择字段信息
        deleteYvalue(item, index) {
            this.yValueArry.splice(index, 1);
            this.duliangArry = JSON.parse(JSON.stringify(this.markarry));
            this.weiduArry = JSON.parse(JSON.stringify(this.markarrx));
            // if (this.duliangArry.findIndex(val => val.nameAll == item.nameAll) == -1) {
            //     this.duliangArry.push(item)
            // }
        },
        // 获取表的数据信息
        getChartShow() {
            // functionAll.getChartShow({

            // }).then(res=>{
            //     exe_sql:  this.markexe_sql ,
            //     x_columns:,
            //     y_columns:,
            //     chart_type:,
            // })
        },
        // 选择图标类型
        echartshow(type) {
            this.myChartType = type;
            let xColumns = '';
            let yColumns = '';
            //数据处理获取图信息
            if (this.xValueArry.length > 0) {
                this.xValueArry.forEach((item, index) => {
                    if (index != this.xValueArry.length - 1) {
                        xColumns += item.nameAll + ','
                    } else {
                        xColumns += item.nameAll
                    }
                })
            }
            if (this.yValueArry.length > 0) {
                this.yValueArry.forEach((item, index) => {
                    if (index != this.yValueArry.length - 1) {
                        yColumns += item.nameAll + ','
                    } else {
                        yColumns += item.nameAll
                    }
                })
            }
            if (type == 'line') {
                this.tips = "横轴为1个维度,纵轴接受多个度量";
            } else if (type == 'bar') {
                this.tips = "横轴为1个维度,纵轴接受多个度量";
            } else if (type == "pie" || type == "huanpie" || type == "fasanpie") {
                this.tips = "横轴为1个维度,纵轴为1个度量";
            } else if (type == "scatter") {
                this.tips = "横轴,纵轴都必须为度量";
            } else if (type == "boxplot") {
                this.tips = "";
            } else if (type == "bl") {
                this.tips = "纵轴前两个字段为柱状图,从第三个字段开始为折线图";
            } else if (type == "treemap") {
                this.tips = "横轴接受1至2个维度,按第一个维度分类";
            } else if (type == "barmd") {
                this.tips = "横轴接受1至3个维度,分类程度逐渐降低";
            } else if (type == "bubble") {
                this.tips = "横轴为1个维度,纵轴为1个度量";
            } else if (type == "polarbar") {
                this.tips = "横轴为1个维度,纵轴为1个度量";
            } else if (type == "blsimple") {
                this.tips = "横轴为1个维度,纵轴必须为2个度量";
            } else if (type == "map") {
                this.tips = "横轴为1个维度,纵轴为1个度量";
            }
            functionAll.getChartShow({
                exe_sql: this.markexe_sql,
                x_columns: xColumns,
                y_columns: yColumns,
                chart_type: type,
            }).then(res => {
                if (type == 'line') { //折线图
                    this.changeToAreaChart(xColumns, yColumns, type, res.data)
                } else if (type == 'bar') { //标准柱状图
                    this.changeToBarChart(xColumns, yColumns, type, res.data);
                } else if (type == "pie" || type == "huanpie" || type == "fasanpie") {
                    this.changeToPieChart(xColumns, yColumns, type, res.data);
                } else if (type == "scatter") {

                } else if (type == "boxplot") {

                } else if (type == "bl") {

                } else if (type == "treemap") {

                } else if (type == "barmd") {

                } else if (type == "bubble") {

                } else if (type == "polarbar") {

                } else if (type == "blsimple") {

                } else if (type == "map") {

                }
            })

        },
        //初始化echart
        drawLine(option) {
            this.myChart = echarts.init(document.getElementById('myChart'));
            var myChart = this.myChart;
            myChart.clear();
            myChart.setOption(option);
        },
        // 折线图
        changeToAreaChart(x_columns, y_columns, type, data) {
            let vm = this;
            var legend_data = data.legend_data;
            var seriesArray = data.seriesArray;
            var xArray = data.xArray;
            vm.axisStyle.borderWidth = parseInt(vm.axisStyle.borderWidth);
            vm.xAxisLabel.margin = parseInt(vm.xAxisLabel.margin);
            vm.yAxisLabel.margin = parseInt(vm.yAxisLabel.margin);
            vm.xAxisLabel.formatter = vm.xAxisLabel.formatter == "" ? null : vm.xAxisLabel.formatter;
            vm.yAxisLabel.formatter = vm.yAxisLabel.formatter == "" ? null : vm.yAxisLabel.formatter;

            vm.xAxisLabel = Object.assign({}, vm.xAxisLabel, vm.axisStyle);
            vm.xAxis.type = "category";
            vm.xAxis.data = xArray;
            vm.xAxis.nameTextStyle = vm.axisStyle;
            vm.xAxis.axisLine = vm.xAxisLine;
            vm.xAxis.axisLabel = vm.xAxisLabel;

            vm.yAxisLabel = Object.assign({}, vm.yAxisLabel, vm.axisStyle);
            vm.yAxis.type = "value";
            vm.yAxis.nameTextStyle = vm.axisStyle;
            vm.yAxis.axisLine = vm.yAxisLine;
            vm.yAxis.axisLabel = vm.yAxisLabel;

            var titles = transferOptionTitles(vm.auto_comp_sum.chart_theme, vm.titleFont);

            vm.legendStyle.data = legend_data;
            vm.legendStyle.padding = parseInt(vm.legendStyle.padding);
            vm.legendStyle.itemGap = parseInt(vm.legendStyle.itemGap);
            vm.legendStyle.itemWidth = parseInt(vm.legendStyle.itemWidth);
            let objDefine = Object.assign({}, vm.echartsLabel);
            if (objDefine.show_label == "1") {
                objDefine.show_label = true;
            } else {
                objDefine.show_label = false;
            }
            if (objDefine.show_line == "1") {
                objDefine.show_line = true;
            } else {
                objDefine.show_line = false;
            }
            if (objDefine.smooth == "1") {
                objDefine.smooth = true;
            } else {
                objDefine.smooth = false;
            }
            var itemStyles = transferSeriesItemStyle(objDefine);

            for (var i = 0; i < seriesArray.length; i++) {
                seriesArray[i].itemStyle = itemStyles;
            }

            let option = {
                backgroundColor: vm.auto_comp_sum.background,
                title: titles,
                tooltip: {
                    trigger: 'axis'
                },
                legend: vm.legendStyle,
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: vm.xAxis,
                yAxis: vm.yAxis,
                series: seriesArray
            };
            this.drawLine(option);
        },
        //柱状图
        changeToBarChart(x_columns, y_columns, type, data) {
            let vm = this;
            var legend_data = data.legend_data;
            var seriesArray = data.seriesArray;
            var xArray = data.xArray;

            vm.axisStyle.borderWidth = parseInt(vm.axisStyle.borderWidth);
            vm.xAxisLabel.margin = parseInt(vm.xAxisLabel.margin);
            vm.yAxisLabel.margin = parseInt(vm.yAxisLabel.margin);
            vm.xAxisLabel.formatter = vm.xAxisLabel.formatter == "" ? null : vm.xAxisLabel.formatter;
            vm.yAxisLabel.formatter = vm.yAxisLabel.formatter == "" ? null : vm.yAxisLabel.formatter;

            vm.xAxisLabel = Object.assign({}, vm.xAxisLabel, vm.axisStyle);
            vm.xAxis.type = "category";
            vm.xAxis.data = xArray;
            vm.xAxis.nameTextStyle = vm.axisStyle;
            vm.xAxis.axisLine = vm.xAxisLine;
            vm.xAxis.axisLabel = vm.xAxisLabel;

            vm.yAxisLabel = Object.assign({}, vm.yAxisLabel, vm.axisStyle);
            vm.yAxis.type = "value";
            vm.yAxis.nameTextStyle = vm.axisStyle;
            vm.yAxis.axisLine = vm.yAxisLine;
            vm.yAxis.axisLabel = vm.yAxisLabel;

            var titles = transferOptionTitles(vm.auto_comp_sum.chart_theme, vm.titleFont);
            vm.legendStyle.data = legend_data;
            vm.legendStyle.padding = parseInt(vm.legendStyle.padding);
            vm.legendStyle.itemGap = parseInt(vm.legendStyle.itemGap);
            vm.legendStyle.itemWidth = parseInt(vm.legendStyle.itemWidth);
            let objDefine = Object.assign({}, vm.echartsLabel);
            if (objDefine.show_label == "1") {
                objDefine.show_label = 'ture';
            } else {
                objDefine.show_label = 'false';
            }
            if (objDefine.show_line == "1") {
                objDefine.show_line = 'ture';
            } else {
                objDefine.show_line = 'false';
            }
            if (objDefine.smooth == "1") {
                objDefine.smooth = 'ture';
            } else {
                objDefine.smooth = 'false';
            }
            var itemStyles = transferSeriesItemStyle(objDefine);
            for (var i = 0; i < seriesArray.length; i++) {
                seriesArray[i].itemStyle = itemStyles;
            }
            let option = {
                backgroundColor: vm.auto_comp_sum.background,
                title: titles,
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: vm.legendStyle,
                toolbox: {
                    show: true,
                    feature: {
                        magicType: {
                            show: true,
                            type: ['stack', 'tiled']
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: vm.xAxis,
                yAxis: vm.yAxis,
                series: seriesArray
            };
            this.drawLine(option)
        },
        //饼图
        changeToPieChart(x_columns, y_columns, type, data) {
            let vm = this;
            let objDefine = Object.assign({}, vm.echartsLabel);
            if (objDefine.show_label == "1") {
                objDefine.show_label = 'ture';
            } else {
                objDefine.show_label = 'false';
            }
            if (objDefine.show_line == "1") {
                objDefine.show_line = 'ture';
            } else {
                objDefine.show_line = 'false';
            }
            if (objDefine.smooth == "1") {
                objDefine.smooth = 'ture';
            } else {
                objDefine.smooth = 'false';
            }
            var legend_data = data.legendData;
            var seriesArray = data.seriesArray;
            var pietype = data.pietype;
            if (pietype == 'huanpie') { //&& vm.echartsLabel.show_count==true
                var count = '总数：' + data.count;
            } else {
                var count = "";
            }

            var titles = transferOptionTitles(vm.auto_comp_sum.chart_theme, vm.titleFont);
            vm.legendStyle.data = legend_data;
            vm.legendStyle.padding = parseInt(vm.legendStyle.padding);
            vm.legendStyle.itemGap = parseInt(vm.legendStyle.itemGap);
            vm.legendStyle.itemWidth = parseInt(vm.legendStyle.itemWidth);
            var itemStyles = {
                normal: {
                    label: {
                        show: vm.echartsLabel.show_label,
                        position: vm.echartsLabel.position,
                        formatter: vm.echartsLabel.formatter
                    },
                    labelLine: {
                        show: vm.echartsLabel.show_line
                    }
                }
            };
            for (var i = 0; i < seriesArray.length; i++) {
                seriesArray[i].itemStyle = itemStyles;
                seriesArray[i].center = vm.seriesStyle.center;
            }

            var option = {
                backgroundColor: vm.auto_comp_sum.background,
                title: titles,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: vm.legendStyle,
                graphic: {
                    type: 'text',
                    left: 'center',
                    top: 'center',
                    style: {
                        text: count,
                        textAlign: 'center',
                        fill: '#000',
                        width: 30,
                        height: 30
                    }
                },
                toolbox: {
                    show: true,
                    feature: {
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                series: seriesArray
            }
            this.drawLine(option)
        },
        // 保存组件
        addVisualComponentInfo() {
            functionAll.addVisualComponentInfo().then(res => {

            })
        },
        // 返回上一级
        goBack() {
            this.$router.push({
                name: 'visualizationindex'
            })
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
    width: 90%;
    height: 120px;
    border: 1px solid #ddd;
    overflow: auto;
    margin-top: 4px;
}

.showArryDivSelect {
    height: 200px;
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

.visualizationDiv>>>.el-tabs--border-card {
    width: 98% !important;
    margin-top: 40px;
}

.visualizationDiv>>>.el-tabs__item {
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

.visualizationDiv>>>.el-tabs--border-card>.el-tabs__content {
    padding: 10px;
}

.visualizationDiv>>>.el-color-picker__trigger {
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
    -webkit-box-shadow: inset 0 0 5px rgba(193, 193, 193);
    background: rgba(193, 193, 193);
}

::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(241, 241, 241);
    border-radius: 0;
    background: rgb(241, 241, 241);

}
</style>
