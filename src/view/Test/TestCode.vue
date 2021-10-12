<template>
    <div class="TestCode">
        <div class="banner">
            <div class="_t">{{$route.query.title || "浙江省人民医院"}}</div>
            <div class="row">
                <div class="_l">{{$route.query.name || "陈*云"}} | 住院通行证</div>
                <div class="_r">病区：{{$route.query.area || "日间医疗中心"}}</div>
            </div>
        </div>
        <div class="codeBox">
            <div class="codeBoxContent">
                <div class="code">
                    <img src="/public/images/code.png"/>
                </div>
                <div class="msg">请将二维码靠近摄像头刷码</div>
                <div class="time" @click="init">更新于 {{time}} <span class="iconfont">&#xe61c;</span></div>
                <div class="time m-t-30">录入人脸信息</div>
            </div>
            <div class="btnBox">
                <div class="btn">体温登记</div>
            </div>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs"
export default {
    name: "TestCode",
    data(){
        return {
            time:null,
        }
    },
    created() {
        this.init()
    },
    mounted() {
        this.init()
    },
    methods:{
        init(){
            document.title = "我的通行证"
            this.time = dayjs().format('YYYY-MM-DD HH:mm:ss');
        }
    }
}
</script>

<style scoped lang="less">
.TestCode {
    .banner{
        background-image:url("/public/images/code_top_bg.png") ;
        background-repeat: no-repeat;
        background-size: cover;
        min-height: 168px;
        color: #ffffff;
        padding:@unit15;
        ._t{
            font-family: 微软雅黑;
            font-size: 20px;
            font-weight: bold;
            letter-spacing: 2px;
        }
        .row{
            font-family: 黑体;
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 14px;
            margin: 10px 0;
            color: #eef3fd;
            ._l{
            }
            ._r{

            }
        }
    }
    .codeBox{
        padding:0 @unit15;
        transform: translateY(-114px);
        .codeBoxContent{
            padding: @unit15;
            text-align: center;
            background-color: #ffffff;
            border-radius: 5px;
            .msg{
                color: #a8a8a8;
                font-size: 14px;
                background-color: #f5f5f5;
                width: 75%;
                margin: 10px auto 15px auto;
                padding: 5px 0;
                border-radius: 10px;
            }
            .time{
                font-size: 14px;
                .iconfont{
                    color: #5684e8;
                    margin-left: 10px;
                }
            }
        }
        .btnBox{
            margin-top: @unit15;
            .btn{
                background-color: #5487f0;
                color: #ffffff;
                font-size: 14px;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 50px;
                border-radius: 5px;
            }
        }
    }
}
</style>