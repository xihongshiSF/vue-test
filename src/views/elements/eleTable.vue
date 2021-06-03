<template>
    <div>
      <div>不规则表格</div>
      <el-table
        :data="tableData"
        :span-method="handleColspanMethod"
        :header-cell-style="tb_header"
        :cell-style="tb_body"
        border
        style="width: 100%">
        <!-- <el-table-column v-for="item in tableProp" :prop="item.prop" :label="item.label" :key="item.prop">
        </el-table-column> -->
        <el-table-column v-for="item in tableProp" :prop="item.prop" :label="item.label" :key="item.prop">
        </el-table-column>
      </el-table>

      <p>表格过滤</p>
      <el-table
        :header-cell-style="tb_header"
        :cell-style="tb_body"
        :data="tableData1.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">
        <el-table-column
          label="Date"
          prop="date">
        </el-table-column>
        <el-table-column
          label="Name"
          prop="name">
        </el-table-column>
        <el-table-column
          align="right">
          <template slot="header" slot-scope="scope">
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
    export default {
      name: "eleTable",
      data(){
          return{
            //表头样式
            tb_header:{
              'background-color': '#545c64',
              color:"#fff"
            },
            tb_body:{
              "padding-top":"0",
              "padding-bottom":"0"
            },
            tableData: [  //注意看method和source
              {method: 'TX1',source: '成都',type: 'LX1',input: '3.2',output: 10}, 
              {method: 'TX1',source: '成都',type: 'LX2',input: '3.2',output: 10}, 
              {method: 'TX1',source: '成都',type: 'LX3',input: '3.2',output: 10}, 

              {method: 'TX1',source: '西安',type: 'LX1',input: '4.43',output: 12}, 
              {method: 'TX1',source: '西安',type: 'LX2',input: '4.43',output: 12}, 
              {method: 'TX1',source: '北京',type: 'LX1',input: '1.9',output: 9}, 

              {method: 'TX2',source: '广州',type: 'LX1',input: '2.2',output: 17}, 
              {method: 'TX2',source: '广州',type: 'LX2',input: '2.2',output: 17}, 
              {method: 'TX2',source: '广州',type: 'LX3',input: '2.2',output: 17}, 
              {method: 'TX2',source: '广州',type: 'LX4',input: '2.2',output: 17}, 

              {method: 'TX2',source: '上海',type: 'LX1',input: '4.1',output: 15},
              {method: 'TX2',source: '上海',type: 'LX2',input: '4.1',output: 15},

              {method: 'TX2',source: '深圳',type: 'LX1',input: '4.1',output: 15},
              {method: 'TX2',source: '深圳',type: 'LX2',input: '4.1',output: 15},

              {method: 'TX3',source: '昆明',type: '539',input: '4.1',output: 15},
              {method: 'TX3',source: '乌鲁木齐',type: '539',input: '4.1',output: 15}],
            
            // tableData: [    //注意看appkey
            //   { id: 1, appkey: 1, name: 'a' ,age:"年龄1",num:"数量1"},
            //   { id: 11, appkey: 1, name: 'a-1' ,age:"年龄2",num:"数量2"},
            //   { id: 12, appkey: 1, name: 'a-2' ,age:"年龄2",num:"数量2"},
            //   { id: 21, appkey: 2, name: 'b-1' ,age:"年龄2",num:"数量2"},
            //   { id: 2, appkey: 2, name: 'b' ,age:"年龄2",num:"数量2"},
            //   { id: 22, appkey: 2, name: 'b-2' ,age:"年龄2",num:"数量2"}
            // ],
            tableProp:[
              {prop:"method",label:"通信方式"},
              {prop:"source",label:"来源"},
              {prop:"type",label:"类型"},
              {prop:"input",label:"输入数据量"},
              {prop:"output",label:"输出数据量"}
            ],
            // tableProp:[
            //   {prop:"id",label:"id"},
            //   {prop:"appkey",label:"appkey"},
            //   {prop:"name",label:"name"},
            //   {prop:"age",label:"年龄"},
            //   {prop:"num",label:"数量"}
            // ],
            spanArr: [], // 保存要合并的行列数据
            tableData1: [
              {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'}, 
              {date: '2016-05-04',name: 'LIUMm',address: '上海市普陀区金沙江路 1517 弄'}, 
              {date: '2016-05-01',name: '王小虎',address: '上海市普陀区金沙江路 1519 弄'}, 
              {date: '2016-05-03',name: '李冬梅',address: '上海市普陀区金沙江路 1516 弄'}
            ],

            search: ''
        
          }
      },
      created(){
        this.getSpanArr();
      },
      methods:{
        /* 第1个表格 */
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        },
        /**
         * 获取合并位置信息
         */
        // getSpanArr() {
        //   // 重置 spanArr，因为翻页的时候数据就变了
        //   // 之前的数据如果不清空，其他页也会受影响
        //   this.spanArr = []
        //   const data = this.tableData
        //   if (!data || data.length <= 0) return
        //   // 遍历
        //   for (let i = 0; i < data.length; i++) {
        //     if (i === 0) {
        //       this.spanArr.push(1)
        //       // 标记需要跨行的行索引
        //       this.pos = 0
        //     } else {
        //       // 如果当前对象和上一个对象的 appkey 相等
        //       // 说明需要合并
        //       if (data[i].appkey === data[i - 1].appkey) {
        //         this.spanArr[this.pos] += 1
        //         this.spanArr.push(0)
        //       } else {
        //         this.spanArr.push(1)
        //         this.pos = i
        //       }
        //     }
        //   }
        //   console.log(11,this.spanArr)
        // },

        /* 第2个表格 */

        /**
         * 获取合并位置信息
         * 获取每一列中的每一行所占行数
         * 使用这个方法的前提是所有method为TX1的行数据放在一起，所有source为成都的放在一起
         * 原文链接看这里  https://juejin.im/post/5be01d0ce51d450700084925
         */
        getSpanArr(){
          this.spanArr = []
          const data = this.tableData;
          if (!data || data.length <= 0) return
          //给当前列的每一行添加跨行数
          //遍历列,只统计前2列中每行的跨行数
          for(let i=0;i<2;i++){
            let field=this.tableProp[i].prop;
            this.spanArr[i]=[]
            //遍历行
            for (let j = 0,len=data.length; j < len; j++) {
             if (j === 0) {
                this.spanArr[i].push(1)
                // 标记需要跨行的行索引
                this.pos = 0      //注意看这里，这个变量是重点
              } else {
                // 如果当前对象和上一个对象的 appkey 相等
                // 说明需要合并
                if (data[j][field] === data[j - 1][field]) {
                  this.spanArr[i][this.pos] += 1
                  this.spanArr[i].push(0)
                } else {
                  this.spanArr[i].push(1)
                  this.pos = j
                }
              }
            }
          }
          //这个变量里边有2个数组，第1个数组是第0列中每行的跨行值，第2个数组是第1列中每行的跨行值
          console.log(22,this.spanArr)  
         /*  this.spanArr=[
            [6, 0, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 2, 0],
            [3, 0, 0, 2, 0, 1, 4, 0, 0, 0, 2, 0, 2, 0, 1, 1]] */
        },
        
        /**
         * 处理跨行列合并
         * 用这个方法的时候对后台返回来的数据有格式要求
         * 如果后台返回这种格式数据，需要把里面的数组按顺序拿到外面，注意：必须按顺序
         * data: [
              { id: 1, appkey: 1, name: 'a', list: [{ id: 11, appkey: 1, name: 'a-1'}, {id: 12, appkey: 1, name: 'a-2'}] }
              { id: 2, appkey: 2, name: 'b', list: [{ id: 21, appkey: 2, name: 'b-1'}, {id: 22, appkey: 2, name: 'b-2'}] }
           ],
            必须转为以下格式
            data: [
              { id: 1, appkey: 1, name: 'a' },
              { id: 11, appkey: 1, name: 'a-1' },
              { id: 12, appkey: 1, name: 'a-2' },
              { id: 2, appkey: 2, name: 'b' },
              { id: 21, appkey: 2, name: 'b-1' },
              { id: 22, appkey: 2, name: 'b-2' }
            ]
         */
        handleColspanMethod({ row, column, rowIndex, columnIndex}) {
          // 按照第0列，第0行；第0列，第1行；第0列，第2行；第0列，第3行 顺序遍历
          if (columnIndex < 2) {
            const _spa = this.spanArr[columnIndex][rowIndex]
            const _row = _spa ? _spa : 0
            const _col = _row > 0 ? 1 : 0
            return {
              rowspan: _row,
              colspan: _col
            }
          }
        }
      }
    }
</script>

<style scoped>
  
</style>
