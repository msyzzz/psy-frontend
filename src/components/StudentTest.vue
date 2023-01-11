<template>
    <div id="student-test">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">自主测评</el-menu-item>
            <el-menu-item index="2">测评任务</el-menu-item>
            <el-menu-item index="3">我的测评</el-menu-item>
        </el-menu>
        <div id="test" v-if="selectIndex == 1">
            <div v-for="(item, i) in test_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 16px; text-align: left">{{ item.name }}</el-row>
                        <el-row style="font-size: 13px; text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;{{
                            item.description
                        }}</el-row>
                        <el-row style="font-size: 12px; text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;共有{{
                            item.question_number
                        }}道题目</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center">
                        <el-button type="primary" round @click="goTest(item.id, -1)">进行测试</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
        </div>
        <div id="mission" v-if="selectIndex == 2">
            <div v-for="(item, i) in mission_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 16px; text-align: left">{{ item.name }}</el-row>
                        <el-row style="font-size: 12px; text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;截止至{{
                            item.deadline
                        }}</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center">
                        <el-button type="primary" round @click="goTest(item.questionnaire_id, item.id)">进行测试</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
        </div>
        <div id="result" v-if="selectIndex == 3">
            <div v-for="(item, i) in test_records" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 16px; text-align: left">{{ item.name }}</el-row>
                        <el-row style="font-size: 12px; text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;测试时间：{{
                            item.created_at
                        }}</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center">
                        <el-button type="primary" round @click="goResult(i)">查看结果</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
        </div>

        <el-dialog v-model="dialogVisible" title="测评结果" append-to-body width="30%" :before-close="handleClose">
            <el-row style="font-size: 16px; text-align: left">测试内容:&nbsp;{{ test_records[resultIndex].name }}</el-row>
            <el-row style="font-size: 16px; text-align: left">测试时间:&nbsp;{{ test_records[resultIndex].created_at }}</el-row>
            <el-row style="font-size: 16px; text-align: left">测试得分:&nbsp;{{ test_records[resultIndex].score }}</el-row>
            <el-row style="font-size: 16px; text-align: left">测试结果:&nbsp;{{ test_records[resultIndex].details }}</el-row>
            <template #footer>
                <span class="dialog-footer">
                    <el-button type="primary" @click="dialogVisible = false">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
    name: 'StudentTest',
    data() {
        return {
            selectIndex: 1,
            dialogVisible: false,
            resultIndex: null,
            test_list: [{
                id: 1,
                name: '贝克焦虑量表',
                description: '焦虑自测问卷，能够反映被试者焦虑状况的严重程度，适用对象为具有焦虑症状的成年人',
                question_number: 21

            }, {
                id: 2,
                name: '情感一社会孤独量表',
                description: '测量情感孤独与社会孤独状况的工具：情感孤独，指缺乏与某人产生亲近与情爱的关系；社会孤独，指缺乏由志趣相投、一起活动的朋友所构成的社交圈子',
                question_number: 10

            }, {
                id: 3,
                name: '16种人格因素问卷',
                description: '从乐群、聪慧、自律、独立、敏感、冒险、怀疑等16个相对独立的人格特点对人进行描绘，并可以了解应试者在环境适应、专业成就和心理健康等方面的表现',
                question_number: 187
            }],
            mission_list: [{
                id: 1,
                name: '贝克焦虑量表',
                deadline: '2022年12月1日',
              questionnaire_id: 1,
            }, {
                id: 2,
                name: '抑郁症自测问卷',
                deadline: '2022年11月30日',
              questionnaire_id: 1,
            }],
            test_records: [{
                id: 1,
                name: '贝克焦虑量表',
                created_at: '2022年11月22日 17:44:29',
                score: 22,
                details: '轻度焦虑'
            }]
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        goTest(index, task) {
            // var route = this.$router.resolve({
            //     path: '/do_test',
            // });
            // window.open(route.href);
            this.$router.push({
                path: '/do_test',
                state: { question_index: index, task: task }
            })
        },
        goResult(index) {
            this.resultIndex = index;
            this.dialogVisible = true;
            // this.$notify({
            //     title: '测评结果',
            //     message: '测试内容: ' + this.test_records[index].name + '\n测试时间: ' + this.test_records[index].time + '\n测试得分: ' + this.test_records[index].score + '\n测试结果: ' + this.test_records[index].result,
            //     customClass: 'result_notify'
            // });
        }
    },
    created() {
      axios.get("/questionnaires").then(response=> {
        this.test_list = response.data["data"];
        this.test_list.reverse();
      })
          .catch(error => {
            console.log(error);
            ElMessage.error("账号或密码错误！")
          })
      axios.get("/tasks").then(response=> {
        this.mission_list = response.data["data"];
        this.mission_list.reverse();
        console.log(this.mission_list)
      })
          .catch(error => {
            console.log(error);
          })
      axios.get("/results").then(response=> {
        this.test_records = response.data["data"];
        this.test_records.reverse();
        console.log(this.test_records)
      })
          .catch(error => {
            console.log(error);
            ElMessage.error("账号或密码错误！")
          })
    }
}
</script>

<style>
.result_notify {
    white-space: pre-wrap !important;
}
</style>