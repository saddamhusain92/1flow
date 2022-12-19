<template>
  <div class="task_wrapper">
    <span>{{ min_timer.toString().length == 1 ? '0' + min_timer : min_timer }}:{{ sec_timer.toString().length == 1 ? '0'
        + sec_timer : sec_timer
    }} <button v-on:click="resetFun">Reset</button></span>
    <div v-for="item in task">
      <div
        :class="item.name == 'Task' ? 'd-none' : item.done == true ? 'line-through data_wrapper my-2' : 'data_wrapper my-2'">
        <div>
          <input type="checkbox" v-if="item.done" checked />
          <input type="checkbox" v-else />
          <span class="pl-2">{{ item.name }} </span>
        </div>
        <div>
          <span v-if="item.done">15 min</span>


        </div>
        <div>
          <button class="p-2" v-on:click="() => getDelete(`${item.name}`)">
            <TrashIcon class="h-3 w-3 text-rose-500 item-center" />
          </button>
          <button class=" mx-1 p-2" v-on:click="() => editDelete(`${item.name}`)">
            <PencilIcon class="h-3 w-3 text-black item-center" />
          </button>
          <button v-if="item.done"></button> <button v-else class="p-2" v-on:click="() => taskStart(`${item.name}`)">
            <PauseIcon v-if="item.status" class="h-4 w-4 text-green-600 item-center" />
            <PlayIcon v-else class="h-4 w-4 text-green-600 item-center" />
          </button>
        </div>
      </div>

    </div>
    <div class="data_wrapper my-2">
      <input type="text" class="w-[80%] outline-none" placeholder="Enter your Task ...." v-model="addTask">
      <button type="submit" v-if="edit" v-on:click="() => update(`${editName}`)"
        class="w-[20%] flex justify-center bg-black-100 py-2">
        <CheckCircleIcon class="h-5 w-5 text-slate-500 item-center" />
      </button> <button class="w-[20%] flex justify-center bg-black-100 py-2" v-else v-on:click="additem">
        <PlusCircleIcon class="h-5 w-5 text-slate-500 item-center" />
      </button>

    </div>


  </div>
  <div class="footer_note">
    <div class="btn_focus">
      <button class="start_focus" v-on:click="startTimer">focus Start</button>
    </div>
    <div class="progress_section">
      <span class="count_no"><span>{{ donTask }}</span>/<span>{{ task.length - 1 }}</span></span>
      <div class="bar_section" :style="progFun">

      </div>

    </div>
  </div>



</template>
<script  lang="ts">

import { CheckCircleIcon, PlusCircleIcon, PauseIcon, TrashIcon, PencilIcon, PlayIcon } from '@heroicons/vue/24/solid'

export default {
  name: "app",
  components: {
    PlusCircleIcon, TrashIcon, PencilIcon, PlayIcon, CheckCircleIcon, PauseIcon
  },
  data() {
    return {
      edit: false,
      editName: '',
      taskNo: 1,
      doneTask: 0,
      task: [{ 'no': 1, 'name': 'Task', 'done': false, 'status': false }],
      addTask: "",
      sec_timer: 59,
      min_timer: 1,
      timerEnabled: false,
      statuschk: 0,


    }
  },
  computed: {
    donTask() {
      this.statuschk = this.task.filter(o => o.status == true).length
      this.task.length - 1 != 0 ? '' : this.edit = false
      return this.task.filter(o => o.done == true).length
    },
    progFun() {
      let d = this.task.length - 1
      return d != 0 ? 'width:' + (100 / d) * this.task.filter(o => o.done == true).length + '%' : 'width:' + 0 + '%'
    }
  },
  methods: {
    additem: function () {

      if (this.addTask != "") {
        this.task.push({ 'no': this.taskNo++, 'name': this.addTask, 'done': false, 'status': false })
        this.addTask = ""
      }
    },
    startTimer: function () {

      console.log("test");

    },

    getDelete: function (abc: any) {
      const filteredPeople = this.task.filter((item) => item.name !== abc);
      this.task = filteredPeople

    },
    editDelete: function (abc: any) {
      this.addTask = abc
      this.editName = abc
      this.edit = true

    },
    update: function (name: any) {
      let objIndex = this.task.findIndex((obj => obj.name == name));
      this.task[objIndex].name = this.addTask
      console.log(this.task);
      this.addTask = ""
      this.edit = false
    },
    taskStart: function (taskName: any) {
      this.timerEnabled = !this.timerEnabled 
      if (this.statuschk != 1) {
        let objIndex = this.task.findIndex((obj => obj.name == taskName));
        this.task[objIndex].status?this.task[objIndex].status = false:this.task[objIndex].status = true
       console.log(this.task);
       
        let timer = setInterval(() => {
          this.timerEnabled ? this.sec_timer-- : this.sec_timer;
          if (this.sec_timer == 0) {
            this.timerEnabled ? this.min_timer-- : this.min_timer
            this.sec_timer = 59
          }
          if (this.min_timer == 0) {
            clearInterval(timer)
            let objIndex = this.task.findIndex((obj => obj.name == taskName));
            this.task[objIndex].done = true
            this.task[objIndex].status = false
            this.min_timer = 25
          }

        }, 1000)

      }


      else {
        let objIndex = this.task.findIndex((obj => obj.name == taskName));
        this.task[objIndex].status?this.task[objIndex].status = false:this.task[objIndex].status = true

      }

    },

    resetFun: function () {
      this.timerEnabled = false
      this.sec_timer = 59
      this.min_timer = 1
    }


  }

}
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');

* {
  padding: 0;
  margin: 0;
  font-family: 'Inter', sans-serif;

}

.data_wrapper {
  display: flex;
  justify-content: space-between;
}

.d-none {
  display: none;
}

.footer_note {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 12px;
  text-align: center;
}

.count_no {
  position: absolute;
}

.bar-sm {
  position: relative;
}

.progress_section {
  height: 18px;
  width: 100%;
  background-color: rgb(201, 201, 201);
}

.bar_section {
  height: 18px;

  background-color: rgb(7, 135, 94);
}

.task_wrapper {
  padding: 10px;
  height: 286px;
  overflow-y: auto;
  text-align: justify
}

.task_wrapper::-webkit-scrollbar {
  width: 8px;
}

/* Track */
.task_wrapper::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey;
  border-radius: 1px;
}

/* Handle */
.task_wrapper::-webkit-scrollbar-thumb {
  background: rgb(146, 146, 146);
  border-radius: 0.5px;
}

/* Handle on hover */
.task_wrapper::-webkit-scrollbar-thumb:hover {
  background: #474747;
}

ul {
  list-style: none;
}

.btn_focus {
  text-align: center;
  padding: 8px;
}

.start_focus {
  background-color: rgb(45, 45, 45);
  padding: 5px;
  color: aliceblue;
  border-radius: 7px;
}
</style>