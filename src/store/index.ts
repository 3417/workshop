
import { defineStore  } from 'pinia';

export const useStore = defineStore('main',{
    state:()=>{
        return{
            voto:{},
            isAdult:false,
        }
    },
    getters:{},
    actions:{
        SET_VOTO(data:any) {
            this.voto = data;
        },
        SET_ADULT(data:boolean){
            this.isAdult = data;
        }
    }
})
