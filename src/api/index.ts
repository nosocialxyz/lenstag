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

export const whiteList = (address: string): Promise<any> => {
    return axiosInstance.get('/account/whitelist?address=' + address).then(res => {
        return res.data;
    });
};

/**
 * 
 * @param address 
 * @returns 
 * {
    "profiles": [
            {
                "id": "0x018a8d",
                "name": "The XXX",
                "handle": "xxx.lens"
            },
            ...
        ]
    }
 */

export const getProfiles = (address: string): Promise<any> => {
    return axiosInstance.get('/account/profiles?address=' + address).then(res => {
        return res.data;
    });
};

/**
 * @param profileId profileId
 * @returns 
 * {
    "info": {
        "id": "0x018a8d",
        "picture": "https://xxx",
        "coverPicture": "https://xxx",
        "ownedBy": "0x42d40F181B3Ff16141726D924517A8cd0E78E27b",
        "name": "The xxx",
        "handle": "xxx.lens",
        "bio": "The xxx is ....",
        "followers": 127,
        "following": 15,
        "attributes": {
            "location": "Brussels",
            "website": "https://nft.smurf.com/",
            "twitter": "SmurfsSociety",
            "join": "2022-11-01"
        }
    },

    "aiTags": {
        "id": "0x4", // AI class id
        "name": "AI Content",
        "category": "AI",
        "provider": "NoSocial",
        "description": "Keywords from social content analysis",
        "picture": "https://xxx",
        "tokenId": "0x10",
        "url": ".../...",
    },

    "achievements": [
        {
            "id": "0x1", // achievement class id
            "category": "popularity", // Classification
            "provider": "NoSocial",
            "name": "100 Followers",
            "description": "..., ..., ...",
            "picture": "https://xxx",
            "tokenId": "0x10",
            "url": ".../...",
            "status": "ready" // There are three states: inProgress, ready, achieved; Here, only two types are returned: ready, achieved
        },
    ],
    "activites": {
        "posts": {"total": 10, "lastweek": 3},
        "comments": {"total": 10, "lastweek": 3},
        "mirrors": {"total": 10, "lastweek": 3},
        "collects": {"total": 10, "lastweek": 3}
    },
    "benefits": [
            {
                "id": "0x123",
                "rewardType": "token",
                "category": "publiction",
                "provider": "Lenster",
                "name": "1.3 ETH",
                "benefitName": "Active user",
                "description": "..., ..., ...",
                "picture": "https://xxx",
                "providerPicture": "https://xxx",
                "url": ".../...",
                "status": "achieved", // There are three states: notStart, inProgress, achieved; there are only two types here: ready, achieved
            },
        ]
    }
 */

// TODO: /account/profileInfo => /profile/base
export const profileInfo = (profileId: string): Promise<any> => {
    return axiosInstance.get('/profile/base?id=' + profileId).then(res => {
        return res.data;
    });
};

/**
 * @param profileId 
 * @returns 
 {
    "actived": [ // App has two states notStart and actived
        {
            "id": "0x123",
            "name": "Lenster",
            "description": "..., ..., ...", // lenster description
            "picture": "https://xxx",
            "url": ".../...",

            // The following is unique information about the profile
            "activites": {      
                "posts": 2,
                "comments": 0,
                "mirrors": 0,
                "collects": 255
            },

            "achievements": [
                {
                    "id": "0x123",
                    "category": "popularity", 
                    "provider": "Lenster", // Must be provided by the app
                    "name": "100 Followers",
                    "description": "..., ..., ...",
                    "tokenId": "0x10",
                    "picture": "https://xxx",
                    "url": ".../...",
                    "status": "ready", // inProgress, ready, achieved
                },
                ...
            ] 
        },
        ......
    ],
    "notStart": [...]
}
 */

export const appsBase = (profileId: string) => {
    return axiosInstance.get('/apps/base?id=' + profileId).then(res => {
        return res.data;
    });
}

/**
 * 
 * @param profileId 
 * @returns 

{ // achieved, inProgress, notStart
    "achieved": [...,...]
    "inProgress": [ 
        {
            "id": "0x123",
            "rewardType": "token",
            "category": "publiction",
            "provider": "Lenster",
            "name": "1.3 ETH",
            "benefitName": "Active User",
            "description": "..., ..., ...",
            "picture": "https://xxx",
            "providerPicture": "https://xxx",
            "url": ".../...",
            
            // unique information about the profile
            "status": "inProgress",
            "tasks": [
                {
                    "id": "0x123",
                    "name": "100 Followers",
                    "bio": "..., ...",
                    "description": "...",
                    "url": "...",
                    "isFinished": false
                },
                ...
            ]
        },
    ],
    "notStart": [...]
}

 */

export const benefitsBase = (profileId: string) => {
    return axiosInstance.get('/benefits/base?id=' + profileId).then(res => {
        return res.data;
    });
}

export const collect = (profileId: string, achvId: string) => {
    return axiosInstance.post('/achievement/collect?id=' + profileId + '&achvId=' + achvId).then(res => {
        return res.data;
    });
}