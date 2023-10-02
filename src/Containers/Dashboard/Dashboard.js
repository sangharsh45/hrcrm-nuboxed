import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import DashboardJumpstartAll from "../Dashboard/Child/JumpStart/DashboardJumpstartAll"
import DashboardJumpstart from "../Dashboard/Child/JumpStart/DashboardJumpStart";
import DashboardBulbJumpstart from "../Dashboard/Child/JumpStart/DashboardBulbJumpstart";
import StackedClosureChart from "../Dashboard/StackedClosureChart"
import { bindActionCreators } from "redux";
import { BundleLoader } from "../../Components/Placeholder";
import Dashboardheader from "./Child/DashboardHeader";
import { FlexContainer } from "../../Components/UI/Layout";
import TodoDashboardTab from "../Dashboard/TodoDashboardTab"
import StackedClosureChartAll from "./StackedClosureChartAll";
import TaskDashboardTab from "./TaskDashboardTab";
import SourceChart from "./Child/Chart/SourceChart";
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

    return (
      <React.Fragment>
   

        <Dashboardheader />
        <Suspense fallback={<BundleLoader />}>
         <div style={{ display: "flex", justifyContent: "space-between",  }}>
           <div style={{ width: "53%" }}>
           <FlexContainer flexDirection="column" style={{ display: "block" }}>
           {viewType==="ME"?(
             <DashboardJumpstartAll/> )
             :viewType==="bulb" ? (<DashboardBulbJumpstart/>)
             : (
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
               
            </FlexContainer> 
        
    </FlexContainer>
    </div>
     <div style={{ width: "47%" }}>
          <FlexContainer flexDirection="column" style={{ display: "block" }}>
       <FlexContainer justifyContent="space-between" >
       {viewType==="ME" || viewType==="test"?(
            <TodoDashboardTab
            viewType={viewType}
            />
             )
             :viewType==="bulb" ? (<SourceChart/>)
             :null
            }
       
   
      </FlexContainer>
      
    </FlexContainer>
    </div>
   
    </div>
    </Suspense>
 
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ dashboard, auth }) => ({
  viewType:dashboard.viewType,

});
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


