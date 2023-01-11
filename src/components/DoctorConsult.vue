<template>
    <div id="doctor-consult">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">查看预约</el-menu-item>
        </el-menu>
        <div id="mine" v-if="selectIndex == 1">
            <div v-for="(item,i) in appoint_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 13px; text-align: left">咨询医生：{{item.name}}</el-row>
                        <el-row style="font-size: 13px; text-align: left">咨询时间：{{item.legal_time}}</el-row>
                        <el-row style="font-size: 12px; text-align: left">咨询地点：心理咨询中心</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center" v-if="item.has_reserved">
                        <el-button type="primary" round @click="goCancel(item)">取消预约</el-button>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center" v-else>
                        <el-button type="primary" round @click="goAppoint(item)">预约</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
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
            appoint_list:{},
            loaded: false,
            user:{},
        }
    },
    mounted(){
        if (!this.loaded){
            this.getdata();
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        getdata(){
            // get 请求
            this.$http.get('/appointments/show').then((resp) => {
                // 处理成功情况
                let json_data=resp.data;
                this.appoint_list=json_data.doctors
                this.loaded=true,
                this.user=json_data.user
            })
            .catch((error) => {
                // 处理错误情况
                console.log(error);
            });
        },
        goAppoint(item){
            // console.log(item)
            let params = {
                "doctor_id":item.id,
                "user_id": this.user.id,
                "appointment_date": item.legal_time
            };
            console.log(params)
            this.$http({
                // "appointment":{
                //     "doctor_id":item.id,
                //     "user_id": this.user.id,
                //     "appointment_date": item.legal_time
                // },
                method: "post",
                url: "/appointments/create",
                data: params
            }).then(res => { console.log(res)});
            this.getdata();
            ElMessage({
                message: '预约成功',
                type: 'success',
            })
        },
        goCancel(item){
            console.log(item)
            let params = {
                "doctor_id":item.id,
                "user_id": this.user.id
            };
            this.$http({
                method: "delete",
                url: "/appointments/destroy",
                data: params
            }).then(res => { console.log(res)});
            this.getdata();
            ElMessage({
                message: '取消成功',
                type: 'success',
            })
        }
    }
}
</script>
<!-- {
    url: '/appointments/show',
    method: "get",
    crossdomain: true,
} -->