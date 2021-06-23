import {createRouter,createWebHashHistory} from "vue-router"

export default createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:"/login",
            component:()=>import("../view/Login/Login.vue"),
        },
        {
            path:"/",
            component:()=>import("../view/Home.vue"),
            redirect:"/home",
            children:[
                {
                    path:"home",
                    component:()=>import("../view/Home/Home.vue"),
                }
            ]
        },
    ],
});