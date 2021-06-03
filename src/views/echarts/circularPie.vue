<template>
  <!-- 注意可是区域和实际区域是不一样的 -->
  <div>
    <p>当echart图像显示不下时，给echart图添加x轴和y轴</p>
    <hr />
    <!-- <div class="div_see"> -->
      <div class="div_have" id="circularPie"></div>
    <!-- </div> -->
  </div>
</template>

<script>
// let tempName='访问来源xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.split(""),name='';
// if(tempName.length>10){
//     for(let i=0,len=Math.ceil(tempName.length/10);i<len;i++){
//             name+=tempName.splice(0,15).join("")+'\n'
//     }
// }
name =
  "访问来源xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

export default {
  name: "circularPie",
  methods: {
    /* 初始化 */
    initChart() {
      let myChart = this.$echarts.init(document.getElementById("circularPie"));
      myChart.setOption(this.createOptions());
      myChart.on('georoam', function (params) {
          // 控制台打印数据的名称
          console.log(params);
      });
    },
    createOptions() {
      let that = this;
      let option = {
        tooltip: {
          trigger: "item",
          //   formatter: "{a} <br/>{b}: {c} ({d}%)",
          formatter: function(params,ticket) {
            return that.formatterText(params,ticket);
          },
          confine: true
        },
        legend: {
          // orient: 'vertical',
          left: "center",
          top: "bottom",
          left: 10,
          data: [
            "直达",
            "营销广告",
            "搜索引擎",
            "邮件营销",
            "联盟广告",
            "视频广告",
            "百度",
            "谷歌",
            "必应",
            "其他"
          ],
          type: "scroll" //分页类型
        },
        graphic: {
          type: "text",
          left: "center",
          top: "center",
          style: {
            text: "2200",
            textAlign: "center",
            fontSize: 30,
            fill: "#000",
            width: 30,
            height: 30
          }
        },
        
        series: [
          {
            name: name,
            type: "pie",
            radius: ["40%", "55%"],
            // minAngle: 30,
            avoidLabelOverlap: true,
             markLine:{
                  precision:4
                },
            label: {
              formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
            //   formatter: function(params) {
            //     return that.formatterText(params);
            //   },
            //   formatter: [
            //         '{a|这段文本采用样式a}',
            //         '{b|这段文本采用样式b}这段用默认样式{x|这段用样式x}'
            //     ].join('\n'),
                // formatter:function(a){
                //     return (a.data.value*100/10200020).toFixed(4)
                // },
               
                precision :4,
              backgroundColor: "#eee",
              borderColor: "#aaa",
              borderWidth: 1,
              borderRadius: 4,
              // shadowBlur:3,
              // shadowOffsetX: 2,
              // shadowOffsetY: 2,
              // shadowColor: '#999',
              // padding: [0, 7],
              rich: { 
                a: {
                  color: "#999",
                  lineHeight: 22,
                  align: "center",
                },
                // abg: {
                //     backgroundColor: '#333',
                //     width: '100%',
                //     align: 'right',
                //     height: 22,
                //     borderRadius: [4, 4, 0, 0],
                //     overflow:'hidden',
                //     'word-wrap':'break-word',
                //     'word-break':'break-all'
                // },
                hr: {
                  borderColor: "#aaa",
                  width: "100%",
                  borderWidth: 0.5,
                  height: 0
                },
                b: {
                  fontSize: 16,
                  lineHeight: 33
                },
                per: {
                  color: "#eee",
                  backgroundColor: "#334455",
                  padding: [2, 4],
                  borderRadius: 2
                }
              }
            },
            data: [
              // { value: 0, name: "直达" },
              // { value: 0, name: "邮件营销" },
              // { value: 0, name: "联盟广告" },
              // { value: 0, name: "视频广告" },
              // { value: 0, name: "百度" },
              { value: 20, name: "谷歌" },
              // { value: 0, name: "必应" },
              { value: 10200000, name: "其他" }
            ],
            roam:true
          
          }
        ]
      };
      return option;
    },
    /* 格式化tooltip和label */
    formatterText(params,ticket) {
      let tempName = params.seriesName.split(""),
        name = "";
      if (tempName.length > 10) {
        for (let i = 0, len = Math.ceil(tempName.length / 10); i < len; i++) {
          name += tempName.splice(0, 10).join("") + (i != len ? ticket?'<br/>':'\n' : "");
        }
      }
      //tooltip和label的格式化不一样，有ticket为tooltip,没有ticket为label
      return (
        (ticket?"":"\n") +
        name +
        (ticket? "<br/>":"{abg|}{hr|}\n") +
        params.data.name +
        ":" +
        params.data.value +
        "  " +
        params.percent +
        "%"
      );
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
  height: 500px;
  overflow: auto;
  border-bottom: 1px solid black;
}
.div_have {
  width: 100%;
  height: 600px;
  overflow: auto;
}
</style>
