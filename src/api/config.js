import axios from 'axios';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import routes from '../routes'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//下边2个是配套的缺一不可，设置默认的请求头为“x-www-form-urlencoded”时，必须写下边的两句话
axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
/*axios.defaults.transformRequest = [function(data,config){
    let ret = '';
    for(let it in data){
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    /!*if(config["Content-Type"].toLowerCase()=='multipart/form-data;charset=UTF-8'){
        return data;
    }else{
        return ret;
    }*!/
    return ret;
}]*/
/** 请求头为'application/x-www-form-urlencoded‘的接口,需要将参数序列化，接口参数一般是个对象*/
function serializeData(data){
    let ret = '';
    for(let it in data){
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    }
    return ret;
}
/** ajax请求拦截 **/
axios.interceptors.request.use(config=>{
    // if(config.url.indexOf('sdmp-api')==-1){
    //     // axios.defaults.baseURL = '/api/';
    //     axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //     axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
    //     axios.defaults.transformRequest = [function(data){
    //         let ret = '';
    //         for(let it in data){
    //             ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&';
    //         }
    //         return ret;
    //     }]
    // }else {
    if(config.method  === 'post') {
        if (config.headers['Content-Type'] !== 'application/json') {
            //如果是上传接口，不处理数据
            if(config.url=="/fileManager/uploadFolder"||config.url==`${window.commonData.dialogAPI}/fileServer/fileManager/uploadFolder`){
                config.data = config.data;
            }else{
                //请求头为'application/x-www-form-urlencoded‘的接口需要将参数序列化
                //有2种方式，一种是使用qs序列化，一种是用下边的方法
                // config.data = qs.stringify(config.data);
                config.data=serializeData(config.data);
            }
        } else {
            config.data = config.data;
        }
    }
        /*if(sessionStorage.getItem('token')){
            config.headers.token =sessionStorage.getItem('token');
        }*/
    // 在发送请求之前做了坑爹的数据处理，把我们的数据类型变成了Object，发送formdata类的数据时会出现问题
    return config;
},error =>{
    // 对请求错误做些什么
    return Promise.reject(error)
})

/** ajax响应拦截 **/
axios.interceptors.response.use(res=>{

    if(res.data.errorCode==-1){
         // this.$routes.
    }
    if(res.data.status||res.data.success){
        return Promise.resolve(res.data);
    }else{
        // ElementUI.Message.error(res.data.msg);
        // undefined.a;
        // throw res.data.msg;
    }
    return Promise.resolve(res);
},error =>{
    ElementUI.Message.error(error);
    return Promise.reject(error)
})

export default axios;
