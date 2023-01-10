<template>
    <div id="login-view">
        <el-header style=" font-size: 30px; background: #409EFF">
            <el-col :span="6">
                <span style="color: #ffffff; text-align:center; line-height:60px;">果壳心理</span>
            </el-col>
        </el-header>
        <div class="login">
            <div class="login-box" style="margin: auto; width: 225px;">
                <h4>登录</h4>
                <div class="actor" style="text-align: right;">
                    <h5 v-if="isStudent" v-on:click="changeActor">
                        <font color="#0000FF">心理咨询师登录</font>
                    </h5>
                    <h5 v-else v-on:click="changeActor">
                        <font color="#0000FF">学生或教职工登录</font>
                    </h5>
                </div>
                <el-form :model="loginForm" :rules="loginRules" ref="loginForm" label-width="0px" align="center"
                    class="form">
                    <el-form-item label="" prop="account" style="width: 100%">
                        <el-row>
                            <el-col :span="4">
                                <el-icon>
                                    <avatar />
                                </el-icon>
                            </el-col>
                            <el-col :span="20">
                                <el-input class="inps" :placeholder="getHolder" v-model="loginForm.account"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item label="" prop="passWord">
                        <el-row>
                            <el-col :span="4">
                                <el-icon>
                                    <lock />
                                </el-icon>
                            </el-col>
                            <el-col :span="20">
                                <el-input class="inps" type="password" placeholder="密码"
                                    v-model="loginForm.passWord"></el-input>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item style="margin-top: 30px">
                        <el-button type="primary" round class="submitBtn" @click="submitForm">登录</el-button>
                    </el-form-item>
                    <div class="unlogin">
                        <router-link :to="{ path: '/forgetpwd' }"> 忘记密码?</router-link>
                    </div>
                    <div class="unlogin">
                        <router-link :to="{ path: '/signup' }"> 注册</router-link>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import API from "@/utils/API";
import axios from "axios";
import store from "@/store";
import { ElMessage } from 'element-plus'
export default {
    name: "LogIn",
    data: function () {
        return {
            holder: '',
            isStudent: true,
            loginForm: {
                account: "",
                passWord: "",
            },
            loginRules: {
                account: [{ required: true, message: "请输入账号", trigger: "blur" }],
                passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm() {
            const userAccount = this.loginForm.account;
            const userPassword = this.loginForm.passWord;
            if (!userAccount) {
                return this.$message({
                    type: "error",
                    message: "账号不能为空！",
                });
            }
            if (!userPassword) {
                return this.$message({
                    type: "error",
                    message: "密码不能为空！",
                });
            }
            console.log("用户输入的账号为：", userAccount);
            console.log("用户输入的密码为：", userPassword);
            let url = API.LOGIN.path;
            let params = {
              user:{
                index: userAccount,
                password: userPassword
              }
            };
            axios.post(url, params)
                .then(response=> {
                  console.log(response.data["data"]["token"])
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
        },
        changeActor() {
            if (this.isStudent) {
                this.isStudent = false;
            } else {
                this.isStudent = true;
            }
        }
    },
    computed: {
        getHolder() {
            if (this.isStudent) {
                return "学号或教职工账号";
            }
            return "心理咨询师账号";
        }
    }
};
</script>

<style>
.el-form-item__content {
    justify-content: space-around;
}
</style>