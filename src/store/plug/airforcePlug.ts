import vue, { Plugin } from "vue"
import { mapState,mapActions } from "vuex"
import "../request/request"
import {WindowCommonAxiosRequestConfig} from "../request/AxiosClassInterface"

const airforcePlug:Plugin = {
    install(App){
        App.mixin({
            computed:{
                ...mapState(["airforce"]),
            },
            methods:{
                axios(options:WindowCommonAxiosRequestConfig){
                    return this.$store.dispatch("axios",options);
                },
            }
        })
    }
}
export default <Plugin> airforcePlug;