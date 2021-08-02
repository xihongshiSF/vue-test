<template>
  <section>
    <!--上边-->
    <div class="top_main">
      <span>SDMP训练数据管理</span>
    </div>
    <div class="main">
      <!--左边-->
      <div class="left_main">
        <!--根目录名称-->
        <div class="div_root">
          <el-row type="flex" align="center" justify="center">
            <el-col :span="5" align="center">
              <p>根目录:</p>
            </el-col>
            <el-col :span="19">
              <el-input class="default-input" v-model="inputRoot" size="medium" disabled></el-input>
            </el-col>
          </el-row>
        </div>
        <!--按钮-->
        <div class="bottom_main">
          <div class="div_btn" align="center">
            <el-row type="flex">
              <el-col :span="6">
                <!--                        <el-button size="mini" @click="openInput('add')" class="icon-svg"></el-button>-->
                <span class="icon-svg btn-add" @click="openInput('add')"> 新增</span>
              </el-col>
              <el-col :span="6">
                <!--                        <el-button type="success" size="mini" @click="openInput('update')" class="icon-svg"></el-button>-->
                <span class="icon-svg btn-update" @click="openInput('update')"> 修改</span>
              </el-col>
              <el-col :span="6">
                <!--                        <el-button type="warning" size="mini" @click="deleteNode" class="icon-svg"></el-button>-->
                <span class="icon-svg btn-delete" @click="deleteNode"> 删除</span>
              </el-col>
              <el-col :span="6">
                <div class="div_progress" v-show="!isUploaded">
                  <!--进度条-->
                  <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage"></el-progress>
                </div>
                <el-dropdown>
                  <!--上传按钮-->
                  <span class="icon-svg btn-upload" v-show="isUploaded"> 上传</span>
                  <el-dropdown-menu slot="dropdown" class='default-dropdown'>
                    <!--文件上传-->
                    <el-upload
                      id="divUpload"
                      class="upload-demo"
                      :action="uploadDir"
                      :on-remove="handleRemove"
                      :before-remove="beforeRemove"
                      :file-list="fileList"
                      :data="paramUpload"
                      :on-change="fileChange"
                      :show-file-list="false"
                      multiple
                      :on-success="handleSuccess"
                      :disabled="isUploadDisabled"
                      :on-progress="onProgress"
                      :on-error="onError"
                    >
                      <el-dropdown-item
                        command="file"
                        @click.native="handleCommand('file')"
                        id="btnFile"
                      >文&nbsp;&nbsp;&nbsp;&nbsp;件</el-dropdown-item>
                    </el-upload>
                    <!--文件夹上传,on-progresse和on-sucess方法在文件夹上传中不管用-->
                    <el-upload
                      id="uploadFiles"
                      action
                      class="upload-demo"
                      :on-change="onChange"
                      :http-request="httpRequests"
                      :show-file-list="false"
                      :disabled="isUploadDisabled"
                    >
                      <el-dropdown-item
                        command="files"
                        @click.native="handleCommand('files')"
                        id="btnFolder"
                      >文件夹</el-dropdown-item>
                    </el-upload>

                    <!--<el-dropdown-item>
                                            <input type="file" id="uploadAudio" webkitdirectory>
                   &lt;!&ndash;                            <button id="btnSubmit">上传</button>&ndash;&gt;
                    </el-dropdown-item>-->
                  </el-dropdown-menu>
                </el-dropdown>
              </el-col>
            </el-row>
          </div>
          <!--<div class="div_progress" v-show="!isUploaded">
                        &lt;!&ndash;进度条&ndash;&gt;
                        <el-progress  :text-inside="true" :stroke-width="26" :percentage="percentage"></el-progress>
          </div>-->
          <!--树-->
          <div class="div_tree">
            <el-tree
              class='default-tree'
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              @node-click="handleNodeClick"
              :default-expanded-keys="expandedNode"
              node-key="id"
              highlight-current
              :expand-on-click-node="false"
            >
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <div>
                  <img src="../../assets/dialogManage/u123.png" class="img-file" />
                  <span v-show="!data.isShowInput">{{ node.label }}</span>
                  <span v-show="data.isShowInput">
                    <el-input
                      type="text"
                      size="mini"
                      width="20%"
                      v-model="appendInput"
                      @click.stop.native
                    >
                      <!--input框获取焦点时阻止冒泡-->
                    </el-input>
                    <el-button
                      type="text"
                      class="el-icon-circle-check btn-circleDdd"
                      @click.stop="() => append(node,data)"
                    ></el-button>
                    <el-button
                      type="text"
                      class="el-icon-remove-outline btn-circleDel"
                      @click.stop="() => remove(node, data)"
                    ></el-button>
                  </span>
                </div>
              </span>
            </el-tree>
          </div>
        </div>
      </div>
      <!--右边-->
      <div class="right_main">
        <!--路径-->
        <div class="div_root">
          <el-row>
            <el-col :span="1" align="center">
              <p>路径:</p>
            </el-col>
            <el-col :span="23">
              <el-input class="default-input" v-model="inputPath" size="medium" disabled></el-input>
            </el-col>
          </el-row>
        </div>
        <!--文件列表-->
        <div>
          <el-table
          class='default-table'
            :data="tableData"
            border
            style="width: 100%"
            height="99%"
            size="small"
            :cell-style="{padding:'0',color:'rgba(131, 239, 249, 0.6)','border-right':'1px solid #0e4f69','border-bottom':'1px solid #0e4f69'}"
            header-cell-class-name="header-table"
            header-row-class-name="header-table"
            :header-cell-style="{'border-right':'1px solid #0e4f69','border-bottom':'1px solid #0e4f69'}"
          >
            <el-table-column
              v-for="item in tableHead"
              :key="item.name"
              :prop="item.name"
              :label="item.label"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column fixed="right" label="操作" width="250" class-name="btn-table">
              <template slot-scope="scope" type="flex" justify="space-around">
                <el-button
                  type="text"
                  size="small"
                  @click="downloadFile(scope.row)"
                  class="icon-svg btn-download"
                >下载</el-button>&nbsp;&nbsp;
                <el-button
                  type="text"
                  size="small"
                  @click="openDialog(scope.row)"
                  class="icon-svg btn-update"
                >重命名</el-button>&nbsp;&nbsp;
                <el-button
                  type="text"
                  size="small"
                  @click="deleteFile(scope.row)"
                  class="icon-svg btn-delete"
                >删除</el-button>&nbsp;&nbsp;
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <!--弹框-->
      <el-dialog title="重命名" :visible.sync="isOpenDialog" width="30%" class='default-dialog'>
        <el-form :model="form">
          <el-form-item label="名称" label-width="120px">
            <el-input class="default-input" id="inputDialog" v-model="form.updateDirName" autocomplete="off" size="small"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" align="center">
          <el-button @click="isOpenDialog = false" size="mini" class='default-btn'>取 消</el-button>
          <!--                <el-button type="primary" @click="handleDialog(treeData,flag=title)" size="mini">确 定</el-button>-->
          <el-button type="primary" @click="clickConfirm" size="mini" class='default-btn'>确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </section>
</template>

<script>
import dialogManaApi from "./dialogManaApi";
// import axios from 'axios';  单独使用this.$axios时引用
export default {
  name: "dialogManage",
  data() {
    return {
      isUploaded: true, //是否上传完成，不管成功还是失败
      percentage: 0, //进度条
      isUploadDisabled: true, //是否打开本地上传文件弹窗
      expandedNode: [], //默认展开的树节点
      uploadDir: `${window.commonData.dialogAPI}/fileServer/fileManager/multiUpload`,
      paramUpload: {}, //上传时的附带参数
      fileList: [], //上传文件
      files: [], //文件夹中的文件数组
      length: 0, //记录上传文件夹时文件的个数
      curBtn: "add", //当前点击了什么按钮
      appendInput: "",
      title: "新增目录",
      label: "目录名称",
      curChooseNode: {}, //当前被选中的节点
      isChooseNode: false,
      form: {
        updateDirName: "" //新文件名称
      },
      isOpenDialog: false,
      randomData: Math.random()
        .toString(36)
        .substr(3, 12), //生成一个随机id
      inputRoot: "",
      inputPath: "",
      tableHead: [
        { name: "fileName", label: "文件名" },
        { name: "size", label: "大小" },
        { name: "time", label: "创建时间" }
      ],
      nodeTree: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      // tableData:[],
      tableData: [
        {
          fileName: "2016-05-02",
          size: "王小虎",
          time: "上海市普陀区金沙江路 1518 弄"
        },
        {
          fileName: "2016-05-04",
          size: "王小虎",
          time: "上海市普陀区金沙江路 1517 弄"
        },
        {
          fileName: "2016-05-01",
          size: "王小虎",
          time: "上海市普陀区金沙江路 1519 弄"
        },
        {
          fileName: "2016-05-03",
          size: "王小虎",
          time: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      array: [
        ["root_dir", "MNIST_Data"],
        ["root_dir", "Image_Data", "Image_dir_01"],
        ["root_dir", "Image_Data", "Image_dir_02"]
      ],
      arrays: [
        ["root_dir", "MNIST_Data"],
        ["root_dir", "Image_Data", "Image_dir_01"],
        ["root_dir", "Image_Data", "Image_dir_02"]
      ],
      tempArray: [],
      treeData: [
        {
          id: "一级 1",
          label: "一级 1",
          children: [
            {
              id: "二级 1-1",
              label: "二级 1-1",
              children: [
                {
                  label: "三级 1-1-1",
                  isShowInput: false
                }
              ],
              isShowInput: false
            }
          ],
          isShowInput: false,
          path: "D:/AAA"
        },
        {
          id: "一级 2",
          label: "一级 2",
          children: [
            {
              id: "二级 2-1",
              label: "二级 2-1",
              children: [
                {
                  label: "三级 2-1-1",
                  isShowInput: false
                }
              ],
              isShowInput: false
            },
            {
              id: "二级 2-2",
              label: "二级 2-2",
              children: [
                {
                  label: "三级 2-2-1",
                  isShowInput: false
                }
              ],
              isShowInput: false
            }
          ],
          path: "D:/BBB"
        },
        {
          id: "一级 3",
          label: "一级 3",
          children: [
            {
              id: "二级 3-1",
              label: "二级 3-1",
              children: [
                {
                  label: "三级 3-1-1",
                  isShowInput: false
                }
              ],
              isShowInput: false
            },
            {
              id: "二级 3-2",
              label: "二级 3-2",
              children: [
                {
                  label: "三级 3-2-1",
                  isShowInput: false
                }
              ],
              isShowInput: false
            }
          ]
        }
      ],
      // treeData:[],
      nowFilePath: "", //表格中文件重命名之前的路径
      previewChooseNode: {}, //缓存上一个点击的节点
      nodeIdArray: [],
      num: 0
    };
  },
  methods: {
    /*点击上传下拉菜单*/
    handleCommand(command) {
      let that = this;
      if (!that.curChooseNode.node) {
        that.$message.warning("请先选择一条目录");
      } else {
        //判断是上传单个文件还是文件夹
        //这里的<el-upload>中的multiple和<input>中的multiple是不一样的
        //<el-upload>中的multiple：表示事件，可以执行循环上传文件的事件
        //<input>中的multiple：表示一个属性，可以点击多个文件
        that.clickFileBtn(command);
      }
    },
    clickFileBtn(command) {
      let that = this;
      if (command == "files") {
        //文件夹
        let inputFiles = document
          .querySelector("#uploadFiles")
          .querySelector("input[type=file]");
        inputFiles.webkitdirectory = true;
      } else {
        //文件
        that.paramUpload.filePath = that.curChooseNode.data.path + "/";
      }
    },
    onProgress(event, file, fileList) {
      // debugger
      this.isUploaded = false;
      this.percentage = Number(Number(event.percent).toFixed(2));
    },
    /**上传文件夹时*/
    onChange() {
      //判断上传文件数量
      let that = this;
      //先把上一次上传的清空
      // that.files=[];
      let uploadFiles = document.querySelector("#uploadFiles");
      let input = uploadFiles.querySelector("input[type=file]");
      that.length = input.files.length;
      if (that.length > 0) {
        Array.from(input.files).forEach(file => {
          if (that.files.indexOf(file) == -1) {
            that.files.push(file);
          }
        });
      }
      // return false;
    },
    /** 自定义方法覆盖默认上传行为*/
    httpRequests(content) {
      let that = this;
      //打开进度条
      that.isUploaded = false;
      let formData = new FormData();
      if (that.files.length > 0) {
        that.files.forEach(file => {
          formData.append("file", file);
        });
        formData.append("filePath", that.curChooseNode.data.path + "/");
        if (formData.getAll("file").length == that.length && that.length > 0) {
          //	走接口
          /*let _url = "/fileManager/uploadFolder";//上传文件接口地址
                        axios({
                            url: _url,
                            method: 'post',
                            data:formData,
                            processData: false,// 告诉axios不要去处理发送的数据(重要参数)
                            headers:{
                                'Conten-type':'multipart/form-data;charset=UTF-8'
                            }
                        })*/
          //接口参数一般传对象，这里比较特殊
          let config = {
            // onUploadProgress是AXIOS的其中一个选项
            onUploadProgress: progressEvent => {
              // progressEvent.loaded:已上传文件大小
              // progressEvent.total:被上传文件的总大小
              that.percentage = Number(
                Number(
                  (progressEvent.loaded / progressEvent.total) * 100
                ).toFixed(2)
              );
            }
          };
          let params = { formData, config };
          dialogManaApi.uploadFolder(params).then(
            res => {
              // debugger
              that.files = [];
              //此处重置文件中间存储变量是为了相同文件能够重复传递
              if (res.data.code == 200) {
                // debugger
                //更新树节点
                let level = that.curChooseNode.node.level;
                let param = { filePath: that.curChooseNode.data.path };
                let nodeData = that.curChooseNode.data;
                that.getNextNode(param, nodeData, level);
                that.$message.success(res.data.msg);
                //更新文件列表
                dialogManaApi
                  .getAllFiles({ filePath: that.curChooseNode.data.path + "/" })
                  .then(res => {
                    that.tableData = res.data.data;
                  });
              } else {
                that.$message.error(`上传失败`);
              }
              //关闭进度条
              that.isUploaded = true;
            },
            err => {
              that.files = [];
              that.$message.error(`上传失败`);
              //关闭进度条
              that.isUploaded = true;
            }
          );
        }
      }
    },

    /**原生js上传文件夹*/
    uploadFile() {
      let that = this;
      let uploadAudio = document.getElementById("uploadAudio");
      let fileObj = uploadAudio.files;
      if (fileObj == undefined || fileObj == "") {
        alert("请选择文件");
        return false;
      }
      let url = `${window.commonData.dialogAPI}/fileServer/fileManager/uploadFolder`; //接收上传文件的后台地址
      let form = new FormData(); // FormData 对象
      form.append("filePath", that.curChooseNode.data.path);
      for (let i = 0; i < fileObj.length; i++) {
        form.append("file", fileObj[i]); // 文件对象
      }
      let xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
      xhr.open("post", url, true);
      xhr.send(form); //开始上传，发送form数据
      //上传成功之后更新表格
      dialogManaApi
        .getAllFiles({ filePath: that.curChooseNode.data.path })
        .then(res => {
          that.tableData = res.data.data;
        });
    },
    /**文件上传*/
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    fileChange(file, fileList) {
      console.log("文件改变", file, fileList);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(res, file) {
      let that = this;
      // debugger
      this.isUploaded = true; //上传执行完毕
      //上传成功之后更新表格
      dialogManaApi
        .getAllFiles({ filePath: that.curChooseNode.data.path })
        .then(res => {
          that.tableData = res.data.data;
        });
      //更新树节点
      let level = that.curChooseNode.node.level;
      let param = { filePath: that.curChooseNode.data.path };
      let data = that.curChooseNode.data;
      that.getNextNode(param, data, level);
      if (res.code == 200) {
        this.$message.success("上传成功");
      } else {
        this.$message.error("上传失败");
      }
      //默认展开
      that.expandedNode[0] = that.curChooseNode.data.id;
    },
    onError(err, file, fileList) {
      this.isUploaded = true; //上传执行完毕
      this.$message.error("上传失败");
    },
    /**删除目录*/
    deleteNode() {
      let that = this;
      if (that.curChooseNode.data.id == "root0") {
        that.$message.warning("根目录不能删除和修改");
      } else {
        if (!that.curChooseNode.node) {
          that.$message.warning("请先选择一条目录");
        } else {
          let node = that.curChooseNode.node;
          let data = that.curChooseNode.data;
          that
            .$confirm("确定刪除吗", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              //调用后台删除接口
              let filePath = data.path;
              dialogManaApi.deleteDirs({ filePath }).then(res => {
                if (res.data.code == 200) {
                  this.$message.success("删除成功!");
                  //删除树中的节点
                  const parent = node.parent;
                  const children = parent.data.children || parent.data;
                  const index = children.findIndex(d => d.id === data.id);
                  children.splice(index, 1);
                  //更新树节点
                  //解决删除树的数据之后树不能实时更新的问题
                  that.treeData = JSON.parse(JSON.stringify(that.treeData));
                  that.expandedNode[0] = node.parent.data.id;
                  that.inputPath = "";
                } else {
                  this.$message.error("删除失败!");
                }
              });
            });
        }
      }
    },
    /**点击input框后的新增*/
    append(node, data) {
      let that = this;
      // debugger
      if (that.curBtn == "add") {
        data.label = that.appendInput;
        data.path = node.parent.data.path + "/" + that.appendInput; //新路径
        //调用新增接口
        dialogManaApi.makeDirs({ filePath: data.path }).then(res => {
          if (res.data.code !== 200) {
            that.$message.error("创建失败,不能创建相同的目录");
          } else {
            that.$message.success("创建成功");
          }
          //更新树节点
          let level = that.curChooseNode.node.level;
          let param = { filePath: node.parent.data.path };
          let data = that.curChooseNode.data;
          that.getNextNode(param, data, level);
        });
        data.isShowInput = false;
      } else {
        if (that.nodeIdArray.includes(that.appendInput)) {
          that.$message.warning("已存在相同目录，无法修改");
        } else {
          let path =
            data.path.slice(data.path.length - 1) == "/"
              ? data.path.slice(0, data.path.length - 1)
              : data.path; //原路径
          //修改接口
          dialogManaApi
            .FixFileName({ filePath: path, newName: that.appendInput })
            .then(res => {
              if (res.data.code !== 200) {
                that.$message.error("修改失败");
              } else {
                that.$message.success("修改成功");
                data.label = that.appendInput;
                that.curChooseNode.data.id = that.appendInput;
                that.curChooseNode.data.path =
                  that.curChooseNode.node.parent.data.path +
                  "/" +
                  that.appendInput;
                data.isShowInput = false;
              }
            });
        }
      }
    },
    /**点击input框后边的删除*/
    remove(node, data) {
      let that = this;
      //关闭input框
      if (that.curBtn == "add") {
        //删除当前节点
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      } else {
        data.isShowInput = false;
        that.treeData = JSON.stringify(JSON.parse(that.treeData));
      }
    },
    /**点击表格重命名*/
    openDialog(row) {
      let that = this;
      //如果有被选中的节点，就打开弹框
      that.nowFilePath = that.curChooseNode.data
        ? that.curChooseNode.data.path + "/" + row.fileName
        : that.inputRoot + "/" + row.fileName;
      that.form.updateDirName = row.fileName.slice(
        0,
        row.fileName.lastIndexOf(".")
      );
      that.isOpenDialog = true;
    },
    /**表格重命名点击确定*/
    clickConfirm() {
      let that = this;
      let filePath = that.nowFilePath;
      let newName = that.form.updateDirName;
      dialogManaApi.FixFileName({ filePath, newName }).then(res => {
        // debugger
        //更新表格
        dialogManaApi
          .getAllFiles({ filePath: that.curChooseNode.data.path })
          .then(res => {
            that.tableData = res.data.data;
          });
        that.isOpenDialog = false;
        that.$message({
          message: "修改成功",
          type: "success"
        });
      });
    },
    /**表格中文件下载接口，
     * 注意这里的下载是post请求，不是get请求
     * 下载接口为：url
     * 接口参数为：filepath
     */
    downloadFile(row) {
      let that = this;
      /* 方法1 */
    //   创建form， 添加所需传的参数
        // let filePath = that.curChooseNode.data.path + "/" + row.fileName;
        // let url = `${window.commonData.dialogAPI}/fileServer/fileManager/download`;
        // let formHtml =
        //   `<form id='downLoadForm' style='display:none' method='post' action='${url}'>` +
        //   `<input type='hidden' name='filePath' value='${filePath}'>` +
        //   `</form>`;
        // let divDom = document.createElement("div");
        // divDom.innerHTML = formHtml;
        // document.body.appendChild(divDom);
        // // 下载文件
        // document.getElementById("downLoadForm").submit();
        // // 下载完了，需要删除该form，否则会生成多个form，一个小优化
        // document.body.removeChild(divDom);

      /* 方法2 */
      dialogManaApi.download({filePath:row.fileName}
      //改变请求头的方法
    //   ,
    //     {
    //         transformRequest: function(data, header){
    //             header['Content-Type'] = "application/json";
    //             return JSON.stringify(data);
    //         }
    //     }
    )

      /* 方法3 */
      // dialogManaApi.aaa( {filePath:row.fileName}, {
      //   responseType: "blob"
      // })
      // .then(res => {
      //   let blob = res.data;
      //   let reader = new FileReader();
      //   reader.readAsDataURL(blob);
      //   reader.onload = e => {
      //     let a = document.createElement("a");
      //     a.download = fileName;
      //     a.href = e.target.result;
      //     document.body.appendChild(a);
      //     a.click();
      //     document.body.removeChild(a);
      //   };
      // });
    },
    /**删除表格中某个文件，注意这里使用的post请求*/
    deleteFile(row) {
      let that = this;
      that
        .$confirm("确定刪除吗", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          //调用后台删除接口
          let filePath = that.curChooseNode.data.path + "/" + row.fileName;
          dialogManaApi.deleteDirs({ filePath }).then(res => {
            this.$message.success({ message: "删除成功!" });
            //更新表格
            dialogManaApi
              .getAllFiles({ filePath: that.curChooseNode.data.path })
              .then(res => {
                that.tableData = res.data.data;
              });
          });
        });
    },
    /**编辑，新增目录*/
    openInput(flag) {
      let that = this;
      //add为新增，update为编辑
      that.title = flag == "update" ? "编辑目录" : "新增目录";
      that.curBtn = flag;
      //先关闭上一个input框
      that.hiddenInput(that.treeData);
      //再重新给它赋值
      if (that.isChooseNode) {
        //是否点击了新增目录按钮或者是编辑按钮
        if (flag == "add") {
          const newChild = {
            id: that.randomData,
            label: "",
            path: "",
            isShowInput: true
          };
          if (!that.curChooseNode.data.children) {
            this.$set(that.curChooseNode.data, "children", []);
          }
          that.curChooseNode.data.children.push(newChild);
          //解决新增节点之后页面树不能展示的问题
          that.treeData = JSON.parse(JSON.stringify(that.treeData));
          that.expandedNode[0] = that.curChooseNode.data.id;
          that.appendInput = "";
        } else {
          //根节点不能删除和修改
          if (that.curChooseNode.data.id == "root0") {
            that.$message.warning("根目录不能删除和修改");
          } else {
            //点击编辑
            that.curChooseNode.data.isShowInput = true;
            that.appendInput = that.curChooseNode.data.label
              ? that.curChooseNode.data.label
              : "";
          }
        }
      } else {
        that.$message.warning("请先选择一条目录");
      }
    },
    /**点击节点*/
    handleNodeClick(data, node, data2) {
      let that = this;
      // debugger
      that.curChooseNode = { data, node };
      that.isUploadDisabled = false; //改变上传属性
      // that.clickIndex=data.id;
      //给路径框赋值
      that.inputPath =
        data.path.slice(data.path.length - 1) == "/"
          ? data.path.slice(0, -1)
          : data.path;
      //允许新建目录
      that.isChooseNode = true;
      // debugger
      console.log(data.label, "点击中1", that.treeData);
      data.path = !data.path
        ? node.parent.data.path + ":/" + data.label
        : data.path;
      // data.path=path;
      //获取下一级目录
      //层级
      // debugger
      console.log(data.label, "点击中2", that.treeData);
      let level = node.level;
      let param = { filePath: data.path };
      //获取下一层节点
      that.getNextNode(param, data, level);
      //初始化表格
      dialogManaApi.getAllFiles(param).then(res => {
        that.tableData = res.data.data;
      });
    },
    /**获取下一级目录
     * param:父元素路径
     * data：当前元素内容*
     * level：当前元素层级*/
    getNextNode(param, data, level) {
      let that = this;
      // that.$set(that.curChooseNode.data, 'children', []);
      // that.$refs.tree.updateKeyChildren(that.curChooseNode.data.id, []);
      dialogManaApi.getAllDirs(param).then(res => {
        let array = res.data.data;
        //统计根节点中的“\”个数
        let rootNum = that.total(that.inputRoot);
        let children = array.map(item => {
          //首先检测字符串中的“\”个数
          let total = that.total(item);
          // let level=3; level从1开始
          let num = rootNum + level;
          let end, str;
          if (num == total) {
            return item;
          } else if (num > total) {
            return "";
          } else {
            end = that.findIndex(item, "/", num);
            str = item.slice(0, end);
            return str;
          }
        });
        //去除掉空数值
        children = children.filter(item => item != "");
        //数组去重
        let temp = Array.from(new Set(children));
        let child = temp.map(item => {
          let start = item.lastIndexOf("/");
          let str = item.slice(start + 1);
          let path = item;
          return { id: str, label: str, path, isShowInput: false };
        });
        //添加子节点
        console.log(data.label, "点击前", that.treeData, "儿子", child);
        //updateKeyChildren方法有问题，谨慎使用,它只有在父元素的儿子节点为空的时候才能给节点添加元素
        /* that.$set(that.curChooseNode.data, 'children', []);
                    that.$refs.tree.updateKeyChildren(that.curChooseNode.data.id, child);*/
        /*if(that.curChooseNode.data){
                       that.$set(that.curChooseNode.data, 'children',[]);
                       that.$set(data, 'children',[]);
                   }*/
        that.$set(that.curChooseNode.data, "children", child);
        that.$set(data, "children", child);
        console.log(data.label, "点击后", that.treeData, "儿子", child);
      });
    },
    /** 找到当前节点，改变它的子元素*/
    /**获取str字符串中的指定cha字符第num次出现的位置*/
    findIndex(str, cha, num) {
      let x = str.indexOf(cha);
      for (let i = 0; i < num; i++) {
        x = str.indexOf(cha, x + 1);
        // if(i<=num&&x==-1) return x;
      }
      return x;
    },
    /**统计某个字符再字符串中出现的位置*/
    total(str) {
      let total = 0;
      let itemIndex = str.indexOf("/");
      while (itemIndex !== -1) {
        total++; // 每出现一次 次数加一
        itemIndex = str.indexOf("/", itemIndex + 1); // 从字符串出现的位置的下一位置开始继续查找
      }
      return total;
    },
    /**遍历树取消input框*/
    hiddenInput(array) {
      let that = this;
      let arrayTree = array || that.treeData || [];
      for (let i in arrayTree) {
        if (arrayTree[i].label == "") {
          arrayTree.splice(i, 1);
        } else {
          arrayTree[i].isShowInput = false;
          if (arrayTree[i].children) {
            that.hiddenInput(arrayTree[i].children);
          }
          //将节点名称存起来，测试重名时使用
          that.nodeIdArray.push(arrayTree[i].label);
        }
      }
    },
    /**初始化树*/
    getTreeData() {
      let that = this;
      dialogManaApi.getAllDirs().then(res => {
        let root = res.data.root;
        that.inputRoot = res.data.root;
        that.inputPath = res.data.root;
        //设置根节点id为0，不能删除和修改
        that.treeData = [
          { id: "root0", label: root, path: root, isShowInput: false }
        ];
        that.curChooseNode.data = that.treeData[0];
        //初始化进来默认高亮根节点
        /*that.$nextTick(() => {
                        that.$refs.tree.setCurrentKey(root);
                    });*/
        //初始化表格
        let param = { filePath: root };
        dialogManaApi.getAllFiles(param).then(res => {
          that.tableData = res.data.data;
        });
      });
    },
    /**将数组转为树*/
    transArrayAsTree(temp, array) {
      let that = this;
      array = array || that.tempArray;
      // array=array||that.arrays;
      for (let i in temp) {
        //判断是否有和树的父级元素相同的数组值
        let flag = false;
        for (let j = 0; j < array.length; j++) {
          let index = array[j].findIndex(item => item == temp[i].label);
          //如果能找到相同名称
          if (index != -1) {
            flag = true;
            if (array[j][index + 1]) {
              if (temp[i].children) {
                if (
                  temp[i].children.every(
                    item => item.label != array[j][index + 1]
                  )
                ) {
                  temp[i].children.push({
                    id: array[j][index + 1],
                    label: array[j][index + 1],
                    flag: true
                  });
                }
              } else {
                temp[i].children = [];
                temp[i].children.push({
                  id: array[j][index + 1],
                  label: array[j][index + 1],
                  flag: true
                });
              }
            }
            //添加路径
            if (!temp[i].path) {
              temp[i].path = array[j].slice(0, index + 1).join("/");
            }
          } else {
            continue;
          }
        }
        if (temp[i].children) {
          that.transArrayAsTree(temp[i].children);
        }
      }
      return temp;
    }
  },
  mounted() {
    this.getTreeData();
  }
};
</script>

<style lang='less'>
/*改变滚动条样式*/
div::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}
div::-webkit-scrollbar-thumb {
  background-color: #4facfa;
}
.el-popover {
  min-width: 20px;
  /*padding:0;*/
}
/*引入字体图标*/
@font-face {
  font-family: "iconfont";
  src: url("../../assets/dialogManage/fonts/iconfont.ttf") format("truetype");
}
.icon-svg {
  font-family: "iconfont";
  display: inline-block;
  font-size: 14px;
  text-align: center;
  text-decoration: none;
  font-weight: 500;
}
.icon-svg:hover {
  cursor: pointer;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-input--mini .el-input__inner {
  height: 25px;
}

/* 树的样式 */
/* 注意：default-tree和el-tree属于同一个层级 */
.default-tree{
  background-color: transparent;
  color: rgba(131, 239, 249, 0.6);
  width: 300px;
  /*选中时保持高亮状态*/
  .el-tree-node.is-current > .el-tree-node__content {
    background-color: #07374e !important;
    color: rgba(249, 173, 95, 0.8);
  }
  /*取消树的小三角图标旋转动画*/
  .el-tree-node__expand-icon.expanded {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  /*取消小三角图标*/
  .el-tree-node__expand-icon:before {
    content: "";
  }
  /*展开树时的小三角背景图片*/
  .el-tree-node__expand-icon.expanded {
    background-image: url("../../assets/dialogManage/u1245.png");
    background-size: 100% 100%; /*前2个样式必不可少*/
    opacity: 0.6; /*设置背景图片透明度*/
  }
  /*关闭树时的小三角背景图片*/
  .el-tree-node__expand-icon {
    background-image: url("../../assets/dialogManage/u1256.png");
    background-size: 100% 100%;
    opacity: 0.6;
  }
  .el-tree-node__expand-icon:hover {
    opacity: 1;
  }
  .el-tree .el-tree-node__expand-icon.is-leaf {
    background-image: none;
  }
  .el-tree-node__content > .el-tree-node__expand-icon {
    margin: 5px;
  }
  .el-tree-node__content:hover {
    background-color: rgb(32, 45, 59);
    color: rgba(255, 255, 255, 0.8);
  }
  .el-tree-node {
    width: 234px;
  }
  .el-tree-node {
    background-color: transparent;
  }
  .el-tree-node:focus > .el-tree-node__content {
    background-color: transparent;
    /*color:rgba(251, 171, 118, 0.8);*/
  }
  
}



.is-checked {
  color: #c78511;
  /*background-color: rgba(0, 211, 250, 0.149019607843137);*/
}

/*input框修改样式*/
.default-input{
  &.is-disabled,
  .el-input__inner,
  &.is-disabled .el-input__inner {
    background-color: #073b53b3;
    font-size: 14px;
    color: #acbec6;
    font-weight: 400;
    /*border:#0e5168;*/
  }
  &.is-disabled .el-input__inner {
    border-color: #425f71 !important;
  }
  .el-input__inner:hover {
    border-color: #425f71;
  }
  &.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #425f71;
    outline: 0;
  }
  .el-input__inner {
    border: 1px solid #425f71;
  }
  .el-input--medium .el-input__inner {
    height: 30px;
    line-height: 30px;
    /*margin-top: 3px;*/
  }
}

/*改变表格表头颜色*/
.header-table {
  background: transparent;
  color: rgba(131, 239, 249, 0.6);
  font-weight: 700;
  font-size: 14px;
}
.default-table{
  width: 100%;
  height: 93%;
  margin: 0 auto;
  border: transparent;
  border-top:1px solid rgba(6, 62, 80, 1);
  background-color: transparent;
  
  th,
  tr {
    background-color: transparent;
    border:transparent;
  }

  /deep/.el-table__expanded-cell {
    background-color: transparent;
    border: 0;
  }
  /*table 鼠标悬停时 背景颜色的修改*/
  /deep/.el-table__body tr:hover > td {
    background-color: rgb(12, 59, 81) !important;
  }
  /deep/.el-table__body tr.hover-row > td {
    background-color: rgb(12, 59, 81) !important;
  }

  /*改变表格中最下边和最右边边框线的颜色*/

  &::before,.el-table__fixed-right::before{
    background-color: #060b18;
  }
  // 交集选择器，改变与.default-table同级的el-table--border::after的样式  （重点）
  &.el-table--border::after, &.el-table--group::after, &.el-table::before{
    background-color: transparent;
  }
  
}


/*改变下拉菜单样式,未成功*/

.default-dropdown{
  #btnFile,
  #btnFolder {
    color: rgb(79, 154, 168);
  }
  #btnFile {
    border-bottom: 1px solid rgb(79, 154, 168);
  }
  &.el-dropdown-menu {
    background-color: rgb(6, 36, 54);
    border: 1px solid rgb(79, 154, 168);
    padding: 0;
  }
  .el-dropdown-menu__item:focus,
  .el-dropdown-menu__item:not(.is-disabled):hover {
    background-color: rgb(7, 67, 95);
    color: #66b1ff;
  }
  // 改变下拉列表上边的小三角样式
  &[x-placement^=top] .popper__arrow::after{
    border-top-color: rgb(6, 36, 54);
  }
  &[x-placement^=top] .popper__arrow{
    border-top-color: rgb(145, 229, 245);
  }
  &[x-placement^=bottom] .popper__arrow::after{
    border-bottom-color: rgb(6, 36, 54);
  }
  &[x-placement^=bottom] .popper__arrow{
    border-bottom-color: rgb(145, 229, 245);
  }
}


/*修改弹框样式*/
/* 注意：default-dialog在el-dialog的上一层级别 ，注意：上边的弹框里边如果没有写class='default-dialog'的话，样式重置不生效*/
.default-dialog{
  &.el-dialog__wrapper {
    background-color: rgba(47, 79, 79, 0.45);
  }
  .el-dialog{                 //爸爸控制儿子的权重要比爷爷修改儿子的权重高
    &,.el-pager li {
      background: rgb(10, 34, 49);
      -webkit-box-sizing: border-box;
    }
    .el-form-item__label {
      color: rgba(131, 239, 249, 0.6);
    }
    .el-dialog__header {
      padding: 5px 10px;
      background: rgb(10, 34, 49) !important;
      border-bottom: 1px solid rgb(7, 55, 73);
      text-align: left;
    }
    .el-dialog__title {
      font-weight: 400;
      font-style: normal;
      font-size: 16px;
      color: rgba(131, 239, 249, 0.6) !important;
    }
    .el-dialog__body {
      padding: 20px 15px 0 15px;
    }
    .el-dialog__wrapper .el-dialog .el-dialog__footer {
      border-top: 0;
    }
    .el-dialog__body {
      margin-left: -50px;
    }
    .el-dialog__headerbtn{
      top: 10px;
    }
    
  }
} 

  /*弹框中按钮样式*/
  .default-btn{
    &.el-button--default {
      background-color: #0b2230;
      border: 1px solid rgb(15, 83, 106);
    }
    &.el-button--default:hover {
      background-color: #0a3f58;
      border: 1px solid #067aa2;
      color: rgba(255, 255, 255, 0.698039215686274);
    }
    &.el-button--primary {
      background-color: #097ba7 !important;
      border: 1px solid #097ba7 !important;
    }
    &.el-button--primary:hover {
      background-color: #0a98d0 !important;
      border: 1px solid #0a98d0 !important;
    }
    &.el-button--default,
    &.el-button--primary {
      font-weight: 400;
      font-style: normal;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.698039215686274);
    }
    
  }

  
/*改变进度条样式*/
.el-progress-bar__innerText {
  color: rgba(5, 30, 49, 0.98);
}
/*改变删除提示框样式*/
.el-message-box {
  background-color: rgb(11, 35, 49);
  border: 1px solid rgb(11, 35, 49);
}
.el-message-box__title {
  color: rgba(131, 239, 249, 0.6) !important;
}
.el-message-box__content {
  color: rgba(255, 255, 255, 0.698039215686274);
}
/*改变遮罩层颜色*/
// .el-message-box__wrapper,
// .el-dialog__wrapper {
//   background-color: rgba(47, 79, 79, 0.45);
// }
.main p[data-v-d37c9a06] {
  line-height: 25px;
}
#inputDialog.el-input__inner {
  width: 85%;
}
#app {
  min-width: 1000px !important;
}
.el-tree {
  width: 234px;
}
</style>
<style scoped>

#dropdown-menu-9024 {
  padding: 0;
}
.div_tree .el-input {
  width: 50%;
}
/*.dir_body .el-form .el-form-item{*/
/*    display: flex;justify-content: center;align-items: center*/
/*}*/
.main {
  display: flex;
  height: 88%;
  color: rgba(131, 239, 249, 0.6);
  font-weight: 400;
  font-size: 14px;
}
.main p {
  font-size: 14px;
}
.left_main {
  flex: 2;
}
.div_root,
.div_btn,
.div_tree {
  width: 93%;
}
.right_main {
  flex: 8;
}
.left_main,
.right_main {
  border: 1px solid rgba(6, 62, 80, 1);
  background-color: #07182a96;
}
.left_main {
  margin-right: 5px;
}
.div_root {
  margin: 5px auto;
  /*width: 90%;*/
}
.right_main .div_root {
  width: 98%;
}
.div_btn {
  margin: 10px auto;
  height: 20px;
}
.div_tree {
  height: 90%;
  overflow-y: auto;
  overflow-x: auto;
}
.div_table {
  width: 100%;
  height: 93%;
}
.div_tree,
.div_table {
  /*border:1px #e1e4ea solid;*/
  margin: 0 auto;
}
p {
  line-height: 2.5em;
}
.div_progress {
  display: inline-block;
  width: 90%;
}
/*.div_root .el-col .input_style .el-input__inner{
         background-color: rgba(131, 239, 249, 0.6);

    }*/
.bottom_main {
  border-top: 1px solid rgba(6, 62, 80, 1);
  height: 93%;
}
.btn-add,
.btn-circleDdd {
  color: #52c1a0;
}
.btn-download {
  color: rgba(249, 173, 95, 0.8);
}
.btn-update {
  color: rgba(9, 181, 249, 0.8);
}
.btn-delete,
.btn-circleDel {
  color: rgba(255, 121, 138, 0.8);
}
.btn-upload {
  color: rgb(9, 181, 249);
}
.div_btn .btn-update,
.div_btn .btn-delete,
.div_btn .btn-add,
.div_btn .btn-upload {
  font-size: 14px;
}
.default-table .btn-download,
.default-table .btn-update,
.default-table .btn-delete,
.btn-upload span {
  font-size: 14px;
}
.img-file {
  width: 16px;
  height: 16px;
}
.top_main {
  height: 50px;
  width: 100%;
  background-image: url("../../assets/dialogManage/u1.png");
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  padding-bottom: 1px;
}
.top_main span {
  font-weight: 400;
  font-style: normal;
  font-size: 20px;
  color: rgba(131, 239, 249, 0.6);
  margin-left: 20px;
}
section {
  background-image: url("../../assets/dialogManage/bg.jpg");
  height: 100%;
  width: 100%;
  background-size: 100% 100%;
}
</style>
