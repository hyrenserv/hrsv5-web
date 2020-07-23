<template>
	<div>
		<el-button type="primary" size="small" class="sql-btn" @click="formaterSql (basicInfoForm.sqlMain)">格式化sql</el-button>
        <div style="width:400px;height:200px;border:1px solid #ccc;">
            <SqlEditor ref="sqleditor"
		   :value="basicInfoForm.sqlMain"
		   @changeTextarea="changeTextarea($event)"
           class='textasql'
		/>
        </div>
		
	</div>
</template>
<script>
    import sqlFormatter from 'sql-formatter'
    import SqlEditor from '../../components/codemirror'
	export default {
        components: {
            SqlEditor
        },
        data(){
            return{
                basicInfoForm:{
        		sqlMain: ''
			}
            }
        },
        methods:{
        	changeTextarea (val){
        	   this.$set(this.basicInfoForm, 'sqlMain', val)
        	},
        	formaterSql (val) {
                let dom = this.$refs.sqleditor
                dom.editor.setValue(sqlFormatter.format(dom.editor.getValue()))
           },
        },
     }
</script>
<style scoped>
.textasql>>>.CodeMirror{
    height: 200px !important;
    /* width:200px !important; */
}
.sql-btn{
    margin-bottom: 20px;
}
</style>
