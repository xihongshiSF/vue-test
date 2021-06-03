<template>
  <div class="main-panel">
    <div id="map" :style="{zIndex:0}"></div>
  </div>
</template>

<script>
import MousePosition from 'ol/control/MousePosition';
import ScaleLine from 'ol/control/ScaleLine';
import {
  createStringXY,
  toStringHDMS
} from 'ol/coordinate.js';
let map,
  tileLayer,
  vectorLayer,
  traceData = [
    { time: "2020-01-01 12:00:00", lon: 104.1, lat: 30.1, speed: 0 },
    { time: "2020-01-02 12:00:00", lon: 104.2, lat: 30.2, speed: 1 },
    { time: "2020-01-03 12:00:00", lon: 104.3, lat: 30.1, speed: 2 },
    { time: "2020-01-03 12:00:00", lon: 104.4, lat: 30.4, speed: 3 }
  ];
export default {
  name: "",
  data() {
    return {
      featureIds: []
    };
  },
  components: {},
  created() {},
  mounted() {
    this.initMap();
  },
  methods: {
    /* 初始化地图 */
    initMap() {
      // map:地图容器
      map = this.createMap();
      // 瓦片图层
      tileLayer = this.createTile();
      // 矢量图层
      vectorLayer = this.createVector();
      // 给地图容器map添加瓦片图层
      // map.addLayer(tileLayer);
      map.addLayer(tileLayer);
      // 给地图容器map添加矢量图层
      map.addLayer(vectorLayer);
      //给矢量图层添加元素
      this.drawFeature();
      // this.getdistance()
      // 添加经纬度控件
      this.addMousePositionAndScaleControl(map);
      let that = this;
      //   监听点击事件
      map.on("click", function(e) {
        if (map.hasFeatureAtPixel(e.pixel)) {
          let feature = map.forEachFeatureAtPixel(e.pixel, feature => {
            return feature;
          });
          if (feature) {
            feature.isShowOverlay = !feature.isShowOverlay;
            let overlay = map.getOverlayById(feature.getId());
            if (overlay) {
              // 将位置信息设置为undefined就能隐藏弹框
              feature.isShowOverlay
                ? overlay.setPosition(feature.coordinate)
                : overlay.setPosition(undefined);
            } else {
              let overlay = that.createOverlay(feature);
              overlay.id = feature.getId();
              map.addOverlay(overlay);
            }
          }
        }
      });
    },
    /* 创建弹窗 */
    createOverlay(feature) {
      let div = document.createElement("div");
      div.id = feature.getId();
      div.innerHTML = `<p>名字</p><p>数量</p>`;
      // div.style.display=isShowOverlay?'block':'none';
      return new ol.Overlay({
        element: div,
        position: feature.coordinate
      });
    },
    /* 给矢量图层添加元素 */
    drawFeature() {
      let pointFeatures = {
        point: [
          [104, 30],
          [104.7, 30]
        ], //圆形坐标
        canvas: [
          [103.5, 29.5],
          [105, 30.3]
        ] //三角形坐标
      };

      for (let key in pointFeatures) {
        pointFeatures[key].forEach((item, index) => {
          this.featureIds.push(key + index);
          vectorLayer.getSource().addFeature(this.drawPoint(item, key + index));
        });
      }

      // 清除除点之外的其它三角形
      /* setTimeout(()=>{
        this.featureIds.forEach(id=>{
         if(!id.includes('point')){
            this.deleteFeature(id)
         }
       })
      },5000) */
      vectorLayer.getSource().addFeature(this.drawTraceLine());
      this.drawCircle();
      this.drawPolygon();
    },
    /* 创建一个地图 */
    createMap() {
      return new ol.Map({
        target: "map", //与上边渲染地图的div的id相同
        view: new ol.View({
          projection: "EPSG:4326",
          center: [104.5, 29.7],
          zoom: 9
        })
      });
    },
    /* 创建一个瓦片图层 */

    createTile() {
      //  map.addlayer可以实现加载单独的图层和图层组
      //  单独的图层
      return new ol.layer.Tile({
        /* source: new ol.source.Stamen({
            layer: "toner"
          }) */
        /* source: new ol.source.OSM(), */
        /* source: new ol.source.OSM({
              url: 'http://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
          }) */
        /* source: new ol.source.OSM({
              url: 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
          }),
          wrapX: false */
        // 谷歌在线地图
        source: new ol.source.XYZ({
          url: "https://khms0.google.com/kh/v=883?x={x}&y={y}&z={z}"
        }),
        wrapX: false
      });
      //图层组
      /* return new ol.layer.Group({
        layers: [
          new ol.layer.Tile({
            source: new ol.source.XYZ({ 
              url: "https://khms3.google.com/kh/v=883?x={x}&y={y}&z={z}"
            })
          }),
          new ol.layer.Tile({
            source: new ol.source.OSM({
                url: 'https://www.google.com/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0'
            })
          })
        ]
      }); */
    },
    // 构造函数，使用：new BaseMapLayer(参数)，返回：layer
    BaseMapLayer(options) {
      var mapExtent = [179.92574, 74.87274, -77.24223, -45.44708];
      var layer = new ol.layer.Tile({
        extent: ol.proj.transformExtent(mapExtent, "EPSG:4326", "EPSG:3857"),
        source: new ol.source.XYZ({
          url: options.url,
          tilePixelRatio: 1,
          minZoom: 2,
          maxZoom: 12
        })
      });
      return layer;
    },
    /* 创建一个矢量图层 ,相当于总体div,添加元素feature图层*/
    createVector() {
      return new ol.layer.Vector({
        id: "vectorLayer",
        source: new ol.source.Vector()
        // source:new ol.source.Cluster({
        //   distance: parseInt(50000, 10),
        //   source: new ol.source.Vector(),
        // })
      });
    },
    /* 在矢量图层画2个点和2个三角形  */
    drawPoint(coordinate, index) {
      let feature = new ol.Feature({
        //创建一个点
        id: index,
        coordinate: coordinate,
        geometry: new ol.geom.Point(coordinate),
        zIndex: 5
      });
      // 设置feature对象自带属性
      feature.setId(index);
      //   feature添加自定义属性
      feature.coordinate = coordinate;
      feature.isShowOverlay = false;
      feature.setStyle(this.getFeatureStyle(coordinate, index));
      return feature;
    },
    /* 画小圆圈 */
    getFeatureStyle(coordinate, index) {
      let style;
      if (index.includes("point")) {
        style = new ol.style.Style({
          image: new ol.style.Circle({
            radius: 10,
            fill: new ol.style.Fill({
              color: "blue"
            }),
            stroke: new ol.style.Stroke({
              width: 2,
              color: "green"
            })
          })
        });
      } else {
        style = this._createRectStyle();
      }
      // 文字属于样式的一种
      style.setText(
        new ol.style.Text({
          font: "15px Microsoft YaHei",
          text: "阵地名称",
          offsetX: 12,
          offsetY: 10,
          textAlign: "left",
          fill: new ol.style.Fill({
            color: "#2d8cf0"
          })
        })
      );
      return style;
    },

    /* 画出canvas三角形 */
    _createRectStyle() {
      // 创建一个矩形canvas

      /* let canvas = document.createElement('canvas');
        canvas.className = 'rectCanvas';
        let ctx = canvas.getContext('2d');
        //设置画布大小，画布只有10px
        canvas.width = 40;
        canvas.height = 10;
        ctx.fillStyle = color;
        //设置画布上边长方形的大小
        //x，y分别代表矩形左上角距离画布的x轴和y轴长度
        ctx.fillRect(0, 0, height, width )   //height指长方形高度，画布只有10px，不管width怎么变化，最后显示出来的只有10px */

      // 画实心等边三角形
      var canvas = document.createElement("canvas");
      var ctx = canvas.getContext("2d");
      //填充三角形（等边）
      ctx.beginPath();
      let height = 20 * Math.sin(Math.PI / 3);
      // let height=20;
      ctx.moveTo(10, 0); //从A（10,0）开始
      ctx.lineTo(0, height); //从A(10,0)开始，画到B (0,17)结束
      ctx.lineTo(20, height); //B(0,21)-C(20,17)
      ctx.fillStyle = "#f00"; //以纯色绿色填充
      // var grd = ctx.createLinearGradient(0,0,200,0);//使用渐变颜色填充,从(0,0)到(200,0) （左到右）
      // grd.addColorStop(0,"#4CE8B2"); //起始颜色
      // grd.addColorStop(1,"#EFD458"); //终点颜色
      // ctx.fillStyle=grd; //以上面定义的渐变填充
      ctx.fill(); //闭合形状并且以填充方式绘制出来
      // 创建样式
      let rectStyle = new ol.style.Style({
        image: new ol.style.Icon({
          img: canvas,
          imgSize: [30, 30]
        }),
        zIndex: 50
      });
      return rectStyle;
    },

    /* 删除对应feature */
    deleteFeature(id) {
      let source = vectorLayer.getSource();
      let feature = source.getFeatureById(id);
      if (feature) {
        source.removeFeature(feature);
      }
    },
    /**
     * 清除所有feature
     * @param {*} options
     */
    clearAllFeature() {
      vectorLayer.getSource().clear();
      let rects = document.getElementsByClassName("rectCanvas");
      if (rects && rects.length) {
        Array.from(rects).forEach(item => {
          item.remove();
        });
      }
    },

    /* 画轨迹线 */
    drawTraceLine() {
      let lineFeature,
        points = traceData.map(item => [item.lon, item.lat]),
        styles = [];
      /* 设置整个线条样式 */
      /* styles= [
        // linestring
        new ol.style.Style({
          stroke: new ol.style.Stroke({    //画线
              color:'#f00',
              width: 2
          })
        })]; */
      // 画线
      lineFeature = new ol.Feature({
        geometry: new ol.geom.LineString(points) //只画线不设置颜色
      });

      // 画线的箭头
      let geometry = lineFeature.getGeometry();
      geometry.forEachSegment((start, end) => {
        let dataItem = traceData.find(
          item => JSON.stringify([item.lon, item.lat]) == JSON.stringify(end)
        );
        let lineColor = this.getColor(dataItem);
        let dx = end[0] - start[0];
        let dy = end[1] - start[1];
        let rotation = Math.atan2(dy, dx);
        styles.push(
          /* 设置部分线条样式 */
          new ol.style.Style({
            geometry: new ol.geom.LineString([start, end]),
            stroke: new ol.style.Stroke({
              //画线
              color: this.getColor(dataItem),
              width: 2
            })
          }),
          /* 设置顶点样式 */
          // src+color设置颜色有用，可以展示图像，image+color设置颜色无用，只能展示图像
          // 方法1：
          new ol.style.Style({
            geometry: new ol.geom.Point(end),
            image: new ol.style.Icon({
              src: require("@/assets/arrow.png"),
              anchor: [0.75, 0.5],
              rotateWithView: true,
              rotation: -rotation,
              color: lineColor /* 改变图片颜色 */
            })
            // 方法2：
            // let image=new Image();
            // image.src='../../../static/openlayerImage/arrow.png'
            // image: new ol.style.Icon({
            //   image: image,
            //   imgSize:[10,10],
            //   rotateWithView: true,
            //   rotation: -rotation,
            // })
          })
        );
      });
      console.log(styles);
      lineFeature.setStyle(styles);
      return lineFeature;
    },
    getColor(dataItem) {
      let color;
      switch (dataItem.speed) {
        case 0:
          color = "blue";
          break;
        case 1:
          color = "red";
          break;
        case 2:
          color = "yellow";
          break;
        case 3:
          color = "green";
          break;
      }
      return color;
    },
    /* 添加经纬度控件 */
    addMousePositionAndScaleControl(map) {
      // let MousePosition = ol​.control​.MousePosition;
      var mousePositionControl = new MousePosition({
        // coordinateFormat: createStringXY(4),
        coordinateFormat: function(coord) {
          return toStringHDMS(coord);
        },
        projection: "EPSG:4326",
        // comment the following two lines to have the mouse position
        // be placed within the map.
        className: "custom-mouse-position",
        target: document.getElementById("mouse-position"),
        undefinedHTML: "&#160;"
      });
      var scaleLineControl = new ScaleLine({
        //设置度量单位为米
        units: "metric",
        target: "scalebar",
        className: "ol-scale-line"
      });
      map.addControl(mousePositionControl);
      //将比例尺控件加入到map中
      map.addControl(scaleLineControl);
    },
    /* 画圆 
    center:圆心，
    radius:半径以m为单位*/
    drawCircle(center = [105, 30], radius = 50000) {
      let feature = new ol.Feature({
        //创建一个点，以50km为半径
        id: "circleId",
        geometry: new ol.geom.Circle(center, this.getRadius(radius))
      });
      feature.setStyle(
        new ol.style.Style({
          fill: new ol.style.Fill({
            color: "rgba(255,0,0,0.3)"
          }),
          stroke: new ol.style.Stroke({
            width: 4,
            color: "#0099cc",
            lineDash: [20, 10, 20, 10] // 重点在这,画虚线
          })
        })
      );
      // point:[[104, 30],[104.7, 30]],   //圆形坐标
      // canvas:[[103.5, 29.5],[105, 30.3]]
      // 获取圆的经纬度范围
      console.log(feature.getGeometry().getExtent());
      // 判断某个点是否在圆范围内。点在内部，返回true；点在边缘，返回false（一个点是否在另外一个区域范围内）
      console.log(
        feature
          .getGeometry()
          .intersectsCoordinate([104.55084235794024, 29.55084235794024])
      ); //某个点
      // 判断某个点是否在圆范围内。点在内部，返回true；点在边缘，返回true
      console.log(
        ol.extent.containsCoordinate(feature.getGeometry().getExtent(), [
          104.55084235794024,
          29.55084235794024
        ])
      );
      // 判断某个多边形是否在圆范围内（2个区域范围是否有交集）
      console.log(feature.getGeometry().intersectsExtent([104, 29, 105, 30])); //多边形范围,true
      console.log(
        ol.extent.containsCoordinate(feature.getGeometry().getExtent(), [
          104,
          29,
          105,
          30
        ])
      ); //false
      vectorLayer.getSource().addFeature(feature);
    },
    /**
     * 将半径转换为投影单位,因为ol.geom.Circle设置半径的单位是随投影的单位，所以需要将单位m转换成投影的单位
     * @param {Number} radius 以米为单位的半径的值
     * @returns {Number} circleRadius 以投影的单位为单位的半径的值
     */
    getRadius(radius) {
      // 获取当前投影单位
      console.log(
        map
          .getView()
          .getProjection()
          .getUnits()
      );
      // 当前投影有哪些单位？
      console.log(ol.proj.Units);
      // 将当前投影的单位转换成'm'米
      let metersPerUnit = map
        .getView()
        .getProjection()
        .getMetersPerUnit();
      // 得到投影单位半径
      let circleRadius = radius / metersPerUnit;
      return circleRadius;
    },
    drawPolygon() {
      var polygon = new ol.Feature(
        new ol.geom.Polygon([
          [
            [104, 30],
            [104.5, 29.5],
            [105, 30],
            [105, 29],
            [104, 29]
          ]
        ])
      );
      polygon.setStyle(
        new ol.style.Style({
          fill: new ol.style.Fill({
            color: "rgba(255,0,0,0.3)"
          }),
          stroke: new ol.style.Stroke({
            width: 4,
            color: "#0099cc"
          })
        })
      );
      // 获取多边形的经纬度范围
      console.log(polygon.getGeometry().getExtent());
      vectorLayer.getSource().addFeature(polygon);
    },
    /* 计算2点之间的距离 */
    getdistance() {
      // 6378137:平均地球半径。
      wgs84Sphere = new ol.sphere(6378137);
      let dis = wgs84Sphere.haversineDistance([104, 30], [104.5, 30]);
      console.log(dis);
    }
  }
};
</script>
<style lang='scss' scoped>
#map {
  height: 100%;
}
</style>
