<template>
    <div class="Home">
        asdadsdfsdf
    </div>
</template>

<script>
export default {
    name: "Home",
    mounted() {
        // console.log(this.$store,111)
        // console.log(this.airforce)
        this.airforce.input("aa","a.b.c",{})
        this.airforce.input("bb",{})
        this.airforce.input("bb","asdad")
        this.airforce.input("bb","asdad",0)
        // this.airforce.input("bb","asdad",false)
        // this.airforce.input("cc","asdad",null)
        this.airforce.input("dd","[1]",[454])
        this.airforce.input("ee","c",[454])
        console.log(this.airforce)
    }
}
</script>

<style scoped lang="less">
.Home{
}
</style>