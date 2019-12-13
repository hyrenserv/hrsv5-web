<template>
  <div>
    <Step :active="active"></Step>
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
        <template slot="header">
          <el-checkbox
            @change="handleCheckAllChange(cleantableData,checkAll)"
            v-model="checkAll"
            :checked="checkAll"
          >
            <span class="allclickColor">首尾去空</span>
          </el-checkbox>
        </template>
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
        <el-form-item label="补齐字符" :rules="rule.default">
          <el-input v-model="table_zfbq.character_filling" style="width:190px"></el-input>
        </el-form-item>
        <el-form-item label="补齐长度" :rules="rule.default">
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
          <el-form-item label="补齐字符" :rules="rule.default">
            <el-input v-model="characterCompletion.character_filling" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="补齐长度" :rules="rule.default">
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
    <el-dialog
      title="列清洗"
      :visible.sync="dialogColClean"
      width="70%"
      class="alltable"
      @close="selectColCloseFun()"
    >
      <div>
        <el-button size="mini" type="primary" @click="columnMergeFun">列合并</el-button>
        <el-button size="mini" type="success" @click="allTableOrd">整表优先级</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-table
          :data="colCleanData.slice((colClean_currentPage - 1) * colClean_pagesize, colClean_currentPage * colClean_pagesize)"
          border
          size="medium"
          highlight-current-row
        >
          <el-table-column property label="序号" width="60px" align="center">
            <template scope="scope">
              <span>{{scope.$index+(colClean_currentPage - 1) * colClean_pagesize + 1}}</span>
            </template>
          </el-table-column>
          <el-table-column property="colume_name" label="列名" width="100px" align="center"></el-table-column>
          <el-table-column property="colume_ch_name" label="列中文名" width="100px" align="center"></el-table-column>
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
          <el-table-column
            property="replaceflag"
            label="字符替换"
            width="80px"
            align="center"
            :reserve-selection="true"
          >
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
              <el-checkbox
                v-model="scope.row.codevalueflag"
                :value="scope.row.codevalueflag!=0"
                :checked="scope.row.codevalueflag!=0"
              ></el-checkbox>
              <span
                class="settingbtn"
                v-if="scope.row.codevalueflag!=0"
                @click="mzzhFun(scope.$index,scope.row)"
              >查看</span>
              <span class="settingbtn" v-else @click="mzzhFun(scope.$index,scope.row)">设置</span>
            </template>
          </el-table-column>
          <el-table-column property="trimflag" label="" class="is-checked" align="center">
            <template slot="header" slot-scope="scope">
              <el-checkbox
                @change="handleCheckAllChange(colCleanData,colcheckAll)"
                v-model="colcheckAll"
                :checked="colcheckAll"
              >
                <span class="allclickColor">首尾去空</span>
              </el-checkbox>
            </template>
            <template scope="scope">
              <el-checkbox v-model="scope.row.trimflag" :checked="scope.row.trimflag!=0"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="清洗优先级" align="center" width="120">
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
        <el-button @click="dialogColClean = false;selectColCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="selectColSubmitFun()" size="mini">确 定</el-button>
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
        <el-form-item label="补齐字符" :rules="rule.default">
          <el-input v-model="Col_zfbq.character_filling" style="width:190px" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="补齐长度" :rules="rule.default">
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
      <el-button
        type="success"
        size="mini"
        width="20"
        @click="Col_zfthaddRow(Col_zfth)"
        class="addline"
      >新增行</el-button>
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
        <el-form-item label="原格式" :rules="rule.default">
          <el-input v-model="Col_rqgsh.old_format" style="width:190px" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="转换格式" :rules="rule.default">
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
        @click="Col_colcfaddRow(Col_colcf)"
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
    <el-dialog
      title="码值转换"
      :visible.sync="dialogCol_mzzh"
      width="70%"
      class="alltable"
      @close="Col_mzzhCloseFun()"
    >
      <el-row :gutter="20">
        <el-col :span="12" :offset="1">
          <div class="topcolumename">填写完成后请保存</div>
          <el-table :data="Col_mzzh" border size="medium" highlight-current-row>
            <el-table-column property="sysname" label="系统名称" align="center" width="200px">
              <template scope="scope">
                <el-select
                  placeholder="选择系统名称"
                  v-model="scope.row.orig_sys_name"
                  size="medium"
                  @change="Col_mzzh_currentSel"
                >
                  <el-option lablr="选择系统名称" value="选择系统名称"></el-option>
                  <el-option
                    :label="item.orig_sys_name+'('+item.orig_sys_code+')'"
                    :value="item.orig_sys_name+'('+item.orig_sys_code+')'"
                    v-for="(item,index) in CodeSysName"
                    :key="index"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
            <el-table-column property="mztype" label="码值类型" align="center">
              <template scope="scope">
                <el-select
                  placeholder="选择系统类型"
                  v-model="scope.row.code_classify"
                  size="medium"
                  @change="Col_mzzh_currentclass"
                >
                  <el-option lablr="选择系统类型" value="选择系统类型"></el-option>
                  <el-option
                    :label="item.code_classify"
                    :value="item.code_classify"
                    v-for="(item,index) in col_mzzhclass"
                    :key="index"
                  ></el-option>
                </el-select>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="9" :offset="1">
          <div class="topcolumename">码值信息</div>
          <el-table
            :data="Col_mzzh2.slice((colmzzh_currentPage - 1) * colmzzh_pagesize, colmzzh_currentPage * colmzzh_pagesize)"
            border
            size="medium"
            highlight-current-row
          >
            <el-table-column property="orig_value" label="原码值" align="center" width="160px"></el-table-column>
            <el-table-column property="code_value" label="新码值" align="center"></el-table-column>
          </el-table>
          <el-pagination
            @size-change="colmzzh_handleSizeChange"
            @current-change="colmzzh_handleCurrentChange"
            :current-page.sync="colmzzh_currentPage"
            :page-size="colmzzh_pagesize"
            layout="total, prev, pager, next"
            :total="Col_mzzh2.length"
            class="locationcenter"
          ></el-pagination>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Col_mzzhCloseFun()" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="Col_mzzhSubmitFun()" size="mini">确 定</el-button>
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
        <span class="title">
          表名:
          <p class="topcolumename">{{tablechname}}({{tablename}})</p>
        </span>
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
        @click="columnMerge_addRow(columnMerge)"
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
            <el-input
              v-model="scope.row.col_name"
              disabled
              :title="scope.row.col_name"
              placeholder="列名"
              size="medium"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column property="old_name" label="合并列名" align="center">
          <template scope="scope">
            <el-input
              v-model="scope.row.old_name"
              :title="scope.row.old_name"
              placeholder="合并列名"
              size="medium"
            ></el-input>
          </template>
        </el-table-column>
        <el-table-column property="col_zhname" label="合并列中文名" align="center">
          <template scope="scope">
            <el-input
              v-model="scope.row.col_zhname"
              :title="scope.row.col_zhname"
              placeholder="合并列中文名"
              size="medium"
            ></el-input>
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
        :data="colSelectData.slice((colSelect_currentPage - 1) * colSelect_pagesize, colSelect_currentPage * colSelect_pagesize)"
        border
        size="medium"
        highlight-current-row
        @selection-change="changeFun"
        ref="multipleTable"
        :row-key="getRowKey"
      >
        <el-table-column type="selection" :reserve-selection="true" width="55" align="center"></el-table-column>
        <el-table-column property="colume_name" label="列名称" align="center"></el-table-column>
        <el-table-column property="colume_ch_name" label="中文名" align="center"></el-table-column>
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
        <el-button
          type="primary"
          @click="dialogcolSelectData= false;colSelectSubmitFun()"
          size="mini"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-button type="primary" size="medium" class="leftbtn" @click="pre()">上一步</el-button>
    <el-button type="primary" size="medium" class="rightbtn" @click="next()">下一步</el-button>
  </div>
</template>
<script>
import * as validator from "@/utils/js/validator";
import regular from "@/utils/js/regular";
import * as addTaskAllFun from "./addTask";
import * as message from "@/utils/js/message";
import Step from "./step";
import { parse } from "path";
export default {
  components: {
    Step
  },
  data() {
    return {
      active: 2,
      rule: validator.default,
      checkAll: false,
      colcheckAll: false,
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
      colmzzh_currentPage: 1,
      colmzzh_pagesize: 5,
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
      Col_colcf: [],
      Col_mzzh: [
        {
          orig_sys_name: "",
          code_classify: ""
        }
      ],
      Col_mzzh2: [],
      colCleanData: [],
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
      colSelectData: [],
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
      tableid: "",
      multipleSelection: [],
      colindex: 0,
      col_namstr: "",
      tablechname: "",
      tablename: "",
      CodeSysName: [],
      col_mzzhclass: [],
      codeopt: "",
      dbid: null,
      aId: null,
      sourId: null,
      sName: null
    };
  },
  created() {
    this.dbid = this.$route.query.id;
    this.aId = this.$route.query.aId;
    this.sourId = this.$route.query.sourId;
    this.sName = this.$route.query.sName;
  },
  mounted() {
     // 获取进入页面的总数据
    if (this.$route.query.edit == "yes") {
    this.cleantableDataFun();
    }
    let params = {};
    params["category"] = "FillingType";
    addTaskAllFun.getCategoryItems(params).then(res => {
      this.FillingType = res.data;
    });
    this.priorityDataFun();
  },
  methods: {
    getRowKey(row){
      return row.column_id
    },
    next() {
      let tbCleanString = this.dataCleanConfigFun();
         let data={}
      if(this.$route.query.edit=='yes'){
         data={
          aId: this.$route.query.aId,
          id: this.dbid,
          sourId:this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit:'yes'
        }
      }
      else{
         data={
          id: this.dbid,
        }
      }
      let params = {};
      params["tbCleanString"] = JSON.stringify(tbCleanString);
      params["colSetId"] = this.databaseId;
      addTaskAllFun.saveDataCleanConfig(params).then(res => {
        this.dbid = res.data;
        this.$router.push({
          path: "/dbaddTasksteps04",
          query: data
        });
      });
    },
    pre() {
         let data={}
      if(this.$route.query.edit=='yes'){
         data={
          aId: this.$route.query.aId,
          id: this.$route.query.id,
          sourId:this.$route.query.sourId,
          sName: this.$route.query.sName,
          edit:'yes'
        }
      }
      else{
         data={
          id: this.$route.query.id,
        }
      }
      this.$router.push({
        path: "/dbaddTasksteps02",
        query:data
      });
    },
    dataCleanConfigFun() {
      let arr = JSON.parse(JSON.stringify(this.cleantableData));
      let arr3 = [];
      let json = {
        tableId: "",
        tableName: "",
        complementFlag: "",
        replaceFlag: "",
        trimFlag: ""
      };
      for (let i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
          if (key == "table_id") {
            json.tableId = arr[i][key];
          } else if (key == "compflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            } else if (arr[i][key] == "1") {
              arr[i][key] = true;
            }
            json.complementFlag = arr[i][key];
          } else if (key == "table_name") {
            json.tableName = arr[i][key];
          } else if (key == "replaceflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            } else if (arr[i][key] == "1") {
              arr[i][key] = true;
            }
            json.replaceFlag = arr[i][key];
          } else if (key == "trimflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            } else if (arr[i][key] == "1") {
              arr[i][key] = true;
            }
            json.trimFlag = arr[i][key];
          }
        }
        arr3.push(JSON.parse(JSON.stringify(json)));
      }
      return arr3;
    },
    handleCheckAllChange(items, e) {
      items.forEach((item, i) => {
        if (e) {
          item.trimflag = true;
        } else {
          item.trimflag = false;
        }
      });
    },
    clean_handleSizeChange(size) {
      this.cleanpagesize = size;
    },
    clean_handleCurrentChange(currentPage) {
      this.cleancurrentPage = currentPage;
    },
    // 获取所有数据显示
    cleantableDataFun() {
      this.databaseId = this.dbid;
      let params = {};
      params["colSetId"] = this.databaseId;
      addTaskAllFun.getCleanConfInfo(params).then(res => {
        this.cleantableData = res.data;
        console.log(res.data)
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
      let params = {};
      params["colSetId"] = this.colSetid;
      addTaskAllFun.getAllTbCleanOrder(params).then(res => {
        if (res.data[0].cp_or) {
          let data = JSON.parse(res.data[0].cp_or);
          this.tableCleanData = this.changeDataPriorFun(data);
        } else {
          this.tableCleanData = this.priorityData;
        }
      });
    },
    // 优先级获取数据转换
    changeDataPriorFun(data) {
      let arr = [];
      for (let key in data) {
        console.log()
        arr.push({ code: key, order: data[key] });
        arr.forEach(item => {
          this.priorityData.forEach(items=>{
            if(item.code==items.code){
             item.value=items.value
            }
          })
          /* if (item.value == "complement") {
            item.value = "字符补齐";
          } else if (item.value == "replacement") {
            item.value = "字符替换";
          } else if (item.value == "formatting") {
            item.value = "日期格式化";
          } else if (item.value == "conversion") {
            item.value = "码值转换";
          } else if (item.value == "merge") {
            item.value = "列合并";
          } else if (item.value == "split") {
            item.value = "列拆分";
          } else if (item.value == "trim") {
            item.value = "字符trim";
          } */
        });
      }
      return arr;
    },
    // 优先级默认显示数据
    priorityDataFun() {
      let params = {};
      params["category"] = "CleanType";
      addTaskAllFun.getCategoryItems(params).then(res => {
        this.priorityData = res.data;
        console.log(res.data)
      });
    },
    // 全表清洗优先级确定提交
    allTableCleanPrioritySubmitFun() {
      let ordarr = JSON.parse(JSON.stringify(this.tableCleanData));
      let params = {};
      params["sort"] = eval("(" + this.priSubmitFun(ordarr) + ")");
      params["colSetId"] = this.colSetid;
      addTaskAllFun.saveAllTbCleanOrder(params).then(res => {
        message.saveSuccess(res);
      });
    },
    // 优先级提交数据转换
    priSubmitFun(ordarr) {
      let str = "";
      ordarr.forEach((item, i) => {
        if (item.value == "字符补齐") {
          item.value = "complement";
        } else if (item.value == "字符替换") {
          item.value = "replacement";
        } else if (item.value == "日期格式化") {
          item.value = "formatting";
        } else if (item.value == "码值转换") {
          item.value = "conversion";
        } else if (item.value == "列合并") {
          item.value = "merge";
        } else if (item.value == "列拆分") {
          item.value = "split";
        } else if (item.value == "字符trim") {
          item.value = "trim";
        }
        if (ordarr.length > 0) {
          if (i == 0) {
            str += "{" + item.value + ":" + item.code;
          } else if (i == ordarr.length - 1) {
            str += "," + item.value + ":" + item.code + "}";
          } else {
            str += "," + item.value + ":" + item.code;
          }
        } else {
          str += "{" + item.value + ":" + item.code + "}";
        }
      });
      return str;
    },
    colClean_handleSizeChange(size) {
      this.colClean_pagesize = size;
    },
    colClean_handleCurrentChange(currentPage) {
      this.colClean_currentPage = currentPage;
      let id = this.tableid;
      this.selectColPageFun(id);
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
    //删除
    DelRowFun(index, rows) {
      rows.splice(index, 1);
    },
    // 表选择列点击
    selectCol(index, row) {
      this.tablechname = row.table_ch_name;
      this.tablename = row.table_name;
      this.dialogColClean = true;
      let id = row.table_id;
      this.selectColPageFun(id);
    },
    // 选择列弹框出现翻页渲染
    selectColPageFun(id) {
      this.tableid = id;
      let params = {};
      params["tableId"] = id;
      addTaskAllFun.getColumnInfo(params).then(res => {
        if (res.data.totalSize != 0) {
          this.colCleanData = res.data;
        }
      });
    },
    selectColCloseFun() {
      this.dialogColClean = false;
      this.colCleanData = [];
      this.colClean_currentPage = 1;
    },
    selectColSubmitFun() {
      this.dialogColClean = false;
      let colCleanString = this.getdata();
      let params = {};
      params["colCleanString"] = colCleanString;
      addTaskAllFun.saveCVConversionInfo(params).then(res => {
        message.saveSuccess(res);
      });
    },
    getdata() {
      let arr = JSON.parse(JSON.stringify(this.colCleanData));
      let arr2 = [];
      let json = {
        columnId: "",
        conversionFlag: "",
        complementFlag: "",
        formatFlag: "",
        replaceFlag: "",
        spiltFlag: "",
        trimFlag: ""
      };
      for (let i = 0; i < arr.length; i++) {
        for (let key in arr[i]) {
          if (key == "column_id") {
            if (arr[i][key] == "0") {
              arr[i][key] = false;
            }
            json.columnId = arr[i][key];
          } else if (key == "codevalueflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            }
            json.conversionFlag = arr[i][key];
          } else if (key == "compflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            }
            json.complementFlag = arr[i][key];
          } else if (key == "formatflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            }
            json.formatFlag = arr[i][key];
          } else if (key == "replaceflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            }
            json.replaceFlag = arr[i][key];
          } else if (key == "splitflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            }
            json.spiltFlag = arr[i][key];
          } else if (key == "trimflag") {
            if (arr[i][key] == 0) {
              arr[i][key] = false;
            }
            json.trimFlag = arr[i][key];
          }
        }
        arr2.push(json);
      }
      return arr2;
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
          if (res.data) {
            this.table_zfbq = res.data;
          }
        });
      }
      this.changecheck = compflags;
      this.index = index;
    },
    // 点击表字符补齐取消按钮事件
    Table_zfbqclose() {
      this.dialogTable_zfbq = false;
      let index = this.index;
      if (this.changecheck) {
        this.cleantableData[index].compflag = true;
        index = null;
        this.changecheck = null;
      } else {
        this.cleantableData[index].compflag = false;
        index = null;
        this.changecheck = null;
      }
    },
    // 点击表字符补齐提交确定按钮
    Table_zfbqsubmit() {
      let params = {};
      let index = this.index;
      params["character_filling"] = this.table_zfbq.character_filling;
      params["filling_length"] = this.table_zfbq.filling_length;
      params["filling_type"] = this.table_zfbq.filling_type;
      params["table_id"] = this.cleantableData[index].table_id;
      addTaskAllFun.saveSingleTbCompletionInfo(params).then(res => {
        message.saveSuccess(res);
        this.cleantableData[index].compflag = true;
        index = null;
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
        });
      }
      this.changecheck = compflags;
      this.index = index;
    },
    // 点击表字符替换取消按钮事件
    Table_zfthclose() {
      let index = this.index;
      this.dialogTable_zfth = false;
      if (this.changecheck) {
        this.cleantableData[index].replaceflag = true;
        index = null;
        this.changecheck = null;
      } else {
        this.cleantableData[index].replaceflag = false;
        index = null;
        this.changecheck = null;
      }
    },
    // 点击表字符替换提交确定按钮
    Table_zfthsubmit() {
      this.dialogTable_zfth = false;
      let params = {};
      let index = this.index;
      params["replaceString"] = JSON.stringify(this.table_zfth);
      params["tableId"] = this.cleantableData[index].table_id;
      addTaskAllFun.saveSingleTbReplaceInfo(params).then(res => {
        message.saveSuccess(res);
        this.cleantableData[index].replaceflag = true;
        index = null;
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
          this.Col_zfbq = res.data;
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
      let columnindex = this.columnindex;
      let params = {};
      params["column_id"] = this.columnid;
      params["character_filling"] = this.Col_zfbq.character_filling;
      params["filling_length"] = this.Col_zfbq.filling_length;
      params["filling_type"] = this.Col_zfbq.filling_type;
      addTaskAllFun.saveColCompletionInfo(params).then(res => {
        message.saveSuccess(res);
        this.colCleanData[columnindex].compflag = true;
        this.columnid = null;
        columnindex = null;
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
        });
      }
    },
    //字符替换新增行
    addRow(tableData, event) {
      tableData.push({
        field: "",
        replace_feild: ""
      });
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
        a = null;
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
    Col_colcfaddRow(tableData) {
      tableData.push({
        col_name: "",
        col_zhname: "",
        split_type: "",
        col_offset: "",
        seq: "",
        split_sep: "",
        col_type: ""
      });
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
      if (rows[index].col_clean_id && rows[index].col_split_id) {
        let params = {};
        params["colCleanId"] = rows[index].col_clean_id;
        params["colSplitId"] = rows[index].col_split_id;
        addTaskAllFun.deleteColSplitInfo(params).then(res => {
          rows.splice(index, 1);
          message.deleteSuccess(res);
        });
      } else {
        rows.splice(index, 1);
      }
    },
    //列清洗-码值转换方法
    mzzhFun(index, row) {
      this.dialogCol_mzzh = true;
      this.columnid = row.column_id;
      this.columnindex = index;
      if (row.codevalueflag) {
        let params = {};
        params["columnId"] = row.column_id;
        addTaskAllFun.getCVConversionInfo(params).then(res => {
          this.Col_mzzh = res.data;
        });
      }
      //获取所有码值转换系统名称下拉选
      addTaskAllFun.getAgentInfoList().then(res => {
        this.CodeSysName = res.data;
      });
    },
    Col_mzzh_currentSel(v) {
      if (v == "选择系统名称") {
        this.Col_mzzh[0].code_classify = "";
        this.Col_mzzh2 = [];
      } else {
        let opt = v.split("(")[1].split(")")[0];
        this.codeopt = opt;
        let params = {};
        params["origSysCode"] = opt;
        addTaskAllFun.getCVClassifyBySysCode(params).then(res => {
          this.col_mzzhclass = res.data;
          this.Col_mzzh2 = [];
          this.Col_mzzh[0].code_classify = "";
        });
      }
    },
    Col_mzzh_currentclass(v2) {
      if (v2 == "选择系统类型") {
        this.Col_mzzh2 = [];
      } else {
        let opt2 = v2;
        let opt1 = this.codeopt;
        if (opt1 != "" && opt2 != "") {
          let params = {};
          params["codeClassify"] = opt2;
          params["origSysCode"] = opt1;
          addTaskAllFun.getCVInfo(params).then(res => {
            this.Col_mzzh2 = res.data;
          });
        }
      }
    },
    colmzzh_handleSizeChange(size) {
      this.colmzzh_pagesize = size;
    },
    colmzzh_handleCurrentChange(currentPage) {
      this.colmzzh_currentPage = currentPage;
    },
    Col_mzzhSubmitFun() {
      this.dialogCol_mzzh = false;
      let a = this.columnindex;
      let params = {};
      params["column_id"] = this.columnid;
      params["codename"] = this.Col_mzzh[0].code_classify;
      params["codesys"] = this.Col_mzzh[0].orig_sys_name
        .split("(")[1]
        .split(")")[0];
      addTaskAllFun.saveCVConversionInfo(params).then(res => {
        message.saveSuccess(res);
        this.colCleanData[a].codevalueflag = true;
        this.Col_mzzh[0].orig_sys_name = "";
        this.Col_mzzh[0].code_classify = "";
        this.Col_mzzh2 = [];
      });
    },
    Col_mzzhCloseFun() {
      this.dialogCol_mzzh = false;
      (this.Col_mzzh[0].orig_sys_name = ""),
        (this.Col_mzzh[0].code_classify = "");
      this.Col_mzzh2 = [];
    },
    //列清洗-优先级调整
    yxjFun(index, row) {
      this.dialogtableCleanOrd = true;
      this.columechname = row.colume_ch_name;
      this.columename = row.colume_name;
      this.columnid = row.column_id;
      let params = {};
      params["columnId"] = this.columnid;
      params["tableId"] = this.tableid;
      addTaskAllFun.getColCleanOrder(params).then(res => {
        if (res.data[0].tc_or) {
          console.log(1,res.data[0].tc_or)
          let data = JSON.parse(res.data[0].tc_or);
          this.tableCleanOrdData = this.changeDataPriorFun(data);
        } else {
          this.tableCleanOrdData = this.priorityData;
        }
      });
    },
    Col_yxjCloseFun() {
      this.dialogtableCleanOrd = false;
    },
    Col_yxjSubmitFun() {
      this.dialogtableCleanOrd = false;
      let ordarr = JSON.parse(JSON.stringify(this.tableCleanOrdData));
      let params = {};
      params["columnId"] = this.columnid;
      params["sort"] = eval("(" + this.priSubmitFun(ordarr) + ")");
      addTaskAllFun.saveColCleanOrder(params).then(res => {
        message.saveSuccess(res);
        this.tableCleanOrdData = [];
      });
    },
    //列清洗-整表优先级
    allTableOrd() {
      this.dialogAlltableCleanOrd = true;
      let params = {};
      params["tableId"] = this.tableid;
      params["colSetId"] = this.databaseId;
      addTaskAllFun.getSingleTbCleanOrder(params).then(res => {
        console.log(res.data[0].ti_or)
        let data = JSON.parse(res.data[0].ti_or);
        this.AlltableCleanOrdData = this.changeDataPriorFun(data);
      });
    },
    //列清洗-整表优先级提交
    AlltableCleanOrdSubmitFun() {
      this.dialogAlltableCleanOrd = false;
      let ordarr = JSON.parse(JSON.stringify(this.AlltableCleanOrdData));
      let params = {};
      params["tableId"] = this.tableid;
      params["sort"] = eval("(" + this.priSubmitFun(ordarr) + ")");
      addTaskAllFun.saveSingleTbCleanOrder(params).then(res => {
        message.saveSuccess(res);
        this.AlltableCleanOrdData = [];
      });
    },
    // 列清洗-列合并
    columnMergeFun() {
      this.dialogcolumnMerge = true;
      let params = {};
      params["tableId"] = this.tableid;
      addTaskAllFun.getColMergeInfo(params).then(res => {
        this.columnMerge = res.data;
      });
    },
    // 列清洗-列合并确定提交
    columnMergeSubmitFun() {
      this.dialogcolumnMerge = false;
      let params = {};
      params["tableId"] = this.tableid;
      params["columnMergeString"] = JSON.stringify(this.columnMerge);
      addTaskAllFun.saveColMergeInfo(params).then(res => {
        message.saveSuccess(res);
        this.columnMerge = [];
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
      let page = this.colSelect_currentPage;
      this.getColumnInfo(page);
      this.colindex = index;
    },
    // 选择列获取方法
    getColumnInfo(page) {
      let params = {};
      params["tableId"] = this.tableid;
      addTaskAllFun.getColumnInfo(params).then(res => {
        this.colSelectData = res.data;
      });
    },
    colSelect_handleSizeChange(size) {
      this.colSelect_pagesize = size;
    },
    colSelect_handleCurrentChange(currentPage) {
      this.colSelect_currentPage = currentPage;
      this.getColumnInfo(currentPage);
    },
    // 列选择-列信息提交确定
    changeFun(val) {
      this.multipleTable = val;
      let str = "";
      this.multipleTable.forEach((item, i) => {
        if (i == 0) {
          str = item.colume_name;
        } else {
          str += "," + item.colume_name;
        }
      });
      this.col_namstr = str;
    },
    colSelectSubmitFun() {
      let index = this.colindex;
      this.columnMerge[index].col_name = this.col_namstr;
      this.col_namstr = "";
    },
    // 列合并-新增行
    columnMerge_addRow(tableData) {
      tableData.push({
        col_name: "",
        col_type: "",
        col_zhname: "",
        old_name: ""
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
  cursor: pointer;
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
.allclickColor {
  color: #fff;
  font-weight: bold;
}
.leftbtn {
  margin-top: 12px;
  margin-top: 12px;
  float: left;
  margin: 15px;
  margin-bottom: 10px;
}
.rightbtn {
  margin-top: 12px;
  margin-top: 12px;
  float: right;
  margin: 15px;
  margin-bottom: 10px;
}
</style>