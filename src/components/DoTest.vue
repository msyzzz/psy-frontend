<template>
    <el-col :span="12" :offset="6">
        <el-row justify="center" style="font-size: 24px; text-align: center; color:blue; font-weight: bold;">{{
            questionnaire.name
        }}</el-row>
        <el-row justify="center" style="font-size: 13px; text-align: left">{{
            questionnaire.description
        }}</el-row>
        <el-row>
            <el-col v-for="(item, i) in questionnaire.question" :key="i" style="margin-top: 10px">
                <el-row justify="center" style="font-size: 14px">{{ i+ 1}}.&nbsp;{{ item.name }}</el-row>
                <el-row justify="center">
                    <el-select v-model="questionnaire.result[i]">
                        <el-option v-for="(option, j) in item.option_list" :label="option.name" :value="j"
                            :key="j"></el-option>
                    </el-select>
                </el-row>
            </el-col>
        </el-row>
        <el-row justify="center">
            <el-button type="primary" round @click="submit()">提交</el-button>
            <el-button round @click="cancel">取消</el-button>
        </el-row>
    </el-col>
</template>

<style>
.el-row {
    margin-bottom: 12px;
}
</style>

<script>
import axios from "axios";
import {ElMessage} from "element-plus";

export default {
    name: 'DoTest',
    data() {
        return {
          question_id: window.history.state.question_index,//error,try solve it next time
          task_id: window.history.state.task,//error,try solve it next time
          questionnaire: {
            name: '贝克焦虑量表',
            description: '本量表含有21道关于焦虑一般症状的问题，请仔细阅读每一道题，指出最近一周内（包括当天）被各种症状烦扰的程度',
            question_number: 21,
            question: [{
              name: '麻木或刺痛',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '感到发热',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '腿部颤抖',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '不能放松',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '害怕发生不好的事情',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '头晕',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '心悸或心率加快',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '心神不定',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '惊吓',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '紧张',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '窒息感',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '手发抖',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '摇晃',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '害怕失控',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '呼吸困难',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '害怕快要死去',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '恐慌',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '消化不良或腹部不适',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '晕厥',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '脸发红',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }, {
              name: '出汗（不是因暑热冒汗）',
              option_list: [{name: '无', score: 1}, {
                name: '轻度，无多大烦扰',
                score: 2
              }, {name: '中度，感到不适但尚能忍受', score: 3}, {name: '重度，只能勉强忍受', score: 4}]
            }],
            result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          },
          // {
          //     name: '情感一社会孤独量表',
          //     description: '本量表含有10道题目',
          //     question: [{
          //         name: '我好像没有能交心的朋友，周围的人都像是陌生人。',
          //         option_list: [{ name: '从无', score: 1 }, { name: '偶有', score: 2 }, { name: '有时', score: 3 }, { name: '经常', score: 4 }, { name: '很经常', score: 5 }]
          //     }, {
          //         name: '我在所处的集体中找不到归属感。',
          //         option_list: [{ name: '从无', score: 1 }, { name: '偶有', score: 2 }, { name: '有时', score: 3 }, { name: '经常', score: 4 }, { name: '很经常', score: 5 }]
          //     }, {
          //         name: '身边大部分人能理解我的追求和爱好，也能理解我的看法。',
          //         option_list: [{ name: '从无', score: 5 }, { name: '偶有', score: 4 }, { name: '有时', score: 3 }, { name: '经常', score: 2 }, { name: '很经常', score: 1 }]
          //     }, {
          //         name: '几乎没有人能让我觉得我们是亲密无间、可以依赖的。',
          //         option_list: [{ name: '从无', score: 1 }, { name: '偶有', score: 2 }, { name: '有时', score: 3 }, { name: '经常', score: 4 }, { name: '很经常', score: 5 }]
          //     }, {
          //         name: '在遇到事情的时候，我有能给我鼓励和支持的朋友或是爱人。',
          //         option_list: [{ name: '从无', score: 5 }, { name: '偶有', score: 4 }, { name: '有时', score: 3 }, { name: '经常', score: 2 }, { name: '很经常', score: 1 }]
          //     }, {
          //         name: '在朋友中，我有归属感，我能感到自己是其中的一员。',
          //         option_list: [{ name: '从无', score: 5 }, { name: '偶有', score: 4 }, { name: '有时', score: 3 }, { name: '经常', score: 2 }, { name: '很经常', score: 1 }]
          //     }, {
          //         name: '在需要人陪伴的时候，我能找到与我相伴的人。',
          //         option_list: [{ name: '从无', score: 5 }, { name: '偶有', score: 4 }, { name: '有时', score: 3 }, { name: '经常', score: 2 }, { name: '很经常', score: 1 }]
          //     }, {
          //         name: '直到现在，我都没能找到与我心灵契合、相互理解的人。',
          //         option_list: [{ name: '从无', score: 1 }, { name: '偶有', score: 2 }, { name: '有时', score: 3 }, { name: '经常', score: 4 }, { name: '很经常', score: 5 }]
          //     }, {
          //         name: '我觉得我可以给另一个人的感情产生重大影响。',
          //         option_list: [{ name: '从无', score: 5 }, { name: '偶有', score: 4 }, { name: '有时', score: 3 }, { name: '经常', score: 2 }, { name: '很经常', score: 1 }]
          //     }, {
          //         name: '我没有恋爱关系或是婚姻关系。',
          //         option_list: [{ name: '从无', score: 1 }, { name: '偶有', score: 2 }, { name: '有时', score: 3 }, { name: '经常', score: 4 }, { name: '很经常', score: 5 }]
          //     }],
          //     result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          // }]
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        submit() {
          console.log(JSON.stringify(this.questionnaire))
            var final_score = 0;
            for (var i = 0; i < this.questionnaire.question.length; i++) {
                final_score += parseInt(this.questionnaire.question[i].option_list[this.questionnaire.result[i]].score);
            }
            console.log(final_score);
            // window.close();
          axios.post("results",{"result":{
              "name": this.questionnaire.name,
              "questionnaire_id":this.question_id,
              "score":final_score}}).then((response)=>{
                if(this.task_id !== -1) {
                  axios.post("/tasks/result", {id: this.task_id, result: response.data["data"]["id"]})
                }
            this.$router.push({
              path: '/home',
              state: {isStudent: true}
            })
          })
        },
        cancel() {
          this.$router.push({
            path: '/home',
            state: {isStudent: true}
          })
        }
    },
    created() {
      console.log(this.questionnaire.name)
      // axios.post("/questionnaires", {"questionnaire":
      //       {name: this.questionnaire.name,
      //         description: this.questionnaire.description,
      //         questions: JSON.stringify(this.questionnaire.question),
      //         results: JSON.stringify(this.questionnaire.result),
      //         question_number: this.questionnaire.question.length,
      //       }})
      axios.get("/questionnaires/"+window.history.state.question_index.toString()).then(response=> {
        let dat=response.data["data"];
        this.questionnaire.name=dat["name"];
        this.questionnaire.description=dat["description"];
        this.questionnaire.question = JSON.parse(dat["questions"]);
        //this.questionnaire = dat
      })
          .catch(error => {
            console.log(error);
            ElMessage.error("账号或密码错误！")
          })
    }
}
</script>