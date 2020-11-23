import axios, { AxiosRequestConfig, AxiosResponse, CancelTokenSource } from 'axios';
import qs from 'qs';
// import { showLoading, removeLoading } from '../components/loading/loading';
import { message } from 'antd';
import { auth } from './auth';
import { BASE_URL } from './auth';

export const AXIOS = axios.create({
    // baseURL: window.location.origin,
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

AXIOS.defaults.timeout = 10000

AXIOS.interceptors.request.use(
    config => {
        return config
    },
    err => {
        if (err.response.status === 504 || err.response.status === 404) {
            console.log("服务器被吃了⊙﹏⊙∥");
        } else if (err.response.status === 500) {
            console.log("服务器开小差了⊙﹏⊙∥");
        }
        console.log(err)
        return Promise.reject(err);
    }
)

AXIOS.interceptors.response.use(
    response => {
        if (response.data.code === 110000) {
            message.error('登录过期了');
            auth.setToken('')
            // setTimeout(() => {
            //     window.location.href = process.env.NODE_ENV === 'development' ? '/login' : '/web/admin/login'
            // }, 1000)
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
)

interface responseType {
    code: number, data: any, message: string
}
export const REQUEST = (option: {
    method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
    url: string,
    data?: any,
    showLoading?: boolean,
    config?: AxiosRequestConfig,
    cancel?: (cancelToken: CancelTokenSource) => void
}): Promise<responseType> => {
    if (option.showLoading) {
        // showLoading()
    }

    const cancelToken: CancelTokenSource = axios.CancelToken.source();
    if (option.cancel) {
        option.cancel(cancelToken)
    }
    if (['get', 'delete', 'head', 'options'].includes(option.method)) {
        if (option.data instanceof Object) {
            option.url += '?' + qs.stringify(option.data);
        }
        return new Promise<any>((resolve, reject) => {
            AXIOS (option.url, { ...option.config, cancelToken: cancelToken.token })
                .then((res: AxiosResponse<responseType>) => {
                    // 如果是blob导出表格，就直接返回
                    if(option.config?.responseType==='blob') {
                        resolve(res)
                        return;
                    }
                    let data = res.data;
                    if (data.code !== 0) {
                        message.error(data.message);
                        reject(res.data)
                        return
                    }
                    resolve(data);
                }, (err: any) => {
                    reject(err)
                });
        })
    } else {
        // let data = option.data instanceof Object ? qs.stringify(option.data) : option.data;
        return new Promise<any>((resolve, reject) => {
            AXIOS(option.url, option.data, { ...option.config, cancelToken: cancelToken.token })
                .then((res: AxiosResponse<responseType>) => {
                    // removeLoading()
                    let data = res.data;
                    if (!(data instanceof Blob) && data.code !== 0) {
                        message.error(data.message);
                        reject(res.data)
                        return
                    }
                    resolve(data);
                }, (err: any) => {
                    reject(err);
                })
        })
    }
}