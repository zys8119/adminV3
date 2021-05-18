import vue, { Plugin } from "vue"
import { mapState,mapActions } from "vuex"
import "../request/request"

const airforcePlug:Plugin = {
    install(App){
        App.mixin({
            computed:{
                ...mapState(["airforce"]),
            },
            methods:{
                ...mapActions(["axios"]),
            }
        })
    }
}
export default <Plugin> airforcePlug;