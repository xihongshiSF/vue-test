/**
 * 将json对象转为树形数组,
 * list:json数组对象
 * idStr:“id”或者其它，字符串类型
 * pidStr:"pid"或者其它，字符串类型
 * */

// const { addDevServerEntrypoints } = require("webpack-dev-server");

// console.log(2);  //判断main.js和commonFn.js的执行顺序
let COMMONFN = {
  // 监听页面某个元素的变化
  mutationOfDom:function(){
    debugger
    let config = {
      attributes: true, //目标节点的属性变化
      childList: true, //目标节点的子节点的新增和删除
      characterData: true, //如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化
      subtree: true, //目标节点所有后代节点的attributes、childList、characterData变化
    };
    let target=Array.from(document.getElementsByClassName('el-select-dropdown')).filter(item=>!item.style.display)[0];
    const mutationCallback = (mutationsList) => {
    for(let mutation of mutationsList) {
        let type = mutation.type;
        switch (type) {
            case "childList":
                console.log("A child node has been added or removed.");
                break;
            case "attributes":
                console.log(`The ${mutation.attributeName} attribute was modified.`);
                break;
            case "subtree":
                console.log(`The subtree was modified.`);
                break;
            default:
                break;
        }
      }
    };
    let observe = new MutationObserver(mutationCallback);
    observe.observe(target, config);
  },
  // 屏幕自适应
  fitScrren: function () {
    (function (win) {
      var bodyStyle = document.createElement('style')
      bodyStyle.innerHTML = `body{width:1920px; height:1080px!important;}`
      document.documentElement.firstElementChild.appendChild(bodyStyle)
      // 下拉列表样式
      /* var bodyStyle = document.createElement('style')
      bodyStyle.innerHTML = `.el-select-dropdown{top:${}px;left:${}px;}`
      document.documentElement.firstElementChild.appendChild(bodyStyle) */
      
      function refreshScale() {
        let docWidth = document.documentElement.clientWidth;
        let docHeight = document.documentElement.clientHeight;
        let designWidth = 1920,
          designHeight = 1080,
          widthRatio = docWidth / designWidth,
          heightRatio = docHeight / designHeight;
          window.widthRatio=widthRatio;
          window.heightRatio=heightRatio;
        document.body.style = `transform:scale(${widthRatio},${heightRatio});transform-origin:left top;`;
        // 应对浏览器全屏切换前后窗口因短暂滚动条问题出现未占满情况
        setTimeout(function () {
          var lateWidth = document.documentElement.clientWidth,
            lateHeight = document.documentElement.clientHeight;
          if (lateWidth === docWidth) return;

          widthRatio = lateWidth / designWidth
          heightRatio = lateHeight / designHeight
          document.body.style = "transform:scale(" + widthRatio + "," + heightRatio + ");transform-origin:left top;"
        }, 0)
      }
      refreshScale()

      win.addEventListener("pageshow", function (e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
          refreshScale()
        }
      }, false);
      win.addEventListener("resize", refreshScale, false);
    })(window)
  },
  transData: function (list, idStr, pidStr) {
    // debugger
    let result = [], temp = {};
    for (let i = 0; i < list.length; i++) {
      temp[list[i][idStr]] = list[i];
    }
    for (let j = 0; j < list.length; j++) {
      let tempVp = temp[list[j][pidStr]];
      if (tempVp) {
        if (!tempVp["children"]) tempVp["children"] = [];
        tempVp["children"].push(list[j]);
      } else {
        result.push(list[j]);
      }
    }
    return result;
  },
  /**
   *  根据按钮的唯一标识找到当前按钮的权限，是否隐藏，0代表隐藏，1代表展示
   *  code：当前按钮的唯一标识
   * */
  findAuthByCode: (code) => {
    let isShow = false;
    function findAuth(list) {
      let lists = list || authList;
      lists.map((item) => {
        if (item.btns) {
          item.btns.map(btnItem => {
            if (btnItem.code == code) {
              isShow = btnItem.value;

              return isShow
            }
          })
        } else if (item.children && !isShow) {
          findAuth(item.children)
        }
      })
    }
    findAuth();
    //返回为1表示展示，为0表示隐藏
    return isShow
  },
  btnCodeArray: function () {
    let btnCodes = [], menuData = JSON.parse(sessionStorage.getItem("menuData"));
    for (let item in menuData) {
      if (menuData[item].permissions) btnCodes = btnCodes.concat(menuData[item].permissions)
    }
    return btnCodes;
  },
  /**
 * 防抖，
 * 用户不管怎么频繁调用，都只在延迟时间结束时调用函数
 */
  debounce: function (fn, delay) {
    // 维护一个 timer
    let timer = null;

    return function () {
      // 通过 ‘this’ 和 ‘arguments’ 获取函数的作用域和变量
      let context = this;
      let args = arguments;

      clearTimeout(timer);
      timer = setTimeout(function () {
        fn.apply(context, args);
      }, delay);
    }
  },

  /**
   * 节流，
   * 用户不管怎么频繁调用，都会在规定的时间内一定执行一次函数，不管延迟时间有没有结束
   */
  throttle: function (func, delay) {
    var timer = null;
    var startTime = Date.parse(new Date());

    return function () {
      var curTime = Date.parse(new Date());
      var remaining = delay - (curTime - startTime);
      var context = this;
      var args = arguments;

      clearTimeout(timer);
      if (remaining <= 0) {
        func.apply(context, args);
        startTime = Date.parse(new Date());
      } else {
        timer = setTimeout(func, remaining);
      }
    }
  },
  /**
   * 节流
   * @param {Function} fn 函数
   * @param {Number} delay
   */
  /* throttle:function (fn, delay = 500) {
    let timer;
    let last;
    return function() {
      let _this = this;
      let args = arguments;
      let now = Number(new Date());
      if(last && now - last < delay) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          last = now;
          fn.apply(_this, args)
        }, delay)
      } else {
        last = now;
        fn.apply(_this, args)
      }
    }
  } */

  throttle1: function (fn, delay = 500) {
    let timer;
    let last;
    return function (e) {
      let _this = this;
      let now = Number(new Date());
      if (last && now - last < delay) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          last = now;
          fn.apply(_this, arguments)
        }, delay)
      } else {
        last = now;
        fn.apply(_this, arguments)
      }
    }
  },

  /*使用：*/

  /* Queries: throttle1(function (e) {
    this.loading = true;
    this.loading1 = true;
    // this.headerArray = []
    let obj = [this.form];
    (obj[0].startTime = this.form.collectTime[0]), //开始时间
      (obj[0].endTime = this.form.collectTime[1]); //结束时间
    this.cacheData = obj;
  }, 1000);*/

  /**
   * 防抖，不管点击了多少次，只认最后1次点击事件
   * @param {Function} fn 函数
   * @param {Number} delay
   */
  debounce1: function (fn, delay = 1000) {
    let timeout;
    return function () {
      let _this = this;
      let args = arguments;
      if (timeout) {
        clearTimeout(timeout)
      }
      timeout = setTimeout(() => {
        fn.apply(_this, args);
      }, delay);
    }
  },


  /*使用：*/

  /*//点赞
  star: debounce(function(item) {
    this.$emit('getStar', item)
  }, 500);*/

  /**
   * @function GetTimeFormat日期格式化
   * @param:
   * @Time
   * 2016/11/29
   * @Author　啸
   */
  timeFormat: function (time) {
    try {
      time = time || new Date().getTime()
    } catch (e) {
      return console.error(e)
    }
    var fullyear = (new Date(time).getFullYear());
    var month = (((new Date(time).getMonth() + 1)) > 9 ? (new Date(time).getMonth() + 1) : "0" + (new Date(time).getMonth() + 1));
    var day = ((new Date(time).getDate()) > 9 ? (new Date(time).getDate()) : "0" + (new Date(time).getDate()));
    var hours = ((new Date(time).getHours()) > 9 ? (new Date(time).getHours()) : "0" + (new Date(time).getHours()));
    var minu = ((new Date(time).getMinutes()) > 9 ? (new Date(time).getMinutes()) : "0" + (new Date(time).getMinutes()));
    var second = ((new Date(time).getSeconds()) > 9 ? (new Date(time).getSeconds()) : "0" + (new Date(time).getSeconds()));
    var obj = {
      time: fullyear + "/" + month + "/" + day + " " + hours + ":" + minu + ":" + second,
      _time: fullyear + "年" + month + "月" + day + "日 " + hours + "点" + minu + "分" + second + "秒",
      time_old: fullyear + "-" + month + "-" + day + " " + hours + ":" + minu + ":" + second,
      time_: [fullyear, month, day].map(COMMONFN.formatNumber).join('-') + " " + [hours, minu, second].map(COMMONFN.formatNumber).join(':'),
      timef: fullyear + "/" + month + "/" + day,
      _timef: fullyear + "-" + month + "-" + day,
      _timefs: [fullyear, month, day].map(COMMONFN.formatNumber).join('-'),
      _timefpoint: [fullyear, month, day].map(COMMONFN.formatNumber).join('.'),
      timef_: fullyear + "年" + month + "月" + day + "日",
      times_: fullyear + '' + month + '' + day
    };
    return obj
  },

  formatNumber: n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  },

  /*使用：*/
  /*var historyData = {
    //解析成  2020-5-13 12:03:55 这种格式用time_,解析成其他格式用其他的字段，如_timef或者timef_等
    time: Util.timeFormat(new Date()).time_, //（或 time: Util.timeFormat(new Date("2020-04-25T06:57:56.000Z")).time_）
    data: speedSum
  };*/

  /**
   *  链接websocket
   * */
  wsConnect: function (url, option, fcs) {
    if ('WebSocket' in window) {
      var reTimer = null;
      // 在new一个websocket对象时ws连接就已建立
      var ws = new WebSocket(url);
      var param = option || {};
      var obj = JSON.stringify(param);
      ws.option = param;
      ws.onopen = function (e) {
        // debugger
        console.log("连接服务器成功");
        if (ws.readyState === 1) {
          ws.send(obj)
        }
      };
      ws.onclose = function (e) {
        // debugger
        console.log("服务器关闭");
        reTimer = setTimeout(function () {
          wsConnect(url, option, fcs);
          clearTimeout(reTimer);
        }, 5000)
      };
      ws.onerror = function (e) {
        // debugger
        ws = null;
        console.log("连接出错");
      };
      ws.onmessage = function (e) {
        // debugger
        var d = JSON.parse(e.data);
        fcs && fcs(d, ws);
      }
    } else {
      console.log('浏览器不支持websocket！')
    }
  },

  /*使用：*/

  /*     var _opt = {                       // _opt 存储传给后台的参数
        controller: "tsfx",
        cmd: "txfxDataAccesTaskManger", //连接后台的接口名
        type: "forClient",              //type的取值分2种情况，（1）forClient：后台给前端主动推送数据,
                                                  //（2）interval：前端主动请求后台,同时要添加定时调用，调用时要写上下边的时间time:30
        query_way: "2"
          /!*,time: 30                       //定时调用*!/
      };
    wsConnect('ws://128.0.95.120:7400/ws/', _opt,function (res) {
      //后台返回的数据逻辑在这里写
    });*/


  /**
   *  数组对象去重
   */
  OutOfReapetObj: function (arr) {
    let temp_obj = new Object()
    let backArr = []
    for (var temp in arr) {
      temp_obj[JSON.stringify(arr[temp])] = 1
    }
    backArr = Object.keys(temp_obj)
    for (var temp2 in backArr) {
      backArr[temp2] = JSON.parse(backArr[temp2])
    }
    return backArr;
  },

  /*使用：*/

  /*aa=[{a:'aa',b:'bb',c:'cc'},{a:'aa',b:'bb',c:'cc'},{a:'aa1',b:'bb1',c:'cc1'}]
  OutOfReapetObj(aa);

  /!*结果：*!/

  [{a:'aa',b:'bb',c:'cc'},{a:'aa1',b:'bb1',c:'cc1'}]*/


  /**
   *   数组去重
   */

  /*方法1：*/

  UniqueArr: function (arr) {
    var res = [];
    var obj = {};
    for (var v of arr) {
      if (!obj[v]) {
        res.push(v);
        obj[v] = 1;
      }
    }
    return res
  },

  /*方法2： 使用Map结构*/

  /*let bb=[1,3,5,1,3,4];
  let aa=[...Map(bb)];*/


  /**
   * @function 随机字符串16制，生成唯一的uuid
   * @param:
   * @Time：2017/02/13
   * @person : lijia
   */

  uuid: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },


  /**
   * 对象继承
   */
  extend: function (child, father) {
    for (let key in father) {
      if (child[key]) {
        break;
      } else {
        child[key] = father[key]
      }
    }
  },

  /* 随机生成颜色 */
  getRandomColor: function () {
    var colorValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
    var s = "#";
    for (var i = 0; i < 6; i++) {
      s += colorValue[Math.floor(Math.random() * 16)];
    }

    return s;
  },

  /* 解析url地址栏中的参数 */
  getUrlKey: function (name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
  },

  // 用法如下：
  //1.如果传对象
  // let obj = { id: 21, name: "测试传参"};
  // window.open("http://localhost:8082/loginM?obj=" + JSON.stringify(obj),"_blank");
  // let data=this.util.getUrlKey("obj")   
  //2.如果传字符串
  // window.open("http://localhost:8082/#/login?token=8",'_blank')
  // let token=this.util.getUrlKey("token")


  /* 在匹配的字符串前添加\ 
     str:原字符串，
     reg:原字符串中匹配的字符,
     cha:在匹配的字符串前添加的字符*/
  addChaBeforeStr: function (str, reg, cha) {
    // return str.split("").map(item=>reg.test(item)?cha+item:item).join("")
    return str.split("").map(item => reg.includes(item) ? cha + item : item).join("")

  },

  /* 用法 */
  // let aa="@%m\/456";
  // let bb=/@|%|m|\\|\//g;或者bb=['@','%','m','\\','/']
  // let cc="\\";
  // addChaBeforeStr(aa,bb,cc)
  // 结果："\@\%\m\\\/456"



  /* 获取x到y之间的随机数 */
  getRandom: function () {
    return Math.floor(Math.random() * (y - x) + y)
  }
}




