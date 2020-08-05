/*
 * @Author: zhangb
 * @Date: 2019-12-04 18:24:42
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-05 17:17:21
 * @Description:
 */
import { isForceZoom } from 'app/config/api';

// zoom
const zoom = (): void => {

    if (typeof isForceZoom === 'object') {

        const {pageWidth, pageHeight} =  isForceZoom;
        const sx = window.innerWidth / pageWidth;
        const sy = window.innerHeight / pageHeight;
        document.body.style.transform = `scale(${sx}, ${sy})`;
        document.body.style.transformOrigin = 'left top';
        document.body.style.width = `${pageWidth}px`;
        document.body.style.height = `${pageHeight}px`;
        document.body.style.overflow = 'hidden';
    
    }

};

// 初始化是否缩放
if (typeof isForceZoom === 'object') {

    zoom();
    console.log(1);
    window.addEventListener('resize', zoom);

}