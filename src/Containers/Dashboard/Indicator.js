// import React, { useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { Gauge, G2 } from '@ant-design/plots';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";

// const DemoGauge = () => {
//   const { registerShape, Util } = G2; // 自定义 Shape 部分

//   registerShape('point', 'custom-gauge-indicator', {
//     draw(cfg, container) {
//       // 使用 customInfo 传递参数
//       const { indicator, defaultColor } = cfg.customInfo;
//       const { pointer } = indicator;
//       const group = container.addGroup(); // 获取极坐标系下画布中心点

//       const center = this.parsePoint({
//         x: 0,
//         y: 0,
//       }); // 绘制指针

//       if (pointer) {
//         const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
//         const radius = this.coordinate.getRadius();
//         const midAngle = (startAngle + endAngle) / 2;
//         const { x: x1, y: y1 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle + 1 / Math.PI);
//         const { x: x2, y: y2 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle - 1 / Math.PI);
//         const { x, y } = Util.polarToCartesian(center.x, center.y, radius * 0.65, midAngle);
//         const path = [['M', center.x, center.y], ['L', x1, y1], ['L', x, y], ['L', x2, y2], ['Z']]; // pointer

//         group.addShape('path', {
//           name: 'pointer',
//           attrs: {
//             path,
//             fill: defaultColor,
//             ...pointer.style,
//           },
//         });
//       }

//       return group;
//     },
//   });
//   const config = {
//     percent: 0.78,
//     range: {
//       color: '#30BF78',
//     },
//     indicator: {
//       shape: 'custom-gauge-indicator',
//       pointer: {
//         style: {
//           stroke: '#D0D0D0',
//           lineWidth: 1,
//           fill: '#D0D0D0',
//         },
//       },
//     },
//   };
//   return <Gauge {...config} />;
// };

// const mapStateToProps = ({ permissions, auth }) => ({
//     //   permissionsData: permissions.permissionsData,
//     //   userId: auth.userDetails.userId,
//     });
    
//     const mapDispatchToProps = (dispatch) =>
//       bindActionCreators(
//         {
//         //   getPermissions,
//         //   addingPermissions
//         },
//         dispatch
//       );
    
//     export default connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(DemoGauge);

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { connect } from "react-redux";
import {getDashboardIndicatorRecord} from "../Dashboard/DashboardAction";
 import { bindActionCreators } from "redux";
import { Gauge } from '@ant-design/plots';
import { BundleLoader } from '../../Components/Placeholder';

const DemoGauge = (props) => {
  useEffect(() => {
    props.getDashboardIndicatorRecord(props.orgId);
}, []);
if (props.fetchingDashBoardIndicator) {
  return <BundleLoader/>;
}
const data=props.dashboardIndicator.onBoardedPer
console.log("onboard",data)
  const config = {
    percent: data,
    type: 'meter',
    innerRadius: 0.75,
    range: {
      ticks: [0, 1 / 3, 2 / 3, 1],
      color: ['#F4664A', '#FAAD14', '#30BF78'],
    },
    indicator: {
      pointer: {
        style: {
          stroke: '#D0D0D0',
        },
      },
      pin: {
        style: {
          stroke: '#D0D0D0',
        },
      },
    },
    statistic: {
      content: {
        style: {
          fontSize: '16px',
          lineHeight: '36px',
        },
      },
    },
  };
  return <Gauge {...config} />;
};

const mapStateToProps = ({ permissions, auth,dashboard }) => ({
    //   permissionsData: permissions.permissionsData,
    orgId: auth.userDetails.organizationId,
    dashboardIndicator:dashboard.dashboardIndicator,
    fetchingDashBoardIndicator:dashboard.fetchingDashBoardIndicator
    });
    
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {
          getDashboardIndicatorRecord
        //   getPermissions,
        //   addingPermissions
        },
        dispatch
      );
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(DemoGauge);
