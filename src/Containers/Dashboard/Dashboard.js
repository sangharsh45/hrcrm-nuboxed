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
import DashboardTaskOrganizationJumpstart from "./Child/JumpStart/DashboardTaskOrganizationJumpstart";
import TaskOrganizationTab from "./TaskOrganizationTab";
import {setDashboardViewType} from "./DashboardAction";
import { version } from "cheerio";
import CustomerLeadsTab from "./CustomerLeadsTab";
import DashboardCustomerOrgJumpstart from "./Child/JumpStart/DashboardCustomerOrgJumpstart";
import DashCustomerChartTab from "./DashCustomerChartTab";


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
      viewType,
      setDashboardViewType,
      timeZone,
      level,
      highestLevel,
      dept,
      country,
    } = this.props;

    return (
      <React.Fragment>
   

        <Dashboardheader 
        viewType={viewType}
        setDashboardViewType={setDashboardViewType}
        />
        <Suspense fallback={<BundleLoader />}>
         <div style={{ display: "flex", justifyContent: "space-between",  }}>
           <div style={{ width: "53%" }}>
           <FlexContainer flexDirection="column" style={{ display: "block" }}>
           {viewType==="ME"?(
             <DashboardJumpstartAll/> )
             :viewType==="bulb" ? (<DashboardBulbJumpstart/>)
             : viewType==="ALL" || viewType==="taskOrg" ?
             (<DashboardTaskOrganizationJumpstart/>)
             : viewType==="custOrg" ?
             (<DashboardCustomerOrgJumpstart/>)
             :
             (
              <DashboardJumpstart />
          )}
             <div style={{ width: "-webkit-fill-available" }}>
          <FlexContainer flexDirection="column" style={{ display: "block" }}>
       <FlexContainer justifyContent="space-between" >
       {viewType==="ALL"  || viewType==="taskOrg" ?(
       <TaskOrganizationTab/>)
       : viewType==="custOrg" ?(
        <CustomerLeadsTab/>)
        :
       <TaskDashboardTab
      viewType={viewType}
      />
       }
      </FlexContainer>
      
    </FlexContainer>
    </div>
       <FlexContainer justifyContent="space-between" >
                
                 {viewType==="ME"?(
                   <StackedClosureChartAll/>
          
            ) : viewType==="custOrg" ? (<DashCustomerChartTab/>)
            :(
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
const mapDispatchToProps = (dispatch) => bindActionCreators({
  setDashboardViewType
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);


