<template>
  <div>
    <div class="cleanbtn">
      <el-button
        size="mini"
        type="success"
        @click="dialogalltableClean=true;alltableClean(databaseId)"
      >所有表清洗设置</el-button>
      <el-button size="mini" type="success" @click="dialogtableClean=true">全表清洗优先级</el-button>
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
          <el-checkbox :checked="scope.row.compflag==1"
            v-model="scope.row.compflag"
            @change="table_zfbqFun(scope.row.table_id,scope.row.compflag)"
          ></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="replaceflag" label=" 字符替换(整表清洗设置)" width="180" align="center">
        <template slot-scope="scope">
          <el-checkbox :checked="scope.row.replaceflag==1" v-model="scope.row.replaceflag" @change="table_zfthFun"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="trimflag" label=" 首尾去空" width="180" align="center">
        <template slot-scope="scope">
          <el-checkbox :checked="scope.row.trimflag==1" v-model="scope.row.trimflag"></el-checkbox>
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
    <el-dialog title="字符补齐" :visible.sync="dialogTable_zfbq" width="50%" class="alltable">
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
        <el-button @click="dialogTable_zfbq = false;Table_zfbqclose()" size="mini" type="danger">取 消</el-button>
        <el-button type="primary" @click="dialogTable_zfbq = false;" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 表-字符替换 -->
    <el-dialog title="字符替换" :visible.sync="dialogTable_zfth" width="50%" class="alltable">
      <el-button type="success" width="20" @click="addRow(Col_zfth)" size="mini" class="addline">新增行</el-button>
      <el-table :data="table_zfth" border size="medium" highlight-current-row >
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="oldCharacter" label="原字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.oldCharacter" placeholder="原字符" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="newCharacter" label="替换后字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.newCharacter" placeholder="替换后字符" size="medium"></el-input>
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
        <el-button @click="dialogTable_zfth = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogTable_zfth = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 全表清洗优先级 -->
    <el-dialog title="全表清洗优先级" :visible.sync="dialogtableClean" width="50%">
      <el-table :data="tableCleanData" border size="medium" highlight-current-row >
        <el-table-column property="SelectCol" type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="tableCleanCon" label="内容" align="center"></el-table-column>
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
        <el-button type="primary" @click="dialogtableClean = false" size="mini">确 定</el-button>
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
            <el-table-column property="oldCharacter" label="原字符" align="center">
              <template scope="scope">
                <el-input v-model="scope.row.oldCharacter" placeholder="原字符" size="medium"></el-input>
              </template>
            </el-table-column>
            <el-table-column property="newCharacter" label="替换后字符" align="center">
              <template scope="scope">
                <el-input v-model="scope.row.newCharacter" placeholder="替换后字符" size="medium"></el-input>
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
            <el-radio-group v-model="characterCompletion.type">
              <el-radio label="前补齐"></el-radio>
              <el-radio label="后补齐"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="补齐字符">
            <el-input v-model="characterCompletion.nm" size="medium"></el-input>
          </el-form-item>
          <el-form-item label="补齐长度">
            <el-input v-model="characterCompletion.length" size="medium"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogalltableClean = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogalltableClean = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列弹框 -->
    <el-dialog title="列清洗" :visible.sync="dialogColClean" width="70%" class="alltable">
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
          <el-table-column property="colName" label="列名" width="120px" align="center"></el-table-column>
          <el-table-column property="colchName" label="列中文名" width="120px" align="center"></el-table-column>
          <el-table-column property="zfbq" label="字符补齐" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.zfbq" @change="zfbqFun">设置</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column property="zfth" label="字符替换" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.zfth" @change="zfthFun">设置</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column property="rqgsh" label="日期格式化" width="100px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.rqgsh" @change="rqgshFun">设置</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column property="colcf" label="列拆分" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.colcf" @change="colcfFun">设置</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column property="mzzh" label="码值转换" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.mzzh" @change="mzzhFun">设置</el-checkbox>
            </template>
          </el-table-column>
          <el-table-column property="swqk" label="首尾去空" width="80px" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.swqk"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="清洗优先级" prop="yxjtz" align="center">
            <template scope="scope">
              <el-button type="success" @click="yxjFun(scope.row)" size="mini">优先级调整</el-button>
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
    <el-dialog title="字符补齐" :visible.sync="dialogCol_zfbq" width="50%" class="alltable">
      <el-form ref="form" :model="Col_zfbq" label-width="240px" text-align="center">
        <el-form-item label="补齐方式">
          <el-radio-group v-model="Col_zfbq.type">
            <el-radio label="前补齐"></el-radio>
            <el-radio label="后补齐"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="补齐字符">
          <el-input v-model="Col_zfbq.nm" style="width:190px" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="补齐长度">
          <el-input v-model="Col_zfbq.length" style="width:190px" size="medium"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCol_zfbq = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogCol_zfbq = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列-字符替换弹框 -->
    <el-dialog title="字符替换" :visible.sync="dialogCol_zfth" width="50%" class="alltable">
      <el-button type="success" size="mini" width="20" @click="addRow(Col_zfth)" class="addline">新增行</el-button>
      <el-table :data="Col_zfth" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="oldCharacter" label="原字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.oldCharacter" placeholder="原字符" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="newCharacter" label="替换后字符" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.newCharacter" placeholder="替换后字符" size="medium"></el-input>
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
        <el-button @click="dialogCol_zfth = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogCol_zfth = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列-日期格式化弹框 -->
    <el-dialog title="日期格式化" :visible.sync="dialogCol_rqgsh" width="50%" class="alltable">
      <el-form ref="form" :model="Col_rqgsh" label-width="240px" text-align="center">
        <el-form-item label="原格式">
          <el-input v-model="Col_rqgsh.oldtype" style="width:190px" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="转换格式">
          <el-input v-model="Col_rqgsh.newtype" style="width:190px" size="medium"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCol_rqgsh = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogCol_rqgsh = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!--选择列-列拆分弹框  -->
    <el-dialog title :visible.sync="dialogCol_colcf" width="70%" class="alltable">
      <div slot="title" class="header-title">
        <span class="title">列拆分(拆分的是最后的数据)&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title">列名称:134</span>
      </div>
      <el-button type="success" size="mini" width="20" @click="addRow(Col_colcf)" class="addline">新增行</el-button>
      <el-table :data="Col_colcf" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="name" label="字段名称" align="center" width="140px">
          <template scope="scope">
            <el-input v-model="scope.row.name" placeholder="字段名称"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="chNamw" label="中文名称" align="center" width="140px">
          <template scope="scope">
            <el-input v-model="scope.row.chNamw" placeholder="中文名称" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="cftype" label="拆分方式" align="center" width="180px">
          <template scope="scope">
            <el-select placeholder="选择" v-model="scope.row.cftype" style="width:150px" size="medium">
              <el-option label="自定义变量" value="1"></el-option>
              <el-option label="偏移量" value="2"></el-option>
            </el-select>
          </template>
        </el-table-column>
        <el-table-column property="pyl" label="偏移量/字符拆分" align="center" width="140px">
          <template scope="scope">
            <el-input v-model="scope.row.pyl" placeholder="偏移量/字符拆分" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="zftype" label="类型" align="center" width="140px">
          <template scope="scope">
            <el-input v-model="scope.row.zftype" placeholder="varchar(80)" size="medium"></el-input>
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
                  @click="DelRowFun(scope.$index, Col_colcf)"
                >删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCol_colcf = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogCol_colcf = false" size="mini">确 定</el-button>
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
    <el-dialog title :visible.sync="dialogtableCleanOrd" width="50%">
      <div slot="title" class="header-title">
        <span class="title">清洗排序&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span class="title">表名:134</span>
      </div>
      <el-table :data="tableCleanOrdData" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column property="tableCleanOrdCon" label="内容" align="center"></el-table-column>
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
        <el-button @click="dialogtableCleanOrd = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogtableCleanOrd = false" size="mini">确 定</el-button>
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
        <el-table-column property="tableCleanOrdCon" label="内容" align="center"></el-table-column>
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
        <el-button @click="dialogAlltableCleanOrd = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogAlltableCleanOrd = false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 列合并 -->
    <el-dialog :visible.sync="dialogcolumnMerge" width="70%" class="alltable">
      <div slot="title" class="header-title">
        <span class="title">列合并(合并的是最后的数据)</span>
      </div>
      <el-button type="success" size="mini" width="20" @click="addRow(columnMerge)" class="addline">新增行</el-button>
      <el-table :data="columnMerge" border size="medium" highlight-current-row>
        <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
        <el-table-column label="选择" align="center">
          <template scope="scope">
            <el-button type="success" @click="colSelectFun(scope.rows)" size="mini">列选择</el-button>
          </template>
        </el-table-column>
        <el-table-column property="colName" label="列名" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.colName" placeholder="列名" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="colMerchName" label="合并列名" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.colMerchName" placeholder="合并列名" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="colMerchName" label="合并列中文名" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.colMerchName" placeholder="合并列中文名" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column property="colMertype" label="字段类型" align="center">
          <template scope="scope">
            <el-input v-model="scope.row.colMertype" placeholder="字段类型" size="medium"></el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160px" align="center">
          <template scope="scope">
            <el-row>
              <el-col :span="24" class="delbtn">
                <el-button
                  style="color:red" size="medium"
                  type="text"
                  circle
                  @click="DelRowFun(scope.$index,columnMerge)"
                >删除</el-button>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogcolumnMerge = false" type="danger" size="mini">取 消</el-button>
        <el-button type="primary" @click="dialogcolumnMerge= false" size="mini">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 选择列 -->
    <el-dialog title="列信息" :visible.sync="dialogcolSelectData" width="70%" class="alltable">
      <el-table
        :data="colSelectData.slice((colSelect_currentPage - 1) * colSelect_pagesize, colSelect_currentPage * colSelect_pagesize)"
        border
        size="medium"
        highlight-current-row
      >
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column property="colName" label="列名称" align="center">
          <span>列名称</span>
        </el-table-column>
        <el-table-column property="colchName" label="中文名" align="center">
          <span>中文名</span>
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
      colSelect_pagesize: 10,
      cleantableData: [
        {
          compflag: 0,
          replaceflag: 0,
          trimflag: 0
        }
      ],
      cleancurrentPage: 1,
      cleanpagesize: 5,
      tableCleanData: [
        {
          tableCleanCon: "322"
        },
        {
          tableCleanCon: "312"
        }
      ],
      allTableCleanSettingData: [
        {
          oldCharacter: "",
          newCharacter: ""
        }
      ],
      characterCompletion: {
        type: "",
        nm: "",
        length: ""
      },
      table_zfbq: {
        filling_type: "",
        character_filling: "",
        filling_length: ""
      },
      Col_zfbq: {
        type: "",
        nm: "",
        length: ""
      },
      Col_zfth: [
        {
          oldCharacter: "",
          newCharacter: ""
        }
      ],
      table_zfth: [
        {
          oldCharacter: "",
          newCharacter: ""
        }
      ],
      Col_rqgsh: {
        oldtype: "",
        newtype: ""
      },
      Col_colcf: [
        {
          name: "",
          chNamw: "",
          cftype: "",
          pyl: "",
          zftype: ""
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
          colName: "13",
          colchName: "3124",
          zfbq: "",
          zfth: "",
          rqgsh: "",
          colcf: "",
          mzzh: "",
          swqk: "",
          yxjtz: ""
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
      AlltableCleanOrdData: [
        {
          tableCleanOrdCon: "1"
        },
        {
          tableCleanOrdCon: "1"
        }
      ],
      columnMerge: [
        {
          colName: "",
          colMerchName: "",
          colMerchName: "",
          colMertype: ""
        }
      ],
      colSelectData: [
        {
          colName: "",
          colchName: ""
        }
      ],
      databaseId: "",
      FillingType: []
    };
  },
  mounted() {
    this.databaseId = this.steps0data[0].database_id;
    let params = {};
    params["colSetId"] = this.databaseId;
    addTaskAllFun.getCleanConfInfo(params).then(res => {
      console.log(res.data);
      this.cleantableData = res.data;
    });
    let params2 = {};
    params2["category"] = "FillingType";
    addTaskAllFun.getCategoryItems(params2).then(res => {
      this.FillingType = res.data;
      console.log(this.FillingType);
    });
  },
  methods: {
    clean_handleSizeChange(size) {
      this.cleanpagesize = size;
    },
    clean_handleCurrentChange(currentPage) {
      this.cleancurrentPage = currentPage;
    },
    //所有表清洗设置
    alltableClean(id) {
      let params = {};
      params["colSetId"] = id;
      addTaskAllFun.getAllTbCleanConfInfo(params).then(res => {
        console.log(res);
      });
    },
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
      console.log("下移", index, row);
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
        oldCharacter: "",
        newCharacter: ""
      });
    },
    //删除
    DelRowFun(index, rows) {
      rows.splice(index, 1);
    },
    selectCol(index, row) {
      this.dialogColClean = true;
    },
    //表字符补齐显示
    table_zfbqFun(tableid, compflag) {
      this.dialogTable_zfbq = true;
      this.table_zfbq.filling_type = "";
      this.table_zfbq.character_filling = "";
      this.table_zfbq.filling_length = "";
      if (compflag) {
        this.cleantableData.compflag = 1;
        let params = {};
        params["tableId"] = tableid;
        addTaskAllFun.getTbCompletionInfo(params).then(res => {
          if (res.data[0]) {
            this.table_zfbq = res.data[0];
          }
        });
      }
    },
    Table_zfbqclose(){
     this.cleantableData.compflag = 0
    },
    table_zfthFun() {
      this.dialogTable_zfth = true;
    },
    zfbqFun() {
      this.colCleanData.zfbq = "true";
      if (this.colCleanData.zfbq) {
        this.dialogCol_zfbq = true;
      }
    },
    zfthFun() {
      this.colCleanData.zfth = "true";
      if (this.colCleanData.zfth) {
        this.dialogCol_zfth = true;
      }
    },
    rqgshFun() {
      this.colCleanData.rqgsh = "true";
      if (this.colCleanData.rqgsh) {
        this.dialogCol_rqgsh = true;
      }
    },
    colcfFun() {
      this.colCleanData.colcf = "true";
      if (this.colCleanData.colcf) {
        this.dialogCol_colcf = true;
      }
    },
    mzzhFun() {
      this.colCleanData.mzzh = "true";
      if (this.colCleanData.mzzh) {
        this.dialogCol_mzzh = true;
      }
    },
    yxjFun(row) {
      this.dialogtableCleanOrd = true;
    },
    allTableOrd() {
      this.dialogAlltableCleanOrd = true;
    },
    columnMergeFun() {
      this.dialogcolumnMerge = true;
    },
    colSelectFun(row) {
      this.dialogcolSelectData = true;
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
.addline{
  margin: 5px 0
}
</style>