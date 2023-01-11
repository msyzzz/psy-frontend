<template>
    <div id="mine-view">
        <el-menu default-active="1" class="el-menu-horizontal" mode="horizontal" @select="menuSelect">
            <el-menu-item index="1">个人信息</el-menu-item>
        </el-menu>
        <div id="appoint" v-if="selectIndex == 1">
            <el-row type="flex" align="middle" style="font-size: 16px; text-align: center; margin-left: 15px; margin-top: 10px">
                {{user.name}}<br/>{{user.department}}<br/>{{user.type}}
            </el-row>
            <el-row type="flex" align="middle" style="margin-left: 15px; margin-top: 10px">
                <el-button type="primary" round @click="changePassword">修改密码</el-button>
                <el-button type="primary" round @click="quit">退出登录</el-button>
            </el-row>
        </div>
    </div>

    <el-dialog v-model="dialogVisible" title="修改密码" append-to-body width="30%" :before-close="handleClose">
        <el-form :model="form">
            <el-form-item label="原始密码" :label-width="formLabelWidth">
                <el-input v-model="form.origin_password" type="password" placeholder="请输入原始密码"/>
            </el-form-item>
            <el-form-item label="新密码" :label-width="formLabelWidth">
                <el-input v-model="form.new_password" type="password" placeholder="请输入新密码"/>
            </el-form-item>
            <el-form-item label="确认新密码" :label-width="formLabelWidth">
                <el-input v-model="form.new_pw_again" type="password" placeholder="请确认新密码"/>
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
import axios from "axios";

export default {
    name: 'MineView',
    data() {
        return {
            selectIndex: 1,
            dialogVisible: false,
            form: {
                origin_password: '',
                new_password: '',
                new_pw_again: ''
            },
            user: {id: 1, name: '柴文健', type: '学生', department: '计算机学院'}
        }
    },
    methods: {
        menuSelect(index) {
            this.selectIndex = index;
        },
        changePassword() {
            this.dialogVisible = true;
        },
        quit() {
            this.$router.push({
                path: '/',
            });
        },
        handleClose() {
            this.dialogVisible = false;
        },
        onSubmit() {
            ElMessageBox.confirm('确认修改？',  'Warning', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
              axios.patch("/users/" + this.user.id.toString(),
                  {"user":{"password": this.form.new_password}}).then(()=> {
                this.dialogVisible = false;
                ElMessage({
                  type: 'success',
                  message: '修改成功！',
                })
              }).catch(error => {
                    console.log(error);
                    ElMessage.error("账号或密码错误！")
                  })

            }).catch(() => {})
        }
    },
    created() {
      axios.get("/users").then(response=> {
        let data = response.data["data"];
        this.user.name = data["name"];
        this.user.department = data["department"];
        this.user.id = data["id"];
        if(data["role"] === 1){
          this.user.type = "普通用户";
        }
        else{
          this.user.type = "咨询师";
        }
      })
          .catch(error => {
            console.log(error);
            ElMessage.error("账号或密码错误！")
          })
    }
}
</script>