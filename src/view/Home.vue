<template>
    <div class="Home">
        <div>全局样式测试</div>
        <el-button @click="aa">打开弹框</el-button>
    </div>
</template>

<script>
export default {
    name: "Home",
    data(){
        return {

        }
    },
    mounted() {
        this.axios({
            url:"/aa",
            method:"get",
            // baseURL:"//"
        }).then(res=>{
            console.log(res)
        })
        // this.axios({
        //     url:"http://www.baidu.com",
        //     method:"get"
        // }).then(res=>{
        //     console.log(res)
        // })
    },
    methods:{
        aa() {
            this.$ZAlert.show({
                title:"adsa",
                components:()=>import("@/view/Alert/Alert.vue"),
                _event:{
                    onSaveA:val=>{
                        console.log(val,2)
                    }
                }
            })
        }
    }
}
</script>

<style scoped lang="less">
.Home{
    div{
        color: @themeColor;
        //color: @success;
        font-size: @unit15;
    }
}
</style>