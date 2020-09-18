<template>
<div class="visualizationDiv">
    <el-row class="elRowtitle">
        <p class="tempalteInfo">选择数据源</p>
        <div class="templateButton">
            <el-button type="danger" size="small">
                返回上级
            </el-button>
            <el-button type="primary" size="small">
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
            <p class="optionsWords">设置过滤条件<el-button :disabled="canChangeFiflter" size="mini" type="primary">修改条件逻辑</el-button>
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
    <el-pagination @size-change="ex_destination_handleSizeChange" @current-change="ex_destination_handleCurrentChange" :current-page="ex_destinationcurrentPage" v-if="dynamicColumnTableHiddens" :page-sizes="[5, 10, 20, 50]" :page-size="ex_destinationpagesize" layout="total, sizes, prev, pager, next, jumper" :total="dynamicColumnTables.length" class="locationcenter"></el-pagination>
    <el-row class="elRowtitle">
        <p class="tempalteInfo">可视化设置</p>
    </el-row>
    <div class="lines"></div>
    <el-row>
        <el-col :span="5">
            <div>
                <el-input placeholder="请输入内容" v-model="input1" size="small" style="width:90%;">
                    <template slot="prepend">维度</template>
                    <el-button slot="append" icon="el-icon-search" size="small"></el-button>
                </el-input>
                <div class="showArryDiv showArryDivSelect ">
                    <!-- <ul>
                    <li v-for="(item,index) in columnsWordsALL" class="showArryDivContent" :key="item.nameAll" @click="addfiflterConditionWords(item,index)" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}</li>
                </ul> -->
                </div>
            </div>
            <div>
                <el-input placeholder="请输入内容" v-model="input1" size="small" style="width:90%;margin-top:30px;">
                    <template slot="prepend">度量</template>
                    <el-button slot="append" icon="el-icon-search" size="small"></el-button>
                </el-input>
                <div class="showArryDiv showArryDivSelect ">
                    <!-- <ul>
                    <li v-for="(item,index) in columnsWordsALL" class="showArryDivContent" :key="item.nameAll" @click="addfiflterConditionWords(item,index)" style="padding-left:10px;height:30px;line-height:30px;"> {{item.nameAll}}</li>
                </ul> -->
                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <el-input v-model="input1" size="small" style="width:90%">
                <template slot="prepend">横轴</template>
            </el-input>
            <el-input v-model="input1" size="small" style="width:90%;margin-top:10px;">
                <template slot="prepend">纵轴</template>
            </el-input>
            <div style="font-size:16px;color:red;margin:6px 10px;">{{tips}}</div>
        </el-col>
        <el-col :span="7">
            <el-select v-model="changeGetchartsValue" size="small" placeholder="请选择" style="width:98%;" @change="changeGetcharts">
                <el-option v-for="item in optionsCharts" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='line'">
                <img style="width:87px;height:70px;cursor:pointer;" src="@/assets/images/chart/line.png" alt="标准折线图" title="标准折线图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='bar'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/bar.png" alt="标准柱状图" title="标准柱状图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/bar-muldimension.png" alt="多维柱状图(3)" title="多维柱状图(3)">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/bar-polar.png" alt="极坐标柱状图" title="极坐标柱状图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='scatter'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/scatter.png" alt="标准散点图" title="标准散点图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/bubble.png" alt="气泡图" title="气泡图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='pie'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/pie.png" alt="标准饼图" title="标准饼图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/pie-customized.png" alt="发散饼图" title="发散饼图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/pie-doughnut.png" alt="环形饼图" title="环形饼图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='treemap'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/treemap.png" alt="矩形树图" title="矩形树图">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='blend'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/bar-line.png" alt="柱状折线混合图" title="柱状折线混合图">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/barline-simple.png" alt="柱状折线混合图-简单" title="柱状折线混合图-简单">
            </div>
            <div style="margin-top:10px;" v-if="changeGetchartsValue =='map'">
                <img style="width:87px;height:70px;cursor:pointer;margin-right:4px;" src="@/assets/images/chart/map.png" alt="地图" title="地图">
            </div>
            <div>
                <el-tabs type="border-card" size="mini">
                    <!-- <p  style="position: absolute;top:0;right:0;width:20px;height:20px;"><i class="el-icon-refresh"></i></p> -->
                    <el-tab-pane label="常规设置">
                        <div style="height:170px;overflow:auto;">
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图表背景颜色</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">是否显示文本</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">文本显示位置</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">文本格式化<el-tooltip class="item" effect="dark" placement="top" style="margin-left:-8px; color:black">
                                        <div slot="content"><span>{a}表示系列名 <br />{b}表示数据名<br />{c}表示数据值<br />{d}%表示百分比(饼图)</span></div>
                                        <i class="el-icon-question elIconInfo"></i>
                                    </el-tooltip></span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="标题设置">
                        <div style="height:300px;overflow:auto;">
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">名称</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">背景颜色</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">水平位置</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">垂直位置</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体颜色</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体大小</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体风格</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体系列</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">字体粗细</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">边框颜色</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">边框粗细</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="轴线设置">
                        <!-- <div style="height:300px;overflow:auto;">

                        </div> -->
                        <el-tabs type="border-card" size="mini" style="margin-top:0px;">
                            <el-tab-pane label="横轴">
                                <div style="height:240px;overflow:auto;">
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴位置</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">是否显示</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴偏移量</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称位置</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称旋转角度</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称与轴线距离</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否显示</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否在0刻度</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否显示</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否朝内</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签旋转角度</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签与轴线间距</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签内容格式器</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="纵轴">
                                <div style="height:240px;overflow:auto;">
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴位置</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">是否显示</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴偏移量</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称位置</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称旋转角度</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴名称与轴线距离</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否显示</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴线是否在0刻度</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否显示</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签是否朝内</span>
                                        <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签旋转角度</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签与轴线间距</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                    <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                        <span class="el-input-group__prepends">轴标签内容格式器</span>
                                        <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                        </el-input>
                                    </div>
                                </div>
                            </el-tab-pane>
                            <el-tab-pane label="字体样式">
                                <div style="height:240px;overflow:auto;">

                                </div>
                            </el-tab-pane>
                        </el-tabs>
                    </el-tab-pane>
                    <el-tab-pane label="图例设置">
                        <div style="height:300px;overflow:auto;">
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例类型</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">是否显示</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">左边距</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">右边距</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">上边距</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">下边距</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例宽度</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例高度</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">布局朝向</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">文本对齐</span>
                                <el-select v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">内边距</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图形宽度</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图形高度</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例关闭颜色</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例背景颜色</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例边框颜色</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
                                </el-input>
                            </div>
                            <div style="width:100%;height:34px;margin-bottom:6px;  position: relative;">
                                <span class="el-input-group__prepends">图例边框粗细</span>
                                <el-input v-model="value" placeholder="请选择" size="small" class="selectPosition">
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
export default {
    data() {
        return {
            formvalue: '',
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
            showNum: '10',
            optionsWordsbuttons: true,
            dynamicColumnTables: [],
            dynamicColumnTableHiddens: false,
            dynamicColumns: [],
            ex_destinationcurrentPage: 1,
            ex_destinationpagesize: 5,
            loadingsearch: false,
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
            tips: 'ceds'

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
        }
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
                    realName: '(count*)'
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
                    nameAll: this.keyWords + " 为空"
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
                    nameAll: this.keyWords + " 非空"
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
                    nameAll: this.keyWords + " 介于" + this.inputvalueOptions1 + '，' + this.inputvalueOptions2
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "不介于") {
                let obj = {
                    nameAll: this.keyWords + " 不介于" + this.inputvalueOptions1 + '，' + this.inputvalueOptions2
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "为空") {

            } else if (this.markCodeOptionsValue === "非空") {

            } else if (this.markCodeOptionsValue === "等于") {
                let obj = {
                    nameAll: this.keyWords + " 等于" + this.inputvalueOptions3
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "不等于") {
                let obj = {
                    nameAll: this.keyWords + " 不等于" + this.inputvalueOptions3
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "大于") {
                let obj = {
                    nameAll: this.keyWords + " 大于" + this.inputvalueOptions3
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "小于") {
                let obj = {
                    nameAll: this.keyWords + " 小于" + this.inputvalueOptions3
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "大于等于") {
                let obj = {
                    nameAll: this.keyWords + " 大于等于" + this.inputvalueOptions3
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "小于等于") {
                let obj = {
                    nameAll: this.keyWords + " 小于等于" + this.inputvalueOptions3
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "最大的N个") {
                let obj = {
                    nameAll: this.keyWords + ' 最大的' + this.inputvalueOptions3 + '个'
                }
                this.fiflterConditionArr.push(obj);
            } else if (this.markCodeOptionsValue === "最小的N个") {
                let obj = {
                    nameAll: this.keyWords + ' 最小的' + this.inputvalueOptions3 + '个'
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
            console.log(this.optionsWords)
            this.optionsWords.forEach(val => {
                let obj = {
                    summary_type: val.code,
                    column_name: val.realName
                }
                arry1.push(obj);
            })
            // 设置过滤条件数组
            console.log(this.fiflterConditionArr)
            // 设置分组数组
            console.log(this.groupCondtionArr)
            parama.autoCompDataSums = JSON.stringify(arry1);
            parama.autoCompConds = JSON.stringify(arry2);
            parama.autoCompGroups = JSON.stringify(arry3);
            functionAll.getSqlByCondition(parama).then(res => {
                this.loadingsearch = false;
                if (res && res.success) {
                    this.loadingsearch = true;
                    this.getVisualComponentResult(res.data)
                }
            })
        },
        // 获取答案
        getVisualComponentResult(val) {
            functionAll.getVisualComponentResult({
                exe_sql: val
            }).then(res => {
                this.loadingsearch = false;
                this.dynamicColumns = res.data.columnList;
                this.dynamicColumnTables = res.data.visualComponentList;
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
            console.log(val)

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
    width:40%;
    white-space: nowrap;
    font-size: 12px;
    float: left;
    margin-top: 2px;
}
.visualizationDiv >>>.el-tabs--border-card>.el-tabs__content{
    padding: 10px;
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
