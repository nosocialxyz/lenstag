import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import qs from 'qs';
import { showStatus } from './status';

export interface IResponse {
    code: number | string;
    data: any;
    msg: string;
}

let axiosInstance: AxiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL,
    baseURL: 'https://api.nosocial.xyz/api/v0',
    headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    },
    transformRequest: [
        function (data) {
            data = qs.stringify(data);
            return data;
        }
    ]
});

// The axios instance intercepts the response
axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        // if (response.headers.authorization) {
        //     localStorage.setItem('app_token', response.headers.authorization);
        // } else {
        //     if (response.data && response.data.token) {
        //         localStorage.setItem('app_token', response.data.token);
        //     }
        // }
        if (response.status === 200) {
            return response;
        } else {
            showStatus(response.status);
            return response;
        }
    },
    // Request failed
    (error: any) => {
        const { response } = error;
        if (response) {
            // The request has been sent, but it is not in the range of 2xx
            showStatus(response.status);
            return Promise.reject(response.data);
        } else {
            // message.error('The network connection is abnormal, please try again later!');
        }
    }
);

// Axios instance intercepts the request
axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        // const token = localStorage.getItem('app_token');
        // if (token) {
        //     config.headers = {
        //         'Authorization': `Bearer ${token}`
        //     }
        // }
        // config.headers = {
        //     'Authorization': `Bearer ${token}`
        // }
        return config;
    },
    (error: any) => {
        return Promise.reject(error);
    }
)

export const trigger = (handle: string) => {
    return axiosInstance.post('/lenstag/trigger?handle=' + handle).then(res => {
        return res.data;
    });
}

export const tags = (handle: string) => {
    return axiosInstance.get('/lenstag/tags?handle=' + handle).then(res => {
        return res.data;
    });
}