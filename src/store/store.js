import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
    state:{
         name:"My Task",
         myAllTask:null,
         timeM: 0,
         timeS: 0,
         timer: null,
    },
    mutations:{
    setStarTimer(state){
       if (!state.timer) {
        state.timer = setInterval(() => {
            state.timeS += 1;
            if (state.timeS === 59) {
                state.timeM += 1
                state.timeS = 0
  
            }
          }, 1000);
       }
    },
setStopTimer(state){
        if (state.timer) {
            clearInterval(state.timer);
            state.timer = null;
          }
    },
    },
    actions:{
    timerStart(context){
       context.commit('setStarTimer')   
    },
    timerStop(context){
       context.commit('setStopTimer')   
    },
   
    },
    getters:{
    getList(state){
        return state.myAllTask
    },
    timerStatus(state){
     return `${state.timeM} : ${state.timeS}`
    }
    }
})