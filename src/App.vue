<template>
    <div class="App">
        <router-view></router-view>
    </div>
</template>

<script lang="ts">
export default {
    name: "App",
    created() {
        (<any>window)._this = this;
    }
}
</script>

<style scoped lang="less">
.App{
}
</style>