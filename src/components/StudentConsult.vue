<template>
    <div id="student-consult">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect" @click="getdoctors();getappointments();getgoAnalysis();">
            <el-menu-item index="1">预约咨询</el-menu-item>
            <el-menu-item index="2">我的预约</el-menu-item>
            <el-menu-item index="3">情绪分析</el-menu-item>
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
            <div v-for="(item, i) in consult_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 13px; text-align: left">具体时间：{{item.time}}</el-row>
                        <el-row style="font-size: 12px; text-align: left">咨询地点：{{item.place}}</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center" v-if="item.reserved">
                        <el-button type="primary" round disabled>已预约</el-button>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center" v-else>
                        <el-button type="primary" round @click="goAppoint(item)">预约</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
        </div>
        <div id="mine" v-if="selectIndex == 2">
            <div v-for="(item, i) in appoint_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 13px; text-align: left">咨询师：{{item.doctor_name}}</el-row>
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
        <div id="emotion" v-if="selectIndex == 3">
            <el-row style="type: flex; justify: space-around; align-items: center">简单描述状态：</el-row>
            <el-row style="type: flex; justify: space-around; align-items: center">
                <el-input type="textarea" resize="none" :autosize="{minRows: 5, maxRows: 5}" placeholder="用一段话简单描述最近的状态" v-model="analysis.text"></el-input>
                <el-button type="primary" round @click="goAnalysis">确定</el-button>
            </el-row>
            <el-row style="type: flex; justify: space-around; align-items: center">情绪分析结果：</el-row>
            <el-row style="font-size: 13px; text-align: left">{{analysis.res}}</el-row>
        </div>
    </div>
</template>

<script>
import { ElMessage } from 'element-plus'
export default {
    name: 'StudentConsult',
    data() {
        return {
            user: {},
            selectIndex: 1,
            loaded: false,
            query: {
                time: '',
                doctor_id: ''
            },
            doctor_list: [],
            consult_list: [],
            appoint_list: [],
            analysis: {
                text: '',
                res: "",
                // result: [{txt: "示例：昨晚失眠了", emo: "害怕"}, {txt: "今天心情很不好", emo: "悲伤"}]
            }
        }
    },
    mounted(){
        if (!this.loaded){
            this.getdoctors();
            this.getappointments();
        }
        this.timer1 = setInterval(this.getdoctors, 1100)
        this.timer2 = setInterval(this.getappointments, 1100)
        this.timer3 = setInterval(this.getgoAnalysis, 1100)
    },
    beforeUnmount() {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
        clearTimeout(this.timer3);
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        getdoctors(){
            // get 请求
            this.$http.get('/consults/show').then((resp) => {
                // 处理成功情况
                let json_data=resp.data;
                // console.log(json_data)
                this.doctor_list=json_data.doctors;
                this.consult_list=json_data.consults;
                this.loaded=true;
                this.user=json_data.user
            })
            .catch((error) => {
                // 处理错误情况
                console.log(error);
            });
        },
        getappointments(){
            // get 请求
            this.$http.get('/appointments/show_user').then((resp) => {
                // 处理成功情况
                let json_data=resp.data;
                // console.log(json_data)
                this.appoint_list=json_data.appointments;
                this.loaded=true;
                this.user=json_data.user
            })
            .catch((error) => {
                // 处理错误情况
                console.log(error);
            });
        },
        goAppoint(item){
            // console.log(item)
            if (!this.query.doctor_id)
            {
                ElMessage({
                message: '请选择咨询师',
                type: 'warning',
                })
                return;
            }
            let params = {
                "doctor_id": this.query.doctor_id,
                "user_id": this.user.id,
                "consult_id": item.id
            };
            console.log(params)
            this.$http({
                method: "post",
                url: "/appointments/create",
                data: params
            }).then(res => { console.log(res)});
            this.getdoctors();
            ElMessage({
                message: '预约成功',
                type: 'success',
            })
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
        getgoAnalysis(){
            // get 请求
            this.$http.get('/emotion_analysis').then((resp) => {
                // 处理成功情况
                let json_data=resp.data;
                console.log(111)
                console.log(json_data.content)
                this.analysis.res=json_data.content;
            })
            .catch((error) => {
                // 处理错误情况
                console.log(error);
            });

        },
        goAnalysis(){
            // console.log(item)
            if (!this.analysis.text)
            {
                ElMessage({
                message: '不能为空',
                type: 'warning',
                })
                return;
            }
            let params = {
                "query_content": this.analysis.text,
            };
            console.log(params)
            this.$http({
                method: "post",
                url: "/emotion_analysis",
                data: params
            }).then(res => { console.log(res)});
            this.getgoAnalysis();
            ElMessage({
                message: '发送成功',
                type: 'success',
            })
        },
    }
}
</script>