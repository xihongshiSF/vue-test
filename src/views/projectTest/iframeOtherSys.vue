<template>
    <!-- 相当于：window.open("http://localhost:8082/#/login?token=8",'_blank') -->
    <iframe src="http://localhost:8082/#/login?token=8" frameborder="0" class='iframeStyle'></iframe>
</template>

<script>
export default {
  name: '',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){},
  methods: {}
}
</script>
<style  scoped>
    .iframeStyle{
        width:100%;
        height:650px;
    }
</style>
