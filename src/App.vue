<template>
    <div class="App">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    created() {
        window._this = this;
    }
}
</script>

<style scoped lang="less">
.App{
}
</style>