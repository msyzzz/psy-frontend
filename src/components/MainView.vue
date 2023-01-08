<template>
    <div id="main-view">
        <el-header style=" font-size: 30px; background: #409EFF">
            <el-col :span="6">
                <span style="color: #ffffff; text-align:center; line-height:60px;">果壳心理</span>
            </el-col>
        </el-header>
        <el-row>
            <el-col :span="3">
                <el-menu default-active="1" class="el-menu-vertical-demo" @select="menuSelect">
                    <el-menu-item index="1">
                        <el-icon>
                            <document />
                        </el-icon>
                        测评
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon><chat-dot-round /></el-icon>
                        咨询
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <reading />
                        </el-icon>
                        知识
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <user />
                        </el-icon>
                        我的
                    </el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="20">
                <div class="content">
                    <div v-if="selectIndex == 1">
                        <StudentTest v-if="isStudent == true"></StudentTest>
                        <DoctorTest v-else></DoctorTest>
                    </div>
                    <div v-if="selectIndex == 2">
                        <StudentConsult v-if="isStudent == true"></StudentConsult>
                        <DoctorConsult v-else></DoctorConsult>
                    </div>
                    <div v-if="selectIndex == 3">
                        <KnowledgeView />
                    </div>
                    <div v-if="selectIndex == 4">
                        <MineView />
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import StudentTest from '../components/StudentTest'
import DoctorTest from '../components/DoctorTest'
import StudentConsult from '../components/StudentConsult'
import DoctorConsult from '../components/DoctorConsult'
import KnowledgeView from '../components/KnowledgeView'
import MineView from '../components/MineView'

export default {
    name: 'MainView',
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        }
    },
    data() {
        return {
            selectIndex: 1,
            isStudent: window.history.state.isStudent,
            id: '',
        }
    },
    components: {
        StudentTest, DoctorTest, StudentConsult, DoctorConsult, KnowledgeView, MineView
    },
    created() {
        // this.id = this.$route.query.id;
    }
}
</script>