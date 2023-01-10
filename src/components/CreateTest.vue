<template>
    <div id="create-test" style="margin-left: 15px">
        <el-row type="flex" align="middle" style="font-size: 16px; text-align: center">
            问卷名称：
            <el-input placeholder="请输入问卷名称" v-model="questionnaire.name" style="width: max-content"></el-input>
        </el-row>
        <el-row type="flex" align="middle" style="font-size: 16px; text-align: left">
            问卷提示语：
            <el-input placeholder="请输入问卷提示语" v-model="questionnaire.description" style="width: max-content"></el-input>
        </el-row>
        <div v-for="(item, i) in questionnaire.question" :key="i" style="margin-top: 10px">
            <el-row type="flex" align="middle" style="font-size: 14px">
                第{{ i+ 1}}个问题描述：
                <el-input placeholder="请输入问题描述" v-model="item.name" style="width: max-content"></el-input>
            </el-row>
            <el-row type="flex" align="middle" v-for="(option, j) in item.option_list" :key="j" style="font-size: 14px">
                第{{ i+ 1}}个问题第{{ j+ 1}}个选项的描述：
                <el-input placeholder="请输入选项描述" v-model="option.name" style="width: max-content"></el-input>
                &nbsp;&nbsp;&nbsp;&nbsp;该选项的分值：
                <el-input placeholder="请输入选项分值" v-model="option.score" style="width: max-content"></el-input>
                <el-button v-if="j == item.option_list.length - 1" type="primary" round
                    @click="addOption(i)">新增选项</el-button>
                <el-button v-if="j == item.option_list.length - 1 && item.option_list.length > 1" type="primary" round
                    @click="deleteOption(i)">删除选项</el-button>
            </el-row>
            <el-row>
                <el-button v-if="i == this.questionnaire.question.length - 1" type="primary" round
                    @click="addQuestion">新增问题</el-button>
                <el-button v-if="i == this.questionnaire.question.length - 1 && this.questionnaire.question.length > 1"
                    type="primary" round @click="deleteQuestion">删除问题</el-button>
            </el-row>
        </div>
        <el-row type="flex" align="middle" v-for="(item, i) in this.questionnaire.result" :key="i"
            style="font-size: 14px">
            第{{ i+ 1}}个分值段的结果：
            <el-input placeholder="请输入起始分值" v-model="item.begin" style="width: max-content"></el-input>
            ~
            <el-input placeholder="请输入终止分值" v-model="item.end" style="width: max-content"></el-input>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <el-input placeholder="请输入结果描述" v-model="item.name" style="width: max-content"></el-input>
            <el-button v-if="i == this.questionnaire.result.length - 1" type="primary" round
                @click="addResult()">新增分值段</el-button>
            <el-button v-if="i == this.questionnaire.result.length - 1 && this.questionnaire.result.length > 1"
                type="primary" round @click="deleteResult()">删除分值段</el-button>
        </el-row>
        <el-row style="margin-top: 24px;" justify="center">
            <el-button type="primary" round @click="submit">确定</el-button>
            <el-button round @click="cancel">取消</el-button>
        </el-row>
    </div>
</template>

<script>
import axios from "axios";
import store from "@/store";
import {ElMessage} from "element-plus";

export default {
    name: 'DoTest',
    data() {
        return {
            questionnaire: {
                name: '',
                description: '',
                question: [{
                    name: '',
                    option_list: [{ name: '', score: null }]
                }],
                result: [{
                    begin: null,
                    end: null,
                    name: ''
                }]
            }
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        addQuestion() {
            this.questionnaire.question.push({
                name: '',
                option_list: [{ name: '', score: null }]
            });
        },
        deleteQuestion() {
            this.questionnaire.question.pop();
        },
        addOption(index) {
          console.log(JSON.stringify(this.questionnaire));
            this.questionnaire.question[index].option_list.push({ name: '', score: null });
        },
        deleteOption(index) {
            this.questionnaire.question[index].option_list.pop();
        },
        addResult() {
            this.questionnaire.result.push({
                begin: null,
                end: null,
                name: ''
            });
        },
        deleteResult() {
            this.questionnaire.result.pop();
        },
        submit() {
          console.log(JSON.stringify(this.questionnaire))
          axios.post("/questionnaires", {"questionnaire":
                {name: this.questionnaire.name,
                  description: this.questionnaire.description,
                  questions: JSON.stringify(this.questionnaire.question),
                  results: JSON.stringify(this.questionnaire.result)
                }})
              .then(response=> {
                console.log(response.data)
                store.commit('changeLogin',{ Authorization: response.data["data"]['token']});
                this.$router.push({
                  path: '/home',
                  state: { isStudent: this.isStudent }
                })
              })
              .catch(error => {
                console.log(error);
                ElMessage.error("账号或密码错误！")
                this.loginForm.passWord=""
              })
            window.close();
        },
        cancel() {
            window.close();
        }
    }
}
</script>