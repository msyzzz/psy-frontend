<template>
    <div id="doctor-test">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">测评问卷</el-menu-item>
            <el-menu-item index="2">测评结果</el-menu-item>
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
                        <el-row style="margin: 2px">
                            <el-button type="primary" round @click="goCheck(i)">查看</el-button>
                            <el-button type="primary" round @click="goRelease">发布任务</el-button>
                        </el-row>
                        <el-row style="margin: 2px">
                            <el-button v-if="item.isCreator == true" type="primary" round
                                @click="goChange">更改</el-button>
                            <el-button v-if="item.isCreator == true" type="danger" round
                                @click="goDelete">删除</el-button>
                        </el-row>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
            <el-button type="primary" round @click="goCreate">创建问卷</el-button>
        </div>
        <div id="result" v-if="selectIndex == 2">
            <div v-for="(item, i) in mission_list" :key="i">
                <el-row style="type: flex; justify: space-around; align-items: center">
                    <el-col :span="19" style="margin-left: 15px; margin-top: 10px">
                        <el-row style="font-size: 16px; text-align: left">{{ item.name }}</el-row>
                        <el-row style="font-size: 12px; text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;截止至{{
                            item.due
                        }}</el-row>
                        <el-row style="font-size: 12px; text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;参与人员：{{
                            item.person_range
                        }}</el-row>
                        <el-row style="font-size: 12px; text-align: left">&nbsp;&nbsp;&nbsp;&nbsp;完成人数：{{
                            item.finish
                        }}/{{ item.total }}</el-row>
                    </el-col>
                    <el-col :span="4" style="type: flex; align: center">
                        <el-button type="primary" round @click="goResult">导出结果</el-button>
                    </el-col>
                </el-row>
                <el-divider style="margin: 6px 0"></el-divider>
            </div>
        </div>
    </div>

    <el-dialog v-model="dialogVisible" title="发布任务" append-to-body width="30%" :before-close="handleClose">
        <el-form :model="form">
            <el-form-item label="截止日期" :label-width="formLabelWidth">
                <el-date-picker v-model="form.time" value-format="yyyy-MM-DD" type="date" placeholder="选择截止日期" />
            </el-form-item>
            <el-form-item label="目标群体" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="选择目标人群">
                    <el-option label="全体成员" value="all" />
                    <el-option label="全体教职工" value="all_student" />
                    <el-option label="计算机学院学生" value="compute_student" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script>
import { ElMessage, ElMessageBox } from 'element-plus'

export default {
    name: 'DoctorTest',
    data() {
        return {
            selectIndex: 1,
            dialogVisible: false,
            form: {
                time: '',
                region: 'all'
            },
            test_list: [{
                id: 1,
                name: '贝克焦虑量表',
                description: '焦虑自测问卷，能够反映被试者焦虑状况的严重程度，适用对象为具有焦虑症状的成年人',
                question_number: 21,
                isCreator: false
            }, {
                id: 2,
                name: '情感一社会孤独量表',
                description: '测量情感孤独与社会孤独状况的工具：情感孤独，指缺乏与某人产生亲近与情爱的关系；社会孤独，指缺乏由志趣相投、一起活动的朋友所构成的社交圈子',
                question_number: 10,
                isCreator: false
            }, {
                id: 3,
                name: '16种人格因素问卷',
                description: '从乐群、聪慧、自律、独立、敏感、冒险、怀疑等16个相对独立的人格特点对人进行描绘，并可以了解应试者在环境适应、专业成就和心理健康等方面的表现',
                question_number: 187,
                isCreator: false
            }, {
                id: 4,
                name: '抑郁症自测问卷',
                description: '这个问卷可以让你了解被诊断为抑郁症的一些症状，你正经历的这些症状有多严重，以及抑郁症的整体影响或严重程度',
                question_number: 21,
                isCreator: true
            }],
            mission_list: [{
                id: 1,
                name: '贝克焦虑量表',
                due: '2022年12月1日',
                person_range: '全体学生, 全体教职工',
                total: 10,
                finish: 6
            }, {
                id: 2,
                name: '抑郁症调查问卷',
                due: '2022年11月30日',
                person_range: '计算机学院学生, 电子学院学生',
                total: 3,
                finish: 1
            }],
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        goCheck(i) {    //展示问卷
            var route = this.$router.resolve({
                path: '/show_test',
                query: {
                    index: i
                }
            });
            window.open(route.href);
        },
        goCreate() {
            var route = this.$router.resolve({
                path: '/create_test'
            });
            window.open(route.href);
        },
        goRelease() {
            this.dialogVisible = true;
        },
        handleClose() {
            this.dialogVisible = false;
        },
        onSubmit() {
            ElMessageBox.confirm('确认发布？', 'Warning', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                this.dialogVisible = false;
                ElMessage({
                    type: 'success',
                    message: '发布成功！',
                })
            }).catch(() => { })
        }
    }
}
</script>