<template>
    <div>
      <span data-text="蚂">蚂</span>
      <span data-text="蚁">蚁</span>
      <span data-text="部">部</span>
      <span data-text="落">落</span>
    </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "transform",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
body {
  background-color: #cccccc;
}
.box {
  width: 600px;
  margin: 100px auto;
}
span {
  display: inline-block;
  width: 100px;
  height: 200px;
  font-size: 100px;
  font-family: "microsoft yahei";
  margin-right: 40px;
  float: left;
  position: relative;
}
span::before,
span::after {
  content: attr(data-text);
  position: absolute;
  left: 0;
  top: 0;
  color: rgba(0, 0, 0, 0.3);
  transform-origin: left center;
  transform: scale(0.95, 1);
  transition: transform 0.5s;
}
span::after {
  color: #ffffff;
}
div:hover span::after {
  transform: rotateY(40deg) skew(0deg, 10deg) scale(0.95, 1);
}
div:hover span::before {
  transform: skew(0deg, 25deg) scale(0.95, 1);
}
</style>
