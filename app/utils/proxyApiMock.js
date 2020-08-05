/**
 * @Author: zhangb
 * @Date: 2019-12-03 16:24:41
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-05 17:25:34
 * @Description: 
 */
import {isForceMock, isForceApi} from 'app/config/api';

// 构建Promise异步数据
export const promise = (mockData) => new Promise((resolve, reject) => {

    setTimeout(() => resolve(mockData), 0);

})
    .then(res => res);

// 保证mock数据与api数据返回数据结构一致,以便于2种模式无缝切换
export const transformMockData = (mockData) => {

    // 同Fetch组件返回数据结构一致
    const obj = {
        config: null,
        headers: null,
        request: null,
        status: 200,
        statusText: 'OK',
        data: mockData,
    };
    return promise(obj);

};

// 在真实api与mock之间代理
const handler = {
    get(obj, prop) {

        // console.log("A value has been accessed");
        // debugger;
        if (obj[prop].isMock) {

            return obj[prop].mockDataFn;
        
        }
        return obj[prop].apiDataFn; // 返回访问的key在obj的值
    
    },
};


// 手动插入apiDataFn && mockDataFn
const insertApiMock = (Api, api, mock) => {

    const obj = {};
    // debugger
    for (const key in Api) {

        if (Api.hasOwnProperty(key)) {

            obj[key] = Object.assign({}, 
                {
                    apiDataFn: api[key],
                    mockDataFn: mock[key],
                // isMock: false
                },
                {...Api[key]}, 
                {
                    isMock: !isForceApi ? isForceMock || !!Api[key].isMock : !isForceApi
                });
        
        }
    
    }
    return obj;

};

const proxyApiMock = (Api) => (api, mock) => new Proxy(insertApiMock(Api, api, mock), handler);

export default proxyApiMock;