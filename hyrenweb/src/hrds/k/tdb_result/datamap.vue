<template>
<div id='datamap'>
    <el-row class='topTitle'>
        <span class='el-icon-location'>数据地图查询</span>
        <router-link to="/tdb_result">
            <el-button type="primary" size="small" class="goIndex">
                <i class="fa fa-home fa-lg"></i>返回首页
            </el-button>
        </router-link>
    </el-row>
    <div style="margin-top: 15px;">
        <el-input placeholder="请输入内容" v-model="input3" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="draw(input3)"></el-button>
        </el-input>
    </div>
    <div id="viz"></div>
</div>
</template>

<script>
import NeoVis from 'neovis.js';
export default {
    components: {
        NeoVis,
    },
    data() {
        return {
            input3: "MATCH p=()-[r:FK]->() RETURN p"
        }
    },
    mounted() {
        this.draw(this.input3)
    },
    methods: {
        draw(input) {
            let viz;
            var config = {
                container_id: "viz",
                server_url: "bolt://172.168.0.60:7687",
                server_user: "neo4j",
                server_password: "hrsdxg",
                labels: {
                    "Character": {
                        "caption": "name",
                        "size": "pagerank",
                        "community": "community"
                    }
                },
                relationships: {
                    "INTERACTS": {
                        "thickness": "weight",
                        "caption": false
                    }
                },
                initial_cypher: input
            };

            viz = new NeoVis(config);
            viz.render();
        }
    }
}
</script>

<style lang="less" scoped>
#datamap {
    .title {
        color: #2196f3;
        line-height: 30px;
        padding-bottom: 10px;
        font-size: 18px;
    }
}

#viz {
    width: 100%;
    height: 550px;
    //border: 1px solid lightgray;
    font: 22pt arial;
}
</style>
