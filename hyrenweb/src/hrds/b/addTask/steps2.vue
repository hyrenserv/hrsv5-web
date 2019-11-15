<template>
  <div>
    <div class="cleanbtn">
      <el-button
        size="mini"
        type="success"
        @click="dialogalltableClean=true;alltableClean(databaseId)"
      >所有表清洗设置</el-button>
      <el-button
        size="mini"
        type="success"
        @click="dialogtableClean=true;allTableCleanPriorityFun(databaseId)"
      >全表清洗优先级</el-button>
    </div>
    <el-table
      :header-cell-style="{background:'#e6e0e0'}"
      ref="filterTable"
      stripe
      :default-sort="{prop: 'date', order: 'descending'}"
      style="width: 100%"
      height="360"
      border
      :data="cleantableData.slice((cleancurrentPage - 1) * cleanpagesize, cleancurrentPage * cleanpagesize)"
    >
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column label="序号" align="center" width="60">
        <template scope="scope">
          <span>{{scope.$index+(cleancurrentPage - 1) * cleanpagesize + 1}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="table_name" label="表名" width="180" align="center"></el-table-column>
      <el-table-column prop="table_ch_name" label="表中文名" width="180" align="center"></el-table-column>
      <el-table-column prop="compflag" label=" 字符补齐(整表清洗设置)" width="180" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.compflag" :checked="scope.row.compflag!=0"></el-checkbox>
          <span
            class="settingbtn"
            v-if="scope.row.compflag!=0"
            @click="table_zfbqFun(scope.$index,scope.row.table_id,scope.row.compflag)"
          >查看</span>
          <span
            class="settingbtn"
            v-else
            @click="table_zfbqFun(scope.$index,scope.row.table_id,scope.row.compflag)"
          >设置</span>
        </template>
      </el-table-column>
      <el-table-column prop="replaceflag" label=" 字符替换(整表清洗设置)" width="180" align="center">
        <template slot-scope="scope">
          <el-checkbox v-model="scope.row.replaceflag" :checked="scope.row.replaceflag!=0"></el-checkbox>
          <span
            class="settingbtn"
            v-if="scope.row.replaceflag!=0"
            @click="table_zfthFun(scope.$index,scope.row.table_id,scope.row.replaceflag)"
          >查看</span>
          <span
            class="settingbtn"
            v-else
            @click="table_zfthFun(scope.$index,scope.row.table_id,scope.row.replaceflag)"
          >设置</span>
        </template>
      </el-table-column>
      <el-table-column prop="trimflag" label=" 首尾去空" width="180" align="center">
        <template slot-scope="scope">
          <el-checkbox :checked="scope.row.trimflag!=0" v-model="scope.row.trimflag"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="selectCol" label="列清洗" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="info" @click="selectCol(scope.$index, scope.row)">选择列</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="clean_handleSizeChange"
      @current-change="clean_handleCurrentChange"
      :current-page="cleancurrentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="cleanpagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="cleantableData.length"
      class="locationcenter"
    ></el-pagination>
    <!-- 表-字符补齐 -->
    <el-dialog
      title="字符补齐"
      :visible.sync="dialogTable_zfbq"
      width="50%"
      class="alltable"
      @close="Table_zfbqclose()"
    >
      <el-form ref="form" :model="table_zfbq" label-width="240px" text-align="center">
        <el-form-item label="补齐方式">
          <el-radio-group v-model="table_zfbq.filling_type">
            <el-radio
              v-for="(item,index) in FillingType"
              :key="index"
              :label="item.code"
            >{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="补齐字符">
          <el-input v-model="table_zfbq.character_filling" style="width:190px"></el-input>
        </el-form-item>
        <el-form-item label="补齐长度">
          <el-input v-model="table_zfbq.filling_length" style="width:190px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Table_zfbqclose()" size="mini" type="danger">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogTable_zfbq = false;Table_zfbqsubmit()"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表-字符替换 -->
    <el-dialog
      title="字符替换"
      :visible.sync="dialogTable_zfth"
      width="50%"
      class="alltable"
      @close="Table_zfthclose()"
    >
      <el-button
        type="success"
        width="20"
        @click="addRow(table_zfth)"
        size="mini"
        class="addline"
      >新增行</el-button>
      <el-table :data="table_zfth" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="field" label="原字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.field" placeholder="原字符" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="replace_feild" label="替换后字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.replace_feild" placeholder="替换后字符" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template scope="scope">
            <el-row>
              <el-col :span="24" class="delbtn">
                <el-button
                  style="color:red"
                  type="text"
                  circle
                  @click="DelRowFun(scope.$index, table_zfth)"
                >删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Table_zfthclose()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click=" Table_zfthsubmit()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 全表清洗优先级 -->
    <el-dialog title="全表清洗优先级" :visible.sync="dialogtableClean" width="50%">
      <el-table :data="tableCleanData" border size="medium" highlight-current-row>
        <el-table-column property="SelectCol" type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="value" label="内容" align="center"></el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.$index===0"
              @click="moveUp(scope.$index,scope.row,tableCleanData)"
            >
              <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.$index===(tableCleanData.length-1)"
              @click="moveDown(scope.$index,scope.row,tableCleanData)"
            >
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogtableClean = false" type="danger" size="mini">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogtableClean = false;allTableCleanPrioritySubmitFun()"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 所有表清洗设置 -->
    <el-dialog title="所有表清洗设置" :visible.sync="dialogalltableClean" width="50%" class="alltable">
      <div class="alltablebox">
        <div class="alltabletitle">
          字符替换
          <span>(大小写敏感,替换字符只能为一个,如需多次替换请添加行 )</span>
        </div>
        <div class="alltableaddrow">
          <el-button type="success" width="20" @click="addRow(allTableCleanSettingData)">新增行</el-button>
        </div>
        <div class="TableClean">
          <el-table :data="allTableCleanSettingData" border size="medium" highlight-current-row>
            <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
            <el-table-column property="field" label="原字符" align="center">
              <template scope="scope">
                <el-input v-model="scope.row.field" placeholder="原字符" size="medium"></el-input>
              </template>
            </el-table-column>
            <el-table-column property="replace_feild" label="替换后字符" align="center">
              <template scope="scope">
                <el-input v-model="scope.row.replace_feild" placeholder="替换后字符" size="medium"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160px" align="center">
              <template scope="scope">
                <el-row>
                  <el-col :span="24" class="delbtn">
                    <el-button
                      style="color:red"
                      type="text"
                      circle
                      @click="DelRowFun(scope.$index, allTableCleanSettingData)"
                    >删除</el-button>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="alltablebox">
        <div class="alltabletitle">字符补齐</div>
        <el-form
          ref="form"
          :model="characterCompletion"
          label-width="250px"
          text-align="center"
          class="alltableform"
        >
          <el-form-item label="补齐方式">
            <el-radio-group v-model="characterCompletion.filling_type">
              <el-radio
                v-for="(item,index) in FillingType"
                :key="index"
                :label="item.code"
              >{{item.value}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="补齐字符">
            <el-input v-model="characterCompletion.character_filling" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="补齐长度">
            <el-input v-model="characterCompletion.filling_length" size="medium"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogalltableClean = false" type="danger" size="mini">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogalltableClean = false;saveAllTbCleanConfigInfo()"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列弹框 -->
    <el-dialog title="列清洗" :visible.sync="dialogColClean" width="70%" class="alltable">
      <div>
        <el-button size="mini" type="primary" @click="columnMergeFun">列合并</el-button>
        <el-button size="mini" type="success" @click="allTableOrd">整表优先级</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-table :data="colCleanData" border size="medium" highlight-current-row>
          <el-table-column property label="序号" width="60px" align="center">
            <template scope="scope">
              <span>{{scope.$index+(colClean_currentPage - 1) * colClean_pagesize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column property="colume_name" label="列名" width="120px" align="center"></el-table-column>
          <el-table-column property="colume_ch_name" label="列中文名" width="120px" align="center"></el-table-column>
          <el-table-column property="compflag" label="字符补齐" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.compflag" :checked="scope.row.compflag!=0"></el-checkbox>
              <span
                class="settingbtn"
                v-if="scope.row.compflag!=0"
                @click="zfbqFun(scope.$index,scope.row)"
              >查看</span>
              <span class="settingbtn" v-else @click="zfbqFun(scope.$index,scope.row)">设置</span>
            </template>
          </el-table-column>
          <el-table-column property="replaceflag" label="字符替换" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.replaceflag" :checked="scope.row.replaceflag!=0"></el-checkbox>
              <span
                class="settingbtn"
                v-if="scope.row.replaceflag!=0"
                @click="zfthFun(scope.$index,scope.row)"
              >查看</span>
              <span class="settingbtn" v-else @click="zfthFun(scope.$index,scope.row)">设置</span>
            </template>
          </el-table-column>
          <el-table-column property="formatflag" label="日期格式化" width="100px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.formatflag" :checked="scope.row.formatflag!=0"></el-checkbox>
              <span
                class="settingbtn"
                v-if="scope.row.formatflag!=0"
                @click="rqgshFun(scope.$index,scope.row)"
              >查看</span>
              <span class="settingbtn" v-else @click="rqgshFun(scope.$index,scope.row)">设置</span>
            </template>
          </el-table-column>
          <el-table-column property="splitflag" label="列拆分" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.splitflag" :checked="scope.row.splitflag!=0"></el-checkbox>
              <span
                class="settingbtn"
                v-if="scope.row.splitflag!=0"
                @click="colcfFun(scope.$index,scope.row)"
              >查看</span>
              <span class="settingbtn" v-else @click="colcfFun(scope.$index,scope.row)">设置</span>
            </template>
          </el-table-column>
          <el-table-column property="codevalueflag" label="码值转换" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.codevalueflag" :checked="scope.row.codevalueflag!=0"></el-checkbox>
              <span
                class="settingbtn"
                v-if="scope.row.codevalueflag!=0"
                @click="mzzhFun(scope.$index,scope.row)"
              >查看</span>
              <span class="settingbtn" v-else @click="mzzhFun(scope.$index,scope.row)">设置</span>
            </template>
          </el-table-column>
          <el-table-column property="trimflag" label="首尾去空" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.trimflag" :checked="scope.row.trimflag!=0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="清洗优先级" align="center">
            <template scope="scope">
              <el-button type="success" @click="yxjFun(scope.$index,scope.row)" size="mini">优先级调整</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="colClean_handleSizeChange"
          @current-change="colClean_handleCurrentChange"
          :current-page.sync="colClean_currentPage"
          :page-size="colClean_pagesize"
          layout="total, prev, pager, next"
          :total="colCleanData.length"
          class="locationcenter"
        ></el-pagination>
        <el-button @click="dialogColClean = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogColClean = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列-字符补齐弹框 -->
    <el-dialog
      title="字符补齐"
      :visible.sync="dialogCol_zfbq"
      width="50%"
      class="alltable"
      @close="Col_zfbqCloseFun()"
    >
      <el-form ref="form" :model="Col_zfbq" label-width="240px" text-align="center">
        <el-form-item label="补齐方式">
          <el-radio-group v-model="Col_zfbq.filling_type">
            <el-radio
              v-for="(item,index) in FillingType"
              :key="index"
              :label="item.code"
            >{{item.value}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="补齐字符">
          <el-input v-model="Col_zfbq.character_filling" style="width:190px" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="补齐长度">
          <el-input v-model="Col_zfbq.filling_length" style="width:190px" size="medium"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Col_zfbqCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="Col_zfbqSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列-字符替换弹框 -->
    <el-dialog
      title="字符替换"
      :visible.sync="dialogCol_zfth"
      width="50%"
      class="alltable"
      @close="Col_zfthCloseFun()"
    >
      <el-button type="success" size="mini" width="20" @click="addRow(Col_zfth)" class="addline">新增行</el-button>
      <el-table :data="Col_zfth" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="field" label="原字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.field" placeholder="原字符" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="replace_feild" label="替换后字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.replace_feild" placeholder="替换后字符" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template scope="scope">
            <el-row>
              <el-col :span="24" class="delbtn">
                <el-button
                  style="color:red"
                  type="text"
                  circle
                  @click="DelRowFun(scope.$index, Col_zfth)"
                >删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Col_zfthCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="Col_zfthSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列-日期格式化弹框 -->
    <el-dialog
      title="日期格式化"
      :visible.sync="dialogCol_rqgsh"
      width="50%"
      class="alltable"
      @close="Col_rqgshCloseFun()"
    >
      <el-form ref="form" :model="Col_rqgsh" label-width="240px" text-align="center">
        <el-form-item label="原格式">
          <el-input v-model="Col_rqgsh.old_format" style="width:190px" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="转换格式">
          <el-input v-model="Col_rqgsh.convert_format" style="width:190px" size="medium"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Col_rqgshCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="Col_rqgshSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--选择列-列拆分弹框  -->
    <el-dialog
      title
      :visible.sync="dialogCol_colcf"
      width="70%"
      class="alltable"
      @close="Col_colcfCloseFun()"
    >
      <div slot="title" class="header-title">
        <span class="title">列拆分(拆分的是最后的数据)&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title">
          列名称:
          <p class="topcolumename">{{columechname}}({{columename}})</p>
        </span>
      </div>
      <el-button
        type="success"
        size="mini"
        width="20"
        @click="addRow(Col_colcf)"
        class="addline"
      >新增行</el-button>
      <el-table :data="Col_colcf" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="col_name" label="字段名称" align="center" width="140px">
          <template scope="scope">
            <el-input v-model="scope.row.col_name" placeholder="字段名称" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="col_zhname" label="中文名称" align="center" width="140px">
          <template scope="scope">
            <el-input v-model="scope.row.col_zhname" placeholder="中文名称" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="split_type" label="拆分方式" align="center" width="180px">
          <template scope="scope">
            <el-select
              placeholder="选择"
              v-model="scope.row.split_type"
              style="width:150px"
              size="medium"
            >
              <el-option
                v-for="(item,index) in CharSplitType"
                :key="index"
                :label="item.value"
                :value="item.code"
              ></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column property="pyl" label="偏移量/字符拆分" align="center" width="160px">
          <template scope="scope">
            <el-input
              v-if="scope.row.split_type==1"
              v-model="scope.row.col_offset"
              placeholder="偏移量"
              size="medium"
            ></el-input>
            <div class="demo-input-suffix" v-if="scope.row.split_type==2">
              分隔符：
              <el-input placeholder="分隔符" v-model="scope.row.split_sep" size="mini"></el-input>
            </div>
            <div class="demo-input-suffix" v-if="scope.row.split_type==2">
              值位置：
              <el-input placeholder="值位置" v-model="scope.row.seq" size="mini"></el-input>
            </div>
          </template>
        </el-table-column>
        <el-table-column property="col_type" label="类型" align="center" width="140px">
          <template scope="scope">
            <el-input v-model="scope.row.col_type" placeholder="varchar(80)" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template scope="scope">
            <el-row>
              <el-col :span="24" class="delbtn">
                <el-button
                  style="color:red"
                  type="text"
                  circle
                  @click="Col_colcfDelFun(scope.$index, Col_colcf)"
                >删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Col_colcfCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="Col_colcfSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--选择列-码值转换弹框  -->
    <el-dialog title="码值转换" :visible.sync="dialogCol_mzzh" width="70%" class="alltable">
      <el-row :gutter="20">
        <el-col :span="12" :offset="1">
          <div>填写完成后请保存</div>
          <el-table :data="Col_mzzh" border size="medium" highlight-current-row>
            <el-table-column property="sysname" label="系统名称" align="center" width="200px">
              <template scope="scope">
                <el-select placeholder="选择" v-model="scope.row.sysname" size="medium">
                  <el-option label="123" value="1"></el-option>
                  <el-option label="133" value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column property="mztype" label="码值类型" align="center">
              <template scope="scope">
                <el-select placeholder="选择" v-model="scope.row.mztype" size="medium">
                  <el-option label="123" value="1"></el-option>
                  <el-option label="133" value="2"></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="9" :offset="1">
          <div>码值信息</div>
          <el-table :data="Col_mzzh2" border size="medium" highlight-current-row>
            <el-table-column property="oldmz" label="原码值" align="center" width="160px">
              <template>
                <span>原码值</span>
              </template>
            </el-table-column>
            <el-table-column property="newmz" label="新码值" align="center">
              <template>
                <span>新码值</span>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCol_mzzh = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogCol_mzzh = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--选择列-优先级调整弹框  -->
    <el-dialog title :visible.sync="dialogtableCleanOrd" width="50%" @close="Col_yxjCloseFun()">
      <div slot="title" class="header-title">
        <span class="title">清洗排序&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title">
          列名称:
          <p class="topcolumename">{{columechname}}({{columename}})</p>
        </span>
      </div>
      <el-table :data="tableCleanOrdData" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="value" label="内容" align="center"></el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.$index===0"
              @click="moveUp(scope.$index,scope.row,tableCleanOrdData)"
            >
              <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.$index===(tableCleanOrdData.length-1)"
              @click="moveDown(scope.$index,scope.row,tableCleanOrdData)"
            >
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Col_yxjCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="Col_yxjSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--整表优先级-->
    <el-dialog title :visible.sync="dialogAlltableCleanOrd" width="50%">
      <div slot="title" class="header-title">
        <span class="title">清洗排序&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title">表名:134</span>
      </div>
      <el-table :data="AlltableCleanOrdData" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="value" label="内容" align="center"></el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              :disabled="scope.$index===0"
              @click="moveUp(scope.$index,scope.row,AlltableCleanOrdData)"
            >
              <i class="el-icon-arrow-up"></i>
            </el-button>
            <el-button
              size="mini"
              :disabled="scope.$index===(AlltableCleanOrdData.length-1)"
              @click="moveDown(scope.$index,scope.row,AlltableCleanOrdData)"
            >
              <i class="el-icon-arrow-down"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAlltableCleanOrd = false;" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="AlltableCleanOrdSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 列合并 -->
    <el-dialog :visible.sync="dialogcolumnMerge" width="70%" class="alltable">
      <div slot="title" class="header-title">
        <span class="title">列合并(合并的是最后的数据)</span>
      </div>
      <el-button
        type="success"
        size="mini"
        width="20"
        @click="addRow(columnMerge)"
        class="addline"
      >新增行</el-button>
      <el-table :data="columnMerge" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column label="选择" align="center">
          <template scope="scope">
            <el-button type="success" @click="colSelectFun(scope.$index,scope.rows)" size="mini">列选择</el-button>
          </template>
        </el-table-column>
        <el-table-column property="col_name" label="列名" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.col_name" placeholder="列名" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="old_name" label="合并列名" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.old_name" placeholder="合并列名" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="col_zhname" label="合并列中文名" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.col_zhname" placeholder="合并列中文名" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="col_type" label="字段类型" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.col_type" placeholder="字段类型" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template scope="scope">
            <el-row>
              <el-col :span="24" class="delbtn">
                <el-button
                  style="color:red"
                  size="medium"
                  type="text"
                  circle
                  @click="columnMergeDelFun(scope.$index,columnMerge)"
                >删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogcolumnMerge = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="columnMergeSubmitFun()" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列 -->
    <el-dialog title="列信息" :visible.sync="dialogcolSelectData" width="70%" class="alltable">
      <el-table
        :data="colSelectData"
        border
        size="medium"
        highlight-current-row
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column property="colume_name" label="列名称" align="center">
        </el-table-column>
        <el-table-column property="colume_ch_name" label="中文名" align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="colSelect_handleSizeChange"
        @current-change="colSelect_handleCurrentChange"
        :current-page.sync="colSelect_currentPage"
        :page-size="colSelect_pagesize"
        layout="total, prev, pager, next"
        :total="colSelectData.length"
        class="locationcenter"
      ></el-pagination>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogcolSelectData = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogcolSelectData= false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import { parse } from "path";
export default {
  props: ["steps0data"],
  data() {
    return {
      dialogtableClean: false,
      dialogalltableClean: false,
      dialogTable_zfbq: false,
      dialogTable_zfth: false,
      dialogColClean: false,
      dialogCol_zfbq: false,
      dialogCol_zfth: false,
      dialogCol_rqgsh: false,
      dialogCol_colcf: false,
      dialogCol_mzzh: false,
      dialogtableCleanOrd: false,
      dialogAlltableCleanOrd: false,
      dialogcolumnMerge: false,
      dialogcolSelectData: false,
      colClean_currentPage: 1,
      colClean_pagesize: 10,
      colSelect_currentPage: 1,
      colSelect_pagesize: 5,
      cleantableData: [
        {
          compflag: 0,
          replaceflag: 0,
          trimflag: 0
        }
      ],
      cleancurrentPage: 1,
      cleanpagesize: 5,
      priorityData: [],
      tableCleanData: [],
      allTableCleanSettingData: [
        {
          field: "",
          replace_feild: ""
        }
      ],
      characterCompletion: {
        filling_type: "",
        character_filling: "",
        filling_length: ""
      },
      table_zfbq: {
        filling_type: "",
        character_filling: "",
        filling_length: ""
      },
      Col_zfbq: {
        filling_type: "",
        character_filling: "",
        filling_length: ""
      },
      Col_zfth: [
        {
          field: "",
          replace_feild: ""
        }
      ],
      table_zfth: [
        {
          field: "",
          replace_feild: ""
        }
      ],
      Col_rqgsh: {
        old_format: "",
        convert_format: ""
      },
      Col_colcf: [
        {
          col_name: "",
          col_zhname: "",
          split_type: "",
          col_offset: "",
          seq: "",
          split_sep: "",
          col_type: ""
        }
      ],
      Col_mzzh: [
        {
          sysname: "",
          mztype: ""
        }
      ],
      Col_mzzh2: [
        {
          oldmz: "",
          newmz: ""
        }
      ],
      colCleanData: [
        {
          colume_name: "",
          colume_ch_name: "",
          compflag: "",
          replaceflag: "",
          formatflag: "",
          splitflag: "",
          codevalueflag: "",
          trimflag: ""
        }
      ],
      tableCleanOrdData: [
        {
          tableCleanOrdCon: "1"
        },
        {
          tableCleanOrdCon: "1"
        }
      ],
      AlltableCleanOrdData: [],
      columnMerge: [],
      colSelectData: [
      ],
      databaseId: "",
      FillingType: [],
      changecheck: null,
      index: null,
      colSetid: null,
      cleanord: [
        {
          complement: 1,
          replacement: 2,
          formatting: 3,
          conversion: 4,
          merge: 5,
          split: 6,
          trim: 7
        }
      ],
      columnid: null,
      columnindex: null,
      columechname: "",
      columename: "",
      CharSplitType: [],
      tableid: ""
    };
  },
  mounted() {
    this.cleantableDataFun();
    let params = {};
    params["category"] = "FillingType";
    addTaskAllFun.getCategoryItems(params).then(res => {
      this.FillingType = res.data;
    });
    this.priorityDataFun();
  },
  methods: {
    clean_handleSizeChange(size) {
      this.cleanpagesize = size;
    },
    clean_handleCurrentChange(currentPage) {
      this.cleancurrentPage = currentPage;
    },
    // 获取所有数据显示
    cleantableDataFun() {
      this.databaseId = this.steps0data[0].database_id;
      let params = {};
      params["colSetId"] = this.databaseId;
      addTaskAllFun.getCleanConfInfo(params).then(res => {
        this.cleantableData = res.data;
      });
    },
    //所有表清洗设置显示数据
    alltableClean(id) {
      this.colSetid = id;
      let params = {};
      params["colSetId"] = id;
      // 字符替换
      addTaskAllFun.getAllTbCleanReplaceInfo(params).then(res => {
        this.allTableCleanSettingData = res.data;
      });
      // 字符补齐
      addTaskAllFun.getAllTbCleanCompInfo(params).then(res => {
        this.characterCompletion = res.data[0];
      });
    },
    // 所有表清洗设置确定提交
    saveAllTbCleanConfigInfo() {
      var all = JSON.parse(JSON.stringify(this.allTableCleanSettingData));
      var arr1 = [];
      var arr2 = [];
      for (var i = 0; i < all.length; i++) {
        for (var j in all[i]) {
          console.log(j, typeof j);
          if (j == "field") {
            arr1.push(all[i][j]);
          } else if (j == "replace_feild") {
            arr2.push(all[i][j]);
          }
        }
      }
      let params = {};
      params["oriFieldArr"] = arr1;
      params["replaceFeildArr"] = arr2;
      params["compChar"] = this.characterCompletion.character_filling;
      params["compLen"] = this.characterCompletion.filling_length;
      params["compType"] = this.characterCompletion.filling_type;
      params["colSetId"] = this.colSetid;
      params["replaceFlag"] = this.allTableCleanSettingData == "" ? "0" : "1";
      params["compFlag"] = this.characterCompletion == "" ? "0" : "1";
      addTaskAllFun.saveAllTbCleanConfigInfo(params).then(res => {
        message.saveSuccess(res);
        this.colSetid = null;
      });
    },
    // 全表清洗优先级
    allTableCleanPriorityFun(id) {
      this.colSetid = id;
      this.tableCleanData = this.priorityData;
    },
    // 优先级默认显示数据
    priorityDataFun() {
      let params = {};
      params["category"] = "CleanType";
      addTaskAllFun.getCategoryItems(params).then(res => {
        this.priorityData = res.data;
      });
    },
    // 全表清洗优先级确定提交
    allTableCleanPrioritySubmitFun() {
      let alltable = JSON.parse(JSON.stringify(this.cleantableData));
      let ordarr = JSON.parse(JSON.stringify(this.tableCleanData));
      let arr = [];
      for (var i = 0; i < alltable.length; i++) {
        for (var j in alltable[i]) {
          if (j == "table_id") {
            arr.push(alltable[i][j]);
          }
        }
      }
      let ord = JSON.parse(JSON.stringify(this.cleanord));
      ord[0].complement = ordarr[0].code;
      ord[0].replacement = ordarr[1].code;
      ord[0].formatting = ordarr[2].code;
      ord[0].conversion = ordarr[3].code;
      ord[0].merge = ordarr[4].code;
      ord[0].split = ordarr[5].code;
      ord[0].trim = ordarr[6].code;
      let params = {};
      params["sort"] = ord[0];
      params["tableIds"] = arr;
      console.log(params);
      addTaskAllFun.saveAllTbCleanOrder(params).then(res => {
        console.log(res);
      });
    },
    // 优先级排序sort
    // priorityOrdSortFun(){
    // }
    //
    colClean_handleSizeChange(size) {
      this.colClean_pagesize = size;
    },
    colClean_handleCurrentChange(currentPage) {
      this.colClean_currentPage = currentPage;
    },
    colSelect_handleSizeChange(size) {
      this.colSelect_pagesize = size;
    },
    colSelect_handleCurrentChange(currentPage) {
      this.colSelect_currentPage = currentPage;
    },
    //上移
    moveUp(index, row, tableData) {
      if (index > 0) {
        let upDate = tableData[index - 1];
        tableData.splice(index - 1, 1);
        tableData.splice(index, 0, upDate);
      } else {
        alert("已经是第一条，不可上移");
      }
    },
    //下移
    moveDown(index, row, tableData) {
      if (index + 1 === tableData.length) {
        alert("已经是最后一条，不可下移");
      } else {
        let downDate = tableData[index + 1];
        tableData.splice(index + 1, 1);
        tableData.splice(index, 0, downDate);
      }
    },
    //新增行
    addRow(tableData, event) {
      tableData.push({
        field: "",
        replace_feild: ""
      });
    },
    //删除
    DelRowFun(index, rows) {
      rows.splice(index, 1);
    },
    // 表选择列点击
    selectCol(index, row) {
      console.log(row);
      this.dialogColClean = true;
      let id = row.table_id;
      this.selectColPageFun(id);
    },
    // 选择列弹框出现翻页渲染
    selectColPageFun(id) {
      this.tableid = id;
      let params = {};
      params["tableId"] = id;
      params["currPage"] = this.colClean_currentPage;
      params["pageSize"] = this.colClean_pagesize;
      console.log(params)
      addTaskAllFun.getColumnInfo(params).then(res => {
        this.colCleanData = res.data;
        console.log(res)
      });
    },
    //表字符补齐显示
    table_zfbqFun(index, tableid, compflags) {
      this.dialogTable_zfbq = true;
      //  清楚字符弹框数据
      this.table_zfbq.filling_type = "";
      this.table_zfbq.character_filling = "";
      this.table_zfbq.filling_length = "";
      if (compflags != 0) {
        let params = {};
        params["tableId"] = tableid;
        addTaskAllFun.getTbCompletionInfo(params).then(res => {
          if (res.data[0]) {
            this.table_zfbq = res.data[0];
          }
        });
      }
      this.changecheck = compflags;
      this.index = index;
    },
    // 点击表字符补齐取消按钮事件
    Table_zfbqclose() {
      this.dialogTable_zfbq = false;
      if (this.changecheck) {
        this.cleantableData[this.index].compflag = true;
        this.index = null;
        this.changecheck = null;
      } else {
        this.cleantableData[this.index].compflag = false;
        this.index = null;
        this.changecheck = null;
      }
    },
    // 点击表字符补齐提交确定按钮
    Table_zfbqsubmit() {
      let params = {};
      params["character_filling"] = this.table_zfbq.character_filling;
      params["filling_length"] = this.table_zfbq.filling_length;
      params["filling_type"] = this.table_zfbq.filling_type;
      params["table_id"] = this.cleantableData[this.index].table_id;
      addTaskAllFun.saveSingleTbCompletionInfo(params).then(res => {
        message.saveSuccess(res);
        this.cleantableData[this.index].compflag = true;
        this.index = null;
        this.changecheck = null;
      });
    },
    // 点击表字符替换显示弹框
    table_zfthFun(index, tableid, compflags) {
      this.dialogTable_zfth = true;
      if (compflags != 0 || compflags) {
        console.log(compflags, 111);
        let params = {};
        params["tableId"] = tableid;
        console.log(params);
        addTaskAllFun.getSingleTbReplaceInfo(params).then(res => {
          this.table_zfth = res.data;
          console.log(res.data);
        });
      }
      this.changecheck = compflags;
      this.index = index;
    },
    // 点击表字符替换取消按钮事件
    Table_zfthclose() {
      this.dialogTable_zfth = false;
      if (this.changecheck) {
        this.cleantableData[this.index].replaceflag = true;
        this.index = null;
        this.changecheck = null;
      } else {
        this.cleantableData[this.index].replaceflag = false;
        this.index = null;
        this.changecheck = null;
      }
    },
    // 点击表字符替换提交确定按钮
    Table_zfthsubmit() {
      this.dialogTable_zfth = false;
      let params = {};
      params["replaceString"] = JSON.stringify(this.table_zfth);
      params["tableId"] = this.cleantableData[this.index].table_id;
      console.log(params);
      addTaskAllFun.saveSingleTbReplaceInfo(params).then(res => {
        message.saveSuccess(res);
        this.cleantableData[this.index].replaceflag = true;
        this.index = null;
        this.changecheck = null;
      });
    },
    // 列清洗-字符补齐方法
    zfbqFun(index, row) {
      this.dialogCol_zfbq = true;
      this.columnid = row.column_id;
      this.columnindex = index;
      if (row.compflag != 0) {
        let params = {};
        params["columnId"] = row.column_id;
        addTaskAllFun.getColCompletionInfo(params).then(res => {
          this.Col_zfbq = res.data[0];
        });
      }
    },
    Col_zfbqCloseFun() {
      this.dialogCol_zfbq = false;
      this.columnid = null;
      this.columnindex = null;
      this.Col_zfbq.filling_type = "";
      this.Col_zfbq.character_filling = "";
      this.Col_zfbq.filling_length = "";
    },
    Col_zfbqSubmitFun() {
      this.dialogCol_zfbq = false;
      let params = {};
      params["column_id"] = this.columnid;
      params["character_filling"] = this.Col_zfbq.character_filling;
      params["filling_length"] = this.Col_zfbq.filling_length;
      params["filling_type"] = this.Col_zfbq.filling_type;
      addTaskAllFun.saveColCompletionInfo(params).then(res => {
        message.saveSuccess(res);
        this.colCleanData[this.columnindex].compflag = true;
        this.columnid = null;
        this.columnindex = null;
        this.Col_zfbq.filling_type = "";
        this.Col_zfbq.character_filling = "";
        this.Col_zfbq.filling_length = "";
      });
    },
    // 列清洗-字符替换方法
    zfthFun(index, row) {
      this.dialogCol_zfth = true;
      this.columnid = row.column_id;
      this.columnindex = index;
      if (row.replaceflag != 0) {
        let params = {};
        params["columnId"] = row.column_id;
        addTaskAllFun.getColReplaceInfo(params).then(res => {
          this.Col_zfth = res.data;
          console.log(res);
        });
      }
    },
    Col_zfthCloseFun() {
      this.dialogCol_zfth = false;
      this.columnid = null;
      this.columnindex = null;
      this.Col_zfth = [];
    },
    Col_zfthSubmitFun() {
      this.dialogCol_zfth = false;
      let arr = [];
      let list = this.Col_zfth;
      let a = this.columnindex;
      list.map((item, index) => {
        arr.push(
          Object.assign({}, item, { clean_type: "2", column_id: this.columnid })
        );
      });
      let params = {};
      params["columnId"] = this.columnid;
      params["replaceString"] = JSON.stringify(arr);
      addTaskAllFun.saveColReplaceInfo(params).then(res => {
        message.saveSuccess(res);
        this.colCleanData[a].replaceflag = true;
        this.columnid = null;
        this.columnindex = null;
        this.Col_zfth = [];
      });
    },
    //列清洗-日期格式化方法
    rqgshFun(index, row) {
      this.dialogCol_rqgsh = true;
      this.columnid = row.column_id;
      this.columnindex = index;
      if (row.formatflag != 0) {
        let params = {};
        params["columnId"] = row.column_id;
        addTaskAllFun.getDateFormatInfo(params).then(res => {
          this.Col_rqgsh = res.data[0];
        });
      }
    },
    Col_rqgshCloseFun() {
      this.dialogCol_rqgsh = false;
      this.columnid = null;
      this.columnindex = null;
      this.Col_rqgsh.old_format = "";
      this.Col_rqgsh.convert_format = "";
    },
    Col_rqgshSubmitFun() {
      this.dialogCol_rqgsh = false;
      let a = this.columnindex;
      let params = {};
      params["column_id"] = this.columnid;
      params["old_format"] = this.Col_rqgsh.old_format;
      params["convert_format"] = this.Col_rqgsh.convert_format;
      addTaskAllFun.saveDateFormatInfo(params).then(res => {
        message.saveSuccess(res);
        this.colCleanData[a].formatflag = true;
        this.columnid = null;
        this.columnindex = null;
        this.Col_rqgsh.old_format = "";
        this.Col_rqgsh.convert_format = "";
      });
    },
    //列清洗-列拆分方法
    colcfFun(index, row) {
      this.columechname = row.colume_ch_name;
      this.columename = row.colume_name;
      this.dialogCol_colcf = true;
      this.columnid = row.column_id;
      this.columnindex = index;
      if (row.splitflag != 0) {
        let params = {};
        params["columnId"] = row.column_id;
        addTaskAllFun.getColSplitInfo(params).then(res => {
          this.Col_colcf = res.data;
          console.log(res.data, 1);
        });
      }
      let params1 = {};
      params1["category"] = "CharSplitType";
      addTaskAllFun.getCategoryItems(params1).then(res => {
        this.CharSplitType = res.data;
      });
    },
    Col_colcfCloseFun() {
      this.dialogCol_colcf = false;
      this.columnid = null;
      this.columnindex = null;
      this.Col_colcf = [];
    },
    Col_colcfSubmitFun() {
      this.dialogCol_colcf = false;
      let a = this.columnindex;
      let params = {};
      params["column_id"] = this.columnid;
      params["tableId"] = this.tableid;
      if (this.Col_colcf[0].col_clean_id) {
        params["col_clean_id"] = this.Col_colcf[0].col_clean_id;
      }
      params["columnSplitString"] = JSON.stringify(this.Col_colcf);
      addTaskAllFun.saveColSplitInfo(params).then(res => {
        message.saveSuccess(res);
        this.colCleanData[a].splitflag = true;
        this.columnid = null;
        this.columnindex = null;
        this.Col_colcf = [];
      });
    },
    Col_colcfDelFun(index, rows) {
      let params = {};
      params["colCleanId"] = rows[index].col_clean_id;
      params["colSplitId"] = rows[index].col_split_id;
      addTaskAllFun.deleteColSplitInfo(params).then(res => {
        rows.splice(index, 1);
        message.deleteSuccess(res);
      });
    },
    //列清洗-码值转换方法
    mzzhFun(index, row) {
      this.dialogCol_mzzh = true;
    },
    //列清洗-优先级调整
    yxjFun(index, row) {
      this.dialogtableCleanOrd = true;
      this.columechname = row.colume_ch_name;
      this.columename = row.colume_name;
      this.columnid = row.column_id;
      this.tableCleanOrdData = this.priorityData;
    },
    Col_yxjCloseFun() {
      this.dialogtableCleanOrd = false;
    },
    Col_yxjSubmitFun() {
      this.dialogtableCleanOrd = false;
      let ordarr = JSON.parse(JSON.stringify(this.tableCleanOrdData));
      let ord = JSON.parse(JSON.stringify(this.cleanord));
      ord[0].complement = ordarr[0].code;
      ord[0].replacement = ordarr[1].code;
      ord[0].formatting = ordarr[2].code;
      ord[0].conversion = ordarr[3].code;
      ord[0].merge = ordarr[4].code;
      ord[0].split = ordarr[5].code;
      ord[0].trim = ordarr[6].code;
      let params = {};
      params["columnId"] = this.columnid;
      params["sort"] = ord[0];
      addTaskAllFun.saveColCleanOrder(params).then(res => {
        message.saveSuccess(res);
        console.log("列清洗优先级显示有问题");
      });
    },
    //列清洗-整表优先级
    allTableOrd() {
      this.dialogAlltableCleanOrd = true;
      this.AlltableCleanOrdData = this.priorityData;
    },
    //列清洗-整表优先级提交
    AlltableCleanOrdSubmitFun() {
      // saveSingleTbCleanOrder  调整接口中
    },
    // 列清洗-列合并
    columnMergeFun() {
      this.dialogcolumnMerge = true;
      // getColMergeInfo
      let params = {};
      params["tableId"] = this.tableid;
      addTaskAllFun.getColMergeInfo(params).then(res => {
        console.log(res);
        this.columnMerge = res.data;
      });
    },
    columnMergeSubmitFun() {
      this.dialogcolumnMerge = false;
      let params = {};
      params["tableId"] = this.tableid;
      params["columnMergeString"] = JSON.stringify(this.columnMerge);
      addTaskAllFun.saveColMergeInfo(params).then(res => {
        console.log(res);
      });
    },
    columnMergeDelFun(index, rows) {
      let params = {};
      params["colMergeId"] = rows[index].col_merge_id;
      addTaskAllFun.deleteColMergeInfo(params).then(res => {
        rows.splice(index, 1);
        message.deleteSuccess(res);
      });
    },
    colSelectFun(index, row) {
      this.dialogcolSelectData = true;
       let params = {};
      params["tableId"] = this.tableid;
      params["currPage"] = this.colSelect_currentPage;
      params["pageSize"] = this.colSelect_pagesize;
      addTaskAllFun.getColumnInfo(params).then(res => {
        this.colSelectData = res.data;
        console.log(res)
      });
    }
  }
};
</script>
<style scoped>
.cleanbtn {
  width: 100%;
  background: #f3f1f1;
  padding: 10px 0;
  overflow: hidden;
  position: relative;
}
.cleanbtn > button {
  float: right;
  margin: 0 10px;
}
.locationcenter {
  text-align: center;
  margin-top: 5px;
}
.alltablebox {
  min-height: 20px;
  margin: 5px 0;
}
.alltabletitle {
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  padding-left: 5px;
  border: 1px solid #eae8e8;
  box-sizing: border-box;
  border-bottom: 0;
}
.alltabletitle > span {
  font-size: 14px;
  color: #d86b6b;
}
.alltableform {
  border: 1px solid #eae8e8;
}
.alltablebox >>> .el-input__inner {
  width: 160px;
}
.alltable >>> .el-dialog__body {
  padding: 0 20px;
}
.alltablebox {
  padding: 10px;
}
.alltableaddrow {
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  padding-left: 5px;
  border: 1px solid #eae8e8;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 0;
  margin: 0;
}
.alltableaddrow .el-button {
  height: 28px;
  line-height: 20px;
  padding: 0;
  width: 64px;
}
.TableClean {
  padding: 15px 15px;
  border: 1px solid #eae8e8;
}
.addline {
  margin: 5px 0;
}
.settingbtn {
  color: #409eff;
  margin-left: 10px;
  font-size: 14px;
  font-weight: bold;
}
.topcolumename {
  display: inline-block;
  background: #f3eded;
  color: #ec0b35;
  padding: 2px;
}
.demo-input-suffix {
  margin: 2px 0;
}
.demo-input-suffix > .el-input--mini {
  font-size: 12px;
  width: 70px !important;
}
</style>