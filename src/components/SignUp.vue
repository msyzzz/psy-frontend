<template>
<div id="signup-view">
    <el-header style=" font-size: 30px; background: #409EFF">
        <el-col :span="6">
            <span style="color: #ffffff; text-align:center; line-height:60px;">果壳心理</span>
        </el-col>
    </el-header>
    <div class="signup">
        <div class="signup-box" style="margin: auto; width: 225px;">
            <h4>注册</h4>
            <div class="actor" style="text-align: right;">
            </div>
            <el-form :model="signupForm" :rules="signupRules" ref="signupForm" label-width="0px" align="center" class="form">
                <el-form-item label="" prop="account" style="width: 100%">
                    <el-row>
                        <el-col :span="4">
                            <el-icon><avatar /></el-icon>
                        </el-col>
                        <el-col :span="20">
                            <el-input class="inps" placeholder="学号或工号" v-model="signupForm.account"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
                <el-form-item label="" prop="passWord">
                    <el-row>
                        <el-col :span="4">
                            <el-icon><lock /></el-icon>
                        </el-col>
                        <el-col :span="20">
                            <el-input class="inps" type="password" placeholder="密码" v-model="signupForm.passWord"></el-input>
                        </el-col>
                    </el-row>
                </el-form-item>
              <el-form-item label="" prop="name">
                <el-row>
                  <el-col :span="4">
                    <el-icon><lock /></el-icon>
                  </el-col>
                  <el-col :span="20">
                    <el-input class="inps" placeholder="您的姓名" v-model="signupForm.name"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
                <el-form-item style="margin-top: 30px">
                    <el-button type="primary" round class="submitBtn" @click="submitForm">注册</el-button>
                </el-form-item>
              <div class="unsignup">
                <router-link :to="{ path: '/' }"> 登录</router-link>
              </div>
            </el-form>
        </div>
    </div>
</div>
</template>

<script>
import {signup} from "@/utils/communication";
export default {
    name: "SignUp",
    data: function () {
        return {
            holder: '',
            isStudent: true, 
            signupForm: {
                account: "",
                passWord: "",
                name: "",
            },
            signupRules: {
                account: [{ required: true, message: "请输入账号", trigger: "blur" }],
                passWord: [{ required: true, message: "请输入密码", trigger: "blur" }],
            },
        };
    },
    methods: {
        submitForm() {
            const userAccount = this.signupForm.account;
            const userPassword = this.signupForm.passWord;
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
            let retToken = signup({
              user:{
                index: userAccount,
                password: userPassword,
                name: this.signupForm.name
              }
            })
            if (!retToken) return
            this.$router.push({
                path: '/',
                // query: {
                //     id: '196160e2345c7c9550cc560e38543e637d068ccf4e8a504e9eb7a3fa',
                // }
            });
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
    }
};
</script>

<style>
.el-form-item__content {
    justify-content: space-around;
}
</style>