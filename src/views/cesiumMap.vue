<template>
    <div id="cesiumContainer" class="main-panel"></div>
</template>

<script>
// import Cesium from "Build/Cesium/Cesium.js";
// import "Build/Cesium/Widgets/widgets.css";
export default {
  name: 'cesiumMap',
  data(){
    return {}
  },
  components: {},
  created(){},
  mounted () {
    this.$nextTick(() => {
      this.initCMap();
    })
  },
  methods: {
    initCMap(){
      // buildModuleUrl.setBaseUrl("../../static/image/imgCesium/Cesium/");
      const viewer = new Cesium.Viewer('cesiumContainer', {
        animation: false, //是否显示动画控件
        skyBox: new Cesium.SkyBox({}, false),
        homeButton: false,
        fullscreenButton: false,
        baseLayerPicker: false,
        geocoder: false,
        timeline: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        infoBox: false,
        requestRenderMode: false, //是否启用请求渲染模式
        scene3DOnly: true,
        selectionIndicator: false,
        // imageryProvider: Cesium.createTileMapServiceImageryProvider({
        //   url: Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
        // })
        /* imageryProvider:new Cesium.SingleTileImageryProvider({
          url: require("@/assets/imgCesium/3dMap.jpg")
          // layers: 'htth_basemap:world'
        }) */
        imageryProvider:new Cesium.UrlTemplateImageryProvider({
          // url: "/tiles/{z}/{x}/{y}.png", 
          // url: "http://192.168.31.231:8080/tiles/{z}/{x}/{y}.png", //http://192.168.31.231:8080
          url: "http://192.168.31.231:8080/tiles/{z}/{x}/{y}.png", //http://192.168.31.231:8080
          fileExtension:"png"
          // layers: 'htth_basemap:world'
        })
      })
      /* viewer.imageryLayers.addImageryProvider(
        new Cesium.SingleTileImageryProvider({
          url: "http://192.168.31.231:8080/tiles/{z}/{x}/{y}.png"
          // layers: 'htth_basemap:world'
        })
      ); */
      //  viewer.imageryLayers.addImageryProvider(
      //               new Cesium.createOpenStreetMapImageryProvider({
      //                   //url: "https://a.tile.openstreetmap.org/"
      //                   url: "http://192.168.31.231:8080/tiles/{z}/{x}/{y}.png"
      //               }));
      viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
          104.06454546,
          30.6754564654,
          30000000
        )
      });
      this.addPoint(viewer)
      this.addPlaneTrace(viewer)
    },
    addPoint(viewer) {
      viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(104.06454546, 30.6754564654),
        name: "test cesium point add",
        billboard: {
            image: require("@/assets/imgCesium/飞机nomal.png"),
            rotation: Cesium.Math.PI_OVER_TWO
        }
      });  
    },
    addPlaneTrace(viewer){
      Cesium.Math.setRandomNumberSeed(3);
      const start = Cesium.JulianDate.fromDate(new Date('2020-01-01 12:00:00'));  //飞行开始时间
      const stop = Cesium.JulianDate.fromDate(new Date('2020-01-01 12:40:00'))    //飞行结束时间

      // 设置始时钟始时间
      viewer.clock.startTime = start.clone();
      // 设置始时钟始时间
      viewer.clock.stopTime = stop.clone();
      // 设置始时当前时间
      viewer.clock.currentTime = start.clone();
      // 循环执行,即为2，到达终止时间，重新从起点时间开始
      viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP;
      // 时间速率，数字越大时间过的越快
      viewer.clock.multiplier = 200;
      let data=[];
      data[0] = [
        //经度，纬度，高度，飞行时间
        { longitude: 116.405419, dimension: 40.918034, height: 0, time: '2020-01-01 12:00:00' },
        { longitude: 112.034586, dimension: 39.881202, height: 0, time: '2020-01-01 12:10:00'  },
        { longitude: 116.340088, dimension: 38.842224, height: 70000, time: '2020-01-01 12:20:00' },
        { longitude: 118.489176, dimension: 23.464017, height: 70000, time: '2020-01-01 12:30:00' },
        { longitude: 114.262084, dimension: 23.13901, height: 0, time: '2020-01-01 12:40:00'  }

        /* 使用下边的数据浏览器比较卡，但是数据没问题 */
        // { longitude: 116.405419, dimension: 39.918034, height: 0, time: '2020-01-01 12:00:00' },
        // { longitude: 117.034586, dimension: 39.881202, height: 0, time: '2020-01-02 12:10:00'  },
        // { longitude: 116.340088, dimension: 38.842224, height: 70000, time: '2020-01-03 12:20:00' },
        // { longitude: 113.489176, dimension: 23.464017, height: 70000, time: '2020-01-04 12:30:00' },
        // { longitude: 113.262084, dimension: 23.13901, height: 0, time: '2020-01-05 12:40:00'  }
      ];
      /* 注意点：
      1.在相同的飞行距离中，飞行时间越长，时间跨度越大，绘制出的飞行航迹线段越粗，浏览器就越卡，所以要选择某段时间内的飞行轨迹进行展示，
      换成上边注释掉的数据试试 */
      for (let j = 0; j < data.length; j++) {
        let property = this.computeFlight(viewer,data[j], start);    
        // 添加模型
        let planeModel = viewer.entities.add({
          // 和时间轴关联
          availability: new Cesium.TimeIntervalCollection([    //必写属性
                            new Cesium.TimeInterval({
                              start: start,
                              stop: stop
                            })
          ]),
          position: property,     //添加property对象可以让飞机动起来，普通对象不可以
          // 根据所提供的速度计算模型的朝向
          orientation: new Cesium.VelocityOrientationProperty(property),
          // 模型数据
          model: {                      //添加动态飞机模型
            // uri:"@/assets/imgCesium/Cesium_Air.gltf",
            uri:"../../static/image/imgCesium/Cesium_Air.gltf",
            // uri:"../../static/image/imgCesium/飞机nomal.png",   //不能使用图片
            minimumPixelSize: 80         //飞机最大时多大
          },
          path: {
            resolution: 1,
            material: new Cesium.PolylineGlowMaterialProperty({
              glowPower: 0.1,
              color: Cesium.Color.YELLOW
            }),
            width: 10
          },
          label: {
            text: "目标" + j,
            fillColor: Cesium.Color.DEEPPINK,
            font: "16px sans-serif",
            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.8),
            backgroundPadding: new Cesium.Cartesian2(7, 5),
            pixelOffset :new Cesium.Cartesian2(2.0, 1.0),  //标签偏移
            pixelOffsetScaleByDistance : new Cesium.NearFarScalar(1.5e2, 0.0, 8.0e6, 10.0)//标签偏移
          }
        });
      }
    },
    computeFlight(viewer,source, start) {
      // 取样位置 相当于一个集合
      let property = new Cesium.SampledPositionProperty();
      for (let i = 0; i < source.length; i++) {
        let time = Cesium.JulianDate.fromDate(new Date(source[i].time))
        let position = Cesium.Cartesian3.fromDegrees(
          source[i].longitude,
          source[i].dimension,
          source[i].height
        );
        // 添加位置，和时间对应，在不同的时间点分别赋予不同的位置，让飞机缓慢地从A位置移到B位置
        property.addSample(time, position);
        viewer.entities.add({
          position: position,
          point: {                  //添加一个点
            pixelSize: 3,
            color: Cesium.Color.TRANSPARENT,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 5
          }
          // billboard: {                 //添加广告牌
          //   image: require("@/assets/imgCesium/arrow.png"),
          //   rotation: Cesium.Math.PI_OVER_TWO
          // },
        });
      }
      return property;
    },

  }
}
</script>
<style scoped>
</style>
