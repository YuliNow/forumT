/*
 * @author: DoubleW
 * @create: 2021-06-18 14:36 PM
 * @license: MIT
 * @lastAuthor: DoubleW
 * @lastEditTime: 2021-07-06 17:55 PM
 * @desc:
 */
import axios from "axios";
import router from "@/router/index";

const addr = "http://api_devss.wanxikeji.cn";

// export function Axios(method, url = "/", params = {}) {
//   axios[`${method}`](addr + url, { params })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

/**
 * 请求地址
 * 指定请求超时的时间 之后中断
 * 自定义请求头
 */
const Axios = axios.create({
  baseURL: addr,
  timeout: 5000,
});

// 添加请求拦截器
Axios.interceptors.request.use(
  (config) => {
    // 发送请求前
    // console.group("请求拦截区");
    // console.log(config);
    return config;
  },
  (err) => {
    // 请求错误
    return Promise.reject(err);
  }
);

// 添加响应拦截器
Axios.interceptors.response.use(
  (res) => {
    // 响应数据时
    // console.group("响应拦截区");
    // token 失效时的操作
    if (res.data.code == 3002) {
      localStorage.setItem("user", "");
      // location.href("/");
      router.push("/");
    }

    return res;
  },
  (err) => {
    // 响应错误时
    return Promise.reject(err);
  }
);

export default Axios;

/**
 * 使用
 * 导入此文件
 * let res = Axios({method:"",data:"",url:"/"})
 */
