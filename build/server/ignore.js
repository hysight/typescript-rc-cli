/**
 * @Author: zhangb
 * @Date: 2019-10-17 13:23:46
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-23 13:02:24
 * @Description: 
 */
const Module = require('module');

const ignore=()=> {

    const extensions = ['.css', '.scss','.less','.png','.jpg','.gif']; //服务端渲染不加载的文件类型
    for (let i = 0, len = extensions.length; i < len; i++) {

        Module._extensions[extensions[i]] = function () {

            return false;
        
        };
    
    }

};
module.exports = ignore;