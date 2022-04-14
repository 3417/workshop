import {createRouter,createWebHashHistory,createWebHistory} from 'vue-router';
import Layout from '../views/Layout.vue';
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:Layout,
            meta:{
                title:"首页"
            }
        },
        {
            path:'/picture',
            name:'picture',
            component:()=>import('../views/Home.vue'),
            meta:{
                title:"放松一下"
            }
        },
        {
            path:'/solar',
            name:'solar',
            component:()=>import('../components/solar.vue'),
            meta:{
                title:"泰然如者"
            },
        }
    ]
})

export default router;

