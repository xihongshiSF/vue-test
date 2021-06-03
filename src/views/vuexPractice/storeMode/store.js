
/*  store 状态管理模式的实现思想很简单，就是定义一个 store 对象，对象里有 state 属性存储共享数据，
 对象里还存储操作这些共享数据的方法。在组件中将 store.state 共享数据作为 data 的一部分或全部，
 在对 store.state 对象里的共享数据进行改变时，必须调用 store 提供的接口进行共享数据的更改。 */
export const store = {
    state: {
        todos: [
            {text: '写语文作业', done: false},
            {text: '做数学卷子', done: false}
        ]
    },
    addTodo(str){
        const obj = {text: str, done: false}
        this.state.todos.push(obj)
    },
    setDone(index){
        this.state.todos[index].done = true
    }
}