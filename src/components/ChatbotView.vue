<template>
    <div style="padding: 10px; margin-bottom: 50px">
        <el-col :span="20">
          <div style="width: 800px; margin: 0 auto; background-color: white;
                      border-radius: 5px; box-shadow: 0 0 10px #ccc">
            <div style="text-align: center; line-height: 50px;">
              <strong>Robot</strong>
            </div>
            <div style="height: 350px; overflow:auto; border-top: 1px solid #ccc">
                <div v-for:="(item,i) in messages" :key="i">
                    <div class="el-row" style="padding: 5px 0" v-if="item.from_bot">
                        <div class="el-col el-col-2" style="text-align: right" >
                            <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">
                                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="object-fit: cover;">
                            </span>
                        </div>
                        <div class="el-col el-col-22" style="text-align: left; padding-left: 10px">
                            <div class="tip right">{{ item.content }}</div>
                        </div>
                    </div>
                    <div class="el-row" style="padding: 5px 0" v-else>
                        <div class="el-col el-col-22" style="text-align: right; padding-right: 10px">
                            <div class="tip left">{{ item.content }}</div>
                        </div>
                        <div class="el-col el-col-2">
                            <span class="el-avatar el-avatar--circle" style="height: 40px; width: 40px; line-height: 40px;">
                                <img src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" style="object-fit: cover;">
                            </span>
                        </div>
                    </div>
                    
                </div>
            </div>
            
            <div style="height: 200px">
              <textarea v-model="text" style="height: 160px; width: 90%; padding: 20px; border: none; border-top: 1px solid #ccc;
               border-bottom: 1px solid #ccc; outline: none"></textarea>
              <div style="text-align: right; padding-right: 10px">
                <el-button type="primary" size="mini" @click="send">发送</el-button>
              </div>
            </div>
          </div>
        </el-col>

    </div>
  </template>
  <script>
  import { ElMessage } from 'element-plus'
  export default {
    data() {
      return {
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        messages: [],
        loaded: false,
        text: "",
        user: {}
      }
    },
    mounted(){
        // if (!this.loaded){
        //     this.getdata();
        // }
        this.timer = setInterval(this.getdata, 1100);//60秒后运行 autoPrintBtnClicked方法
        
    },
    beforeUnmount() {
        clearTimeout(this.timer);
    },
    methods: {
        getdata(){
            // get 请求
            this.$http.get('/chatbot/show').then((resp) => {
                // 处理成功情况
                let json_data=resp.data;
                this.messages=json_data.chatlogs
                this.loaded=true,
                this.user=json_data.user
                console.log(resp.data)
            })
            .catch((error) => {
                // 处理错误情况
                console.log(error);
            });
        },
        send(){
            // todo 处理为空情况
            if (!this.text) {
                ElMessage({type: 'warning', message: "请输入内容"});
                return;
            }
            let params = {
                "content": this.text,
                "user_id": this.user.id,
                "from_bot": false
            };
            console.log(params)
            this.$http({
                method: "post",
                url: "/chatbot/create",
                data: params
            }).then(res => { 
                console.log(res);
            });
            this.text="";
            this.getdata();
            ElMessage({
                message: '发送成功',
                type: 'success',
            })
        }
    }
  }
  </script>
  <style>
  .tip {
    color: white;
    text-align: center;
    border-radius: 10px;
    font-family: sans-serif;
    padding: 10px;
    width:auto;
    display:inline-block !important;
    display:inline;
  }
  .right {
    background-color: deepskyblue;
  }
  .left {
    background-color: forestgreen;
  }
  </style>

