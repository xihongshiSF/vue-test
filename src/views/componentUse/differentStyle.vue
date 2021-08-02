<!--
 * @Author: your name
 * @Date: 2020-09-28 10:27:40
 * @LastEditTime: 2021-07-12 22:01:41
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test（自己练习vue项目）\src\views\componentUse\differentStyle.vue
-->
<template>
  <div class>
    <p>父组件给子组件添加不同的样式</p><br>
    <!-- 子组件样式1 -->
    <p>子组件样式1</p>
    <childBar class="child-style1"></childBar>

    <br />
    <br />
    <!-- 子组件样式2 -->
    <p>子组件样式2</p>
    <childBar class="child-style2"></childBar>
    <br />
    <br />
    <el-select v-model="value" placeholder="请选择" class="input-style">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
  </div>
</template>

<script>
import childBar from "@/views/componentUse/childBar";
export default {
  name: "differentStyle",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: ""
    };
  },
  components: { childBar },
  created() {},
  mounted() {},
  methods: {}
};
</script>   
<style scoped>
/* 父组件样式中改变子组件中总体div长度颜色、和input框的长度 */

.child-style1 {
  width: 797px;
  border: 1px solid black;
}
.child-style1 >>> .input-style {
  width: 200px;
}

.child-style2 {
  width: 1060px;
  border: 1px solid red;
}
.child-style2 >>> .input-style {
  width: 300px;
}
</style>
