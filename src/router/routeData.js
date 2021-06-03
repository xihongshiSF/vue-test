// const routeData={   //import使用方法

module.exports={   //require的使用方法
    filePolicies:[
      /*{id: "0", pid: "root", user: "liyy", name: "处理中心", resources: {path: "/home"}},
      {
        id: "1",
        pid: "0",
        user: "liyy",
        name: "处理中心1",
        resources: {path: "/home/option1"},
        permissions: [{name: "新增", code: 1027, value: 1}, {name: "删除", code: 1026, value: 0}]
      }*/

      {id: "0", pid: "root", name: "处理中心", user: "lidm", resources: {path: "/home"}},
      {
        id: "1",
        pid: "0",
        name: "处理中心1",
        user: "lidm",
        resources: {path: "/home/option1"},
        permissions: ["1","2"]
      },
      {
        id: "2",
        pid: "0",
        name: "处理中心2",
        user: "lidm",
        resources: {path: "/home/option2"},
        permissions: ["4"]
      },
      {id: "3", pid: "root", name: "消息中心", user: "lidm", resources: {path: "/home/option5"}}
    ]
};


// export default routeData  //import使用方法

