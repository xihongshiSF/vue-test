<template>
  <div class="div-childMain">
    <!-- 下拉列表 -->
    <div>
      <span>下拉列表</span>
      <el-select v-model="value" placeholder="请选择" class="input-style">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <!-- 输入框 -->
    <div>
      <span>输入框</span>
      <el-input class="input-style"></el-input>
    </div>

  </div>
</template>

<script>
export default {
  name: "",
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
  components: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style scoped>
.div-childMain{
    padding: 20px;
    margin: 0 auto;
}
.div-childMain>div{
    display: inline-block;
}
.div-childMain>div{
    padding: 0 20px;
}
.input-style{
    display: inline-block;
}
</style>
