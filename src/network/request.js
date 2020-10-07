import axios from 'axios';

export function request(config) {
  //1、创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });

  //2、axios拦截器----->请求拦截
  instance.interceptors.request.use(config => {
    return config;
  }, error => {
    console.log(error);
  });

  //2、axios拦截器----->响应拦截
  instance.interceptors.response.use(config => {
    return config;
  }, error => {
    console.log(error);
  });

  return instance(config);
}
