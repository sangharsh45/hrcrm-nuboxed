// // import React, { Component, lazy, Suspense } from "react";
// // import { connect } from "react-redux";
// // import { Modal, Button } from "antd";
// // import { bindActionCreators } from "redux";
// // import { BundleLoader } from "../../Components/Placeholder";

// // import Dashboardheader from "./Child/DashboardHeader";
// // import DashboardDetailsRight from "./DashboardDetailsRight";

// // import {
// //   ResponsiveBox,
// //   FlexContainer,
// //   MainWrapper,
// // } from "../../Components/UI/Layout";
// // import DashboardJumpStart from "./Child/JumpStart/DashboardJumpStart";
// // import DashboardTodo from "./Child/DashboardTodo";
// // import WordCloud from "../../Components/WordCloud/WordCloud";
// // import StackedChart from "./StackedChart";
// // // import DashboardJumpStartAll from "./Child/JumpStart/DashboardJumpStartAll";
// // // import { StyledModal } from "../../Components/UI/Antd";
// // // import TimeZoneForm from "./TimeZoneForm";
// // // import LevelForm from "./LevelForm";
// // // import Chart2 from "./Child/Charts/DepartmentCharts/Chart2";
// // // import Chart3 from "./Child/Charts/DepartmentCharts/Chart3";
// // // import Chart4 from "./Child/Charts/DepartmentCharts/Chart4";
// // // import { Spacer } from "../../Components/UI/Elements";
// // // import MobileLoginClose from "./MobileLoginClose";
// // // import ChartTab1ForProPlus from "./Child/Charts/ChartTab1ForProPlus";

// // // const DashboardMap = lazy(() => import("./Child/Charts/DashboardMap"));
// // // const ChartTabs = lazy(() => import("./Child/Charts/ChartTab"));
// // // const Chart1 = lazy(() => import("./Child/Charts/DepartmentCharts/Chart1"));
// // // const ChartTab1 = lazy(() => import("./Child/Charts/ChartTab1"));
// // // const ChartTab1All = lazy(() => import("./Child/Charts/ChartTab1All"));
// // // const ChartTab1AllForProPlus = lazy(() =>
// // //   import("./Child/Charts/ChartTab1AllForProPlus")
// // // );
// // // const ChartTab2 = lazy(() => import("./Child/Charts/ChartTab2"));
// // // const ChartTab3 = lazy(() => import("./Child/Charts/ChartTab3"));
// // // const ChartTab3All = lazy(() => import("./Child/Charts/ChartTab3All"));
// // // const ChartTabContact = lazy(() => import("./Child/Charts/ChartTabContact"));
// // // const ChartTabAccount = lazy(() => import("./Child/Charts/ChartTabAccount"));
// // // const ChartTabAll = lazy(() => import("./Child/Charts/ChartTabAll"));
// // // const ChartTabAll2 = lazy(() => import("./Child/Charts/ChartTabAll2"));
// // // const ChartTabContactAll = lazy(() =>
// // //   import("./Child/Charts/ChartTabContactAll")
// // // );
// // const DashboardCustomerTab = lazy(() => import("./DashboardCustomerTab"));
// // const DashboardDetailsLeft = lazy(() => import("./DashboardDetailsLeft"));
// // //const DashboardDetailsRight = lazy(() => import("./DashboardDetailsRight"));
// // // const ChartTabAccountAll = lazy(() =>
// // //   import("./Child/Charts/ChartTabAccountAll")
// // // );
// // // const Dashlet = lazy(() => import("./Child/Dashlet/Dashlet"));
// // // const StarterDashlet = lazy(() => import("./Child/Dashlet/StarterDashlet"));
// // // const DepartmentDashlet = lazy(() =>
// // //   import("./Child/Dashlet/DepartmentDashlet")
// // // );
// // // const DashletAll = lazy(() => import("./Child/Dashlet/DashletAll"));
// // // const TodoDrawer = lazy(() => import("./Child/Todo/TodoDrawer"));
// // class Dashboard extends Component {
// //   state = { visible: false };

// //   //   showModal = () => {
// //   //     this.setState({
// //   //       visible: true,
// //   //     });
// //   //   };

// //   //   handleOk = (e) => {
// //   //     console.log(e);
// //   //     this.setState({
// //   //       visible: false,
// //   //     });
// //   //   };

// //   //   handleCancel = (e) => {
// //   //     console.log(e);
// //   //     this.setState({
// //   //       visible: false,
// //   //     });
// //   //   };
// //   //   handleCallback = () => {
// //   //     this.setState({
// //   //       visible: false,
// //   //     });
// //   //   };
// //   render() {
// //     const {
// //       //   dashboardType,
// //       //   organization,
// //       //   timeZone,
// //       //   level,
// //       //   highestLevel,
// //       //   dept,
// //       //   country,
// //     } = this.props;
// //     // console.log(timeZone);

// //     return (
// //       <>
// //         <Dashboardheader />
// //         <Suspense fallback={<BundleLoader />}>
// //           <div
// //             style={{
// //               display: "flex",
// //               justifyContent: "space-between",
// //               overflow: "hiddden",
// //             }}
// //           >
// //             <div style={{ width: "57%", height: "100%" }}>
// //               <DashboardJumpStart />
// //               <Suspense fallback={""}>
// //                 <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
// //                   <div style={{ width: "100%" }}>
// //                     <DashboardDetailsLeft />
// //                   </div>

                 
// //                 </FlexContainer>
// //               </Suspense>
// //             </div>
// //             <div style={{ width: "44%", height: "100%" }}>
// //               <FlexContainer justifyContent="space-between">
// //                 <div style={{ width: "50%" }}>
// //                   <MainWrapper style={{height:"14em"}}>
                   
// //                       <WordCloud />
                  
// //                   </MainWrapper>
// //                 </div>
// //                 <div style={{ width: "50%" }}>
                  
// //                   <DashboardTodo />
// //                 </div>
// //               </FlexContainer>
// //               <div style={{ width: "100%" }}>
              
// //                   <MainWrapper>
// //                     <h1>Customer</h1>
                 
// //                   <DashboardCustomerTab/>
// //                   </MainWrapper>
            
// //               </div>
// //             </div>
          
// //           </div>
// //         </Suspense>
// //       </>
// //     );
// //   }
// // }

// // const mapStateToProps = ({ dashboard, auth }) => ({
// //   //   dashboardType: dashboard.dashboardType,
// //   //   dept: auth.userDetails.department,
// //   //   timeZone: auth.userDetails && auth.userDetails.timeZone,
// //   //   country:
// //   //     auth.userDetails &&
// //   //     auth.userDetails.address[0] &&
// //   //     auth.userDetails.address[0].country,
// //   //   level: auth.userDetails && auth.userDetails.level,
// //   //   highestLevel:
// //   //     auth.userDetails &&
// //   //     auth.userDetails.metadata &&
// //   //     auth.userDetails.metaData.organization &&
// //   //     auth.userDetails.metaData.organization.highestLevel,
// //   //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
// //   //   organization:
// //   //     auth.userDetails &&
// //   //     auth.userDetails.metaData &&
// //   //     auth.userDetails.metaData.organization,
// // });
// // const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
// // export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

// import React, { Component, lazy, Suspense } from "react";
// import { connect } from "react-redux";
// import { Modal, Button } from "antd";
// import { bindActionCreators } from "redux";
// import { BundleLoader } from "../../Components/Placeholder";

// import Dashboardheader from "./Child/DashboardHeader";
// import DashboardDetailsRight from "./DashboardDetailsRight";

// import {
//   ResponsiveBox,
//   FlexContainer,
//   MainWrapper,
// } from "../../Components/UI/Layout";
// import DashboardJumpStart from "./Child/JumpStart/DashboardJumpStart";
// import DashboardTodo from "./Child/DashboardTodo";
// import WordCloud from "../../Components/WordCloud/WordCloud";
// import StackedChart from "./StackedChart";
// // import DashboardJumpStartAll from "./Child/JumpStart/DashboardJumpStartAll";
// // import { StyledModal } from "../../Components/UI/Antd";
// // import TimeZoneForm from "./TimeZoneForm";
// // import LevelForm from "./LevelForm";
// // import Chart2 from "./Child/Charts/DepartmentCharts/Chart2";
// // import Chart3 from "./Child/Charts/DepartmentCharts/Chart3";
// // import Chart4 from "./Child/Charts/DepartmentCharts/Chart4";
// // import { Spacer } from "../../Components/UI/Elements";
// // import MobileLoginClose from "./MobileLoginClose";
// // import ChartTab1ForProPlus from "./Child/Charts/ChartTab1ForProPlus";

// // const DashboardMap = lazy(() => import("./Child/Charts/DashboardMap"));
// // const ChartTabs = lazy(() => import("./Child/Charts/ChartTab"));
// // const Chart1 = lazy(() => import("./Child/Charts/DepartmentCharts/Chart1"));
// // const ChartTab1 = lazy(() => import("./Child/Charts/ChartTab1"));
// // const ChartTab1All = lazy(() => import("./Child/Charts/ChartTab1All"));
// // const ChartTab1AllForProPlus = lazy(() =>
// //   import("./Child/Charts/ChartTab1AllForProPlus")
// // );
// // const ChartTab2 = lazy(() => import("./Child/Charts/ChartTab2"));
// // const ChartTab3 = lazy(() => import("./Child/Charts/ChartTab3"));
// // const ChartTab3All = lazy(() => import("./Child/Charts/ChartTab3All"));
// // const ChartTabContact = lazy(() => import("./Child/Charts/ChartTabContact"));
// // const ChartTabAccount = lazy(() => import("./Child/Charts/ChartTabAccount"));
// // const ChartTabAll = lazy(() => import("./Child/Charts/ChartTabAll"));
// // const ChartTabAll2 = lazy(() => import("./Child/Charts/ChartTabAll2"));
// // const ChartTabContactAll = lazy(() =>
// //   import("./Child/Charts/ChartTabContactAll")
// // );
// const DashboardCustomerTab = lazy(() => import("./DashboardCustomerTab"));
// const DashboardDetailsLeft = lazy(() => import("./DashboardDetailsLeft"));
// //const DashboardDetailsRight = lazy(() => import("./DashboardDetailsRight"));
// // const ChartTabAccountAll = lazy(() =>
// //   import("./Child/Charts/ChartTabAccountAll")
// // );
// // const Dashlet = lazy(() => import("./Child/Dashlet/Dashlet"));
// // const StarterDashlet = lazy(() => import("./Child/Dashlet/StarterDashlet"));
// // const DepartmentDashlet = lazy(() =>
// //   import("./Child/Dashlet/DepartmentDashlet")
// // );
// // const DashletAll = lazy(() => import("./Child/Dashlet/DashletAll"));
// // const TodoDrawer = lazy(() => import("./Child/Todo/TodoDrawer"));
// class Dashboard extends Component {
//   state = { visible: false };

//   //   showModal = () => {
//   //     this.setState({
//   //       visible: true,
//   //     });
//   //   };

//   //   handleOk = (e) => {
//   //     console.log(e);
//   //     this.setState({
//   //       visible: false,
//   //     });
//   //   };

//   //   handleCancel = (e) => {
//   //     console.log(e);
//   //     this.setState({
//   //       visible: false,
//   //     });
//   //   };
//   //   handleCallback = () => {
//   //     this.setState({
//   //       visible: false,
//   //     });
//   //   };
//   render() {
//     const {
//       //   dashboardType,
//       //   organization,
//       //   timeZone,
//       //   level,
//       //   highestLevel,
//       //   dept,
//       //   country,
//     } = this.props;
//     // console.log(timeZone);

//     return (
//       <>
//         <Dashboardheader />
//         {/* <Suspense fallback={<BundleLoader />}>
//           <div
//             style={{
//               display: "flex",
//               justifyContent: "space-between",
//               overflow: "hiddden",
//             }}
//           >
//             <div style={{ width: "57%", height: "100%" }}>
//               <DashboardJumpStart />
//               <Suspense fallback={""}>
//                 <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
//                   <div style={{ width: "100%" }}>
//                     <DashboardDetailsLeft />
//                   </div>

                 
//                 </FlexContainer>
//               </Suspense>
//             </div>
//             <div style={{ width: "44%", height: "100%" }}>
//               <FlexContainer justifyContent="space-between">
//                 <div style={{ width: "50%" }}>
//                   <MainWrapper style={{height:"14em"}}>
                   
//                       <WordCloud />
                  
//                   </MainWrapper>
//                 </div>
//                 <div style={{ width: "50%" }}>
                  
//                   <DashboardTodo />
//                 </div>
//               </FlexContainer>
//               <div style={{ width: "100%" }}>
              
//                   <MainWrapper>
//                     <h1>Customer</h1>
                 
//                   <DashboardCustomerTab/>
//                   </MainWrapper>
            
//               </div>
//             </div>
          
//           </div>
//         </Suspense> */}

// <FlexContainer>
//             <Suspense fallback={""}>
//               <FlexContainer flexWrap="no-wrap" style={{ width: "100%" }}>
//                 <div style={{ width: "53%" }}>
//                   <DashboardDetailsLeft 
//                   // opportunity={opportunity} 
//                   />
//                 </div>
//                 <div style={{ width: "47%" }}>
//                   <DashboardDetailsRight 
//                   //opportunity={opportunity}
//                   />
//                 </div>
//               </FlexContainer>
//             </Suspense>
//           </FlexContainer>
//       </>
//     );
//   }
// }

// const mapStateToProps = ({ dashboard, auth }) => ({
//   //   dashboardType: dashboard.dashboardType,
//   //   dept: auth.userDetails.department,
//   //   timeZone: auth.userDetails && auth.userDetails.timeZone,
//   //   country:
//   //     auth.userDetails &&
//   //     auth.userDetails.address[0] &&
//   //     auth.userDetails.address[0].country,
//   //   level: auth.userDetails && auth.userDetails.level,
//   //   highestLevel:
//   //     auth.userDetails &&
//   //     auth.userDetails.metadata &&
//   //     auth.userDetails.metaData.organization &&
//   //     auth.userDetails.metaData.organization.highestLevel,
//   //   subscriptionType: auth.userDetails.metaData.organization.subscriptionType,
//   //   organization:
//   //     auth.userDetails &&
//   //     auth.userDetails.metaData &&
//   //     auth.userDetails.metaData.organization,
// });
// const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
// export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import DashboardJumpstartAll from "../Dashboard/Child/JumpStart/DashboardJumpstartAll"
import DashboardJumpstart from "../Dashboard/Child/JumpStart/DashboardJumpStart"
import { Modal, Button } from "antd";
import StackedClosureChart from "../Dashboard/StackedClosureChart"
import FunnelChart from "../Dashboard/FunnelChart"
import DashboardDetailsTab from "../Dashboard/DashboardDetailsTab"
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
// import DashboardAllDetailsTab from "../Dashboard/DashboardAllDetailsTab"

import Dashboardheader from "./Child/DashboardHeader";
import { ResponsiveBox, FlexContainer,MainWrapper } from "../../Components/UI/Layout";
import WordCloud from "../../Components/WordCloud/WordCloud";
import DashboardTodo from "./Child/DashboardTodo";
import TodoDashboardTab from "../Dashboard/TodoDashboardTab"
import Indicator from "./Indicator";
import DashboardCustomerTab from "./DashboardCustomerTab";
import StackedClosureChartAll from "./StackedClosureChartAll";
import FunnelChartAll from "./FunnelChartAll";
import DashBoardJumpStartDesign from "./Child/JumpStart/DashBoardJumpStartDesign";
import TaskDashboardTab from "./TaskDashboardTab";

class Dashboard extends Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCallback = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const {
      dashboardType,
      viewType,
      organization,
      timeZone,
      level,
      highestLevel,
      dept,
      country,
    } = this.props;
    // if (viewType==="ALL") {
    //   return <BundleLoader/>;
    // }
    // console.log(timeZone);

    return (
      <React.Fragment>
   

        <Dashboardheader />
        <Suspense fallback={<BundleLoader />}>
         <div style={{ display: "flex", justifyContent: "space-between",  }}>
           <div style={{ width: "53%" }}>
           <FlexContainer flexDirection="column" style={{ display: "block" }}>
           {viewType==="ME"?(
             <DashboardJumpstartAll/>
      
          
            ) : (
              <DashboardJumpstart />
          )}
             <div style={{ width: "-webkit-fill-available" }}>
          <FlexContainer flexDirection="column" style={{ display: "block" }}>
       <FlexContainer justifyContent="space-between" >
       <TaskDashboardTab
      viewType={viewType}
      />
      
      </FlexContainer>
      
    </FlexContainer>
    </div>
       <FlexContainer justifyContent="space-between" >
      
                
                 {viewType==="ME"?(
                   <StackedClosureChartAll/>
       
          
            ) : (
              <StackedClosureChart/>
          )}
                 {/* <div style={{ width: "38%" }}>
       <MainWrapper
        style={{height:"16em"}}
       >
        Pipeline (Today)
      
       {viewType==="ME"?(
      <FunnelChartAll/>
          
            ) : (
              
              <FunnelChart/>
          )}
       </MainWrapper>
       </div> */}
            </FlexContainer>
                
        
        
        {/* <DashboardDetailsTab
        viewType={viewType}
        /> */}
          
         
        
        
    </FlexContainer>
    </div>
     <div style={{ width: "47%" }}>
          <FlexContainer flexDirection="column" style={{ display: "block" }}>
      
      {/* <DashboardCustomerTab
      viewType={viewType}
      /> */}
      
       <FlexContainer justifyContent="space-between" >
       <TodoDashboardTab
      viewType={viewType}
      />
       {/* {viewType==="ME"?( */}
       {/* <MainWrapper
        style={{width:"54%",height:"30vh"}}
       >
        Todays Onboard Rate
       
      
      <Indicator/>
          
           
         
          
       </MainWrapper> */}
        {/* ) : ( */}
          {/* <MainWrapper
          style={{width:"54%",height:"45vh"}}
         >
       
            
             
                <WordCloud/>
            
         </MainWrapper> */}
         {/* )} */}
         {/* <div style={{ width: "44%",marginLeft:"auto" ,height:"14em"}}>
      <DashboardTodo />
      </div> */}
      </FlexContainer>
      {/* {viewType==="ME"&&(
       <div style={{ width: "55%", }}>
       <MainWrapper
        style={{height:"30vh",}}
       >
        
       <WordCloud/>
        
       </MainWrapper>
       </div>
        )} */}
    </FlexContainer>
    </div>
   
    </div>
    </Suspense>
    {/* <div>
    {this.props.viewType === "test" ?
      <DashBoardJumpStartDesign/>: null}
    </div> */}
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ dashboard, auth }) => ({
  viewType:dashboard.viewType,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


