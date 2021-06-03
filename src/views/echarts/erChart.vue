<template>
  <div>
        <p>echart画实体关系图</p><hr>
      <div class="div_have" id="erChart"></div>
  </div>
</template>

<script>
var data =  [
        {
            "symbolSize": 30,
            "name": "IP1",
            "category": 0,    //判断改实体是哪一类，第几级
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP1-1",
            "category": 2,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP1-2",
            "category": 2,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP1-3",
            "category": 2,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP1-4",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP1-5",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP1-6",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP2",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP2-1",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP2-2",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP2-3",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP2-4",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        },
        {
            "symbolSize": 30,
            "name": "IP2-5",
            "category": 1,
            // itemStyle: {
            //         color: COMMONFN.getRandomColor()
            // },
            draggable:true
        }
    ];
var link =  [
        {
            "msg": "2020-1-1 13：55：00",
            "source": "IP1",
            "target": "IP2"
        },{
            "msg": "2020-1-1 13：55：00",
            "source": "IP1",
            "target": "IP1-1"
        },
        {
            "msg": "2020-2-1 13：55：00",
            "source": "IP1",
            "target": "IP1-2"
        },
        {
            "msg": "2020-3-1 13：55：00",
            "source": "IP1",
            "target": "IP1-3"
        },
        {
            "msg": "2020-4-1 13：55：00",
            "source": "IP1",
            "target": "IP1-4"
        },
        {
            "msg": "2020-5-1 13：55：00",
            "source": "IP1",
            "target": "IP1-5"
        },
        {
            "msg": "2020-6-1 13：55：00",
            "source": "IP1",
            "target": "IP1-6"
        },
        {
            "msg": "2020-7-1 13：55：00",
            "source": "IP2",
            "target": "IP2-1"
        },
        {
            "msg": "2020-7-1 13：55：00",
            "source": "IP2",
            "target": "IP2-2"
        },
        {
            "msg": "2020-7-1 13：55：00",
            "source": "IP2",
            "target": "IP2-3"
        },
        {
            "msg": "2020-7-1 13：55：00",
            "source": "IP2",
            "target": "IP2-4"
        },
        {
            "msg": "2020-7-1 13：55：00",
            "source": "IP2",
            "target": "IP2-5"
        },
        {
            "msg": "2020-7-1 13：55：00",
            "source": "IP2",
            "target": "IP2-6"
        }
    ];
    let option;

export default {
  name: 'erChart',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted(){
    this.initChart()
  },
  methods: {
    makeOption(){
      // return {
      //   tooltip: {
      //       trigger: 'item',
      //       formatter: function (params) {//连接线上提示文字格式化
      //           if (params.data.source) {//注意判断，else是将节点的文字也初始化成想要的格式
      //             return params.data.msg;
      //           }
      //           else {
      //               return params.name;
      //           }
      //       }
      //   },
      
      //   series : [
      //       {
      //           name: 'Les Miserables',
      //           type: 'graph',
      //           layout: 'force',
      //           force : { //力引导图基本配置
      //               repulsion : 100,//节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
      //               gravity : 0.03,//节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
      //               edgeLength :[100,300],//边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
      //               layoutAnimation : true
      //           },
      //           focusNodeAdjacency: true,
      //           categories : [ //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
      //             {
      //                 name : '一级单位',
      //             },
      //             {
      //                 name : '二级单位',
      //             },
      //             {
      //                 name : '三级单位',
      //             },
      //             {
      //                 name : '四级单位',
      //             }],
      //           links: link,
      //           data:data,
      //           roam: true,
      //           focusNodeAdjacency: true,
      //           label: {
      //               position: 'left',
      //               show:true

      //           },
      //           // focusNodeAdjacency: true,
      //           itemStyle: {            //整体实体图颜色
      //               borderColor: '#fff',
      //               borderWidth: 1,
      //               shadowBlur: 10,
      //               shadowColor: 'rgba(0, 0, 0, 0.3)'
      //           },
      //           lineStyle: {           //鼠标悬浮于线时线颜色
      //             color: 'source',
      //             // curveness: 0.3    //连线会变弯
      //           },
      //           emphasis: {          //鼠标悬浮时颜色强调
      //             lineStyle: {
      //                 width: 10
      //             }
      //           }
      //       }
      //   ]
      // };

      return {
        backgroundColor: '#1a4377',
        grid: {
            left: '10%',
            top: 60,
            right: '10%',
            bottom: 60,
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        series: [{
            type: 'graph',
            layout: 'force',
            force: {
                repulsion: 1000,
                edgeLength: 70,
                layoutAnimation: true,
            },
            symbolSize: 70,    //图标大小
            nodeScaleRatio: 1, //图标大小是否随鼠标滚动而变
            roam: true, //缩放
            draggable: true, //节点是否可以拖拽
            focusNodeAdjacency: false, //是否在鼠标移到节点上的时候突出显示节点以及节点的边和邻接节点
            edgeSymbol: ['circle', 'arrow'], //线2头标记
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    color: 'gold'
                }
            },
            edgeLabel: {
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 12,
                        color: '#fff'
                    },
                    formatter: "{c}"
                }
            },
            categories: [{
                name: '亲人',
            }, {
                name: '租户',
                symbol: 'rect'
            }],
            itemStyle: {
                normal: {
                    borderColor: '#04f2a7',
                    borderWidth: 2,
                    shadowBlur: 10,
                    shadowColor: '#04f2a7',
                    color: '#001c43',
                }
            },
            lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0,
                    color: {
                        type: 'linear',
                        x: 0,
                        y: 0,
                        x2: 0,
                        y2: 1,
                        colorStops: [{
                            offset: 0,
                            color: '#e0f55a' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#639564' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false
                    }
                }
            },
            symbolKeepAspect: false,
            data: [{
                    name: '李富贵',
                },
                {
                    name: '王桂花',
                },
                {
                    name: '李思思',
                },
                {
                    name: '自住房屋',

                },
                {
                    name: '车子',

                },
                {
                    name: '租房',

                },
                {
                    name: '黄涛',
                },
                {
                    name: '于海',

                },
                {
                    name: '张柏',
                },
                {
                    name: '付梦杰',
                }
            ],
            links: [{
                    source: 0,
                    target: 1,
                    value: '夫妻'
                },
                {
                    source: 0,
                    target: 2,
                    value: '父女'
                },
                {
                    source: 0,
                    target: 3,
                    value: '自住'
                },
                {
                    source: 0,
                    target: 4,
                    value: '车主'
                },
                {
                    source: 0,
                    target: 5,
                    value: '租户'
                },
                {
                    source: 5,
                    target: 6,
                    value: '租赁'

                },
                {
                    source: 5,
                    target: 7,
                    value: '租赁'
                },
                {
                    source: 5,
                    target: 8,
                    value: '租赁'
                },
                {
                    source: 5,
                    target: 9,
                    value: '租赁'
                }
            ],
        }]
      }
    },
    initChart() {
      let myChart = this.$echarts.init(document.getElementById("erChart"));
      // this.getsignalTimeData()
      myChart.setOption(option = this.makeOption());
      // console.log(this.makeOption())
    }
  }
}
</script>
<style scoped>

.div_have {
  width: 100%;
  height: 695px;
}
</style>
