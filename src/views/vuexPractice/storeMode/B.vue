<template>
    <div class="B">
        <div>
            我是 B 组件，负责给A组件添加任务<br><br>
            在下方输入框输入任务在 A组件 中添加任务
        </div>
        <input type="text" v-model="text">
        <button @click="addTodo">add todo</button>
    </div>
</template>

<script>
import {store} from './store.js'
export default {
    name: 'B',
    data(){
        return {
            text: ''
        }
    },
    methods:{
        addTodo(){
            if(this.text){
                store.addTodo(this.text)
            }
        }
    }
}
</script>

<style scoped>
.B{
    background: yellow;
    padding: 20px;
}
</style>