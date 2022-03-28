
import { createStore } from 'vuex';
const store = createStore({
    state() {
        return {
            voto:{},
            isAdult:false,
        }
    },
    mutations: {
        SET_VOTO(state:any,data) {
            state.voto = data;
        },
        SET_ADULT(state:any,data){
            state.isAdult = data;
        }
    }
})


export default store;