<template>
  <div>
    <p>生成动态表格，表格分页可多选
      <el-button type="primary" @click="$refs.dynamicTable.clearSelection();">清空所有分页中的选中选项</el-button>
    </p>
    
      <!-- 动态表格，注意这里有2个属性要注意：
      row-key和reserve-selection结合使用会保留之前的多选，在分页之后表格数据刷新也会被保留-->
      <el-table
        ref="dynamicTable"
        :data="tableData"
        row-key="id"
        style="width: 100%"
        @select="handleSelectionChange"
        :header-cell-style="tb_header"
      >
        <el-table-column type="selection" width="55" reserve-selection></el-table-column>
        <el-table-column
          v-for="(item,index) in tableField"
          :key="index"
          :label="item.label"
          :prop="item.value"
        >
          <template slot-scope="scope">
            <div v-if="item.value=='tag'">
              <el-tag
                v-for="(itm,indx) in scope.row.tag.split(',')"
                size="medium"
                :key="indx"
              >{{ itm }}</el-tag>
            </div>
            <span v-else>{{scope.row[item.value]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="2"
        layout="total, prev, pager, next"
        :total="5"
      ></el-pagination>
      <br>
      <el-input v-model="inputValue"></el-input>
      <!-- 多选框组 -->
      <p>多选框组布局</p>
      <div>
        <!-- 子组件想父组件传单个值 ，使用$event-->
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange('record111',$event)">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <!-- 子组件想父组件传多个值 ，使用arguments-->
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange('record222',arguments)">
          <!-- <div > -->
            <el-row class="box-checkbox">
              <el-col :span="8" v-for="city in cities" :key="city" style='text-align:left;'>          
                <el-checkbox @change='getChangeItem(city,$event)' :label="city">{{city}}</el-checkbox>
              </el-col>
            </el-row>
          <!-- </div> -->
        </el-checkbox-group>
      </div>
  </div>
</template>
  </div>
</template>

<script>
 const cityOptions = ['上海', '北京', '澳大利亚', '深圳','新加坡','香港xxxxxxxxxxxxxx','日本','韩国'];
export default {
  name: "",
  data() {
    return {
      inputValue:'',
      tb_header:{
        'background-color': '#545c64',
        color:"#fff"
      },
      multipleSelection: [],
      currentPage1: 1,
      tableData: [
        {
          id: 1,
          date: "2016-05-02",
          name: "王小虎1",
          tag: "标签11,标签22"
        },
        {
          id: 2,
          date: "2016-05-04",
          name: "王小虎2",
          tag: "标签33"
        },
          {
            id: 5,
            date: "2016-05-04",
            name: "王小虎2",
            tag: "标签33"
          }
      ],
      tableField: [
        {
          label: "日期",
          value: "date"
        },
        {
          label: "名字",
          value: "name"
        },
        {
          label: "标签",
          value: "tag"
        }
      ],
      checkAll: false,
        checkedCities: ['上海', '北京'],
        cities: cityOptions,
        isIndeterminate: true
    };
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    /* 获取被选中的复选框值和勾选状态 */
    getChangeItem(item,boolean){
      console.log(item,boolean)
    },
    handleCheckAllChange(flag,val) {
      console.log(flag,val)
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedCitiesChange(flag,value) {
      console.log(flag,value[0])
      let checkedCount = value[0].length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    /* 切换分页时切换数据 */
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      if (val == 1) {
        this.tableData = [
          {
            id: 1,
            date: "2016-05-02",
            name: "王小虎1",
            tag: "标签11,标签22"
          },
          {
            id: 2,
            date: "2016-05-04",
            name: "王小虎2",
            tag: "标签33"
          },
          {
            id: 5,
            date: "2016-05-04",
            name: "王小虎2",
            tag: "标签33"
          }
        ];
      } else {
        this.tableData = [
          {
            id: 3,
            date: "2016-05-01",
            name: "王小虎3",
            tag: "标签33"
          },
          {
            id: 4,
            date: "2016-05-03",
            name: "王小虎4",
            tag: "标签33"
          }
        ];
      }
    },
    /* 得到表格中的多选数据 */
    handleSelectionChange(val,row) {
      this.multipleSelection = val;
      // console.log(val);
      if(val.length>3) {
        this.$refs.dynamicTable.toggleRowSelection(row,false)
        this.$message.warning("最多只能选3个！")
      }
    }
  }
};
</script>
<style scoped>
  .box-checkbox{
    width:300px;
    border:1px solid black;
    margin:auto;
  }
</style>
