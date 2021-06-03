<template>
    <div class="Transfer">
        <TransferTree></TransferTree>
    </div>
</template>

<script lang="ts">
import TransferTree from "./Transfer/TransferTree.vue"
export default {
    name: "Transfer",
    components:{TransferTree},
}
</script>

<style scoped lang="less">
.Transfer{
}
</style>