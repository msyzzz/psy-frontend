<template>
<div id="main-view">
    <!--<el-container style="height:100%; border: 1px solid #eee">-->
    <el-header style=" font-size: 30px; background: #409EFF">
        <el-col :span="6">
            <span style="color: #ffffff; text-align:center; line-height:60px;">舆情分析系统</span>
            <!--TODO： 加一个搜索框 靠右侧-->
        </el-col>
    </el-header>
    <el-main>
        <el-col :span="4">
            <el-menu default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="menuSelect">
                <el-menu-item index="1">
                    <i class="el-icon-location"></i>
                    舆情总况
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-s-marketing"></i>
                    舆情分析
                </el-menu-item>
                <el-menu-item index="3">
                    <i class="el-icon-s-custom"></i>
                    用户信息
                </el-menu-item>
            </el-menu>
        </el-col>

        <el-col :span="10">
            <el-card class="box-card">
                <div class="clearfix">
                    <span>今日热榜</span>
                    <el-button style="float: right; padding: 3px 0" type="text">更多</el-button>
                </div>
                <el-table :data="tableData" @row-click="rowClick" height="350" style="width: 100%" :cell-class-name="tableCellClasstitle" :cell-style="set_cell_style" :show-header="false">
                    <el-table-column prop="rank" width="40">
                    </el-table-column>
                    <el-table-column prop="title">
                    </el-table-column>
                    <el-table-column prop="heat_value" width="80">
                    </el-table-column>
                </el-table>
                <!-- <div v-for="o in 4" :key="o" class="text item">
                    {{'热榜内容 ' + o }}
                </div> -->
            </el-card>
        </el-col>
    </el-main>
    <!--</el-container>-->
  <ul>
    <li v-for="item in List" :key="item">{{item.title}}</li>
  </ul>
</div>
</template>

<script>

import {get} from "@/utils/communication"
import API from "@/utils/API";

export default {
    name: 'MainView',
  methods:{
    getHeatlist: function(){
      get(API.GET_MESSAGE_LIST.path).then((res) => {
        // if (res.code === ERR_OK) {
        console.log(res)
        this.List = res.data.list;
        // }
      }, (err) => {
        console.log(err)
      })
    },
  },
  created:function(){
    this.getHeatlist();
  },
  data() {
    return {
      List:[{
        id: 1,
        rank: '1',
        title: '特朗普小儿子曾确诊感染新冠',
        heat_value: '380.0万',
      }],
    }
  },
}
</script>

<style>
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

.box-card {
    width: 480px;
}

.el-table .red-row {
    color: #ff0000;
}

.el-table .orange-row {
    color: #ff8000;
}

.el-table .yellow-row {
    color: #f8e00a;
}

.el-table .title-size {
    font-size: 16px;
}

.el-table .gray-font {
    color: grey;
}
</style>
