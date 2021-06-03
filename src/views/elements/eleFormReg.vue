<template>
  <div class=''>
    <!-- 正常的静态表单加验证 -->
    <p>正常的静态表单加验证</p>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="int" prop="pass">
            <el-input-number :controls="false" v-model="ruleForm.pass" autocomplete="off" :min="-2147483648" :max="2147483647"></el-input-number>
        </el-form-item>
        <el-form-item label="float" prop="checkPass">
            <el-input-number  :controls="false" v-model="ruleForm.checkPass" autocomplete="off" :min="-2^128" :max="2^128"></el-input-number>
        </el-form-item>
        <el-form-item label="double" prop="age">
            <el-input-number :controls="false" v-model="ruleForm.age" :min="-2^1024" :max="2^1024"></el-input-number>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>

    <p></p><hr/>

    <!-- 使用数组动态生成表单并验证 ,注意看:model和:prop-->
    <p>使用数组动态生成表单并验证</p>
    <el-form :model="{formData}" ref="formData" label-width="100px" class="demo-ruleForm">
        <el-form-item v-for="(item,index) in formData" :key="index" :label="item.label" :prop="'formData.' + index + '.mod'"
        :rules="formDataRule[item.prop]?formDataRule[item.prop]:{}">
            <el-input-number :controls="false" v-model="item.mod" autocomplete="off"></el-input-number>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="submitForm('formData')">提交</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: '',
  data(){
    
    return {
        ruleForm: {
          pass: null,   //这里有值不为null时取这里的值，这里为null时默认为0
          checkPass: 23,
          age: 23
        },
        rules: {
          pass: [
            { validator: this.validatePass, trigger: 'blur' ,min:-2147483648,max:2147483647,reg:REGEXP[0],
            msg:"请输入int类型数据，取值范围是[-2147483648,2147483647]"}
          ],
          checkPass: [
            { validator: this.validatePass, trigger: 'blur' ,min:Math.pow(-2,128),max:Math.pow(2,128),reg:REGEXP[1],
            msg:"请输入float类型数据，取值范围是[-3.4E+38,3.4E+38](-2^128,+2^128)"}
          ],
          age: [
            { validator: this.validatePass, trigger: 'blur' ,min:Math.pow(-2,1024),max:Math.pow(2,1024),reg:REGEXP[2],
            msg:"请输入double类型数据，取值范围是[-1.79E+308,1.79E+308](-2^1024,+2^1024)"}
          ]
        },
        formData:[
          {
            label:"标签111",
            prop:"BIAO111",
            mod:11,
            fieldType:"int"
          },{
            
            label:"标签222",
            prop:"BIAO222",
            mod:22.2,
            fieldType:"float"
          }
        ],
        formDataRule:{
          BIAO111:{validator: this.validatePass, trigger: 'blur',reg:REGEXP[0],msg:"请输入int类型数据"},
          BIAO222:{validator: this.validatePass, trigger: 'blur',reg:REGEXP[2],msg:"请输入float类型数据"}
        }

    }
  },
  components: {},
  created(){},
  mounted(){},
  methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
              
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      validatePass(rule, value, callback){
       if(rule.reg.test(value)){
           callback()
       }else{
           callback(new Error(rule.msg))
       }
      }
  }
}
</script>
<style  scoped>
</style>
