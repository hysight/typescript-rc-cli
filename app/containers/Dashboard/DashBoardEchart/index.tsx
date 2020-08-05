/**
 * @Author: zhangb
 * @Date: 2019-12-11 14:16:44
 * @Email: lovewinders@163.com
 * @Last Modified by: zhangb
 * @Last Modified time: 2019-12-11 17:04:50
 * @Description: 
 */
import React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
// import ReactDOM from 'react-dom';

import G2 from '@antv/g2';

import { FETCH_DASHBOARD_ECHART } from 'app/constant/Dashboard';

import './style.scss';

let chart: G2.Chart;
// let timer: NodeJS.Timer | null = null;
let timer = null;

interface Props {
    dispatch: Dispatch;
    echartData: Array<any>;
}

function DashboardEchart(props: Props): JSX.Element {

    const { dispatch, echartData } = props;

    const chartRef = React.useRef(null);
    const initChart = (): void => {

        chart = new G2.Chart({
            // container: ReactDOM.findDOMNode(chartRef.current) as HTMLDivElement,
            container: chartRef.current,
            // forceFit: true,
            width: 700,
            height: 400,
            // padding: [144, 40, 40, 150],
            background: {
                lineWidth: 0,
            },
        });

        chart.legend(false);

        chart.source(echartData);

        chart.interval().position('genre*sold').color('genre');

        chart.render();
    
    };

    const changeChart = (): void => {

        chart.source(echartData);
        chart.render();
    
    };

    React.useEffect(() => {

        initChart();
        timer = setInterval(() => {

            dispatch({
                type: FETCH_DASHBOARD_ECHART,
            });
        
        }, 3000);
        return () => {

            clearInterval(timer);
            
        };
    
    }, []);

    React.useEffect(() => {

        dispatch({
            type: FETCH_DASHBOARD_ECHART,
        });

    }, []);

    React.useEffect(() => {

        changeChart();
    
    }, [echartData]);

    return (
        <div className='hm-dashboard-echart' ref={chartRef} />
    );
    
}

interface StateProps {
    dashboard: {
        echartData: Array<any>;
    };
}

export default connect((state: StateProps) => {

    const {
        dashboard: {
            echartData
        }
    } = state;
    return {
        echartData
    };

})(DashboardEchart);