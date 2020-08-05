/**
 * @Author: zhangb
 * @Date: 2019-12-10 18:13:13
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 11:31:37
 * @Description: 
 */
import React from 'react';

import './style.scss';

function Home(): JSX.Element {

    return (
        <div className='hv-home'>
            <div className='home-content'>
                <h3>欢迎使用</h3>
                <p>请点击左侧的导航访问相应的模块，或点击左下角的主页按钮回到系统首页。</p> 
            </div>
        </div>
    );
    
}

export default Home;