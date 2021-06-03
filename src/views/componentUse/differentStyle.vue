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
  </div>
</template>

<script>
import childBar from "@/views/componentUse/childBar";
export default {
  name: "differentStyle",
  data() {
    return {};
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
