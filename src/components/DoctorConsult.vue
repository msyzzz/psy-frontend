<template>
    <div id="doctor-consult">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">查看预约</el-menu-item>
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
            }]
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        }
    }
}
</script>