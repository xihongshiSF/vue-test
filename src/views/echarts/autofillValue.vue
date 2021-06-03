<template>
  <div>
    <p>每7天统计一次数据，当到了7天的时候后台没有返回数据时前端自动补充为0</p>
    <hr />
    <div class="div_see">
      <div class="div_have" id="circularPie"></div>
    </div>
  </div>
</template>

<script>
var oldData = [
  ["2000-06-05", 116], //1天
  ["2000-06-07", 135],
  ["2000-06-08", 86],
  ["2000-06-09", 73],
  ["2000-06-10", 85], //5天
  ["2000-06-16", 139],
  ["2000-06-17", 115],
  ["2000-06-18", 111],
  ["2000-06-19", 309],
  ["2000-06-20", 206],
  ["2000-06-21", 137]
];
var tempData = [];
var dateList;
var valueList;
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
      myChart.setOption(this.makeOption());
    },
    /* 时间间隔为1天，补全数据 */
    fillValue(axisTimeGap = 24 * 60 * 60 * 1000, data = oldData) {
      for (let i = 0, len = data.length; i < len - 1; i++) {
        let curTime = new Date(data[i][0]).getTime();
        let nextTime = new Date(data[i + 1][0]).getTime();
        let timeGap = nextTime - curTime;
        if (timeGap == axisTimeGap) {
          tempData.push(data[i]);
        } else {
          tempData.push(data[i]);
          //    补充时间间隔
          let num = timeGap / axisTimeGap - 1;
          let nextTemp = curTime;
          for (let j = 0; j < num; j++) {
            nextTemp = nextTemp + axisTimeGap;
            //    转为时间字符串“2020-01-05”格式
            tempData.push([new Date(nextTemp).toLocaleDateString(), 0]);
          }
        }
      }
      dateList = tempData.map(function(item) {
        return item[0];
      });
      valueList = tempData.map(function(item) {
        return item[1];
      });
    },
    makeOption() {
      return {
        // Make gradient line here
        visualMap: [
          {
            show: false,
            type: "continuous",
            seriesIndex: 0,
            min: 0,
            max: 400
          }
        ],

        title: [
          {
            left: "center",
            text: "随着y轴渐变"
          }
        ],
        tooltip: {
          trigger: "axis"
        },
        xAxis: [    //x轴type不指定的话默认为‘category’
          {
            data: dateList
          }
        ],
        yAxis: [{}],
        grid: [
          {
            bottom: "60%"
          },
          {
            top: "60%"
          }
        ],
        series: [
          {
            type: "line",
            showSymbol: false,
            data: valueList
          }
        ]
      };
    }
  },
  mounted() {
    this.fillValue(24 * 60 * 60 * 1000, oldData);
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
