<template>
    <div id="doctor-consult">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">查看预约</el-menu-item>
            <el-menu-item index="2">情绪分析</el-menu-item>
        </el-menu>
        <div id="mine" v-if="selectIndex == 1">
            <div v-for="(item, i) in appoint_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 13px; text-align: left">咨询人：{{item.student}}</el-row>
                        <el-row style="font-size: 13px; text-align: left">咨询时间：{{item.time}}</el-row>
                        <el-row style="font-size: 12px; text-align: left">咨询地点：{{item.place}}</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center">
                        <el-button type="primary" round @click="goCancel">取消预约</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
        </div>
        <div id="emotion" v-if="selectIndex == 2">
            <el-row style="type: flex; justify: space-around; align-items: center">简单描述咨询人状态：</el-row>
            <el-row style="type: flex; justify: space-around; align-items: center">
                <el-input type="textarea" resize="none" :autosize="{minRows: 5, maxRows: 5}" placeholder="用一段话简单描述最近的状态" v-model="analysis.text"></el-input>
            </el-row>
            <el-row style="type: flex; justify: space-around; align-items: center">情绪分析结果：</el-row>
            <el-row v-for="(res,i) in analysis.result" :key="i" style="font-size: 13px; text-align: left">{{res.txt}}：{{res.emo}}</el-row>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DoctorConsult',
    data() {
        return {
            selectIndex: 1,
            appoint_list: [{
                time: '11月29日（周二） 9:00-10:00',
                place: '心理咨询中心',
                student: '柴文健'
            }, {
                time: '11月29日（周二） 15:00-16:00',
                place: '心理咨询中心',
                student: '马思源'
            }],
            analysis: {
                text: '',
                result: [{txt: "昨晚失眠了", emo: "害怕"}, {txt: "今天心情很不好", emo: "悲伤"}]
            }
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        }
    }
}
</script>