<template>
    <div>
        <template v-if="isdraggable">
            <draggable v-model="currentOptions"
                       @update="$emit('draggable',currentOptions, true,$event)"
                       :animation="500"
                       item-key="address"
                       :move="draggableMove"
            >
                <template #item="{ element,index }">
                    <slot element="element" index="index"></slot>
                </template>
            </draggable>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </div>
</template>

<script>
import draggable from "vuedraggable"
export default {
    name: "TreeItem",
    components:{
        draggable
    },
    props:{
        // 是否拖拽
        isdraggable:{
            type:Boolean,
            default:false,
        },
        // 选项
        options:{
            type:Array,
            default:Array,
        },
        // 拖拽移动处理回调
        draggableMove:{
            type:Function,
            default:()=>true,
        }
    },
    data(){
        return {
            currentOptions:[]
        }
    },
    watch:{
        options(){
            this.initOption();
        }
    },
    mounted() {
        this.initOption();
    },
    methods:{
        initOption(){
            this.currentOptions = this.options;
        }
    }
}
</script>

<style scoped>

</style>