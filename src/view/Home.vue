<template>
    <div class="Home">
        <div>全局样式测试</div>
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