<template>
    <div id="student-consult">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">预约咨询</el-menu-item>
            <el-menu-item index="2">我的预约</el-menu-item>
        </el-menu>
        <div id="appoint" v-if="selectIndex == 1">
            <el-row type="flex" align="middle" style="font-size: 16px; text-align: center; margin-left: 15px; margin-top: 10px">
                选择预约日期：
                <el-date-picker v-model="query.time" value-format="yyyy-MM-DD" type="date" placeholder="选择预约日期"/>
                &nbsp;&nbsp;&nbsp;&nbsp;选择心理咨询师：
                <el-select v-model="query.doctor_id" placeholder="选择心理咨询师">
                    <el-option v-for="(doctor, i) in doctor_list" :key="i" :label="doctor.name" :value="doctor.id"/>
                </el-select>
                <el-button type="primary" round @click="goQuery">查询</el-button>
            </el-row>
            <div v-for="(item, i) in available_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 13px; text-align: left">具体时间：{{item.time}}</el-row>
                        <el-row style="font-size: 12px; text-align: left">咨询地点：{{item.place}}</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center">
                        <el-button type="primary" round @click="goAppoint">预约</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
        </div>
        <div id="mine" v-if="selectIndex == 2">
            <div v-for="(item, i) in appoint_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 13px; text-align: left">咨询师：{{item.doctor}}</el-row>
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
    name: 'StudentConsult',
    data() {
        return {
            selectIndex: 1,
            query: {
                time: '',
                doctor_id: ''
            },
            doctor_list: [{name: '1号心理咨询师', id: 1}, {name: '2号心理咨询师', id: 2}],
            available_list: [{time: '11月29日（周二） 10:00-11:00', place: '心理咨询中心'}, {time: '11月29日（周二） 14:00-15:00', place: '心理咨询中心'}],
            appoint_list: [{
                time: '11月29日（周二） 9:00-10:00',
                place: '心理咨询中心',
                doctor: '1号心理咨询师'
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