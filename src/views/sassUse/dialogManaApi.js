import axios from '../../api/config'

/*
export default {
    /!** 初始化树*!/
    getAllDirs:params=>{return axios.post(`${window.commonData.dialogAPI}/fileManager/getAllDirs`,params)},
    /!*初始化表格*!/
    // getAllFiles:(params,option={})=>{return axios.post(`/fileManager/getAllFiles`,params,option)},
    getAllFiles:(params)=>{return axios.post(`${window.commonData.dialogAPI}/fileManager/getAllFiles`,params)},
    /!*新增目录*!/
    makeDirs:params=>{return axios.post(`${window.commonData.dialogAPI}/fileManager/makeDirs`,params)},
    /!*修改目录*!/
    FixFileName:params=>{return axios.post(`${window.commonData.dialogAPI}/fileManager/FixFileName`,params)},
    /!*删除目录*!/
    deleteDirs:params=>{return axios.delete(`${window.commonData.dialogAPI}/fileManager/deleteDirs`,{params:params})},
    /!*下载*!/
    // download:params=>{return axios.post(`/fileManager/download`,params)}
    /!*上传文件夹*!/
    uploadFolder:params=>{return axios.post(`${window.commonData.dialogAPI}/fileManager/uploadFolder`,params.formData,params.config)}

}*/

export default {
    /** 初始化树*/
    getAllDirs:params=>{return axios.post(`${window.commonData.dialogAPI}/fileServer/fileManager/getAllDirs`,params)},
    /*初始化表格*/
    // getAllFiles:(params,option={})=>{return axios.post(`/fileManager/getAllFiles`,params,option)},
    getAllFiles:(params)=>{return axios.post(`${window.commonData.dialogAPI}/fileServer/fileManager/getAllFiles`,params)},
    /*新增目录*/
    makeDirs:params=>{return axios.post(`${window.commonData.dialogAPI}/fileServer/fileManager/makeDirs`,params)},
    /*修改目录*/
    FixFileName:params=>{return axios.post(`${window.commonData.dialogAPI}/fileServer/fileManager/FixFileName`,params)},
    /*删除目录*/
    deleteDirs:params=>{return axios.delete(`${window.commonData.dialogAPI}/fileServer/fileManager/deleteDirs`,{params:params})},
    /*下载*/
    // download:(params,header)=>{return axios.post(`${window.commonData.dialogAPI}/fileManager/download`,params)},
    download:(params)=>{return axios(
        {
            method: 'post',
            url:`${window.commonData.dialogAPI}/fileManager/download`,
            data: params,
            headers:{'Content-Type':'application/json'}
          })},

    /*上传文件夹*/
    uploadFolder:params=>{return axios.post(`${window.commonData.dialogAPI}/fileServer/fileManager/uploadFolder`,params.formData,params.config)},
    aaa:(param,transform)=>{return axios.post(`${window.commonData.dialogAPI}/fileManager/download`,param,transform)}

}
