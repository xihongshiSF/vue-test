const REGEXP={
    0:/^\d+$/,      //只允许输入正整数
    1:/\d{1.}\.{0,1}\d{0,}/,  //只允许输入float类型数据
    2:/^\d+\.\d+$/            //只允许输入double类型数据
}

// export {REGEXP}