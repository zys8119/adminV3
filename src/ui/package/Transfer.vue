<template>
    <div class="Transfer">
        <TransferTree :options="currentOptions" :filterInit="filterInit" ref="left" :nodeId="nodeId" :fieldName="fieldName" :childrenFieldName="childrenFieldName"></TransferTree>
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
                    <TransferTree :ref="`right${i}`" :fieldName="`data.${fieldName}`" :nodeId="nodeId"  :options="optionsMap[i.toString()] || []" :childrenFieldName="childrenFieldName"></TransferTree>
                </div>
            </template>
        </div>
    </div>
</template>

<script lang="ts">
import TransferTree from "./Transfer/TransferTree.vue"
import options from "./data/options.json"
export default {
    name: "Transfer",
    components:{TransferTree},
    props:{
        modelValue: {type:Array,default:()=>[]},
        fieldName:{type:String,default:"node_name"},
        nodeId:{type:String,default:"node_id"},
        // nodeId:{type:String,default:null},
        childrenFieldName:{type:String,default:"children"},
    },
    data(){
        return {
            index:1,
            optionsMap:{},
            options:options
        }
    },
    computed:{
        currentOptions(){
            this.optionsMap = {};
            return this.options
        },
        modelValueMap(){
            return (this.modelValue || []).reduce((a,b)=> (a[b] = true) && a, {});
        },
        optionsMapDeep(){
            return Object.keys(this.optionsMap)
                .reduce((a,b)=>{
                    (this.optionsMap[b] || []).forEach(it=>{
                        a[JSON.stringify(it.deep)] = true;
                    })
                    return a;
                },{});
        }
    },
    watch:{
        modelValue(val,old){
            if(JSON.stringify(val) !== JSON.stringify(old)){
                this.initValue();
            }
        },
    },
    mounted() {
        this.initValue();
    },
    methods:{
        updateModelValue(){
            this.$nextTick(()=>{
                if(this.index === 1){
                    this.$emit("update:modelValue",this.optionsMap[1].map(it=>it.data[this.nodeId]))
                }
            })
        },
        initValue(){
            this.arrowRight(1,this.$refs.left.currentOptions.filter(e=>{
                return this.modelValueMap[e.deep[e.deep.length-1]];
            }));
        },
        filterInit(node){
            const nodeDeepStr = JSON.stringify(node.deep);
            return !this.optionsMapDeep[nodeDeepStr];
        },
        arrowRight(i,getSelection){
            const trf = this.$refs[`right${i}`];
            if(trf) {
                getSelection = getSelection || this.$refs.left.getSelection();
                this.optionsMap[i.toString()] = (this.optionsMap[i.toString()] || []).concat(getSelection);
                this.$refs.left.checkboxAll = false;
                this.$refs.left.$nextTick(() => {
                    this.$refs.left.$forceUpdate
                }).then(()=>{
                    this.updateModelValue();
                })
            }
        },
        arrowLeft(i){
            const trf = this.$refs[`right${i}`];
            if(trf){
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
                trf.$nextTick(()=>{
                    trf.$forceUpdate();
                }).then(()=>{
                    this.updateModelValue();
                })
            }
        }
    }
}
</script>

<style lang="less">
.Transfer{
    display: flex;
    .TransferTree{
        flex: 1;
        .TransferTreeNodeContent{
            max-height: 300px;
            overflow-x: hidden;
        }
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