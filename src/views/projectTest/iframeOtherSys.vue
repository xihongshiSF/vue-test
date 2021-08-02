<!--
 * @Author: your name
 * @Date: 2020-08-11 23:41:06
 * @LastEditTime: 2021-06-09 14:20:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-test\src\views\projectTest\iframeOtherSys.vue
-->
<template>
    <!-- 相当于：window.open("http://localhost:8082/#/login?token=8",'_blank') -->
    <!-- <iframe src="http://localhost:8082/#/login?token=8" frameborder="0" class='iframeStyle'></iframe> -->
    <!-- 使iframe给其它跨域项目的localstorage和sessionstorage赋值 -->
    <iframe src="http://localhost:9527" frameborder="0" class='iframeStyle' ref="iframe"></iframe>
</template>

<script>
export default {
  name: '',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){
    this.postMessagetoChild();
  },
  methods: {
    postMessagetoChild(){
      //  需要等到iframe中的子页面加载完成后才发送消息，否则子页面接收不到消息 
      let iframe=this.$refs.iframe;
      console.dir(iframe)
      iframe.onload=function(){
        //  iFrame.contentWindow获取到iframe的window对象
        // iframe.contentWindow指的是目标窗口
        // window.postMessage中的window指的是目标窗口的window，不是当前窗口的window
        iframe.contentWindow.postMessage('父页面发送的消息','http://localhost:9527');
      }
    }
  }
}
</script>
<style  scoped>
    .iframeStyle{
        width:50%;
        height:650px;
    }
</style>
