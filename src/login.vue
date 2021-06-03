<template>
    <div>
      <p>登录页面</p>
      姓名:<el-input v-model="name"></el-input>
      <el-button @click="loginHome">点击登录</el-button>
    </div>
</template>

<script>
  // import {mapMutations} from "vuex"
    export default {
      name: "login",
      data(){
        return{
          name:"liyy"
        }
      },
      methods:{
          // ...mapMutations(["setMenu"]),
          loginHome(){
            let that=this;
            // import("./router/routeData.js").then(routeData=>{
            //   //定制当前用户菜单
            // let userRoute=routeData.default.filePolicies;
            //   /*let router=this.$router.options.routes[2].children;
            //   for(let item in router){
            //     if(router[item].path==userRoute.resources.path) router[item].hidden=false;
            //     console.log(this.$router)
            //   }*/
            //   // that.setMenu(COMMONFN.transData(userRoute,"id","pid"));
            //   that.$store.commit("setMenu", userRoute);
            // });
            that.$router.push({path:"/home"});
          }
      }
    }
</script>

<style scoped>

</style>
