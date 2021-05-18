<template>
    <div class="Home">
        asdadsdfsdf
        <el-button type="primary">asdasd</el-button>
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
        }).then(res=>{
            console.log(res,2222)
        })
    }
}
</script>

<style scoped lang="less">
.Home{
}
</style>