<template>
    <div class="Home">
        <el-button @click="$router.push('/test')">跳转测试页面</el-button>
        asdasdasd
        <div v-for="i in 100">{{i}}</div>
    </div>
</template>

<script>
export default {
    name: "Home"
}
</script>

<style scoped lang="less">
.Home{
}
</style>