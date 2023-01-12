import axios from 'axios'
import { createStore } from 'vuex'

export default createStore({
    state:{
         name:"My Task",
         myAllTask:[],
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
   
    },
    actions:{
    timerStart(context){
       context.commit('setStarTimer')
       
        
    },
  
    },
    getters:{
    data(state){
        return state.myAllTask
    } 
    }
})

















<template>
  <span class="move_body">
  </span>
  <div class=" todo_wrapper" v-if="todos.length != 0">
    <span><b>{{ todos[next].text }}</b> </span><span>{{ todos[next].timeM }}:{{ todos[next].timeS }}</span> <span
      v-if="todos[next].status" @click="stopTimer(todos[next])">
      <PauseIcon class="icon-svg" />
    </span> <span v-else @click="startTimer(todos[next])">
      <PlayIcon class="icon-svg btn-start" />
    </span> <span @click="nextTask">Skip</span>
    <span @click="doneTask(todos[next])">
      <CheckCircleIcon class="icon-svg btn-start" />
    </span>
  </div>
  <div v-else class="loading">
    <span class="loader"></span>
  </div>
</template>
<script>
import { PauseIcon, PlayIcon, CheckCircleIcon, RectangleGroupIcon, } from '@heroicons/vue/24/solid'
import { mapActions } from 'vuex'
import axios from 'axios'
export default {
  name: "runtodo",
  components: {
    PlayIcon,
    PauseIcon,
    CheckCircleIcon,
    RectangleGroupIcon,


  },
  data() {
    return {
      todos: [],
      next: 0
    }
  },
  methods: {
    ...mapActions({
      storeMap: 'apiTask'
    }),
    getList() {
      axios.get('https://server-oz1f.onrender.com/MyTasks').then(res => {
        let result = res.data.filter(o => o.completed == false);

        this.todos = result;
        
      })
    },
    nextTask() {
      this.next++
      if (this.next === this.todos.length) {
        alert("All task done")
      }
      this.getList()
    },
    doneTask(todo) {
      this.next++

    },
    startTimer(todo) {
      if (!todo.timer) {
        todo.status = true
        todo.timer = setInterval(() => {
          todo.timeS += 1;
          if (todo.timeS === 59) {
            todo.timeM += 1
            todo.timeS = 0
          }
        }, 1000);


      }
    },
    stopTimer(todo) {
      todo.status = false
      if (todo.timer) {
        clearInterval(todo.timer);
        todo.timer = null;

      }
    }
  },
  mounted() {
    this.getList();
  }
}

</script>
  
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap');

* {
  overflow-y: hidden;
  font-family: 'Roboto', sans-serif;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 27px;
  padding: 3px;
}

.todo_wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  -webkit-user-select: none;
  height: 28px;
  padding: 3px;
  font-size: 13px;
}

.icon-svg {
  height: 14px;
  width: 14px;
  cursor: pointer;
}


.btn-start {
  color: rgb(26, 159, 112);
}

.move_body {
  position: absolute;
  left: 0;
  top: 0;
  height: 15px;
  width: 15px;
  border-radius: 50%;
  background-color: rgb(26, 159, 112);
  -webkit-user-select: none;
  -webkit-app-region: drag;
  cursor: default;
}

.loader{
  width: 48px;
  height: 48px;
  display: inline-block;
  position: relative;
}

.loader::after,
.loader::before {
  content: '';
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgb(26, 159, 112);
  position: absolute;
  left: 0;
  top: 0;
  animation: animloader 2s linear infinite;
}

.loader::after {
  animation-delay: 1s;
}

@keyframes animloader {
  0% {
    transform: scale(0);
    opacity: 1;
  }

  100% {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
  



































