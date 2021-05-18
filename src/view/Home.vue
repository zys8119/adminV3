<template>
    <div class="Home">
        asdadsdfsdf
        <el-button type="primary">asdasd</el-button>
        <div>{{airforce.AAAA | BB}}</div>
    </div>
</template>

<script>
export default {
    name: "Home",
    mounted() {
        this.axios({
            method:"get",
            url:"http://localhost:81/Dome",
            ModuleName:"AAAA"
        }).then(res=>{
            console.log(res)
            console.log(this.airforce)
            console.log(this)
        })
    }
}
</script>

<style scoped lang="less">
.Home{
}
</style>