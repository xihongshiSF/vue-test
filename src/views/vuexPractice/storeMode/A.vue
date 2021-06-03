<template>
  <div class="A">
    我是 A组件，下面是作业任务<br><br>
    <ul>
      <li
        v-for="(todo,index) in todos"
        :key="index"
        :class="todo.done?'done':''"
        @click="setDone(index)"
      >{{todo.text}}</li>
    </ul>
  </div>
</template>

<script>
import { store } from "./store.js";
export default {
  name: "A",
  data() {
    return store.state;
  },
  methods: {
    setDone(index) {
      store.setDone(index);
    }
  }
};
</script>

<style scoped>
.A {
  background: red;
  color: white;
  padding: 20px;
}
.A li.done {
  background: green;
}
</style>