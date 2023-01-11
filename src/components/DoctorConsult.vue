<template>
    <div id="doctor-consult">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect" @click="getappointments();">
            <el-menu-item index="1">查看预约</el-menu-item>
            <el-menu-item index="2">情绪分析</el-menu-item>
        </el-menu>
        <div id="mine" v-if="selectIndex == 1">
            <div v-for="(item, i) in appoint_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 13px; text-align: left">咨询人：{{item.user_name}}</el-row>
                        <el-row style="font-size: 13px; text-align: left">咨询时间：{{item.time}}</el-row>
                        <el-row style="font-size: 12px; text-align: left">咨询地点：{{item.place}}</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center">
                        <el-button type="primary" round @click="goCancel(item)">取消预约</el-button>
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
import { ElMessage } from 'element-plus'
export default {
    name: 'DoctorConsult',
    data() {
        return {
            selectIndex: 1,
            loaded: false,
            appoint_list: [],
            analysis: {
                text: '',
                result: [{txt: "昨晚失眠了", emo: "害怕"}, {txt: "今天心情很不好", emo: "悲伤"}]
            }
        }
    },
    mounted(){
        if (!this.loaded){
            this.getappointments();
        }
        this.timer = setInterval(this.getdoctors, 1100)
    },
    beforeUnmount() {
        clearTimeout(this.timer);
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        getappointments(){
            // get 请求
            this.$http.get('/appointments/show_doctor').then((resp) => {
                // 处理成功情况
                let json_data=resp.data;
                console.log(json_data)
                this.appoint_list=json_data.appointments;
                this.loaded=true;
                this.user=json_data.user
            })
            .catch((error) => {
                // 处理错误情况
                console.log(error);
            });
        },
        goCancel(item){
            console.log(item.id)
            let params = {
                "appointment_id": item.id
            };
            console.log(params)
            this.$http({
                method: "delete",
                url: "/appointments/destroy",
                data: params
            }).then(res => { console.log(res)});
            this.getappointments();
            ElMessage({
                message: '取消预约成功',
                type: 'success',
            })
        },

    }
}
</script>