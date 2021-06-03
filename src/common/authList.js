//按钮权限配置文件
let initAuthList=[{
  id:"0",
  pid:"root",
  name:"处理中心",
  path: "/home",
  children:[{
    id: "1",
    pid: "0",
    name: "处理中心1",
    path: "/home/option1",
    btns: [
      {name: "新增1", code: "add1", value: 0},
      {name: "新增2", code: "add2", value: 0},
      {name: "删除", code: "delete1", value: 0}
    ]
  },{
    id: "2",
    pid: "0",
    name: "处理中心2",
    resources: {path: "/home/option2"},
    btns: [
      {name: "新增", code: "add3", value: 0},
      {name: "新增", code: "add4", value: 0},
      {name: "删除", code: "delete2", value: 0}
    ]
  }]
},{
  id:"3",
  pid:"root",
  name:"消息中心",
  path: "/home/option5",
  btns: [
    {name: "新增", code: "add5", value: 0},
    {name: "新增", code: "add6", value: 0},
    {name: "删除", code: "delete3", value: 0}
  ]
}];

//处理后台给的数据
