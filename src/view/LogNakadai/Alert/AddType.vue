<template>
    <div class="AddType">
        <el-form label-width="120px">
            <el-form-item label="应用类型名称" required>
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
        </el-form>
        <z-alert-footer>
            <el-button type="primary" @click="save">保存</el-button>
        </z-alert-footer>
    </div>
</template>

<script>
export default {
    name: "AddType",
    data(){
        return {
            formData:{}
        }
    },
    methods:{
        save(){
            if(this.$utils.is_S(this.formData.name)){return this.$message.error("请输入应用类型名称")}
            this.api.LogNakadai.ApplicationType.add(this.formData).then(()=>{
                this.$message({type:"success", message:"保存成功"});
                this.$emit("save")
                this.$ZAlert.hide();
            })
        }
    }
}
</script>

<style scoped lang="less">
.AddType{
}
</style>