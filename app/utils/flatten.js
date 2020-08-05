/**
 * @Author: zhangb
 * @Date: 2019-12-04 17:25:16
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-05 16:54:27
 * @Description: 
 */
const flatten = (arr) => arr.reduce(
    (acc, val) => acc.concat(Array.isArray(val) ? flatten(val) : val), []
);

export default flatten;