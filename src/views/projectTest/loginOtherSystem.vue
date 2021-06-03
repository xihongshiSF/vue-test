<template>
    <div>
      <p>方法1：通过url地址传参</p>  
      <el-button @click="loginJGH">测试单点登录，实现跨域登录到其它系统界面</el-button>
      <p>方法2：通过iframe框架嵌套给其他系统设置localstorage和sessionstorage</p>
      <p>相同协议、相同ip、相同端口下的前端页面才叫同域，但凡有一个不一样就叫跨域</p>
      <p>同域下的sessionStorage和localStorage下的信息才能共享，跨域不能共享</p>
      <p>比如：A系统中打开新页面跳转到A系统，A系统的浏览器缓存在新打开的A系统页面缓存中仍然是存在的</p>
      <p>A系统中打开新页面跳转到B系统，A系统的浏览器缓存在B系统的浏览器缓存中看不到</p>
      <p>系统的地址为：D:\前端代码\vue相关项目\结构化代码\sdmp-web(结构化原版代码，未改界面)</p>
    </div>
</template>

<script>
    export default {
        name: "loginOtherSystem",
        methods:{
            //跳转到结构化
            loginJGH(){
            let obj = { id: 21, name: "测试传参"};
            //如果传对象
            // window.open("http://localhost:8082/loginM?obj=" + JSON.stringify(obj),"_blank");
            //如果传字符串
            window.open("http://localhost:8082/#/login?token=8",'_blank')
            }
        }
    }
</script>

<style scoped>

</style>
