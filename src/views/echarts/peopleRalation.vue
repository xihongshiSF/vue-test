<template>
  <div>
    <p>echart画实体关系图</p>
    <hr />
    <!-- 点击右键弹出弹框 -->
    <div ref="toolMenu" class="div-toolMenu">
      <ul>
        <li>菜单1</li>
        <li>菜单2</li>
        <li>菜单3</li>
      </ul>
    </div>
    <!-- 人物关系图 -->
    <div class="div_have" ref="erChart"></div>
  </div>
</template>

<script>
var data = [
  {
    name: "IP1",
    // category: 0, //判断改实体是哪一类，第几级
    draggable: true
  },
  {
    name: "IP1-1",
    // category: 2,
    draggable: true
  },
  {
    name: "IP1-2",
    // category: 2,
    draggable: true
  },
  {
    name: "IP1-3",
    // category: 2,
    draggable: true
  },
  {
    name: "IP1-4",
    // category: 1,
    draggable: true
  },
  {
    name: "IP1-5",
    // category: 1,
    draggable: true
  },
  {
    name: "IP1-6",
    // category: 1,
    draggable: true
  },
  {
    name: "IP2",
    // category: 1,
    draggable: true
  },
  {
    name: "IP2-1",
    // category: 1,
    draggable: true
  },
  {
    name: "IP2-2",
    // category: 1,
    draggable: true
  },
  {
    name: "IP2-3",
    // category: 1,
    draggable: true
  },
  {
    name: "IP2-4",
    // category: 1,
    draggable: true
  },
  {
    name: "IP2-5",
    // category: 1,
    draggable: true
  }
];
var link = [
  {
    msg: "2020-1-1 13：55：00",
    source: "IP1",
    target: "IP2",
    value: "同事"
  },
  {
    msg: "2020-1-1 13：55：00",
    source: "IP1",
    target: "IP1-1",
    value: "同事"
  },
  {
    msg: "2020-2-1 13：55：00",
    source: "IP1",
    target: "IP1-2",
    value: "同事"
  },
  {
    msg: "2020-3-1 13：55：00",
    source: "IP1",
    target: "IP1-3",
    value: "同事"
  },
  {
    msg: "2020-4-1 13：55：00",
    source: "IP1",
    target: "IP1-4",
    value: "同事"
  },
  {
    msg: "2020-5-1 13：55：00",
    source: "IP1",
    target: "IP1-5",
    value: "同事"
  },
  {
    msg: "2020-6-1 13：55：00",
    source: "IP1",
    target: "IP1-6",
    value: "同事"
  },
  {
    msg: "2020-7-1 13：55：00",
    source: "IP2",
    target: "IP2-1",
    value: "同事"
  },
  {
    msg: "2020-7-1 13：55：00",
    source: "IP2",
    target: "IP2-2",
    value: "同事"
  },
  {
    msg: "2020-7-1 13：55：00",
    source: "IP2",
    target: "IP2-3",
    value: "同事"
  },
  {
    msg: "2020-7-1 13：55：00",
    source: "IP2",
    target: "IP2-4",
    value: "同事"
  },
  {
    msg: "2020-7-1 13：55：00",
    source: "IP2",
    target: "IP2-5",
    value: "同事"
  },
  {
    msg: "2020-7-1 13：55：00",
    source: "IP2",
    target: "IP2-6",
    value: "同事"
  }
];
let option;

export default {
  name: "peopleRalation",
  data() {
    return {};
  },
  components: {},
  created() {},
  mounted() {
    this.initChart();
  },
  methods: {
    makeOption() {
      return {
        // tooltip: {
        //   trigger: "item",
        //   formatter: function(params) {
        //     //连接线上提示文字格式化
        //     if (params.data.source) {
        //       //注意判断，else是将节点的文字也初始化成想要的格式
        //       return params.data.msg;
        //     } else {
        //       return params.name;
        //     }
        //   }
        // },

        series: [
          {
            type: "graph",
            symbolSize: 60,
            name: "Les Miserables",
            layout: "force",
            force: {
              //力引导图基本配置
              repulsion: 100, //节点之间的斥力因子。支持数组表达斥力范围，值越大斥力越大。
              gravity: 0.03, //节点受到的向中心的引力因子。该值越大节点越往中心点靠拢。
              edgeLength: [100, 300], //边的两个节点之间的距离，这个距离也会受 repulsion。[10, 50] 。值越小则长度越长
              layoutAnimation: true
            },
            focusNodeAdjacency: true,
            categories: [
              //symbol name：用于和 legend 对应以及格式化 tooltip 的内容。 label有效
              {
                name: "一级单位"
              },
              {
                name: "二级单位"
              },
              {
                name: "三级单位"
              },
              {
                name: "四级单位"
              }
            ],
            links: link,
            data: data,
            roam: true,
            label: {
              position: "left",
              show: true
            },
            // 箭头
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [2, 15],
            edgeLabel: {
              normal: {
                show: true,
                textStyle: {
                  fontSize: 12
                },
                formatter: "{c}"
              }
            },
            itemStyle: {
              //整体实体图颜色
              //   borderColor: "#fff",
              borderWidth: 1,
              //   shadowBlur: 10,
              shadowColor: "rgba(0, 0, 0, 0.3)",
              color: "#006acc"
            },
            lineStyle: {
              //鼠标悬浮于线时线颜色
              color: "source",
              curveness: 0.3 //连线会变弯
            },
            effect: {
              show: true,
              scaleSize: 1,
              period: 30,
              color: "#fff",
              shadowBlur: 10
            },
            emphasis: {
              //鼠标悬浮时颜色强调
              lineStyle: {
                width: 5,
                type: "dotted"
              }
            },
            //圆形上面的文字
            label: {
              normal: {
                position: "inside",
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 18
                }
              }
            }
          }
        ]
      };
    },
    initChart() {
      let erChart = this.$refs.erChart;
      let myChart = this.$echarts.init(erChart);
      myChart.setOption((option = this.makeOption()));
      //   阻止默认的点击事件
      erChart.oncontextmenu = function() {
        return false;
      };
      myChart.on("contextmenu", params => {
        console.log(params);
        var toolMenu = this.$refs.toolMenu;
        var event = params.event;
        var clientX = event.offsetX+15;
        var clientY = event.offsetY+15;
        toolMenu.style.position="absolute";
        toolMenu.style.left = clientX + "px";
        toolMenu.style.top = clientY + "px";
        toolMenu.style['z-index']=5
        toolMenu.style.display='block';
        // event.target.style.backgroundColor="green"

      });
    }
  }
};
</script>
<style scoped>
.div_have {
  width: 100%;
  height: 695px;
}
.div-toolMenu ul {
  background-color: #eee;
  width: 200px;
  padding: 0;
  border-collapse: collapse;
}
.div-toolMenu{
    display: none ;
}
.div-toolMenu li {
  list-style: none;
  border: 1px solid black;
  border-bottom: none;
  cursor: pointer;
}
.div-toolMenu li:last-child {
  border-bottom: 1px solid black;
}
</style>
