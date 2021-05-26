<template>
    <div class="Home">
        <div>全局样式测试</div>
        <el-button @click="aa">打开弹框</el-button>
        <content-table
            @test="test"
            @dataChange="dataChange"
            :columns="columns"
            ref="table"
            @on-selection="selection"
        ></content-table>
    </div>
</template>

<script lang="ts">
export default {
    name: "Home",
    data(){
        return {
            columns:[
                {label:"45", type:"selection"},
                {label:"45", type:"number"},
                {label:"45", prop:"name"},
                {label:"a54sd", prop:"b",ellipsis3:true, type:"tooltip"},
                {label:"c", prop:"c.b.a", emit:"test", className:"primary_link"},
                {label:"45", type:"operate", btns:[
                    {name:"Asd", type:"text", className:"delete_link", emit:'test'},
                    {name:"Asd", type:"text", className:"primary", show:row=>row.c},
                ]},
            ]
        }
    },
    mounted() {
        this.$refs.table.ContentTableData = [
            {name:"asdada",b:"测试数据"},
            {name:"asdada",b:"测试数据",c:{b:{a:"阿萨大大"}}},
            {name:"asdada", b:"阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨阿松大萨达阿萨",c:{b:{a:"阿萨大大"}}},
        ];
    },
    methods:{
        selection(v){
            console.log(v)
        },
        aa() {
            this.$ZAlert.show({
                title:"adsa",
                _components:()=>import("./Alert/Alert.vue"),
                _event:{
                    onSaveA:val=>{
                        console.log(val,2)
                    }
                },
                _props:{},
            })
        },
        dataChange(d){
            console.log(d)
            return true
        },
        test(e){
            console.log(e,11)
        }
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