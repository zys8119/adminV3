<template>
    <div class="Alert">
        我是内容{{aaa}}---{{airforce.AAA}}
        <el-button @click="test">adsada</el-button>
        <ZAlertFooter><el-button @click="test">adsada</el-button></ZAlertFooter>
    </div>
</template>

<script>
export default {
    name: "Alert",
    props:{
        aaa:{type:String, default:null}
    },
    mounted() {
    },
    methods:{
        test(){
            this.$emit("save","564645645",5445);
            this.$ZAlert.hide()
        }
    }
}
</script>

<style scoped lang="less">
.Alert{
}
</style>