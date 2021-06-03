<template>
  <div class=''>

      <el-button @click="changeStoreData">点击改变storeData的值为“改变后222”</el-button>
      <p>{{aaa}}</p>
      <br><br>
      <p>vue页面中的某些值的变化依赖于vuex中的值，vuex中的值只要一变化，这个值也会发生改变，现在检测的是当前页面中的值有没有改变</p>  
  </div>
</template>

<script>
import { mapGetters ,mapMutations} from 'vuex'
export default {
  name: '',
  data(){
    return {
      // aaa:null
    }
  },
  components: {},
  created(){
    /* 注意：在这里给aaa赋值时，点击按钮动态改变仓库中storeData中的值,aaa的值不会跟着动态变，
     * 要让aaa的值动态改变的话aaa属性只能放在computed里边
     */
    // aaa的值是由仓库中的值+‘###’祖成的 
    // this.aaa=this.$store.getters.storeData+"###"
    
  },
  computed:{
    ...mapGetters('GLOBAL',["storeData"]),
    /* 注意：aaa属性和仓库中的值有关，实时动态加载的必须放在computed属性里 ,放在created和mounted里边只能在初始化时加载一次 */
    aaa(){
      return this.storeData+"###"
    }
  },
  watch:{
    
  },
  mounted(){
    /* 注意：在这里给aaa赋值时，点击按钮动态改变仓库中storeData中的值,aaa的值不会跟着动态变 ，放在computed里边才会动态改变啊*/
    // this.aaa=this.$store.getters.GLOBAL.storeData+"###"
    console.log("测试storeData有没有通过mapgetters引入进来",this.storeData)
  },
  methods: {
    ...mapMutations('GLOBAL',["setStoreData"]),
    changeStoreData(){
      // this.$store.commit("GLOBAL/setStoreData", "改变后222");
      this.setStoreData("改变后222")
      //注意看：仓库中的storeData值已经发生改变
      console.log("storeData的值通过点击按钮被改变之后",this.storeData)
    }
  }
}
</script>
<style scoped>
</style>
