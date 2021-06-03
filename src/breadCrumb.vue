
<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in breadNames" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: "breadCrumb",

  props: {
    breadNames: {
      type: Array
    },
  },
  methods: {
    /* 寻找路径相关的中文名称 */
    getZhName(breadPaths) {
      let router = this.$router.options.routes[2].children;
      return breadPaths.map(item => {
        return this.findName(router, item);
      });
    },

    /*
        回调函数 
        path:路径path
        router:路由数组
    */
    findName(router, path) {
      for (let i = 0, len = router.length; i < len; i++) {   /* 只能使用for循环，不能使用forEach或map */
        if (router[i].path == path) {    /* 在父亲中找，找到就返回 */
          return router[i].name;         /* 在这里写return的作用：结束for循环并且结束当前函数*/
        }else if (router[i].children) {
          let name=this.findName(router[i].children, path);   
          if(name) return name           /* 在儿子中找到的话要返回值，结束函数，return必须要写 */
        }
      }
    }

    // findName(router, path) {
    //   router.map(item => {     /* 不能用map或者forEach循环，只能用for循环 */
    //     if (item.path == path) {
            /* 重点：用map或forEach循环数组的话，在这里使用return不起作用：不会结束循环并且函数不会结束，整个findName函数返回的是undefined */
    //       return item.name;         
    //     } else if (item.children) {
    //       let name = this.findName(item.children, path);
    //       if (name) return name;
    //     }
    //   });
    // }
  }
};
</script>

<style scoped>
</style>
