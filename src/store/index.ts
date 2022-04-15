
import { defineStore  } from 'pinia';
import dark from '@varlet/ui/es/themes/dark'
import { StyleProvider } from '@varlet/ui'

export const useStore = defineStore('main',{
    state:()=>{
        return{
            voto:{
                type:"",  
                hitokoto:"",  
                from:"",  
                from_who:""
            },
            isAdult:false,
            isLoading:false,
        }
    },
    getters:{},
    actions:{
        SET_VOTO(data:any) {
            this.voto = data;
        },
        SET_ADULT(data:boolean){
            this.isAdult = data;
        },
        SET_LOADING(loading:boolean){
            this.isLoading = loading;
        },
    }
})
