<template>
    <el-col :span="12" :offset="6">
        <el-row justify="center" style="font-size: 24px; text-align: center; color:blue; font-weight: bold;">{{
            questionnaire[ this.$route.query.index ].name
        }}</el-row>
        <el-row style="font-size: 13px; text-align: left">{{ questionnaire[this.$route.query.index].description }}</el-row>
        <el-row>
            <div v-for="(item, i) in questionnaire[this.$route.query.index].question" :key="i" style="margin-top: 10px">
                <el-row justify="left" style="font-size: 14px">{{ i+ 1}}.&nbsp;{{ item.name }}</el-row>
                <el-row justify="left" style="font-size: 14px"
                        v-for="(option, j) in item.option_list" :key="j">
                    第{{ j+1 }}个选项：{{ option.name }}；&nbsp;&nbsp;&nbsp;&nbsp;该选项的分值：{{ option.score }}。
                </el-row>
                <!-- <el-button type="primary" round @click="changeQuestion(i)">修改问题</el-button> -->
                <el-row type="flex" align="middle" style="font-size: 14px">第{{ i+ 1}}个问题修改：</el-row>
                <el-row type="flex" align="middle" style="font-size: 14px">
                        第{{ i+ 1}}个问题描述：
                    <el-input placeholder="请输入问题描述" v-model="item.name" style="width: max-content"></el-input>
                </el-row>
                <el-row type="flex" align="middle" v-for="(option, j) in item.option_list" :key="j" style="font-size: 14px">
                        第{{ i+ 1}}个问题第{{ j+ 1}}个选项的描述：
                    <el-input placeholder="请输入选项描述" v-model="option.name" style="width: max-content"></el-input>
                            &nbsp;&nbsp;&nbsp;&nbsp;该选项的分值：
                    <el-input placeholder="请输入选项分值" v-model="option.score" style="width: max-content"></el-input>
                </el-row>
            </div>
        </el-row>
        <el-row justify="center">
            <el-button type="primary" round @click="confirm">确认</el-button>
        </el-row>
    </el-col>
</template>

<style>
.el-row {
    margin-bottom: 12px;
}
</style>

<script>
export default {
    name: 'ChangeTest',
    data() {
        return {
            // question_index: window.history.state.index,//error,try solve it next time
            question_index: 0,
            questionnaire: [{
                name: '贝克焦虑量表',
                description: '本量表含有21道关于焦虑一般症状的问题，请仔细阅读每一道题，指出最近一周内（包括当天）被各种症状烦扰的程度',
                question: [{
                    name: '麻木或刺痛',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '感到发热',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '腿部颤抖',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '不能放松',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '害怕发生不好的事情',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '头晕',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '心悸或心率加快',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '心神不定',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '惊吓',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '紧张',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '窒息感',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '手发抖',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '摇晃',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '害怕失控',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '呼吸困难',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '害怕快要死去',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '恐慌',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '消化不良或腹部不适',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '晕厥',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '脸发红',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }, {
                    name: '出汗（不是因暑热冒汗）',
                    option_list: [{ name: '无', score: 1 }, { name: '轻度，无多大烦扰', score: 2 }, { name: '中度，感到不适但尚能忍受', score: 3 }, { name: '重度，只能勉强忍受', score: 4 }]
                }],
                result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                name: '第二个',
                description: '第二个',
                question: [{
                    name: '阿巴',
                    option_list: [{ name: '阿巴', score: 1 }, { name: '阿巴阿巴', score: 2 }, { name: '阿巴阿巴阿巴', score: 3 }, { name: '阿巴阿巴阿巴阿巴', score: 4 }]
                }],
                result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                name: '第三个',
                description: '第三个',
                question: [{
                    name: '阿巴',
                    option_list: [{ name: '阿巴', score: 1 }, { name: '阿巴阿巴', score: 2 }, { name: '阿巴阿巴阿巴', score: 3 }, { name: '阿巴阿巴阿巴阿巴', score: 4 }]
                }],
                result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }, {
                name: '第四个',
                description: '第四个',
                question: [{
                    name: '阿巴',
                    option_list: [{ name: '阿巴', score: 1 }, { name: '阿巴阿巴', score: 2 }, { name: '阿巴阿巴阿巴', score: 3 }, { name: '阿巴阿巴阿巴阿巴', score: 4 }]
                }],
                result: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            }],
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        confirm() {
            //修改后的问卷传送至后端
            window.close();
        },
        changeQuestion(index) {
            this.questionnaire.question[index].pop();
            this.questionnaire.question[index].push({
                name: '',
                option_list: [{ name: '', score: null }]
            });
        },
        addOption(index) {
            this.questionnaire.question[index].option_list.push({ name: '', score: null });
        },
        deleteOption(index) {
            this.questionnaire.question[index].option_list.pop();
        },
    }
}
</script>