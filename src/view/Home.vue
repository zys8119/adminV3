<template>
    <div class="Home">
        asdadsdfsdf
    </div>
</template>

<script>
export default {
    name: "Home",
    mounted() {
        console.log(this.$store,111)
        console.log(this.airforce)
        this.airforce.input("aa","a.b.c",{})
        console.log(this.airforce)
    }
}
</script>

<style scoped lang="less">
.Home{
}
</style>