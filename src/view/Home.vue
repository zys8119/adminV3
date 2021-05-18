<template>
    <div class="Home">
        asdadsdfsdf
        <el-button type="primary">asdasd</el-button>
        <div>{{airforce.AAAA}}</div>
    </div>
</template>

<script>
export default {
    name: "Home",
    mounted() {
        // window.common.Axios({
        //     url:"/a"
        // })
        this.axios({
            a:11,
            url:"http://localhost:81/Dome",
            method:"get",
            // ModelName:"asda",
            ModuleName:"AAAA",
        }).then(res=>{
            console.log(res,2222)
            console.log(this.airforce)
        }).catch(errs=>{
            console.log(errs,33)
        })
    }
}
</script>

<style scoped lang="less">
.Home{
}
</style>