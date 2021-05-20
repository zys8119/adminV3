<template>
    <div class="Home">
    </div>
</template>

<script>
export default {
    name: "Home",
    data(){
        return {
            show:true,
            aaa:"adsas------asdass"
        }
    },
    mounted() {
       this.$ZAlert.show({
           title:"标题",
           components:()=>import("./Alert/Alert.vue"),
           props:{
               aaa:this.aaa,
               bb:{
                   a:11
               }
           },
           _event:{
               save:(val,b)=>{
                   console.log(val,9999,b)
                   // return 546456;
               }
           }
       });
    }
}
</script>

<style scoped lang="less">
.Home{
}
</style>