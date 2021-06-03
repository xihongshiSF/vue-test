<template>
  <div>
    <p>a信号和b信号在过去的24小时里持续出现的情况</p>
    <hr />
    <div class="div_see">
      <div class="div_have" id="circularPie"></div>
    </div>
  </div>
</template>

<script>
// import { sequenceDirData } from "@/dataMock/sequenceDirData";
// let _rawData = sequenceDirData;
// var data =[
            //   {value:[0, '2020-5-1 8:00:00', '2020-5-3 9:00:00', 3],
            //     itemStyle: {
            //         normal: {
            //             color: "red"
            //         }
            //     }} ,
            //   {value:[0, '2020-5-7 10:00:00', '2020-5-15 11:00:00', 9],
            //     itemStyle: {
            //         normal: {
            //             color: "red"
            //         }
            //     }},
            //   {value:[0, '2020-6-1 12:00:00', '2020-6-2 13:00:00', 2],
            //     itemStyle: {
            //         normal: {
            //             color: "red"
            //         }
            //     }},
            //   {value:[0, '2020-6-5 14:00:00', '2020-6-30 15:00:00', 26],
            //     itemStyle: {
            //         normal: {
            //             color: "red"
            //         }
            //     }},
            //   {value:[1, '2020-1-1 16:00:00', '2020-1-20 17:00:00', 20],
            //     itemStyle: {
            //         normal: {
            //             color: "green"
            //         }
            //     }},
            //   {value:[1, '2020-2-3 18:00:00', '2020-2-5 19:00:00', 3],
            //     itemStyle: {
            //         normal: {
            //             color: "green"
            //         }
            //     }},
            //   {value:[1, '2020-3-10 20:00:00', '2020-3-9 21:00:00', 10],
            //     itemStyle: {
            //         normal: {
            //             color: "green"
            //         }
            //     }},
            //  {value: [1, '2020-5-1 22:00:00', '2020-5-10 23:00:00', 11],
            //     itemStyle: {
            //         normal: {
            //             color: "green"
            //         }
            //     }}
            // ].map(item=>{
            //   item.value[1]=new Date(item.value[1]).getTime()
            //   item.value[2]=new Date(item.value[2]).getTime()
            //   return item 
            // });
var dataCount = 10;
var startTime = 0;
var categories = ['信号A', '信号B', '信号C','信号D'];
var types = [
    // {name: 'JS Heap', color: '#7b9ce1'},
    // {name: 'Documents', color: '#bd6d6c'},
    // {name: 'Nodes', color: '#75d874'},
    // {name: 'Listeners', color: '#e0bc78'},
    // {name: 'GPU Memory', color: '#dc77dc'},
    {name: 'GPU', color: '#72b362'}
];
let option
var data=[["信号A", "2019-06-20 17:07:46", "2019-06-20 17:08:23", 37000],
              ['信号B', "2019-06-20 17:07:46", "2019-06-20 17:08:23", 37000],
              ["信号C", "2019-06-20 17:07:46", "2019-06-20 17:08:23", 37000],
              ["信号C", "2020-06-01 00:00:00", "2020-06-01 00:00:00", 0],
              ["信号C", "2020-06-02 00:00:00", "2020-06-03 00:00:00", 86400000],
              ["信号C", "2020-06-03 00:00:00", "2020-06-04 00:00:00", 86400000],
              ["信号C", "2020-06-04 00:00:00", "2020-06-04 00:00:00", 0],
              ["信号C", "2020-06-04 00:00:00", "2020-06-05 00:00:00", 86400000],
              ["信号C", "2020-06-11 00:00:00", "2020-06-12 00:00:00", 86400000]].map(item=>{
                item[1]=new Date(item[1]).getTime();
                item[2]=new Date(item[2]).getTime();
                return item;
              })
// console.log(_rawData);
export default {
  name: "signalTimeChart",
  data() {
    return {};
  },
  components: {},
  created() {},
  methods: {
    initChart() {
      let myChart = this.$echarts.init(document.getElementById("circularPie"));
      // this.getsignalTimeData()
      myChart.setOption(option = this.makeOption());
      // console.log(this.makeOption())
    },
    
    makeOption() {
      return {
        tooltip: {
        formatter: function (params) {
            return params.name+"<br/>"+
                   "信号开始时间："+COMMONFN.timeFormat(params.value[1]).time_+"<br/>"+
                   "信号结束时间："+COMMONFN.timeFormat(params.value[2]).time_+"<br/>"+
                   "信号持续时间：" + params.value[3]+ '天'
        }
        },
        title: {
            text: '信号持续图',
            left: 'center'
        },
        dataZoom: [{
            type: 'slider',
            filterMode: 'weakFilter',
            showDataShadow: false,
            top: 400,
            height: 10,
            borderColor: 'transparent',
            backgroundColor: '#e2e2e2',
            handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7v-1.2h6.6z M13.3,22H6.7v-1.2h6.6z M13.3,19.6H6.7v-1.2h6.6z', // jshint ignore:line
            handleSize: 20,
            handleStyle: {
                shadowBlur: 6,
                shadowOffsetX: 1,
                shadowOffsetY: 2,
                shadowColor: '#aaa'
            },
            labelFormatter: ''
        }, {
            type: 'inside',
            filterMode: 'weakFilter'
        }],
        grid: {
            height: 300
        },
        xAxis: {
          axisLine:{
            show:true
          },
          // minInterval: 1,
          // maxInterval: 3600 ,
            // min:new Date("2020-1-1 15:00:09").getTime(),  //不设置时会自动计算最小值保证坐标轴刻度的均匀分布
            // max:new Date("2020-6-30 15:00:09").getTime(),
            // interval:(new Date("2020-6-30 15:00:09").getTime() - new Date("2020-1-1 15:00:09").getTime())/12,
            // 强制设置坐标轴分割间隔。
            // 因为 splitNumber 是预估的值，实际根据策略计算出来的刻度可能无法达到想要的效果，这时候可以使用 interval 配合 min、max 强制设定刻度划分，一般不建议使用。
            // 无法在类目轴中使用。在时间轴（type: 'time'）中需要传时间戳，在对数轴（type: 'log'）中需要传指数值。
            type: 'time',     //x轴设置type为“time”类型和设置为“category”类型的区别：
                              //1.设置为“time”类型( type: 'time' )：
                              // 优点：会按钮时间自动计算时间间隔，时间不用转为时间戳
                              // 缺点：时间刻度无法精确到时分秒，只能精确到天。这样如果有的时间方块数据只有几秒，而有的是几天，只有几秒的时间方块就会丢失

                              //2.设置为“category”类型( type: 'category' 注掉)：
                              // 优点：x轴时间刻度可以精确到秒。这样如果有的时间方块数据只有几秒，而有的是几天，只有几秒的时间方块就不会丢失
                              // 缺点：会按照数值类型自动计算时间间隔，时间要转为时间戳
                                
            scale: true,      //设置成 true 后坐标刻度不会强制包含零刻度，坐标轴刻度会根据返回来的x轴的数值均匀分布
            axisLabel: {    //注意这里使用时间格式化x轴时间会显示时分秒

                formatter: function (val) {
                  //val的值是从哪来的?自动生成的均匀刻度
                  return COMMONFN.timeFormat(val).time_;
                }
            },
            splitNumber:10    //x轴被分成几份,坐标轴的分割段数，需要注意的是这个分割段数只是个预估值，最后实际显示的段数
                                  // 会在这个基础上根据分割后坐标轴刻度显示的易读程度作调整。在类目轴中无效。
                                  
            
        },
    //     xAxis:
    //     {
    //         // data: data.categoryData,
    //     silent: false,
    //     splitLine: {
    //         show: false
    //     },
    //     splitArea: {
    //         show: false
    //     }
    //     }
    // ,
        yAxis: {
            data: categories
        },
        series: [{
            type: 'custom',
            renderItem: this.renderItem,   //自定义echart图中的图形元素，返回一个（或者一组）图形元素定义，图形元素定义中包括图形元素的类型、位置、尺寸、样式等
            itemStyle: {
                opacity: 0.8
            },
            encode: {
                x: [1,2],   // 把 “维度1”、“维度2”映射到 X 轴.注意这里只有“维度1”或者只有“维度2”都是不对的
                y: 0         // 把“维度0”映射到 Y 轴
            },
            //ms毫秒展示
            // data: [
            //   [0, 500, 600, 100],
            //   [0, 700, 800, 100],
            //   [0, 810, 1000, 200],
            //   [0, 1100, 2000, 900],
            //   [1, 550, 660, 110],
            //   [1, 700, 900, 200],
            //   [1, 1000, 1200, 200],
            //   [1, 1300, 1800, 500]
            // ]
            //日期展示
            data: [["信号A", "2020-06-02 17:07:46", "2020-06-12 17:08:23", 37000],
              ['信号B', "2020-06-20 17:07:46", "2020-06-20 17:08:23", 37000],
              ["信号C", "2020-06-20 17:07:46", "2020-06-20 17:08:23", 37000],
              ["信号C", "2020-06-01 00:00:00", "2020-06-01 00:00:00", 0],
              ["信号C", "2020-05-30 00:00:00", "2020-06-03 00:00:00", 86400000],
              ["信号C", "2020-06-03 00:00:00", "2020-06-04 00:00:00", 86400000],
              ["信号C", "2020-06-04 00:00:00", "2020-06-04 00:00:00", 0],
              ["信号C", "2020-06-04 00:00:00", "2020-06-05 00:00:00", 86400000],
              ["信号C", "2020-06-11 00:00:00", "2020-06-12 00:00:00", 86400000]]
            /* ['信号A', '信号B', '信号C','信号D'] */
            // data:data
        }]
      }
    },
    /* 自定义元素图形展示形式 
    params：包含了当前数据信息和坐标系的信息。
        api：是一些开发者可调用的方法集合。*/
    renderItem(params, api) {
      var categoryIndex = api.value(0);        //api.value(...)，意思是取出 data 中的每一项的数值
      var start = api.coord([api.value(1), categoryIndex]);  
      var end = api.coord([api.value(2), categoryIndex]);   //api.coord(...)进行坐标转换计算
      var height = 10;

      var rectShape = this.$echarts.graphic.clipRectByRect({  //输入两个矩形，返回第二个矩形截取第一个矩形的结果
          x: start[0],
          y: start[1] - height / 2,
          width: end[0] - start[0],
          height: height
      }, {
          x: params.coordSys.x,
          y: params.coordSys.y,
          width: params.coordSys.width,
          height: params.coordSys.height
      });

      return rectShape && {
          type: 'rect',
          shape: rectShape,
          style: api.style() // api.style(...) 函数，他能得到 series.itemStyle 中定义的样式信息，以及视觉映射的样式信息。也可以用这种方式覆盖这些样式信息：api.style({fill: 'green', stroke: 'yellow'})。
      };
    },
    /* 获取渲染图形的数据series: data */
    getsignalTimeData(){
      // debugger
      this.$echarts.util.each(categories, function (category, index) {
        var baseTime = startTime;
        for (var i = 0; i < dataCount; i++) {
            var typeItem = types[Math.round(Math.random() * (types.length - 1))];
            var duration = Math.round(Math.random() * 10000);
            //给数据图赋值
            data.push({
                // name: typeItem.name,
                value: [
                    index,
                    baseTime,
                    baseTime += duration,
                    duration
                ],
                itemStyle: {
                    normal: {
                        color: typeItem.color
                    }
                }
            });
            baseTime += Math.round(Math.random() * 2000);
        }
      });
      console.log(data)
    }
  },
  mounted() {
    this.initChart();
    

  }
};
</script>
<style scoped>
.div_see {
  width: 100%;
  height: 600px;
  overflow: auto;
  border-bottom: 1px solid black;
}
.div_have {
  width: 100%;
  height: 600px;
}
</style>
