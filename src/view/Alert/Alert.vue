<template>
    <div class="Alert">
        我是内容{{aaa}}---{{airforce.AAA}}
        <el-button @click="test">adsada</el-button>
        <ZAlertFooter><el-button @click="test">adsada</el-button></ZAlertFooter>
        <div>----{{ bb }}</div>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props:{
        aaa:{type:String, default:null},
        bb:{type:Object,default: Object}
    },
    emits: {
        save(){
            console.log(222)
        }
    },
    mounted() {
    },
    methods:{
        test(){
            this.$emit("save",[]);
            this.$ZAlert.hide()
        }
    }
}
</script>

<style scoped lang="less">
.Alert{
}
</style>