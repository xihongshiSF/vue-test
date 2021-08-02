<!--
 * @Author: your name
 * @Date: 2020-07-28 22:36:54
 * @LastEditTime: 2021-07-06 12:40:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test\src\views\vueHighUse\keepAlive\keepAlive.vue
-->
<template>
  <div>
    <!--方法3：动态添加标签，使用element中的<el-tabs>组件，结合路由-->
       <router-link to="/personName">哈哈
      </router-link>
     <router-view></router-view>
    <el-tabs v-model="activeName">
        <el-tab-pane
          v-for="(item,index) in childTabs"
          :label="item.label"
          :name="item.name"
          :key="index"
        >
          <!--这里是重点-->
          <component :is="item.component" @changeData="changeData"></component>
          
        </el-tab-pane>
      <p v-text="testModel"></p>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import personName from "@/views/vueHighUse/keepAlive/tabs/personName.vue";
import phone from "@/views/vueHighUse/keepAlive/tabs/phone.vue";
export default {
  name: "keepAlive",
  components: {
    personName,
    phone
  },
  computed: {
    // ...mapGetters(["tabList"])
  },
  data() {
    return {
      activeName: "",
      childTabs: [],
      testModel: "测试双向绑定模板"
    };
  },
  methods: {
    /**使用方法3才会写，
     * 点击标签页切换内容时使用路由跳转进行切换*/
    /*onTabClick(tab){
          /!*注意：这里有个知识点
          * 如果想跳出本页面的router-view,跳到其它页面，放心用下边的$router.push()，跳的过去*!/
          this.$router.push({name:tab.name})
        },*/
    changeData() {
      console.log(111);
    }
  },
  mounted() {
    /* this.childTabs = this.$route.meta.tabList;
    // 重点：动态渲染当前高亮的tab页
    this.activeName=this.childTabs[0].name,

    setTimeout(() => {
      this.testModel = "11111111111111";
    }, 5000); */
  }
};
</script>

<style scoped>
</style>
