<template>
    <div class="Transfer">
        <TransferTree :options="options" :filterInit="filterInit" ref="left" :fieldName="fieldName" :childrenFieldName="childrenFieldName"></TransferTree>
        <div class="TransferRightContent">
            <template v-for="i in index" :key="i">
                <div class="TransferRightContentItem">
                    <div class="arrow">
                        <div class="arrowContent">
                            <div class="arrowContentItem">
                                <el-button icon="el-icon-arrow-right" @click="arrowRight(i)"></el-button>
                            </div>
                            <div class="arrowContentItem">
                                <el-button icon="el-icon-arrow-left" @click="arrowLeft(i)"></el-button>
                            </div>
                        </div>
                    </div>
                    <TransferTree :ref="`right${i}`" :fieldName="`data.${fieldName}`" :options="optionsMap[i.toString()] || []" :childrenFieldName="childrenFieldName"></TransferTree>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import TransferTree from "./Transfer/TransferTree.vue"
export default {
    name: "Transfer",
    components:{TransferTree},
    props:{
        fieldName:{type:String,default:"name"},
        childrenFieldName:{type:String,default:"children"},
    },
    data(){
        return {
            index:3,
            optionsMap:{},
            options:[
                {name:"1",id:"1444"},
                {name:"2",id:"1444",children:[
                        {name:"2-1",id:"1444"},
                        {name:"2-2",id:"1444"},
                        {name:"2-3",id:"1444"},
                    ]},
                {name:"3",id:"1444",children:[
                        {name:"3-1",id:"1444"},
                        {name:"3-2",id:"1444"},
                        {name:"3-3",id:"1444",children:[
                                {name:"3-3-1",id:"1444",children:[
                                        {name:"3-3-1-1",id:"1444",children:[

                                            ]},
                                    ]},
                            ]},
                        {name:"3-4",id:"1444"},
                    ]},
                {name:"4",id:"1444"},
            ]
        }
    },
    methods:{
        filterInit(node){
            return Object.keys(this.optionsMap).reduce((a,b)=>a.concat(this.optionsMap[b]),[]).map(e=>JSON.stringify(e.deep)).indexOf(JSON.stringify(node.deep)) === -1;
        },
        arrowRight(i){
            const getSelection = this.$refs.left.getSelection();
            this.optionsMap[i.toString()] = (this.optionsMap[i.toString()] || []).concat(JSON.parse(JSON.stringify(getSelection)));
            getSelection.forEach(it=>{
                const index = this.$refs.left.currentOptions.indexOf(it)
                if(index > -1){
                    this.$refs.left.currentOptions.splice(index,1)
                }
            });
            this.$refs.left.checkboxAll = false;
            this.$refs.left.$forceUpdate();
        },
        arrowLeft(i){
            const trf = this.$refs[`right${i}`];
            const getSelection = trf.getSelection().reverse();
            const currentOptions = (this.optionsMap[i.toString()] || []);
            const currentOptionsDeep = currentOptions.map(e=>JSON.stringify(e.deep));
            getSelection.forEach(it=>{
                const index = currentOptionsDeep.indexOf(JSON.stringify(it.data.deep))
                if(index > -1){
                    currentOptions.splice(index,1);
                }
            })
            trf.checkboxAll = false;
            trf.$forceUpdate();
        }
    }
}
</script>

<style scoped lang="less">
.Transfer{
    display: flex;
    .TransferTree{
        flex: 1;
    }
    .TransferRightContent{
        flex: 1;
        .TransferRightContentItem{
            display: flex;
            &+.TransferRightContentItem{
                margin-top: @unit15;
            }
            .arrow{
                width: 120px;
                display: flex;
                justify-content: center;
                align-items: center;
                .arrowContent{
                    .arrowContentItem{
                        &+.arrowContentItem{
                            margin-top: 30px;
                        }
                    }
                }
            }
        }
    }
}
</style>