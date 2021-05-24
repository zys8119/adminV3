<template>
    <div class="Home">
        <div>全局样式测试</div>
        <el-button @click="aa">打开弹框</el-button>
    </div>
</template>

<script lang="ts">

export default {
    name: "Home",
    data(){
        return {

        }
    },
    mounted() {
    },
    methods:{
        aa() {
            this.$ZAlert.show({
                title:"adsa",
                components:()=>import("./Alert/Alert.vue"),
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