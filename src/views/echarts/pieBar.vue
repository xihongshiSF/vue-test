<template>
    <div>
      <div class="echart-size" id="pieBar"></div>
    </div>
</template>

<script>
  var chart;
    export default {
        name: "pieBar",
      methods:{
          /*initChart(){
            let myChart = this.$echarts.init(document.getElementById('pieBar'));
            // 绘制图表
            myChart.setOption({
              title: {
                text: 'ECharts 入门示例'
              },
              tooltip: {},
              xAxis: {
                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
              },
              yAxis: {},
              series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
              }],
              toolbox:{
                feature: {
                  magicType: { type: ['line', 'bar','pie']}
                }
              }
            });
          },*/
        setChart() {
          chart = this.$echarts.init(document.getElementById("pieBar"));
          chart.setOption(this.getChartOption("bar"));

        },
        getChartOption(type) {
          let that=this;

          var yField = "地块面积/公顷";//y坐标字段名称
          var xField = "地块名称";//y坐标字段名称
          var title = "2016年土地利用现状统计";//标题
          var subTitle = "地块面积统计";//副标题

          //自定义切换按钮
          var myToolTitle = "";
          var myToolImage = "";
          if (type === 'bar') {
            myToolTitle = "饼图切换";
            myToolImage = '@/assets/imgEcharts/DS.png';
          } else if (type === 'pie') {
            myToolTitle = "直方图切换";
            myToolImage = '@/assets/imgEcharts/DS.png';
          }


          //option
          var option = {};

          if (type == 'bar') {

            var dataZoomEndPercent = 1200/3;

            var xdata = ["耕地","林地"];
            var staSeries = {
              name: "地块面积",
              type: 'bar', //line
              itemStyle: { normal: { label: { show: true, position: 'top' } } },
              data: [100,200],
              barWidth: 25
            };


            option = {
              color: ['#3398DB'],
              title: {
                x: 'center',
                text: title,
                subtext: subTitle
              },
              tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                  type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
              },
              toolbox: {
                show : true,
                orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                           // 'horizontal' ¦ 'vertical'
                x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                           // 'center' ¦ 'left' ¦ 'right'
                                           // ¦ {number}（x坐标，单位px）
                y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                           // 'top' ¦ 'bottom' ¦ 'center'
                                           // ¦ {number}（y坐标，单位px）
                color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
                backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
                borderColor: '#ccc',       // 工具箱边框颜色
                borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
                padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
                showTitle: true,

                feature: {
                  //mark: { show: true },
                  //dataView: { show: true, readOnly: false },
                  magicType: {
                    show : true,
                    title : {
                      line : '折线图',
                      bar : '柱形图',

                    },
                    type : ['line', 'bar']
                  },
                  //restore: { show: true },
                  myTool: {
                    show: true,
                    title: myToolTitle,
                    icon: myToolImage,
                    onclick: function (option1) {
                      console.log(that.$echarts)
                      chart = that.$echarts.init(document.getElementById("pieBar"));
                      chart.setOption(that.getChartOption('pie'));
                    }
                  },
                  saveAsImage: { show: true }

                }
              },
              calculate: true,
              grid: {
                left: '0px',
                right: '0px',
                bottom: '10px',
                containLabel: true
              },
              xAxis: [
                {
                  type: 'category',
                  boundaryGap: true,
                  name:xField,
                  data: xdata,
                  axisLabel: {
                    interval: 0,
                    rotate: 20
                  }
                  //axisTick: {
                  //    alignWithLabel: true
                  //}
                }
              ],
              yAxis: [
                {
                  type: 'value',
                  name: yField,
                  axisLabel: {
                    formatter: '{value}'
                  }
                }
              ],
              dataZoom : {
                show : false,
                realtime : true,
                start : 0,
                end : dataZoomEndPercent,
                zoomLock: true
              },
              series: [
                staSeries
              ]
            };


          } else if (type == "pie") {
            option = {
              backgroundColor: '#2c343c',

              tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
              },
              legend: {
                orient: 'vertical',
                left: 10,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
              },
              series: [
                {
                  name: '访问来源',
                  type: 'pie',
                  radius: ['50%', '70%'],
                  avoidLabelOverlap: false,
                  label: {
                    show: false,
                    position: 'center'
                  },
                  emphasis: {
                    label: {
                      show: true,
                      fontSize: '30',
                      fontWeight: 'bold'
                    }
                  },
                  labelLine: {
                    show: false
                  },
                  data: [
                    {value: 335, name: '直接访问'},
                    {value: 310, name: '邮件营销'},
                    {value: 234, name: '联盟广告'},
                    {value: 135, name: '视频广告'},
                    {value: 1548, name: '搜索引擎'}
                  ]
                }
              ],
              toolbox: {
                show: true,
                feature: {
                  show : true,
                  orient: 'horizontal',      // 布局方式，默认为水平布局，可选为：
                                             // 'horizontal' ¦ 'vertical'
                  x: 'right',                // 水平安放位置，默认为全图右对齐，可选为：
                                             // 'center' ¦ 'left' ¦ 'right'
                                             // ¦ {number}（x坐标，单位px）
                  y: 'top',                  // 垂直安放位置，默认为全图顶端，可选为：
                                             // 'top' ¦ 'bottom' ¦ 'center'
                                             // ¦ {number}（y坐标，单位px）
                  color : ['#1e90ff','#22bb22','#4b0082','#d2691e'],
                  backgroundColor: 'rgba(0,0,0,0)', // 工具箱背景颜色
                  borderColor: '#ccc',       // 工具箱边框颜色
                  borderWidth: 0,            // 工具箱边框线宽，单位px，默认为0（无边框）
                  padding: 5,                // 工具箱内边距，单位px，默认各方向内边距为5，
                  showTitle: true,

                  feature: {
                    //mark: { show: true },
                    //dataView: { show: true, readOnly: false },

                    //restore: { show: true },
                    myTool: {
                      show: true,
                      title: myToolTitle,
                      icon: myToolImage,
                      onclick: function (option1) {
                        console.log(that.$echarts)
                        chart = that.$echarts.init(document.getElementById("pieBar"));
                        chart.setOption(that.getChartOption('bar'));
                      }
                    },
                    saveAsImage: { show: true }

                  }
                }
              }
            };

          }
          return option;
        }
      },
      mounted(){
          // this.initChart()
        this.setChart()
      }
    }
</script>

<style scoped>
  .echart-size{
    width:100%;
    height:500px;
  }
</style>
