import React from 'react';
import { Card } from 'antd';

import MenuPanel from 'app/containers/MenuManage/MenuPanel';
import MenuTable from 'app/containers/MenuManage/MenuTable';

function MenuManage() {
    return (
        <Card 
            title={<MenuPanel />} 
            // extra={<a href="#">More</a>} 
            // style={{ width: 300 }}
        >
            <MenuTable />
        </Card>
    )
}

export default MenuManage;