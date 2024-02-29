import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { BookLoader } from "react-awesome-loaders";

import ReactDOM from 'react-dom';
import { Funnel } from '@ant-design/plots';
import {getAllDashboardFunnelRecord} from "../Dashboard/DashboardAction";
import { BundleLoader } from '../../Components/Placeholder';




const FunnelChartAll = (props) => {
  useEffect(() => {
      props.getAllDashboardFunnelRecord(props.userId,props.department);
  }, []);
  if (props.fetchingallDashBoardFunnel) {
    return       <BundleLoader
  />
    
;
  }
  const data = [
    {
      stage: 'onBoarded',
      number: 200,
    },
    {
      stage: 'openRequirement',
      number: 155,
    },
    {
      stage: 'selectted',
      number: 120,
    },
    {
      stage: 'submitted',
      number: 110,
    }    
  ];
  const color= ['#d62728', '#2ca02c', '#000000']
  
  // const data=props.alldashboardFunnel
    //   let result = Object.keys(data1).map(key => {
    //         return ({ stage: key, number: data1[key] })
    //       }
    //       )
    // console.log("result",data1)
  const config = {
    data: props.alldashboardFunnel,
    xField: 'stage',
     yField: 'number',
     color:color
    // dynamicHeight: true,
    // legend: false,
  };
  return <Funnel {...config} />;

};

const mapStateToProps = ({ dashboard, auth }) => ({

  userId: auth.userDetails.userId,
  department:auth.userDetails.department,
  alldashboardFunnel:dashboard.alldashboardFunnel,
  fetchingallDashBoardFunnel:dashboard.fetchingallDashBoardFunnel
//   fetchingDashBoardFunnel:dashboard.fetchingDashBoardFunnel,
//   fetchingDashBoardFunnelError:dashboard.fetchingDashBoardFunnelError,
//   dashboardFunnel:dashboard.dashboardFunnel
    });
    
    const mapDispatchToProps = (dispatch) =>
      bindActionCreators(
        {
          getAllDashboardFunnelRecord
        //   getDashboardFunnelRecord
        },
        dispatch
      );
    
    export default connect(
      mapStateToProps,
      mapDispatchToProps
    )(FunnelChartAll);

// import React, { useState, useEffect } from 'react';
// import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
// import {getDashboardFunnelRecord} from "../Dashboard/DashboardAction";
// import { BundleLoader } from '../../Components/Placeholder';
// import ReactDOM from 'react-dom';
// import { Funnel } from '@ant-design/plots';

// const DemoFunnel = (props) => {
//     useEffect(() => {
//       props.getDashboardFunnelRecord(props.orgId);
//   }, []);
//   if (props.fetchingDashBoardFunnel) {
//     return <BundleLoader/>;
//   }
//   const data = [
//     {
//       stage: '简历筛选',
//       number: 253,
//     },
//     {
//       stage: '初试人数',
//       number: 151,
//     },
//     {
//       stage: '复试人数',
//       number: 113,
//     },
//     {
//       stage: '录取人数',
//       number: 87,
//     },
//     {
//       stage: '入职人数',
//       number: 59,
//     },
//   ];
//   const data1=props.dashboardFunnel
//   console.log("data",data1)
//   const config = {
//     data: data1,
//     xField: 'stage',
//     yField: 'number',
//     dynamicHeight: true,
//     legend: false,
//   };
//   return <Funnel {...config} />;
// };


// const mapStateToProps = ({ dashboard, auth }) => ({
//   orgId: auth.userDetails.organizationId,
//   fetchingDashBoardFunnel:dashboard.fetchingDashBoardFunnel,
//   fetchingDashBoardFunnelError:dashboard.fetchingDashBoardFunnelError,
//   dashboardFunnel:dashboard.dashboardFunnel
//     });
    
//     const mapDispatchToProps = (dispatch) =>
//       bindActionCreators(
//         {
//           getDashboardFunnelRecord
//         },
//         dispatch
//       );
    
//     export default connect(
//       mapStateToProps,
//       mapDispatchToProps
//     )(DemoFunnel);
